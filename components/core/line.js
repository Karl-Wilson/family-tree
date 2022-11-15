import styled from "styled-components";
const Wrapper = styled.div`
    width: 0%;
    height: auto;
    border-top-wdith: 5px;
    border-top-style: solid;
    border-top-color: ${props=>props.color||'#333333'};
    position: absolute;
    left: 0;
    right: 0;
    opacity: 0.5;
`
const Line = props =>{
    return(
        <Wrapper className="line" {...props}/>
    )
}
export default Line;