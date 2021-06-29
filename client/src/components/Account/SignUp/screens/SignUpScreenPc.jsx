import React, { Component } from "react";
import styled, { css } from "styled-components";
import SignUpForm from "./components/SignUpForm";
import HelpButton from "./components/HelpButton";
import SignUpLoginButton from "./components/SignUpLoginButton";

function SignUpScreenPc(props) {
  return (
    <Container>
      <MaterialCardWithoutImageRow>
        <SignUpForm
          style={{
            width: 500,
            height: 510
          }}
        ></SignUpForm>
        <HelpButton
          style={{
            width: 60,
            height: 60,
            marginLeft: 15,
            marginTop: 450
          }}
        ></HelpButton>
      </MaterialCardWithoutImageRow>
      <LoremIpsum></LoremIpsum>
      <AlreadyJoinedRow>
        <AlreadyJoined>Already joined?</AlreadyJoined>
        <SignUpLoginButton
          style={{
            height: 36,
            width: 100,
            marginLeft: 6
          }}
        ></SignUpLoginButton>
      </AlreadyJoinedRow>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-width: 100px;
  border-color: rgba(255,255,255,1);
  background-color: rgba(74,144,226,1);
  flex-direction: column;
  border-style: solid;
  height: 100vh;
  width: 100vw;
`;

const MaterialCardWithoutImageRow = styled.div`
  height: 510px;
  flex-direction: row;
  display: flex;
  margin-top: 24px;
  margin-left: 333px;
  margin-right: 458px;
`;

const LoremIpsum = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  margin-top: 68px;
  margin-left: 873px;
`;

const AlreadyJoined = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 25px;
  width: 97px;
  margin-top: 11px;
`;

const AlreadyJoinedRow = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: -692px;
  margin-left: 1051px;
  margin-right: 112px;
`;

export default SignUpScreenPc;
