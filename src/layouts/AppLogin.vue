<template>
  <div class="app-login">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'AppLogin'
}
</script>

<style lang="scss">
.app-login {
  height: 100%;
  overflow-y: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
