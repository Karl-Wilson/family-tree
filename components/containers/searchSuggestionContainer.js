import styled from "styled-components";
import {ColorKeys} from '../core/core'
import { useEffect, useState } from "react";

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
    return (
        <Wrapper className={className} {...props}>
            {props.dataInput.length<=0 && <p className="p-8">No Suggestion</p>}
            {props.dataInput.length>0 && <>
                {props.dataInput.map(value=>{
                    return <SuggestionList className={props.suggestionListClassName} noBorderRadius color={value.color}>{value.name}</SuggestionList>
                })} 
            </>}   
        </Wrapper>
    )
}
export default SearchSuggestionContainer;