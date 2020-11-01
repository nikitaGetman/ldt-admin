<template>
  <div class="dashboard">
    <h3>Картотека животных</h3>

    <div class="dashboard__params">
      <div class="dashboard__main-filters">
        <el-row class="dashboard__filter-row" :gutter="20">
          <el-col :span="6">
            <el-select v-model="shelter" clearable placeholder="Приют" :disabled="isShelterRole">
              <el-option v-for="(item, index) in shelterOptions" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-col>

          <el-col :span="3">
            <el-select v-model="type" clearable placeholder="Вид">
              <el-option v-for="item in animalOptions" :key="item.key" :label="item.value" :value="item.key" />
            </el-select>
          </el-col>

          <el-col :span="3">
            <el-select v-model="sex" clearable placeholder="Пол">
              <el-option v-for="(item, index) in sexOptions" :key="index" :label="item" :value="item" />
            </el-select>
          </el-col>

          <el-col :span="3">
            <el-select v-model="readyToPickUp" clearable placeholder="Социализировано">
              <el-option v-for="item in socialOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>

          <el-col :span="3">
            <el-button plain icon="el-icon-document-add" @click="createNewCardVisible = true">Создать</el-button>
          </el-col>

          <el-col :span="3">
            <el-button plain type="danger" icon="el-icon-delete" @click="reset">Сброс</el-button>
          </el-col>

          <el-col :span="3">
            <el-button plain type="primary" icon="el-icon-search" @click="search">Искать</el-button>
          </el-col>
        </el-row>
      </div>

      <div class="dashboard__additional-filters">
        <el-collapse>
          <el-collapse-item title="Расширенные фильтры" name="1">
            <el-row class="dashboard__filter-row" :gutter="20">
              <el-col :span="6">
                <el-select v-model="organization" clearable placeholder="Эксплатирующая организация">
                  <el-option v-for="(item, index) in organizationsOptions" :key="index" :label="item" :value="item" />
                </el-select>
              </el-col>

              <el-col :span="3">
                <el-select v-model="breed" clearable placeholder="Порода">
                  <el-option
                    v-for="(item, index) in filteredBreeds"
                    :key="index"
                    :label="item.breed"
                    :value="item.id"
                  />
                </el-select>
              </el-col>

              <el-col :span="3">
                <el-select v-model="color" clearable placeholder="Окрас">
                  <el-option v-for="(item, index) in filteredColors" :key="index" :label="item" :value="item" />
                </el-select>
              </el-col>

              <el-col :span="3">
                <el-select v-model="size" clearable placeholder="Размер">
                  <el-option v-for="item in sizeOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-col>

              <el-col :span="5">
                <el-select v-model="exitReason" clearable placeholder="Причина выбытия">
                  <el-option v-for="(item, index) in exitTypes" :key="index" :label="item" :value="item" />
                </el-select>
              </el-col>

              <el-col :span="4">
                <el-select v-model="age" clearable placeholder="Возраст">
                  <el-option v-for="item in ageOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-col>
            </el-row>

            <el-row class="dashboard__filter-row" :gutter="20">
              <el-col :span="4">
                <el-input placeholder="ID карточки" v-model="cardId" clearable />
              </el-col>

              <el-col :span="4">
                <el-input placeholder="ID метка" v-model="idMarker" clearable />
              </el-col>

              <el-col :span="4">
                <el-input placeholder="Кличка" v-model="nickname" clearable />
              </el-col>

              <el-col :span="12">
                <el-date-picker
                  v-model="arrivePeriod"
                  type="daterange"
                  range-separator=""
                  start-placeholder="Период регистрации"
                  end-placeholder="До"
                >
                </el-date-picker>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

    <div class="dashboard__list-wrapper">
      <ul
        class="dashboard__list"
        v-infinite-scroll="fetch"
        infinite-scroll-disabled="infiniteScrollDisabled"
        v-if="animalsList.length > 0"
      >
        <v-animal-item v-for="(item, index) in animalsList" :key="index" :animal="item"></v-animal-item>
      </ul>
      <p class="dashboard__list-info" v-if="loading"><i class="el-icon-loading"></i> Загрузка...</p>
      <p class="dashboard__list-info" v-if="isAllLoaded">Все данные загружены</p>
    </div>

    <!-- dialogs -->
    <v-animal-card-edit :visible.sync="createNewCardVisible" @done="createNewCard" />
  </div>
</template>

<script>
import VAnimalItem from '@/components/VAnimalItem.vue'
import VAnimalCardEdit from '@/components/VAnimalCardEdit.vue'
import { FETCH_ANIMALS, CREATE_ANIMAL, MODULE_NAME as ANIMALS_MODULE } from '@/store/modules/animal'

