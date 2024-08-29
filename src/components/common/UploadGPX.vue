<style lang="scss">
.upload-image {
  &__input {
    display: none;
  }
}
</style>

<template lang="pug">
.upload-image {{ bindValue }}
  template(v-if="!disabled")
    template(v-if="isString(fileUrl)")
      el-button(@click="handleDelete") 刪除檔案
    template(v-else)
      el-button(@click="handleClick") 匯入檔案
  input.upload-image__input(type="file" ref="fileRef" @change="onFileChange")


</template>
<script lang="ts">
import { defineComponent, ref, Ref, computed } from 'vue'
import { isObject } from 'lodash'
import { ElNotification } from 'element-plus'
import { postFileApi } from '@/utils/api/file'
import { isString } from 'lodash'
export default defineComponent({
  name: 'UploadSharedImage',
  emits: ['update:fileId', 'update:fileUrl', 'uploadSuccess'],

  props: {
    fileId: {
      type: String || undefined,
      default: () => undefined
    },
    fileUrl: {
      type: String || undefined,
      default: () => undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const bindFileIdValue: Ref<string | undefined> = computed({
      get: () => props.fileId,
      set: (value: string | undefined) => {
        emit('update:fileId', value)
      }
    })
    const bindFileUrlValue: Ref<string | undefined> = computed({
      get: () => props.fileUrl,
      set: (value: string | undefined) => {
        emit('update:fileUrl', value)
      }
    })
    const fileRef: Ref<HTMLInputElement | null> = ref(null)
    const handleClick = () => {
      if (isObject(fileRef.value)) {
        fileRef.value.click()
      }
    }

    // const isImageFileType = (fileType: string) => {
    //   const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
    //   return validFileTypes.includes(fileType)
    // }
    const isImageSizeCheck = (
      fileSize: number,
      limitSize = 1024 * 1024 * 5
    ) => {
      return limitSize < fileSize
    }
    const onFileChange = async ($event: Event) => {
      const target = $event.target as HTMLInputElement
      if (isObject(target.files)) {
        const fileItem = target.files[0]
        // if (!isImageFileType(fileItem.type)) {
        //   ElNotification({
        //     title: 'Warning',
        //     message: '瀏覽選擇特定圖檔 (PNG/JPG)',
        //     type: 'warning'
        //   })
        // }

        if (isImageSizeCheck(fileItem.size)) {
          ElNotification({
            title: 'Warning',
            message: '圖檔大小(5MB以下)',
            type: 'warning'
          })
        }
        const formData = new FormData()
        formData.append('file', target.files[0])
        // formData.append('fileName', target.files[0].name)

        const { file_id, url } = await postFileApi(formData)
        bindFileIdValue.value = file_id
        bindFileUrlValue.value = url
        emit('uploadSuccess')
      }
    }
    const handleDelete = () => {
      bindFileIdValue.value = undefined
      bindFileUrlValue.value = undefined
    }

    return {
      bindFileIdValue,
      bindFileUrlValue,
      fileRef,
      handleClick,
      onFileChange,
      handleDelete,
      isString
    }
  }
})
</script>
