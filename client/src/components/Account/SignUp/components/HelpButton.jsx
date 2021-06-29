import React, { Component } from "react";
import styled, { css } from "styled-components";
import MaterialCommunityIconsIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";

function HelpButton(props) {
  return (
    <Container {...props}>
      <MaterialCommunityIconsIcon
        name="comment-question"
        style={{
          color: "#fff",
          fontSize: 24
        }}
      ></MaterialCommunityIconsIcon>
      <Help>Help</Help>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #3F51B5;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  border-radius: 2px;
  position: relative;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

const Help = styled.span`
  font-family: Roboto;
  top: 30px;
  left: 14px;
  position: absolute;
  font-style: normal;
  font-weight: 700;
  color: rgba(255,255,255,1);
  font-size: 16px;
`;

export default HelpButton;
