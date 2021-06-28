import React, { Component } from "react";
import styled, { css } from "styled-components";

function ForgotPasswordSendLinkButton(props) {
  return (
    <Container {...props}>
      <SendMeTheLink>Send me the link</SendMeTheLink>
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

const SendMeTheLink = styled.span`
  font-family: Roboto;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
`;

export default ForgotPasswordSendLinkButton;
