import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./ImageView.css";
import "./ImageViewBig.css";
import heart from "../images/heart.svg";
import heartDisabled from "../images/heart-disabled.svg";
import ImagePreview from "./ImagePreview";

const ImageView = forwardRef(function ImageView(props, forwardedRef) {
  const [previewState, setPreviewState] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  function onImageClicked() {
    setPreviewState(true);
    props.setHeaderVisibility(false);
  }
  function onPreviewFinished() {
    setPreviewState(false);
    props.setHeaderVisibility(true);

    searchParams.delete("id");
    setSearchParams(searchParams);
  }

  function onLikeClicked() {
    if (props.like) props.onUnlike(props.id);
    else props.onLike(props.id);
  }

  function onReportClicked() {
    // 이거 안 하면 헤더 없어짐
    props.setHeaderVisibility(true);

    navigate(`/report?id=${props.id}`);
  }

  return (
    <div
      className={props.big ? "imageview-big" : "imageview"}
      ref={forwardedRef}
    >
      <button className="thumbnail" onClick={onImageClicked}>
        <img src={props.src} alt="몬스터 이미지" />
      </button>
      <div className="rightbox">
        <div className="title">{props.title}</div>
        <div className="content">{props.content}</div>

        <div className="margin" />

        <button
          className={props.like ? "" : "disabled"}
          onClick={onLikeClicked}
        >
          {props.like ? "좋아해요!" : "좋아요"}
        </button>
      </div>

      <button className="floatbox" onClick={onLikeClicked}>
        <img src={props.like ? heart : heartDisabled} alt="좋아요" />
        <div>+{props.hearts}</div>
      </button>

      {previewState && (
        <ImagePreview
          id={props.id}
          title={props.title}
          content={props.content}
          onFinish={onPreviewFinished}
          src={props.src} /* 썸네일 이미지 */
          like={props.like}
          hearts={props.hearts}
          onClick={onReportClicked}
        />
      )}
    </div>
  );
});

ImageView.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  hearts: PropTypes.number.isRequired,
  like: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired,
  big: PropTypes.bool,
  setHeaderVisibility: PropTypes.func.isRequired,
};

export default ImageView;
