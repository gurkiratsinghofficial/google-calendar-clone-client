import React from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Formik, Form } from "formik";
import { MDBBtn, MDBModalFooter } from "mdbreact";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FormField from "../../../components/FormField";
import { updateEvent } from "../eventSlice";
import constants from "../../../constants/constants";
import CKEditor from "ckeditor4-react";
import GuestListAccordion from "../../../components/GuestListAccordion";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

function EditEventForm(props) {
  const {
    defaultData,
    setRefresh,
    setModal,
    deleteThisEvent,
    confirmModal,
    setConfirmModal,
  } = props;
  const dispatch = useDispatch();
  return (
    <div>
      {defaultData ? (
        <Formik
          enableReinitialize
          initialValues={{
            event_id: defaultData.event_id,
            title: defaultData.title,
            description: defaultData.description,
            eventDate: defaultData.eventDate,
            startTime: defaultData.startTime,
            endTime: defaultData.endTime,
            participant: defaultData.participant,
            organizer: defaultData.organizer,
            organizerEmail: defaultData.organizerEmail,
            guests: defaultData.guests ? defaultData.guests : [],
          }}
          validationSchema={Yup.object({
            title: Yup.string().required(constants.TITLE_REQUIRED),
            eventDate: Yup.string().required(constants.EVENT_DT_REQ),
            startTime: Yup.string().required(constants.STIME_REQ),
            endTime: Yup.string()
              .required(constants.ETIME_REQ)
              .test("", constants.END_GREAT, function (value) {
                if (value) {
                  let s1 = parseInt(this.parent.startTime.substring(0, 2));
                  let s2 = parseInt(this.parent.startTime.substring(3, 5));
                  let e1 = parseInt(value.substring(0, 2));
                  let e2 = parseInt(value.substring(3, 5));
                  if ((e1 === s1 && (e2 > s2 || e2 === s2)) || e1 > s1)
                    return true;
                }
              }),
          })}
          /**Submit handler */
          onSubmit={async (values) => {
            const resultAction = await dispatch(updateEvent(values));
            const response = unwrapResult(resultAction);
            if (response.success === "true") {
              toast.info(response.message);
              setRefresh(true);
              setModal(false);
            } else toast.error(response.message);
          }}
        >
          {(formik) => (
            <Form>
              <FormField label="Title" type="text" name="title" />
              <p className="field-name">Description</p>
              <CKEditor
                type="inline"
                data={formik.values ? formik.values.description : ""}
                onChange={(event) => {
                  formik.setFieldValue("description", event.editor.getData());
                }}
              />
              <FormField label="Select date" type="date" name="eventDate" />
              <div className="time">
                <FormField label="Start time" type="time" name="startTime" />
                <FormField label="End time" type="time" name="endTime" />
              </div>
              <GuestListAccordion
                guests={formik.values.guests}
                setFieldValue={formik.setFieldValue}
              />
              <MDBModalFooter>
                <MDBBtn
                  color="primary"
                  onClick={() => {
                    setConfirmModal(true);
                  }}
                >
                  Delete
                </MDBBtn>
                <MDBBtn color="success" type="submit">
                  Save Changes
                </MDBBtn>
              </MDBModalFooter>
            </Form>
          )}
        </Formik>
      ) : (
        false
      )}
      <ConfirmDeleteModal
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
        deleteThisEvent={deleteThisEvent}
      />
    </div>
  );
}

export default EditEventForm;
