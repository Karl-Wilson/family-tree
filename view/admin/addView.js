import styled from "styled-components";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { firstLetterToLowercase  } from "../../utils/helper";
import { InnerWrapper as Wrapper , Header, Title, Body, Footer, SubmitBtn, BackBtn, FormGroup, Radio, Label, Form, Input, ErrorMessage} from "./myStyledComponents";
const DropdownContainer  = styled.div`
    width: 100%;
    height: auto;
    position: relative;
`
const Dropdown = styled.div`
    position: absolute;
    width: 100%;
    height: auto;
    max-height: 200px;
    display: none;
    transition: height .5s;
    overflow-y: auto;
    background-color: #ffffff;
    &.show{
        display: flex;
        flex-direction: column;
    }
`
const ListItems  = styled.p`
    width: 100%;
    cursor: pointer;
    &.active{
        background-color: #eeeeee;
    }
    &:hover{
        background-color: #eeeeee;
    }
`
let names = ["Oti", "Obo", "Ememochu", "Aghazu", "Igbokwe", "Chibunma", "Okose"]
const AddView = props =>{
    const router = useRouter()
    const [error, setError] = useState(null)
    const dropdownList = useRef()

    const parentOnChangehandler = (e) =>{
        let value = e.target.value
        let nameCollection = document.getElementsByClassName('list')
        //reset list highlight
        for(let i=0; i<nameCollection.length; i++){
            nameCollection[i].classList.remove("active")
        }
        for(let i=0; i<nameCollection.length; i++){
            let innerText = nameCollection[i].getAttribute("name")
            innerText = firstLetterToLowercase(innerText)
            value = firstLetterToLowercase(value) 
            if(innerText.startsWith(value)){
                //scrollto the matched list item and highlight it
                nameCollection[i].scrollIntoView()
                nameCollection[i].classList.add("active")  
                break;
            }
        }        
    }
    const blurHandler = () =>{
        dropdownList.current.classList.remove("show")
    }
    const parentClickHandler = () =>{
        clearError()
        dropdownList.current.classList.add("show")
    }
    const listClickHandler =(e)=>{
        document.querySelector("input[name='parent']").value = e.target.getAttribute("name")
        blurHandler()
    }
    const clearError = () =>{
        setError(null)
        let formCollection = document.getElementsByClassName("form")
        for(let i=0; i<formCollection.length; i++){
                formCollection[i].style = "border-color: #cccccc"
        }
    }
    const validator = () =>{
        let formCollection = document.getElementsByClassName("form")
        let firstname = formCollection.firstname.value
        let lastname = formCollection.lastname.value
        let parent = formCollection.parent.value
        if(!firstname && !lastname){
            setError("Fill in empty field(s)")
            formCollection.firstname.style = "border-color: red"
            formCollection.lastname.style = "border-color: red"
        }
        if(!parent){
            setError("Fill in empty field(s)")
            formCollection.parent.style = "border-color: red"
        } 
        if(firstname){
            if(!isNaN(firstname)){
                setError("Alphabets required")
            formCollection.firstname.style = "border-color: red"
            }
        }
        if(lastname){
            if(!isNaN(lastname)){
                setError("Alphabets required")
            formCollection.lastname.style = "border-color: red"
            }
        }
    }
    const submitHandler = () =>{
        validator()
    }
    return (
        <Wrapper className="p-21">
            <Header>
                <Title>Add New</Title>
            </Header>
            <Body>
                {error && <ErrorMessage className="p-13 mb-21">{error}</ErrorMessage>}
                <p className="mb-21">What do you want to add?</p>
                <FormGroup className="mb-21">
                    <Label className="mb-8">Parent</Label>
                    <DropdownContainer>
                        <Input type="text" className="p-8 form" name="parent" onChange={parentOnChangehandler} onClick={parentClickHandler} />
                        <Dropdown ref={dropdownList} id="dropdown" className="shadow-2 zIndex-3">
                            {names.sort().map((value, idx)=>{
                                return <ListItems className="pl-13 pt-8 pb-8 list" key={idx+value} onClick={listClickHandler} name={value}>{value}</ListItems>
                            })}
                        </Dropdown>
                    </DropdownContainer>
                    
                </FormGroup>
                <FormGroup className="mb-21">
                    <Label className="mb-8">Firstname</Label>
                    <Input type="text" className="p-8 form" name="firstname" onClick={clearError}/>
                </FormGroup>
                <FormGroup className="mb-21">
                    <Label className="mb-8">Lastname</Label>
                    <Input type="text" className="p-8 form" name="lastname" onClick={clearError}/>
                </FormGroup>
            </Body>
            <Footer justifyContent="space-between">
                <BackBtn borderless onClick={() => router.back()} className="mt-8 mt-lg-0">Back</BackBtn>
                <SubmitBtn borderless onClick={submitHandler}>Add</SubmitBtn>
            </Footer>
        </Wrapper>
    )
}
export default AddView;