import styled from "styled-components";
import { flexBoxStyling } from "../../utils/helper";
const Wrapper  = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(255,255,255,0.5);
    ${flexBoxStyling.all("column", "center", "center")}
`
const InnerWrapper = styled.div`
    width: auto;
    max-width: 300px;
    background-color: #000000;
    box-sizing: border-box;
    text-align: center;
    border-radius: 10px;
    p{
        color: #ffffff;
    }
`
const MessageModal = props =>{
return (
    <Wrapper className="zIndex-3" {...props}>
        <InnerWrapper className="p-21 shadow-2">
            <p>{props.children}</p>
        </InnerWrapper>

    </Wrapper>
)
}
export default MessageModal;