import {PageWrapper, ZoomLabel, PageLoading} from "../components/core/core"
import {Header, TreeArea, Sidebar} from "../components/layouts/layouts"
import {LoadMoreBtn, ZoomBtnFloat} from "../components/containers/containers"
import { useSelector } from "react-redux";

const IndexPage = props =>{
    const treeData = useSelector(state=>state.data.treeData)
    const showLoadMoreBtn = useSelector(state=>state.ui.showLoadMore)
    const showZoomLabel = useSelector(state=>state.ui.showZoomLabel)
    const isPageLoading = useSelector(state=>state.ui.isPageLoading)
    return (
        <PageWrapper>
            <Header/>
            {isPageLoading && <PageLoading/>}
            <TreeArea/>
            {showLoadMoreBtn && Object.values(treeData).length > 0 && <LoadMoreBtn/>}
            {Object.values(treeData).length > 0 && <ZoomBtnFloat/>}
            <Sidebar/>
            {showZoomLabel && <ZoomLabel/>}
        </PageWrapper>
    )
}
export default IndexPage;