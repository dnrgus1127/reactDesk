import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 8px 0px;
  border: 1px solid lightgrey;
  padding: 4px 8px;
  background-color: ${(props) => (props.bg ? props.bg : "white")};
  border-radius: 4px;
  font-family: "LINESeedKR-Bd";
  color: ${(props) => (props.bg ? "white" : "black")};

  .title-box {
    display: flex;
    justify-content: space-between;
    padding: 8px 0px;
    padding-right: 8px;
    font-size: 18px;
  }
  .title-box p {
    font-size: 16px;
    color: ${(props) => (props.bg ? "lightgreen" : "green")};
  }

  p {
    font-size: 12px;
    margin: 4px 8px;
  }
  .container-dayWeek {
    display: flex;
    color: grey;
    font-size: 12px;
  }
  .container-dayWeek div {
    margin: auto 8px;
  }
  .container-dayWeek .day {
    color: ${(props) => (props.bg ? "white" : "black")};
    font-size: 14px;
  }
  span {
    margin-right: 28px;
    margin-left: 2px;
    font-size: 16px;
  }

  &:hover {
    border: 1px solid #474e68;
  }
`;
export default function ListItem({ schedule, callback, bg }) {
  const day = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <Container
      onClick={() => {
        callback(schedule.startTime);
      }}
      bg={bg}
    >
      <div className="title-box">
        <p>[운동]</p>
        <h3>{schedule.title}</h3>
      </div>

      <div className="container-dayWeek">
        {day.map((j, idx) => (
          <div
            key={idx}
            className={
              idx === Math.trunc(schedule.startTime / 1000) - 1 ? "day" : null
            }
          >
            {day[idx]}
          </div>
        ))}
      </div>
      <p>
        일정 시작 :
        <span>
          {Math.trunc((schedule.startTime / 10) % 100)}시{" "}
          {Math.trunc(schedule.startTime % 10)}0분
        </span>
        일정 종료 :
        <span>
          {Math.trunc((schedule.endTime / 10) % 100)}시{" "}
          {Math.trunc(schedule.endTime % 10)}
          0분
        </span>
      </p>
    </Container>
  );
}
