import styled from "styled-components";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import {AncestorColorContainer} from "../../components/containers/containers"
import {InputDropdown} from '../../components/core/core'
import { useFetchData } from "./dashboard";
import { capitalizeFirstLetter, colorCodeFamilyList } from "../../utils/helper";
import { useSelector, useDispatch } from "react-redux";
import { updateMemberProfile } from "../../utils/thunks";
import { InnerWrapper as Wrapper , Header, Title, Body, Footer, SubmitBtn, BackBtn, FormGroup, Radio, Label, Form, Input, ErrorMessage, DropdownContainer, Dropdown, ListItems, ColorBox} from "./myStyledComponents";
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
    const dispatch = useDispatch()
    const router = useRouter()
    const updateWrapperRef = useRef()
    const [error, setError] = useState(false)
    const [firstname, setFirstname] = useState(false)
    const [lastname, setLastname] = useState(false)
    const [wife, setWife] = useState(false)
    const [daughter, setDaughter] = useState(false)
    const [title, setTitle] = useState(false)
    const [colorCodedList, setColorCodedList] = useState([])
    const treeData = useSelector(state=>state.data.treeData)
    const ancestorColorData = useSelector(state=>state.data.ancestorColorData)
    useFetchData(dispatch, treeData, ancestorColorData)
    useEffect(() => {
        try{
            console.log(treeData)
            console.log(ancestorColorData)
            if(treeData && ancestorColorData){
                setColorCodedList(colorCodeFamilyList(treeData.tree, ancestorColorData))
            }   
        }catch(e){
            console.log("addView useEffect Error", e.message)
        }
    }, [treeData, ancestorColorData])

    const validator = () =>{
        try{
            let memberId = document.querySelector("input[name='person']").getAttribute("data-id")
            let formList = document.getElementsByClassName('form')
            let error = null
            
            //check if a member is selected
            if(!memberId){
                error = "Select a member"
                return error
            }
            if(formList.length){
                //loop through form list
                for(let i=0;i<formList.length; i++){
                    let element = formList[i]
                    let value = element.value
                    //if its empty
                    if(!value){
                        error = "Fill in empty field(s)"
                        element.style = "border-color: red"
                    }else{
                        //if other fields is a number
                            if(!isNaN(value)){
                                error = "Alphabets required"
                                element.style = "border-color: red"
                            }
                    }

                    if(element.name == "wife" || element.name == "daughter" || element.name == "title"){
                        let arr = value.split(",")
                        if(arr.length > 1){
                            arr.map(item=>{
                                if(!isNaN(item)){
                                    error = "Alphabets required"
                                    element.style = "border-color: red"
                                }
                            })
                        }
                    }
                }
            }else{
                error =  "Select update fields"
            }

            return error
        }catch(e){
            console.error(e.message)
        }
    }
   
    const clearError = () =>{
        setError(false)
        let formCollection = document.getElementsByClassName("form")
        for(let i=0; i<formCollection.length; i++){
                formCollection[i].style = "border-color: #cccccc"
        }
    }

    const selectedUpdateHandler = (e) =>{
        let selected = e.target.checked
        let value = e.target.value
        if(selected){
            switch(value){
                case 'firstname': setFirstname(true)
                break;
                case 'lastname': setLastname(true)
                break;
                case 'wife': setWife(true)
                break;
                case 'daughter': setDaughter(true)
                break;
                case 'title': setTitle(true)
                break;
            }
        }else{
            switch(value){
                case 'firstname': setFirstname(false)
                break;
                case 'lastname': setLastname(false)
                break;
                case 'wife': setWife(false)
                break;
                case 'daughter': setDaughter(false)
                break;
                case 'title': setTitle(false)
                break;
            }
        }
        wrapperHeightReset()
    }
    const wrapperHeightReset = () =>{
        let windowHeight = window.innerHeight
        let getHeight = updateWrapperRef.current.offsetHeight + 4;
        if(getHeight>windowHeight){
            props.parentRef.current.style = "justify-content: flex-start"
        }else{
            props.parentRef.current.style = "justify-content: center"
        }
    }
    const updateHandler = () =>{
        let error = validator()
        if(!error){
            let memberId = document.querySelector("input[name='person']").getAttribute("data-id")
            let formList = document.getElementsByClassName('form')
            let extract = {}
            if(formList.length){
                //loop through form list
                for(let i=0;i<formList.length; i++){
                    let value = formList[i].value
                    let name = formList[i].name
                    if(name == "wife" || name == "daughter" || name == "title"){
                        value = value.split(",")
                        for(let j=0; j<value.length;j++){
                            value[j] = capitalizeFirstLetter(value[j].trim())
                        }
                    }else{
                        value = capitalizeFirstLetter(value)
                    }

                    Object.assign(extract, {[name]: value})
                }
            }
            let data = {id: memberId, ...extract}
            updateMemberProfile(dispatch, data)
        }else{
            setError(error)
        }
    }
