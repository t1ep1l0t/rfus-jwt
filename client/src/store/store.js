import { createStore } from "vuex";

const store = createStore({
    state: {
        user: {
            username: null,
            _id: null,
            refresh_token: localStorage.refresh_token || null,
        },
        access_token: localStorage.access_token || null
    },
    mutations: {
        set_user (state, payload) {
            console.log(payload)
            state.user.username = payload.user?.username;
            state.user._id = payload.user?._id;
            state.user.refresh_token = payload.user?.refresh_token;
            state.access_token = payload.access_token;

            localStorage.access_token = state.access_token
            localStorage.refresh_token = state.refresh_token
        },
        set_access_token (state, payload) {

        },
        set_refresh_token (state, payload) {
            state.refresh_token = payload.refresh_token
        }
    },
    actions: {
        async check_access_token () {
            const response = await fetch('http://localhost:5001/api/check_access_token', {
                headers: {
                    'Authorization': `Bearer ${localStorage.access_token}`
                }
            });

            const result = await response.json();

            if (response.status === 200) {
                this.commit('set_user', {
                    user: result.user,
                    access_token: result.access_token
                })
            }
            else {
                this.dispatch('check_refresh_token')
            }


        },
        async check_refresh_token (state) {
            const response = await fetch('http://localhost:5001/api/check_refresh_token', {
                headers: {
                    'Authorization': `Bearer ${state.refresh_token}`
                }
            });

            const result = await response.json();
            console.log(result)
        }
    }
});

export default store;