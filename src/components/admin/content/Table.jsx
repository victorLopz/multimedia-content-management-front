import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { GridCells } from "./GridCells";
import "../../stylePaginate.css";
import { fetchConToken } from "../../../helpers/fetch";
import { debounce } from "../../../utils/functions";
import { SpinnerLoading } from "../../SpinnerLoading";
import { TAMANIO_PAGINA_POR_DEFECTO } from "../../../utils/constants";
import { Header } from "../../Header";
import { GridFooter } from "../../GridFooter";
import { GridItemsHeader } from "../../GridItemsHeader";
import { useSelector } from "react-redux";

const paramsOfTableAdmin = [
  { name: "Identificador" },
  { name: "Nombre del contenido" },
  { name: "Créditos" },
  { name: "Fecha de creación" },
  { name: "Acciones" }
];

export const Table = () => {
  const { Access } = useSelector((state) => state.auth);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(TAMANIO_PAGINA_POR_DEFECTO);
  const [content, setContent] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(false);
  const [respStore, setRespStore] = useState("");

  const getContents = useCallback(
    async ({ pageNumber, pageSize, paramFiltro }) => {
      setLoading(true);
      const resp = await fetchConToken(
        `content?search=${paramFiltro}&page=${
          pageNumber + 1
        }&limit=${pageSize}&filter=${respStore}`
      );
      const body = await resp.json();
      setContent(body.contents);
      setLoading(false);
    },
    [respStore]
  );

  useEffect(() => {
    getContents({ pageNumber, pageSize, paramFiltro: filtro });
  }, [pageNumber, pageSize, filtro, respStore, getContents]);

  const pageCount = Math.ceil(content.length / pageSize);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  const displayContent = content.map((item) => (
    <GridCells
      key={item._id}
      id={item._id}
      name={item.name}
      date={new Date(item.created_at).toLocaleDateString("es-ES", options)}
      credits={item.credits}
      frontImage={item.front_page_url}
      docTxt={item.url_doc_txt}
      image={item.img}
    />
  ));

  return (
    <>
      <Header
        nombre=""
        filtro={filtro}
        setFiltro={setFiltro}
        pagination={{
          totalItems: content.length,
          totalPages: pageCount,
          currentPage: pageNumber
        }}
        respStore={respStore}
        setRespStore={setRespStore}
        showFilter={true}
        showButton={true}
      />
      {loading ? (
        <SpinnerLoading />
      ) : (
        <div className="AppPaginationTeacher mt-5">
          {content.length > 0 ? (
            <>
              <div className="py-4 w-full">
                <GridItemsHeader
                  params={
                    Access.store === null
                      ? paramsOfTableAdmin
                      : paramsOfTableAdmin
                  }
                  styleTable={
                    Access.store === null ? "grid-cols-6" : "grid-cols-5"
                  }
                />
                {displayContent}
              </div>
              <div className="mb-1 hidden md:flex flex-row justify-between">
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  initialPage={pageNumber}
                  breakLabel={"..."}
                  marginPagesDisplayed={3}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
                <GridFooter pageSize={pageSize} setPageSize={setPageSize} />
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-80">
              <h1 className="text-2xl font-bold">No hay datos</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};
