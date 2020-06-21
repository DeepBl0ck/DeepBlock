import jwtdecode from "jwt-decode";
import auth from "@/service/auth";

export default {
    login({ commit }, user){
        return auth.login(user)
            .then((res) => {
                const { data: { token } } = res;
                const payload = jwtdecode(token);
                console.log(`store::auth::login token pay : ${JSON.stringify(payload)}`);
                commit('SET_TOKEN', { token, payload });
                return payload;
            })
            .catch((err) => {
                console.log(err.response)
                const { message } = err.response ? err.response.data : err;
                return Promise.reject(message);
            });
    },
    logout({ commit }){
        return commit('CLEAR_TOKEN')
    }
}
