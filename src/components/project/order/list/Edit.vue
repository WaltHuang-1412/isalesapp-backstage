<style lang="scss">
.order-list-edit {
  .box {
    width: 100%;
    display: flex;
    gap: 10px;
    &__name {
      width: 70%;
    }
    &__button {
      width: 30%;
    }
  }
}
</style>
<template>
  <el-drawer
    v-model="isVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose"
    class="order-list-edit"
  >
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <template #default>
      <el-form label-position="top">
        <el-form-item label="訂單編號">
          <el-input v-model="form.custOrderNo" :disabled="true" />
        </el-form-item>
        <el-form-item label="客戶">
          <div class="box">
            <div class="box__name">
              <el-input v-model="form.customerName" :disabled="true" />
            </div>
            <div class="box__button">
              <el-button @click="handleCustomerList" :disabled="isDisabled">選擇客戶</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="付款狀態">
          <el-select v-model="form.orderStatus" :disabled="isDisabled">
            <el-option
              v-for="item in orderStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="備註">
          <el-input
            v-model="form.note"
            :disabled="isDisabled"
            type="textarea"
            :row="5"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="handleCancel">取消</el-button>
        <el-button v-if="isDisabled" type="primary" @click="handleConfirm"
          >確認</el-button
        >
        <el-button
          v-else-if="isNumber(id) && id > 0"
          type="primary"
          @click="handleEdit"
          >編輯</el-button
        >
        <el-button v-else-if="id === -1" type="primary" @click="handleCreate"
          >新增訂單</el-button
        >
      </div>
    </template>
  </el-drawer>
  <OrderListCustomers
    v-model="isCustomersVisible"
    @selected-pigeon="handleSelectedCustomer"
  ></OrderListCustomers>
</template>
<script lang="ts">
import { defineComponent, computed, Ref, PropType, reactive, ref } from 'vue'
import { cloneDeep, isNumber } from 'lodash'
import {
  getOrderItemApi,
  postCreateOrderApi,
  postUpdateOrderApi
} from '@/utils/api/order'
import { IOrderItem, orderStatusOptions } from '@/types/api/order'
import { ElNotification } from 'element-plus'
import OrderListCustomers from '@/components/project/order/list/Customers.vue'
import useDialog from '@/composables/useDialog'
import { ICustomerItem } from '@/types/api/account'
export default defineComponent({
  name: 'PigeonPlayerEdit',
  props: {
    id: {
      default: () => {
        return undefined
      },
      type: undefined as unknown as PropType<number | undefined | null>
    },
    isDisabled: {
      default: () => {
        return false
      },
      type: Boolean
    }
  },
  emits: ['close', 'success'],
  components: { OrderListCustomers },
  setup(props, { emit }) {
    const {
      isVisible: isCustomersVisible,
      openDialog: openCustomersDialog,
      closeDialog: closeCustomersDialog
    } = useDialog()
    const emptyForm = reactive<IOrderItem>({
      id: null,
      custOrderNo: null,
      customerId: null,
      customerName: null,
      orderStatus: null,
      note: null,
      totalPrice: null,
      updateTime: null,
      createTime: null
    })

    const form: IOrderItem = reactive(cloneDeep(emptyForm))
    const zipCodeOption: Ref<unknown[]> = ref([])

    const isVisible: Ref<boolean> = computed(() => {
      if (isNumber(props.id)) {
        if (props.id === -1) {
          getEmptyPlayer()
        } else {
          getPlayer()
        }
        return true
      } else {
        return false
      }
    })
    const title = computed(() => {
      if (props.isDisabled) {
        return '訂單'
      } else if (props.id && props.id > 0) {
        return '編輯訂單'
      }
      return '新增訂單'
    })
    const getPlayer = async () => {
      if (isNumber(props.id)) {
        const { data } = await getOrderItemApi(props.id)
        console.log('data :>> ', data)
        Object.assign(form, data.order)
      }
    }
    const getEmptyPlayer = () => {
      Object.assign(form, cloneDeep(emptyForm))
    }
    const handleCreate = async () => {
      try {
        await postCreateOrderApi(form)
        ElNotification({
          title: 'Success',
          message: 'Create Success',
          type: 'success',
          customClass: 'success-notification'
        })
        updatedAndCreatedSuccess()
        closeDrawer()
      } catch (error) {
        console.log('error :>> ', error)
      }
    }
    const handleEdit = async () => {
      if (isNumber(props.id)) {
        try {
          await postUpdateOrderApi(form)
          ElNotification({
            title: 'Success',
            message: 'Edit Success',
            type: 'success',
            customClass: 'success-notification'
          })
          updatedAndCreatedSuccess()
          closeDrawer()
        } catch (error) {
          console.log('error :>> ', error)
        }
      }
    }

    const handleCancel = () => {
      closeDrawer()
    }
    const handleClose = () => {
      closeDrawer()
    }
    const handleConfirm = () => {
      closeDrawer()
    }
    const closeDrawer = (options = { getTableData: false }) => {
      emit('close', options)
    }

    const updatedAndCreatedSuccess = () => {
      emit('success')
    }

    const handleSelectedCustomer = (row: ICustomerItem) => {
      form.customerId = row.id ?? null
      form.customerName = row.name
      closeCustomersDialog()
    }

    const handleCustomerList = () => {
      openCustomersDialog()
    }

    return {
      title,
      form,
      isVisible,
      isCustomersVisible,
      handleCreate,
      handleEdit,
      handleCancel,
      handleClose,
      isNumber,
      handleConfirm,
      zipCodeOption,
      orderStatusOptions,
      handleSelectedCustomer,
      handleCustomerList
    }
  }
})
</script>
