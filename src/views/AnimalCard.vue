<template>
  <div class="animal-card">
    <el-page-header @back="goBack" content="Карточка животного" title="Назад" />

    <div class="animal-card__body">
      <el-row type="flex" justify="end">
        <el-col :span="4">
          <el-button icon="el-icon-edit-outline" @click="editAnimalVisible = true">Редактировать</el-button>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-icon-download" @click="exportDoc">Выгрузить в .docx</el-button>
        </el-col>
      </el-row>
      <div v-loading="localLoading">
        <el-image class="image animal-card__image" :src="src">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <div class="animal-card__field" v-for="(item, index) in animalFields" :key="index">
          <div class="animal-card__key">{{ item.key }}:</div>
          <div class="animal-card__value">{{ item.value }}</div>
        </div>
      </div>
    </div>

    <div class="animal-card__history-wrapper">
      <el-row type="flex" justify="space-between">
        <el-col :span="10">
          <h4>История животного</h4>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-icon-plus" @click="uploadDocumentVisible = true">Добавить событие</el-button>
        </el-col>
      </el-row>
      <el-timeline class="animal-card__history" v-loading="actsLoading">
        <el-timeline-item v-for="(act, index) of acts" :key="index" :timestamp="act.date" placement="top">
          <p>
            <span class="animal-card__history-title"> {{ act.title }} {{ act.body ? ` - ${act.body}` : '' }} </span>
            <span class="animal-card__history-link" v-if="act.link">
              <el-link type="primary" :underline="false" @click="downloadFile(act)">Скачать документ</el-link>
            </span>
          </p>
        </el-timeline-item>
      </el-timeline>
    </div>

    <!-- dialogs -->
    <v-animal-card-edit :visible.sync="editAnimalVisible" :initial-values="animal" @done="updateAnimal" is-edit />

    <el-dialog
      class="animal-card__upload-dialog"
      title="Добавление документа"
      :visible.sync="uploadDocumentVisible"
      append-to-body
      width="40%"
    >
      <el-form label-width="120px" :model="newDocumentForm">
        <el-form-item label="Тип документа">
          <el-autocomplete
            v-model="newDocumentForm.type"
            :fetch-suggestions="autocompleteTypes"
            placeholder="Введите мероприятие"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="Дата">
          <el-date-picker
            v-model="newDocumentForm.date"
            type="date"
            placeholder="Укажите дату"
            :picker-options="datePickerOptions"
          />
        </el-form-item>
        <el-form-item label="Комментарий">
          <el-input v-model="newDocumentForm.body" placeholder="Дополнительная информация" />
        </el-form-item>
        <el-form-item label="Файл">
          <el-upload
            ref="uploadForm"
            action="https://jsonplaceholder.typicode.com/posts/"
            :auto-upload="false"
            :limit="1"
          >
            <el-button slot="trigger" type="primary">Выбрать файл</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="uploadDocumentVisible = false">Отмена</el-button>
        <el-button type="primary" @click="addDocument">Прикрепить</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VAnimalCardEdit from '@/components/VAnimalCardEdit.vue'
import { SET_MODEL } from '@/store/mutations/types'
import { FETCH_ANIMAL, EXPORT_ANIMAL_CARD, MODULE_NAME as ANIMAL_MODULE, ADD_ANIMAL_DOC } from '@/store/modules/animal'
import { FETCH_ANIMAL_ACTS, MODULE_NAME as ACTS_MODULE } from '@/store/modules/acts'
import params from '@/helpers/params.json'

