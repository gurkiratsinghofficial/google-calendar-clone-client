import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MDBBtn } from "mdbreact";
import { useDispatch } from "react-redux";
import { MyTextInput, MySelect } from "../../../components/MyInputs";
import { Link, useHistory } from "react-router-dom";
import { signupUser } from "../userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import constants from "../../../constants/constants";

/**JSX for signup user */
const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="signup-container">
      <div className="signup">
        <h1>Signup</h1>
        {/* Formik form for entering user details */}
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            phone: 0,
            address: "",
            password: "",
            confirmPassword: "",
            gender: "",
            file: "",
          }}
          // Form validation
          validationSchema={Yup.object({
            firstname: Yup.string().required(constants.FNAME_REQ),
            lastname: Yup.string().required(constants.lNAME_REQ),
            email: Yup.string()
              .email(constants.INV_EMAIL)
              .required(constants.EMAIL_REQ),
            phone: Yup.number()
              .required(constants.PHONE_REQ)
              .min(10, constants.PHONE_LENGTH),
            address: Yup.string().required(constants.ADDRESS_REQ),
            gender: Yup.string().required(constants.GENDER_REQ),
            password: Yup.string()
              .required(constants.PASS_EMPTY)
              .min(8, constants.SHORT_PASS),
            confirmPassword: Yup.string().test(
              "",
              constants.PASS_NOT_MATCH,
              function (value) {
                return this.parent.password === value;
              }
            ),
          })}
          // On submit, signup action is called
          onSubmit={async (values) => {
            try {
              const resultAction = await dispatch(signupUser(values));
              const response = unwrapResult(resultAction);
              if (response.success === "false") {
                toast.error(response.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              } else {
                toast.info(constants.SIGN_SUCCESS);
                history.push("/login");
              }
            } catch (err) {
              toast.info(err.message);
            }
          }}
        >
          {(formik) => (
            <Form>
              <MyTextInput
                label="First Name"
                name="firstname"
                type="text"
                placeholder="Jane"
              />
              <MyTextInput
                label="Last Name"
                name="lastname"
                type="text"
                placeholder="Doe"
              />
              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="jane@VT.com"
              />
              <MyTextInput
                label="Phone number"
                name="phone"
                type="number"
                placeholder="9999999999"
              />
              <MyTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="........."
              />
              <MyTextInput
                label="Confirm password"
                name="confirmPassword"
                type="password"
                placeholder="........."
              />
              <MyTextInput
                label="Complete address"
                name="address"
                type="text"
                placeholder="#22, Dream City, Amritsar"
              />
              <MySelect name="gender">
                <option value="">Select gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </MySelect>
              <input
                type="file"
                onChange={(e) => {
                  formik.setFieldValue("file", e.target.files[0]);
                }}
              />
              <br />
              <div className="submit-right">
                <label>
                  Already have an account?<Link to="/login"> Login </Link>
                  instead
                </label>
                <MDBBtn color="primary" type="submit">
                <label className="submit-btn">Submit</label>
                </MDBBtn>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Signup;
