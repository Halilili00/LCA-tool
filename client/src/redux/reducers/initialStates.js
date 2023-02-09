const states = {
    authData: JSON.parse(localStorage?.getItem("profile")),
    allPostDatas:{posts: [], loading: true, error: null},
}

export default states;