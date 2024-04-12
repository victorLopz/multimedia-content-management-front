import { Lucide } from "@/base-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { SpinnerLoading } from "../components/SpinnerLoading";

function Main() {
  const { Access } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    cantContent: 67,
    cantThemes: 9,
    userRegistered: 10
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <SpinnerLoading />
  ) : (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <div className="grid grid-cols-12 gap-6">
          {/* BEGIN: General Report */}
          <div className="col-span-12 mt-8">
            <div className="intro-y flex items-center h-10">
              <h2 className="text-xl font-medium truncate mr-5 first-letter:uppercase">
                {Access.name}
              </h2>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="CreditCard"
                        className="report-box__icon text-pending"
                      />
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      {data.cantThemes}
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Cantidad de temas
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="Monitor"
                        className="report-box__icon text-warning"
                      />
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      {data.cantContent}
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Total de contenidos
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="User"
                        className="report-box__icon text-success"
                      />
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      {data.userRegistered}
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Usuarios Registrados
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
