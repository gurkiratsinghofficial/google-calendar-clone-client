import { unwrapResult } from "@reduxjs/toolkit";
import { Form, Formik } from "formik";
import { MDBBtn } from "mdbreact";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { MyTextInput } from "../../../components/MyInputs";
import { editUser } from "../userSlice";

/**JSX for displaying and edit user details */
function EditUserInfo({ userInfo }) {
  const dispatch = useDispatch();

  return (
    <div>
      {userInfo ? (
        <Formik
          enableReinitialize
          initialValues={{
            email: userInfo.email,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            phone: userInfo.phone,
            address: userInfo.address,
          }}
          validationSchema={Yup.object({
            email: Yup.string(),
            firstname: Yup.string(),
            lastname: Yup.string(),
            phone: Yup.string(),
            address: Yup.string(),
            profilePhoto: Yup.string(),
          })}
          onSubmit={async (values) => {
            /**on form submit update the details in database */
            try {
              const resultAction = await dispatch(editUser(values));
              const response = unwrapResult(resultAction);
              if (response.success === "true") {
                toast.info(response.message);
              } else {
                toast.error(response.message);
              }
            } catch (err) {
              toast.error();
            }
          }}
        >
          {(formik) => (
            <Form>
              <MyTextInput label="Email" disabled name="email" type="email" />
              <MyTextInput label="Firstname" name="firstname" type="text" />
              <MyTextInput label="Lastname" name="lastname" type="text" />
              <MyTextInput label="Phone" name="phone" type="text" />
              <MyTextInput label="Address" name="address" type="text" />
              <label>Change Profile Photo</label>
              <input
                type="file"
                onChange={(e) => {
                  formik.setFieldValue("profilePhoto", e.target.files[0]);
                }}
              ></input>
              <MDBBtn className="edit-user-submit" type="submit">Update</MDBBtn>
            </Form>
          )}
        </Formik>
      ) : (
        false
      )}
    </div>
  );
}

export default EditUserInfo;
