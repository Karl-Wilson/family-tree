import { Wrapper } from ".";
import UpdateView from "../../view/admin/updateView";
import { useRef } from "react";

const Update = props =>{
  const wrapperRef = useRef()
return (
    <Wrapper ref={wrapperRef}>
        <UpdateView parentRef={wrapperRef}/>
    </Wrapper>
)
}
export default Update;
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