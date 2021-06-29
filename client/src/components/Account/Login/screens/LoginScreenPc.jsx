import React, { Component } from "react";
import styled, { css } from "styled-components";
import LoginFormPc from "/components/LoginFormPc";
import HelpButton from "/components/HelpButton";
import LoginSignUpButton from "/components/LoginSignUpButton";

function LoginScreenPc(props) {
  return (
    <Container>
      <LoginFormLayerRow>
        <LoginFormPc
          style={{
            height: 392,
            width: 503
          }}
        ></LoginFormPc>
        <HelpButton
          style={{
            height: 60,
            width: 60,
            marginLeft: 13,
            marginTop: 325
          }}
        ></HelpButton>
        <HelpButton
          style={{
            height: 63,
            width: 57,
            marginLeft: 1370,
            marginTop: 336
          }}
        ></HelpButton>
      </LoginFormLayerRow>
      <LoremIpsumRow>
        <LoremIpsum>Don&#39;t have an account?</LoremIpsum>
        <LoginSignUpButton
          style={{
            height: 36,
            width: 100
          }}
        ></LoginSignUpButton>
      </LoremIpsumRow>
      <TextInputStackRow>
        <TextInputStack>
          <TextInput placeholder="This is the slogan"></TextInput>
          <TextInput1 placeholder="This is the slogan"></TextInput1>
        </TextInputStack>
        <HelpButton
          style={{
            height: 60,
            width: 60,
            marginLeft: 1160
          }}
        ></HelpButton>
      </TextInputStackRow>
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

const LoginFormLayerRow = styled.div`
  height: 399px;
  flex-direction: row;
  display: flex;
  margin-top: 72px;
  margin-left: 332px;
  margin-right: -969px;
`;

const LoremIpsum = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 13px;
  width: 152px;
  margin-top: 14px;
`;

const LoremIpsumRow = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: -561px;
  margin-left: 1002px;
  margin-right: 112px;
`;

const TextInput = styled.input`
  font-family: Roboto;
  top: 0px;
  left: 0px;
  position: absolute;
  font-style: italic;
  font-weight: 700;
  color: rgba(255,255,255,1);
  height: 39px;
  width: 159px;
  font-size: 20px;
  border: none;
  background: transparent;
`;

const TextInput1 = styled.input`
  font-family: Roboto;
  top: 0px;
  left: 0px;
  position: absolute;
  font-style: italic;
  font-weight: 700;
  color: rgba(255,255,255,1);
  height: 39px;
  width: 159px;
  font-size: 20px;
  border: none;
  background: transparent;
`;

const TextInputStack = styled.div`
  width: 159px;
  height: 39px;
  position: relative;
`;

const TextInputStackRow = styled.div`
  height: 60px;
  flex-direction: row;
  display: flex;
  margin-top: 557px;
  margin-left: 503px;
  margin-right: -516px;
`;

export default LoginScreenPc;
