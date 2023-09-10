import { useState } from 'react';

function Login({ onSubmit }) {

  const [loginValue, setLoginValue] = useState({
    'email': '',
    'password': ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(loginValue);
  }

  const handleEmailChange = (e) => {
    setLoginValue({ ...loginValue, 'email': e.target.value });
  }

  const handlePasswordChange = (e) => {
    setLoginValue({ ...loginValue, 'password': e.target.value })
  }

  return (
    <div className="login">
      <div className="login__container">
        <h3 className="login__header">Вход</h3>
        <form className="login__form" name="login" onSubmit={handleSubmit}>
          <input className="login__input-field login__input-field_value_email" type="email" required
            placeholder="Email" name="email" id="email" onChange={handleEmailChange} value={loginValue['email']} />
          <span className="login__input-error"></span>
          <input className="login__input-field login__input-field_value_password" type="text" required
            placeholder="Пароль" name="password" id="password" onChange={handlePasswordChange} value={loginValue['password']} />
          <span className="login__input-error"></span>
          <button type="submit" className="login__submit-button" aria-label="Войти">Войти</button>
        </form>
      </div>
    </div>
  )
}

export default Login
