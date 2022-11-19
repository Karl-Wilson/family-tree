import { Wrapper } from ".";
import UpdateView from "../../view/admin/updateView";
import { useRef } from "react";
import { getSession } from "next-auth/react";

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