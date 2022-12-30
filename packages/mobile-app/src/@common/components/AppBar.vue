<script setup lang="ts">
import { ref } from "vue";

defineProps<{ title: string }>();
</script>

<template>
  <section>
    <slot v-if="$slots.left" name="left" />
    <span v-else />
    <h2>{{ title }}</h2>
    <slot v-if="$slots.right" name="right" />
    <span v-else />
  </section>
</template>

<style scoped>
section {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  padding: 16px;
  display: grid;
  grid-template-columns: 32px 1fr 32px;
  place-items: center;
}
</style>
