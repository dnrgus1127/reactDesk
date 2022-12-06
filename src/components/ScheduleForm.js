import React from "react";
import styled from "styled-components";
import ScheduleItem from "../class/ScheduleItem";

import { HourSelector, MinSelector } from "./TimeSelector";

const Container = styled.form`
  padding: 4px;
  p {
    margin-top: 12px;
    margin-bottom: 4px;

    font-family: "LINESeedKR-Bd";
    color: #474e68;
  }
  input,
  select {
    outline: none;
    border: 1px solid lightgrey;
    border-radius: 4px;
    font-family: inherit;
  }
  input {
    width: 100%;
    height: 24px;
    padding: 4px 8px;
  }
  input:hover,
  input:focus,
  select:hover,
  select:focus {
    border: 1px solid #009eff;
  }
  select {
    width: 100%;
    margin-bottom: 4px;
    appearance: none;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    font-weight: 550;
    padding: 4px 8px;
  }
  .conBtn {
    display: flex;
    justify-content: space-between;
  }
  button {
    width: 40%;
    font-family: inherit;
    margin: 20px auto;
    background-color: #474e68;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.4em 0.5em;
  }

  .cancle {
    background-color: white;
    color: #474e68;
    border: 1px solid #474e68;
  }
`;

const TimeSelector = styled.div`
  select {
    width: 50%;
    appearance: none;
    outline: none;
    border: 1px solid lightgrey;
    border-radius: 4px;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    font-weight: 550;
    padding: 4px 8px;
  }

  select::-webkit-scrollbar {
    width: 7px;
  }
  select::-webkit-scrollbar-thumb {
    background-color: #009eff;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  select::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;
function postSchedule(title, startTime, endTime) {
  fetch("http://localhost:8000/schedules", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      startTime: startTime,
      endTime: endTime,
    }),
    headers: { "Content-Type": "application/json" },
  });
}
export default function ScheduleForm({
  emptySchedule,
  setscheduleItemArr,
  setNewOn,
  scheduleItemArr,
}) {
  function addSchedule(evt) {
    evt.preventDefault();
    emptySchedule.startTime =
      emptySchedule.minS + emptySchedule.hourS + emptySchedule.dayWeek;
    emptySchedule.endTime =
      emptySchedule.minE + emptySchedule.hourE + emptySchedule.dayWeek;
    var { id, title, startTime, endTime } = emptySchedule;
    setscheduleItemArr([
      new ScheduleItem(id, title, startTime, endTime),
      ...scheduleItemArr,
    ]);
    setNewOn(false);
    postSchedule(title, startTime, endTime);
  }
  return (
    <Container action="/" className="scheduleForm">
      <p>일정 이름</p>
      <input
        type="text"
        name="text"
        onChange={(e) => {
          emptySchedule.title = e.target.value;
        }}
      />
      <p>시간</p>
      <TimeSelector>
        <select
          name=""
          id=""
          onChange={(e) => {
            emptySchedule.hourS = Number(e.target.value) * 10;
          }}
        >
          <HourSelector></HourSelector>
        </select>
        <select
          name=""
          id=""
          onChange={(e) => {
            emptySchedule.minS += Number(e.target.value);
          }}
        >
          <MinSelector></MinSelector>
        </select>
      </TimeSelector>
      <TimeSelector>
        <select
          name=""
          id=""
          onChange={(e) => {
            emptySchedule.hourE = Number(e.target.value) * 10;
          }}
        >
          <HourSelector></HourSelector>
        </select>
        <select
          name=""
          id=""
          onChange={(e) => {
            emptySchedule.minE = Number(e.target.value);
          }}
        >
          <MinSelector></MinSelector>
        </select>
      </TimeSelector>
      <p>요일</p>
      <select
        name="dayWeek"
        id=""
        onChange={(e) => {
          emptySchedule.dayWeek = Number(e.target.value) * 1000;
        }}
      >
        <option value="1">월</option>
        <option value="2">화</option>
        <option value="3">수</option>
        <option value="4">목</option>
        <option value="5">금</option>
        <option value="6">토</option>
        <option value="7">일</option>
      </select>
      <div className="conBtn">
        <button type="submit" onClick={addSchedule} className="btn-schedule ">
          생성
        </button>
        <button
          className="cancle"
          onClick={() => {
            setNewOn(false);
          }}
        >
          취소
        </button>
      </div>
    </Container>
  );
}
