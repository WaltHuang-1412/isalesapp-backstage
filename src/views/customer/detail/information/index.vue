<style lang="scss">
.customer-information {
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
        <EditPassword :member-id="customerId"></EditPassword>
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
      <el-form-item label="姓名">
        <el-input v-model="formWithReactive.name" :disabled="isDisabled" />
      </el-form-item>
      <el-form-item label="稱謂">
        <el-input v-model="formWithReactive.callName" :disabled="isDisabled" />
      </el-form-item>
      <el-form-item label="電話">
        <el-input
          v-model="formWithReactive.telephoneNum"
          :disabled="isDisabled"
        />
      </el-form-item>
      <el-form-item label="行動電話">
        <el-input
          v-model="formWithReactive.cellphoneNum"
          :disabled="isDisabled"
        />
      </el-form-item>
      <el-form-item label="地址">
        <el-input
          v-model="formWithReactive.addressDetail"
          :disabled="isDisabled"
        />
      </el-form-item>
      <el-form-item label="縣/市">
        <el-select
          v-model="formWithReactive.addressCity"
          :disabled="isDisabled"
        >
        </el-select>
      </el-form-item>
      <el-form-item label="區">
        <el-select
          v-model="formWithReactive.addressArea"
          :disabled="isDisabled"
        >
          ></el-select
        >
      </el-form-item>

      <el-form-item label="備註">
        <el-input v-model="formWithReactive.note" :disabled="isDisabled" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { useRoute } from 'vue-router'
import { ICustomerItem, IGetCustomerItemResponse } from '@/types/api/account'
import { getCustomerItemApi, postUpdateCustomerApi } from '@/utils/api/account'
import { ElMessageBox } from 'element-plus'
import useTemplate from '@/composables/useTemplate'
import EditPassword from '@/components/project/member/detail/information/EditPassword.vue'
export default defineComponent({
  name: 'MemberInformation',
  components: { EditPassword },
  setup() {
    const route = useRoute()
    const {
      params: { customer_id }
    } = route
    const isDisabled: Ref<boolean> = ref(true)
    const customerId = parseInt(customer_id as string)
    const [form, formWithReactive] = useTemplate<ICustomerItem>({
      addressArea: null,
      addressCity: null,
      addressDetail: null,
      callName: null,
      cellphoneNum: null,
      id: null,
      name: null,
      note: null,
      telephoneNum: null
    })

    const getMemberInformation = async () => {
      const {
        data: { customer }
      }: {
        data: IGetCustomerItemResponse
      } = await getCustomerItemApi(customerId)
      console.log('data :>> ', customer)
      Object.assign(form, customer)
      Object.assign(formWithReactive, customer)
    }

    const handleEdit = () => {
      isDisabled.value = false
    }

    const handleUpdate = async () => {
      // const request: IPutMemberRequest = {
      //   name: formWithReactive.name,
      //   account: formWithReactive.account,
      //   dealer_code: formWithReactive.dealer_code,
      //   memo: formWithReactive.memo
      // }
      // ElMessageBox.confirm('是否真的要編輯?', '', {
      //   confirmButtonText: '確認',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(async () => {
      //   isDisabled.value = true
      //   await putMemberApi(customerId, request)
      //   await getMemberInformation()
      // })
    }

    const handleCancel = () => {
      isDisabled.value = true
    }

    const initialization = async () => {
      await getMemberInformation()
    }
    initialization()
    return {
      customerId,
      formWithReactive,
      isDisabled,
      handleEdit,
      handleCancel,
      handleUpdate
    }
  }
})
</script>
