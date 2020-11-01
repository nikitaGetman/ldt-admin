<template>
  <el-collapse class="animal-item">
    <el-collapse-item>
      <template slot="title">Карточка животного № {{ animal.idcard }}, {{ animal.nickname }}</template>

      <el-link type="primary" :underline="false" @click="toAnimalCard">К карточке животного</el-link>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name: 'VAnimalItem',
  props: {
    animal: { type: Object, required: true }
  },
  methods: {
    toAnimalCard() {
      this.$router.push({ name: 'AnimalCard', params: { id: this.animal.id } })
    }
  }
}
</script>

<style lang="scss">
.animal-item {
  margin: 12px 8px;
  padding: 8px 16px;
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
  }

  .el-collapse-item__header,
  .el-collapse-item__wrap {
    border: none;
  }
}
</style>
