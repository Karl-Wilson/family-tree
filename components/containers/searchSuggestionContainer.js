import styled from "styled-components";
import {ColorKeys} from '../core/core'
import { useEffect, useState } from "react";
import { searchHandler, searchList } from "./defualtSearchContainer";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/reducers/uiReducer";

const Wrapper  = styled.div`
    width: ${props=>props.width||"100%"};
    height: auto;
    background-color: #ffffff;
    position: relative;
    border-top: ${props=>props.noBorderTop? "" : "1px solid #cccccc"};
    top: 1px;
    p{font-size: 13px;}

    @media screen and (min-width: 992px){
        border-top: 0px solid #cccccc;
    }
`
const SuggestionList  = styled(ColorKeys)`
    width: 100%;
    height: 40px;
    cursor: pointer;
    &:hover{
        background-color: #F5F5F5;
    }
`

const SearchSuggestionContainer = ({className, ...props}) =>{
    const dispatch = useDispatch()
    const {addSearchSuggest, addMenuBtnDisplay} = uiActions
    const blurHandler = () =>{
        dispatch(addSearchSuggest(false));
        dispatch(addMenuBtnDisplay(true))
    }
    const searchHandler = () =>{
        try{
            let id = document.querySelector("input[name='defaultSearch']").getAttribute("data-id")
            if(id){
                if(document.getElementById(id)){
                    //let bounds = document.getElementById(id).getBoundingClientRect()
                    document.getElementById(id).scrollIntoView()
                    blurHandler()
                }
            }else{
                throw new Error("click the suggestion")
            }
        }catch(e){
            console.error(e.message)
        }   
    }
    const suggestClickHandler = (e, handler) =>{
        handler(e, blurHandler)
    }
    return (
        <Wrapper className={className} {...props}>
            {props.dataInput.length<=0 && <p className="p-8">No Suggestion</p>}
            {props.dataInput.length>0 && <>
                {props.dataInput.map((value, index)=>{
                    return <SuggestionList onClick={(e)=>suggestClickHandler(e, props.click)} key={index+"searchsuggest"} className={props.suggestionListClassName} noBorderRadius color={value.bgColor} data-id={value.id}>{value.firstname}</SuggestionList>
                })} 
            </>}   
        </Wrapper>
    )
}
export default SearchSuggestionContainer;