import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../../utils/API";
import { toast } from "react-toastify";

export default function ReportDeleteBan() {
  const { id } = useParams();
  const [searchParams /*, setSearchParams*/] = useSearchParams();
  const [reason, setReason] = useState('');

  function onClick() {
    api.processReport({
      id: id,
      process: 'deleteban',
      reason: reason,
      secret: searchParams.get('key')
    }).then((isSuccess) => {
      if(isSuccess)
        toast.success('신고 처리에 성공했습니다.');
      else
        toast.error(`신고 처리에 실패했습니다. 오류 코드: ${api.getLastError()}`)
    })
  }

  function onReasonChanged(e) {
    setReason(e.target.value);
  }
  return (
    <>
      <h1>신고 대상 이미지 삭제 및 업로더 차단 처리</h1>
      <p>신고 ID: {id}</p>
      <br />
      <textarea placeholder="처리 사유" value={reason} onChange={onReasonChanged}/>
      <button onClick={onClick}>삭제 및 차단 처리</button>
    </>
  );
}
