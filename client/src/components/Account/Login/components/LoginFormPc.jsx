import React, { Component } from "react";
import styled, { css } from "styled-components";
import LoginPasswordTextbox from "./LoginPasswordTextbox";
import LogInButton from "./LogInButton";
import LoginFormLoginButton from "./LoginFormLoginButton";
import LoginEmailTextbox from "./LoginEmailTextbox";
import EntypoIcon from "react-native-vector-icons/dist/Entypo";

function LoginFormPc(props) {
  return (
    <Container {...props}>
      <BodyContent>
        <Welcome>Welcome!</Welcome>
      </BodyContent>
      <MaterialFixedLabelTextbox2Stack>
        <LoginPasswordTextbox
          style={{
            height: 45,
            width: 400,
            position: "absolute",
            left: 0,
            top: 0,
            borderWidth: 1,
            borderColor: "#000000",
            borderStyle: "solid"
          }}
        ></LoginPasswordTextbox>
        <ForgotPassword>Forgot Password?</ForgotPassword>
      </MaterialFixedLabelTextbox2Stack>
      <MaterialButtonVioletStack>
        <LogInButton
          style={{
            height: 45,
            width: 400,
            position: "absolute",
            left: 0,
            top: 0
          }}
        ></LogInButton>
        <LoginFormLoginButton
          style={{
            height: 45,
            width: 400,
            position: "absolute",
            left: 0,
            top: 5
          }}
        ></LoginFormLoginButton>
      </MaterialButtonVioletStack>
      <MaterialFixedLabelTextbox3Stack>
        <LoginEmailTextbox
          style={{
            height: 45,
            width: 400,
            position: "absolute",
            left: 0,
            top: 23,
            borderWidth: 1,
            borderColor: "#000000",
            borderStyle: "solid"
          }}
        ></LoginEmailTextbox>
        <Email>Email</Email>
      </MaterialFixedLabelTextbox3Stack>
      <EntypoIcon
        name="mail"
        style={{
          top: 129,
          left: 23,
          position: "absolute",
          color: "rgba(128,128,128,1)",
          fontSize: 40
        }}
      ></EntypoIcon>
      <EntypoIcon
        name="lock"
        style={{
          top: 213,
          left: 23,
          position: "absolute",
          color: "rgba(128,128,128,1)",
          fontSize: 40
        }}
      ></EntypoIcon>
      <Password>Password</Password>
      <OrLoginWithSso>or login with SSO</OrLoginWithSso>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-width: 0px;
  border-radius: 2px;
  border-color: #CCC;
  flex-wrap: nowrap;
  background-color: #FFF;
  overflow: hidden;
  border-style: solid;
  flex-direction: column;
  position: relative;
  box-shadow: -2px 2px 1.5px  0.1px #000 ;
`;

const BodyContent = styled.div`
  padding: 16px;
  padding-top: 24px;
  justify-content: center;
  width: 156px;
  top: 0px;
  height: 97px;
  left: 173px;
  flex-direction: column;
  display: flex;
`;

const Welcome = styled.span`
  font-family: Roboto;
  font-size: 30px;
  color: #000;
  padding-bottom: 12px;
  width: 142px;
  height: 41px;
  font-style: normal;
  font-weight: 700;
`;

const ForgotPassword = styled.span`
  font-family: Roboto;
  top: 19px;
  left: 279px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: rgba(189,16,224,1);
  height: 25px;
  width: 121px;
`;

const MaterialFixedLabelTextbox2Stack = styled.div`
  top: 213px;
  left: 63px;
  width: 400px;
  height: 45px;
  position: absolute;
`;

const MaterialButtonVioletStack = styled.div`
  top: 291px;
  left: 63px;
  width: 400px;
  height: 50px;
  position: absolute;
`;

const Email = styled.span`
  font-family: Roboto;
  top: 0px;
  left: 0px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 24px;
  width: 125px;
  font-size: 14px;
`;

const MaterialFixedLabelTextbox3Stack = styled.div`
  top: 105px;
  left: 63px;
  width: 400px;
  height: 68px;
  position: absolute;
`;

const Password = styled.span`
  font-family: Roboto;
  top: 193px;
  left: 63px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 20px;
  width: 79px;
  font-size: 14px;
`;

const OrLoginWithSso = styled.span`
  font-family: Roboto;
  top: 362px;
  left: 209px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: rgba(189,16,224,1);
  height: 25px;
  width: 109px;
`;

export default LoginFormPc;
