import React from "react";

import { BiSearchAlt } from "react-icons/bi";
import { MdAddShoppingCart } from "react-icons/md";

const products = [
  {
    id: 1,
    model: "V.W ID7",
    href: "#",
    imageSrc: "http://localhost:5000/uploads/images/VW_ID7.png",
    imageAlt: " V.W ID7",
    price: "$35 000",
    companie: "Volkswagen",
  },
  {
    id: 2,
    model: "V.W ID4",
    href: "#",
    imageSrc: "http://localhost:5000/uploads/images/VW_ID4.png",
    imageAlt: " V.W ID4",
    price: "$35 000",
    companie: "Volkswagen",
  },
  {
    id: 3,
    model: "Passat B8",
    href: "#",
    imageSrc: "http://localhost:5000/uploads/images/passat.png",
    imageAlt: " Passat B8",
    price: "$35 000",
    companie: "Volkswagen",
  },
  {
    id: 4,
    model: "Transporter T7",
    href: "#",
    imageSrc: "http://localhost:5000/uploads/images/VW_T7.png",
    imageAlt: "Transporter T7 ",
    price: "$35 000",
    companie: "Volkswagen",
  },
];

export default function Productslist() {
  return (
    <div className="w-full ">
      <div className="px-4  sm:px-6 lg:px-8 py-16  ">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Our Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="relative shadow-md pb-2 bg-white">
              <div 
              className=" aspect-h-2 aspect-w-3 overflow-hidden rounded-md "
              >
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full "
                />
              </div>
              <div className="mt-4 flex justify-between px-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-700">
                    <span className="" />
                    {product.model}
                  </h3>
                  <p className="-mt-1 text-sm text-gray-500">
                    {product.companie}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
              <div className="mt-4 flex justify-end gap-4 px-2">
                <div className="p-2 hover:shadow-md hover:text-blue-700 rounded-md cursor-pointer">
                  <BiSearchAlt size={24} />
                </div>
                <div className="p-2 hover:shadow-md rounded-md hover:text-blue-700 cursor-pointer">
                  <MdAddShoppingCart size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
