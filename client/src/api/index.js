import axios from "axios"

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const getData = (userID) => API.get(`/posts/${userID}`);
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (postID, updatedPost) => API.patch(`/posts/${postID}`, updatedPost)
export const deletePost = (postID) => API.delete(`/posts/${postID}`);