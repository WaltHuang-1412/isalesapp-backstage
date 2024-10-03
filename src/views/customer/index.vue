<style lang="scss">
.customer {
  width: 100%;
  height: 100%;
}
</style>
<template>
  <div class="member">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Member',
  setup() {
    return {}
  }
})
</script>
