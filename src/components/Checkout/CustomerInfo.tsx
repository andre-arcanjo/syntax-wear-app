import { useAuth } from "../../context/AuthContext/AuthContext";

export const CustomerInfo = () => {

     const { user } = useAuth();

     return (
     <div className="rounded-2xl bg-white flex flex-col  gap-3 py-4 px-3">
            <h2 className="text-xl font-bold">Identificação</h2>

            <div className="rounded-[28px]">
              <p className="text-sm text-[#C5C5C5]">{user?.email}</p>
              <p className="text-sm text-[#C5C5C5]">{user?.firstName}</p>

              <div className="flex gap-4 rounded-2xl bg-[#F5F5F7] p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white text-sm">
                  !
                </span>
                <div className="space-y-1">
                  <p className="text-sm text-black">
                    Antes de continuar, verifique se o telefone para contato
                    está correto.
                  </p>
                  <p className="text-sm font-semibold">{user?.phone}</p>
                </div>
              </div>

              <button
                type="button"
                className="text-sm font-semibold text-[#339CF1] hover:underline"
              >
                editar telefone
              </button>
            </div>
          </div>
     )
          
}