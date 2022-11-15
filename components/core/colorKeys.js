import styled from "styled-components";
const Wrapper  = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Colorbox  = styled.div`
    width: ${props=>props.width|| '24px'};
    height: ${props=>props.width || '24px'};
    background-color: ${props=>props.color||''};
    border-radius: ${props=>props.noBorderRadius|| '5px'};
`
const Text  = styled.p`
    font-size: 13px;
`
const ColorKeys = props =>{
    return (
        <Wrapper {...props}>
            <Colorbox width={props.width} noBorderRadius={props.noBorderRadius} color={props.color} className="mr-13"/>
            <Text>{props.children}</Text>
        </Wrapper>
    )
}
export default ColorKeys;