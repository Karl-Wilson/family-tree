import SettingsView from "../../view/admin/settingsView";
import {Wrapper} from "./index";
import {getSession } from "next-auth/react";
const Settings = props =>{
return (
  <Wrapper>
    <SettingsView/>
  </Wrapper>
)
}
export default Settings;
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