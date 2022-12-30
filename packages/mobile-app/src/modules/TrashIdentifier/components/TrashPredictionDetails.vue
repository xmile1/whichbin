<script setup lang="ts">
import { onMounted } from "vue";
import { useTrashIdentifierStore } from "../store";
const store = useTrashIdentifierStore();
</script>

<template>
  <div>
    {{ store.prediction }}
  </div>
</template>

<style scoped></style>
