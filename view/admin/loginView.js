import { useState } from "react";
import {signIn} from 'next-auth/react'
import { InnerWrapper as Wrapper, Header, Body, Footer, Title, Form, FormGroup, Label, Input, SubmitBtn, ErrorMessage } from "./myStyledComponents";
const LoginView = props =>{
    const [error, setError] = useState();
    const submitHandler = async () =>{
       let username = document.querySelector("input[name='username']").value
       let password = document.querySelector("input[name='password']").value
       if(username && password){
            let result = await signIn('login', {redirect: false, username: username, password: password})
            if(result.ok){
                //redirect
                location.reload()
            }else{
                console.log(result.error)
                setError('Username or Password is not correct')
            }
        }else{
            setError('Username or Password is not correct')
        }
       

    }
    return (
        <Wrapper borderless className="p-21">
            <Header>
                <Title>Login</Title>
            </Header>
            <Body>
                    {error && <ErrorMessage className="p-13 mb-21">{error}</ErrorMessage>}
                    <FormGroup>
                        <Label className="mb-8">Username</Label>
                        <Input type="text" className="p-8 mb-21" name="username"/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="mb-8">Password</Label>
                        <Input type="password" className="p-8" name="password"/>
                    </FormGroup>
            </Body>
            <Footer>
                <SubmitBtn borderless onClick={submitHandler}>Login</SubmitBtn>
            </Footer>
        </Wrapper>
    )
}
export default LoginView;