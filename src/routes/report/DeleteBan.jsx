import React from "react";
import { useParams } from "react-router-dom";

export default function ReportDeleteBan() {
  const { id } = useParams();
  return (
    <>
      <h1>신고 대상 이미지 삭제 및 업로더 차단 처리</h1>
      <p>신고 ID: {id}</p>
      <br />
      <textarea placeholder="처리 사유" />
      <button>삭제 및 차단 처리</button>
    </>
  );
}
