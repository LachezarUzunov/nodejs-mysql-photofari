import React, { useState, useEffect } from "react";
import classes from "./Login.module.css";
import { toast } from "react-toastify";

// import redux hoods
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import Spinner from "../../components/layout/Spinner";

const Login = ({ onComponentChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Notify on successful login
    if (isSuccess && user) {
      toast.success("Логнате се успешно");
    }
  }, [isError, isSuccess, user, message, dispatch]);

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordInputHandler = (e) => {
    setPassword(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  const handleComponentChange = () => {
    onComponentChange(true);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className={classes.bg}>
      <div className={classes.form}>
        <form onSubmit={onSubmit}>
          <label className="genLabel" htmlFor="email">
            И-мейл адрес
          </label>
          <input
            placeholder="dimitar@abv.bg"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={emailInputHandler}
            required
          ></input>
          <label className="genLabel" htmlFor="password">
            Парола
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onPasswordInputHandler}
            placeholder="Въведете парола"
            required
          ></input>
          <button className="primaryBtn" type="submit">
            Влез
          </button>
        </form>
        <p>
          Все още нямаш акаунт?{" "}
          <button onClick={handleComponentChange}>Регистрирай се тук</button>
        </p>
      </div>
    </section>
  );
};

export default Login;
