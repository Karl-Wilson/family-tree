import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {DefaultSearchContainer, AncestorColorContainer, SearchSuggestionContainer} from "../containers/containers"
const Wrapper  = styled.div`
    width: 100%;
    height: ${props=>props.suggestOn? '100vh': "auto"};
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${props=>props.suggestOn? '#ffffff': "transparent"};
    @media screen and (min-width: 992px){
        width: 350px;
        height: auto;
        background-color: transparent;
    }
`
const useDisplayAncestorKeyOnResize = (setDisplayAncestorKey) =>{
    function resize(){
         let windowWidth = window.innerWidth;
        if(windowWidth<992){
            setDisplayAncestorKey(false)
        }else{
            setDisplayAncestorKey(true)
        }
    }
    useEffect(() => {
        resize()
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
          }
    }, [])
    
  
}

const Header = props =>{
    const isSearchSuggestOn = useSelector(state=>state.ui.searchSuggest);
    const ancestorColorData = useSelector(state=>state.data.ancestorColorData)
    const suggestList = useSelector(state=>state.data.autoSuggestList)
    const [displayAncestorColorKey, setDisplayAncestorKey] = useState(false)
    useDisplayAncestorKeyOnResize(setDisplayAncestorKey)
    const suggestHandler = (e, blurHandler) =>{
            document.querySelector("input[name='defaultSearch']").value = e.target.innerText
            document.querySelector("input[name='defaultSearch']").setAttribute("data-id", e.target.getAttribute("data-id"))
            //searchHandler()
            if(blurHandler != null){
                blurHandler()
            }    
    }
    return (
            <Wrapper className="p-0 p-lg-21 zIndex-4" suggestOn={isSearchSuggestOn}>
                <DefaultSearchContainer/>
                {(ancestorColorData.length>0 && !isSearchSuggestOn && displayAncestorColorKey) && <AncestorColorContainer dataInput={ancestorColorData} className="shadow-2 mt-lg-8 mr-21 ml-21 mr-lg-0 ml-lg-0 p-8 p-lg-13"/>}
                {isSearchSuggestOn && <SearchSuggestionContainer className="shadow-lg-2 p-13" suggestionListClassName="pr-13 pl-13" dataInput={suggestList} click={suggestHandler}/>}    
            </Wrapper>
    )
}
export default Header;
