<style lang="scss">
.member-detail {
  width: 100%;
  height: 100%;
  padding: 10px;
  .el-tabs {
    width: 100%;
    height: 100%;

    &__content {
      height: calc(100% - 55px);
    }
  }
}
</style>
<template>
  <div class="member-detail">
    <el-tabs
      v-model="activeName"
      type="border-card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="會員資料"
        :name="routeList.member_detail_information"
      ></el-tab-pane>
      <el-tab-pane
        label="存提查詢"
        :name="routeList['member_detail_deposit-and-withdrawal']"
      ></el-tab-pane>
      <el-tab-pane
        label="交易查詢"
        :name="routeList.member_detail_transaction"
      ></el-tab-pane>
      <transition>
        <router-view></router-view>
      </transition>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { routeList } from '@/router'
import { useRoute, useRouter } from 'vue-router'
import { isString } from 'lodash'
export default defineComponent({
  name: 'MemberDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeName = ref(route.name)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleClick = (tab: TabsPaneContext, _event: Event) => {
      if (isString(tab.paneName)) {
        router.push({ name: tab.paneName })
      }
    }
    return { activeName, handleClick, routeList }
  }
})
</script>
