<style lang="scss">
.order {
  width: 100%;
  height: 100%;
}
</style>
<template>
  <div class="order">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Order',
  setup() {
    return {}
  }
})
</script>
