import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #474e68;
  border-top-right-radius: 24px;

  box-shadow: 0px 0px 5px rgba(128, 128, 128, 1);
`;

class Sidebar extends Component {
  render() {
    return <Container></Container>;
  }
}

export default Sidebar;
