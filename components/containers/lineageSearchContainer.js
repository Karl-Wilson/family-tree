import styled from "styled-components";
import { Wrapper, SearchIcon } from "./defualtSearchContainer";
import {Input} from "../core/core"

const Label  = styled.label`
    border-right: 1px solid #cccccc;
    width: 70px;
    font-size: 13px;
`
const Wrapper2 = styled(Wrapper)`
    @media screen and (min-width: 992px){
        border: 1px solid #cccccc;
    }
`
const LineageSearchContainer = props =>{
    return (
        <Wrapper2 className="borderRadius p-8 mb-13">
            <Label className="pr-8 pl-8">{props.label}</Label>
            <Input placeholder="Search for someone" borderless className="ml-8 mr-13" height="auto"/>
            <SearchIcon src="./images/search_icon.svg" className="icons"/>
        </Wrapper2>
    )
}
export default LineageSearchContainer;