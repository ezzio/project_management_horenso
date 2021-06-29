import React, { Component } from "react";
import styled, { css } from "styled-components";

function SignUpLoginButton(props) {
  return (
    <Container {...props}>
      <Login>Login</Login>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(255,255,255,1);
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

const Login = styled.span`
  font-family: Roboto;
  color: rgba(144,19,254,1);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  width: 43px;
  height: 17px;
  text-align: center;
`;

export default SignUpLoginButton;
