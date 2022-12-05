import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ScheduleItem from "../class/ScheduleItem";
import { HourSelector, MinSelector } from "./TimeSelector";
import plusLogo from "../assets/icon/iconmonstr-window-plus-lined.svg";

const Container = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  background-color: rgb(241, 241, 241);
  padding: 16px;
  border-top-right-radius: 12px;
`;

const ContentLayout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(10, 1fr);
  .main {
    grid-column: 1/10;
    grid-row: 1/11;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border: 1px solid lightgrey;
    border-bottom: none;
    background-color: white;
    position: relative;
    overflow: auto;
  }
  .main::-webkit-scrollbar {
    width: 10px;
  }
  .main::-webkit-scrollbar-thumb {
    background-color: #7f9592;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  .main::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
  .side {
    grid-column: 10/16;
    grid-row: 1/11;
    background-color: rgb(232, 232, 232);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
    border-top-right-radius: 12px;
    padding: 0px 4px;
  }
`;

const SideBtnCon = styled.div`
  display: flex;
  height: 36px;
  padding: 10px 8px;
  justify-content: end;
  .plusLogo {
    height: 28px;
  }
  .plusLogo:hover {
    scale: calc(1.1);
  }
`;

const Table = styled.table`
  width: 100%;
  height: 300%;
  border-collapse: collapse;

  th {
    color: rgb(128, 128, 128);
    border-bottom: 1px solid lightgrey;
  }
  td {
    border-bottom: 1px solid lightgrey;
    border-right: 1px solid lightgrey;
    position: relative;
  }
  .time {
    text-align: right;
    padding-top: 2px;
    padding-right: 3px;
    vertical-align: top;
    font-family: "LINESeedKR-Bd";
    color: rgb(128, 128, 128);
  }
`;
const ScheduleForm = styled.form`
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

const HourItem = styled.div`
  position: absolute;
  top: ${(props) => (props.top ? `calc(${props.top} * 16.666666666%)` : "0px")};
  left: 0px;
  width: 100%;
  padding: 8px 8px;
  box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.5);
  font-family: "LINESeedKR-Bd";
  height: ${(props) =>
    props.ros ? `calc(${props.ros} *100% + ${props.ros}px)` : "100%"};
  background-color: ${(props) => props.backgroundColor};
  color: white;
  z-index: 3;
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
const ScheduleList = styled.div`
  width: 100%;
  height: calc(100% - 84px - 48px);
  overflow: auto;
  padding: 0 12px;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #7f9592;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const ListItem = styled.div`
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

let emptySchedule = {
  id: 0,
  title: "",
  startTime: 0,
  endTime: 0,
  hourS: 0,
  minS: 0,
  hourE: 0,
  minE: 0,
  dayWeek: 0,
};

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
function ScheduleInfo(props) {
  const schedule = props.schedule;
  if (schedule === undefined) {
    return;
  }
  const day = ["월", "화", "수", "목", "금", "토", "일"];
  const contents = (
    <ListItem key={schedule.startTime} bg={"#3F3B6C"}>
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
    </ListItem>
  );
  return (
    <React.Fragment>{schedule.startTime > 0 ? contents : null}</React.Fragment>
  );
}

function rendList(arr, callback) {
  const day = ["월", "화", "수", "목", "금", "토", "일"];

  const list = arr.map((i) => {
    return (
      <ListItem
        key={i.startTime}
        onClick={() => {
          callback(i.startTime);
        }}
      >
        <div className="title-box">
          <p>[운동]</p>
          <h3>{i.title}</h3>
        </div>

        <div className="container-dayWeek">
          {day.map((j, idx) => (
            <div
              key={idx}
              className={
                idx === Math.trunc(i.startTime / 1000) - 1 ? "day" : null
              }
            >
              {day[idx]}
            </div>
          ))}
        </div>
        <p>
          일정 시작 :
          <span>
            {Math.trunc((i.startTime / 10) % 100)}시{" "}
            {Math.trunc(i.startTime % 10)}0분
          </span>
          일정 종료 :
          <span>
            {Math.trunc((i.endTime / 10) % 100)}시 {Math.trunc(i.endTime % 10)}
            0분
          </span>
        </p>
      </ListItem>
    );
  });
  return <React.Fragment>{list}</React.Fragment>;
}

