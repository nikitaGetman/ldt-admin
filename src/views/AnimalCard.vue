<template>
  <div class="animal-card">
    This is animal {{ id }}

    <div class="animal-card__history-wrapper">
      <el-row type="flex" justify="space-between">
        <el-col :span="10">
          <h4>История животного</h4>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-icon-upload2" @click="uploadDocumentVisible = true">Добавить документ</el-button>
        </el-col>
      </el-row>
      <el-timeline class="animal-card__history" v-loading="actsLoading">
        <el-timeline-item v-for="(act, index) of acts" :key="index" :timestamp="act.date" placement="top">
          <p>
            <span class="animal-card__history-title">
              {{ act.type }}
            </span>
            <span class="animal-card__history-link">
              <el-link type="primary" :underline="false" @click="downloadFile(act)">Скачать документ</el-link>
            </span>
          </p>
        </el-timeline-item>
      </el-timeline>
    </div>

    <!-- dialogs -->
    <el-dialog
      class="animal-card__upload-dialog"
      title="Добавление документа"
      :visible.sync="uploadDocumentVisible"
      append-to-body
      width="40%"
    >
      <el-form label-width="120px" :model="newDocumentForm">
        <el-form-item label="Тип документа">
          <el-select v-model="newDocumentForm.type" placeholder="Выберите тип">
            <el-option v-for="type in typeOptions" :key="type.value" :label="type.label" :value="type.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Дата">
          <el-date-picker v-model="newDocumentForm.date" type="date" placeholder="Укажите дату"> </el-date-picker>
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
import { SET_MODEL } from '@/store/mutations/types'
import { FETCH_ANIMAL, MODULE_NAME as ANIMAL_MODULE } from '@/store/modules/animal'
import { FETCH_ANIMAL_ACTS, MODULE_NAME as ACTS_MODULE } from '@/store/modules/acts'

export default {
  name: 'AnimalCard',
  props: {
    id: { type: [String, Number], required: true }
  },
  data() {
    return {
      uploadDocumentVisible: false,
      newDocumentForm: {
        type: null,
        date: null,
        file: null
      }
    }
  },
  computed: {
    animal() {
      return this.$store.state[ANIMAL_MODULE].model
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
      return [
        { label: 'Акт отлова', value: '1' },
        { label: 'Акт осмотра', value: '2' },
        { label: 'Акт приема-передачи', value: '3' }
      ]
    }
  },
  created() {
    const model = this.$store.state[ANIMAL_MODULE].list.find(item => item.id === this.id)
    if (model) {
      this.$store.commit(SET_MODEL, { name: ANIMAL_MODULE, model })
    } else {
      this.$store.dispatch(FETCH_ANIMAL, this.id)
    }
    this.$store.commit(SET_MODEL, { name: ACTS_MODULE, model: {} })
    this.$store.dispatch(FETCH_ANIMAL_ACTS, this.id)
  },
  methods: {
    downloadFile(act) {
      console.log('downloading', act)
    },
    addDocument() {}
  }
}
</script>

<style lang="scss">
.animal-card {
}
</style>
