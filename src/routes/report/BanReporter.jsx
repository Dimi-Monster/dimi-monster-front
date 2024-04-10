import React from "react";
import { useParams } from "react-router-dom";

export default function BanReporter() {
  const { id } = useParams();
  return (
    <>
      <h1>신고 취하 및 신고자 차단 처리</h1>
      <p>신고 ID: {id}</p>
      <br />
      <textarea placeholder="처리 사유" />
      <button>취하 및 차단 처리</button>
    </>
  );
}
