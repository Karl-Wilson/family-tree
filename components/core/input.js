import styled from "styled-components";

const Wrapper = styled.input`
    width: ${props=>props.width||'100%'};
    height: ${props=>props.height||'40px'};
    padding-top: ${props=>props.pt||'8px'};
    padding-bottom: ${props=>props.pb||'8px'};
    padding-right: ${props=>props.pr||'8px'};
    padding-left: ${props=>props.pl||'8px'};
    box-sizing: border-box;
    border-width: ${props=>props.borderless? '0px': '1px'};
    border-style: solid;
    border-color: #cccccc;
    font-size: 13px;
    &::placeholder{
        color: #aaaaaa;
    }
    @media screen and (min-width: 992px){
        width: ${props=>props.width||props.Lwidth||'100%'};
    }
`

const Input = props =>{
    return(
        <Wrapper {...props}/>
    )
}
export default Input;