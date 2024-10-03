<style lang="scss">
.customer-deposit-withdrawal {
  width: 100%;
  height: 100%;

  &__filter {
    width: 100%;
    height: 40px;
    text-align: right;

    &__item {
      display: inline-block;
      width: 200px;
      margin-right: 10px;
    }
    .el-form {
      height: 500px;
      overflow: auto;
    }
  }
  &__content {
    width: 100%;
    height: calc(100% - 80px);
  }
  &__pagination {
    width: 100%;
    height: 40px;
  }
}
</style>
<template>
  <div class="member-deposit-withdrawal">
    <div class="member-deposit-withdrawal__filter"></div>
    <div class="member-deposit-withdrawal__content">
      <template v-if="isArray(tableData)">
        <el-table :data="tableData" stripe style="width: 100%; height: 100%;">
          <el-table-column type="expand">
            <template #default="props">
              <div>
                <el-table :data="props.row.order_details" :border="true">
                  <el-table-column label="下注玩法名稱" prop="method_name" />
                  <el-table-column label="下注賠率" prop="odds" />
                  <el-table-column label="下注金額" prop="amount" />
                  <el-table-column label="嬴輸結果" prop="result_amount" />
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="日期" />
          <el-table-column prop="game_title" label="賽事名稱" />
          <el-table-column prop="order_no" label="下注訂單序號" />
          <el-table-column prop="totl_amount" label="下注總額" />
          <el-table-column prop="total_win_amount" label="嬴錢總額" />
          <el-table-column prop="total_win_lose_amount" label="輸嬴總額" />
        </el-table>
      </template>
    </div>
    <div class="member-deposit-withdrawal__pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        v-model:current-page="filter.page"
        :page-size="filter.size"
        :total="pagination.total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue'
import { isArray } from 'lodash'
import {
  IGetMemberOrdersRequest,
  IGetMemberOrdersResponse,
  IOrderItem
} from '@/types/api/member'
import { getMemberOrders } from '@/utils/api/member'
import { IPagination } from '@/types/api/global'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'MemberDetailDepositWithdrawal',
  components: {},
  setup() {
    const route = useRoute()
    const {
      params: { member_id }
    } = route
    const memberId = parseInt(member_id as string)
    const tableData: Ref<IOrderItem[] | null> = ref(null)
    const filter = reactive<IGetMemberOrdersRequest>({
      create_at_start_time: null,
      create_at_end_time: null,
      sorting: null,
      descending: true,
      page: 1,
      size: 10
    })
    const pagination = reactive<IPagination>({
      total: null
    })
    const handleCurrentChange = async () => {
      await getTableData()
    }
    const getTableData = async () => {
      const { items, total }: IGetMemberOrdersResponse = await getMemberOrders(
        memberId,
        filter
      )
      tableData.value = items
      pagination.total = total
    }

    const initialization = async () => {
      await getTableData()
    }
    // initialization()
    return {
      memberId,
      tableData,
      filter,
      getTableData,
      isArray,
      pagination,
      handleCurrentChange
    }
  }
})
</script>
