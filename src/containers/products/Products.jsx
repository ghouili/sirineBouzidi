import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useRef } from "react";
import {
  Input,
  Button
} from "@material-tailwind/react";


import { BsPencilSquare } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";

import { path } from "../../utils/Variables";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const [picture, setPicture] = useState(null);
  const [model, setModel] = useState("");
  const [company, setCompany] = useState("");
  const [sop, setSop] = useState("");
  const [eop, setEop] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [qte, setQte] = useState("");
  const [id, setid] = useState(null);
  const [errors, setErrors] = useState({
    model: null,
    company: null,
    sop: null,
    eop: null,
    capacity: null,
    price: null,
    qte: null,
  });

  const [data, setData] = useState([]);

  const [filterData, setfilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState([]);
  //image related
  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();
  let subtitle;

  useEffect(() => {
    if (!File) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(File);
  }, [File]);

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

  // handelie uploading image:::
  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    /* props.onInput(props.id, pickedFile, fileIsValid); */
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

  const CloseModal = async () => {
    setPicture(null);
    setModel("");
    setCompany("");
    setSop("");
    setEop("");
    setCapacity("");
    setPrice("");
    setQte("");
    setid(null);
    setFile(null);
    setPreviewUrl(null);
    setOpenModal(false);
  };

  const onchange = (e) => {
    if (e.target.name === "company") {
      setCompany(e.target.value);
      if (e.target.value === "") {
        // errors.email = "Please enter a valid email address";
        setErrors((prevState) => ({
          ...prevState,
          company: "The company name musnt be empty",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          company: null,
        }));
      }
    } else if (e.target.name === "model") {
      setModel(e.target.value);
      if (e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          model: "model must not be Empty!!",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          model: null,
        }));
      }
    } else if (e.target.name === "sop") {
      setSop(e.target.value);
      if (e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          sop: "sop must not be Empty!!",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          sop: null,
        }));
      }
    } else if (e.target.name === "eop") {
      setEop(e.target.value);
      if (e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          eop: "Eop must not be Empty!!",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          eop: null,
        }));
      }
    } else if (e.target.name === "capacity") {
      setCapacity(e.target.value);
      if (e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          capacity: "capacity must not be Empty!!",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          capacity: null,
        }));
      }
    } else if (e.target.name === "price") {
      setPrice(e.target.value);
      if (e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          price: "price must not be Empty!!",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          price: null,
        }));
      }
    } else if (e.target.name === "qte") {
      setQte(e.target.value);
      if (e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          qte: "price must not be Empty!!",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          qte: null,
        }));
      }
    }
  };

  const update = (item) => {
    setid(item._id);
    setPicture(item.picture);
    setModel(item.model);
    setCompany(item.company);
    setSop(item.sop);
    setEop(item.eop);
    setCapacity(item.capacity);
    setPrice(item.price);
    setQte(item.qte);

    setOpenModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      errors.email != null ||
      errors.nom != null ||
      errors.prenom != null ||
      errors.cin != null ||
      errors.tel != null ||
      errors.adress != null ||
      errors.qte != null
    ) {
      return swal("Error!", "check your Inputs", "error");
    }

    const formData = new FormData();
    formData.append("picture", File);
    formData.append("company", company);
    formData.append("model", model);
    formData.append("sop", sop);
    formData.append("eop", eop);
    formData.append("capacity", capacity);
    formData.append("price", price);
    formData.append("qte", qte);
    formData.append("userid", "64464be8d52898a80054e9b5");
    let url, meth;
    if (id) {
      url = `${path}product/${id}`;
      meth = "PUT";
    } else {
      url = `${path}product/add`;
      meth = "POST";
    }
    try {
      const response = await fetch(url, {
        method: meth,
        // headers: {
        // "Content-Type": "multipart/form-data",
        // "accept": "*/*"
        // },
        body: formData,
      });

      const result = await response.json();

      console.log(result);
      if (result.success === true) {
        swal("Success!", result.message, "success");
        fetchdata();
        CloseModal();
      } else {
        return swal("Error!", result.message, "error");
      }
    } catch (error) {
      console.error(error);
      return swal(
        "Error!",
        "Something went wrong. Please try again later.",
        "error"
      );
    }
  };

  const delete_product = async (id) => {
    const result = await axios.delete(`${path}product/${id}`);

    if (result.data.success === true) {
      swal("Poof! Utilisateur supprimé avec succés!", {
        icon: "success",
      });
      fetchdata();
    } else {
      swal("Error!", result.data.message, "warning");
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
          <span className="">Products</span>
        </div>
        <div className="w-fit flex gap-10 items-center">
          <div className="relative flex w-full max-w-[24rem]">
            <Input
              type="search"
              label="Search Products.."
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
          <button
            className=" relative w-40 inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 "
            onClick={() => setOpenModal(!openModal)}
          >
            <span className="relative w-full px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
              Add Product
            </span>
          </button>
        </div>
      </div>
      <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filterData
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
                <div key={_id} className="relative shadow-md pb-2 bg-white rounded-md ">
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
                  <div className="flex justify-between w-full text-gray-700 items-center font-medium text-lg px-5 my-1">
                    <button
                      type="button"
                      className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                      onClick={() =>
                        update({
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
                        })
                      }
                    >
                      <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                        <BsPencilSquare />
                        Update
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => delete_product(_id)}
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

      {/* Modal */}
      {!openModal ? null : (
        <>
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-50 transition-opacity md:block " />
          <div
            className="absolute -top-2 right-1/4 w-fit h-fit bg-white border rounded-md shadow-xl p-6 overflow-y-auto 
          z-10"
            style={{ maxHeight: "88vh" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="">
                {previewUrl ? (
                  <div className=" w-44 h-hidden rounded-md shadow-inner mx-auto ">
                    <img
                      src={previewUrl}
                      // src={`https://i.pinimg.com/564x/22/7d/73/227d73d1ca2d45a6b4f196dc916b54a3.jpg`}
                      className="h-full w-full object-cover object-center rounded-md"
                      alt="avatr"
                    />
                  </div>
                ) : picture ? (
                  <div className=" relative w-44 h-hidden rounded-md shadow-inner mx-auto ">
                    <img
                      src={`${path}uploads/images/${picture}`}
                      alt="product_pic"
                      className="h-full w-full object-cover object-center rounded-md"
                    />
                    <label
                      htmlFor="pictureID"
                      className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
                    >
                      <BiEdit size={20} />
                      <input
                        type="file"
                        name="picture"
                        id="pictureID"
                        className="hidden"
                        accept=".jpg,.png,.jpeg"
                        ref={filePickerRef}
                        onChange={pickedHandler}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="w-full flex justify-center items-center pb-6 ">
                    <label
                      htmlFor="pictureID"
                      className="mx-auto w-fit flex flex-col items-center justify-center rounded-lg border-2 border-gray-700 p-4 text-gray-700 cursor-pointer"
                    >
                      <FiUpload size={30} />
                      <input
                        type="file"
                        name="picture"
                        id="pictureID"
                        className="hidden"
                        accept=".jpg,.png,.jpeg"
                        ref={filePickerRef}
                        onChange={pickedHandler}
                      />
                      <span className="text-gray-700">Select a picture</span>
                    </label>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {/* company */}
                  <div className="w-96">
                    <label
                      for="companyID"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Comapy Name:
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="companyID"
                      value={company}
                      onChange={(e) => onchange(e)}
                      placeholder="Company"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                     dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  {/* Model */}
                  <div className="w-96">
                    <label
                      for="modelID"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Car Model:
                    </label>
                    <input
                      type="text"
                      name="model"
                      id="modelID"
                      value={model}
                      onChange={(e) => onchange(e)}
                      placeholder="Model"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  {/* SOP */}
                  <div className="w-96">
                    <label
                      for="sopID"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      SOP:
                    </label>
                    <input
                      type="text"
                      name="sop"
                      id="sopID"
                      value={sop}
                      onChange={(e) => onchange(e)}
                      placeholder="SOP"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  {/* EOP */}
                  <div className="w-96">
                    <label
                      for="eopID"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      EOP:
                    </label>
                    <input
                      type="text"
                      name="eop"
                      id="eopID"
                      value={eop}
                      onChange={(e) => onchange(e)}
                      placeholder="EOP"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  {/* Capacity */}
                  <div className="w-96">
                    <label
                      for="capacityID"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Capacity:
                    </label>
                    <input
                      type="text"
                      name="capacity"
                      id="capacityID"
                      value={capacity}
                      onChange={(e) => onchange(e)}
                      placeholder="Capacity"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  {/* Price */}
                  <div className="w-96">
                    <label
                      for="priceID"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price:
                    </label>
                    <input
                      type="Number"
                      name="price"
                      id="priceID"
                      value={price}
                      onChange={(e) => onchange(e)}
                      placeholder="Price"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  {/* QTE */}
                  <div className="w-96">
                    <label
                      for="qteID"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Quentity:
                    </label>
                    <input
                      type="Number"
                      name="qte"
                      id="qteID"
                      value={qte}
                      onChange={(e) => onchange(e)}
                      placeholder="Qte"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="w-full flex gap-6 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => CloseModal()}
                    className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2 text-center "
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center "
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
