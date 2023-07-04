import React, { useEffect } from "react";
import { useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import type { Address, LondonAddress } from "@prisma/client";
import genKey from "@utils/genKey";
import { api } from "@utils/api";
import Loading from "./Loading";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface LondonAreaSelectorProps {
  onSelect: (area: LondonAddress) => void;
  defaultArea?: Address | null | undefined;
  hideLabel?: boolean;
}

function LondonAreaSelector(props: LondonAreaSelectorProps) {
  const [query, setQuery] = useState("");
  const [selectedArea, setselectedArea] = useState<
    LondonAddress | Address | undefined
  >(undefined);
  const getLondonAddressesQuery = api.address.getLondonAddresses.useQuery({
    query,
    limit: 7,
  });

  useEffect(() => {
    if (!props.defaultArea) return;
    // const area = getLondonAddressesQuery?.data?.find?.(
    //   (a) => a.location.toLowerCase() === props.defaultArea?.line1.toLowerCase()
    // );
    // console.log(
    //   "🚀 ~ file: LondonAreaSelector.tsx:34 ~ useEffect ~ area:",
    //   area
    // );
    // if (!area) return;
    setselectedArea(props.defaultArea);
  }, [getLondonAddressesQuery?.data, props.defaultArea]);

  const areaIsAddress = (area: LondonAddress | Address | undefined) => {
    if (!area) return false;
    return "line1" in area;
  };

  return (
    <Combobox
      as="div"
      value={selectedArea?.id || ""}
      onChange={(val: string) => {
        const area = getLondonAddressesQuery?.data?.find?.((a) => a.id === val);
        if (!area) return;
        setselectedArea(area);
        props.onSelect(area);
      }}
    >
      {!props.hideLabel && (
        <Combobox.Label className="block text-sm font-medium text-gray-700 mb-1">
          Select Area
        </Combobox.Label>
      )}
      <div className="relative">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => {
            const val = event.target.value;
            setQuery(val);
          }}
          displayValue={() =>
            (areaIsAddress(selectedArea)
              ? (selectedArea as Address)?.line1
              : (selectedArea as LondonAddress)?.location) || ""
          }
        />
        <Combobox.Button
          className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
          disabled={getLondonAddressesQuery.isLoading}
        >
          {getLondonAddressesQuery.isLoading && <Loading />}
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>
        {getLondonAddressesQuery.isSuccess && (
          <Combobox.Options className="absolute z-[100000] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {getLondonAddressesQuery.data.map((area) => (
              <Combobox.Option
                key={genKey()}
                value={area.id}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected ? "font-semibold" : ""
                      )}
                    >
                      {area.location} -{" "}
                      <span
                        className={`text-xs ${
                          active ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {area.postcode.join(", ")}
                      </span>
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}

export default LondonAreaSelector;
