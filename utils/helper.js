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