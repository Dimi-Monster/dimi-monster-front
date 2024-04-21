import React from "react";
import PropTypes from "prop-types";
import "./UploadPopup.css";
import MiniButton from "./MiniButton";

import dimibug from "../images/dimibug.svg";

export default function UploadPopup({ onFinish, onCancel }) {
  return (
    <div className="upload-popup-outer-box" onClick={onCancel}>
      <div className="upload-popup">
        <div className="title">
          <img className="dimibug" src={dimibug} />
          업로드가 제한되는 이미지
        </div>

        <ol>
          <li>
            상호 <em>동의 없이 촬영</em>된 이미지
          </li>
          <li>
            <em>비방 및 비하의 의미</em>가 담긴 이미지
          </li>
          <li>
            <em>위협 및 혐오감</em>을 줄 수 있는 이미지
          </li>
          <li>
            <em>교칙 및 법령에 위배</em>되는 이미지
          </li>
        </ol>

        <div className="bottom-left">
          운영팀의 판단에 따라 규정에 위배되는
          <br />
          이미지 업로드 시 서비스에서 영구 차단될 수 있습니다.
        </div>

        <div className="bottom-right">
          <MiniButton src={dimibug} buttonTitle="확인" onClick={onFinish} />
        </div>
      </div>
    </div>
  );
}

UploadPopup.propTypes = {
  onFinish: PropTypes.func.isRequired,
};
