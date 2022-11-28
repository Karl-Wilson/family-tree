import { useRouter } from "next/router";
import { InnerWrapper as Wrapper , Header, Title, Body, Footer, SubmitBtn, Logout, FormGroup, Radio, Label, Form} from "./myStyledComponents";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { fetchTreeFromAddView } from "../../utils/thunks";
import { useDispatch, useSelector } from "react-redux";

export const useFetchData = (dispatch, treeData, ancestorColorData) =>{
    useEffect(() => {
            if(!treeData && !ancestorColorData){
                fetchTreeFromAddView(dispatch)
            } 
        }, [])  
}
const Dashboard = props =>{
    const router = useRouter();
    const dispatch = useDispatch()
    const treeData = useSelector(state=>state.data.treeData)
    const ancestorColorData = useSelector(state=>state.data.ancestorColorData)
    useFetchData(dispatch, treeData, ancestorColorData)

    const actionSelectHandler = (e) =>{
        let selectedAction  = document.querySelector("input[name='actions']:checked")
        let currentUrl = router.pathname
        if(selectedAction){
            router.push(`${currentUrl}/${selectedAction.value}`)
        }   
    }
    const clickHandler = (e) =>{
        e.target.previousSibling.checked = true;
    }
    return (
    <Wrapper className="p-21">
        <Header>
            <Title>Admin</Title>
            <Logout onClick={() => signOut()}>Logout</Logout>
        </Header>
        <Body>
            <Form>
                <p>What do you want to do today?</p>
                <FormGroup className="mt-13">
                    <FormGroup flexDirection="row"><Radio type="radio" className="mb-13" name="actions" value="update"/><Label className="ml-13" onClick={clickHandler}>Update</Label></FormGroup>
                    <FormGroup flexDirection="row"><Radio type="radio" className="mb-13" name="actions" value="add" /><Label className="ml-13" onClick={clickHandler}>Add new person</Label></FormGroup>
                    <FormGroup flexDirection="row"><Radio type="radio" className="mb-13" name="actions" value="settings" /><Label className="ml-13" onClick={clickHandler}>General Settings</Label></FormGroup>
                </FormGroup>
            </Form>
        </Body>
        <Footer>
            <SubmitBtn borderless onClick={actionSelectHandler}>Next</SubmitBtn>
        </Footer>

    </Wrapper>
    )
}
export default Dashboard;