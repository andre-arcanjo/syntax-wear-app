import banner from "../../assets/images/grid/card_imagem.jpg";
import tenisRoxo from "../../assets/images/grid/card-tenis-roxo-e-verde.svg";
import modelo from "../../assets/images/grid/card-modelo.svg";
import tenisColorido from "../../assets/images/grid/card-tenis-colorido.svg";
import tenisBrancoEPreto from "../../assets/images/grid/card-tenis-preto-azul.svg";
import tenisCinza from "../../assets/images/grid/card-tenis-cinza.svg";
import { Overlay } from "../Overlay";
import { Button } from "../Button";
import { useRouter } from "@tanstack/react-router";

export const Gallery = () => {

    const router = useRouter();

  return (
    <section className="container grid grid-cols-12 gap-2.5 md:gap-7 mb-10">
      <div className="relative col-span-12 row-span-3 md:col-span-6 order-1">
        <img
          className="w-full h-full object-cover rounded-[20px]"
          src={banner}
          alt="Banner"
        />

        <Overlay
          title="Kripton One"
          subtitle="Estilo urbano com atitude"
          className="inset-0 justify-center absolute"
        >
          <Button variant="secondary" onClick={() => router.navigate({ to: "/products/category/$category", params: { category: "feminino"},})}>Feminino</Button>
          <Button variant="secondary" onClick={() => router.navigate({ to: "/products/category/$category", params: { category: "masculino"},})}>Masculino</Button>
        </Overlay>
      </div>

      <div className="col-span-12 row-span-1 md:col-span-6 order-6 md:order-2">
        <img
          className="w-full h-full object-cover rounded-[20px]"
          src={tenisRoxo}
          alt="Tênis Roxo"
        />
      </div>

      <div className="col-span-6 row-span-6 md:col-span-3 order-3">
        <img
          className="w-full h-full object-cover rounded-[20px]"
          src={modelo}
          alt="Modelo"
        />
      </div>

      <div className="col-span-6 row-span-3 md:col-span-3 order-4">
        <img src={tenisColorido} alt="Tênis Colorido" />
      </div>

      <div className=" col-span-12 row-span-4 md:col-span-6 order-2 md:order-5">
        <img
          className="w-full h-full object-cover rounded-[20px]"
          src={tenisBrancoEPreto}
          alt="Tênis Preto e Branco"
        />
      </div>

      <div className="col-span-6 row-span-3 md:col-span-3 order-4 md:order-6">
        <img
          className="w-full h-full object-cover rounded-[20px]"
          src={tenisCinza}
          alt="Tênis Cinza"
        />
      </div>
    </section>
  );
};
