<template>
  <el-dialog class="animal-card-edit" :title="title" :visible.sync="localVisible" append-to-body width="50%">
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="Категория">
        <el-select v-model="form.type" placeholder="Выберите категорию">
          <el-option
            v-for="item in params.animalCategories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Приют">
        <el-select v-model="form.shelter" placeholder="Выберите приют">
          <el-option v-for="item in shelterOptions" :key="item.id" :label="item.name" :value="item.id" />
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
          <el-option v-for="item in params.sexOptions" :key="item.value" :label="item.label" :value="item.value">
            {{ item.label }} <i :class="item.icon"></i>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Порода">
        <el-input v-model="form.breed" placeholder="Укажите породу" />
      </el-form-item>

      <el-form-item label="Окрас">
        <el-input v-model="form.color" placeholder="Укажите окрас" />
      </el-form-item>

      <el-form-item label="Размер">
        <el-select v-model="form.size" placeholder="Укажите размер">
          <el-option v-for="item in params.sizeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="Возраст (примерный)">
        <el-input v-model="form.age" placeholder="Укажите возраст" type="number" min="0" />
      </el-form-item>

      <el-form-item label="Особые приметы">
        <el-input v-model="form.specialSigns" placeholder="Опишите особые приметы" :rows="2" type="textarea" />
      </el-form-item>

      <el-form-item label="Кличка">
        <el-input v-model="form.nickname" placeholder="Укажите кличку" />
      </el-form-item>

      <el-form-item label="Вес">
        <el-input v-model="form.weight" placeholder="Укажите вес" type="number" min="0" />
      </el-form-item>

      <el-form-item label="Готово к социализации">
        <el-switch v-model="form.readyToPickUp"></el-switch>
      </el-form-item>

      <el-form-item label="Идентификационная метка">
        <el-input v-model="form.idMarker" placeholder="Укажите при наличии" :rows="2" type="textarea" />
      </el-form-item>

      <el-form-item label="ГСИЦ">
        <el-input v-model="form.registrationNumber" placeholder="Укажите при наличии" />
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
/*

Категория животного: (собака / кошка )
Приют
Дата поступления в приют
Пол: (кабель / сука / кот / кошка)
Порода 
Окрас
Размер
Возраст (примерный)
Особые приметы
Кличка
Вес
Готово к социализации
Идентификационная метка (способ и место нанесения)
Государственный регистрационный номер ГСИЦ
Фотосы


Дата стерилизации
ФИО врача произведшего стерилизацию
Шерсть
Уши
Хвост

*/
import { MODULE_NAME as SHELTERS_MODULE } from '@/store/modules/shelters'
import params from '@/helpers/params.json'

export default {
  name: 'VAnimalCardEdit',
  props: {
    visible: { type: Boolean, required: true },
    title: { type: String, default: 'Создание карточки животного' },
    initialValues: { type: Object, default: () => ({ nickname: 'Псиныч' }) }
  },
  data() {
    return {
      params,
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
        breed: '',
        color: '',
        size: null,
        age: null,
        specialSigns: '',
        nickname: '',
        weight: null,
        readyToPickUp: false,
        idMarker: null,
        registrationNumber: null
      }
    }
  },
  computed: {
    shelterOptions() {
      return this.$store.state[SHELTERS_MODULE].list
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
