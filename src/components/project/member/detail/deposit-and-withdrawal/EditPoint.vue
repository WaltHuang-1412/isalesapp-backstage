<style lang="scss">
.edit-point-button {
  background-color: transparent;
}
.end-point-dialog-button {
  .el-button {
    width: 100% !important;
  }
}
</style>
<template lang="pug">
el-button.edit-point-button(@click="openDialog") 點數加值或扣款

el-dialog(v-model="isDisplayDialog"
          width="360px"
          center
          title="點數加值或扣款"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false")
  el-form.end-point-dialog(ref="ruleFormRef"
                                :model="form"
                                :rules="rules"
                                label-position="top"
                                @submit.native.prevent)
    el-form-item(label="現金類型" prop="cash_type")
      el-radio-group(v-model="form.cash_type" @change="onCashTypeChange")
        el-radio(:label="0") 不指定
        el-radio(:label="1") 存
        el-radio(:label="-1") 提
    el-form-item(:label="cashLabel" prop="cash")
      el-input-number(v-model="form.cash_abs"
        :step="1"
        :max="99999999"
        :min="0"
        :disabled="form.cash_type === 0")
    el-form-item(:label="'點數類型'" prop="point_type")
      el-radio-group(v-model="form.point_type" @change="onPointTypeChange")
        el-radio(:label="0") 不指定
        el-radio(:label="1") 存
        el-radio(:label="-1") 提
    el-form-item(:label="pointLabel" prop="point")
      el-input-number(v-model="form.point_abs"
        :step="1"
        :max="99999999"
        :min="0"
        :disabled="form.point_type === 0")
    el-form-item(label="紅利贈點類型" prop="reward_type")
      el-radio-group(v-model="form.reward_type" @change="onRewardTypeChange")
        el-radio(:label="0") 不指定
        el-radio(:label="1") 存
        el-radio(:label="-1") 提
    el-form-item(:label="rewardLabel" prop="reward")
      el-input-number(v-model="form.reward_abs"
        :step="1"
        :max="99999999"
        :min="0"
        :disabled="form.reward_type === 0")
    el-form-item(label="活動贈點類型" prop="activity_reward_type")
      el-radio-group(v-model="form.activity_reward_type" @change="onActivityRewardTypeChange")
        el-radio(:label="0") 不指定
        el-radio(:label="1") 存
        el-radio(:label="-1") 提
    el-form-item(:label="activityRewardLabel" prop="activity_reward")
      el-input-number(v-model="form.activity_reward_abs"
        :step="1"
        :max="99999999"
        :min="0"
        :disabled="form.activity_reward_type === 0")
    el-form-item(label="註記" prop="memo")
      el-input(v-model="form.memo" :rows="3" type="textarea" placeholder="輸入註記")
    el-form-item.end-point-dialog-button
      el-button(type="primary" @click="submitForm(ruleFormRef)") 確認
    el-form-item.end-point-dialog-button
      el-button(@click="resetForm(ruleFormRef)") 取消
</template>
<script lang="ts">
import { defineComponent, reactive, ref, Ref, computed } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElNotification } from 'element-plus'
import { isNaN, isObject } from 'lodash'
import { postMemberPoint } from '@/utils/api/member'
import { IPostMemberPointRequest } from '@/types/api/member'
import { Hide } from '@element-plus/icons-vue'
import { useStore } from '@/store'
export default defineComponent({
  name: 'EditPassword',
  inheritAttrs: false,
  props: {
    memberId: {
      type: Number,
      required: true
    }
  },
  emits: ['update:success'],
  setup(props, { emit }) {
    const store = useStore()

    const isDisplayDialog: Ref<boolean> = ref(false)
    const ruleFormRef = ref<FormInstance>()
    const profile = computed(() => store.state.userProfile)

    const form = reactive<IPostMemberPointRequest>({
      member_id: props.memberId,
      cash_type: 0,
      cash: 0,
      cash_abs: 0,
      fee: 0,
      point_type: 0,
      point: 0,
      point_abs: 0,
      point_expired_at: null,
      reward_type: 0,
      reward: 0,
      reward_abs: 0,
      reward_expired_at: null,
      activity_reward_type: 0,
      activity_reward: 0,
      activity_reward_abs: 0,
      activity_reward_expired_at: null,
      memo: null
    })
    const cashLabel = computed(() => {
      if (form.cash_type === -1 && profile.value && form.cash_abs) {
        const fee = Math.floor(form.cash_abs * profile.value.fee)
        const result = form.cash_abs - fee
        return `現金 手續費: ${profile.value.fee * 100}% 實領: ${result}`
      } else if (form.cash_type === 1 && form.cash_abs) {
        return `現金 ${form.cash_abs}`
      }
      return '現金'
    })
    const pointLabel = computed(() => {
      if (form.point_type !== 0 && form.point_abs && form.point_type) {
        return `點數 ${form.point_abs * form.point_type}`
      }
      return '點數'
    })
    const rewardLabel = computed(() => {
      if (form.reward_type !== 0 && form.reward_abs && form.reward_type) {
        return `紅利贈點 ${form.reward_abs * form.reward_type}`
      }
      return '紅利贈點'
    })
    const activityRewardLabel = computed(() => {
      if (
        form.activity_reward_type !== 0 &&
        form.activity_reward_abs &&
        form.activity_reward_type
      ) {
        return `活動贈點 ${
          form.activity_reward_abs * form.activity_reward_type
        }`
      }
      return '活動贈點'
    })
    const onCashTypeChange = (value: number) => {
      if (value === 0) {
        form.cash_abs = 0
      }
    }
    const onPointTypeChange = (value: number) => {
      if (value === 0) {
        form.point_abs = 0
      }
    }
    const onRewardTypeChange = (value: number) => {
      if (value === 0) {
        form.reward_abs = 0
      }
    }
    const onActivityRewardTypeChange = (value: number) => {
      if (value === 0) {
        form.activity_reward_abs = 0
      }
    }
    const rules = reactive({
      point: [
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          validator: (rule: any, value: any, callback: any) => {
            if (isNaN(value)) {
              callback(new Error('請填寫數字'))
            }
            callback()
          },
          min: 6,
          trigger: 'blur'
        }
      ],
      reward: [
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          validator: (rule: any, value: any, callback: any) => {
            if (isNaN(value)) {
              callback(new Error('請填寫數字'))
            }
            callback()
          },
          min: 6,
          trigger: 'blur'
        }
      ],
      activity_reward: [
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          validator: (rule: any, value: any, callback: any) => {
            if (isNaN(value)) {
              callback(new Error('請填寫數字'))
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
      form.point_abs = 0
      form.reward_abs = 0
      form.activity_reward_abs = 0
    }
    const closeDialog = () => {
      isDisplayDialog.value = false
    }

    const submitForm = async (formElement: FormInstance | undefined) => {
      if (isObject(formElement)) {
        formElement.validate(async (isValid) => {
          if (isValid) {
            await postMemberPoint(form)
            ElNotification({
              title: '',
              message: '修改成功',
              type: 'success',
              customClass: 'success-notification'
            })
            emit('update:success')
            formElement.resetFields()
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
      cashLabel,
      pointLabel,
      rewardLabel,
      activityRewardLabel,
      Hide,
      submitForm,
      resetForm,
      openDialog,
      closeDialog,
      onCashTypeChange,
      onPointTypeChange,
      onRewardTypeChange,
      onActivityRewardTypeChange
    }
  }
})
</script>
