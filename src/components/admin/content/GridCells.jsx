import moment from "moment";
import "moment/locale/es";
import React, { useState } from "react";
import {
  RiDeleteBinLine,
  RiEye2Line,
  RiFileDownloadFill
} from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SpinnerLoading } from "../../SpinnerLoading";
import { ModalForm } from "../../ModalForm";

export const GridCells = ({
  id,
  name,
  date,
  credits,
  frontImage,
  docTxt,
  image
}) => {
  const { Access } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  moment.locale("es");

  const handleView = () => {
    setModal(true);
  };

  const handleDelete = () => {
    console.log("Eliminar...");
  };

  const renderActionButtons = () => {
    let role = Access.role[0];
    return (
      <>
        {(role === "Admin" || role === "Reader") && (
          <button
            onClick={handleView}
            className="flex flex-row gap-1 text-blue-600 items-center"
          >
            <RiEye2Line />
            <span>Ver</span>
          </button>
        )}
        {role === "Admin" && (
          <button
            className="flex flex-row gap-1 text-danger items-center"
            onClick={handleDelete}
          >
            <RiDeleteBinLine />
            <span>Eliminar</span>
          </button>
        )}
      </>
    );
  };

  return loading ? (
    <SpinnerLoading />
  ) : (
    <>
      <div className="hidden md:block bg-white rounded-lg w-full py-3 pr-2 my-2">
        <div className="grid grid-cols-5 w-full">
          <div className="grid justify-center items-center">
            <p className="text-center">{id}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center truncate">{name}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{credits}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{date}</p>
          </div>
          <div className="flex flex-row gap-2 justify-center text-blue-600 items-center">
            {renderActionButtons()}
          </div>
        </div>
      </div>
      <div className="md:hidden bg-white rounded-lg w-full py-3 px-4 my-2">
        <div className="w-full flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Identificacion:</p>
            <p className="text-center truncate">{id}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold">Nombre</p>
            <p className="text-center truncate">{name}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold">Créditos:</p>
            <p className="text-center">{credits}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold">Fecha de creación:</p>
            <p className="text-center">{date}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-semibold">Acciones:</p>
            <div className="flex flex-row gap-2 justify-center text-blue-600 items-center">
              {renderActionButtons()}
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <ModalForm>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between mx-4 gap-2 text-xl py-3">
              <div>
                <p className="font-bold">Contenido:</p>
                <p></p>
              </div>
              <button
                onClick={() => setModal(false)}
                className="bg-red-500 hover:bg-red-700 text-white w-8 h-8 items-center justify-center rounded-full"
              >
                x
              </button>
            </div>

            <div className="mx-4 my-2 border-b-2 border-black"></div>

            <div className="mx-5">
              <div className="flex flex-row">
                <p className="font-bold mr-2">Nombre</p>
                <p>{name}</p>
              </div>
            </div>

            {/* Dibujar un separador de info de color neggro */}
            <div className="mx-4 my-2 border-b-2 border-black"></div>
            <div className="bg-white pb-6 mt-4">
              &nbsp;
              <div className="mx-5">
                <p className="font-bold mr-2">Identificacion: {id}</p>
              </div>
              <div className="mx-5">
                <p className="font-bold mr-2">Créditos: {credits}</p>
              </div>
              <div className="mx-5">
                <p className="font-bold mr-2">
                  Fecha de creación: {date}
                </p>
              </div>
              <div className="flex flex-row justify-center gap-4 mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    const name = docTxt.split("/").pop().split(".")[0];

                    const link = docTxt;
                    const downloadLink = document.createElement("a");
                    downloadLink.href = link;
                    downloadLink.setAttribute("download", name); // Puedes establecer un nombre de archivo aquí
                    downloadLink.click();
                  }}
                >
                  <RiFileDownloadFill size={20} /> Doc
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    const name = image.split("/").pop().split(".")[0];

                    const link = image;
                    const downloadLink = document.createElement("a");
                    downloadLink.href = link;
                    downloadLink.setAttribute("download", name); // Puedes establecer un nombre de archivo aquí
                    downloadLink.setAttribute("type", "image/jpeg");
                    downloadLink.click();
                  }}
                >
                  <RiFileDownloadFill size={20} /> IMG
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    const name = frontImage.split("/").pop().split(".")[0];

                    const link = frontImage;
                    const downloadLink = document.createElement("a");
                    downloadLink.href = link;
                    downloadLink.setAttribute("download", name); // Puedes establecer un nombre de archivo aquí
                    downloadLink.setAttribute("type", "image/jpeg");
                    downloadLink.click();
                  }}
                >
                  <RiFileDownloadFill size={20} /> FRONT
                </button>
              </div>
            </div>
            {/* Crear varios botones */}
          </div>
        </ModalForm>
      )}
    </>
  );
};
