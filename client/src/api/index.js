import axios from "axios"

//const API = axios.create({ baseURL: 'http://lcatool.norwayeast.cloudapp.azure.com/api/' }) // For coding
//const API = axios.create({ baseURL: 'http://localhost:5000/api/' })
const API = axios.create({ baseURL: 'https://lca-tool.link/api' }) // For deploying


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const getUserData = () => API.get(`posts`);
export const createPost = (tempID, newPost) => API.post(`posts/${tempID}`, newPost)
export const updatePost = (tempID, postID, updatedPost) => API.patch(`posts/${tempID}/${postID}`, updatedPost)
export const deletePost = (tempID, postID) => API.delete(`posts/${tempID}/${postID}`);

export const getAllData = () => API.get(`/posts/admin`);

export const signUpAdmin = (signData) => API.post('user/signup', signData);
export const signInAdmin = (signData) => API.post('user/signin', signData);

export const createapikey = (userData) => API.post('apikey/', userData);
export const getapikey = () => API.get('apikey/');