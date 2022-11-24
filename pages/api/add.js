import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next"
import { fetchFamilyTree, fetchColorKey, fetchMemberList, fetchDataFromCollection, createFamilyTree, addMemberToList, addTreeAndLog } from "../../firebase/dbconnectors";
import treeGenerator from "../../utils/treeGenerator";
const handler = async (req, res) =>{
    const session = await unstable_getServerSession(req, res, authOptions)
    if(session){
        if(req.method == "POST"){
            //adding new members
            //retrieve tree
            //before storing, generate document id first
            //store in tree & members list at the same time, store using transactional method
            //when adding as list change the children status of the parent from null to []
            const {parentId, firstname, lastname, generation} = req.body
            let data = {parentId: parentId, firstname: firstname, lastname: lastname, generation: parseInt(generation)+1, children: null}
            let admin = session.user.name
                admin = admin.split(" ")
                admin = {id: admin[0], name: admin[1]}
            let log = {admin: admin, action: "add"}
            let familyTree, initTree, newTree, memberId;
            try{
                try{
                    familyTree = await fetchFamilyTree()
                }catch(e){
                    throw e.message
                }
                //add member
                try{
                    memberId = await addMemberToList(data)
                }catch(e){
                    throw e.message 
                }
                 
                try{
                    initTree  = new treeGenerator(familyTree.tree)
                    if(memberId != null){
                    //check if member is already in tree
                    let memberExists = initTree.findMemberById(memberId)
                    //if it doesnt exist add to tree
                    if(memberExists == null){
                        newTree = initTree.add({...data, id: memberId})
                    }else{
                        //if it exists
                        throw new Error("member exists already")
                    }   
                    }else{
                        throw new Error("memberId is null")
                    }
                }catch(e){
                    throw e.message
                }

                try{
                    //add tree to database and log it
                    if(newTree != null){
                        data = {...data, id: memberId}
                        addTreeAndLog(data, log, newTree)
                    }
                    
                }catch(e){
                    throw e.message
                }

                //retrieve tree and display
                try{
                    familyTree = await fetchFamilyTree()
                }catch(e){
                    throw e.message
                }

                res.status(200).json({data: {tree: familyTree}})
            }catch(e){
                res.status(400).json({error: e})
            }
            
            //res.status(200).json({data: 'Updated'})
            

        }
        if(req.method == "GET"){
            //check if there is tree database, if yes, fetch, if no, create tree and store
            //check if there is member database, if yes, fetch, if no return database does not exist
            try{
                let familyTree, colorCode, firstGeneration;

                try{
                    familyTree = await fetchFamilyTree()
                    colorCode = await fetchColorKey()
                }catch(e){
                    throw "Unable to fetch tree and colorKey"
                }

                if(familyTree != null){
                    if(colorCode != null){
                        res.status(200).json({data: {tree: familyTree, colorCode: colorCode}})
                    }else{
                        throw "ColorKeys not available"
                    }     
                }else{
                    //create/initialize tree 

                    //fetch first generation member
                    try{
                        firstGeneration = await fetchDataFromCollection("members", "generation", 1)
                    }catch(e){
                        throw "Unable to fetch first generation"
                    }
                    //create tree
                    try{
                        if(firstGeneration != null){
                            firstGeneration.map(item=>{
                                familyTree = item;
                            })
                        }else{
                            throw "No first generation in database"
                        }

                    }catch(e){
                        if(e){
                            throw e
                        }else{
                            throw "Unable to create tree"
                        }  
                    }
                    //add tree to database
                    try{
                        createFamilyTree(familyTree)
                    }catch(e){
                        throw "Unable to add tree to database"
                    }

                    //check if there is colorCode, if yes, send data to client, if no throw an error
                    if(colorCode != null){
                            res.status(200).json({data: {tree: familyTree, colorCode: colorCode}})
                    }else{
                            throw "ColorKeys not available"
                    } 
                }
            }catch(e){
                res.status(400).json({error: e})
            }
            
        }
        if(req.method == "PUT"){
            //update
        }
    }else{
        res.status(401).json({error: "Not authenticated"})
    }
}
export default handler;