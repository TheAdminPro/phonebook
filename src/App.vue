<template>
  <div id="app">
    <AppHeader
      @createTableVisible='editTableVisible'/>
    <DataTable
      @editTableVisible='editTableVisible' />
    <EditRecord
      ref="EditRecord"
      :editData='editData' />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import DataTable from './components/DataTable.vue';
import EditRecord from './components/EditRecord.vue';

export default {
  methods: {
    editTableVisible(row) {
      this.editData = row;
      this.$refs.EditRecord.toggleVisible();
    },
  },
  data() {
    return {
      editData: [],
    };
  },
  name: 'App',
  components: {
    AppHeader,
    DataTable,
    EditRecord,
  },
};
</script>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
}

#app {
  position: relative;
  font-family: 'Ubuntu', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  padding: 0 10px;
  background: url('../src/assets/bg.jpg') no-repeat center;
  background-size: cover;
}
</style>
