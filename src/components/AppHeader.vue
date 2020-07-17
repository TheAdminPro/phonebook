<template>
  <div class="app-header">
    <h1 class="app-header__title">
      Тел. справочник
    </h1>
    <el-button
      v-if="getIsAdminAccount"
      @click="handleCreate"
      type="success">
      Создать <i class="el-icon-plus"></i>
    </el-button>
    <el-button
      v-else
      @click="handleUpdate"
      type="primary">
      Войти <i class="el-icon-unlock"></i>
    </el-button>
  </div>
</template>

<script>
// eslint-disable no-alert
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getIsAdminAccount']),
  },
  methods: {
    handleCreate() {
      this.$emit('createTableVisible', null);
    },
    async handleUpdate() {
      const login = prompt('Введите логин').trim();
      const password = prompt('Введите пароль').trim();

      if (login != null && password != null) await this.updateAccount({ login, password });
      if (!this.getIsAdminAccount) this.$message.error('Неверный логин или пароль');
    },
    ...mapActions(['updateAccount']),
  },
};
</script>

<style lang="scss" scoped>
.app-header{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 999;
  &__title{
    margin-right: 15px;
  }
}
</style>
