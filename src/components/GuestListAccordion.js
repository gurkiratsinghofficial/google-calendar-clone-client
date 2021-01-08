import React, { useState } from "react";
import { MDBBtn, MDBCollapse } from "mdbreact";
import Select from "react-select";
import { useSelector } from "react-redux";
import { selectAllUserData } from "../features/User/userSlice";

/**Component for adding or editing guestlist in Edit modal */
const GuestListAccordion = ({ guests, setFieldValue }) => {
  const [collapseID, setCollapseID] = useState(false);

  /**get guests option from redux */
  const options = useSelector(selectAllUserData);

  /**toggle guestlist accordion */
  const toggleCollapse = () => {
    setCollapseID(!collapseID);
  };
  return (
    <>
      {/* button to display guestlist select component */}
      <MDBBtn
        size="sm"
        color="primary"
        onClick={toggleCollapse}
        style={{ marginBottom: "1rem" }}
      >
        {guests && guests.length > 0 ? "See guest list" : "Add guests"}
      </MDBBtn>
      <MDBCollapse id="basicCollapse" isOpen={collapseID}>
        {/* select component for adding,editing guestlist */}
        <Select
          value={guests}
          isMulti="true"
          options={options}
          onChange={(updateGuests) => {
            setFieldValue("guests", updateGuests);
          }}
        />
      </MDBCollapse>
    </>
  );
};

export default GuestListAccordion;
