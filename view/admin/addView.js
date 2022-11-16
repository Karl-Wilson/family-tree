import styled from "styled-components";
import { useRouter } from "next/router";
import { InnerWrapper as Wrapper , Header, Title, Body, Footer, SubmitBtn, BackBtn, FormGroup, Radio, Label, Form, Input} from "./myStyledComponents";

const AddView = props =>{
    const router = useRouter()
    return (
        <Wrapper className="p-21">
            <Header>
                <Title>Add New</Title>
            </Header>
            <Body>
                <p className="mb-21">What do you want to add?</p>
                <FormGroup className="mb-21">
                    <Label className="mb-8">Parent</Label>
                    <Input type="text" className="p-8"/>
                </FormGroup>
                <FormGroup className="mb-21">
                    <Label className="mb-8">Firstname</Label>
                    <Input type="text" className="p-8"/>
                </FormGroup>
                <FormGroup className="mb-21">
                    <Label className="mb-8">Lastname</Label>
                    <Input type="text" className="p-8"/>
                </FormGroup>
            </Body>
            <Footer justifyContent="space-between">
                <BackBtn borderless onClick={() => router.back()} className="mt-8 mt-lg-0">Back</BackBtn>
                <SubmitBtn borderless>Add</SubmitBtn>
            </Footer>
        </Wrapper>
    )
}
export default AddView;