import { dataActions } from "../store/reducers/dataReducer";
import { uiActions } from "../store/reducers/uiReducer";
import { colorCodeFamilyList } from "./helper";
import treeGenerator from "./treeGenerator";
export const fetchTreeFromAddView = (dispatch) =>{
    const {addTreeData, addAncestorColorData} = dataActions
    const {addIsLoading} = uiActions
    dispatch(addIsLoading(true))
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
        dispatch(addIsLoading(false))
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

export const fetchTreeAndColorForIndex = (dispatch) =>{
    const {addTreeData, addAncestorColorData, addTreeDataList} = dataActions
    const {addPageLoading, addDisplayMessage} = uiActions
    dispatch(addPageLoading(true))
    fetch('/api/main').then(response => {
        return response.json(); 
    }).then(data => {
        if(data.data){
            let tree = data.data.tree.tree
            let colorCode = data.data.colorCode
            dispatch(addTreeData(tree))
            dispatch(addAncestorColorData((colorCode)))
            dispatch(addTreeDataList(colorCodeFamilyList(tree, colorCode)))

        }
        if(data.error){
            throw data.error
        }
        dispatch(addPageLoading(false))
    }).catch((error)=>{
        dispatch(addPageLoading(false))
        // dispatch(addDisplayMessage(error))
        // setInterval(() => {
        //     dispatch(addDisplayMessage(false))
        // }, 1500);
        console.error('There has been a problem,', error);
    });
    
}

export const updateMemberProfile = (dispatch, data) =>{
    const {addTreeData, addAncestorColorData, addTreeDataList} = dataActions
    const {addPageLoading, addDisplayMessage} = uiActions
    dispatch(addPageLoading(true))
    fetch('/api/add', { 
        method: 'PUT', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)}).then(response => {
            return response.json(); 
        }).then(data => {
            if(data.data){
                let tree = data.data.tree
                dispatch(addTreeData(tree))
                dispatch(addPageLoading(false))
                dispatch(addDisplayMessage("Successfully added"))
                setInterval(() => {
                    dispatch(addDisplayMessage(false))
                }, 1500);
                //console.log("added")                
            }
            if(data.error){
                throw data.error
            }
        }).catch((error)=>{
            dispatch(addPageLoading(false))
            dispatch(addDisplayMessage(error))
            setInterval(() => {
                dispatch(addDisplayMessage(false))
            }, 1500);
            console.error('There has been a problem,', error);
        })
}