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
        <el-form-item label="商品名稱">
          <el-input v-model="form.productName" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="品牌">
          <el-select v-model="form.brandId" :disabled="isDisabled">
            <el-option
              v-for="item in homeApplianceBrand"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="類別">
          <el-select v-model="form.productType" :disabled="isDisabled">
            <el-option
              v-for="item in homeApplianceCategory"
              :key="item.id"
              :label="item.chineseName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="型號">
          <el-input v-model="form.productKindId" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="售價">
          <el-input v-model="form.basePrice" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="成本">
          <el-input v-model="form.costPrice" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="保固年限">
          <el-input v-model="form.warrantyYear" :disabled="isDisabled" />
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
          >新增品項</el-button
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
  postCreateOrderDetailApi,
  updateCreateOrderDetailApi
} from '@/utils/api/order'
import { IOrderDetailProduct } from '@/types/api/order'
import { ElNotification } from 'element-plus'
import homeApplianceBrand from '@/library/taiwan/home-appliance-brand'
import homeApplianceCategory from '@/library/taiwan/home-appliance-category'
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
    const emptyForm = reactive<IOrderDetailProduct>({
      id: null,
      productNo: null,
      productName: null,
      brandId: null,
      brandName: null,
      productKindId: null,
      productType: null,
      basePrice: null,
      costPrice: null,
      warrantyYear: null,
      note: null,
      kindName: null
    })

    const form: IOrderDetailProduct = reactive(cloneDeep(emptyForm))
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
        return '品項'
      } else if (props.id && props.id > 0) {
        return '編輯品項'
      }
      return '新增品項'
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
        await postCreateOrderDetailApi(form)
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
          await updateCreateOrderDetailApi(form)
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
      zipCodeOption,
      homeApplianceBrand,
      homeApplianceCategory
    }
  }
})
</script>
