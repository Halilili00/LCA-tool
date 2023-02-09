import { AUTH, LOGOUT } from "../actions/actionsTypes.js";
import initialStates from "./initialStates.js";

const authReducer = (state = initialStates, action) => {
    switch (action.type) {
        case AUTH:
            if(action.data){
                localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
                return {...state, authData: action.data, error: null}
            } else {
                return {...state, authData: action.data, error: action.error ? action.error?.response?.data?.message : null}
            }
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null, error: null};
        default:
            return state;
    }
}

export default authReducer;