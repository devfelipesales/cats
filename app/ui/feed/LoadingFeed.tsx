import Image from "next/image";
import React from "react";
import { clsx } from "clsx";

export default function LoadingFeed() {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    function updateStep() {
      setStep((step) => {
        if (step <= 3) return step + 1;
        else return 0;
      });
    }
    const interval = setInterval(updateStep, 700);
    // Essa funcão de callback é chamada quando o componente é desmontado.
    // Logo, ao desmontar o componente, limpa-se a constante do setInterval para não ocorrer vazamento de memória
    return () => {
      clearInterval(interval);
    };
  }, [step]);

  return (
    <>
      <div className="mt-[100px] flex flex-col items-center">
        <Image
          src="/foot.svg"
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          priority
          className={clsx(
            "ml-24 h-auto w-16 rotate-12 opacity-0 transition-opacity",
            {
              "opacity-80": step === 4,
            },
          )}
        />
        <Image
          src="/foot.svg"
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className={clsx(
            "mr-10 h-auto w-16 rotate-12 opacity-0 transition-opacity",
            {
              "opacity-80": step >= 3,
            },
          )}
        />
        <Image
          src="/foot.svg"
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className={clsx(
            "ml-24 h-auto w-16 rotate-12 opacity-0 transition-opacity",
            {
              "opacity-80": step >= 2,
            },
          )}
        />
        <Image
          src="/foot.svg"
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className={clsx(
            "mr-10 h-auto w-16 rotate-12 opacity-0 transition-opacity",
            {
              "opacity-80": step >= 1,
            },
          )}
        />
      </div>
    </>
  );
}
