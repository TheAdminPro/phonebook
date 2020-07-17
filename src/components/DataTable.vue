<template>
<div class="table-wrap">
  <el-input
    v-if="!getIsAdminAccount"
    v-model="search"
    class="table-wrap__search"
    placeholder="Введите для поиска" />
  <el-table
    :data="filteredData"
    style="width: 100%"
    align="center"
    stripe>
    <el-table-column
      prop="fio"
      label="ФИО"
      width="300">
    </el-table-column>
    <el-table-column
      prop="category"
      label="Подразделение"
      width="300">
    </el-table-column>
    <el-table-column
      prop="post"
      label="Должность"
      width="250">
    </el-table-column>
    <el-table-column
      prop="outside_num"
      label="Городской Номер"
      width="170">
    </el-table-column>
    <el-table-column
      prop="inside_num"
      label="Внутренний Номер"
      width="170">
    </el-table-column>
    <el-table-column
      v-if="getIsAdminAccount"
      prop="ip"
      label="IP address"
      width="150">
    </el-table-column>
    <el-table-column
      v-if="getIsAdminAccount"
      align="center"
      fixed="right"
      width="230">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          @input="searchRecord(scope.$index)"
          size="mini"
          placeholder="Введите для поиска"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="warning"
          @click="handleEdit(scope.$index, scope.row)">
            Изменить <i class="el-icon-edit"></i>
          </el-button>
          <template>
            <el-popconfirm
              confirmButtonText='Да'
              cancelButtonText='Нет, спасибо'
              icon="el-icon-info"
              iconColor="red"
              title="Вы уверены, что хотите удалить это?"
              @onConfirm="handleDelete(scope.$index, scope.row)">
              <el-button
                slot="reference"
                size="mini"
                type="danger"
                class="delete-btn">
                Удалить <i class="el-icon-delete"></i>
              </el-button>
            </el-popconfirm>
          </template>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'DataTable',
  created() {
    this.requestRecords();
  },
  computed: {
    filteredData() {
      return this.getTableData.filter(this.filterRules);
    },
    ...mapGetters(['getTableData', 'getIsAdminAccount']),
  },
  methods: {
    handleEdit(index, rows) {
      this.$emit('editTableVisible', rows);
    },
    handleDelete(index, rows) {
      this.deleteRecord(rows.user_id);
    },
    filterRules(data) {
      return !this.search
      || data.fio.toLowerCase().includes(this.search.toLowerCase())
      || data.category.toLowerCase().includes(this.search.toLowerCase())
      || data.post.toLowerCase().includes(this.search.toLowerCase())
      || data.inside_num.toLowerCase().includes(this.search.toLowerCase())
      || data.outside_num.toLowerCase().includes(this.search.toLowerCase())
      || data.ip.toLowerCase().includes(this.search.toLowerCase());
    },
    searchRecord() {
    },
    ...mapActions(['requestRecords', 'deleteRecord']),
  },
  data() {
    return {
      search: '',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table-wrap{
  margin: 0 auto;
  &__search{
    margin-bottom: 5px;
  }
}
.delete-btn{
  margin-left: 10px;
}
</style>
