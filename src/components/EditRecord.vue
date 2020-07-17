<template>
  <el-dialog
   :visible.sync="dialogVisible"
    width="80%">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm">

      <el-form-item label="ФИО" prop="fio">
        <el-input v-model="ruleForm.fio"></el-input>
      </el-form-item>

      <el-form-item label="Подразделение" prop="category">
        <el-select
          v-model="ruleForm.category"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Выберете подразделение">
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Должность" width="100" prop="post">
        <el-select
          v-model="ruleForm.post"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Выберете должность">
          <el-option
            v-for="item in postOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Городской номер" prop="outside_num">
        <el-input v-model="ruleForm.outside_num"></el-input>
      </el-form-item>

        <el-form-item label="Внутренний номер" prop="inside_num">
        <el-input v-model="ruleForm.inside_num"></el-input>
      </el-form-item>

        <el-form-item label="IP address" prop="ip">
        <el-input v-model="ruleForm.ip"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Отправить</el-button>
        <el-button @click="resetForm('ruleForm')">Очистить</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import categoryJSON from '../assets/category.json';
import postJSON from '../assets/post.json';

export default {
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false;

        const result = this.insertRecord(this.ruleForm);
        if (result) {
          this.toggleVisible();
          this.$message({
            message: 'Изменения сохранены',
            type: 'success',
          });
        } else {
          this.$message.error('К сожалению, что-то пошло не так');
        }
        return true;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toggleVisible() {
      this.dialogVisible = !this.dialogVisible;
    },
    ...mapActions(['insertRecord']),
  },
  watch: {
    editData(data) {
      if (data === null) {
        this.ruleForm = {};
        return;
      }
      this.ruleForm = { ...data };
      this.ruleForm.category = [data.category];
      this.ruleForm.post = [data.post];
    },
  },
  props: ['editData'],
  data() {
    return {
      dialogVisible: false,
      categoryOptions: categoryJSON,
      postOptions: postJSON,
      ruleForm: {
        fio: '',
        category: [],
        post: [],
        outside_num: '',
        inside_num: '',
        ip: '',
      },
      rules: {
        fio: [
          { required: true, message: 'Пожалуйста, введите ФИО', trigger: 'blur' },
        ],
        category: [
          { required: true, message: 'Пожалуйста, введите подразделение', trigger: 'blur' },
        ],
        post: [
          { required: true, message: 'Пожалуйста, введите должность', trigger: 'blur' },
        ],
        outside_num: [
          { required: true, message: 'Пожалуйста, введите городской номер', trigger: 'blur' },
        ],
        inside_num: [
          { required: true, message: 'Пожалуйста, введите внутренний номер', trigger: 'blur' },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.el-form-item{
  &__content{
    .el-select{
      width: 100%;
    }
  }
}
</style>
