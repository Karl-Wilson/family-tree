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
    const zoomLevel = useSelector(state=>state.ui.zoomLevel);
    const {addZoomPercentage, addShowZoomLabel, addZoomLevel} = uiActions;
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
    const zoomLevelMinMax = ()=>{
        if(window.innerWidth < 764){
            return {max: 1.3, min: 0}
        }
        return {max: 1.9, min: 0.3}
    }
    const zoomInHandler = () =>{
       try{
            let zoom = zoomLevel + 0.3
            let newLeft = left
            if(zoom > 1){
                newLeft = left + 300
            }
            if(zoom < zoomLevelMinMax().max){
                document.getElementById("tree").style.transform = `scale(${zoom})`
                document.getElementById("tree").style.left = `${newLeft}px`
                let treewidth = document.getElementById('tree').getBoundingClientRect().width
                document.getElementById('slideWindow').style.width = treewidth+"px"
                dispatch(addZoomLevel(zoom))
                setLeft(newLeft)
                zoomPercentageHandler("in")
            } 
            showLabelHandler()
        }catch(e){
            console.error(e.message)
        }
    }
    const zoomOutHandler = () =>{
        try{
            let zoom = zoomLevel - 0.3
            let newLeft = left
            if(newLeft>0){
                newLeft = left - 300
            }
            if(zoom > zoomLevelMinMax().min){
                document.getElementById("tree").style.transform = `scale(${zoom})`
                document.getElementById("tree").style.left = `${newLeft}px`
                let treewidth = document.getElementById('tree').getBoundingClientRect().width
                document.getElementById('slideWindow').style.width = treewidth+"px"
                dispatch(addZoomLevel(zoom))
                setLeft(newLeft)  
                zoomPercentageHandler("out")          
            }  
            showLabelHandler() 
        }catch(e){
            console.error(e.message)
        } 
    }
    return (
        <Wrapper {...props}>
            <In onClick={zoomInHandler}>+</In>
            <Out onClick={zoomOutHandler}>-</Out>
        </Wrapper>
    )
}
export default ZoomBtn;