import { GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from "../actions/actionsTypes.js";
import initialStates from "./initialStates.js";

const postReducer = (state = initialStates.allPostDatas, action) => {
    switch (action.type) {
        case GET_POSTS:
            if (state.error === null) {
                return { ...state.allPostDatas, posts: action.payload, loading: false, error: null }
            } else {
                return { ...state.allPostDatas, posts: [], loading: false, error: action.payload }
            }
        case CREATE_POST:
            return { state, posts: [...state.posts, action.payload] };
        case UPDATE_POST:
            return { state, posts: state.posts.map(post => (post._id === action.payload._id ? action.payload : post)) }
        case DELETE_POST:
            return { state, posts: state.posts.filter(post => post._id !== action.payload) }
        default:
            return state;
    }
}

export default postReducer;