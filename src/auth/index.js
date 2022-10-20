import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../front_components/Logo";
import { UserAuth } from "./AuthContext";

const inputAnimation = keyframes`
0 % {
  transform: translate(0);
}
40 % {
  transform: translate(-9px, -9px);
}
60 % {
  transform: translate(-7px, -7px);
}
`;

const AuthContainer = styled.div`
  --first-color: hsl(96, 100%, 49%);
  --white-color: #fff;
  --black-color: #000;
  --body-font: "Poppins", sans-serif;
  --normal-font-size: 1rem;
  --tiny-font-size: 0.6rem;

  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  background-color: var(--white-color);
  font-family: "Poppins", sans-serif;

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  .logo {
    margin: 10px;
    padding: 10px;
  }

  .title {
    margin: 1px;
    padding: 1px;  
    text-align: center;
    color: pink;
  }

  .form {
  height: 80vh;
  display: grid;
  place-items: center;
  margin: 0 1.5rem;
}

.form__content {
  display: grid;
  row-gap: 2rem;
}

.form__input,
.form__label,
.form__submit {
  border: 0;
  border-radius: 10px;
  outline: none;
  font-size: var(--normal-font-size);
  font-family: var(--body-font);
}

.form__box {
  width: 312px;
  height: 59px;
  position: relative;
}

.form__shadow {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 10px;
  background-color: var(--black-color);
}

.form__input {
  position: absolute;
  border: 2.5px solid var(--black-color);
  border-radius: 10px;
  background-color: var(--white-color);
  width: 100%;
  height: 100%;  
  z-index: 10;
  padding: 18px;
  transition: transform 0.3s;
}

.form__input::placeholder {
  transition: opacity 0.5s;
}

.form__label {
  z-index: 10;
  position: absolute;
  top: 16px;
  left: 20px;
  padding: 0px 3px;
  font-size: var(--tiny-font-size);
  font-weight: 800;
  transition: 0.2s;
  pointer-events: none;
  opacity: 0;
}

.form__button {
  justify-self: center;
  border: 0;
  border-radius: 10px;
  background-color: var(--black-color);
}

.form__submit {
  padding: 0.875rem 1.5rem;
  color: var(--black-color);
  background-color: var(--first-color);
  cursor: pointer;
  transition: transform 0.3s;
}

  .form__submit:hover {
    transform: translate(-6px, -6px);
  }

  .form__input:focus::placeholder {
    opacity: 0;
    transition: 0.3s;
  }

  .form__input:focus,
  .form__input:not(:placeholder-shown).form__input:not(:focus) {
    transform: translate(-8px, -8px);
    padding: 28px 18px 18px;
    animation: ${inputAnimation} 0.5s;
  }

  .form__input:focus + .form__label,
  .form__input:not(:placeholder-shown).form__input:not(:focus) + .form__label {
    opacity: 1;
    top: -16px;
    left: 12px;    
    background-color: var(--white-color);
    transition: 0.3s;
  }

  @media screen and (max-width: 340px) {
    .form__content,
    .form__box {
      width: 100%;
    }
  }

  @media screen and (min-width: 968px) {
    div {
      --normal-font-size: 1rem;
    }
    .form__content, Logo {
    zoom: 1.1;
    }
  }
`

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { logIn } = UserAuth();
  const usesRef = useRef();

  useEffect(() => {
    usesRef.current.focus();
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/admin/dashboard");
    } catch (error) {
      toast(error.code, { type: "error" });
    }
  };

  const loginEmail = (e) => {
    setEmail(e.target.value);
  }

  const loginPassword = (e) => {
    setPassword(e.target.value);
  }

  return (
    <AuthContainer>
      <div className="logo">
        <Logo />
      </div>
      <div className="title">
        <h1>Auth Login</h1>
      </div>
      <div className="form">
        <div className="form__content">
          <div className="form__box">
            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={loginEmail}
              ref={usesRef}
            />
            <label className="form__label">Enter Email</label>
            <div className="form__shadow"></div>
          </div>
          <div className="form__box">
            <input
              className="form__input"
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={loginPassword}
            />
            <label className="form__label">Enter Password</label>
            <div className="form__shadow"></div>
          </div>
          <div className="form__button">
            <input onClick={handleLogin} type="submit" className="form__submit" value="Login" />
          </div>
        </div>
      </div>
    </AuthContainer>
  );
}

export default Login;