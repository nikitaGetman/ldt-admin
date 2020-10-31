<template>
  <div class="requests">
    <h3>Заявки новых владельцев</h3>

    <div class="requests__params">
      <el-row class="requests__filter-row" :gutter="20">
        <el-col :span="8">
          <el-select v-model="shelter" clearable placeholder="Приют">
            <el-option v-for="item in shelterOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-select v-model="status" clearable placeholder="Статус">
            <el-option
              v-for="item in params.requestStatuses"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>

        <el-col :span="3">
          <el-button plain type="primary" icon="el-icon-search" @click="search">Искать</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="requests__list-wrapper">
      <ul
        class="requests__list"
        v-infinite-scroll="fetch"
        infinite-scroll-disabled="infiniteScrollDisabled"
        v-if="requestsList.length > 0"
      >
        <v-request-item v-for="(item, index) in requestsList" :key="index" :request="item"></v-request-item>
      </ul>
      <p class="requests__list-info" v-if="loading"><i class="el-icon-loading"></i> Загрузка...</p>
      <p class="requests__list-info" v-if="isAllLoaded">Все данные загружены</p>
    </div>
  </div>
</template>

<script>
import VRequestItem from '@/components/VRequestItem.vue'
import { MODULE_NAME as SHELTERS_MODULE } from '@/store/modules/shelters'
import { FETCH_REQUESTS, MODULE_NAME as REQUESTS_MODULE } from '@/store/modules/requests'
import params from '@/helpers/params.json'

export default {
  name: 'Requests',
  components: { VRequestItem },
  data() {
    return {
      params,
      shelter: null,
      status: null
    }
  },
  computed: {
    shelterOptions() {
      return this.$store.state[SHELTERS_MODULE].list
    },
    module() {
      return this.$store.state[REQUESTS_MODULE]
    },
    requestsList() {
      return this.module.list
    },
    loading() {
      return this.module.loading
    },
    isAllLoaded() {
      return !this.loading && this.module.params.offset === this.module.params.count
    },
    infiniteScrollDisabled() {
      return this.loading || this.isAllLoaded
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch(options = {}) {
      const { shelter, status } = this
      this.$store.dispatch(FETCH_REQUESTS, {
        shelter,
        status,
        ...options
      })
    },
    search() {
      this.fetch({ offset: 0 })
    }
  }
}
</script>

<style lang="scss">
.requests {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__filter-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }

    .el-col > * {
      width: 100%;
    }
  }

  &__list-wrapper {
    overflow: auto;
    margin-top: 16px;
    padding-bottom: 32px;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__list-info {
    margin: 32px 0 0;
    text-align: center;
  }
}
</style>
