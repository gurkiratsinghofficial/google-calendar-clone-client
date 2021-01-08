import React from "react";
import constants from "../constants/constants";
import Select, { components } from "react-select";

const MultiValue = (props) => (
  <components.MultiValue {...props}>
    {props.data.chipLabel}
  </components.MultiValue>
);

function SelectGuests({ allUserData, setFieldValue }) {
  const options = allUserData;
  return (
    <div>
      <p className="field-name">{constants.GUEST_LIST_TITLE}</p>
      <label>{constants.GUEST_LIST_INFO}</label>
      <Select
        isMulti="true"
        options={options}
        components={{ MultiValue }}
        onChange={(guests) => {
          setFieldValue("guests", guests);
        }}
      />
    </div>
  );
}

export default SelectGuests;
