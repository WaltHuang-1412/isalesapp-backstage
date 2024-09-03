<style lang="scss">
.edit-password-button {
  background-color: transparent;
}
.reset-password-dialog-button {
  .el-button {
    width: 100% !important;
  }
}
</style>
<template lang="pug">
el-button.edit-password-button(@click="openDialog") 修改密碼
el-dialog(v-model="isDisplayDialog"
          width="336px"
          center
          title="修改密碼"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false")
  el-form.reset-password-dialog(ref="ruleFormRef"
                                :model="form"
                                :rules="rules"
                                @submit.native.prevent)
    el-form-item(prop="password")
      el-input(v-model="form.password" placeholder="輸入新密碼" type="password" autocomplete="off" show-password)
    el-form-item(prop="password_confirm")
      el-input(v-model="form.password_confirm" placeholder="確認新密碼" type="password" autocomplete="off" show-password)
    el-form-item.reset-password-dialog-button
      el-button(type="primary" @click="submitForm(ruleFormRef)") 確認
    el-form-item.reset-password-dialog-button
      el-button(@click="resetForm(ruleFormRef)") 取消
</template>
<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElNotification } from 'element-plus'
import { isEmpty, isObject, isString } from 'lodash'
import { putMemberApi } from '@/utils/api/member'
import { IPutMemberRequest } from '@/types/api/member'
import { Hide } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'EditPassword',
  inheritAttrs: false,
  props: {
    memberId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const isDisplayDialog: Ref<boolean> = ref(false)
    const ruleFormRef = ref<FormInstance>()
    const form = reactive<IPutMemberRequest>({
      password: null,
      password_confirm: null
    })
    const rules = reactive({
      password: [
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          validator: (rule: any, value: any, callback: any) => {
            if (isEmpty(value)) {
              callback(new Error('密碼不能為空'))
            }

            if (isString(value) && value.length < 6) {
              callback(new Error('設定至少６個字元'))
            }
            callback()
          },
          min: 6,
          trigger: 'blur'
        }
      ],
      password_confirm: [
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          validator: (rule: any, value: any, callback: any) => {
            if (isEmpty(value)) {
              callback(new Error('確認密碼不能為空'))
            }
            if (isString(value) && value.length < 6) {
              callback(new Error('設定至少６個字元'))
            }
            if (value !== form.password) {
              callback(new Error('密碼跟確認密碼不相同'))
            }
            callback()
          },
          min: 6,
          trigger: 'blur'
        }
      ]
    })

    const openDialog = () => {
      isDisplayDialog.value = true
    }
    const closeDialog = () => {
      isDisplayDialog.value = false
      form.password = null
      form.password_confirm = null
    }

    const submitForm = async (formElement: FormInstance | undefined) => {
      if (isObject(formElement)) {
        formElement.validate(async (isValid) => {
          if (isValid && form.password) {
            await putMemberApi(props.memberId, form)
            ElNotification({
              title: '',
              message: '修改成功',
              type: 'success',
              customClass: 'success-notification'
            })
            closeDialog()
          }
        })
      }
    }

    const resetForm = (formElement: FormInstance | undefined) => {
      if (isObject(formElement)) {
        formElement.resetFields()
        closeDialog()
      }
    }

    return {
      ruleFormRef,
      rules,
      isDisplayDialog,
      form,
      Hide,
      submitForm,
      resetForm,
      openDialog,
      closeDialog
    }
  }
})
</script>
