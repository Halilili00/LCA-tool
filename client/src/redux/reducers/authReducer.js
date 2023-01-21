import { AUTH, LOGOUT } from "../actions/actionsTypes.js";
import initialStates from "./initialStates.js";

const authReducer = (state = initialStates, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return {...state, authData: action.data}
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null};
        default:
            return state;
    }
}

export default authReducer;