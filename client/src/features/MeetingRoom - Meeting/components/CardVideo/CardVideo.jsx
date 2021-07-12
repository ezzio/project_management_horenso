import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./CardVideo.scss";
import { openStream } from "features/MeetingRoom - Meeting/MeetingRoom";
const CardVideo = (props) => {
  const { owner } = props;
  const videoEl = useRef(null);
  useEffect(() => {
    if (!videoEl) {
      return;
    }
    openStream(videoEl);
  }, [videoEl]);
  return (
    <video className="camera" ref={videoEl}>
      <p>{owner.name}</p>
    </video>
  );
};

CardVideo.propTypes = {
  owner: PropTypes.object,
};

export default CardVideo;
