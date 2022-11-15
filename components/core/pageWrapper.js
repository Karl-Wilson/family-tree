import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: #F5F5F5; 
`
const DottedBg  = styled.img`
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.04;
`
const PageWrapper = props =>{
    return(
        <Wrapper id="pageWrapper" {...props} className="zIndex-1">
            <DottedBg src="./images/dottedBg.svg" className="zIndex-1"/>
            {props.children}
        </Wrapper>
    )
}
export default PageWrapper;