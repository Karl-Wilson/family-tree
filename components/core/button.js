import React from "react";
import styled from "styled-components";
const Wrapper  = styled.div`
    width: ${props=>props.width||'150px'};
    height: ${props=>props.height||'40px'};
    border-radius: 25px;
    background-color: ${props=>props.transparent? 'transparent' : props.backgroundColor || '#3303CB'};
    color: ${props=>props.transparent? '#333333' : props.color || '#ffffff'};
    border: ${props=>props.borderless? '0px' : '1px solid #cccccc'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const Button = props =>{
    return <Wrapper {...props}/>
}
export default Button;