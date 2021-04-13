import Vue from "vue";
import Vuex from "vuex";
import { fetchAlbums } from "./api";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    albums: [],
  },
  getters: {
    albums: ({ albums }) => {
      return albums;
    },
  },
  mutations: {
    SET_ALBUMS: (state, payload) => {
      state.albums = payload;
    },
  },
  actions: {
    getAlbums: ({ commit }) => {
      fetchAlbums().then((json) => {
        commit("SET_ALBUMS", json);
      });
    },
  },
});
