export default {
    isLoggedin: (state) => null !== state.token,
    payload: (state) => state.payload,
    token: (state) => state.token,
    username: (state) => null !== state.payload ? state.payload.username : null,
    email: (state) => null !== state.payload ? state.payload.email : null,
}