import styled from "styled-components";
import {flexBoxStyling} from '../../utils/helper'
const Wrapper  = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #F5F5F5;
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
    <Wrapper className="zIndex-3">
        <LoadingImage src="./images/loading.svg"/>
    </Wrapper>
)
}
export default PageLoading;