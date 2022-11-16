import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { flexBoxStyling } from "../../utils/helper";
import { InnerWrapper as Wrapper , Header, Title, Body, Footer, SubmitBtn, BackBtn, FormGroup, Select, Label, Form, Input} from "./myStyledComponents";

const DivContainer  = styled.div`
    width: 100%;
    height: auto;
    ${flexBoxStyling.all("row", "space-between", "center")}
`
const ExtraBtn  = styled.p`
    cursor: pointer;
`
const colorCodes = [{name: "Green", color: "#02985C"},{name: "Purple", color: "#BB1D98"},
{name: "Blue", color: "#303CB1"},{name: "Yellow", color: "#FFC528"},{name: "Sky Blue", color: "#0F91EF"},]

const ElemGroup = props=>{
    const selectTag = useRef();
    const [selectColor, setSelectColor] = useState()
    const selectColorHandler = ()=>{
        setSelectColor(selectTag.current.value)
    }
    useEffect(() => {
        selectColorHandler()
    }, [])

    return(
        <FormGroup flexDirection="row" className="keyChanger mb-13">
                <FormGroup>
                    <Label className="mb-8">Name</Label>
                    <Input type="text" placeholder={props.name} className="p-8" onClick={props.click}/>
                </FormGroup>
                <FormGroup className="ml-13">
                    <Label className="mb-8">Color</Label>
                    <Select ref={selectTag} color={selectColor} className="p-8" onChange={selectColorHandler}>
                        {colorCodes.map(val=>{
                            if(val.color == props.color){
                                return <option value={val.color} selected>{val.name}</option>
                            }
                            return <option value={val.color}>{val.name}</option>
                        })}
                    </Select>
                </FormGroup>
            </FormGroup>
    )
}

const SettingsView = props =>{
    const router = useRouter()
    const [elems, setElems] = useState([]);
    const [key, setKey] = useState();
    const data = [{
        color: "#303CB1",
        name: "Felix"
    }, 
    {
        color: "#303CB1",
        name: "John"
    }] 

    const clickHandler = () =>{
        document.querySelectorAll(".keyChanger").forEach(function(item){
            item.getElementsByTagName("input")[0].style = "border-color: #cccccc"
        })
    }
    useEffect(() => {
        if(data){
            let newElem = []
            let newKey = 0
            data.map((value, idx)=>{
                newElem.push(<ElemGroup key={idx+"names"} name={value.name} color={value.color} click={clickHandler}/>)  
                newKey = idx
            })
            setKey(newKey)
            setElems(elems.concat(newElem))
        }
      
    }, [])

    const addBtnHandler = () =>{
        if(key < 4){
            setElems(elems.concat([<ElemGroup key={key+1+"names"} name="" color="" click={clickHandler}/>]))
            setKey(++key)
        }
    }

    const removeBtnHandler = () =>{
        if(key>=data.length){
            let newElem = elems
            newElem.pop()
            setElems(newElem)
            setKey(--key)
        }
    }
 
    const submitHandler = () =>{
        let allNodes = document.querySelectorAll(".keyChanger")
        let error = false;
        let result = []
        allNodes.forEach(function(item){
            let data = {};
            let name = item.getElementsByTagName("input")[0].value
            let color = item.getElementsByTagName("select")[0].value
            if(name != ""){
                data["name"] = name
                data["color"] = color
                result.push(data)
            }else{
                item.getElementsByTagName("input")[0].style = "border-color: red"
                error= true;
            }
        })
        if(!error){
            console.log(result)
        }
    }
    
return (
    <Wrapper className="p-13">
        <Header>
            <Title>Settings</Title>
        </Header>
        <Body>
            {elems.map(fields=>{
                return fields
            })}
            <DivContainer className="p-8 mt-13">
                <ExtraBtn onClick={addBtnHandler}>Add</ExtraBtn>
                <ExtraBtn onClick={removeBtnHandler}>Remove</ExtraBtn>
            </DivContainer>
            
        </Body>
        <Footer justifyContent="space-between">
            <BackBtn borderless onClick={() => router.back()}>Back</BackBtn>
            <SubmitBtn borderless onClick={submitHandler}>Save</SubmitBtn>
        </Footer>
    </Wrapper>
)
}
export default SettingsView;