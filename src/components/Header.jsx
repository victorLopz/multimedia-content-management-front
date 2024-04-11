import React from "react";
import { Filtros } from "./Filtros";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GridSearchBar } from "./GridSearchBar";
import { RiFileExcel2Fill, RiBook3Line } from "react-icons/ri";
import { fetchConToken } from "../helpers/fetch";

export const Header = ({
  filtro,
  setFiltro,
  showButton,
  showFilter,
  urlXlsx,
  respStore,
  setRespStore
}) => {
  const { Access } = useSelector((state) => state.auth);

  // Create functionn to download file async
  const downloadFile = async () => {
    if (urlXlsx === "" || urlXlsx === null || urlXlsx === undefined) return;

    const response = await fetchConToken(urlXlsx);
    const blob = await response.blob();
    // 2. Create blob link to download
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Productos.xlsx`);
    // 3. Append to html page
    document.body.appendChild(link);
    // 4. Force download
    link.click();
    // 5. Clean up and remove the link
    link.parentNode.removeChild(link);
  };

  return (
    <div
      className={`w-full flex flex-col md:flex-row ${
        showButton ? "justify-between" : "justify-end"
      } items-center mt-4`}
    >
      <div className="flex gap-4">
        {showButton && (
          <Link
            to="agregar/nuevo"
            className="bg-secundario px-4 py-2 rounded-md text-white font-medium"
            onClick={() => console.log("Clic en el enlace")}
          >
            +
          </Link>
        )}
      </div>

      <div className={`flex flex-col md:flex-row gap-4 justify-end w-full`}>
        {showFilter && (
          <Filtros
            respStore={respStore}
            setRespStore={setRespStore}
            access={Access}
          />
        )}
        <GridSearchBar filtro={filtro} setFiltro={setFiltro} />
      </div>
    </div>
  );
};
