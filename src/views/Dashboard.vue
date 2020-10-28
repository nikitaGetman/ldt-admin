<template>
  <div class="dashboard">
    <h3>Картотека животных</h3>

    <div class="dashboard__filters">
      <el-row class="dashboard__filter-row" :gutter="20">
        <el-col :span="8">
          <el-select v-model="shelter" clearable placeholder="Приют">
            <el-option v-for="item in shelterOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-select v-model="type" clearable placeholder="Тип животного">
            <el-option v-for="item in animalOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="sex" clearable placeholder="Пол животного">
            <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-select v-model="age" clearable placeholder="Возраст животного">
            <el-option v-for="item in ageOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-select v-model="size" clearable placeholder="Размер">
            <el-option v-for="item in sizeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
      </el-row>

      <el-row class="dashboard__filter-row" :gutter="20">
        <el-col :span="6">
          <el-input placeholder="Персональный ID" v-model="id" clearable />
        </el-col>

        <el-col :span="6">
          <el-input placeholder="Кличка" v-model="nickname" clearable />
        </el-col>

        <el-col :span="4">
          <el-select v-model="readyToPickUp" clearable placeholder="Готово к социализации">
            <el-option v-for="item in socialOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-button plain icon="el-icon-delete" @click="reset">Очистить</el-button>
        </el-col>

        <el-col :span="4">
          <el-button plain type="primary" icon="el-icon-search" @click="search">Искать</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { FETCH_ANIMALS } from '@/store/modules/animal'

export default {
  name: 'Dashboard',
  data() {
    return {
      shelter: null,
      type: null,
      sex: null,
      age: null,
      readyToPickUp: null,
      nickname: null,
      id: null,
      size: null
    }
  },
  computed: {
    shelterOptions() {
      return [
        { value: 1, label: 'Приют 1' },
        { value: 2, label: 'Приют 2' },
        { value: 3, label: 'Приют 3' }
      ]
    },
    animalOptions() {
      return [
        { value: 1, label: 'Собака' },
        { value: 2, label: 'Кошка' }
      ]
    },
    sexOptions() {
      return [
        { value: 'male', label: 'Мальчик' },
        { value: 'female', label: 'Девочка' }
      ]
    },
    ageOptions() {
      return [
        { value: 1, label: 'Молодые ( < 2 лет )' },
        { value: 2, label: 'Средние ( 2-7 лет )' },
        { value: 3, label: 'Пожелые ( > 7 лет )' }
      ]
    },
    socialOptions() {
      return [
        { value: 'yes', label: 'Да' },
        { value: 'no', label: 'Нет' }
      ]
    },
    sizeOptions() {
      return [
        { value: 'small', label: 'Маленькое' },
        { value: 'medium', label: 'Среднее' },
        { value: 'large', label: 'Большое' }
      ]
    }
  },
  methods: {
    reset() {
      this.shelter = null
      this.type = null
      this.sex = null
      this.age = null
      this.readyToPickUp = null
      this.nickname = null
      this.id = null
      this.size = null
    },
    fetch(options = {}) {
      const { shelter, type, sex, age, readyToPickUp, nickname, id, size } = this
      this.$store.dispatch(FETCH_ANIMALS, { shelter, type, sex, age, readyToPickUp, nickname, id, size, ...options })
    },
    search() {
      this.fetch({ offset: 0 })
    }
  }
}
</script>

<style lang="scss">
.dashboard {
  &__filter-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }

    .el-col > * {
      width: 100%;
    }
  }
}
</style>
