import styled from "styled-components";
const Wrapper = styled.div`
    position: relative;
    margin: 11px;
`
const Body = styled.div`
    width: auto;
    min-width: 100px;
    height: auto;
    box-sizing: border-box;
    border-radius: 10px;
    border-top-width: ${props=>props.parent? "0px":"5px"};
    border-top-style: solid;
    border-top-color: ${props=>props.parent? "transparent" : props.color};
    text-align: center;
    background-color: ${props=>props.parent? props.color :'#ffffff'};
    color: ${props=>props.parent? props.textColor:"#333333"};
    user-select: text;
    &&.bottom::after{
        content: '';
        width: 4px;
        height: 10px;
        background-color: ${props=>props.parent || props.child? props.color: '#000000'};
        position: absolute;
        bottom: -11px;
        left: 50%;
        opacity: 0.5;
    }
    &&.top::before{
        content: '';
        width: 4px;
        height: 10px;
        background-color: ${props=>props.parent || props.child? props.color: '#000000'};
        position: absolute;
        top: -11px;
        left: 50%;
        opacity: 0.5;
    }
    &:hover{
        cursor: pointer;
    }
`
const Person = ({className, ...props}) =>{
    const parentClass = props.parent? 'bottom' : '';
    const childClass = props.child? 'top' : '';
    return(
        <Wrapper>
            <Body className={[className, parentClass, childClass, 'shadow-2 p-8'].join(' ')} {...props}/>
        </Wrapper>
    )
}
export default Person;