export default {
  name: 'AnimalCard',
  components: { VAnimalCardEdit },
  props: {
    id: { type: [String, Number], required: true }
  },
  data() {
    return {
      editAnimalVisible: false,
      uploadDocumentVisible: false,
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      newDocumentForm: {
        type: null,
        date: null,
        file: null,
        body: null
      },
      localAnimal: null,
      localLoading: false,
      src: '/photos/1.jpg'
    }
  },
  computed: {
    animal() {
      return { ...this.$store.state[ANIMAL_MODULE].model, ...this.localAnimal }
    },

    loading() {
      return this.$store.state[ANIMAL_MODULE].loading
    },
    acts() {
      return this.$store.state[ACTS_MODULE].model.acts
    },
    actsLoading() {
      return this.$store.state[ACTS_MODULE].loading
    },
    typeOptions() {
      return params.documentTypes
    },
    animalFields() {
      const keysMap = {
        animal_type: 'Тип',
        shelter: 'Приют',
        arrivalDate: 'Дата поступления',
        male: 'Пол',
        animal_breed: 'Порода',
        color: 'Окрас',
        fur: 'Шерсть',
        tail: 'Хвост',
        ears: 'Уши',
        idcard: 'ID карточки',
        size: 'Размер',
        age: 'Возраст',
        special_signs: 'Специальные отметки',
        nickname: 'Кличка',
        weight: 'Вес',
        ready: 'Готовность к социализации',
        idmark: 'Идентификационная метка',
        character: 'Характер',
        veterinarian: 'ФИО Ветеринара',
        cell: 'Клетка',
        sterilized: 'Стерелизовано'
      }

      const animalFields = []

      Object.entries(this.animal).forEach(([key, value]) => {
        const k = keysMap[key]
        if (k) {
          let lValue = value
          if (key === 'ready') {
            lValue = value ? 'Да' : 'Нет'
          }
          if (key === 'male') {
            lValue = value ? 'Мальчик' : 'Девочка'
          }
          if (key === 'animal_type') {
            lValue = value === 1 ? 'Кошка' : 'Собака'
          }
          animalFields.push({ key: k, value: lValue })
        }
      })

      return animalFields
    }
  },
  created() {
    // const model = this.$store.state[ANIMAL_MODULE].list.find(item => item.id === this.id)
    // if (model) {
    //   this.$store.commit(SET_MODEL, { name: ANIMAL_MODULE, model })
    // } else {
    this.$store.dispatch(FETCH_ANIMAL, this.id)
    // }
    this.$store.commit(SET_MODEL, { name: ACTS_MODULE, model: {} })
    this.$store.dispatch(FETCH_ANIMAL_ACTS, this.id)
  },
  methods: {
    downloadFile(act) {
      console.log('downloading', act)
    },
    addDocument() {
      this.uploadDocumentVisible = false
      const { type, date, body } = this.newDocumentForm

      this.$store.dispatch(ADD_ANIMAL_DOC, { animalId: this.id, title: type, date, doc: 'file.txt', body }).then(() => {
        this.$store.dispatch(FETCH_ANIMAL_ACTS, this.id)
      })
    },
    goBack() {
      this.$router.push({ name: 'AnimalsDashboard' })
    },
    exportDoc() {
      this.$store.dispatch(EXPORT_ANIMAL_CARD, this.id)
    },
    updateAnimal(data) {
      this.localLoading = true
      this.editAnimalVisible = false
      setTimeout(() => {
        this.localAnimal = { ...data }
        this.$notify({
          title: 'Карточка обновлена',
          message: 'Данные карточки успешно изменены',
          type: 'success'
        })
        this.localLoading = false
      }, 1000)
    },
    createFilter(queryString) {
      return str => {
        return str.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    autocompleteTypes(queryString, cb) {
      const { eventTypes } = params
      const results = queryString ? eventTypes.filter(this.createFilter(queryString)) : eventTypes
      cb(results)
    }
  }
}
</script>

<style lang="scss">
.animal-card {
  &__field {
    margin: 0 0 8px 8px;
    display: flex;
  }

  &__key {
    min-width: 230px;
  }
}

.animal-card {
  margin-bottom: 24px;
}

.description {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 7px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;

  &:hover {
    color: #409eff !important;
    text-decoration: underline;
  }
  &:focus {
    color: #409eff !important;
  }
}

.image {
  margin-right: 20px;
  margin-bottom: 320px;
  max-width: 180px;
  max-height: 180px;
  line-height: 180px;
  text-align: center;
  font-size: 32px;
  color: #bbb;

  float: left;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>
