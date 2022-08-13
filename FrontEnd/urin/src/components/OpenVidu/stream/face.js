/* eslint-disable no-undef */
import * as faceapi from "face-api.js";
import "@tensorflow/tfjs-core";

const MODEL_URL = "/models";

const face = async (videoRef) => {
  await faceapi.nets.ssdMobilenetv1.load(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.load(MODEL_URL);
  await faceapi.nets.faceExpressionNet.load(MODEL_URL);
  await faceapi.nets.tinyFaceDetector.load(MODEL_URL);

  const result = await faceapi
    .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
    .withFaceExpressions();
  console.log(result.expressions);
};

export default face;
