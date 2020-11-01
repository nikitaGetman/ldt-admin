<template>
  <el-collapse class="request-item">
    <el-collapse-item v-loading="loading">
      <template slot="title">
        <span :class="`request-item__status request-item__status--${status}`">{{ requestStatus }} </span>

        <span class="request-item__title"> Запрос № {{ request.id }} </span>

        <span class="request-item__key">Интересующее животное:</span>
        <span class="request">{{ animalData }}</span>
      </template>

      <el-row>
        <el-col :span="3">
          <span class="request-item__key">Имя:</span>
          <span class="request-item__value">{{ request.name }}</span>
        </el-col>

        <el-col :span="4">
          <span class="request-item__key">Телефон:</span>
          <span class="request-item__value">{{ request.phone }}</span>
        </el-col>
      </el-row>

      <el-row type="flex" justify="end">
        <el-col :span="3">
          <el-button type="danger" plain @click="dodecline">Отклонить</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" plain @click="doaccept">Одобрить</el-button>
        </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name: 'VRequestItem',
  props: {
    request: { type: Object, required: true }
  },
  data() {
    return {
      loading: false,
      status: 'new'
    }
  },
  computed: {
    requestStatus() {
      const statusMap = {
        new: 'Новая',
        declined: 'Отклонена',
        accepted: 'Принята'
      }
      return statusMap[this.request.status]
    },
    animalData() {
      return `Собака, ${this.request.animal.idcard}`
    }
  },
  methods: {
    dodecline() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$notify({
          title: 'Заявка отклонена',
          type: 'warning'
        })
      }, 1000)
    },

    doaccept() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$notify({
          title: 'Заявка отклонена',
          type: 'success'
        })
      }, 1000)
    }
  }
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

  &__status {
    display: inline-block;
    margin-right: 8px;

    &--new {
      color: #eade46;
    }
    &--declined {
      color: red;
    }
    &--accepted {
      color: green;
    }
  }

  .el-collapse-item__header,
  .el-collapse-item__wrap {
    border: none;
  }

  &__title {
    display: inline-block;
    margin-right: 18px;
  }

  &__key {
    display: inline-block;
    margin-right: 8px;
  }
}
</style>
