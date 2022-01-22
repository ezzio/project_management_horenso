import React from "react";

export const setSizeVideoFitDiv = () => {
  let audiences = document.querySelector(
    ".videocall__container-video__audiences"
  );
  let numberOfVideoCard = document.querySelectorAll(".camera").length;
  let widthAudiences = audiences.offsetWidth;

  let minWidth = "30%";
  if ((widthAudiences * 30) / 100 < 300) {
    minWidth = "445px";
    audiences.style.alignContent = "normal";
  }

  let minHeight = "40%";
  let height = String(100 / numberOfVideoCard) + "%";
  let width = "";
  if (numberOfVideoCard === 0 || numberOfVideoCard === 1) {
    width = "80%";
    height = "95%";
  } else if (numberOfVideoCard === 2) {
    width = "47%";
    height = "95%";
  } else if (numberOfVideoCard === 3 || numberOfVideoCard === 4) {
    width = "45%";
    height = "45%";
  } else {
    width = String(100 / numberOfVideoCard) + "%";
  }

  let videos = audiences.querySelectorAll(".camera");
  for (let a = 0; a < videos.length; ++a) {
    videos[a].style.minWidth = minWidth;
    videos[a].style.minHeight = minHeight;
    videos[a].style.setProperty("width", width);
    videos[a].style.setProperty("height", height);
  }
};
