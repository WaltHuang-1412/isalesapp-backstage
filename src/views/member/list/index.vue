<style lang="scss">
.member-list {
  width: 100%;
  height: 100%;
  padding: 20px;
  &__title {
    width: 100%;
    height: 40px;
    font-size: 30px;
    line-height: 40px;
  }
  &__filter {
    width: 100%;
    height: 40px;

    &__item {
      display: inline-block;
      width: 200px;
      margin-right: 10px;
    }
  }
  &__content {
    width: 100%;
    height: calc(100% - 120px);
  }
  &__pagination {
    width: 100%;
    height: 40px;
  }
}
</style>
<template>
  <div class="member-list">
    <div class="member-list__title">會員清單</div>
    <div class="member-list__filter">
      <div class="member-list__filter__item">
        <el-input v-model="filter.search" />
      </div>
      <div class="member-list__filter__item">
        <el-button @click="handleSearch">搜尋</el-button>
      </div>
    </div>
    <div class="member-list__content">
      <template v-if="isArray(tableData)">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%; height: 100%;"
          @row-click="handleRowClick"
        >
          <el-table-column prop="account" label="帳號" />
          <el-table-column prop="name" label="名字" />
          <el-table-column prop="dealer_code" label="經銷商" />
        </el-table>
      </template>
    </div>
    <div class="member-list__pagination">
      <template v-if="isNumber(pagination.total)">
        <el-pagination
          background
          layout="prev, pager, next"
          v-model:current-page="filter.page"
          :page-size="filter.size"
          :total="pagination.total"
          @current-change="handleCurrentChange"
        />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { cloneDeep, isArray, isNumber } from 'lodash'
import { defineComponent, reactive, ref, Ref } from 'vue'
import {
  IGetMembersRequest,
  IGetMembersResponse,
  IMember
} from '@/types/api/member'
import { getMembersApi } from '@/utils/api/member'
import { IPagination } from '@/types/api/global'
import { routeList } from '@/router'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { accountType } from '@/models/enum'
export default defineComponent({
  name: 'MemberList',
  setup() {
    const store = useStore()
    const router = useRouter()
    const tableData: Ref<IMember[] | null> = ref(null)
    const filter = reactive<IGetMembersRequest>({
      search: null,
      dealer_code: null,
      account_status: true,
      sorting: null,
      descending: true,
      page: 1,
      size: 15
    })
    const pagination = reactive<IPagination>({
      total: null
    })
    const handleSearch = async () => {
      filter.page = 1
      await getTableData()
    }
    const handleCurrentChange = async () => {
      await getTableData()
    }
    const getTableData = async () => {
      const { items, total }: IGetMembersResponse = await getMembersApi(filter)
      tableData.value = items
      pagination.total = total
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRowClick = (row: any) => {
      router.push({
        name: routeList.member_detail,
        params: {
          member_id: row.member_id
        }
      })
    }
    const initialization = async () => {
      if (store.state.userProfile?.account_type === accountType.dealer) {
        filter.dealer_code = cloneDeep(store.state.userProfile?.user_code)
      }
      await handleSearch()
    }
    initialization()
    return {
      tableData,
      filter,
      pagination,
      isArray,
      isNumber,
      handleRowClick,
      handleSearch,
      handleCurrentChange
    }
  }
})
</script>
