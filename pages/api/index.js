import { fetchFamilyTree, fetchColorKey, fetchMemberList, fetchDataFromCollection, createFamilyTree } from "../../firebase/dbconnectors";
import treeGenerator from "../../utils/treeGenerator";
const handler = async (req, res) =>{
    if(req.method == "GET"){
        //fetch tree
        //colorKeyn
        try{
            let familyTree, colorCode;

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
                throw "No tree found in the database"
            }

        }catch(e){
            res.status(401).json({error: e})
        }
    }
}
export default handler;