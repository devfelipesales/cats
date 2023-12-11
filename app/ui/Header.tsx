import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className='border-b border-b-gray-200 center'>
      <div className='flex gap-2 justify-between items-center container'>
        <Link href='/' title='cats'>
          {/* <Image src='/logo-cat2.svg' alt='cat logo' width={64} height={64} /> */}
          <Image src='/logocats.png' alt='cat logo' width={80} height={80} />
        </Link>

        <Link href='/login' className='flex gap-3 items-center text-indigo-800'>
          Login / Criar
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='#3730a3'
            className='w-7 h-7'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
