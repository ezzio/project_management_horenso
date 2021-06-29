import React, { Component } from "react";
import styled, { css } from "styled-components";

function SignUpFullnameTextbox(props) {
  return (
    <Container {...props}>
      <JohnSmith>John Smith</JohnSmith>
      <InputStyle></InputStyle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #D9D5DC;
  background-color: transparent;
  flex-direction: row;
  padding-left: 16px;
`;

const JohnSmith = styled.span`
  font-family: Roboto;
  font-size: 16px;
  line-height: 16px;
  padding-top: 16px;
  padding-bottom: 8px;
  color: #000;
  opacity: 0.5;
  align-self: flex-start;
`;

const InputStyle = styled.input`
  font-family: Roboto;
  color: #000;
  padding-right: 5px;
  font-size: 16px;
  align-self: stretch;
  flex: 1 1 0%;
  line-height: 16px;
  padding-top: 14px;
  padding-bottom: 8px;
  padding-left: 30px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
`;

export default SignUpFullnameTextbox;
