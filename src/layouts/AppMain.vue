<template>
  <el-container class="main main__section">
    <el-header class="main__header">
      <div class="main__header-wraper">
        <span>Животные без владельцев</span>
        <span class="main__username">{{ username }}</span>
      </div>
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
import { MODULE_NAME as USERS_MODULE } from '@/store/modules/user'
import { SET_LIST } from '@/store/mutations/types'

export default {
  name: 'AppPage',
  components: { TheNavbar },
  computed: {
    username() {
      return this.$store.state[USERS_MODULE].model.name
    }
  },
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

  &__header-wraper {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__content {
    padding-bottom: 0;
  }

  &__section {
    overflow: hidden;
  }
}
</style>
