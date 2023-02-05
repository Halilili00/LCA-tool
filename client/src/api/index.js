import axios from "axios"

const API = axios.create({ baseURL: 'http://lcatool.norwayeast.cloudapp.azure.com/api/' }) // For coding
//const API = axios.create({ baseURL: '/api' }) // For deploying


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const getData = (userID) => API.get(`posts/${userID}`);
export const createPost = (newPost) => API.post('posts', newPost)
export const updatePost = (postID, updatedPost) => API.patch(`posts/${postID}`, updatedPost)
export const deletePost = (postID) => API.delete(`posts/${postID}`);

export const getAllData = () => API.get(`/posts`);

export const signUpAdmin = (signData) => API.post('user/signup', signData);
export const signInAdmin = (signData) => API.post('user/signin', signData);