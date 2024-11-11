<style lang="scss">
.order-customer-list {
  width: 100%;
  height: 520px;
  &__content {
    height: calc(100% - 50px);
    width: 100%;
  }
  &__pagination {
    height: 50px;
    width: 100%;
  }
}
.order-customer-list-filters {
  display: flex;
  gap: 6px;
}
</style>
<template>
  <el-dialog v-bind="$attrs">
    <div class="order-customer-list">
      <div class="order-customer-list-filters"></div>
      <div class="order-customer-list__content">
        <template v-if="isArray(tableData)">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%; height: 100%"
            @cell-click="handleRowClick"
          >
            <el-table-column prop="name" label="客戶姓名" />
            <el-table-column prop="cellphoneNum" label="手機號碼" />
            <el-table-column prop="telephoneNum" label="電話" />
            <el-table-column prop="addressDetail" label="聯絡地址" />
            <el-table-column prop="note" label="備註" />
          </el-table>
        </template>
      </div>
      <div class="order-customer-list__pagination">
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
  </el-dialog>
</template>
<script lang="ts">
import { isArray, isNumber } from 'lodash'
import { defineComponent, reactive, Ref, ref } from 'vue'
import { IPostCustomerListRequest, ICustomerItem } from '@/types/api/account'
import { getCustomerListApi } from '@/utils/api/account'
import { IPagination } from '@/types/api/global'
import { formatTimestampToDate } from '@/library/tools/index'

export default defineComponent({
  name: 'PigeonGamePlayer',
  emits: ['selected-pigeon'],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, { emit }) {
    const tableData: Ref<ICustomerItem[] | null> = ref(null)
    const filter = reactive<IPostCustomerListRequest>({
      stype: null,
      savlue: null,
      page: 1
    })
    const pagination = reactive<IPagination>({
      total: null
    })
    const handleSearch = async () => {
      filter.page = 1
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
    const initialization = async () => {
      await handleSearch()
    }
    const handleCurrentChange = async () => {
      await getTableData()
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRowClick = (row: any) => {
      emit('selected-pigeon', row)
    }
    initialization()
    return {
      isNumber,
      isArray,
      tableData,
      filter,
      pagination,
      handleCurrentChange,
      handleRowClick,
      formatTimestampToDate,
      handleSearch
    }
  }
})
</script>
