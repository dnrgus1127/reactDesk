import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ScheduleItem from "../class/ScheduleItem";
import plusLogo from "../assets/icon/iconmonstr-window-plus-lined.svg";
import RendTable from "./Table";
import ScheduleForm from "./ScheduleForm";
import ColgroupAndHead from "./ColgroupAndHead";
import ListItem from "./ListItem";

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

function ScheduleInfo(props) {
  const schedule = props.schedule;
  if (schedule === undefined) {
    return;
  }
  const contents = <ListItem bg={"#3F3B6C"} schedule={schedule}></ListItem>;
  return (
    <React.Fragment>{schedule.startTime > 0 ? contents : null}</React.Fragment>
  );
}

function rendList(arr, callback) {
  const list = arr.map((i) => {
    return (
      <ListItem key={i.startTime} schedule={i} callback={callback}></ListItem>
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

  return (
    <Container>
      <ContentLayout>
        <div className="main">
          <Table>
            <ColgroupAndHead></ColgroupAndHead>
            <RendTable
              scheduleArr={scheduleItemArr}
              setInfoId={setInfoId}
            ></RendTable>
          </Table>
        </div>
        <div className="side">
          {newOn ? (
            <ScheduleForm
              emptySchedule={emptySchedule}
              setscheduleItemArr={setscheduleItemArr}
              scheduleItemArr={scheduleItemArr}
              setNewOn={setNewOn}
            ></ScheduleForm>
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
