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
            blurHandler()
            let value = document.querySelector("input[name='defaultSearch']").value
            if(value){
                let result = searchList(value)
                let searchTerm = capitalizeFirstLetter(value)
                let isAvailable = false
                let id = null
                if(result.length){
                    result.map(item=>{
                        if(item.firstname == searchTerm || item.lastname == searchTerm){
                            isAvailable = true
                            id = item.id    
                        }                   
                    })
                    if(isAvailable){
                        document.getElementById(id).scrollIntoView()
                    }else{
                        throw new Error("not available")
                    }
                }else{
                    throw new Error("not available")
                }
            }
        }catch(e){
            console.error(e.message)
        }
    }    
    const searchList = (word) =>{
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
    const changeHandler = (e) =>{
        try{
            let windowWidth = window.outerWidth;
            if(windowWidth>=764){
                dispatch(addSearchSuggest(true));           
            }
            let result = searchList(e.target.value)
            if(!result.length){
                document.querySelector("input[name='defaultSearch']").setAttribute("data-id", "")
            }
            dispatch(addAutoSuggestList(result))
        }catch(e){
            console.error(e.message)
        }
    }
    const blurHandler = () =>{
        dispatch(addSearchSuggest(false));
        dispatch(addMenuBtnDisplay(true))
    }
    const scrollToElement = (top, left) =>{
        let windowWidth = window.innerWidth
        let windowHeight = window.innerHeight
        let draggableWindowTop = document.getElementById("draggable-window").scrollTop
        let draggableWindowLeft = document.getElementById("draggable-window").scrollLeft
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
