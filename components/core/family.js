import styled from "styled-components";
import Offspring from "./offspring";
import Person from "./person";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/reducers/uiReducer";

const Wrapper = styled.div`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #ccccccc;
`
const Family = props =>{
    const dispatch = useDispatch();
    const {addSlideWindowCenterTrigger} = uiActions
    const colorCode = useSelector(state=>state.ui.colorCode);
    const [offspring, setOffspring] = useState(null)
    const [parent, setParent] = useState(false)
    const [child, setChild] = useState(false)
    const [name, setName] = useState()
    const [bgColor, setBgColor] = useState();
    const [textColor, setTextColor] = useState();

    useEffect(() => {
        if(Object.values(props.data).length > 0){            
            if(props.data.name){
                setName(props.data.name)
            }else{
                setName(props.data.lastname)
            }
            if(props.data.children){
                setParent(true);
                setOffspring(props.data.children)
            }
            if(props.data.parentId){
                setChild(true)
            }  
        }
        if(props.bgColor){
            setBgColor(props.bgColor)
            setTextColor(props.textColor)
        } 
        colorCode.map(colorCode=>{
         if(colorCode.name == props.data.name){
             setBgColor(colorCode.bgColor)
             setTextColor(colorCode.textColor)
         }
        }) 
         
    }, [])
    const clickHandler = () =>{
        if(offspring == null){
            
        }else{
            dispatch(addSlideWindowCenterTrigger(true))
            setOffspring(null)
            setParent(false)
        }
    }
    return(
        <Wrapper id="family" {...props}>
            {Object.values(props.data).length > 0 && <>
                <Person parent={parent} child={child} onClick={clickHandler} textColor={textColor} color={bgColor}>{name}</Person>
                <Offspring data={offspring} bgColor={bgColor} textColor={textColor}/>
            </>}
            {Object.values(props.data).length <= 0 && <p>No data is available</p>}
        </Wrapper>
    )
}
export default Family;
//const colorCode = [{{name: "default", color: "#6427AE"}, {name: "Aghazu", color: "#BB1D98"},{name: "Igbokwe", color: "#8F1FAA"}}]