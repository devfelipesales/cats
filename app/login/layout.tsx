import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className=" mx-auto grid min-h-screen max-w-[1600px] items-start md:grid-cols-[1.4fr,1.1fr] md:items-center">
      <Image
        src="/loginphoto.jpg"
        alt="Foto da Página de Login"
        width={0}
        height={0}
        sizes="100vw"
        className="hidden h-full w-full object-cover md:block"
        priority
      />

      {children}
    </section>
  );
}
