import React from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";

const LogoAnimation = keyframes`
  from {
    transform: translateY(-150px);
    opacity: 0;
  }
  to {
    transform: translateY(-50px);
    opacity: 1;
  }
`;

const Container = styled.div`
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 50px;
  margin-bottom: 20px;
`;

const OperatorButtons = styled.div`
  display: flex;
  justify-content: center;
`;

const OperatorButton = styled.button`
  font-family: "Montserrat", sans-serif;
  position: relative;
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  color: #333;
  font-size: 16px;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;

  &:hover {
    background-color: #86cd86;
    .operator-logo {
      animation: ${LogoAnimation} 0.7s forwards;
    }
  }
`;

const OperatorLogo = styled.img`
  position: absolute;
  top: 150px;
  left: 0;
  transition: 0.5s;
  transform: translateX(-50%);
  opacity: 0;
`;

const MainScreen: React.FC = () => {
  return (
    <Container>
      <Title>Выберите оператора:</Title>
      <OperatorButtons>
        <OperatorButton>
          <OperatorLogo
            className="operator-logo"
            src="/mts-logo.png"
            alt="mts"
          />
          <Link href="/payment?operator=МТС&color=red">Оплата МТС</Link>
        </OperatorButton>
        <OperatorButton>
          <OperatorLogo
            className="operator-logo"
            src="/beeline-logo.png"
            alt="beeline"
          />
          <Link href="/payment?operator=Билайн&color=yellow">
            Оплата Билайн
          </Link>
        </OperatorButton>
        <OperatorButton>
          <OperatorLogo
            className="operator-logo"
            src="/megafon-logo.png"
            alt="megfon"
          />
          <Link href="/payment?operator=Мегафон&color=green">
            Оплата Мегафон
          </Link>
        </OperatorButton>
      </OperatorButtons>
    </Container>
  );
};

export default MainScreen;
