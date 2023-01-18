import * as actions from "./actionsTypes.js"
import jwt_decode from "jwt-decode";

export const signInGoogle = (res, navigate) => async (dispatch) => {
    try {
        const token = jwt_decode(res.credential);
        //console.log(token)
        dispatch({
            type: actions.AUTH,
            data: { result: { name: token.given_name + " " + token.family_name, email: token.email, _id: token.sub, imageUrl: token.picture }, token: res.credential }
        })
        //localStorage.setItem("profile", JSON.stringify({result: {name: token.given_name+ " " + token.family_name , email: token.email, _id: token.sub, imageUrl: token.picture}, token: res.credential}));
        navigate("/");
    } catch (error) {
        console.log(error)
    }
}

export const logout = () => {
    return {type: actions.LOGOUT}
}