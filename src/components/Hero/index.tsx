import { useRouter } from '@tanstack/react-router';
import Banner from '../../assets/images/hero/banner.svg';
import { Button } from '../ui/Button';
import { Overlay } from '../ui/Overlay';

export const Hero = () => {
  const router = useRouter();

  const KryptonOneId = 16;

  return (
    <>
      <div className="container">
        <section className="relative h-125 rounded-[20px] mb-10">
          <img
            src={Banner}
            alt="Homem sentado com os tênis da SyntawWear"
            className="w-full h-full object-cover rounded-[20px]"
          />

          <Overlay
            title="Kripton One"
            subtitle="Transforme qualquer passo em presença"
            className="bottom-0 px-6 md:px-24 pb-24 justify-end md:items-end"
          >
            <Button
              variant="secondary"
              onClick={() =>
                router.navigate({
                  to: '/products',
                })
              }
            >
              Ver modelos
            </Button>
            <Button
              onClick={() =>
                router.navigate({
                  to: '/products/$productId',
                  params: {
                    productId: KryptonOneId.toString(),
                  },
                })
              }
            >
              Comprar
            </Button>
          </Overlay>
        </section>
      </div>
    </>
  );
};
