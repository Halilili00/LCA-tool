import { GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, ERROR, LOADING } from "../actions/actionsTypes.js";
import initialStates from "./initialStates.js";

const postReducer = (state = initialStates.allPostDatas, action) => {
    switch (action.type) {
        case GET_POSTS:
            return { ...state.allPostDatas, posts: action.payload, loading: false, error: null }
        case CREATE_POST:
            return { state, posts: [action.payload, ...state.posts], loading: false, error: null };
        case UPDATE_POST:
            console.log(action.payload)
            return { state, posts: state.posts.map(post => (post._id === action.payload._id ? action.payload : post)), loading: false, error: null }
        case DELETE_POST:
            return { state, posts: state.posts.filter(post => post._id !== action.payload), loading: false, error: null }
        case ERROR:
            return { ...state, error: action.payload, loading: false }
        case LOADING:
            return { ...state, loading: action.payload}
        default:
            return state;
    }
}

export default postReducer;