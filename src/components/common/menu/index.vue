<style lang="scss">
.the-menu {
  .el-menu-item {
    font-weight: 700;
  }
}
</style>
<template>
  <el-menu
    :default-active="routeList.customer"
    @select="handleSelect"
    class="the-menu"
  >
    <!-- <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu> -->
    <el-menu-item :index="routeList.customer">
      <el-icon><icon-menu /></el-icon>
      <template #title>會員管理</template>
    </el-menu-item>
    <!-- <el-sub-menu :index="routeList.pigeon">
      <template #title><span>賽事相關設定</span></template>
      
    </el-sub-menu> -->
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Document, Menu as IconMenu, Setting } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { routeList } from '@/router'
export default defineComponent({
  components: { IconMenu },
  name: 'CommonMenu',
  setup() {
    const router = useRouter()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSelect = (key: string, keyPath: string[]) => {
      router.push({ name: key })
    }
    return { handleSelect, routeList }
  }
})
</script>
