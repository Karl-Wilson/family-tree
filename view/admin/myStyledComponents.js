import styled from "styled-components"
import { flexBoxStyling } from "../../utils/helper"
import {Button} from "../../components/core/core"
export const InnerWrapper = styled.div`
    width: ${props=>props.width||'377px'};
    height: ${props=>props.height||'auto'};
    box-sizing: border-box;
    @media screen and (min-width: 992px){
        border: ${props=>props.borderless? "": "1px solid #cccccc"};
        border-radius: 10px;
    }
`
const Div = styled.div`
    width: 100%;
    height: auto;
    display: flex;

`
export const Header  = styled(Div)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 34px;

`
export const Body  = styled(Div)`
    flex-direction: column;
`
export const Footer  = styled(Div)`
    flex-direction: column;
    justify-content: ${props=>props.justifyContent||"flex-end"};
    align-items: center;
    margin-top: 34px;
    @media screen and (min-width: 992px){
        flex-direction: row;
    }
`
export const Title = styled.p`
    font-family: Raleway-bold;
    font-size: 21px;
    color: #6427AE;
`
export const Subtitle  = styled.p`

`
export const Form  = styled.form`
    ${flexBoxStyling.direction("column")}
`
export const FormGroup = styled.div`
    ${props=>flexBoxStyling.direction(props.flexDirection||"column")}
`
export const Input  = styled.input`
    width: ${props=>props.width||"100%"};
    height: ${props=>props.height||"34px"};
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid #cccccc;
`
export const Label  = styled.label`
    
`
export const ErrorMessage  = styled.div`
    width: 100%;
    height: auto;
    background-color: #C1024C;
    font-size: 13px;
    color: #ffffff;
    box-sizing: border-box;
    border-radius: 10px;
`
export const Logout  = styled.p`
    cursor: pointer;
`

export const Radio  = styled.input``
export const RadioGroup  = styled.div``
export const SubmitBtn  = styled(Button)`
    width: 100%;
    order: 1;
    @media screen and (min-width: 992px){{
        width: 144px;
        order: 2;
    }
`
export const Select  = styled.select`
    width: 100px;
    height: 34px;
    border-radius: 10px;
    box-sizing: border-box;
    border: 1px solid #cccccc;
    background-color: ${props=>props.color||''};
    color: #ffffff;
`
export const BackBtn  = styled(Button)`
    width: 100%;
    background-color: transparent;
    padding: 0;
    color: #333333;
    order: 2;
    @media screen and (min-width: 992px){{
        width: 81px;
        order: 1;
    }
`