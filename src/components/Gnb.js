import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 80px;
  padding: 0 40px;
  padding-top: 40px;
`;

const NavBar = styled.ul`
  list-style: none;
  display: flex;
  height: 30px;

  li {
    font-size: 16px;
    margin-right: 16px;
    line-height: 30px;
    font-family: "LINESeedKR-Bd";
    color: rgba(128, 128, 128, 0.9);
  }
  .selected {
    color: #474e68;
  }
`;

export default class Gnb extends Component {
  render() {
    return (
      <Container>
        <NavBar>
          <li className="selected">메인</li>
          <li>시간표</li>
          <li>식단</li>
          <li>헬스</li>
        </NavBar>
      </Container>
    );
  }
}
