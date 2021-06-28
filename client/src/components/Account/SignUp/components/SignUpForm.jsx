import React, { Component } from "react";
import styled, { css } from "styled-components";
import SignUpFullnameTextbox from "./SignUpFullnameTextbox";
import MaterialIconsIcon from "react-native-vector-icons/dist/MaterialIcons";
import EntypoIcon from "react-native-vector-icons/dist/Entypo";
import SignUpEmailTextbox from "./SignUpEmailTextbox";
import SignUpPasswordTextbox from "./SignUpPasswordTextbox";
import SignUpJoinNowButton from "./SignUpJoinNowButton";

function SignUpForm(props) {
  return (
    <Container {...props}>
      <MaterialFixedLabelTextboxStackStack>
        <MaterialFixedLabelTextboxStack>
          <SignUpFullnameTextbox
            style={{
              height: 45,
              width: 400,
              position: "absolute",
              left: 1,
              top: 22,
              borderWidth: 1,
              borderColor: "#000000",
              borderStyle: "solid"
            }}
          ></SignUpFullnameTextbox>
          <FullName>Full Name</FullName>
        </MaterialFixedLabelTextboxStack>
        <MaterialIconsIcon
          name="person"
          style={{
            top: 27,
            left: 0,
            position: "absolute",
            color: "rgba(128,128,128,1)",
            fontSize: 40
          }}
        ></MaterialIconsIcon>
      </MaterialFixedLabelTextboxStackStack>
      <Icon2Row>
        <EntypoIcon
          name="mail"
          style={{
            color: "rgba(128,128,128,1)",
            fontSize: 40,
            marginTop: 24
          }}
        ></EntypoIcon>
        <MaterialFixedLabelTextboxStack>
          <SignUpEmailTextbox
            style={{
              height: 45,
              width: 400,
              position: "absolute",
              left: 0,
              borderWidth: 1,
              borderColor: "#000000",
              top: 24,
              borderStyle: "solid"
            }}
          ></SignUpEmailTextbox>
          <Email>Email</Email>
        </MaterialFixedLabelTextboxStack>
      </Icon2Row>
      <MaterialFixedLabelTextboxStack>
        <SignUpPasswordTextbox
          style={{
            height: 45,
            width: 400,
            position: "absolute",
            left: 38,
            top: 0,
            borderWidth: 1,
            borderColor: "#000000",
            borderStyle: "solid"
          }}
        ></SignUpPasswordTextbox>
        <EntypoIcon
          name="lock"
          style={{
            top: 0,
            left: 0,
            position: "absolute",
            color: "rgba(128,128,128,1)",
            fontSize: 40
          }}
        ></EntypoIcon>
      </MaterialFixedLabelTextboxStack>
      <SignUpJoinNowButton
        style={{
          height: 45,
          width: 400,
          marginTop: 49,
          marginLeft: 69
        }}
      ></SignUpJoinNowButton>
      <Password>Password</Password>
      <OrSignupWithSso>or signup with SSO</OrSignupWithSso>
      <LetsGo>Let&#39;s go</LetsGo>
      <Text>
        By clicking the button above, you agree to our Terms of Service and
        Privacy Policy
      </Text>
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

const FullName = styled.span`
  font-family: Roboto;
  top: 0px;
  left: 0px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 23px;
  width: 93px;
`;

const MaterialFixedLabelTextboxStack = styled.div`
  width: 438px;
  height: 45px;
  margin-top: 51px;
  margin-left: 29px;
  position: relative;
`;

const MaterialFixedLabelTextboxStackStack = styled.div`
  width: 440px;
  height: 67px;
  margin-top: 75px;
  margin-left: 29px;
  position: relative;
`;

const Email = styled.span`
  font-family: Roboto;
  top: 0px;
  left: 1px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 25px;
  width: 76px;
`;

const Icon2Row = styled.div`
  height: 69px;
  flex-direction: row;
  display: flex;
  margin-top: 31px;
  margin-left: 27px;
  margin-right: 33px;
`;

const Password = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 23px;
  width: 82px;
  margin-top: -162px;
  margin-left: 68px;
`;

const OrSignupWithSso = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(189,16,224,1);
  height: 25px;
  width: 126px;
  margin-top: 165px;
  margin-left: 204px;
`;

const LetsGo = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  height: 42px;
  width: 108px;
  font-size: 30px;
  margin-top: -456px;
  margin-left: 213px;
`;

const Text = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(0,0,0,1);
  height: 17px;
  width: 500px;
  font-size: 12px;
  text-align: center;
  background-color: rgba(155,155,155,1);
  margin-top: 422px;
`;

export default SignUpForm;
