import styled from "styled-components";
import {Button, ZoomBtn} from '../core/core';
const Wrapper  = styled.div`
    width: 100%;
    height: auto;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
`
const InnerWrappers = styled.div`
    position: relative;
    width: 100%;
`
const BtnWrapper  = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const ZoomWrapper  = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const Footer = props =>{
    return (
        <Wrapper className="level-3 pr-13 pl-13">
            <InnerWrappers>
                <BtnWrapper>
                    <Button borderless>Load More</Button>
                </BtnWrapper>
                <ZoomWrapper>
                    <ZoomBtn/>
                </ZoomWrapper>
            </InnerWrappers>
        </Wrapper>
    )
}
export default Footer;