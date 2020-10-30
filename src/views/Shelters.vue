<template>
  <div class="shelters">
    <h3>Список приютов</h3>

    <div class="shelters__table-wrapper">
      <el-table :data="shelters" style="width: 100%" border v-loading="loading" stripe>
        <el-table-column prop="name" label="Название"> </el-table-column>
        <el-table-column prop="adm_area" label="Округ" width="180"> </el-table-column>
        <el-table-column prop="district" label="Район" width="150"> </el-table-column>
        <el-table-column prop="chief_name" label="Ответсвенный" width="240"> </el-table-column>
        <el-table-column prop="phone" label="Телефон" width="130"> </el-table-column>
        <el-table-column prop="address" label="Адрес" width="240"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { FETCH_SHELTERS, MODULE_NAME as SHELTERS_MODULE } from '@/store/modules/shelters'

export default {
  name: 'Shelters',
  computed: {
    shelters() {
      return this.$store.state[SHELTERS_MODULE].list
    },
    loading() {
      return this.$store.state[SHELTERS_MODULE].loading
    }
  },
  created() {
    this.$store.dispatch(FETCH_SHELTERS)
  }
}
</script>

<style lang="scss">
.shelters {
  &__table-wrapper {
    padding: 16px;
    margin-bottom: 24px;
  }
}
</style>
