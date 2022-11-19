import { Wrapper } from ".";
import LoginView from "../../view/admin/loginView";

import { getSession } from "next-auth/react";

const Login = props =>{
return (
    <Wrapper>
        <LoginView/>
    </Wrapper>
)
}
export default Login;
export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (session){
        return {
            redirect: {
              destination: '/admin',
              permanent: false,
            },
          }
      }
      return {
        props: {}, // will be passed to the page component as props
      }
  }