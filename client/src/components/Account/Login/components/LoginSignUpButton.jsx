import React, { Component } from "react";
import styled, { css } from "styled-components";

function LoginSignUpButton(props) {
  return (
    <Container {...props}>
      <SignUp>Sign up</SignUp>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(255,255,255,1);
  justify-content: center;
  align-items: center;
  flex-direction: row;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  border-top-left-radius: 0px;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

const SignUp = styled.span`
  font-family: Roboto;
  color: rgba(144,19,254,1);
  font-size: 14px;
  width: 49px;
  height: 17px;
  align-self: center;
  font-style: normal;
  font-weight: 700;
`;

export default LoginSignUpButton;
