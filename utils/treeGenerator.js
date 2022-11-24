class treeGenerator {
    //using breadth first method to insert
    //using dept first search and breadth first combined for transversing
    constructor(root){
        if(typeof root == "object" && root != null && Object.values(root).length>0){
            this.root = root 
        }else{
            this.root = null
        }  
    }
    
    add(val){
        let currentNode = this.root
        //let visited = []
        if(currentNode != null){
            let queue = []
            queue.push(currentNode)
            while(queue.length){
                currentNode = queue.shift()
                //visited.push(currentNode)
                //checks if the current node is the parent, if yes add ass child, if no add children to queue
                if(val.parentId == currentNode.id){
                    if(currentNode.children == null){
                        currentNode.children = [val] 
                    }else{
                        let isAvailable = false
                        for(let i=0; i<currentNode.children.length;i++){
                            if(currentNode.children[i].id == val.id){
                            isAvailable = true
                            }
                        } 
                        if(!isAvailable){
                            currentNode.children.push(val)
                        }
                    }
                    break;
                }else{
                    if(currentNode.children != null){
                        queue.push(...currentNode.children)
                    }
                    
                }
            }
        }
        return this.root;
    }

    add_v2(val){
        let currentNode = this.root
        //let visited = []
        let queue = []
        queue.push(currentNode)
        while(queue.length){
            currentNode = queue.shift()
            //visited.push(currentNode)

            //checks if newNode generation is currentNode child's generation, 
            //if yes, add newNode to currentNode children
            //if no, add currentNode children to queue and repeat
            //if newNode is not the newly added children's children generation, add their children, and flush out their generation

            //checks if the current node is the parent, if yes add ass child, if no add children to queue
            
            if((currentNode.generation+1) == val.generation){
                if(val.parentId == currentNode.id){
                    if(currentNode.children == null){
                        currentNode.children = [val] 
                    }else{
                        currentNode.children.push(val)
                    }
                    break;
                }
            }else{
                //if the currentNode has child, add them to queue
                //it has been taken out already from queue
                if(currentNode.children != null){
                    queue.push(...currentNode.children)
                }
                //loop through the queue, anyone in the same generation with currentNode, add all there child in queue and delete them after that
                if(queue.length){
                    while(queue[0].generation == currentNode.generation){
                        let poppedNode = queue.shift()
                        if(poppedNode.children != null){
                            queue.push(...poppedNode.children)
                        }
                }}
                
            }
        }
        return this.root;
    }
    getAllAsList(){
        let list = []
        let currentNode = this.root
        function recurse(currentNode){
            list.push(currentNode)
            if(currentNode.children != null){
                currentNode.children.map(val=>{
                    recurse(val)
                })
            }
        }
        //if there is something to recurse, then recurse
        if(currentNode != null){
            recurse(currentNode)
        }
        return list;
    }
    findMemberByName(val){
        if(this.root == null) return null;
        let node = this.root
            let queue = []
            queue.push(node)
            while(queue.length) {
                node = queue.shift()
                if(node.name.toLowerCase() == val.toLowerCase()){
                    return node;
                }
                if(node.children != null){
                    queue.push(...node.children)
                }
            }
        return null
    }
    findMemberById(val){
        if(this.root == null) return null;
        let node = this.root
        let queue = []
        queue.push(node)
        while(queue.length) {
               node = queue.shift()
            if(node.id == val){
                return node;
            }
            if(node.children != null){
                queue.push(...node.children)
            }
        }
        return null
    }
    removeMember(val){
        if(this.root == null) return null;
            let found = this.findMemberByName(val)
            let parent = this.findMemberById(found.parentId)
            if(parent.children.length == 1){
                parent.children = null
            }else{
                for(let i=0; i<parent.children.length;i++){
                    if(parent.children[i].name.toLowerCase() == val.toLowerCase()){
                        parent.children.splice(i,1)
                    }
                }
            }
            return parent.children
       return null 
    }
}

export default treeGenerator;