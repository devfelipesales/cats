import Image from "next/image";

export default function ImagePreview({ url }: { url?: string }) {
  return (
    <div>
      {url && (
        <Image
          src={url}
          alt="cat"
          width={300}
          height={300}
          className="mt-5 h-[300px] rounded object-cover shadow-xl"
          priority
        />
      )}
    </div>
  );
}
