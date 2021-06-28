import React, { Component } from "react";
import styled, { css } from "styled-components";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import HelpButton from "./components/HelpButton";
import LoginSignUpButton from "./components/LoginSignUpButton";

function ForgotPasswordScreenPc(props) {
  return (
    <Container>
      <MaterialCardWithoutImageRow>
        <ForgotPasswordForm
          style={{
            height: 300,
            width: 500
          }}
        ></ForgotPasswordForm>
        <HelpButton
          style={{
            height: 60,
            width: 60,
            marginLeft: 11,
            marginTop: 239
          }}
        ></HelpButton>
      </MaterialCardWithoutImageRow>
      <TextInput1 placeholder="This is the slogan"></TextInput1>
      <LoremIpsum1Row>
        <LoremIpsum1>Don&#39;t have an account?</LoremIpsum1>
        <LoginSignUpButton
          style={{
            height: 36,
            width: 100
          }}
        ></LoginSignUpButton>
      </LoremIpsum1Row>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(74,144,226,1);
  border-width: 100px;
  border-color: rgba(255,255,255,1);
  flex-direction: column;
  border-style: solid;
  height: 100vh;
  width: 100vw;
`;

const MaterialCardWithoutImageRow = styled.div`
  height: 300px;
  flex-direction: row;
  display: flex;
  margin-top: 134px;
  margin-left: 333px;
  margin-right: 462px;
`;

const TextInput1 = styled.input`
  font-family: Roboto;
  font-style: italic;
  font-weight: 700;
  color: rgba(255,255,255,1);
  height: 39px;
  width: 159px;
  font-size: 20px;
  margin-top: 43px;
  margin-left: 521px;
  border: none;
  background: transparent;
`;

const LoremIpsum1 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 13px;
  width: 152px;
  margin-top: 14px;
`;

const LoremIpsum1Row = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: -606px;
  margin-left: 1002px;
  margin-right: 112px;
`;

export default ForgotPasswordScreenPc;
