<template>
  <el-container class="main">
    <el-header class="main__header">
      <span>Животные без владельцев</span>
    </el-header>
    <el-container>
      <el-aside width="240px">
        <the-navbar />
      </el-aside>
      <el-main>
        <transition name="el-fade-in" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'

export default {
  name: 'AppPage',
  components: { TheNavbar }
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
}
</style>
