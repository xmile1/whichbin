<script setup lang="ts">
import { onMounted } from "vue";
import { imageClassifier } from "@/@common/services/image-classifier";

onMounted(async () => {
  await imageClassifier.loadModel(window.location.origin + "/model.tflite");
});
</script>

<template>
  <router-view />
</template>