import { FETCH_BREEDS, FETCH_SHELTERS, MODULE_NAME as DICTS_MODULE } from '@/store/modules/dicts'
import paramsData from '@/helpers/params.json'

export default {
  name: 'Dashboard',
  components: { VAnimalItem, VAnimalCardEdit },
  data() {
    return {
      shelter: null,
      type: null,
      sex: null,
      readyToPickUp: null,
      organization: null,
      breed: null,
      color: null,
      wool: null,
      tail: null,
      ears: null,
      age: null,
      size: null,
      cardId: null,
      nickname: null,
      exitReason: null,
      idMarker: null,
      arrivePeriod: null,

      sort: null,
      order: null,

      importDialogVisible: false,
      createNewCardVisible: false
    }
  },
  computed: {
    module() {
      return this.$store.state[ANIMALS_MODULE]
    },
    loading() {
      return this.module.loading
    },
    animalsList() {
      return this.module.list
    },
    isAllLoaded() {
      return !this.loading && this.module.params.offset === this.module.params.count
    },
    infiniteScrollDisabled() {
      return this.loading || this.isAllLoaded
    },
    isShelterRole() {
      return this.$store.getters.isShelter
    },
    shelterOptions() {
      const shelters = this.$store.state[DICTS_MODULE].model.shelters

      if (this.isShelterRole) {
        return shelters.slice(0, 1)
      }

      return shelters
    },
    params() {
      return this.$store.state[DICTS_MODULE].model
    },
    animalOptions() {
      return this.params.animalTypes
    },
    sexOptions() {
      return this.params.animalSex
    },
    socialOptions() {
      return [
        { value: 'true', label: 'Да' },
        { value: 'false', label: 'Нет' }
      ]
    },
    organizationsOptions() {
      return this.params.operatingOrganizations
    },
    filteredBreeds() {
      return this.params._animalBreeds
    },
    filteredColors() {
      const type = this.type || 'dog'
      return this.params.color ? this.params.color[type] : []
    },
    filteredWools() {
      const type = this.type || 'dog'
      return this.params.woolTypes ? this.params.woolTypes[type] : []
    },
    earsTypes() {
      return this.params.earType
    },
    tailTypes() {
      return this.params.tailType
    },
    ageOptions() {
      return paramsData.ageOptions
    },
    sizeOptions() {
      return paramsData.sizeOptions
    },
    exitTypes() {
      return paramsData.exitTypes
    }
  },
  watch: {
    shelterOptions() {}
  },
  created() {
    this.$store.dispatch(FETCH_SHELTERS).then(() => {
      if (this.isShelterRole) {
        this.shelter = this.shelterOptions[0]
      }
    })
    this.$store.dispatch(FETCH_BREEDS)
    this.fetch()
  },
  methods: {
    reset() {
      this.shelter = null
      this.type = null
      this.sex = null
      this.age = null
      this.readyToPickUp = null
      this.nickname = null
      this.cardId = null
      this.size = null
      this.organization = null
      this.breed = null
      this.color = null
      this.wool = null
      this.tail = null
      this.ears = null
      this.idMarker = null
      this.exitReason = null
      this.arrivePeriod = null
      this.sort = null
      this.order = null
    },
    fetch(options = {}) {
      const {
        shelter,
        type,
        sex,
        age,
        readyToPickUp,
        organization,
        nickname,
        exitReason,
        idMarker,
        breed,
        color,
        wool,
        tail,
        ears,
        cardId,
        size,
        arrivePeriod,
        sort,
        order
      } = this
      this.$store.dispatch(FETCH_ANIMALS, {
        shelter,
        type,
        sex,
        age,
        readyToPickUp,
        organization,
        nickname,
        breed,
        color,
        wool,
        arrivePeriod,
        tail,
        ears,
        exitReason,
        idMarker,
        cardId,
        size,
        sort,
        order,
        ...options
      })
    },
    search() {
      this.fetch({ offset: 0 })
    },
    createNewCard(data) {
      this.$store.dispatch(CREATE_ANIMAL, { data })
      this.createNewCardVisible = false
    }
  }
}
</script>

<style lang="scss">
.dashboard {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__filter-row {
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }

    .el-col > * {
      width: 100%;
    }
  }

  &__additional-filters {
    .el-collapse-item__content {
      padding-bottom: 12px;
    }
    .el-collapse,
    .el-collapse-item__header,
    .el-collapse-item__wrap {
      border: none;
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
