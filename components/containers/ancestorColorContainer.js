import styled from "styled-components";
import {ColorKeys} from "../core/core"

const Wrapper  = styled.div`
    width: auto;
    height: auto;
    box-sizing: border-box;
    background-color: #ffffff;
    @media screen and (min-width: 992px){
    }
`
const Title  = styled.p`
    font-size: 13px;
`
const ColorKeyWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
`
const AncestorColorContainer = ({className, ...props}) =>{
    return (
        <Wrapper id="ancestorColorKey" className={["borderRadius", className].join(' ')}>
            <Title className="mb-13">Ancestors</Title>
            <ColorKeyWrapper>
                {props.dataInput.map(value=>{
                    return <ColorKeys color={value.color} className="mr-13">{value.name}</ColorKeys>
                })}
            </ColorKeyWrapper>
        </Wrapper>
    )
}
export default AncestorColorContainer;