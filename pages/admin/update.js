import { Wrapper } from ".";
import UpdateView from "../../view/admin/updateView";
import { useRef } from "react";
import { getSession } from "next-auth/react";
import {PageLoading, MessageModal} from '../../components/core/core'
import { useSelector } from "react-redux";

const Update = props =>{
  const wrapperRef = useRef()
  const isLoading = useSelector(state=>state.ui.isPageLoading)
  const displayMessage = useSelector(state=>state.ui.displayMessage)
return (
    <Wrapper ref={wrapperRef}>
        {isLoading && <PageLoading bgColor="rgba(255, 255, 255,0.75)"/>}
        {(displayMessage && !isLoading) && <MessageModal>{displayMessage}</MessageModal>}
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