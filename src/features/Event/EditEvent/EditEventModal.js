import React, { useEffect, useState } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import EditEventForm from "./EditEventForm";
import { deleteEvent, fetchOneEvent, selectModalEvent } from "../eventSlice";
import { toast } from "react-toastify";
import EventDetails from "./EventDetails";

function EditEventModal(props) {
  const {
    modal,
    setModal,
    setRefresh,
    event,
    confirmModal,
    setConfirmModal,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    /**fetch event data */
    dispatch(fetchOneEvent(event));
  }, [dispatch, event]);

  const modalEvent = useSelector(selectModalEvent);
  const [defaultData, setDefaultData] = useState(modalEvent);

  useEffect(() => {
    /**set event data */
    setDefaultData(modalEvent);
  }, [modalEvent]);

  /**function for handling delete event */
  const deleteThisEvent = async () => {
    const resultAction = await dispatch(deleteEvent(event));
    const response = unwrapResult(resultAction);
    if (response.success === "true") {
      toast.info(response.message);
      setRefresh(true);
      setConfirmModal(false);
      setModal(false);
    } else toast.error(response.message);
  };
  /**toggle function for modal */
  const toggle = () => {
    setModal(!modal);
  };
  return (
    <MDBContainer>
      <MDBModal isOpen={modal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>Event Details</MDBModalHeader>
        <MDBModalBody>
          {defaultData && defaultData.participant === false ? (
            // component for viewing and editing event details
            <EditEventForm
              confirmModal={confirmModal}
              setConfirmModal={setConfirmModal}
              toggle={toggle}
              setRefresh={setRefresh}
              setModal={setModal}
              defaultData={defaultData}
              deleteThisEvent={deleteThisEvent}
              setDefaultData={setDefaultData}
            />
          ) : (
            false
          )}
          {defaultData && defaultData.participant === true ? (
            // event details (view only) for participants
            <EventDetails defaultData={defaultData} />
          ) : (
            false
          )}
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
}

export default EditEventModal;
