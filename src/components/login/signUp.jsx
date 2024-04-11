import React from "react";
import { useState } from "react";
import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import Swal from "sweetalert2";
import { Select2 } from "../Select2";

export const SingUp = ({ setInicioDeSesion }) => {
  const [data, setData] = useState({
    email: "",
    username: "",
    fullName: "",
    roles: []
  });
  const [loading, setLoading] = useState(false);
  const [typeRole, setTypeRole] = useState("select");

  const signUp = async () => {
    setLoading(true);

    try {
      const resp = await fetchSinToken(
        "auth/register",
        {
          ...data,
          roles: [typeRole]
        },
        "POST"
      );
      const body = await resp.json();

      if (resp.status === 201) {
        Swal.fire("Éxito", "Usuario creado correctamente", "success");
      } else {
        Swal.fire("Error", body.message, "error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setInicioDeSesion(1);
    }
  };

  return (
    <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
      <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
        Registrate para iniciar sesión
      </h2>
      <>
        <div className="intro-x mt-6">
          <input
            type="text"
            className="intro-x login__input form-control py-3 px-4 block"
            placeholder="Nombre completo"
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
            value={data.fullName}
          />
        </div>
        <div className="intro-x mt-6">
          <input
            type="email"
            className="intro-x login__input form-control py-3 px-4 block"
            placeholder="Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
          />
        </div>
        <div className="intro-x mt-4">
          <input
            type="text"
            className="intro-x login__input form-control py-3 px-4 block"
            placeholder="Username"
            onChange={(e) => setData({ ...data, username: e.target.value })}
            value={data.username}
          />
        </div>
        <Select2
          nameLabel="Seleccione un tipo de rol"
          name="typeReport"
          value={typeRole}
          handleInputChange={(e) => {
            setTypeRole(e.target.value);
          }}
          datos={[
            {
              id: "Reader",
              value: "Lector"
            },
            {
              id: "Creator",
              value: "Creador"
            }
          ]}
        />
      </>

      <div className="mt-4 flex justify-end">
        <button type="button" onClick={() => setInicioDeSesion(1)}>
          ¿Recordó su contraseña?
        </button>
      </div>
      <div className="intro-x mt-6 text-center xl:text-left ">
        {loading && <SpinnerLoading />}
        <button
          onClick={signUp}
          className="hover:bg-principal bg-[#68B3B8] w-full py-3 rounded-lg text-white font-bold"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};
