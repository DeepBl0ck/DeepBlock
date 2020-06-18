export default {
    SET_TOKEN(state, { token, payload }) {
        state.token = token;
        state.payload = payload;
    },
    CLEAR_TOKEN(state) {
        state.token = null;
        state.payload = null;
    }
}