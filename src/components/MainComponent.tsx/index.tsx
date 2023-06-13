import React from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { OPERATORS } from "../../constants/operators";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow-x: hidden;
`;

const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 20px;
`;

const OperatorButtons = styled.div`
  display: flex;
  justify-content: center;
`;

const OperatorButton = styled.button`
  position: relative;
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  color: #333;
  font-size: 16px;
  width: 160px;
  height: 50px;
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
  transition: 0.5s ease top, 0.5s ease transform;
  transform: translateX(-50%);
  opacity: 0;
`;

const MainScreen: React.FC = () => {
  return (
    <Container>
      <Title>Выберите оператора:</Title>
      <OperatorButtons>
        {OPERATORS.map((operator) => (
          <Link
            href={`/payment?operator=${operator.name}&color=${operator.color}`}
            key={operator.id}
          >
            <OperatorButton>
              <OperatorLogo
                className="operator-logo"
                src={operator.img}
                alt={operator.name}
              />
              Оплата {operator.name}
            </OperatorButton>
          </Link>
        ))}
      </OperatorButtons>
    </Container>
  );
};

export default MainScreen;
