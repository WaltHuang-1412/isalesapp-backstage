<style lang="scss">
.upload-image {
  &__input {
    display: none;
  }
}
</style>

<template lang="pug">
.upload-image
  template(v-if="!disabled")
    template(v-if="isString(bindImageUrlValue)")
      el-button(@click="handleDelete") 刪除圖片
    template(v-else)
      el-button(@click="handleClick") 上傳圖片
  el-image(:src="bindImageUrlValue" style="width: 100px; height: 100px; display:block; margin-top:5px;")
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
  emits: ['update:imageId', 'update:imageUrl', 'uploadSuccess'],

  props: {
    imageId: {
      type: String || undefined,
      default: () => undefined
    },
    imageUrl: {
      type: String || undefined,
      default: () => undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const bindImageIdValue: Ref<string | undefined> = computed({
      get: () => props.imageId,
      set: (value: string | undefined) => {
        emit('update:imageId', value)
      }
    })
    const bindImageUrlValue: Ref<string | undefined> = computed({
      get: () => props.imageUrl,
      set: (value: string | undefined) => {
        emit('update:imageUrl', value)
      }
    })
    const fileRef: Ref<HTMLInputElement | null> = ref(null)
    const handleClick = () => {
      if (isObject(fileRef.value)) {
        fileRef.value.click()
      }
    }

    const isImageFileType = (fileType: string) => {
      const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
      return validFileTypes.includes(fileType)
    }
    const isImageSizeCheck = (
      fileSize: number,
      limitSize = 1024 * 1024 * 5
    ) => {
      return limitSize < fileSize
    }
    const onFileChange = async ($event: Event) => {
      const target = $event.target as HTMLInputElement
      if (isObject(target.files) && isObject(target.files[0])) {
        const fileItem = target.files[0]
        console.log('fileItem :>> ', fileItem)
        if (!isImageFileType(fileItem.type)) {
          ElNotification({
            title: 'Warning',
            message: '瀏覽選擇特定圖檔 (PNG/JPG)',
            type: 'warning'
          })
        }

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

        bindImageIdValue.value = file_id
        bindImageUrlValue.value = url
        emit('uploadSuccess')
      }
    }
    const handleDelete = () => {
      bindImageIdValue.value = undefined
      bindImageUrlValue.value = undefined
    }
    // const initialization = async () => {
    //   console.log('bindValue.value :>> ', bindValue.value)
    //   if (isString(bindValue.value)) {
    //     const { url }: IGetFileStreamFileResponse = await getFileStreamFileApi({
    //       fileId: bindValue.value
    //     })
    //     imageUrl.value = url
    //   }
    // }

    // initialization()
    return {
      bindImageIdValue,
      bindImageUrlValue,
      fileRef,
      handleClick,
      onFileChange,
      handleDelete,
      isString
    }
  }
})
</script>
