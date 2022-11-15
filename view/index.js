import {PageWrapper, ZoomLabel} from "../components/core/core"
import {Header, TreeArea, Sidebar} from "../components/layouts/layouts"
import {LoadMoreBtn, ZoomBtnFloat} from "../components/containers/containers"
import { useSelector } from "react-redux";

const IndexPage = props =>{
    const showLoadMoreBtn = useSelector(state=>state.ui.showLoadMore)
    const showZoomLabel = useSelector(state=>state.ui.showZoomLabel)
    return (
        <PageWrapper>
            <Header/>
            <TreeArea/>
            {showLoadMoreBtn && <LoadMoreBtn/>}
            <ZoomBtnFloat/>
            <Sidebar/>
            {showZoomLabel && <ZoomLabel/>}
        </PageWrapper>
    )
}
export default IndexPage;