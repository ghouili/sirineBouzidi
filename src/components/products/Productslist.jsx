import React, { useContext, useEffect, useState } from "react";

import { BiSearchAlt } from "react-icons/bi";
import { MdAddShoppingCart } from "react-icons/md";
import { ProductDetails } from "../../containers";
import { path } from "../../utils/Variables";
import axios from "axios";
import { GeneralContext } from "../../Hooks/context/GeneralContext";

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
  const { setProductDetails, addProductsToCart } = useContext(GeneralContext);
  const [data, setData] = useState([]);

  const fetchdata = async () => {
    const result = await axios.get(`${path}product/`);
    setData(result.data.data);
    // console.log(result.data.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="w-full ">
      <div className="px-4  sm:px-6 lg:px-8 py-16  ">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Our Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map(
            ({
              _id,
              company,
              model,
              price,
              picture,
              sop,
              eop,
              capacity,
              qte,
              userid,
            }) => (
              <div key={_id} className="relative shadow-md pb-2 bg-white">
                <div className=" aspect-h-2 aspect-w-3 overflow-hidden rounded-md ">
                  <img
                    src={`${path}uploads/images/${picture}`}
                    alt={`${model} name`}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full "
                  />
                </div>
                <div className="mt-4 flex justify-between px-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-700">
                      <span className="" />
                      {model}
                    </h3>
                    <p className="-mt-1 text-sm text-gray-500">{company}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{price}</p>
                </div>
                <div className="mt-4 flex justify-end gap-4 px-2">
                  <div
                    className="p-2 hover:shadow-md hover:text-blue-700 rounded-md cursor-pointer"
                    onClick={() => {
                      setProductDetails({
                        _id,
                        company,
                        model,
                        sop,
                        eop,
                        capacity,
                        qte,
                        price,
                        picture,
                        userid,
                        open: true
                      });
                    }}
                  >
                    <BiSearchAlt size={24} />
                  </div>
                  <div 
                  className="p-2 hover:shadow-md rounded-md hover:text-blue-700 cursor-pointer"
                    onClick={()=> addProductsToCart([{id: _id, qte: 1 }])}
                  >
                    <MdAddShoppingCart size={24} />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="">
        <ProductDetails />
      </div>
    </div>
  );
}
