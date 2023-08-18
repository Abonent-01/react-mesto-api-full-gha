import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  function handleChange(evt) {
    const { name, value} = evt.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = userData;
    onRegister(password, email);
  }

  return (
    <div className="auth">
      <h3 className="auth__title">Регистрация</h3>
      <form name="register" className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email" 
          value={userData.email}
          onChange={handleChange}
          required />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={userData.password}
          onChange={handleChange}
          required />
        <button className="auth__button-submit" type="submit">Зарегистрироваться</button >
        <Link className="auth__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  )
}

export default Register;