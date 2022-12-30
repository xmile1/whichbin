import { imageClassifier } from "@/@common/services/image-classifier";
import { defineStore } from "pinia";

export const useTrashIdentifierStore = defineStore("trashIdentifier", {
  state: () => ({
    prediction: "",
    isPhotoTaken: false,
  }),

  actions: {
    async predict(image: any) {
      const prediction = await imageClassifier.classify(image);
      this.prediction = prediction;
    },
  },
});
