import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import {
  Input,
  Button
} from "@material-tailwind/react";

import { IoTrashOutline } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

import { path } from "../../utils/Variables";
import { TfiQuoteLeft } from "react-icons/tfi";


const ProductItem = ({
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
  updateQte
}) => {
  // let value = 0;
  const [stock, setStock] = useState(0);
  return (
    <div
      key={_id}
      className="relative shadow-md pb-2 bg-white rounded-md "
    >
      <div className=" aspect-h-2 aspect-w-3 overflow-hidden rounded-t-md ">
        <img
          src={`${path}uploads/images/${picture}`}
          alt="product_pic"
          className="h-full w-full object-cover object-center "
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
      <div className="flex justify-between gap-4 w-full text-gray-700 items-center font-medium text-lg px-5 my-1">
        <div>
          <input
            type="text"
            id="small-input"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="button"
          className="relative w-24 inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
          onClick={() => {
            updateQte(_id, stock);
            setStock(0);
          }}
        >
          <span className="relative w-full flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
            <BsPencilSquare />
            Add
          </span>
        </button>
      </div>
    </div>
  );
};


const Stock = () => {
  const [openModal, setOpenModal] = useState(false);
  
  const [prducts, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState([]);
  
  /// fitering data using seaarch input ::
  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = Object.values(item).join(" ").toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setSearch(text);
    } else {
      setfilterData(masterData);
      setSearch(text);
    }
  };

  const fetchdata = async () => {
    const result = await axios.get(`${path}product/`);
    // setData(result.data.data);
    setMasterData(result.data.data);
    setfilterData(result.data.data);
    // console.log(result.data.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const updateQte = async (id, qte) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: `Are you sure that ${qte} of this product are in our stock?`,
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        let url = `${path}product/stock/${id}`;
        let result = await axios.put(url, { stock: qte });

        console.log(result);
        if (result.data.success === true) {
          // setStock(0);
          fetchdata();
          swal("Success!", result.data.message, "success");
        } else {
          return swal("Error!", result.data.message, "error");
        }
      } catch (error) {
        console.error(error);
        return swal(
          "Error!",
          "Something went wrong. Please try again later.",
          "error"
        );
      }
    }
  };

  return (
    <div className="relative flex flex-col gap-4 p-6">
      <div className="flex flex-row justify-between items-center px-4 py-2 bg-white rounded-md">
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <Link to="/" className="font-medium hover:text-blue-900">
            Dashboard
          </Link>
          <span className="font-medium">/</span>
          <span className="">Stock</span>
        </div>

        <div className="relative flex w-full max-w-[24rem]">
          <Input
            type="search"
            label="Search products.."
            value={search}
            onChange={(e) => searchFilter(e.target.value)}
            className="pr-24 border-blue-700"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            className="!absolute right-1 top-1 rounded bg-blue-700"
          >
            Search
          </Button>
        </div>
      </div>
      <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filterData
          .slice(0)
          .reverse()
          .map((item) => <ProductItem key={item._id} {...item} updateQte={updateQte} />)}
      </div>
    </div>
  );
};

export default Stock;
