"use client";

import { useState } from "react";

function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  const getUrl = (path: string) => {
    if (path.startsWith("http")) return path;
    const base = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api").replace("/api", "");
    return `${base}${path}`;
  };

  if (!images?.length) {
    return (
      <div className="aspect-square rounded-xl bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400">Rasm yo&apos;q</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square rounded-xl overflow-hidden border border-gray-100">
        <img
          src={getUrl(images[active])}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                active === i
                  ? "border-[#173F5F]"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <img
                src={getUrl(img)}
                alt={`${title} ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
