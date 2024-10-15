<style lang="scss">
.customer-list {
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
  <div class="customer-list">
    <div class="customer-list__title">客戶清單</div>
    <div class="customer-list__filter">
      <div class="customer-list__filter__item">
        <el-input v-model="filter.savlue" />
      </div>
      <div class="customer-list__filter__item">
        <el-button @click="handleSearch">搜尋</el-button>
      </div>
    </div>
    <div class="customer-list__content">
      <template v-if="isArray(tableData)">
        <el-table :data="tableData" stripe style="width: 100%; height: 100%">
          <el-table-column prop="name" label="客戶姓名" />
          <el-table-column prop="cellphoneNum" label="手機號碼" />
          <el-table-column prop="telephoneNum" label="電話" />
          <el-table-column prop="addressDetail" label="聯絡地址" />
          <el-table-column prop="note" label="備註" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="handleDetail(scope)"
                >詳細資訊</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="customer-list__pagination">
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
import { IPostCustomerListRequest, ICustomerItem } from '@/types/api/account'
import { getCustomerListApi } from '@/utils/api/account'
import { IPagination } from '@/types/api/global'
import { routeList } from '@/router'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
export default defineComponent({
  name: 'MemberList',
  setup() {
    const store = useStore()
    const router = useRouter()
    const tableData: Ref<ICustomerItem[] | null> = ref(null)
    const filter = reactive<IPostCustomerListRequest>({
      // search: null,
      // dealer_code: null,
      // account_status: true,
      // sorting: null,
      // descending: true,
      stype: null,
      savlue: null,
      page: 1
      // size: 15
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
      const {
        data: { list },
        dataPage: { total }
      } = await getCustomerListApi(filter)
      tableData.value = list
      pagination.total = total
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDetail = ({ row }: { row: any }) => {
      router.push({
        name: routeList.customer_detail,
        params: {
          customer_id: row.id
        }
      })
    }
    const initialization = async () => {
      // if (store.state.userProfile?.account_type === accountType.dealer) {
      // filter.dealer_code = cloneDeep(store.state.userProfile?.user_code)
      // }
      await handleSearch()
    }
    initialization()
    return {
      tableData,
      filter,
      pagination,
      isArray,
      isNumber,
      handleSearch,
      handleCurrentChange,
      handleDetail
    }
  }
})
</script>
