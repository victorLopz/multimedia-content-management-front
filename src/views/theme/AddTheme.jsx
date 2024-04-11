import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Input } from "../../components/Input";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { Title } from "../../components/Title";
import { fetchConToken } from "../../helpers/fetch";
import { Select2 } from "../../components/Select2";

const initialState = {
  name: "",
  allow_images: true,
  allow_videos_url: true,
  allow_doctxt_url: true
};

export const AddTheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialState);
  const [allowDoctxtUrl, setAllowDoctxtUrl] = useState();
  const [allowImages, setAllowImages] = useState();
  const [allowVideosUrl, setAllowVideosUrl] = useState();

  const handleInputChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: data.name,
      allow_images: allowImages,
      allow_videos_url: allowVideosUrl,
      allow_doctxt_url: allowDoctxtUrl
    };

    const url = id === "nuevo" ? "themes" : `themes/${id}`;
    const method = id === "nuevo" ? "POST" : "PUT";

    const resp = await fetchConToken(url, payload, method);
    const body = await resp.json();

    setLoading(false);

    const titleLabel = id === "nuevo" ? "Tema agregado" : "Tema actualizado";
    const textLabel =
      id === "nuevo"
        ? "El tema se ha agregado correctamente"
        : "El tema se ha actualizado correctamente";

    if (resp.status === 201) {
      Swal.fire({
        title: titleLabel,
        text: textLabel,
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(-1);
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar"
      });
    }
  };

  return loading ? (
    <SpinnerLoading />
  ) : (
    <>
      {id === "nuevo" ? (
        <Title title="Agregar tema" />
      ) : (
        <Title title="Editar tema" />
      )}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md mt-4">
        <Input
          nameLabel="Nombre"
          type="text"
          name="name"
          placeholder={"Ingrese el nombre"}
          value={data.name}
          handleInputChange={handleInputChange}
        />
        <div className="flex gap-4">
          <div className="flex-1">
            <Select2
              nameLabel="Permitir imágenes"
              name="allow_images"
              value={allowImages}
              handleInputChange={(e) => {
                setAllowImages(e.target.value);
              }}
              datos={[
                { id: true, value: "SI" },
                { id: false, value: "NO" }
              ]}
            />
          </div>
          <div className="flex-1">
            <Select2
              nameLabel="Permitir videos"
              name="allow_videos_url"
              value={allowVideosUrl}
              handleInputChange={(e) => {
                setAllowVideosUrl(e.target.value);
              }}
              datos={[
                { id: true, value: "SI" },
                { id: false, value: "NO" }
              ]}
            />
          </div>
          <div className="flex-1">
            <Select2
              nameLabel="Permitir documentos"
              name="allow_doctxt_url"
              value={allowDoctxtUrl}
              handleInputChange={(e) => {
                setAllowDoctxtUrl(e.target.value);
              }}
              datos={[
                { id: true, value: "SI" },
                { id: false, value: "NO" }
              ]}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="bg-principal text-white font-bold py-2 px-4 rounded-md mt-4"
            onClick={() => navigate(-1)}
          >
            Regresar
          </button>
          <button
            type="submit"
            className="bg-secundario text-white font-bold py-2 px-4 rounded-md mt-4"
          >
            {id === "nuevo" ? "Agregar" : "Actualizar"}
          </button>
        </div>
      </form>
    </>
  );
};
