import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../Input";
import { fetchConToken } from "../../../helpers/fetch";
import { SpinnerLoading } from "../../SpinnerLoading";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  company: ""
};

export const FormContent = ({ id, esNuevo }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleInputChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value
    });
  };

  useEffect(() => {
    if (!esNuevo && id !== "nuevo") {
      const getProvider = async () => {
        setLoading(true);
        const resp = await fetchConToken(`providers/${id}`);
        const body = await resp.json();

        setData({
          ...data,
          name: body.provider.name,
          email: body.provider.email,
          phone: body.provider.phone,
          address: body.provider.address,
          company: body.provider.company
        });
        setLoading(false);
      };
      getProvider();
    }
  }, [esNuevo, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = esNuevo ? "providers" : `providers/${id}`;
    const method = esNuevo ? "POST" : "PUT";

    const resp = await fetchConToken(url, data, method);

    setLoading(false);

    if (resp.status === 201 || resp.status === 200) {
      Swal.fire({
        title: "Exito",
        text: `Proveedor ${esNuevo ? "agregado" : "actualizado"} correctamente`,
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          setData(initialState);
          navigate(-1);
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Opps, ha ocurrido un error",
        icon: "error"
      });
    }
  };

  return loading ? (
    <SpinnerLoading />
  ) : (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md mt-4">
      <Input
        nameLabel="Nombre"
        type="text"
        name="name"
        value={data.name}
        handleInputChange={handleInputChange}
      />
      <Input
        nameLabel="Correo Electronico"
        type="email"
        name="email"
        value={data.email}
        handleInputChange={handleInputChange}
      />
      <Input
        nameLabel="Numero de celular"
        type="text"
        name="phone"
        value={data.phone}
        handleInputChange={handleInputChange}
      />
      <Input
        nameLabel="Dirección"
        type="text"
        name="address"
        value={data.address}
        handleInputChange={handleInputChange}
      />
      <Input
        nameLabel="Empresa"
        type="text"
        name="company"
        value={data.company}
        handleInputChange={handleInputChange}
      />
      <div className="flex justify-end">
        <Link to={-1}>
          <button
            type="button"
            className="border py-2 px-4 rounded-md mt-4 mr-4"
          >
            Regresar
          </button>
        </Link>
        <button
          type="submit"
          className="bg-secundario text-white font-bold py-2 px-4 rounded-md mt-4"
        >
          {esNuevo ? "Agregar" : "Actualizar"}
        </button>
      </div>
    </form>
  );
};
