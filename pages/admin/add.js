import AddView from "../../view/admin/addView";
import {Wrapper} from "./index"
const AddNew = props =>{
return (
  <Wrapper>
    <AddView/>
  </Wrapper>
)
}
export default AddNew;

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