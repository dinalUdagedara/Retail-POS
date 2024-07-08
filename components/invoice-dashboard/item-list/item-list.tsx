"use client"
import Image from "next/image";
const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "/assets/hiru.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Casual Shirt",
    href: "#",
    imageSrc:
      "/assets/araliya.jpg",
    imageAlt: "Front of men's Casual Shirt in black.",
    price: "$45",
    color: "Black",
  },
  {
    id: 3,
    name: "Sporty Jacket",
    href: "#",
    imageSrc:
      "/assets/hiru.jpg",
    imageAlt: "Front of men's Sporty Jacket in black.",
    price: "$75",
    color: "Black",
  },
  {
    id: 4,
    name: "Slim Fit Jeans",
    href: "#",
    imageSrc:
      "/assets/hiru.jpg",
    imageAlt: "Front of men's Slim Fit Jeans in black.",
    price: "$55",
    color: "Black",
  },
  {
    id: 5,
    name: "Formal Trousers",
    href: "#",
    imageSrc:
      "/assets/hiru.jpg",
    imageAlt: "Front of men's Formal Trousers in black.",
    price: "$60",
    color: "Black",
  },
  {
    id: 6,
    name: "Classic Blazer",
    href: "#",
    imageSrc:
      "/assets/hiru.jpg",
    imageAlt: "Front of men's Classic Blazer in black.",
    price: "$120",
    color: "Black",
  },
  {
    id: 7,
    name: "Cotton Shorts",
    href: "#",
    imageSrc:
      "/assets/hiru.jpg",
    imageAlt: "Front of men's Cotton Shorts in black.",
    price: "$25",
    color: "Black",
  },
  {
    id: 8,
    name: "Polo T-shirt",
    href: "#",
    imageSrc:
      "/assets/hiru.jpg",
    imageAlt: "Front of men's Polo T-shirt in black.",
    price: "$30",
    color: "Black",
  },
  {
    id: 9,
    name: "Leather Belt",
    href: "#",
    imageSrc:
      "/assets/hiru.jpg",
    imageAlt: "Front of men's Leather Belt in black.",
    price: "$40",
    color: "Black",
  },
  {
    id: 10,
    name: "Sneakers",
    href: "#",
    imageSrc:
      "/assets/hiru.jpg",
    imageAlt: "Front of men's Sneakers in black.",
    price: "$80",
    color: "Black",
  },
];

export default function ItemList() {
  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6  lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 ">
         Items
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 min-h-6">
               
                <Image
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  layout="responsive"
                  width={1000}
                  height={1000}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
