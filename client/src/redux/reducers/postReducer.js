import { GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from "../actions/actionsTypes.js";
import initialStates from "./initialStates.js";

const postReducer = (state = initialStates, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {allPostDatas: action.payload}
        case CREATE_POST:
            return {allPostDatas: [...state.allPostDatas, action.payload]};
        case UPDATE_POST:
            return {allPostDatas: state.allPostDatas.map(post => (post._id === action.payload._id ? action.payload : post))}
        case DELETE_POST:
            return {allPostDatas: state.allPostDatas.filter(post => post._id !== action.payload)}
        default:
            return state;
    }
}

export default postReducer;