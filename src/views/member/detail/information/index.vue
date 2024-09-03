<style lang="scss">
.member-information {
  width: 100%;
  height: 100%;

  &__function {
    padding: 10px 0;
    text-align: right;
  }
}
</style>
<template>
  <div class="member-information">
    <div class="member-information__function">
      <template v-if="isDisabled">
        <el-button @click="handleEdit">編輯</el-button>
        <EditPassword :memberId="memberId"></EditPassword>
      </template>
      <template v-else>
        <el-button @click="handleUpdate">修改</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </template>
    </div>
    <el-form
      class="member-information__form"
      label-width="100px"
      :model="formWithReactive"
      label-position="left"
      size="large"
    >
      <el-form-item label="名字">
        <el-input v-model="formWithReactive.name" :disabled="isDisabled" />
      </el-form-item>
      <el-form-item label="帳號">
        <el-input v-model="formWithReactive.account" :disabled="isDisabled" />
      </el-form-item>
      <el-form-item label="密嗎更新時間">
        <el-input v-model="formWithReactive.password_update_date" disabled />
      </el-form-item>
      <el-form-item label="經銷商">
        <el-input
          v-model="formWithReactive.dealer_code"
          :disabled="isDisabled"
        />
      </el-form-item>
      <el-form-item label="紅利點數">
        <el-input v-model="formWithReactive.reward" disabled />
      </el-form-item>
      <el-form-item label="活動贈點">
        <el-input v-model="formWithReactive.activity_reward" disabled />
      </el-form-item>
      <el-form-item label="剩餘點數">
        <el-input v-model="formWithReactive.point" disabled />
      </el-form-item>
      <el-form-item label="總點數">
        <el-input v-model="formWithReactive.total_point" disabled />
      </el-form-item>
      <el-form-item label="備註">
        <el-input v-model="formWithReactive.memo" :disabled="isDisabled" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { useRoute } from 'vue-router'
import { IGetMemberResponse, IPutMemberRequest } from '@/types/api/member'
import { getMemberApi, putMemberApi } from '@/utils/api/member'
import { ElMessageBox } from 'element-plus'
import useTemplate from '@/composables/useTemplate'
import EditPassword from '@/components/project/member/detail/information/EditPassword.vue'
export default defineComponent({
  name: 'MemberInformation',
  components: { EditPassword },
  setup() {
    const route = useRoute()
    const {
      params: { member_id }
    } = route
    const isDisabled: Ref<boolean> = ref(true)
    const memberId = parseInt(member_id as string)
    const [form, formWithReactive] = useTemplate<IGetMemberResponse>({
      account: null,
      name: null,
      password_update_date: null,
      dealer_code: null,
      point: null,
      reward: null,
      activity_reward: null,
      account_status: true,
      memo: null
    })

    const getMemberInformation = async () => {
      const data: IGetMemberResponse = await getMemberApi(memberId)
      Object.assign(form, data)
      Object.assign(formWithReactive, data)
    }

    const handleEdit = () => {
      isDisabled.value = false
    }

    const handleUpdate = async () => {
      const request: IPutMemberRequest = {
        name: formWithReactive.name,
        account: formWithReactive.account,
        dealer_code: formWithReactive.dealer_code,
        memo: formWithReactive.memo
      }
      ElMessageBox.confirm('是否真的要編輯?', '', {
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          isDisabled.value = true
          await putMemberApi(memberId, request)
          await getMemberInformation()
        })
    }

    const handleCancel = () => {
      isDisabled.value = true
    }

    const initialization = async () => {
      await getMemberInformation()
    }
    initialization()
    return {
      memberId,
      formWithReactive,
      isDisabled,
      handleEdit,
      handleCancel,
      handleUpdate
    }
  }
})
</script>
