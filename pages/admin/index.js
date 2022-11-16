import styled from "styled-components";
import Dashboard from "../../view/admin/dashboard";
import { useSelector } from "react-redux";
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
    const user = true;
    if (!user) {
        return {
          redirect: {
            destination: '/admin/login',
            permanent: false,
          },
        }
      }
    
    return {
      props: {user: user}, // will be passed to the page component as props
    }
  }
  