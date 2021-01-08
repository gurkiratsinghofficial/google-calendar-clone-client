import React from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody } from "mdbreact";
import constants from "../../../constants/constants";

const ConfirmDeleteModal = (props) => {
  const { confirmModal, setConfirmModal, deleteThisEvent } = props;
  /**toggle delete confirmation modal */
  const toggle = () => {
    setConfirmModal(false);
  };
  /**JSX for delete confirmation modal  */
  return (
    <div className="full-width">
      <MDBContainer>
        <MDBModal isOpen={confirmModal} toggle={toggle} frame position="top">
          <MDBModalBody className="text-center">
            {constants.CONFIRM_DELETE}
            <MDBBtn color="secondary" onClick={toggle}>
              No
            </MDBBtn>
            <MDBBtn
              color="primary"
              onClick={() => {
                deleteThisEvent();
              }}
            >
              Yes
            </MDBBtn>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    </div>
  );
};

export default ConfirmDeleteModal;
