import * as actions from "./actionsTypes.js"
import jwt_decode from "jwt-decode";
import * as api from "../../api/index.js"

export const signInGoogle = (res, navigate) => async (dispatch) => {
    try {
        const token = jwt_decode(res.credential);
        //console.log(token)
        dispatch({
            type: actions.AUTH,
            data: { result: { name: token.given_name + " " + token.family_name, email: token.email, _id: token.sub, imageUrl: token.picture, authMode: "Google"}, token: res.credential }
        })
        //localStorage.setItem("profile", JSON.stringify({result: {name: token.given_name+ " " + token.family_name , email: token.email, _id: token.sub, imageUrl: token.picture}, token: res.credential}));
        navigate("/Forms");
    } catch (error) {
        console.log(error)
    }
}

export const signInMicrosoft = (res, navigate)=> async(dispatch) => {
    try {
        const token = jwt_decode(res.idToken)
        //console.log(token)
        dispatch({
            type: actions.AUTH,
            data: { result: { name: token.name.split(" ").reverse().join(" ").replace(",", ""), email: token.email, _id: token.sub, authMode: "Microsoft"}, token: res.idToken }
        })
        navigate("/Forms");
    } catch (error) {
        console.log(error)
    }
}

export const signInAdmin = (signData, navigate) => async(dispatch) => {
    try {
        const {data} = await api.signInAdmin(signData);
        dispatch({type: actions.AUTH, data})
        navigate("/Forms")
    } catch (error) {
        console.log(error)
    }
}

export const logout = () => {
    return {type: actions.LOGOUT}
}