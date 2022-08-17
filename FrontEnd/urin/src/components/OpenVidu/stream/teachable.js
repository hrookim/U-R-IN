const teachable = async (videoRef, model) => {
  const { pose, posenetOutput } = await model.estimatePose(videoRef.current);

  const prediction = await model.predictTopK(posenetOutput, 1);
  return prediction[0];
};

export default teachable;