return (
    <Wrapper className="p-21" ref={updateWrapperRef}>
        <Header>
            <Title>Update</Title>
        </Header>
        <Body>
            {error && <ErrorMessage className="p-13 mb-21">{error}</ErrorMessage>}
            <p className="mb-21">What do you want to update?</p>
            <FormGroup className="mb-21">
                <Label className="mb-8">Search</Label>
                <InputDropdown dataInput={colorCodedList} clearError={clearError}/>
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
                    <FormGroup flexDirection="row">
                        <Radio type="checkbox" name="selectUpdate" value="wife" onClick={selectedUpdateHandler}/>
                        <Label className="ml-8">Wife</Label>
                    </FormGroup>
                    <FormGroup flexDirection="row" className="ml-13">
                        <Radio type="checkbox" name="selectUpdate" value="daughter" onClick={selectedUpdateHandler}/>
                        <Label className="ml-8">Daughter</Label>
                    </FormGroup>
                    <FormGroup flexDirection="row" className="ml-13">
                        <Radio type="checkbox" name="selectUpdate" value="title" onClick={selectedUpdateHandler}/>
                        <Label className="ml-8">Title</Label>
                    </FormGroup>
                </FormGroup>
            </FormGroup>
            <SelectedUpdates>
                {firstname && <FormGroup className="mb-21">
                    <Label className="mb-8">Firstname</Label>
                    <Input type="text" className="p-8 form" name="firstname" onClick={clearError}/>
                </FormGroup>}
                {lastname && <FormGroup className="mb-21">
                    <Label className="mb-8">Lastname</Label>
                    <Input type="text" className="p-8 form" name="lastname" onClick={clearError}/>
                </FormGroup>}
                {wife && <FormGroup className="mb-21">
                    <Label className="mb-8">Wife</Label>
                    <Input type="text" className="p-8 form" name="wife" onClick={clearError}/>
                </FormGroup>}
                {daughter && <FormGroup className="mb-21">
                    <Label className="mb-8">Daughter</Label>
                    <Input type="text" className="p-8 form" name="daughter" onClick={clearError}/>
                </FormGroup>}
                {title && <FormGroup className="mb-21">
                    <Label className="mb-8">Title</Label>
                    <Input type="text" className="p-8 form" name="title" onClick={clearError}/>
                </FormGroup>}
            </SelectedUpdates>
            

        </Body>
        <Footer justifyContent="space-between">
            <BackBtn borderless onClick={() => router.back()} className="mt-8 mt-lg-0">Back</BackBtn>
            <SubmitBtn borderless onClick={updateHandler}>Update</SubmitBtn>
        </Footer>
        <AncestorContainer className="pt-8 mt-21">
                <AncestorColorContainer dataInput={data}/>
            </AncestorContainer>
    </Wrapper>
)
}
export default UpdateView;