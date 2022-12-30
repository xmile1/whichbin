<script setup lang="ts">
import Camera from "../components/Camera.vue";
import { AppBar, ButtomDrawer } from "@/@common/components";
import TrashPredictionDetails from "../components/TrashPredictionDetails.vue";
import { useTrashIdentifierStore } from "../store";
import arrowLeft from "@/assets/icons/arrow-left.svg";

const store = useTrashIdentifierStore();

const goBack = () => {
  store.isPhotoTaken = false;
};
</script>

<template>
  <app-bar title="Which Bin">
    <template v-if="store.isPhotoTaken" #left>
      <img height="32" :src="arrowLeft" alt="arrow-left" @click="goBack" />
    </template>
  </app-bar>
  <camera></camera>
  <buttom-drawer v-if="store.isPhotoTaken">
    <trash-prediction-details />
  </buttom-drawer>
</template>
