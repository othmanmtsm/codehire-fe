import axios from 'axios'

export default {
    namespaced: true,
    state: {
        token: null,
        user: null
    },

    getters: {
        authenticated(state){
            return state.token && state.user;
        },

        user(state){
            return state.user;
        }
    },

    mutations: {
        SET_TOKEN(state,token){
            state.token = token;
        },

        SET_USER(state,data){
            state.user = data;
        }
    },

    actions: {
        async signIn({dispatch},credentials){
            let response = await axios.post('auth/signin',credentials,{headers:{Accept: 'application/json'}});
            return dispatch('attempt',response.data.token);
        },

        async attempt({state,commit}, token){
            if (token) {
                commit('SET_TOKEN',token);
            }
            
            if (!state.token) {
                return;
            }

            try {
                let response = await axios.get('auth/me');
                commit('SET_USER', response.data);
            } catch (e) {
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
            }
        },

        async signUp({dispatch},data){
            let response = await axios.post('auth/signup',data,{headers:{Accept: 'application/json'}});
            console.log(response.data);
            return dispatch('signIn',response.data);
        },

        signOut({commit}){
            return axios.post('auth/signout').then(()=>{
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
            })
        }
    },

};