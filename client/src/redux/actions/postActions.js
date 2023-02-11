import * as actions from "./actionsTypes"
import * as api from "../../api/index.js";

export const getAllData = () => async (dispatch) => {
    try {
        dispatch({type: actions.LOADING, payload: true})
        const { data } = await api.getAllData();
        dispatch({ type: actions.GET_POSTS, payload: data })
    } catch (error) {
        dispatch({ type: actions.ERROR, payload: error})
    }
}

export const getData = (userID) => async (dispatch) => {
    try {
        dispatch({type: actions.LOADING, payload: true})
        const { data } = await api.getData(userID)
        dispatch({ type: actions.GET_POSTS, payload: data })
    } catch (error) {
        dispatch({ type: actions.ERROR, payload: error})
    }
}

export const createPost = (newPost) => async (dispatch) => {
    try {
        dispatch({type: actions.LOADING, payload: true})
        const { data } = await api.createPost(newPost)
        dispatch({ type: actions.CREATE_POST, payload: data });
    } catch (error) {
        dispatch({ type: actions.ERROR, payload: error})
    }
}

export const updatePost = (postID, updatedPost) => async (dispatch) => {
    try {
        dispatch({type: actions.LOADING, payload: true})
        const { data } = await api.updatePost(postID, updatedPost)
        dispatch({ type: actions.UPDATE_POST, payload: data });
    } catch (error) {
        dispatch({ type: actions.ERROR, payload: error})
    }
}

export const deletePost = (postID, navigate) => async (dispatch) => {
    try {
        dispatch({type: actions.LOADING, payload: true})
        await api.deletePost(postID);
        dispatch({ type: actions.DELETE_POST, payload: postID });
        if (navigate !== undefined) {
            navigate("/LCADatas")
        }
    } catch (error) {
        dispatch({ type: actions.ERROR, payload: error})
    }
}