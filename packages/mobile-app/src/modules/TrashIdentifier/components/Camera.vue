<script setup lang="ts">
import { imageClassifier } from "@/@common/services/image-classifier";
import { nextTick, onMounted, reactive, ref } from "vue";

const state = reactive({
  isPhotoTaken: false,
  cameraSize: {
    width: 0,
    height: 0,
  },
  predictions: [] as any,
});

onMounted(async () => {
  let video = document.querySelector("#video") as any;

  const devices = await navigator.mediaDevices.enumerateDevices();

  let stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "environment",
    },
    audio: false,
  });

  video.srcObject = stream;
});

const onImageCapture = async () => {
  let camera = document.querySelector("#camera-feed") as any;

  state.cameraSize.width = camera.clientWidth;
  state.cameraSize.height = camera.clientHeight;
  console.log("video", camera.clientWidth, camera.clientHeight);
  await nextTick();
  state.isPhotoTaken = true;
  let canvas = document.querySelector("#canvas") as any;
  let video = document.querySelector("#video") as any;

  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

  state.predictions = await imageClassifier.classify(canvas);
  console.log("predictions", state.predictions);
};
</script>

<template>
  <div>{{ state.predictions }}dddd</div>
  <canvas
    :width="state.cameraSize.width"
    :height="state.cameraSize.height"
    v-show="state.isPhotoTaken"
    id="canvas"
  ></canvas>
  <div id="camera-feed" v-show="!state.isPhotoTaken">
    <video ref="camera" id="video" autoplay></video>

    <v-btn @click="onImageCapture" class="mx-2" fab dark color="indigo">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
#video {
  width: 100vw;
}

canvas {
  /* width: 100vw; */
  /* height: 100vh; */
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
