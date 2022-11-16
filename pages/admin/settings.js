import SettingsView from "../../view/admin/settingsView";
import {Wrapper} from "./index";

const Settings = props =>{
return (
  <Wrapper>
    <SettingsView/>
  </Wrapper>
)
}
export default Settings;
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