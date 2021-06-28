import React, { Component } from "react";
import styled, { css } from "styled-components";
import EntypoIcon from "react-native-vector-icons/dist/Entypo";
import ForgotPasswordEmailTextbox from "./ForgotPasswordEmailTextbox";
import ForgotPasswordSendLinkButton from "./ForgotPasswordSendLinkButton";

function ForgotPasswordForm(props) {
  return (
    <Container {...props}>
      <IconRow>
        <EntypoIcon
          name="mail"
          style={{
            color: "rgba(128,128,128,1)",
            fontSize: 40
          }}
        ></EntypoIcon>
        <ForgotPasswordEmailTextbox
          style={{
            height: 45,
            width: 400,
            borderWidth: 1,
            borderColor: "#000000",
            borderStyle: "solid"
          }}
        ></ForgotPasswordEmailTextbox>
      </IconRow>
      <ForgotPasswordSendLinkButton
        style={{
          height: 45,
          width: 400,
          marginTop: 31,
          marginLeft: 64
        }}
      ></ForgotPasswordSendLinkButton>
      <Email>Email</Email>
      <OrSignIn>or Sign In</OrSignIn>
      <Welcome>Welcome!</Welcome>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-width: 1px;
  border-radius: 2px;
  border-color: #CCC;
  flex-wrap: nowrap;
  background-color: #FFF;
  overflow: hidden;
  flex-direction: column;
  border-style: solid;
  box-shadow: -2px 2px 1.5px  0.1px #000 ;
`;

const IconRow = styled.div`
  height: 45px;
  flex-direction: row;
  display: flex;
  margin-top: 96px;
  margin-left: 24px;
  margin-right: 36px;
`;

const Email = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 21px;
  width: 91px;
  margin-top: -142px;
  margin-left: 75px;
`;

const OrSignIn = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(189,16,224,1);
  height: 28px;
  width: 71px;
  text-align: center;
  margin-top: 145px;
  margin-left: 228px;
`;

const Welcome = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  height: 45px;
  width: 137px;
  font-size: 30px;
  margin-top: -239px;
  margin-left: 195px;
`;

export default ForgotPasswordForm;
