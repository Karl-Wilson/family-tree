import { useState } from "react";
import styled from "styled-components";
import { InnerWrapper as Wrapper, Header, Body, Footer, Title, Form, FormGroup, Label, Input, SubmitBtn, ErrorMessage } from "./myStyledComponents";
const LoginView = props =>{
    const [error, setError] = useState("Username/Passowrd incorrect");
    return (
        <Wrapper borderless className="p-21">
            <Header>
                <Title>Login</Title>
            </Header>
            <Body>
                    {error && <ErrorMessage className="p-13 mb-21">{error}</ErrorMessage>}
                    <FormGroup>
                        <Label className="mb-8">Username</Label>
                        <Input type="text" className="p-8 mb-21"/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="mb-8">Password</Label>
                        <Input type="password" className="p-8"/>
                    </FormGroup>
            </Body>
            <Footer>
                <SubmitBtn borderless>Login</SubmitBtn>
            </Footer>
        </Wrapper>
    )
}
export default LoginView;