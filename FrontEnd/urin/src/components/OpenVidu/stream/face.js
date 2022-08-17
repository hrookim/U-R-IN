/* eslint-disable no-undef */
import * as faceapi from "face-api.js";
import "@tensorflow/tfjs-core";

const MODEL_URL = "/models";

const face = async (videoRef) => {
  // TODO: 나아아아중에? ㅋㅋㅋㅋㅋㅋㅋㅋㅋ 지금은 굴러가니까... 헿 우선은 따로 빼놓을 수도 잇을듯
  await faceapi.nets.ssdMobilenetv1.load(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.load(MODEL_URL);
  await faceapi.nets.faceExpressionNet.load(MODEL_URL);
  await faceapi.nets.tinyFaceDetector.load(MODEL_URL);

  const result = await faceapi
    .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
    .withFaceExpressions();

  if (result) {
    const fixedExpressions = result.expressions;
    const keys = Object.keys(result.expressions);
    for (let i = 0; i < keys.length; i += 1) {
      const k = keys[i];
      const v = fixedExpressions[k].toFixed(2);
      fixedExpressions[k] = v;
    }
    return fixedExpressions;
  }
  return null;
};

export default face;
