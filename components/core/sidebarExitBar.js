import styled from "styled-components";
const Wrapper  = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    @media screen and (min-width: 992px){
        justify-content: flex-end;
    }
`
const BackIcon  = styled.img`
    width: 25px;

`
const CloseIcon  = styled.img`
    width: 25px;
    display: none;
    @media screen and (min-width: 992px){
        display: block;
        cursor: pointer;
    }
`
const IconContainer = styled.div`
    width: 34px;
    height: 34px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (min-width: 992px){
        display: none;
    }
`
export const showSidebar = () =>{
    if(document.getElementById('sidebar').classList.contains('showSidebar')){
        document.getElementById('sidebar').classList.remove('showSidebar')
        document.getElementById('sidebar').classList.add('hideSidebar')
        document.querySelector("input[name='StartSearch']").value = ""
        document.querySelector("input[name='EndSearch']").value = ""

    }else{
        document.getElementById('sidebar').classList.add('showSidebar')
        document.getElementById('sidebar').classList.remove('hideSidebar')
    }  
}

const SidebarExitBar = props =>{
    return (
        <Wrapper>
            <IconContainer>
                <BackIcon src="./images/back.svg" onClick={showSidebar} />
            </IconContainer>
            <CloseIcon src="./images/close.svg" onClick={showSidebar}/>
        </Wrapper>
    )
}
export default SidebarExitBar;