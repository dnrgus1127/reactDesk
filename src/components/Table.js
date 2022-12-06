import React from "react";
import styled from "styled-components";

const Table = styled.tbody`
  .time {
    text-align: right;
    padding-top: 2px;
    padding-right: 3px;
    vertical-align: top;
    font-family: "LINESeedKR-Bd";
    color: rgb(128, 128, 128);
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

export default function RendTable(props) {
  /**
   * 인자로 받은 요일과 시간에 스케줄이 있으면 스케줄 HourItem반환, 없으면 null반환
   * @param {*} dayWeek 요일
   * @param {*} hour 시간
   * @returns
   */
  const isSchedule = (dayWeek, hour) => {
    const scheduleItemArr = props.scheduleArr;
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
          props.setInfoId(e.target.id);
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
  return <Table>{trList}</Table>;
}
