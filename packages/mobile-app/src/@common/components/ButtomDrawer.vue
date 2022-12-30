<script setup lang="ts">
import { ref, reactive } from "vue";

const props = withDefaults(defineProps<{ initialHeight?: number }>(), {
  initialHeight: 20,
});

const height = ref(props.initialHeight);
const expandDrawer = (e: TouchEvent) => {
  height.value = window.innerHeight - e.changedTouches[0].clientY;
};
</script>

<template>
  <section
    draggable="true"
    :style="{ height: `${height}px` }"
    @touchmove="expandDrawer"
    id="buttom-drawer"
  >
    <slot />
  </section>
</template>

<style scoped>
#buttom-drawer {
  position: fixed;
  bottom: 0;
  z-index: 1;
  display: flex;
  width: 100%;
  place-content: center;
  padding: 16px;
  background-color: grey;
}

#buttom-drawer::after {
  content: "";
  background-color: #ccc;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 5px;
  cursor: ns-resize;
}
</style>
