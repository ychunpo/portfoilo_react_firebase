import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../Icon_components/Logo";
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

  .AA-logo {
    margin: 10px;
    padding: 10px;
  }

  .AA-title {
    margin: 1px;
    padding: 1px;
    font-size: 2.2rem;
    font-weight: bold;
    text-align: center;
    color: pink;
  }

  .AA-main {
    padding-top: 200px;
    display: grid;
    grid-template-columns: 1tf;
    place-items: center;
  }

  .AA-form {
    height: 30vh;
    display: grid;
    place-items: center;
    margin: 0 1.5rem;
  }

.AA-form__content {
  display: grid;
  row-gap: 2rem;
}

.AA-form__input,
.AA-form__label,
.AA-form__submit {
  border: 0;
  border-radius: 10px;
  outline: none;
  font-size: var(--normal-font-size);
  font-family: var(--body-font);
}

.AA-form__box {
  width: 312px;
  height: 59px;
  position: relative;
}

.AA-form__shadow {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 10px;
  background-color: var(--black-color);
}

.AA-form__input {
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

.AA-form__input::placeholder {
  transition: opacity 0.5s;
}

.AA-form__label {
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

.AA-form__button {
  justify-self: center;
  border: 0;
  border-radius: 10px;
  background-color: var(--black-color);
}

.AA-form__submit {
  padding: 0.875rem 1.5rem;
  color: var(--black-color);
  background-color: var(--first-color);
  cursor: pointer;
  transition: transform 0.3s;
}

  .AA-form__submit:hover {
    transform: translate(-6px, -6px);
  }

  .AA-form__input:focus::placeholder {
    opacity: 0;
    transition: 0.3s;
  }

  .AA-form__input:focus,
  .AA-form__input:not(:placeholder-shown).form__input:not(:focus) {
    transform: translate(-8px, -8px);
    padding: 28px 18px 18px;
    animation: ${inputAnimation} 0.5s;
  }

  .AA-form__input:focus + .AA-form__label,
  .AA-form__input:not(:placeholder-shown).AA-form__input:not(:focus) + .AA-form__label {
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
      navigate("/admin/skills");
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
      <div className="AA-logo">
        <Logo />
      </div>
      <div className="AA-main">
        <div className="AA-title">
          <h1>Auth Login</h1>
        </div>
        <div className="AA-form">
          <div className="AA-form__content">
            <div className="AA-form__box">
              <input
                className="AA-form__input"
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={loginEmail}
                ref={usesRef}
              />
              <label className="AA-form__label">Enter Email</label>
              <div className="AA-form__shadow"></div>
            </div>
            <div className="AA-form__box">
              <input
                className="AA-form__input"
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={loginPassword}
              />
              <label className="AA-form__label">Enter Password</label>
              <div className="AA-form__shadow"></div>
            </div>
            <div className="AA-form__button">
              <input onClick={handleLogin} type="submit" className="AA-form__submit" value="Login" />
            </div>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
}

export default Login;