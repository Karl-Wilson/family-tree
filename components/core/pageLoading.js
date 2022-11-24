import styled from "styled-components";
import {flexBoxStyling} from '../../utils/helper'
const Wrapper  = styled.div`
    width: 100%;
    height: ${props=>props.height||"100vh"};
    background-color: ${props=>props.bgColor||"#F5F5F5"};
    opacity: ${props=>props.opacity||""};
    ${flexBoxStyling.all("column", "center", "center")}
    position: absolute;
    top: 0;
    left: 0;
`
const LoadingImage  = styled.img`
    width: 100px;
`
const PageLoading = props =>{
return (
    <Wrapper className="zIndex-3" {...props}>
        <LoadingImage src="../images/loading.svg"/>
    </Wrapper>
)
}
export default PageLoading;