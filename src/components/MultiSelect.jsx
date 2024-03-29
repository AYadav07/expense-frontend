import React from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useRecoilValue } from "recoil";
import { catAtom } from "../recoil/atom/catOptions";

const animatedComponents = makeAnimated();

export const MultiSelect = ({ setCats, cats }) => {
  const handleSelectChange = (selectedOptions) => {
    setCats(selectedOptions);
  };
  // const C =

  // [
  //   { label: "food", value: "food" },
  //   { label: "drink", value: "drink" },
  // ];
  const catVal = useRecoilValue(catAtom);
  const selctItems = catVal.map((item) => {
    return { label: item, value: item };
  });

  console.log(selctItems);
  const customStyles = {
    // Default styles
    container: (provided) => ({
      ...provided,
      width: "50vw", // Default width
    }),

    // Media query for larger screens
    "@media (max-width: 480px)": {
      container: (provided) => ({
        ...provided,
        width: "80vw", // Adjusted width for larger screens
      }),
    },
  };

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={selctItems}
      value={cats}
      onChange={handleSelectChange}
      styles={customStyles}
    />
  );
};
