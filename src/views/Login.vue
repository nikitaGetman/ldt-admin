<template>
  <div class="login" v-loading="loading">
    <h3 class="login__title">База животных без владельцев</h3>

    <el-input placeholder="Введите логин" prefix-icon="el-icon-user" v-model="login" />
    <el-input placeholder="Введите пароль" prefix-icon="el-icon-lock" v-model="password" show-password />
    <transition name="el-fade-in">
      <el-alert v-if="error" type="error" @close="error = ''">{{ error }}</el-alert>
    </transition>
    <div class="login__controls">
      <el-button type="success" @click="auth">Войти</el-button>
    </div>
  </div>
</template>

<script>
import { LOGIN, MODULE_NAME as USER_MODULE } from '@/store/modules/user'

export default {
  name: 'Login',
  data() {
    return {
      login: '',
      password: '',
      error: ''
    }
  },
  computed: {
    loading() {
      return this.$store.state[USER_MODULE].loading
    }
  },
  methods: {
    auth() {
      const { login, password } = this

      if (login && password) {
        this.$store
          .dispatch(LOGIN, { login, password })
          .then(() => {
            this.$router.push({ name: 'AnimalsDashboard' })
          })
          .catch(err => {
            this.error = err
          })
      }
    }
  }
}
</script>

<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 360px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  & > * {
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    font-weight: normal;
    margin: 24px 0;
  }

  &__controls {
    width: 100%;
    color: #303133;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
