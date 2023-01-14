import jwt_decode from "jwt-decode";


export const signInGoogle =  (res, navigate) => { 
      const token = jwt_decode(res.credential); 
      console.log(token)
      localStorage.setItem("profile", JSON.stringify({result: {name: token.given_name+ " " + token.family_name , email: token.email, _id: token.sub, imageUrl: token.picture}, token: res.credential}));
      navigate("/");
} 

export default signInGoogle