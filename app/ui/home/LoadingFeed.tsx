import Image from 'next/image';
import React from 'react';
import { clsx } from 'clsx';

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
      <div className='flex flex-col items-center mt-[100px]'>
        <Image
          src='/foot.svg'
          alt=''
          width={67}
          height={72}
          className={clsx('ml-24 rotate-12 opacity-0 transition-opacity', {
            'opacity-80': step === 4,
          })}
        />
        <Image
          src='/foot.svg'
          alt=''
          width={67}
          height={72}
          className={clsx('rotate-12 mr-10 opacity-0 transition-opacity', {
            'opacity-80': step >= 3,
          })}
        />
        <Image
          src='/foot.svg'
          alt=''
          width={67}
          height={72}
          className={clsx('ml-24 rotate-12 opacity-0 transition-opacity', {
            'opacity-80': step >= 2,
          })}
        />
        <Image
          src='/foot.svg'
          alt=''
          width={67}
          height={72}
          className={clsx('rotate-12 mr-10 opacity-0 transition-opacity', {
            'opacity-80': step >= 1,
          })}
        />
      </div>
    </>
  );
}
