export const isPageBottom = (dispatch, addShowLoadMore) =>{
    let windowHeight = window.innerHeight
    let slideWindowHeight = document.getElementById('slideWindow').offsetHeight
    let slideWindowTop = document.getElementById('slideWindow').offsetTop
    let draggableWindowScrollTop  = document.getElementById("draggable-window").scrollTop
    let totalSlideWindowHeight = slideWindowHeight + slideWindowTop
    let scrollableHeight = totalSlideWindowHeight - windowHeight

    if(totalSlideWindowHeight <= windowHeight){
        dispatch(addShowLoadMore(true))
    }else{
        if(draggableWindowScrollTop >= scrollableHeight){
            dispatch(addShowLoadMore(true))
        }else{
            dispatch(addShowLoadMore(false))
        }
    }
}

export const flexBoxStyling  = {
        all: function(direction, justify, align){
            return `
            display: flex;
            flex-direction: ${direction};
            justify-content: ${justify};
            align-items: ${align};
            `
        },
        direction: function(direction){
            return`
            display: flex;
            flex-direction: ${direction};
            `
        }
    }

    export const firstLetterToLowercase = (word) =>{
        if(!word) return ""
        let newWords = word.split("")
        newWords[0] = newWords[0].toLowerCase();
        return newWords.join("")
    }
    export const capitalizeFirstLetter = (word) =>{
        if(!word) return ""
        let newWords = word.split("")
        newWords[0] = newWords[0].toUpperCase();
        return newWords.join("")
    }


export const colorCodeFamilyList = (tree, colorCodeArray) =>{
    if(typeof tree != "object" && typeof colorCodeArray != "object") return null
    if(Object.values(tree).length < 1) return null
    if(colorCodeArray.length < 1) return null

    let root =  {...tree};
    let result = []
    const recursion = (node, color, dfaultColor) =>{
        let defaultColor = dfaultColor;
        let isAvailable = false;
        //check if currrentNode firstname is in colorCode Array, if yes set isAvailable true
        color.map((item,index)=>{
            if(node.id == item.id){
                isAvailable = true
            }
        })

        //if in colorCodeList, set defaultColor code and add color field to currentNode
        //if not in list, set defaultColor, color continues throughout the lineage till it meets another ancestor with colorcode settings 
        if(isAvailable){ 
            color.map((item,index)=>{
                if(node.id == item.id){
                    node["bgColor"] = item.bgColor
                    defaultColor = item.bgColor
                    
                }
            })
        }else{
            if(defaultColor){
                node["bgColor"] = defaultColor
            }
        }
        result.push(node)
        //if children not null, loop through the children and recurse
        if(node.children != null){
        for(let j=0; j<node.children.length;j++){
            recursion({...node.children[j]}, color, defaultColor);
        }
            
        } 
    } 
    recursion(root, colorCodeArray, null);    
    return result
}