import React from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import AddEventForm from "./AddEventForm";

function AddEventModal({ modal, setModal, setRefresh, slot, setSlot }) {
  /**toggle function for modal */
  const toggle = () => {
    setSlot(undefined);
    setModal(!modal);
  };
  /**Render modal for adding new event */
  return (
    <MDBContainer>
      <MDBModal isOpen={modal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>Add event</MDBModalHeader>
        <MDBModalBody>
          {/* for for entering new event */}
          <AddEventForm
            slot={slot}
            toggle={toggle}
            setRefresh={setRefresh}
            modal={modal}
            setModal={setModal}
          />
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
}

export default AddEventModal;
