import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { firstLetterToLowercase, colorCodeFamilyList, capitalizeFirstLetter } from "../../utils/helper";
import { fetchTreeFromAddView, addNewMember } from "../../utils/thunks";
import { useSelector, useDispatch } from "react-redux";
import {PageLoading} from '../../components/core/core'
import { useFetchData } from "./dashboard";
import { InnerWrapper as Wrapper , Header, Title, Body, Footer, SubmitBtn, BackBtn, FormGroup, Radio, Label, Form, Input, ErrorMessage, ListItems, ColorBox, Dropdown, DropdownContainer} from "./myStyledComponents";


const AddView = props =>{
    const dispatch = useDispatch()
    const router = useRouter()
    const treeData = useSelector(state=>state.data.treeData)
    const ancestorColorData = useSelector(state=>state.data.ancestorColorData)
    const isLoading = useSelector(state=>state.ui.isLoading)
    const [error, setError] = useState(false)
    const [colorCodedList, setColorCodedList] = useState([])
    const dropdownList = useRef()

    useFetchData(dispatch, treeData, ancestorColorData)
    useEffect(() => {
        try{
            if(treeData && ancestorColorData){
                setColorCodedList(colorCodeFamilyList(treeData.tree, ancestorColorData))
            }   
        }catch(e){
            console.log("addView useEffect Error", e.message)
        }
    }, [treeData, ancestorColorData])
    
    const parentOnChangehandler = (e) =>{
        try{
            //reset input parent data
            dropdownList.current.classList.add("show")
            document.querySelector("input[name='parent']").setAttribute("data-id", "")
            document.querySelector("input[name='parent']").setAttribute("data-gen", "")
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
        }catch(e){
            console.log(e.message)
        }
           
    }
    const blurHandler = () =>{
        dropdownList.current.classList.remove("show")
    }
    const parentClickHandler = () =>{
        clearError()
        dropdownList.current.classList.toggle("show")
    }
 
    const listClickHandler =(e)=>{
        document.querySelector("input[name='parent']").value = e.target.getAttribute("name")
        document.querySelector("input[name='parent']").setAttribute("data-id", e.target.getAttribute("data-id"))
        document.querySelector("input[name='parent']").setAttribute("data-gen", e.target.getAttribute("data-gen"))
        blurHandler()
    }
    const clearError = () =>{
        setError(false)
        let formCollection = document.getElementsByClassName("form")
        for(let i=0; i<formCollection.length; i++){
                formCollection[i].style = "border-color: #cccccc"
        }
    }
    const validator = () =>{
      try{  
        let formCollection = document.getElementsByClassName("form")
        let firstname = formCollection.firstname.value
        let lastname = formCollection.lastname.value
        let parent = formCollection.parent.value
        let parentId = formCollection.parent.getAttribute("data-id")
        let parentGen = formCollection.parent.getAttribute("data-gen")

        let error = null
        if(!firstname && !lastname){
            error = "Fill in empty field(s)"
            formCollection.firstname.style = "border-color: red"
            formCollection.lastname.style = "border-color: red"
        }
        if(!parent){
            error = "Fill in empty field(s) or select a parent"
            formCollection.parent.style = "border-color: red"
        } 
        if(!parentId && !parentGen){
            error = "Select a parent from list"
            formCollection.parent.style = "border-color: red"
        } 
        if(firstname){
            if(!isNaN(firstname)){
                error = "Alphabets required"
                formCollection.firstname.style = "border-color: red"
            }
        }
        if(lastname){
            if(!isNaN(lastname)){
                error = "Alphabets required"
                formCollection.lastname.style = "border-color: red"
            }
        }
        return error
    }catch(e){
        console.log(e.message)
    }
}
    const submitHandler = () =>{
        try{
            let error = validator()
            if(error){
                setError(error)
            }else{
                let parentName = document.querySelector("input[name='parent']").value
                let parentId = document.querySelector("input[name='parent']").getAttribute("data-id")
                let parentGeneration = document.querySelector("input[name='parent']").getAttribute("data-gen")
                let firstname = capitalizeFirstLetter(document.querySelector("input[name='firstname']").value)
                let lastname = capitalizeFirstLetter(document.querySelector("input[name='lastname']").value)
                let data = {parentId: parentId, firstname: firstname, lastname: lastname, generation: parentGeneration, parentName: parentName}
                addNewMember(data, dispatch)
            }
        }catch(e){
            console.error(e.message)
        }
        
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
                        <Input type="text" className="p-8 form" name="parent" onChange={parentOnChangehandler} onClick={parentClickHandler} data-id="" data-gen="" required/>
                        <Dropdown ref={dropdownList} id="dropdown" className="shadow-2 zIndex-3" >
                            {!isLoading && <>{colorCodedList.map((value, idx)=>{
                                return <ListItems className="pl-13 pt-8 pb-8 list" key={idx+value} onClick={listClickHandler} name={value.firstname} data-id={value.id} data-gen={value.generation}>
                                        <ColorBox className="mr-8" color={value.bgColor}/>
                                        <>{value.firstname}</>
                                        <span className="ml-8">({value.parentName})</span>

                                    </ListItems>
                            })}</>}
                            {isLoading &&<p className="p-13">Loading...</p>}
                        </Dropdown>
                    </DropdownContainer>
                    
                </FormGroup>
                <FormGroup className="mb-21">
                    <Label className="mb-8">Firstname</Label>
                    <Input type="text" className="p-8 form" name="firstname" onClick={()=>{clearError(); blurHandler()}} required/>
                </FormGroup>
                <FormGroup className="mb-21">
                    <Label className="mb-8">Lastname</Label>
                    <Input type="text" className="p-8 form" name="lastname" onClick={()=>{clearError(); blurHandler()}}/>
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