// https://storage.googleapis.com/tfweb/demos/cartoonizer/tfweb_cc_simd.wasm
// import "@tensorflow/tfjs-backend-webgl";
// import * as tflite from "@tensorflow/tfjs-tflite";
// import "@tensorflow/tfjs-core";
class ImageClassifier {
  model: any;

  constructor() {
    this.model = null as any;
  }

  async loadModel(modelUrl: string) {
    // this.model = await automl.loadImageClassification(
    //   "https://127.0.0.1:5173/model.tflite"
    // );
    console.log("aa");
    this.model = await tflite.loadTFLiteModel(modelUrl);
  }

  async classify(image: any) {
    const DIV_FACTOR = 127.5;
    const SUB_FACTOR = 1;
    const img = tf.browser.fromPixels(image);
    // const [height, width] = [img.shape[1], img.shape[2]];
    // const offset = tf.scalar(255.0);
    // const normalized = tf.div(img, offset);
    // console.log(tf.expandDims(img), "aasad", tf.div(tf.expandDims(img), 15.5));

    console.log("img", img);
    let [modelWidth, modelHeight] = this.model.inputs[0].shape.slice(1, 3);
    // console.log(
    //   "modelWidth",
    //   modelWidth,
    //   "modelHeight",
    //   tf.expandDims(normalized)
    // );
    const items_indices: Record<number, string> = {
      0: "battery",
      1: "biological",
      2: "brown-glass",
      3: "cardboard",
      4: "clothes",
      5: "green-glass",
      6: "metal",
      7: "paper",
      8: "plastic",
      9: "shoes",
      10: "trash",
      11: "white-glass",
    };
    const croppedImg = tf.image.resizeBilinear(img, [modelWidth, modelHeight]);

    let input = tf.expandDims(croppedImg, 0);

    // convert image

    // const input = tf.tidy(() => {
    //   // // const a = tf.image.resizeBilinear(img, [modelWidth, modelHeight], true);
    //   // // resize to 1, 3, 640, 640
    //   // const boxes = [0, 1, 1, 0];
    //   // const b = tf.image.cropAndResize(normalized, boxes, [0], [640, 640]);
    //   // const b = tf.div(a, 255.0);

    //   // change tensor from [3,640,3] [3, 640, 640]
    //   return b;

    //   // return b;
    // });
    // const input = tf.sub(tf.div(tf.expandDims(img), 2), 2);
    console.log("input", input, this.model.inputs[0]);
    // Run inference and get output tensors.
    let outputTensor = this.model.predict(input) as tf.Tensor;
    const output = outputTensor.dataSync();
    const preds = output;
    const key = Math.round(preds * 10);
    const predsMax = await tf.argMax(output).data();

    // console.log("max", tf.maximum(Array.from(d), 0));
    // this.buildDetectedObjects(width, height);

    // const predictions = await this.model.detect(image);
    // return outputTensor.dataSync();
    return items_indices[predsMax[0]];
  }
  buildDetectedObjects(
    width: number,
    height: number,
    boxes: Float32Array,
    boxScores: number[],
    boxLabels: number[],
    selectedBoxes: Int32Array,
    dictionary: string[]
  ): any {
    const objects: any = [];
    // Each 2d rectangle is fully described with 4 coordinates.
    const numBoxCoords = 4;
    for (let i = 0; i < selectedBoxes.length; i++) {
      const boxIndex = selectedBoxes[i];
      const [top, left, bottom, right] = Array.from(
        boxes.slice(
          boxIndex * numBoxCoords,
          boxIndex * numBoxCoords + numBoxCoords
        )
      );
      objects.push({
        box: {
          left: left * width,
          top: top * height,
          width: (right - left) * width,
          height: (bottom - top) * height,
        },
        label: dictionary[boxLabels[boxIndex]],
        score: boxScores[boxIndex],
      });
    }
    return objects;
  }
}

export const imageClassifier = new ImageClassifier();
