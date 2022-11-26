import styled from "styled-components";
import {Input} from '../core/core';
import { showSidebar } from "../core/sidebarExitBar";
import { uiActions } from "../../store/reducers/uiReducer";
import { dataActions } from "../../store/reducers/dataReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { capitalizeFirstLetter } from "../../utils/helper";
export const Wrapper  = styled.div`
    width: auto;
    height: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    
    @media screen and (min-width: 992px){
        width: 100%;
        border: 0px solid #cccccc;
    }
`

const Menu  = styled.img`
 cursor: pointer;
`
export const SearchIcon  = styled.img`
    cursor: pointer;
`
export const searchList = (word, memberList) =>{
    try{
        if(!word){
            return []
        }else{
            let searchTerm = capitalizeFirstLetter(word);
            let result = []
            memberList.map(item=>{
                if(item.firstname){
                    if(item.firstname.startsWith(searchTerm)){
                        result.push(item)
                    }
                }
                if(item.lastname){
                    if(item.lastname.startsWith(searchTerm)){
                        result.push(item)
                    }
                }
            })
            return result                
        }
    }catch(e){
        console.error(e.message)
    }
}


const DefaultSearchContainer = props =>{
    const dispatch = useDispatch();
    const {addSearchSuggest, addMenuBtnDisplay} = uiActions;
    const {addAutoSuggestList} = dataActions;
    const memberList = useSelector(state=>state.data.treeDataList)
    const menuBtnDisplay = useSelector(state=>state.ui.menuBtnDisplay);


    const clickHandler = () =>{
        try{
            dispatch(addMenuBtnDisplay(false))
            let windowWidth = window.outerWidth;
            if(windowWidth<764){
                dispatch(addSearchSuggest(true));
            }
        }catch(e){
            console.error(e.messgae)
        }
    }
    const searchHandler = () =>{
        try{
            let id = document.querySelector("input[name='defaultSearch']").getAttribute("data-id")
            if(id){
                if(document.getElementById(id)){
                    //let bounds = document.getElementById(id).getBoundingClientRect()
                    document.getElementById(id).classList.add("selected")
                    document.getElementById(id).scrollIntoView()
                    blurHandler()
                }
            }else{
                throw new Error("click the suggestion")
            }
            // if(value){
            //     let result = searchList(value, memberList)
            //     let searchTerm = capitalizeFirstLetter(value)
            //     let isAvailable = false
            //     let id = null
            //     if(result.length){
            //         result.map(item=>{
            //             if(item.firstname == searchTerm || item.lastname == searchTerm){
            //                 isAvailable = true
            //                 id = item.id    
            //             }                   
            //         })
            //         if(isAvailable){
            //             document.getElementById(id).scrollIntoView()
            //         }else{
            //             throw new Error("not available")
            //         }
            //     }else{
            //         throw new Error("not available")
            //     }
            // }
        }catch(e){
            console.error(e.message)
        }
    }    
    
    const changeHandler = (e) =>{
        try{
            let windowWidth = window.outerWidth;
            if(windowWidth>=764){
                dispatch(addSearchSuggest(true));           
            }
            let id = document.querySelector("input[name='defaultSearch']").getAttribute("data-id")
            if(id){
                document.getElementById(id).classList.remove("selected") 
            }
            document.querySelector("input[name='defaultSearch']").setAttribute("data-id", "")
            let result = searchList(e.target.value, memberList)
            dispatch(addAutoSuggestList(result))
        }catch(e){
            console.error(e.message)
        }
    }
    const blurHandler = () =>{
        dispatch(addSearchSuggest(false));
        dispatch(addMenuBtnDisplay(true))
    }
    return (
        <Wrapper id="defaultSearch" className="shadow-lg-2 borderRadius p-8 m-lg-0 m-21">
            {menuBtnDisplay && <Menu src="./images/menu_icon.svg" className="mr-13 icons" onClick={showSidebar}/>}
            {!menuBtnDisplay && <Menu src="./images/back.svg" className="mr-13 icons" onClick={blurHandler}/>}
            <Input name="defaultSearch" placeholder="Search for someone" borderless className="mr-13" height="auto" onClick={clickHandler} onChange={changeHandler} data-id=""/>
            <SearchIcon src="./images/search_icon.svg" className="icons" onClick={searchHandler}/>
        </Wrapper>
    )
}
export default DefaultSearchContainer;
