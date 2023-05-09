import React, { Fragment, useContext, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MdAddShoppingCart } from "react-icons/md";

import { GeneralContext } from "../../Hooks/context/GeneralContext";
import { path } from "../../utils/Variables";


const ProductDetails = () => {

  const { productDeatails, setProductDetails } = useContext(GeneralContext);

  return (
    <Transition.Root show={productDeatails.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setProductDetails({ open: false })}
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
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
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
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setProductDetails({ open: false })}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img
                        src={`${path}uploads/images/${productDeatails.picture}`}
                        alt={`${productDeatails.model} name`}
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        {productDeatails.model}
                      </h2>
                      <p className="-mt-1 text-sm text-gray-500">
                        {productDeatails.company}
                      </p>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <h3 id="information-heading " className="sr-only">
                          Product information
                        </h3>

                        <p className="text-2xl text-blue-700 font-semibold">
                          {productDeatails.price} Dt
                        </p>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="my-4"
                      >
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        <form>
                          {/* Colors */}
                          <div>
                            <h4 className="text-base font-medium text-gray-900">
                              SOP: {productDeatails.sop}
                            </h4>
                            <h4 className="text-base font-medium text-gray-900">
                              SOP: {productDeatails.eop}
                            </h4>
                            <h4 className="text-base font-medium text-gray-900">
                              Capacity: {productDeatails.capacity}
                            </h4>
                          </div>

                          <div className="mt-4 flex justify-end gap-4 px-2">
                            <div 
                              className="p-2 hover:shadow-md rounded-md hover:text-blue-700 cursor-pointer"
                              onClick={()=>{}}
                            >
                              <MdAddShoppingCart size={34} />
                            </div>
                          </div>
                        </form>
                      </section>
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

export default ProductDetails;
