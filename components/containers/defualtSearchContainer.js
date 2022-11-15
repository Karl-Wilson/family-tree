import styled from "styled-components";
import {Input} from '../core/core';
import { showSidebar } from "../core/sidebarExitBar";
import { uiActions } from "../../store/reducers/uiReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
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
    const {addSearchSuggest} = uiActions;
    const [menuBtnDisplay, setMenuBtnDisplay] = useState(true);


    const clickHandler = () =>{
        setMenuBtnDisplay(false)
        let windowWidth = window.outerWidth;
        if(windowWidth<764){
            dispatch(addSearchSuggest(true));
        }
    }
    const changeHandler = () =>{
        let windowWidth = window.outerWidth;
        if(windowWidth>=764){
            dispatch(addSearchSuggest(true));
        }
    }
    const blurHandler = () =>{
        dispatch(addSearchSuggest(false));
        setMenuBtnDisplay(true)
    }
    return (
        <Wrapper id="defaultSearch" className="shadow-lg-2 borderRadius p-8 m-lg-0 m-21">
            {menuBtnDisplay && <Menu src="./images/menu_icon.svg" className="mr-13 icons" onClick={showSidebar}/>}
            {!menuBtnDisplay && <Menu src="./images/back.svg" className="mr-13 icons" onClick={blurHandler}/>}
            <Input placeholder="Search for someone" borderless className="mr-13" height="auto" onClick={clickHandler} onChange={changeHandler} />
            <SearchIcon src="./images/search_icon.svg" className="icons"/>
        </Wrapper>
    )
}
export default DefaultSearchContainer;
