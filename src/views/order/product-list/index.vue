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
    <div class="customer-list__title">#{{ route.params.order_id }}</div>
    <div class="customer-list__filter">
      <div class="customer-list__filter__item">
        <el-button type="primary" :icon="Plus" @click="handleCreate"
          >新增品項</el-button
        >
      </div>
      <!-- <div class="customer-list__filter__item">
        <el-input v-model="filter.savlue" :prefix-icon="Search"> </el-input>
      </div>
      <div class="customer-list__filter__item">
        <el-button @click="handleSearch">搜尋</el-button>
      </div> -->
    </div>
    <div class="customer-list__content">
      <template v-if="isArray(tableData)">
        <el-table :data="tableData" stripe style="width: 100%; height: 100%">
          <el-table-column prop="product" label="編號">
            <template #default="{ row }">{{ row.product?.id }}</template>
          </el-table-column>
          <el-table-column prop="product" label="商品名稱">
            <template #default="{ row }">{{
              row.product?.productName
            }}</template>
          </el-table-column>
          <el-table-column prop="itemCount" label="數量"> </el-table-column>
          <el-table-column prop="product" label="售價">
            <template #default="{ row }">{{ row.product?.basePrice }}</template>
          </el-table-column>

          <el-table-column prop="product" label="成本">
            <template #default="{ row }">{{ row.product?.costPrice }}</template>
          </el-table-column>
          <el-table-column prop="product" label="備註">
            <template #default="{ row }">{{ row.product?.note }}</template>
          </el-table-column>

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
      <!-- <template v-if="isNumber(pagination.total)">
        <el-pagination
          background
          layout="prev, pager, next"
          v-model:current-page="filter.page"
          :page-size="filter.size"
          :total="pagination.total"
          @current-change="handleCurrentChange"
        />
      </template> -->
    </div>
    <ProductListEdit
      :id="selectedCustomerId"
      @success="handleSearch"
      @close="handleDefaultSelectedCustomerId"
    />
  </div>
</template>
<script lang="ts">
import { cloneDeep, isArray, isNumber, isString } from 'lodash'
import { defineComponent, reactive, ref, Ref } from 'vue'
import { IOrderDetail } from '@/types/api/order'
import { getProductListByOrderIdApi } from '@/utils/api/order'
import { IPagination } from '@/types/api/global'
import { routeList } from '@/router'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import ProductListEdit from '@/components/project/order/product-list/Edit.vue'
import { Plus, Search } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'MemberList',
  components: {
    ProductListEdit
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const isDisabled = ref(true)
    const selectedCustomerId: Ref<number | null | undefined> = ref(null)
    const tableData: Ref<IOrderDetail[] | null> = ref(null)
    const filter = reactive<any>({
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
      const { order_id } = route.params
      if (isString(order_id) && order_id.length > 0) {
        const {
          data: { list }
        } = await getProductListByOrderIdApi(parseInt(order_id))
        tableData.value = list
        // pagination.total = total
      }
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
    const handleCreate = () => {
      isDisabled.value = false
      selectedCustomerId.value = -1
    }
    const handleDefaultSelectedCustomerId = () => {
      selectedCustomerId.value = null
    }
    const initialization = async () => {
      await handleSearch()
    }
    initialization()
    return {
      Plus,
      Search,
      route,
      tableData,
      filter,
      pagination,
      isArray,
      isNumber,
      selectedCustomerId,
      handleSearch,
      handleCurrentChange,
      handleDetail,
      handleCreate,
      handleDefaultSelectedCustomerId
    }
  }
})
</script>
