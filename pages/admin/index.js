import styled from "styled-components";
import Dashboard from "../../view/admin/dashboard";
import {getSession } from "next-auth/react";
export const Wrapper  = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: ${props=>props.justify||"center"};
    align-items: center;
`

const Admin = props =>{
    return (
        <Wrapper>
            <Dashboard/>
        </Wrapper>
    )
}
export default Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      }
    }
    
    return {
      props: {session: session}, // will be passed to the page component as props
    }
  }
  