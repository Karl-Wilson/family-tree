import styled from "styled-components";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/reducers/uiReducer";

const Wrapper = styled.div`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
`
export const totalWidth = () =>{
    let allLines= document.querySelectorAll(".line")
    for(let i=0; i<allLines.length;i++){
        let firstElement  = allLines[i].parentElement.firstElementChild.nextSibling.clientWidth;
        let lastElement = allLines[i].parentElement.lastElementChild.clientWidth
        let width =  firstElement + lastElement; 
        allLines[i].style.width = "calc(100% - " + (width/2) + 'px' + ")"
        allLines[i].style.left = (firstElement/2) + 'px'
    }
}
export const centerTreePositionOnLoad = () =>{
    //slideWindow = useRef in tree-area component
    let windowWidth = window.innerWidth
    let slideWindowWidth = slideWindow.clientWidth
    let centerWidth = (slideWindowWidth - windowWidth)/2;
    document.getElementById('draggable-window').scrollLeft = centerWidth;
}
const centerTreeWhenAPersonIsClicked = (dispatch, addSlideWindowCenterTrigger, slideWindowCenterTrigger)=>{
    //centers tree when a person is clicked
    //when a person is clicked, it triggers slideWindowCenterTrigger, which triggers a rerender
    //and which triggers this function to run
    
        let windowWidth = window.innerWidth
        let slideWindowWidth = slideWindow.clientWidth
        if(slideWindowWidth<windowWidth){
            slideWindow.style.position = 'relative'
        }else{
            slideWindow.style.position = 'absolute'
        }
        if(slideWindowCenterTrigger){  
            dispatch(addSlideWindowCenterTrigger(false))
        } 
}


const Children = props =>{
    const dispatch = useDispatch()
    const slideWindowCenterTrigger = useSelector(state=>state.ui.slideWindowCenterTrigger)
    const {addSlideWindowCenterTrigger} = uiActions
    useEffect(() => {
        totalWidth()
        centerTreePositionOnLoad()
        centerTreeWhenAPersonIsClicked(dispatch, addSlideWindowCenterTrigger, slideWindowCenterTrigger)
    }, [slideWindowCenterTrigger])

    return(
        <Wrapper id="children" {...props}/>
    )
}
export default Children;