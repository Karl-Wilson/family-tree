import styled from "styled-components";
import { keyframes } from "styled-components";
import {LineageSearchContainer, SearchSuggestionContainer, AncestorColorContainer} from "../containers/containers"
import {SidebarExitBar} from "../core/core"
import { searchList } from "../containers/defualtSearchContainer";
import { useSelector } from "react-redux";
import { useState } from "react";
const slideRight = keyframes`
  from {
    left: -100%
  }
  to {
    left: 0;
  }
`;
const slideLeft = keyframes`
  from {
    left: 0;
  }
  to {
    left:  -100%;
  }
`;

const Wrapper  = styled.div`
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #cccccc;    
    position: absolute;
    left: -100%;
    top: 0;
    bpx-sizing: border-box;

    &.showSidebar{
        z-index: 40;
        animation-fill-mode: forwards;
        animation-name: ${slideRight};
        animation-duration: .5s;
    }
    &.hideSidebar{
        z-index: 40;
        animation-fill-mode: forwards;
        animation-name: ${slideLeft};
        animation-duration: .5s;
    }
    @media screen and (min-width: 992px){
        width: 350px;
        height: auto;
        max-height: 80vh;
        border: 0px solid #cccccc;
    }
`
const LineageContainer = styled.div`
    width: 100%;
    height: auto;
`
const SuggestionConatiner = styled.div`
    width: 100%;
    height: 100%;
    border-top: 1px solid #cccccc;
    overflow: auto;

    @media screen and (min-width: 992px){
        max-height: 400px;
    }
`
const AncestorContainer = styled.div`
    width: 100%;
    height: auto;
    border-top: 1px solid #cccccc;
    @media screen and (min-width: 992px){
        display: none;
    }
`
const data = [{
    color: "#303CB1",
    name: "Felix"
}, 
{
    color: "#303CB1",
    name: "John"
},
{
    color: "#303CB1",
    name: "John"
}
]
const Sidebar = props =>{
    const memberList = useSelector(state=>state.data.treeDataList)
    let [suggest, setSuggest] = useState([])
    let [startActive, setStartActive] = useState()
    let [endActive, setEndActive] = useState()

    const startChangeHandler = (e) =>{
        try{
            if(e.target.name == "StartSearch"){
                setEndActive(false)
                setStartActive(true)
                document.querySelector("input[name='StartSearch']").setAttribute("data-id", "")
            }else{
                setEndActive(true)
                setStartActive(false)
                document.querySelector("input[name='EndSearch']").setAttribute("data-id", "")
            }

            let result = searchList(e.target.value, memberList)
            setSuggest(result)
        }catch(e){
            throw e.message
        }
        
    }

    const startSuggestHandler = (e) =>{
        document.querySelector("input[name='StartSearch']").value = e.target.innerText
        document.querySelector("input[name='StartSearch']").setAttribute("data-id", e.target.getAttribute("data-id"))

    }
    const endSuggestHandler = (e) =>{
        document.querySelector("input[name='EndSearch']").value = e.target.innerText
        document.querySelector("input[name='EndSearch']").setAttribute("data-id", e.target.getAttribute("data-id"))

    }

    const searchHandler = (e) =>{
        
    }

    return (
        <Wrapper id="sidebar"  className="p-13 p-lg-21 zIndex-5 shadow-lg-2">
            <SidebarExitBar/>
            <LineageContainer className="mt-21 mb-21">
                <LineageSearchContainer label="Start" className="mb-13" change={startChangeHandler} search={searchHandler}/>
                <LineageSearchContainer label="End" change={startChangeHandler} search={searchHandler}/>
            </LineageContainer>
            <SuggestionConatiner className="pt-13 pb-13">
                {startActive && <SearchSuggestionContainer noBorderTop dataInput={suggest} click={startSuggestHandler}/>}
                {endActive && <SearchSuggestionContainer noBorderTop dataInput={suggest} click={endSuggestHandler}/>}
            </SuggestionConatiner>
            <AncestorContainer className="pt-8">
                <AncestorColorContainer dataInput={data}/>
            </AncestorContainer>
        </Wrapper>
    )
}
export default Sidebar;