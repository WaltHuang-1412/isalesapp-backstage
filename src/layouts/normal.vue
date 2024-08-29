<template lang="pug">
.layout-normal
  slot
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LayoutNormal'
})
</script>
<style lang="scss">
.layout-normal {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
</style>
