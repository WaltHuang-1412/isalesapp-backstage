<style lang="scss">
.order-list {
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
  <div class="order-list">
    <div class="order-list__title">訂單</div>
    <div class="order-list__filter">
      <div class="order-list__filter__item">
        <el-button type="primary" :icon="Plus" @click="handleCreate"
          >新增訂單</el-button
        >
      </div>
      <div class="order-list__filter__item">
        <el-input v-model="filter.savlue" :prefix-icon="Search"> </el-input>
      </div>
      <div class="order-list__filter__item">
        <el-button @click="handleSearch">搜尋</el-button>
      </div>
    </div>
    <div class="order-list__content">
      <template v-if="isArray(tableData)">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%; height: 100%"
          @row-click="handleRowClick"
        >
          <el-table-column prop="custOrderNo" label="訂單編號" />
          <el-table-column prop="createTime" label="建立時間" />
          <el-table-column prop="customerName" label="客戶" />
          <el-table-column prop="totalPrice" label="總金額" />
          <el-table-column prop="orderStatus" label="付款狀態" />
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
              <el-button
                link
                type="primary"
                size="small"
                @click="handleEdit(scope)"
                >編輯</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="order-list__pagination">
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
    <OrderListEdit
      :id="selectedOrderId"
      :is-disabled="isDisabled"
      @success="handleSearch"
      @close="handleDefaultSelectedOrderId"
    />
  </div>
</template>
<script lang="ts">
import { cloneDeep, isArray, isNumber } from 'lodash'
import { defineComponent, reactive, ref, Ref } from 'vue'
import { IPostOrderListRequest, IOrderItem } from '@/types/api/order'
import { getOrderListApi } from '@/utils/api/order'
import { IPagination } from '@/types/api/global'
import { routeList } from '@/router'
import { useRouter } from 'vue-router'
import OrderListEdit from '@/components/project/order/list/Edit.vue'
import { Plus, Search } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'MemberList',
  components: {
    OrderListEdit
  },
  setup() {
    const router = useRouter()
    const isDisabled = ref(true)
    const selectedOrderId: Ref<number | null | undefined> = ref(null)
    const tableData: Ref<IOrderItem[] | null> = ref(null)
    const filter = reactive<IPostOrderListRequest>({
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
    const handleCurrentChange = async () => {
      await getTableData()
    }
    const getTableData = async () => {
      const {
        data: { list },
        dataPage: { total }
      } = await getOrderListApi(filter)
      tableData.value = list
      pagination.total = total
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDetail = ({ row }: { row: any }) => {
      isDisabled.value = true
      selectedOrderId.value = cloneDeep(row.id)
      // router.push({
      //   name: routeList['order_product-list'],
      //   params: {
      //     order_id: row.id
      //   }
      // })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEdit = ({ row }: { row: any }) => {
      isDisabled.value = false
      selectedOrderId.value = cloneDeep(row.id)
    }
    const handleCreate = () => {
      isDisabled.value = false
      selectedOrderId.value = -1
    }
    const handleDefaultSelectedOrderId = () => {
      selectedOrderId.value = null
    }

    const handleRowClick = (row: any) => {
      router.push({
        name: routeList['order_product-list'],
        params: { order_id: row.id }
      })
    }
    const initialization = async () => {
      await handleSearch()
    }
    initialization()
    return {
      Plus,
      Search,
      tableData,
      filter,
      pagination,
      isArray,
      isNumber,
      isDisabled,
      selectedOrderId,
      handleSearch,
      handleCurrentChange,
      handleDetail,
      handleEdit,
      handleCreate,
      handleDefaultSelectedOrderId,
      handleRowClick
    }
  }
})
</script>
