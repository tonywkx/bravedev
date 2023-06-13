import React, { useState } from "react";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";
import Alert from "@/components/Alert";
import InputMask from "react-input-mask";

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: ${rotateAnimation} 1s linear infinite;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  z-index: 10;
  position: relative;
  overflow-x: hidden;
`;

const BackgroundContainer = styled.div`
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-self: center;
  opacity: 0.3;
  z-index: 1;
  text-align: center;
  font-size: 300px;
  position: absolute;
  @media (max-width: 768px) {
    font-size: 200px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  z-index: 10;
`;

const PaymentFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  font-weight: bold;
  z-index: 10;
`;

const InputField = styled.input`
  width: 300px;
  padding: 10px;
  margin-bottom: 10px;
  color: black;
  z-index: 10;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  background-color: #f5f5f5;
  transition: 0.3s;
  border: none;
  border-radius: 5px;
  color: #333;
  font-size: 16px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: #86cd86;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PaymentForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const { operator } = router.query;
  const { color } = router.query;

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // удаляем нечисловые значения
    const digitsOnly = value.replace(/\D/g, "");
    setPhoneNumber(digitsOnly.slice(0, 11)); //лимит длины номера
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const digitsOnly = value.replace(/\D/g, "");
    setAmount(digitsOnly);
  };

  const simulateApiCall = async () => {
    // Эмуляция запроса к серверу с задержкой в 2 секунды
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Генерация случайного числа от 0 до 1
    const random = Math.random();

    if (random < 0.5) {
      // Случайный успешный ответ API
      setIsSuccess(true);
      setErrorMessage("");
      setTimeout(() => router.push("/"), 2000);
    } else {
      // Случайный неуспешный ответ API
      setErrorMessage("Произошла ошибка при выполнении платежа");
      setIsSuccess(false);
    }

    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //валидация номера и суммы
    const validPhone = validatePhoneNumber(phoneNumber);
    const validAmount = validateAmount(amount);

    if (!validPhone || !validAmount) {
      setErrorMessage(
        "Пожалуйста, введите допустимую сумму и правильный номер"
      );
      return;
    }

    if (!phoneNumber || !amount) {
      setErrorMessage("Пожалуйста, заполните все поля");
      return;
    }

    setIsLoading(true);

    try {
      await simulateApiCall();
      setPhoneNumber("");
      setAmount("");
    } catch (error) {
      setErrorMessage("Произошла ошибка при выполнении платежа");
    } finally {
      setIsLoading(false);
    }
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    return digitsOnly.length === 11;
  };

  const validateAmount = (amount: string) => {
    const parsedAmount = parseInt(amount);
    return !isNaN(parsedAmount) && parsedAmount >= 1 && parsedAmount <= 1000;
  };

  return (
    <>
      <Container>
        <BackgroundContainer style={{ color: `${color}` }}>
          {operator}
        </BackgroundContainer>
        <Title>
          Оплата для оператора:{" "}
          <span style={{ color: `${color}` }}>{operator}</span>
        </Title>
        <PaymentFormStyle onSubmit={handleSubmit}>
          <div>
            <InputLabel htmlFor="phoneNumber">Номер телефона:</InputLabel>

            <InputMask
              style={{
                width: "300px",
                padding: "10px",
                marginBottom: "10px",
                color: "black",
                zIndex: 10,
                borderRadius: "5px",
              }}
              mask="+7 (999)-999-99-99"
              placeholder="+7 (ХХХ)-ХХХ-ХХ-ХХ"
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
          </div>
          <div>
            <InputLabel htmlFor="amount">Сумма в рублях:</InputLabel>
            <InputField
              placeholder="От 1 до 1000 руб."
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              required
            />
          </div>
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? <Loader /> : "Подтвердить"}
          </SubmitButton>
        </PaymentFormStyle>
        <Alert isSuccess={isSuccess} errorMessage={errorMessage} />
      </Container>
    </>
  );
};

export default PaymentForm;
