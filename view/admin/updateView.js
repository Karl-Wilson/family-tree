import styled from "styled-components";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import {AncestorColorContainer} from "../../components/containers/containers"
import { InnerWrapper as Wrapper , Header, Title, Body, Footer, SubmitBtn, BackBtn, FormGroup, Radio, Label, Form, Input} from "./myStyledComponents";
const AncestorContainer  = styled.div`
    border-top: 1px solid #cccccc;
`
const SelectedUpdates  = styled.div``
const data = [{
    color: "#303CB1",
    name: "Felix"
}, 
{
    color: "#303CB1",
    name: "John"
}]
const UpdateView = props =>{
    const router = useRouter()
    const updateWrapperRef = useRef()
    const [firstname, setFirstname] = useState(false)
    const [lastname, setLastname] = useState(false)
    const [parent, setParent] = useState(false)

    const selectedUpdateHandler = (e) =>{
        let selected = e.target.checked
        let value = e.target.value
        if(selected){
            switch(value){
                case 'firstname': setFirstname(true)
                break;
                case 'lastname': setLastname(true)
                break;
                case 'parent': setParent(true)
                break;
            }
        }else{
            switch(value){
                case 'firstname': setFirstname(false)
                break;
                case 'lastname': setLastname(false)
                break;
                case 'parent': setParent(false)
                break;
            }
        }
        wrapperReset()
    }
    const wrapperReset = () =>{
        let windowHeight = window.innerHeight
        let getHeight = updateWrapperRef.current.offsetHeight + 4;
        if(getHeight>windowHeight){
            props.parentRef.current.style = "justify-content: flex-start"
        }else{
            props.parentRef.current.style = "justify-content: center"
        }
    }
return (
    <Wrapper className="p-21" ref={updateWrapperRef}>
        <Header>
            <Title>Update</Title>
        </Header>
        <Body>
            <p className="mb-21">What do you want to update?</p>
            <FormGroup className="mb-21">
                <Label className="mb-8">Search</Label>
                <Input type="text" className="p-8"/>
            </FormGroup>
            <FormGroup className="mb-21">
                <Label className="mb-8">Update Options</Label>
                <FormGroup flexDirection="row">
                    <FormGroup flexDirection="row">
                        <Radio type="checkbox" name="selectUpdate" value="firstname" onClick={selectedUpdateHandler}/>
                        <Label className="ml-8">Firstname</Label>
                    </FormGroup>
                    <FormGroup flexDirection="row" className="ml-13">
                        <Radio type="checkbox" name="selectUpdate" value="lastname" onClick={selectedUpdateHandler}/>
                        <Label className="ml-8">Lastname</Label>
                    </FormGroup>
                    <FormGroup flexDirection="row" className="ml-13">
                        <Radio type="checkbox" name="selectUpdate" value="parent" onClick={selectedUpdateHandler}/>
                        <Label className="ml-8">Parent</Label>
                    </FormGroup>
                </FormGroup>
            </FormGroup>
            <SelectedUpdates>
                {firstname && <FormGroup className="mb-21">
                    <Label className="mb-8">Firstname</Label>
                    <Input type="text" className="p-8"/>
                </FormGroup>}
                {lastname && <FormGroup className="mb-21">
                    <Label className="mb-8">Lastname</Label>
                    <Input type="text" className="p-8"/>
                </FormGroup>}
                {parent && <FormGroup className="mb-21">
                    <Label className="mb-8">Parent</Label>
                    <Input type="text" className="p-8"/>
                </FormGroup>}
            </SelectedUpdates>
            

        </Body>
        <Footer justifyContent="space-between">
            <BackBtn borderless onClick={() => router.back()} className="mt-8 mt-lg-0">Back</BackBtn>
            <SubmitBtn borderless>Update</SubmitBtn>
        </Footer>
        <AncestorContainer className="pt-8 mt-21">
                <AncestorColorContainer dataInput={data}/>
            </AncestorContainer>
    </Wrapper>
)
}
export default UpdateView;