export default function TimeTable() {
  const [newOn, setNewOn] = useState(false);
  const [scheduleItemArr, setscheduleItemArr] = useState([]);
  const [infoId, setInfoId] = useState(6063);

  useEffect(() => {
    fetch("http://localhost:8000/schedules")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const arr = [];
        data.map((i) => {
          const { id, title, startTime, endTime } = i;
          arr.push(new ScheduleItem(id, title, startTime, endTime));
          return null;
        });
        setscheduleItemArr(arr);
      });
  }, []);

  const getScheduleById = (id) => {
    let schedule;
    scheduleItemArr.map((i) => {
      if (i.startTime === Number(id)) {
        schedule = i;
      }
      return null;
    });
    return schedule;
  };
  /**
   * 인자로 받은 요일과 시간에 스케줄이 있으면 스케줄 HourItem반환, 없으면 null반환
   * @param {*} dayWeek 요일
   * @param {*} hour 시간
   * @returns
   */
  const isSchedule = (dayWeek, hour) => {
    let bool = false;
    const colors = [
      "#826Fa2",
      "#344D67",
      "#5F8D4E",
      "#FEBE8C",
      "#A9AF7E",
      "#E4EFE7",
    ];

    let arr = [];
    // 시간표 렌더링 중 요일과 시간에 맞는 스케줄이 있으면 HourItem 렌더링
    scheduleItemArr.map((item) => {
      if (item.dayWeek === dayWeek && item.startHour === hour) {
        bool = true;
        arr.push(item);
      }
      return null;
    });

    const rendItems = arr.map((i) => (
      <HourItem
        key={i.startTime}
        top={i.top}
        ros={i.span}
        backgroundColor={colors[(i.dayWeek + i.startHour) % 6]}
        onClick={(e) => {
          setInfoId(e.target.id);
        }}
        id={i.startTime}
      >
        {i.title}
      </HourItem>
    ));

    if (bool) {
      return <React.Fragment>{rendItems}</React.Fragment>;
    } else {
      return null;
    }
  };

  /**
   * 테이블 렌더링 (isSchedule호출하여 스케줄 있으면 렌더링)
   * @returns tbody 엘리먼트
   */
  const rendTable = () => {
    const hour = new Array(24);
    hour.fill(1);
    const day = new Array(7);
    day.fill(1);
    let tdList = <td className="time"></td>;
    tdList = (time) =>
      day.map((item, index) => (
        <td key={index}>{isSchedule(index + 1, time)}</td>
      ));

    let trList = hour.map((item, index) => (
      <tr key={index} className={`hour${index}`}>
        <td className="time">{index}</td>
        {tdList(index)}
      </tr>
    ));
    return <tbody>{trList}</tbody>;
  };

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
    <Container>
      <ContentLayout>
        <div className="main">
          <Table>
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
            {rendTable()}
          </Table>
        </div>
        <div className="side">
          {newOn ? (
            <ScheduleForm action="/" className="scheduleForm">
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
                <button
                  type="submit"
                  onClick={addSchedule}
                  className="btn-schedule "
                >
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
            </ScheduleForm>
          ) : (
            <SideBtnCon>
              <img
                className="plusLogo"
                onClick={() => {
                  setNewOn(true);
                }}
                style={{ cursor: "pointer" }}
                src={plusLogo}
                alt="123"
              ></img>
            </SideBtnCon>
          )}
          <ScheduleInfo schedule={getScheduleById(infoId)}></ScheduleInfo>
          <ScheduleList>
            <div className="wrap">{rendList(scheduleItemArr, setInfoId)}</div>
          </ScheduleList>
        </div>
      </ContentLayout>
    </Container>
  );
}
