import {
  requestLogin,
  requestRegister,
  requestMe
} from "../common/api/accountAPI";

const state = {
  token: null
};

const getters = {
  getToken: state => {
    return state.token;
  }
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
    // console.log("loginACTINO", token);
  }
};

const actions = {
  loginAction: async ({ commit }, loginData) => {
    console.log(loginData, "------------");
    const response = await requestLogin(loginData);
    console.log(response);
    commit("setToken", response.data.accessToken);
  },
  logoutAction: ({ commit }) => {
    commit("setToken", null);
  },
  mountAction: async ({ commit }) => {
    const local = await localStorage.getItem("token");
    commit("setToken", local);
  },
  registerAction: async ({ commit }, registerData) => {
    try {
      console.log(registerData, "------------");
      const response = await requestRegister(registerData);
      console.log(response);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getMeAction: async ({ commit }, token) => {
    try {
      // console.log("token : ", token);
      const response = await requestMe(token);
      console.log("getMe : ", response);
    } catch (err) {
      console.log(err);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
