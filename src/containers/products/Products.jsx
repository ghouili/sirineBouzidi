import axios from "axios";
import React, { useEffect, useState } from "react";

import { BsPencilSquare } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";

import { path } from "../../utils/Variables";
import { Link } from "react-router-dom";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);

  const [data, setData] = useState([
    {
      _id: 1,
      model: "V.W ID7",
      picture: "VW_ID7.png",
      price: "$35 000",
      company: "Volkswagen",
    },
  ]);

  const [errors, setErrors] = useState({
    model: null,
  });


  return (
    <div className="relative flex flex-col gap-4 p-6">
      <div className="flex flex-row justify-between items-center px-4 py-2 bg-white rounded-md">
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <Link to="/" className="font-medium hover:text-blue-900">
            Dashboard
          </Link>
          <span className="font-medium">/</span>
          <span className="">Products</span>
        </div>
        <div className="flex gap-4 items-center">
          <button
            className=" relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 "
            onClick={() => setOpenModal(!openModal)}
          >
            <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
              Add Product
            </span>
          </button>
        </div>
      </div>
      <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data
          .slice(0)
          .reverse()
          .map(
            ({
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
            }) => {
              return (
                <div key={_id} className="relative shadow-md pb-2 bg-white">
                  <div className=" aspect-h-2 aspect-w-3 overflow-hidden rounded-md ">
                    <img
                      src={`${path}uploads/images/${picture}`}
                      alt="product_pic"
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
                    <p className="text-sm font-medium text-gray-900">
                      {price} DT
                    </p>
                  </div>
                  <div className="w-full border my-2"></div>
                  <div className="flex justify-between w-full text-gray-700 items-center font-medium text-lg px-5 my-1">
                    <button
                      type="button"
                      className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                      // onClick={() => setOpenModal(!openModal)}
                    >
                      <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                        <BsPencilSquare />
                        Update
                      </span>
                    </button>

                    <button
                      type="button"
                      // onClick={() => Delete(_id)}
                      className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-red-500 group-hover:from-pink-500 group-hover:to-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 "
                    >
                      <span className="relative flex items-center gap-1 px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                        <IoTrashOutline />
                        Delete
                      </span>
                    </button>
                  </div>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};

export default Products;
