import styled from "styled-components";
import {ZoomBtn} from '../core/core'
const ZoomBtn2  = styled(ZoomBtn)`
    position: absolute;
    bottom: 0;
    right: 0;
    @media screen and (min-width: 992px){
        bottom: 8px;
        right: 8px;
    }
`
const ZoomBtnFloat = props =>{
    return (
        <ZoomBtn2 className="mr-21 mb-21 zIndex-3 shadow-2"/>
    )
}
export default ZoomBtnFloat;