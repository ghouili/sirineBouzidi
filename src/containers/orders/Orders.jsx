import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import {
  Input,
  Button
} from "@material-tailwind/react";

import { IoTrashOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { HiLocationMarker, HiOutlineMail } from "react-icons/hi";
import { BsPersonVcard, BsPhone } from "react-icons/bs";
import { MdOutlineBadge } from "react-icons/md";

import { path } from "../../utils/Variables";

const Orders = () => {
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

  const fetchusers = async () => {
    const result = await axios.get(`${path}user/`);

    setUsers(result.data.data);
  };

  const fetchProds = async () => {
    const result = await axios.get(`${path}product/`);

    setProducts(result.data.data);
  };

  const fetchdata = async () => {
    const result = await axios.get(`${path}order/`);
    // setData(result.data.data);
    setMasterData(result.data.data);
    setfilterData(result.data.data);
    // console.log(result.data.data);
  };

  useEffect(() => {
    fetchdata();
    fetchProds();
    fetchusers();
  }, []);


  const order_status = async (id, status) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that this order was delivred ?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        let url = `${path}order/status/${id}`;
        let result = await axios.put(url, { etat: status });

        console.log(result);
        if (result.data.success === true) {
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

  const delete_order = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this Admin?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      const result = await axios.delete(`http://localhost:5000/order/${id}`);

      if (result.data.success) {
        swal("Success!", result.data.message, "success");
        fetchdata();
        fetchProds();
        fetchusers();
      } else {
        return swal("Error!", result.adta.message, "error");
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
          <span className="">Orders</span>
        </div>
        
        <div className="relative flex w-full max-w-[24rem]">
          <Input
            type="search"
            label="Search orders.."
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
      <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
        {filterData
          .slice(0)
          .reverse()
          .map(({ _id, id_client, date, note, adresse, etat, products }) => {
            // let product =  products.filter(product => {
            //     return product._id === ;
            //   });
            
            let client = users.filter((user) => {
              return user._id === id_client;
            });
            return (
              <div key={_id} className="bg-white shadow border rounded-md p-4">
                <div className="w-full flex justify-center gap-4 items-center text-xl font-semibold text-blue-950 px-2">
                  <h2 className="text-base font-medium text-center">
                    Order ID: {_id}
                  </h2>
                </div>
                <div className="w-full border my-2" />
                <div className="w-full flex items-center text-gray-700">
                  <HiLocationMarker size={20} />
                  <h2>Address: {adresse}</h2>
                </div>
                <div className="w-full flex items-center text-gray-700">
                  <HiOutlineMail size={20} />
                  <h2>Date: {date}</h2>
                </div>
                <div className="w-full flex items-center text-gray-700">
                  <BsPersonVcard size={20} />
                  <h2>
                    Client : {client && client.nom} {client && client.prenom}
                  </h2>{" "}
                  <br />
                  <h2>Phone : {client && client.tel}</h2>
                </div>
                <div className="w-full flex items-center text-gray-700">
                  <MdOutlineBadge size={20} />
                  <h2>Note: {note}</h2>
                </div>
                <div className="w-full flex items-center text-gray-700">
                  <BsPhone size={20} />
                  <h2>Products:</h2>
                </div>
                <ul className="list-disc ml-8">
                  {products.map(({ id, qte }) => {
                    let prod = products.filter((product) => {
                      return product._id === id;
                    });
                    return (
                      <li key={id}>
                        Product : {prod && prod.model} | Quantity: {qte}
                      </li>
                    );
                  })}
                </ul>
                <div className="w-full border my-2" />
                <div className="flex justify-between w-full text-gray-700 items-center font-medium text-lg px-5 pt-1">
                  {etat ? null : (
                    <button
                      type="button"
                      className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                      onClick={() => order_status(_id, true)}
                    >
                      <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                        <CiDeliveryTruck />
                        Delivred
                      </span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => delete_order(_id)}
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
          })}
      </div>
    </div>
  );
};

export default Orders;
