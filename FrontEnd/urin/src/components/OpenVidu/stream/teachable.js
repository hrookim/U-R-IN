const teachable = async (videoRef, model) => {
  const { pose, posenetOutput } = await model.estimatePose(videoRef.current);

  const prediction = await model.predictTopK(posenetOutput, 1);
  console.log(prediction);
};

export default teachable;
