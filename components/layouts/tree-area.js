import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Family from "../core/family";
import { useDragFunction } from "../../utils/hooks";
import {isPageBottom} from '../../utils/helper'
import newData from "../core/data";
import { uiActions } from "../../store/reducers/uiReducer";

const Wrapper  = styled.div`
    width: 100%;
    height: 100vh;
    overflow: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    cursor: grab;
    user-select: none;
`
const InnerWrapper  = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    left: ${props=>props.left||'0px'};
    top: ${props=>props.top||''};
`
const useAddLoadBtnOnScroll = (dispatch, addShowLoadMore)=>{
    useEffect(() => {
        isPageBottom(dispatch, addShowLoadMore)
        document.getElementById('draggable-window').addEventListener('scroll', ()=>isPageBottom(dispatch, addShowLoadMore))
        return () => {
            document.getElementById('draggable-window').removeEventListener('scroll', ()=>isPageBottom(dispatch, addShowLoadMore))
        }
      }, [])
}
const useAddSlideWindowTop = (slideWindowTopHandler) =>{
    useEffect(() => {
        slideWindowTopHandler()
      }, [])
}
const useAddDragEffect = (mouseDown, removeMouseDown, addMouseDown) =>{
    useEffect(() => {
        document.getElementById('draggable-window').addEventListener('mousedown', mouseDown)
        document.getElementById('draggable-window').addEventListener('touchstart', removeMouseDown)
        document.getElementById('draggable-window').addEventListener('touchend', addMouseDown)
        return () => {
            document.getElementById('draggable-window').removeEventListener('mousedown', mouseDown)
            document.getElementById('draggable-window').removeEventListener('touchstart', removeMouseDown)
            document.getElementById('draggable-window').removeEventListener('touchend', addMouseDown)
        }
      }, [])
}

const TreeArea = props =>{
    const dispatch = useDispatch()
    const {addShowLoadMore} = uiActions
    const slideWindow = useRef(false)
    const [slideWindowTop, setSlideWindowTop] = useState();
    const {mouseDown, removeMouseDown, addMouseDown} = useDragFunction()
    
    const slideWindowTopHandler = () =>{
        let searchHeight = document.getElementById("defaultSearch").offsetHeight
        let searchTop = document.getElementById("defaultSearch").offsetTop
        setSlideWindowTop(searchHeight + searchTop +'px')
    }
    useAddDragEffect(mouseDown, removeMouseDown, addMouseDown)
    useAddLoadBtnOnScroll(dispatch, addShowLoadMore);
    useAddSlideWindowTop(slideWindowTopHandler);
    
    return (
            <Wrapper id="draggable-window" className="zIndex-2 pt-21">
                <InnerWrapper id="slideWindow" ref={slideWindow} top={slideWindowTop}>
                    <Family data={newData}/>
                </InnerWrapper>
            </Wrapper>
    )
}
export default TreeArea;