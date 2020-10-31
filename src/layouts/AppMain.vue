<template>
  <el-container class="main main__section">
    <el-header class="main__header">
      <span>Животные без владельцев</span>
    </el-header>
    <el-container class="main__section">
      <el-aside width="240px">
        <the-navbar />
      </el-aside>
      <el-main class="main__content">
        <transition name="el-fade-in" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import { FETCH_DICTS, MODULE_NAME as DICTS_MODULE } from '@/store/modules/dicts'
import { MODULE_NAME as SHELTERS_MODULE } from '@/store/modules/shelters'
import { SET_LIST } from '@/store/mutations/types'

export default {
  name: 'AppPage',
  components: { TheNavbar },
  created() {
    this.$store.dispatch(FETCH_DICTS).then(() => {
      const shelters = this.$store.state[DICTS_MODULE].model.shelters
      this.$store.commit(SET_LIST, { name: SHELTERS_MODULE, list: shelters })
    })
  }
}
</script>

<style lang="scss">
.main {
  height: 100%;

  &__header {
    display: flex;
    align-items: center;
    background-color: #54a8ff;
    color: #ffffff;
  }

  &__content {
    padding-bottom: 0;
  }

  &__section {
    overflow: hidden;
  }
}
</style>
