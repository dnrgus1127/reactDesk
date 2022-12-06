import React from "react";

export default function ColgroupAndHead() {
  return (
    <React.Fragment>
      <colgroup>
        <col width="7%" />
        <col width="13.28%" />
        <col width="13.28%" />
        <col width="13.28%" />
        <col width="13.28%" />
        <col width="13.28%" />
        <col width="13.28%" />
        <col width="13.28%" />
      </colgroup>
      <thead>
        <tr>
          <th className="time"></th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
          <th>일</th>
        </tr>
      </thead>
    </React.Fragment>
  );
}
