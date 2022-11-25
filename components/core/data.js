
const OkonkwoChildren = [
    {name: "Peter", children: null, generation: 6, id: 19, parentId: 11},
]
const onyedinmaChildren = [
    {name: "Atune", children: null, generation: 6, id: 16, parentId: 10},
    {name: "Unegbu", children: null, generation: 6, id: 17, parentId: 10},
    {name: "Eliama", children: null, generation: 6, id: 18, parentId: 10},
]
const UnobuaghaChildren = [
    {name: "Ogueji", children: null, generation: 6, id: 15, parentId: 8},
]
const chibunmaChildren = [
    {name: "Okose", children: null, generation: 6, id: 12, parentId: 7},
    {name: "Anaedo", children: null, generation: 6, id: 13, parentId: 7},
    {name: "Akpudo", children: null, generation: 6, id: 14, parentId: 7},
]
const aghazuChildren = [
    {name: "Chibunma", children: chibunmaChildren, generation: 5, id: 7, parentId: 5},
    {name: "Unobuagha", children: UnobuaghaChildren, generation: 5, id: 8, parentId: 5},
    {name: "Onyedinma", children: onyedinmaChildren, generation: 5, id: 10, parentId: 5},
    {name: "Okonkwo", children: OkonkwoChildren, generation: 5, id: 11, parentId: 5},
]
const ememochuChildren = [
    {name: "Aghazu", children: aghazuChildren, generation: 4, id: 5, parentId: 4},
    {name: "Igbokwe", children: null, generation: 4, id: 6, parentId: 4},
]
const OgboguChildren = [
    {name: "Obo", children: null, generation: 3, id: 3, parentId: 2},
    {name: "Ememochu", children: ememochuChildren, generation: 3, id: 4, parentId: 2},
]
const OtiChildren = [
    {name: "Ogbogu", children: OgboguChildren, generation: 2, id: 2, parentId: 1}
]

const data = {name: "Oti", children: OtiChildren, generation: 1, id: 1, parentId: null}


let test= [{name: "Oti", children: [], generation: 1, id: 1, parentId: null},
{name: "Ogbogu", children: [], generation: 2, id: 2, parentId: 1},
{name: "Obo", children: [], generation: 3, id: 3, parentId: 2},
{name: "Ememochu", children: [], generation: 3, id: 4, parentId: 2},
{name: "Loius", children: null, generation: 4, id: 4, parentId: 3},
{name: "Aghazu", children: [], generation: 4, id: 5, parentId: 4},
{name: "Igbokwe", children: [], generation: 4, id: 6, parentId: 4},
{name: "Chibunma", children: [], generation: 5, id: 7, parentId: 5},
{name: "Unobuagha", children: [], generation: 5, id: 8, parentId: 5},
{name: "Onyedinma", children: [], generation: 5, id: 10, parentId: 5},
{name: "Okonkwo", children: [], generation: 5, id: 11, parentId: 5},
{name: "Eduputa", children: null, generation: 5, id: 11.1, parentId: 6},
{name: "Okose", children: null, generation: 5, id: 11.2, parentId: 6},
{name: "Ilongwu", children: null, generation: 5, id: 11.3, parentId: 6},
{name: "Ifeorah", children: null, generation: 5, id: 11.4, parentId: 6},
{name: "Okose", children: null, generation: 6, id: 12, parentId: 7},
{name: "Anaedo", children: null, generation: 6, id: 13, parentId: 7},
{name: "Akpudo", children: null, generation: 6, id: 14, parentId: 7},
{name: "Ogueji", children: null, generation: 6, id: 15, parentId: 8},
{name: "Atune", children: null, generation: 6, id: 16, parentId: 10},
{name: "Unegbu", children: null, generation: 6, id: 17, parentId: 10},
{name: "Eliama", children: null, generation: 6, id: 18, parentId: 10},
{name: "Peter", children: null, generation: 6, id: 19, parentId: 11},]

//{firstname, lastname, children:[], generation: 1, id, parentId}

function recursion (arr){
    var root = null; 
    var lastCheckpoint = [];
    var f =0;
    for(let i=0; i<arr.length;i++){
        bfs(arr[i])
    }

    //use this if you are not using pathway, but algo is O(n)
    //normal bfs gets 98 while loop calls
    //optimized version 1 gets 34 while loop calls
    //optimized version 2 gets 32 while loop calls
    //optimized version 3 gets 18 while loop calls(still in progress)
    function bfs(person){
        if(root == null){
            root = person
            lastCheckpoint.push(person)
        }else{
            let pointer = null;
            let queue = [];
            queue.push(...lastCheckpoint)

            while(queue.length){
                pointer = queue.shift();
                // console.log(f)
                // f++
                //version 2
                if(pointer.children == null){
                    for(let k=0;k<lastCheckpoint;k++){
                        lastCheckpoint.splice(k,1);
                    }
                    pointer = queue.shift()
                }
                //version 2 end
                //checks if the next the next generation is his children's generation or his grandkids
                //if its not his, then its his grandkids, remove him from lastcheckpoint list, then add his children, 
                //added his children because his grandkids are his children's children
                if((pointer.generation+1) == person.generation){
                    if(pointer.id == person.parentId){
                        pointer.children.push(person)
                        break;
                    }
                }else{
                    for(let j=0;j<lastCheckpoint.length;j++){
                        if(lastCheckpoint[j].generation == pointer.generation){
                            lastCheckpoint.splice(j,1);
                        }
                    }
                    if(pointer.children != null){
                        queue.push(...pointer.children)
                        //save the children in lastcheckpoint, so when next it starts, its starts from already saved children to avoid, starting from root or the beginning of the tree
                        lastCheckpoint.push(...pointer.children)
                    }            
                }
                
            }
        }
    }

    //use this if you are using pathway, and to make algo O(nlog2)
    // function insert(person){
    //     if(root == null){
    //         root = person;
    //     }else{
    //         if(root.children.length>0){

    //         }else{
    //             if(root.id == person.parentId){
    //                 root.children.push(person)
    //             }
    //         }      
    //     }
    // }
    return root;
}
let newData = recursion(test)

export default newData;