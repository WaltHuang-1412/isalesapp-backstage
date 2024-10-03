<style lang="scss">
.header {
  padding: 10px 20px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
<template>
  <div class="header">
    <div class="header__name">
      {{ profile?.user_name }}
    </div>
    <el-button @click="handleLogOut">登出</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { routeList } from '@/router'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'CommonHeader',
  setup() {
    const store = useStore()
    const router = useRouter()
    const profile = computed(() => store.state.userProfile)
    const handleLogOut = () => {
      localStorage.removeItem('token')
      // localStorage.removeItem('refresh')
      router.push({ name: routeList['log-in'] })
    }
    return { profile, handleLogOut }
  }
})
</script>
