import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { fetchSinToken } from "../../helpers/fetch";
import { setLoginAuth, setToken } from "../../redux/slices/auth/authSlice";
import { SpinnerLoading } from "../SpinnerLoading";

export const LoginForm = ({ setInicioDeSesion }) => {
  const dispatch = useDispatch();
  const [validarContrasenia, setValidarContrasenia] = useState(false);

  const [login, setLogin] = useState({
    username: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validarContrasenia) {
      const resp = await fetchSinToken(
        "auth/login",
        {
          username: login.username,
          email: login.email
        },
        "POST"
      );

      const body = await resp.json();

      setLoading(false);

      if (resp.status === 201) {
        localStorage.setItem("token", body.token);

        let data = {
          modules: [6, 3, 9, 4],
          actions: {
            3: [1],
            4: [1],
            6: [1],
            9: [1]
          }
        };

        dispatch(
          setLoginAuth({
            token: body.token,
            id: body.user._id,
            name: body.user.fullName,
            username: body.user.username,
            modulos: data.modules,
            actions: data.actions,
            role: body.user.roles
          })
        );

        window.location = "/admin";
      } else {
        Swal.fire({
          title: "error",
          text: "Usuario o contraseña incorrecta",
          icon: "error"
        });
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
    >
      <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
        Ingresar
      </h2>
      <div className="intro-x mt-8">
        <>
          <input
            type="text"
            className="intro-x login__input form-control py-3 px-4 block"
            placeholder="Username"
            value={login.username}
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
          />
          <input
            type="text"
            className="intro-x login__input form-control py-3 px-4 block mt-6"
            placeholder="Email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
        </>
        <div className="intro-x text-gray-500 text-xs text-center xl:text-left mt-4">
          <a
            href="#"
            onClick={() => setInicioDeSesion(false)}
            className="text-principal"
          >
            ¿No tienes cuenta? Regístrate
          </a>
        </div>
      </div>
      <div className="intro-x mt-6 text-center xl:text-left ">
        {loading && <SpinnerLoading />}
        <button
          type="submit"
          className="hover:bg-principal bg-[#68B3B8] w-full py-3 rounded-lg text-white font-bold"
        >
          Ingresar
        </button>
      </div>
    </form>
  );
};
