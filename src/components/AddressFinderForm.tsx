/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useRef, useState } from "react";
import { AddressFinder } from "@ideal-postcodes/address-finder";
import { type GbrAddress } from ".pnpm/@ideal-postcodes+jsutil@6.1.0/node_modules/@ideal-postcodes/jsutil/dist/types";

import { env } from "~/env.mjs";
import { useForm } from "react-hook-form";
import { api } from "@utils/api";
import { type Address } from "@prisma/client";

type AddressFinderFormProps = {
  onSave: (addressId: string) => void;
  defaultAddress?: Address | undefined | null;
};

type JobLocationFormType = {
  addressLineTwo: string;
  addressLineThree: string;
  postTown: string;
  country: string;
  postcode: string;
};

function AddressFinderForm({ onSave, defaultAddress }: AddressFinderFormProps) {
  const addressLineOneInput = useRef(null);
  const { register, handleSubmit, setValue } = useForm<JobLocationFormType>({
    defaultValues: {
      addressLineTwo: defaultAddress?.line2 || "",
      addressLineThree: defaultAddress?.line3 || "",
      postTown: defaultAddress?.city || "",
      country: defaultAddress?.country || "",
      postcode: defaultAddress?.postcode || "",
    },
  });
  const [addressLineOne, setAddressLineOne] = useState(
    defaultAddress?.line1 || ""
  );
  const createAddressMutation = api.address.createAddress.useMutation();

  useEffect(() => {
    if (!env.NEXT_PUBLIC_IDEAL_POSTCODES_API_KEY) return;
    if (!addressLineOneInput.current) return;

    AddressFinder.setup({
      apiKey: env.NEXT_PUBLIC_IDEAL_POSTCODES_API_KEY,
      inputField: addressLineOneInput.current,
      detectCountry: false,
      defaultCountry: "GB",
      onAddressRetrieved: (address) => {
        const gbrAddress = address as GbrAddress;
        setAddressLineOne(gbrAddress.line_1);
        setValue("addressLineTwo", gbrAddress.line_2);
        setValue("addressLineThree", gbrAddress?.line_3 || "");
        setValue("postTown", gbrAddress.post_town);
        setValue("country", gbrAddress.country);
        setValue("postcode", gbrAddress.postcode);
      },
      onMounted: () => {
        console.log("AddressFinder has been mounted");
      },
    });
  }, [setValue]);

  const onSubmit = (data: JobLocationFormType) => {
    if (!addressLineOne) return;
    createAddressMutation.mutate(
      {
        line1: addressLineOne,
        line2: data.addressLineTwo,
        line3: data.addressLineThree,
        city: data.postTown,
        postcode: data.postcode,
        country: data.country,
      },
      {
        onSuccess: (data) => {
          onSave(data.id);
        },
      }
    );
  };

  return (
    <div>
      <form
        className="flex max-w-md flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="addressLineOne"
            className="block text-sm font-medium text-gray-700"
          >
            Address Line 1
          </label>
          <div className="mt-1">
            <input
              ref={addressLineOneInput}
              value={addressLineOne}
              onChange={(e) => setAddressLineOne(e.target.value)}
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Write address here..."
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="addressLineTwo"
            className="block text-sm font-medium text-gray-700"
          >
            Address Line 2
          </label>
          <div className="mt-1">
            <input
              {...register("addressLineTwo", { required: false })}
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Line 2"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="addressLineThree"
            className="block text-sm font-medium text-gray-700"
          >
            Address Line 3
          </label>
          <div className="mt-1">
            <input
              {...register("addressLineThree", { required: false })}
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Line 3"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="postTown"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <div className="mt-1">
            <input
              {...register("postTown", { required: true })}
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="City"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="county"
            className="block text-sm font-medium text-gray-700"
          >
            County
          </label>
          <div className="mt-1">
            <input
              {...register("country", { required: true })}
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="County"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="postcode"
            className="block text-sm font-medium text-gray-700"
          >
            Postcode
          </label>
          <div className="mt-1">
            <input
              {...register("postcode", { required: true })}
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Postcode"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="inline-flex items-center rounded bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-700 disabled:bg-gray-500"
          >
            <span>Save</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddressFinderForm;
