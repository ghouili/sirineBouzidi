import React, { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IoTrashOutline } from "react-icons/io5";

import { GeneralContext } from "../../Hooks/context/GeneralContext";
import { path } from "../../utils/Variables";
import { Pay } from "../../components";

import { deleteCartFromCookies, saveCartToCookies } from "./CartAcion";
import Cookies from "universal-cookie";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const ProductsCart = () => {
  const navigate = useNavigate();
  let user = cookies.get('user');

  const { openCart, setOpenCart, cartItems, updateCartItemQte, openPay, setOpenPay, deleteCartItem, setCartItems } =
    useContext(GeneralContext);
  const [qtes, setQtes] = useState(1);
  const [products, setProducts] = useState([]);
  const [payment, setPayment] = useState(false);

  const fetchProducts = async () => {
    const result = await axios.get(`${path}product`);
    if (!result.data.success) {
      return null;
    }
    setProducts(result.data.data);
  };

  const PayProcess = async () => {
    console.log(cartItems);
    if (cartItems.length === 0) {
      return swal("Warning!!", "There's nothing to Pay for!", "warning");
    }
    if (!user){
      return navigate('/login');
    }
   
      
      let url = `${path}order/add`;
      let meth = "POST";
      
      try {
        const response = await fetch(url, {
          method: meth,
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_client: user._id,
            date: new Date(),
            adresse: user.adress,
            note: 'nothing to mention',
            etat: false,
            products: cartItems
          })
        });
  
        const result = await response.json();
  
        console.log(result);
        if (result.success === true) {
          // swal("Success!", result.message, "success");
          // deleteCartFromCookies();
          setCartItems([]);
          await cookies.remove('cart', { path: '/' });
          setOpenPay(!openPay);
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
    
    
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Transition.Root show={openCart} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 w-full h-full"
        onClose={() => setOpenCart(!openCart)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm transition-opacity md:block" />
        </Transition.Child>

        <div
          className="fixed top-10  right-10 z-10 overflow-x-auto "
          style={{ width: "60vw" }}
        >
          <div className="relative flex items-start justify-center text-center md:items-start md:px-2 lg:px-4 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl rounded-sm sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setOpenCart(!openCart)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon
                      className="h-6 w-6"
                    />
                  </button>

                  <div className="w-full ">
                    <h2 className="text-2xl font-bold text-blue-900 sm:pr-12">
                      Products Your chose :
                    </h2>
                    <div className="w-full flex flex-col divide-y ">
                      {cartItems.length === 0 ? (
                        <h1 className="text-2xl font-semibold text-gray-400 mt-10">
                          Cart is Empty
                        </h1>
                      ) : (
                        <>
                          {cartItems.map(({ id, qte }, index) => {
                            let item = products.find((item) => item._id === id);
                            return (
                              <div
                                key={index}
                                className="flex items-center justify-evenly divide-x gap-4 border"
                              >
                                <div className="w-20 h-20 flex items-center justify-center">
                                  <img
                                    // src={`${path}uploads/images/VW_ID4.png`}
                                    src={`${
                                      item &&
                                      `${path}uploads/images/${item.picture}`
                                    }`}
                                    // alt={`${item.picture}`}
                                    alt="pic"
                                    className=" h-full w-auto object-cover object-center"
                                  />
                                </div>
                                <div className="w-2/6 pl-4 flex flex-col items-start justify-center font-medium">
                                  <h2 className="text-base">
                                    {item && item.model}
                                  </h2>
                                  <p className="text-xs -mt-1">
                                    {item && item.company}
                                  </p>
                                </div>

                                <div className="w-1/6 flex items-center justify-center">
                                  <label
                                    htmlFor="qteID"
                                    className=" border rounded-md flex items-center h-fit shadow-transparent"
                                  >
                                    <input
                                      type="text"
                                      name="qte"
                                      id="qteID"
                                      value={qte}
                                      onChange={(e) => {
                                        // if (!isNaN(+e.target.value)) {
                                        //   setQtes(e.target.value);
                                        // }
                                        updateCartItemQte(
                                          index,
                                          e.target.value
                                        );
                                      }}
                                      className=" w-10 h-7 text-center text-xl font-semibold focus:outline-none"
                                    />
                                    <div className="flex h-full flex-col">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (!isNaN(+qte)) {
                                            updateCartItemQte(
                                              index,
                                              Number(qte) + 1
                                            );
                                            // setQtes(Number(qtes) + 1);
                                          } else {
                                            updateCartItemQte(index, qte + 1);
                                            // setQtes(qtes + 1);
                                          }
                                        }}
                                        className="border-l border-b px-2 "
                                      >
                                        +
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (!isNaN(+qte)) {
                                            // setQtes(Number(qtes) - 1);
                                            updateCartItemQte(
                                              index,
                                              Number(qte) - 1
                                            );
                                          } else {
                                            // setQtes(qtes - 1);
                                            updateCartItemQte(index, qte - 1);
                                          }
                                        }}
                                        className="border-l border-t px-2"
                                      >
                                        -
                                      </button>
                                    </div>
                                  </label>
                                </div>
                                <div className="w-1/6 flex items-center justify-center">
                                  {item && item.price * qte} Dt
                                </div>
                                <div className="w-1/6 flex items-center justify-center">
                                  <div
                                    className="p-2 hover:shadow-md rounded-md text-red-500 hover:text-red-800 cursor-pointer"
                                    onClick={() => deleteCartItem(index)}
                                  >
                                    <IoTrashOutline size={20} />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                      <div className="w-full flex justify-end gap-6 pt-6">
                        <button
                          type="button"
                          className="text-white bg-gradient-to-br from-red-400 to-pink-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 font-medium rounded-md text-lg px-3 py-1.5 text-center "
                          onClick={() => setOpenCart(!openCart)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={PayProcess}
                          // onClick={() => {
                          //   if (cartItems.length !== 0) {
                          //     setOpenCart(!openCart);
                          //     setOpenPay(!openPay);
                          //   }
                          // }}
                          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-md text-lg px-3 py-1.5 text-center "
                        >
                          Pay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ProductsCart;
