import React from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export const MultiSelect = ({ setCats, cats }) => {
  const handleSelectChange = (selectedOptions) => {
    setCats(selectedOptions);
  };
  const C = [
    { label: "food", value: "food" },
    { label: "drink", value: "drink" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "30vw", // Set your desired width here
    }),
  };
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={C}
      value={cats}
      onChange={handleSelectChange}
      styles={customStyles}
    />
  );
};
