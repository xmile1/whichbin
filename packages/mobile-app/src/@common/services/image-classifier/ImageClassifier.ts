import * as automl from "@tensorflow/tfjs-automl";
import "@tensorflow/tfjs-backend-webgl";

class ImageClassifier {
  model: automl.ObjectDetectionModel;

  constructor() {
    this.model = null as any;
  }

  async loadModel(modelUrl: string) {
    this.model = await automl.loadObjectDetection(modelUrl);
  }

  async classify(image: any) {
    const predictions = await this.model.detect(image);
    return predictions;
  }
}

export const imageClassifier = new ImageClassifier();
