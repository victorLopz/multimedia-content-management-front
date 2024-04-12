import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Input } from "../../components/Input";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { Title } from "../../components/Title";
import { fetchConToken, fileUploadFetch } from "../../helpers/fetch";
import { Select2 } from "../../components/Select2";
import { AddImage } from "../../components/admin/content/AddImage";

const initialState = {
  name: "",
  credits: "",
  typeTheme: "",

  front_page_url: "",
  img: "",
  url_video: "",
  url_doc_txt: ""
};

export const AddContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialState);
  const [typeTheme, setTypeTheme] = useState("select");
  const [thematics, setThematics] = useState([]);

  const [images, setImages] = useState([]);
  const [fileUploadDoc, setFileUploadDoc] = useState([]);
  const [file, setFile] = useState([]);

  useEffect(() => {
    // if (id !== "nuevo") {
    //   const getCustomer = async () => {
    //     const resp = await fetchConToken(`customers/${id}`);
    //     const body = await resp.json();
    //     const { customer } = body;
    //     setData({
    //       name: customer.name,
    //       ruc: customer.ruc,
    //       email: customer.email,
    //       phone: customer.phone,
    //       address: customer.address,
    //       company: customer.company,
    //       creditAmount: customer.creditAmount
    //     });
    //   };
    //   getCustomer();
    // }
    getThematics();
  }, []);

  const getThematics = async () => {
    const resp = await fetchConToken("themes/all");
    const body = await resp.json();
    setThematics(body);
  };

  const handleInputChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value
    });
  };

  const changeInput = (e) => {
    const file = e.currentTarget.files[0];

    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();

      if (
        fileExtension === "png" ||
        fileExtension === "jpg" ||
        fileExtension === "jpeg"
      ) {
        let url = URL.createObjectURL(file);
        let dataFile = {
          index: 1,
          name: fileName,
          url,
          file: file
        };

        setImages([dataFile]);
      } else {
        Swal.fire({
          title: "Error",
          text: "Solo se permiten archivos de imagen",
          icon: "error",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar"
        });
      }
    }
  };

  const changeInputDoc = (e) => {
    const file = e.currentTarget.files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension === "txt") {
      let url = URL.createObjectURL(file);
      let dataFile = {
        index: 1,
        name: file.name,
        url,
        file: file
      };

      setFileUploadDoc([dataFile]);
    } else {
      Swal.fire({
        title: "Error",
        text: "Solo se permiten archivos de texto plano",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar"
      });
    }
  };

  const changeInputImg = (e) => {
    const file = e.currentTarget.files[0];

    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();

      if (
        fileExtension === "png" ||
        fileExtension === "jpg" ||
        fileExtension === "jpeg"
      ) {
        let url = URL.createObjectURL(file);
        let dataFile = {
          index: 1,
          name: fileName,
          url,
          file: file
        };

        setFile([dataFile]);
      } else {
        Swal.fire({
          title: "Error",
          text: "Solo se permiten archivos de imagen",
          icon: "error",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar"
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: data.name,
      credits: data.credits,
      theme: typeTheme,
      url_video: data.url_video
    };

    const url = id === "nuevo" ? "content" : `content/${id}`;
    const method = id === "nuevo" ? "POST" : "PUT";

    const resp = await fetchConToken(url, payload, method);
    if (resp.status === 403) {
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "No estas autorizado",
        icon: "error"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/admin");
        }
      });
    }
    const body = await resp.json();

    const fileFront = await uploadFiles(images, "front_page_url");
    const fileUploadFrontResponse = await fileFront.json();

    const fileImg = await uploadFiles(file, "img");
    const fileUploadResponse = await fileImg.json();

    const fileDoc = await uploadFiles(fileUploadDoc, "url_doc_txt");

    const fileUploadDocResponse = await fileDoc.json();

    const payloadContent = {
      name: data.name,
      front_page_url: fileUploadFrontResponse.fileUrl,
      img: fileUploadResponse.fileUrl,
      url_video: data.url_video,
      url_doc_txt: fileUploadDocResponse.fileUrl,
      theme: typeTheme,
      credits: data.credits
    };

    const content = await updateContent(payloadContent, body._id);

    setLoading(false);

    const titleLabel =
      id === "nuevo" ? "Contenido agregado" : "Contenido editado";
    const textLabel =
      id === "nuevo"
        ? "El contenido se ha agregado correctamente"
        : "El contenido se ha editado correctamente";

    if (content.status === 200) {
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

  const uploadFiles = async (files, name) => {
    const file = files.map((img) => img.file);
    file[0].originalname = files[0].name;

    const fileUpload = await fileUploadFetch(`uploadftp/file`, "file", file[0]);
    return fileUpload;
  };

  const updateContent = async (payloadContent, id) => {
    const content = await fetchConToken(
      `content/${id}`,
      payloadContent,
      "PATCH"
    );

    return content;
  };

  return loading ? (
    <SpinnerLoading />
  ) : (
    <>
      {id === "nuevo" ? (
        <Title title="Agregar contenido" />
      ) : (
        <Title title="Editar Cliente" />
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
        <Input
          nameLabel="Creditos"
          type="text"
          name="credits"
          placeholder={"Ingrese los creditos"}
          value={data.credit}
          handleInputChange={handleInputChange}
        />
        <Input
          nameLabel="Url del video"
          type="text"
          name="url_video"
          placeholder={"Ingrese la url del video"}
          value={data.url_video}
          handleInputChange={handleInputChange}
        />
        <Select2
          nameLabel="Seleccione un tipo de tematica"
          name="typeTheme"
          value={typeTheme}
          handleInputChange={(e) => {
            setTypeTheme(e.target.value);
          }}
          datos={thematics.map((thematic) => ({
            id: thematic.id,
            value: thematic.name
          }))}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "30%" }}>
            <AddImage
              onChangeFile={changeInput}
              images={images}
              setImages={setImages}
              label={"Imagen de portada"}
            />
          </div>
          <div style={{ width: "30%" }}>
            <AddImage
              onChangeFile={changeInputDoc}
              images={fileUploadDoc}
              setImages={setFileUploadDoc}
              label={"Documento o texto"}
            />
          </div>
          <div style={{ width: "30%" }}>
            <AddImage
              onChangeFile={changeInputImg}
              images={file}
              setImages={setFile}
              label={"Imagen"}
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
