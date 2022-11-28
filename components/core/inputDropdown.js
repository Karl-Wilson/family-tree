import styled from "styled-components";
import { Dropdown, DropdownContainer, ListItems, ColorBox, Input } from "../../view/admin/myStyledComponents";
import { firstLetterToLowercase, capitalizeFirstLetter } from "../../utils/helper";
import { useSelector } from "react-redux";
import { useRef } from "react";
const InputDropdown = props =>{
    const isLoading = useSelector(state=>state.ui.isLoading)
    const dropdownList = useRef()
    const personChangeHandler = (e) =>{
        try{
            //reset input parent data
            dropdownList.current.classList.add("show")
            document.querySelector("input[name='person']").setAttribute("data-id", "")
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
    const personClickHandler = (clearError) =>{
        if(clearError){
           clearError() 
        }
        dropdownList.current.classList.toggle("show")
    }
    const listClickHandler =(e)=>{
        document.querySelector("input[name='person']").value = e.target.getAttribute("name")
        document.querySelector("input[name='person']").setAttribute("data-id", e.target.getAttribute("data-id"))
           blurHandler() 
    }
return (
    <DropdownContainer>
        <Input type="text" className="p-8" name="person" data-id="" onChange={personChangeHandler} onClick={()=>personClickHandler(props.clearError)}/>
        <Dropdown ref={dropdownList} id="dropdown" className="shadow-2 zIndex-3" >
            {!isLoading && props.dataInput && <>{props.dataInput.map((value, idx)=>{
                return <ListItems className="pl-13 pt-8 pb-8 list" key={idx+value} onClick={listClickHandler} name={value.firstname} data-id={value.id} data-gen={value.generation}>
                        <ColorBox className="mr-8" color={value.bgColor}/>
                        <>{value.firstname}</>
                        <span className="ml-8">({value.parentName})</span>
                    </ListItems>
            })}</>}
            {isLoading &&<p className="p-13">Loading...</p>}
        </Dropdown>
    </DropdownContainer>
)
}
export default InputDropdown;