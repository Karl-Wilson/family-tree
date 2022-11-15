import styled from "styled-components";
import { useSelector } from "react-redux";
const Wrapper  = styled.div`
    width: 50px;
    height: auto;
    background-color: rgba(0,0,0,0.8);
    border-radius: 10px;
    font-size: 13px;
    box-sizing: border-box;
    position: absolute;
    top: calc(50vh - 25px);
    left: calc(50vw - 25px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p{
        color: #ffffff;
    }
`
const ZoomLabel = props =>{
    const zoomPercentage = useSelector(state=>state.ui.zoomPercentage)
    return (
        <Wrapper className="p-13 zIndex-4 shadow-3">
            <p>{zoomPercentage}%</p>
        </Wrapper>
    )
}
export default ZoomLabel;