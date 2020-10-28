<template>
  <el-menu :default-active="menuItems[0].path" class="navbar" router>
    <el-menu-item v-for="(item, index) of menuItems" :key="index" :index="item.path">
      <i :class="item.icon"></i>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'TheNavbar',
  data: () => {
    return {
      menuItems: [
        {
          title: 'Карточки животных',
          path: '/animals-dashboard',
          icon: 'el-icon-s-order'
        },
        {
          title: 'Приюты',
          path: '/shelters',
          icon: 'el-icon-s-home'
        },
        {
          title: 'Акты',
          path: '/acts',
          icon: 'el-icon-document'
        },
        {
          title: 'Отчеты',
          path: '/reports',
          icon: 'el-icon-s-marketing'
        },
        {
          title: 'Заявки новых владельцев',
          path: '/applications',
          icon: 'el-icon-s-custom'
        },
        {
          title: 'Выход',
          path: '/logout',
          icon: 'el-icon-setting'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.navbar {
  height: 100%;
}
</style>
