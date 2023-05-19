import * as actions from "./actionsTypes.js"
import jwt_decode from "jwt-decode";
import * as api from "../../api/index.js"

export const signInGoogle = (res, navigate) => async (dispatch) => {
    try {
        const token = jwt_decode(res.credential);
        const signData = { name: token.name, email: token.email, sub: token.sub }
        try {
            const { data } = await api.signInAdmin(signData);
            //console.log({...data, result: { ...data.result, imageUrl: token.picture, authMode: "Google"}})
            dispatch({ type: actions.AUTH, data: {...data, result: { ...data.result, imageUrl: token.picture, authMode: "Google"}} })
        } catch (error) {
            dispatch({
            type: actions.AUTH,
            data: { result: { name: token.given_name + " " + token.family_name, email: token.email, sub: token.sub, imageUrl: token.picture, authMode: "Google" }, token: res.credential }
        })
        }
        //localStorage.setItem("profile", JSON.stringify({result: {name: token.given_name+ " " + token.family_name , email: token.email, _id: token.sub, imageUrl: token.picture}, token: res.credential}));
        navigate("/LCADatas");
    } catch (error) {
        console.log(error)
        dispatch({ type: actions.AUTH, error })
    }
}

export const signInMicrosoft = (res, navigate) => async (dispatch) => {
    try {
        const token = jwt_decode(res.idToken)
        //console.log(token)
        const signData = { name: token.name, email: token.email, sub: token.sub }
        try {
            const { data } = await api.signInAdmin(signData);
            //console.log({...data, result: { ...data.result, imageUrl: token.picture, authMode: "Google"}})
            dispatch({ type: actions.AUTH, data: {...data, result: { ...data.result, imageUrl: token.picture, authMode: "Microsoft"}} })
        } catch (error) {
            dispatch({
                type: actions.AUTH,
                data: { result: { name: token.name.split(" ").reverse().join(" ").replace(",", ""), email: token.email, sub: token.sub, authMode: "Microsoft" }, token: res.idToken }
            })
        }
        
        navigate("/LCADatas");
    } catch (error) {
        console.log(error)

    }
}

export const signInAdmin = (type, res, navigate) => async (dispatch) => {
    try {
        let token;
        if (type === "Google") {
            token = jwt_decode(res.credential);
        } else if (type === "Microsoft") {
            token = jwt_decode(res.idToken);
        }

        console.log(token)

        const signData = { name: token.name, email: token.email, id: token.sub }

        console.log(signData)
        const { data } = await api.signInAdmin(signData);
        dispatch({ type: actions.AUTH, data })
        navigate("/LCADatas")
    } catch (error) {
        console.log(error.response.data.message)
        dispatch({ type: actions.AUTH, error })
    }
}

export const logout = () => {
    return { type: actions.LOGOUT }
}