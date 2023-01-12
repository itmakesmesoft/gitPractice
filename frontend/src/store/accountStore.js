import {
  requestLogin,
  requestRegister,
  requestMe,
  requestId,
} from "../common/api/accountAPI";

const state = {
  token: null,
  user: null,
  checkId: true,
};

const getters = {
  getToken: (state) => {
    return state.token;
  },
  getUser: (state) => {
    return state.user;
  },
  getCheckId: (state) => {
    return state.checkId;
  },
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
    // console.log("loginACTINO", token);
  },
  setUser: (state, data) => {
    state.user = data;
  },
  setCheckId: (state, checkId) => {
    state.checkId = checkId;
  },
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
      commit("setUser", response);
    } catch (err) {
      console.log("111");
    }
  },
  idAction: async ({ commit }, idData) => {
    console.log(idData, "------axios------");
    const response = await requestId(idData);
    console.log(response.data);
    commit("setCheckId", response.data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
