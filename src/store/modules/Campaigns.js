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
  content: {
    videoUrl: "",
    videoOverlayImage: "",
    pitchImage: "",
    story: "",
    faqs: [],
  },
  perks: [],
  perkItems: [],
  team: {
    legalFirstName: "",
    legalLastName: "",
    birth: "",
    phoneNumber: "",
    country: "",
    street: "",
    email: "",
  },
  optIntoService: false,
});

let perkItemId = 0;
let perkId = 0;

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
  setCampaignContent(state, payload) {
    state["content"][Object.keys(payload)[0]] = Object.values(payload)[0];
  },
  addFaq(state) {
    state["content"]["faqs"].push({ question: "", answer: "" });
  },
  removeFaq(state, id) {
    state["content"]["faqs"] = state["content"]["faqs"].filter(
      (faq, index) => index !== id
    );
  },
  updateFaq(state, data) {
    state["content"]["faqs"].forEach((faq, id) => {
      if (id === data.index) faq[data.key] = data.value;
    });
  },
  filterFaq(state) {
    state["content"]["faqs"] = state["content"]["faqs"].filter(
      (faq) => faq.question && faq.answer
    );
  },
  addPerk(state, data) {
    perkId++;
    state["perks"].push({ ...data, id: perkId });
  },
  deletePerk(state, payload) {
    state["perks"] = state["perks"].filter((perk) => perk.id !== payload.id);
  },
  updatePerk(state, payload) {
    for (let i = 0; i < state["perks"].length; i++) {
      if (state["perks"][i].id == payload.id) state["perks"][i] = payload;
    }
  },
  addPerkItem(state, payload) {
    perkItemId++;
    state["perkItems"].push({ label: payload.item, value: perkItemId });
  },
  setCampaignTeam(state, payload) {
    state["team"][Object.keys(payload)[0]] = Object.values(payload)[0];
  },
  setOptIntoService(state, payload) {
    state["optIntoService"] = payload;
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
  setCampaignContent({ commit }, form) {
    commit("setCampaignContent", form);
  },
  addFaq({ commit }) {
    commit("addFaq");
  },
  removeFaq({ commit }, id) {
    commit("removeFaq", id);
  },
  updateFaq({ commit }, data) {
    commit("updateFaq", data);
  },
  filterFaq({ commit }) {
    commit("filterFaq");
  },
  addPerk({ commit }, data) {
    commit("addPerk", data);
  },
  deletePerk({ commit }, data) {
    commit("deletePerk", data);
  },
  updatePerk({ commit }, data) {
    commit("updatePerk", data);
  },
  addPerkItem({ commit }, data) {
    commit("addPerkItem", data);
  },
  setCampaignTeam({ commit }, data) {
    commit("setCampaignTeam", data);
  },
  setOptIntoService({ commit }, data) {
    commit("setOptIntoService", data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
