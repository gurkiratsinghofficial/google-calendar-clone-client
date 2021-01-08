import React from "react";
import * as Yup from "yup";
import moment from "moment";

import { unwrapResult } from "@reduxjs/toolkit";
import { Formik, Form, ErrorMessage } from "formik";
import { MDBBtn, MDBModalFooter } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addEvent } from "../eventSlice";
import CKEditor from "ckeditor4-react";

import FormField from "../../../components/FormField";
import constants from "../../../constants/constants";
import { selectAllUserData } from "../../User/userSlice";
import SelectGuests from "../../../components/SelectGuests";

function AddEventForm({ toggle, setModal, setRefresh, modal, slot }) {
  const dispatch = useDispatch();
  const allUserData = useSelector(selectAllUserData);
  let slotDateFormat = undefined,
    slotStartTime = undefined,
    slotEndTime = undefined;
  if (slot) {
    const format = "YYYY-MM-DD";
    const format2 = "HH:mm";
    slotDateFormat = moment(slot.start).format(format);
    slotStartTime = moment(slot.start).format(format2);
    slotEndTime = moment(slot.end).format(format2);
  }
  /**Render form for adding new event */
  return (
    <div>
      <Formik
        /**initial values */
        initialValues={{
          title: "",
          description: "",
          eventDate: slotDateFormat ? slotDateFormat : "",
          startTime: slotStartTime ? slotStartTime : "",
          endTime: slotEndTime ? slotEndTime : "",
          guests: undefined,
        }}
        /**Form Validation */
        validationSchema={Yup.object({
          title: Yup.string().required(constants.TITLE_REQUIRED),
          description: Yup.string().required(constants.DESC_REQUIRED),
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
        /**on submit handler */
        onSubmit={async (values) => {
          const resultAction = await dispatch(addEvent(values));
          const response = unwrapResult(resultAction);
          if (response.success === "true") {
            toast.info(response.message);
            setRefresh(true);
            setModal(!modal);
          } else toast.error(response.message);
        }}
      >
        {(formik) => (
          <Form>
            <FormField label="Title" type="text" name="title" />
            <p className="field-name">Description</p>
            <CKEditor
              type="inline"
              onChange={(event) => {
                formik.setFieldValue("description", event.editor.getData());
              }}
            />
            <p className="error">
              <ErrorMessage className="error" name="description" />
            </p>
            <FormField label="Select date" type="date" name="eventDate" />
            <div className="time">
              <FormField label="Start time" type="time" name="startTime" />
              <FormField label="End time" type="time" name="endTime" />
            </div>
            <SelectGuests
              allUserData={allUserData}
              setFieldValue={formik.setFieldValue}
            />
            <MDBModalFooter>
              <MDBBtn color="primary" onClick={toggle}>
                Cancel
              </MDBBtn>
              <MDBBtn color="success" type="submit">
                Add
              </MDBBtn>
            </MDBModalFooter>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddEventForm;
