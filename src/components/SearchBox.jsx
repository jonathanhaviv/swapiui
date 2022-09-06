import React, {useState, useEffect} from "react";
import { Combobox } from "@headlessui/react";
import { fetchPaginatedData } from "../utils/fetchPaginatedData";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { simpleFilter } from "../utils/filters";

export const SearchBox = ({ filter = simpleFilter}) => {
  const [values, setValues] = useState([]);
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");

  // todo - add filter logic to filter list as a user types
  const [filteredData, setFilteredData] = useState(values);
  const [loading, setLoading] = useState(true)

  // todo - move requests from here and CharacterGrid into App to avoid multiple requests for the same data
  const getData = async () => {
    const api = "https://swapi.dev/api";
    const planetData = await fetchPaginatedData(api, "planets", 1);

    setValues(planetData);
    setLoading(false);
  };

  useEffect(() => {
    if (loading === true) {
      getData().catch((error) => console.error(error));
    }
  });

  useEffect(() => {
    if (loading === true) return;
    const filteredValues = filter(values, query);
    setFilteredData(filteredValues);
  }, [query]);

  return (
    <div className="mx-auto w-1/5">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative  cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none sm:text-sm">
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            displayValue={(value) => value}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
           
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              
            
          </Combobox.Button>
        </div>
        <Combobox.Options className="bg-white w-1/5 rounded-md mt-1 absolute z-50  py-2">
          {loading === false &&
            query === "" &&
            values.map((value) => {
              return (
                <Combobox.Option
                  key={value.name}
                  value={value.name}
                  className={({ active }) => {
                    return `cursor-pointer select-none px-2 py-2 ${
                      active && "bg-blue-400 text-white"
                    }`;
                  }}
                >
                  {value.name}
                </Combobox.Option>
              );
            })}

          {loading === false &&
            query !== "" &&
            filteredData.length > 0 &&
            filteredData.map((value) => {
              return (
                <Combobox.Option
                  key={value.name}
                  value={value.name}
                  className={({ active }) => {
                    return `cursor-pointer select-none px-2 py-2 ${
                      active && "bg-blue-400 text-white"
                    }`;
                  }}
                >
                  {value.name}
                </Combobox.Option>
              );
            })}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}