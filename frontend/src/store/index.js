import { createStore } from "vuex";
import accountStore from "./accountStore";
import menuStore from "./menuStore";
import platformInfoStore from "./platformInfoStore";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  modules: {
    accountStore,
    menuStore,
    platformInfoStore
  },
  plugins: [createPersistedState()]
  // plugins: [createPersistedState({ paths: ["accountStore"] })]
});
