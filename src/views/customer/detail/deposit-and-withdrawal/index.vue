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
    <div class="member-deposit-withdrawal__filter">
      <EditPoint
        :memberId="memberId"
        @update:success="handleUpdateSuccess"
      ></EditPoint>
    </div>
    <div class="member-deposit-withdrawal__content">
      <template v-if="isArray(tableData)">
        <el-table :data="tableData" stripe style="width: 100%; height: 100%">
          <el-table-column prop="created_at" label="日期" />
          <el-table-column prop="cash_abs" label="現金">
            <template #default="scope">
              {{ scope.row.cash }}
            </template>
          </el-table-column>
          <el-table-column prop="point_abs" label="點數">
            <template #default="scope">
              {{ scope.row.point }}
            </template>
          </el-table-column>
          <el-table-column prop="reward_abs" label="紅利贈點">
            <template #default="scope">
              {{ scope.row.reward }}
            </template>
          </el-table-column>
          <el-table-column prop="activity_reward_abs" label="活動贈點">
            <template #default="scope">
              {{ scope.row.activity_reward }}
            </template>
          </el-table-column>
          <el-table-column prop="cash_type" label="現金類型">
            <template #default="scope">
              {{ pointTypeText(scope.row.cash_type) }}
            </template>
          </el-table-column>
          <el-table-column prop="point_type" label="點數類型">
            <template #default="scope">
              {{ pointTypeText(scope.row.point_type) }}
            </template>
          </el-table-column>
          <el-table-column prop="reward_type" label="紅利類型">
            <template #default="scope">
              {{ pointTypeText(scope.row.reward_type) }}
            </template>
          </el-table-column>
          <el-table-column prop="activity_reward_type" label="活動贈點類型">
            <template #default="scope">
              {{ pointTypeText(scope.row.activity_reward_type) }}
            </template>
          </el-table-column>
          <el-table-column prop="memo" label="交易結果" />
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
  IGetMemberPointRequest,
  IGetMemberPointResponse,
  IMemberPoint
} from '@/types/api/member'
import EditPoint from '@/components/project/member/detail/deposit-and-withdrawal/EditPoint.vue'
import { getMemberPoint } from '@/utils/api/member'
import { IPagination } from '@/types/api/global'
import { useRoute } from 'vue-router'
import { PointType } from '@/models/enum'
export default defineComponent({
  name: 'MemberDetailDepositWithdrawal',
  components: { EditPoint },
  setup() {
    const route = useRoute()
    const {
      params: { member_id }
    } = route
    const memberId = parseInt(member_id as string)
    const tableData: Ref<IMemberPoint[] | null> = ref(null)
    const filter = reactive<IGetMemberPointRequest>({
      member_id: memberId,
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
      const { items, total }: IGetMemberPointResponse = await getMemberPoint(
        filter
      )
      tableData.value = items
      pagination.total = total
    }
    const handleUpdateSuccess = async () => {
      getTableData()
    }

    const pointTypeTextMap: Record<number, string> = {
      [PointType.NotSpecified]: '不指定',
      [PointType.Deposit]: '存',
      [PointType.Withdraw]: '提',
      [PointType.Bet]: '下注',
      [PointType.Payout]: '派彩',
      [PointType.CancelBet]: '取消下注',
      [PointType.CancelPayout]: '取消派彩'
    }
    const pointTypeText = (type: PointType): string => {
      return pointTypeTextMap[type]
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
      handleCurrentChange,
      handleUpdateSuccess,
      pointTypeText
    }
  }
})
</script>
