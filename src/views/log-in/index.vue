<style lang="scss">
.log-in-wrapper {
  width: 100%;
  height: 100%;
}
.log-in-container {
  width: 100%;
  max-width: 600px;
  height: 100%;
  margin: 0 auto;
}
.log-in {
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }
  &__form {
    display: inline-block;
    width: 100%;
    vertical-align: middle;
    border: 1px solid black;
    padding: 20px;
  }
  &__logo {
    text-align: center;
  }
}
</style>
<template>
  <div class="log-in-wrapper">
    <div class="log-in-container">
      <div class="log-in">
        <el-form
          class="log-in__form"
          label-width="100px"
          :model="form"
          label-position="top"
          size="large"
        >
          <div class="log-in__logo">
            <img src="https://via.placeholder.com/100x100" alt="" />
          </div>

          <el-form-item label="帳踸">
            <el-input v-model="form.account" />
          </el-form-item>
          <el-form-item label="密碼">
            <el-input v-model="form.password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin">登入</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onBeforeMount } from 'vue'
import { postAuthLoginApi } from '@/utils/api/auth'
import { IPostAuthLoginRequest } from '@/types/api/auth'
import { routeList } from '@/router'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
export default defineComponent({
  name: 'LogIn',
  setup() {
    const store = useStore()
    const router = useRouter()
    const form = reactive<IPostAuthLoginRequest>({
      account: 'admin',
      password: 'admin',
      google_captcha_token: 'ok'
    })
    const handleLogin = async () => {
      try {
        const { access, refresh } = await postAuthLoginApi(form)
        localStorage.setItem('access', access)
        localStorage.setItem('refresh', refresh)
        router.push({ name: routeList.home })
      } catch (error) {
        console.log('error :>> ', error)
      }
    }
    onBeforeMount(() => {
      store.commit('SetUserProfile', null)
    })
    return { form, handleLogin }
  }
})
</script>
