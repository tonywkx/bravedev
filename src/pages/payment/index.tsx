import React, { useState } from "react";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";

interface PaymentFormProps {
  operator: string;
}

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
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  z-index: 10;
  position: relative;
`;

const BackgroundContainer = styled.div`
  font-family: "Montserrat", sans-serif;
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
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
  z-index: 10;
`;

const PaymentFormStyle = styled.form`
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const InputLabel = styled.label`
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  font-weight: bold;
  z-index: 10;
`;

const InputField = styled.input`
  font-family: "Montserrat", sans-serif;
  width: 300px;
  padding: 10px;
  margin-bottom: 10px;
  color: black;
  z-index: 10;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  font-family: "Montserrat", sans-serif;

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

const Message = styled.p`
  font-family: "Montserrat", sans-serif;
  margin-top: 20px;
  z-index: 10;
`;

const PaymentForm: React.FC<PaymentFormProps> = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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
      setSuccess(true);
      setError("");
      setTimeout(() => router.push("/"), 2000);
    } else {
      // Случайный неуспешный ответ API
      setError("Произошла ошибка при выполнении платежа");
      setSuccess(false);
    }

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //валидация номера и суммы
    const validPhone = validatePhoneNumber(phoneNumber);
    const validAmount = validateAmount(amount);

    if (!validPhone || !validAmount) {
      setError("Пожалуйста, введите допустимую сумму и правильный номер");
      return;
    }

    if (!phoneNumber || !amount) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    setLoading(true);

    try {
      await simulateApiCall();
      setPhoneNumber("");
      setAmount("");
    } catch (error) {
      setError("Произошла ошибка при выполнении платежа");
    } finally {
      setLoading(false);
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

            <InputField
              placeholder="7 (___) ___-__-__"
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
          <SubmitButton type="submit" disabled={loading}>
            {loading ? <Loader /> : "Подтвердить"}
          </SubmitButton>
        </PaymentFormStyle>
        {error && <Message style={{ color: "red" }}>{error}</Message>}
        {success && (
          <Message style={{ color: "green" }}>Платеж успешно выполнен!</Message>
        )}
      </Container>
    </>
  );
};

export default PaymentForm;
