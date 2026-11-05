const { createStore } = Vuex;

window.loginStore = createStore({
	state() {
		return {
			showLoading: true,
			session: null,
			inf: null
		};
	},
	mutations: {
		SET_LOADING(state, boo) {
			state.showLoading = boo;
		},
		setSession(state, session) {
			state.session = session;
		},
		setinfo(state, n) {
			
			state.inf = n;
		}
	},
	actions: {
		SET_LOADING_ACTION({ commit }, boo) {
			if (boo) {
				commit("SET_LOADING", boo);
			} else {
				setTimeout(() => {
					commit("SET_LOADING", boo);
				}, 500);
			}
		},
	}
});
