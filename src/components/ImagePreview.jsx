import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./ImagePreview.css";
import "./animation.css";
import x from "../images/x.svg";
import imageManager from "../utils/ImageManager";
import { useSearchParams } from "react-router-dom";

//import heart from '../images/heart.svg';
//import heartDisabled from '../images/heart-disabled.svg';

import loadingCircle from "../images/loading-png.png";
import BottomBar from "./BottomBar";

import dimibug from "../images/dimibug.svg";

export default function ImagePreview(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [imageUrl, setImageUrl] = useState(props.src); // 기본값은 썸네일

  const [loaded, setLoadedState] = useState(false);

  useEffect(() => {
    // 고화질 이미지 불러오기
    imageManager.getOriginalImage(props.id).then((img) => {
      setImageUrl(img);
      setLoadedState(true);
    });

    if (!searchParams.has("id"))
      setSearchParams({ ...searchParams, id: props.id });
  }, []);

  return (
    <div className="image-preview-box" onClick={onClose}>
      <div
        className="image-preview"
        onClick={onInnerBoxClicked}
        onDoubleClick={onInnerBoxClicked}
      >
        <img className="main-img" src={imageUrl} alt="몬스터 확대 이미지" />

        <BottomBar
          title={props.title}
          content={props.content}
          src={dimibug}
          buttonTitle={`신고`}
          onClick={props.onClick}
        />

        <button className="close" onClick={onClose}>
          <img src={x} alt="종료 버튼" />
        </button>
        {!loaded && (
          <img className="loading" src={loadingCircle} alt="로딩 중.." />
        )}
      </div>
    </div>
  );

  function onInnerBoxClicked(event) {
    event.stopPropagation();
  }

  function onClose() {
    props.onFinish();
  }
}

ImagePreview.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
};
