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
  allow_images,
  allow_videos_url,
  allow_doctxt_url,
  date
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
        <div className="grid grid-cols-6 w-full">
          <div className="grid justify-center items-center">
            <p className="text-center">{id}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center truncate">{name}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{allow_images ? "Si" : "No"}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{allow_videos_url ? "Si" : "No"}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{allow_doctxt_url ? "Si" : "No"}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{date}</p>
          </div>
          <div className="flex flex-row gap-2 justify-center text-blue-600 items-center">
            {/* {renderActionButtons()} */}
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
            <p className="font-semibold">Permitir imagenes:</p>
            <p className="text-center">{allow_images ? "Si" : "No"}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold">Permitir videos:</p>
            <p className="text-center">{allow_videos_url ? "Si" : "No"}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold">Permitir documentos:</p>
            <p className="text-center">{allow_doctxt_url ? "Si" : "No"}</p>
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
    </>
  );
};
