<template>
  <div class="dicts">
    <h3>Список приютов</h3>

    <div class="dicts__table-wrapper">
      <!-- <el-table :data="dicts" style="width: 100%" border v-loading="loading" stripe>
        <el-table-column prop="name" label="Название"> </el-table-column>
        <el-table-column prop="adm_area" label="Округ" width="180"> </el-table-column>
        <el-table-column prop="district" label="Район" width="150"> </el-table-column>
        <el-table-column prop="chief_name" label="Ответсвенный" width="240"> </el-table-column>
        <el-table-column prop="phone" label="Телефон" width="130"> </el-table-column>
        <el-table-column prop="address" label="Адрес" width="240"> </el-table-column>
      </el-table> -->
    </div>
  </div>
</template>

<script>
import { FETCH_SHELTERS, MODULE_NAME as SHELTERS_MODULE } from '@/store/modules/dicts'

export default {
  name: 'Dicts',
  computed: {
    dicts() {
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
.dicts {
  &__table-wrapper {
    padding: 16px;
    margin-bottom: 24px;
  }
}
</style>
