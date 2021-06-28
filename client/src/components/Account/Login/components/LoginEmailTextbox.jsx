import React, { Component } from "react";
import styled, { css } from "styled-components";

function LoginEmailTextbox(props) {
  return (
    <Container {...props}>
      <TextInput placeholder="Enter your email"></TextInput>
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

const TextInput = styled.input`
  font-family: Roboto;
  font-size: 16px;
  line-height: 16px;
  padding-top: 16px;
  padding-bottom: 8px;
  color: #000;
  opacity: 0.5;
  align-self: flex-start;
  width: 121px;
  height: 40px;
  border: none;
  background: transparent;
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

export default LoginEmailTextbox;
