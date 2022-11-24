import { dataActions } from "../store/reducers/dataReducer";
import { uiActions } from "../store/reducers/uiReducer";
export const fetchTreeFromAddView = (dispatch) =>{
    const {addTreeData, addAncestorColorData} = dataActions
    fetch("/api/add").then(response => {
        return response.json(); 
    }).then(data => {
        if(data.data){
            dispatch(addTreeData(data.data.tree))
            dispatch(addAncestorColorData(data.data.colorCode))
        }
        if(data.error){
            throw data.error
        }
    }).catch((error) => {
        console.error('There has been a problem,', error);
    });
}

export const addNewMember = (data, dispatch) =>{
    const {addTreeData} = dataActions
    const {addPageLoading, addDisplayMessage} = uiActions
    dispatch(addPageLoading(true))
    fetch("/api/add", { 
        method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify(data)
    }).then(response => {
        return response.json(); 
    }).then(data => {
        if(data.data){
            dispatch(addTreeData(data.data.tree))
            dispatch(addPageLoading(false))
            dispatch(addDisplayMessage("Successfully added"))
            setInterval(() => {
                dispatch(addDisplayMessage(false))
            }, 1500);
            console.log("added")
        }
        if(data.error){
            throw data.error
        }
    }).catch((error) => {
        dispatch(addPageLoading(false))
        dispatch(addDisplayMessage(error))
        setInterval(() => {
            dispatch(addDisplayMessage(false))
        }, 1500);
        console.error('There has been a problem,', error);
    });
}