<template>
  <el-drawer
    v-model="isVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose"
  >
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <template #default>
      <el-form label-position="top">
        <el-form-item label="姓名">
          <el-input v-model="form.custOrderNo" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="稱謂">
          <el-input v-model="form.orderStatus" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="備註">
          <el-input v-model="form.note" :disabled="isDisabled" />
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
</template>
<script lang="ts">
import { defineComponent, computed, Ref, PropType, reactive, ref } from 'vue'
import { cloneDeep, isNumber } from 'lodash'
import {
  getOrderItemApi,
  postCreateOrderApi,
  postUpdateOrderApi
} from '@/utils/api/order'
import { IOrderItem } from '@/types/api/order'
import { ElNotification } from 'element-plus'

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
  components: {},
  setup(props, { emit }) {
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
        // const data = await getUserApi(props.customerId)
        // Object.assign(form, data)
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
        // ElNotification({
        //   title: 'Error',
        //   message: 'Create Failed',
        //   type: 'error',
        //   customClass: 'error-notification'
        // })
        console.log('error :>> ', error)
      }
    }
    const handleEdit = async () => {
      if (isNumber(props.id)) {
        try {
          // await putUserApi(props.customerId, form)
          ElNotification({
            title: 'Success',
            message: 'Edit Success',
            type: 'success',
            customClass: 'success-notification'
          })
          closeDrawer()
        } catch (error) {
          // ElNotification({
          //   title: 'Error',
          //   message: 'Edit Failed',
          //   type: 'error',
          //   customClass: 'error-notification'
          // })
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

    return {
      title,
      form,
      isVisible,
      handleCreate,
      handleEdit,
      handleCancel,
      handleClose,
      isNumber,
      handleConfirm,
      zipCodeOption
    }
  }
})
</script>
