export const openStream = (videoEl) => {
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    let video = videoEl.current;
    video.srcObject = stream;
    video.play();
  });
};
