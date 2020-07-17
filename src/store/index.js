/* eslint-disable camelcase */
import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

const axios = Axios.create({
  baseURL: 'http://localhost/phonebook-server/index.php',
});

export default new Vuex.Store({
  state: {
    isAdminAccount: false,
    tableData: [],
  },
  mutations: {
    updateAccount: (state, isAdmin) => {
      state.isAdminAccount = isAdmin;
    },
    requestRecords: (state, data) => {
      state.tableData = data;
    },
    insertRecord: (state, record) => {
      state.tableData.unshift(record);
    },
    updateRecord: (state, record) => {
      state.tableData = state.tableData.map((rec) => {
        if (rec.user_id === record.user_id) return record;
        return rec;
      });
    },
    deleteRecord: (state, userId) => {
      state.tableData = state.tableData.filter(({ user_id }) => user_id !== userId);
    },
  },
  actions: {
    // Update Account
    async updateAccount({ commit }, loginData) {
      const response = await axios.post('/update', { ...loginData });
      if (response.status === 200) commit('updateAccount', response.data);
    },
    // Get Records
    async requestRecords({ commit }) {
      const response = await axios.get('/records');
      if (response.status === 200) commit('requestRecords', response.data);
    },
    // Insert Record
    async insertRecord({ commit }, insertData) {
      const data = {
        ...insertData,
        category: insertData.category[0],
        post: insertData.post[0],
      };
      const response = data.user_id ? await axios.patch('/update-record', data) : await axios.post('/insert-record', data);

      if (!response.status === 200 && !response.data) return false;
      if (data.user_id) commit('updateRecord', data);
      else commit('insertRecord', { ...data, user_id: response.data });
      return true;
    },
    // Delete Record
    async deleteRecord({ commit }, userId) {
      const response = await axios.delete('/delete-record', {
        data: { userId },
      });

      if (response.status === 200) commit('deleteRecord', userId);
    },
  },
  getters: {
    getIsAdminAccount: (state) => state.isAdminAccount,
    getTableData: (state) => state.tableData,
  },
  modules: {
  },
});
