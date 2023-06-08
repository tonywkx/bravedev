import React from "react";

import styled from "styled-components";

type AlertProps = {
  isSuccess: boolean;
  errorMessage: string;
};

const Message = styled.p`
  margin-top: 20px;
  z-index: 10;
`;

const Alert: React.FC<AlertProps> = ({ isSuccess, errorMessage }) => {
  return (
    <>
      {errorMessage && (
        <Message style={{ color: "red" }}>{errorMessage}</Message>
      )}
      {isSuccess && (
        <Message style={{ color: "green" }}>Платеж успешно выполнен!</Message>
      )}
    </>
  );
};

export default Alert;
