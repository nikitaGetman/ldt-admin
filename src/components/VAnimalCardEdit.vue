<template>
  <el-dialog class="animal-card-edit" :title="title" :visible.sync="localVisible" append-to-body width="50%">
    <el-form ref="form" :model="form" label-width="200px" size="mini">
      <el-form-item label="Вид животного">
        <el-select v-model="form.type" placeholder="Выберите вид">
          <el-option v-for="item in params.animalTypes" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>

      <el-form-item label="Приют">
        <el-select v-model="form.shelter" placeholder="Выберите приют">
          <el-option
            v-for="(item, index) in shelterOptions"
            :key="index"
            :label="item.shortName"
            :value="item.shortName"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Дата поступления в приют">
        <el-date-picker
          v-model="form.arrivalDate"
          type="date"
          placeholder="Укажите дату"
          :picker-options="datePickerOptions"
        />
      </el-form-item>

      <el-form-item label="Пол">
        <el-select v-model="form.sex" placeholder="Укажите пол">
          <el-option v-for="(item, index) in params.animalSex" :key="index" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="Порода">
        <el-select v-model="form.breed" placeholder="Укажите породу">
          <el-option v-for="(item, index) in filteredBreeds" :key="index" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="Окрас">
        <el-select v-model="form.color" placeholder="Укажите окрас">
          <el-option v-for="(item, index) in filteredColors" :key="index" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="Тип шерсти">
        <el-select v-model="form.wool" placeholder="Укажите тип шерсти">
          <el-option v-for="(item, index) in filteredWools" :key="index" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="Тип ушей">
        <el-select v-model="form.ears" placeholder="Укажите тип ушей">
          <el-option v-for="(item, index) in params.earsTypes" :key="index" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="Тип хвоста">
        <el-select v-model="form.tail" placeholder="Укажите тип хвоста">
          <el-option v-for="(item, index) in params.tailTypes" :key="index" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="Возраст (примерный)">
        <el-input v-model="form.age" placeholder="Укажите возраст" type="number" min="0" />
      </el-form-item>

      <el-form-item label="Особые приметы">
        <el-input v-model="form.specialSigns" placeholder="Опишите особые приметы" :rows="2" type="textarea" />
      </el-form-item>

      <el-form-item label="Характер">
        <el-input v-model="form.character" placeholder="Укажите характер" />
      </el-form-item>

      <el-form-item label="Кличка">
        <el-input v-model="form.nickname" placeholder="Укажите кличку" />
      </el-form-item>

      <el-form-item label="Вес">
        <el-input v-model="form.weight" placeholder="Укажите вес" type="number" min="0" />
      </el-form-item>

      <el-form-item label="Стерилизовано">
        <el-switch v-model="form.sterilized"></el-switch>
      </el-form-item>

      <el-form-item label="ФИО Ветеринара">
        <el-input v-model="form.veterinarian" placeholder="Укажите ФИО ветеринара" />
      </el-form-item>

      <el-form-item label="Клетка">
        <el-input v-model="form.cell" placeholder="Укажите клетку" type="number" min="0" />
      </el-form-item>

      <el-form-item label="Идентификационная метка">
        <el-input v-model="form.idMarker" placeholder="Укажите при наличии" />
      </el-form-item>

      <el-form-item label="Готово к социализации">
        <el-switch v-model="form.readyToPickUp"></el-switch>
      </el-form-item>

      <el-form-item label="Фотографии">
        <el-upload
          ref="photosUpload"
          class="animal-card-edit__photo-upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :auto-upload="false"
          accept="image/*"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="localVisible = false">Отмена</el-button>
      <el-button type="primary" @click="create">Добавить</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { MODULE_NAME as SHELTERS_MODULE } from '@/store/modules/shelters'
import { MODULE_NAME as DICTS_MODULE } from '@/store/modules/dicts'

export default {
  name: 'VAnimalCardEdit',
  props: {
    visible: { type: Boolean, required: true },
    title: { type: String, default: 'Создание карточки животного' },
    initialValues: { type: Object, default: () => ({ nickname: 'Псиныч' }) }
  },
  data() {
    return {
      localVisible: false,
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      form: {
        type: null,
        shelter: null,
        arrivalDate: null,
        sex: null,
        breed: null,
        color: null,
        wool: null,
        tail: null,
        ears: null,
        cardId: null,
        size: null,
        age: null,
        specialSigns: '',
        nickname: '',
        weight: null,
        readyToPickUp: false,
        idMarker: null,
        character: null,
        veterinarian: null,
        cell: null,
        sterilized: false
      }
    }
  },
  computed: {
    shelterOptions() {
      return this.$store.state[SHELTERS_MODULE].list
    },
    params() {
      return this.$store.state[DICTS_MODULE].model
    },
    filteredBreeds() {
      const type = this.form.type || 'dog'
      return this.params.breed ? this.params.breed[type] : []
    },
    filteredColors() {
      const type = this.form.type || 'dog'
      return this.params.color ? this.params.color[type] : []
    },
    filteredWools() {
      const type = this.form.type || 'dog'
      return this.params.woolTypes ? this.params.woolTypes[type] : []
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.localVisible = val
        this.form = { ...this.form, ...this.initialValues }
      },
      immediate: true
    },
    localVisible: {
      handler(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    create() {
      this.$emit('done', { ...this.form, photos: this.$refs.photosUpload.uploadFiles })
    }
  }
}
</script>

<style lang="scss">
.animal-card-edit {
  &__photo-upload {
    .el-upload,
    .el-upload-list__item {
      width: 120px;
      height: 120px;
      line-height: 120px;
    }
  }
}
</style>
