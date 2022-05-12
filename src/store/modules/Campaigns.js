// initial state
const state = () => ({
  basics: {
    title: "",
    tagline: "",
    cardImage: "",
    country: "",
    city: "",
    category: "",
    tags: [],
    duration: "",
    saved: false,
  },
});

// getters
const getters = {};

const mutations = {
  setInitialCampaignBasics(state) {
    state.basics = {
      title: "",
      tagline: "",
      cardImage: "",
      country: "",
      city: "",
      category: "",
      tags: [],
      duration: "",
    };
  },
  setCampaignBasics(state, payload) {
    state["basics"][Object.keys(payload)[0]] = Object.values(payload)[0];
  },
  saveCampaignBasics(state, payload) {
    state["basics"]["saved"] = payload;
  },
};

const actions = {
  setInitialCampaignBasics({ commit }) {
    commit("setInitialCampaignBasics");
  },
  setCampaignBasics({ commit }, form) {
    commit("setCampaignBasics", form);
  },
  saveCampaignBasics({ commit }, saved) {
    commit("saveCampaignBasics", saved);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
