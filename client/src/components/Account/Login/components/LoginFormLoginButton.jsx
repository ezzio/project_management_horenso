import React, { Component } from "react";
import styled, { css } from "styled-components";

function LoginFormLoginButton(props) {
  return (
    <Container {...props}>
      <TextInput placeholder="Log In"></TextInput>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #3F51B5;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

const TextInput = styled.input`
  font-family: Roboto;
  color: #fff;
  font-size: 17px;
  width: 57px;
  height: 29px;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  border: none;
  background: transparent;
`;

export default LoginFormLoginButton;
