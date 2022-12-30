<script setup lang="ts">
import { imageClassifier } from "@/@common/services/image-classifier";
import { nextTick, onMounted, reactive, ref } from "vue";
import { useTrashIdentifierStore } from "../store";

const store = useTrashIdentifierStore();

const state = reactive({
  isPhotoTaken: false,
  cameraSize: {
    width: 0,
    height: 0,
  },
  predictions: "None" as any,
});

onMounted(async () => {
  let video = document.querySelector("#video") as any;

  let stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "environment",
      width: { min: 1024, ideal: 1280, max: 1920 },
      height: { min: 576, ideal: 720, max: 1080 },
    },
    audio: false,
  });

  video.srcObject = stream;
});

const onImageCapture = async () => {
  store.isPhotoTaken = true;
  let camera = document.querySelector("#camera-feed") as any;

  state.cameraSize.width = camera.clientWidth;
  state.cameraSize.height = camera.clientHeight;
  await nextTick();
  let canvas = document.querySelector("#canvas") as any;
  let video = document.querySelector("#video") as any;

  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  store.predict(canvas);
};
</script>

<template>
  <canvas
    :width="state.cameraSize.width"
    :height="state.cameraSize.height"
    v-show="store.isPhotoTaken"
    id="canvas"
  ></canvas>
  <div id="camera-feed" v-show="!store.isPhotoTaken">
    <video ref="camera" id="video" autoplay></video>

    <v-btn @click="onImageCapture" class="mx-2" fab dark color="indigo">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
#video {
  width: 100vw;
  overflow: hidden;
}

button {
  position: absolute;
  bottom: 20px;
}

#camera-feed {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
}
</style>
