<template>
  <el-collapse class="request-item">
    <el-collapse-item>
      <template slot="title">Request Card {{ request.value }}</template>
      <div>
        Consistent with real life: in line with the process and logic of real life, and comply with languages and habits
        that the users are used to;
      </div>
      <div>
        Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position
        of elements, etc.
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name: 'VRequestItem',
  props: {
    request: { type: Object, required: true }
  },
  methods: {}
}
</script>

<style lang="scss">
.request-item {
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
