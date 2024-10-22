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
          <el-input v-model="form.name" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="稱謂">
          <el-input v-model="form.callName" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="電話">
          <el-input v-model="form.telephoneNum" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="手機號碼">
          <el-input v-model="form.cellphoneNum" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="縣/市">
          <el-select
            v-model="form.addressCity"
            :disabled="isDisabled"
            @change="onCityChange"
          >
            <el-option
              v-for="city in cities"
              :key="city.id"
              :label="city.name"
              :value="city.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地區">
          <el-select v-model="form.addressArea" :disabled="isDisabled">
            <el-option
              v-for="area in zipCodeOption"
              :key="area.district"
              :label="area.district"
              :value="area.district"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.addressDetail" :disabled="isDisabled" />
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
          v-else-if="isNumber(customerId) && customerId > 0"
          type="primary"
          @click="handleEdit"
          >編輯</el-button
        >
        <el-button
          v-else-if="customerId === -1"
          type="primary"
          @click="handleCreate"
          >新增客戶</el-button
        >
      </div>
    </template>
  </el-drawer>
</template>
<script lang="ts">
import { defineComponent, computed, Ref, PropType, reactive, ref } from 'vue'
import { cloneDeep, isNumber } from 'lodash'
// import { getUserApi, postUserApi, putUserApi } from '@/utils/api/user'
// import { IPostUserRequest, IPutUserRequest } from '@/types/api/user'
import { postCreateCustomerApi } from '@/utils/api/account'
import { ICustomerItem } from '@/types/api/account'
import { ElNotification } from 'element-plus'
import cities from '@/library/taiwan/cities'
import zipCodes from '@/library/taiwan/zip-codes'
export default defineComponent({
  name: 'PigeonPlayerEdit',
  props: {
    customerId: {
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
    const emptyForm = reactive<ICustomerItem>({
      addressArea: null,
      addressCity: null,
      addressDetail: null,
      callName: null,
      cellphoneNum: null,
      name: null,
      note: null,
      telephoneNum: null
    })

    const form: ICustomerItem = reactive(cloneDeep(emptyForm))
    const zipCodeOption: Ref<unknown[]> = ref([])

    const isVisible: Ref<boolean> = computed(() => {
      if (isNumber(props.customerId)) {
        if (props.customerId === -1) {
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
        return '詳情'
      } else if (props.customerId && props.customerId > 0) {
        return '編輯客戶'
      }
      return '新增客戶'
    })
    const getPlayer = async () => {
      if (isNumber(props.customerId)) {
        // const data = await getUserApi(props.customerId)
        // Object.assign(form, data)
      }
    }
    const getEmptyPlayer = () => {
      Object.assign(form, cloneDeep(emptyForm))
    }
    const handleCreate = async () => {
      try {
        await postCreateCustomerApi(form)
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
      if (isNumber(props.customerId)) {
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
    const onCityChange = () => {
      const city = form.addressCity
      const zipCodesByCity = zipCodes.filter((zipCode) => zipCode.city === city)
      zipCodeOption.value = [...zipCodesByCity]
      form.addressArea = null
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
      cities,
      zipCodeOption,
      onCityChange
    }
  }
})
</script>
