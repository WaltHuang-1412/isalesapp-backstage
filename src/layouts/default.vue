<template lang="pug">
.layout-default
  .layout-default__menu
    TheMenu
  .layout-default__header
    TheHeader
  .layout-default__content
    slot
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import TheMenu from '@/components/common/menu/index.vue'
import TheHeader from '@/components/common/header/index.vue'
export default defineComponent({
  name: 'LayoutDefault',
  components: {
    TheMenu,
    TheHeader
  },
  setup() {
    return {}
  }
})
</script>
<style lang="scss">
.layout-default {
  display: grid;
  width: 100%;
  height: 100%;
  grid-auto-columns: 200px 1fr;
  grid-auto-rows: 60px 1fr;
  grid-template-areas: 'menu header' 'menu content';
  // @include RWD-below($laptop) {
  //   grid-auto-rows: 48px 1fr;
  // }

  &__menu {
    grid-area: menu;
    border-right: 1px solid lightgray;
  }

  &__header {
    grid-area: header;
    box-shadow: 0px 12px 26px rgba(135, 146, 173, 0.12);
  }
  &__content {
    grid-area: content;
    overflow-y: scroll;
  }
}
</style>
