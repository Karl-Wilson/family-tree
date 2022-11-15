import { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/reducers/uiReducer";
const Wrapper  = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: #ffffff;
`
const InOut  = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    &:hover{
        background-color: #f5f5f5;
    }
    
`
const In  = styled(InOut)`
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom: 1px solid #cccccc;
`
const Out  = styled(InOut)`
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
`
const ZoomBtn = props =>{
    const dispatch = useDispatch();
    const zoomPercentageLabel = useSelector(state=>state.ui.zoomPercentage);
    const {addZoomPercentage, addShowZoomLabel} = uiActions;
    const [zoomLevel, setZoomLevel] = useState(1)
    const [left, setLeft] = useState(0);

    const showLabelHandler = () =>{
        dispatch(addShowZoomLabel(true))
        setInterval(function(){dispatch(addShowZoomLabel(false))}, 4000);
    }

    const zoomPercentageHandler = (zoom) =>{
        if(zoom == "in"){
            if(zoomPercentageLabel != 100){
                dispatch(addZoomPercentage(zoomPercentageLabel+50))
            }  
        }else{
            if(zoomPercentageLabel != -100){
                dispatch(addZoomPercentage(zoomPercentageLabel-50))
            }  
        }
    }
    const zoomInHandler = () =>{
        let zoom = zoomLevel + 0.3
        let newLeft = left
        if(zoom > 1){
            newLeft = left + 300
        }
        if(zoom < 1.9){
            document.getElementById("slideWindow").style.transform = `scale(${zoom})`
            document.getElementById("slideWindow").style.left = `${newLeft}px`
            setZoomLevel(zoom)
            setLeft(newLeft)
            zoomPercentageHandler("in")
        } 
        showLabelHandler() 
    }
    const zoomOutHandler = () =>{
        let zoom = zoomLevel - 0.3
        let newLeft = left
        if(newLeft>0){
            newLeft = left - 300
        }

        if(zoom > 0.3){
            document.getElementById("slideWindow").style.transform = `scale(${zoom})`
            document.getElementById("slideWindow").style.left = `${newLeft}px`
            setZoomLevel(zoom)
            setLeft(newLeft)  
            zoomPercentageHandler("out")          
        }  
        showLabelHandler() 
    }
    return (
        <Wrapper {...props}>
            <In onClick={zoomInHandler}>+</In>
            <Out onClick={zoomOutHandler}>-</Out>
        </Wrapper>
    )
}
export default ZoomBtn;