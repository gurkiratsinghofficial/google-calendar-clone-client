import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { MDBBtn } from "mdbreact";
import { unwrapResult } from "@reduxjs/toolkit";
import { MyTextInput } from "../../../components/MyInputs";
import { getAllUserData, loginUser } from "../userSlice";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import constants from "../../../constants/constants";

/**JSX for login page */
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="login-container">
      <div className="login">
        <h1>Login</h1>
        {/* Formik form for login user */}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email(constants.INV_EMAIL)
              .required(constants.EMAIL_REQ),
            password: Yup.string()
              .required(constants.PASS_EMPTY)
              .min(8, constants.SHORT_PASS),
          })}
          onSubmit={async (values) => {
            /**on submit form call the login action */
            try {
              const resultAction = await dispatch(loginUser(values));
              const response = unwrapResult(resultAction);
              if (response.success === "false") {
                toast.error(response.message);
              } else {
                dispatch(getAllUserData());
                toast.info(response.message);
                history.push("/");
              }
            } catch (err) {}
          }}
        >
          {(formik) => (
            <Form>
              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="jane@VT.com"
              />
              <MyTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••••••••"
              />
              <div className="submit-right">
                <label>
                  Don't have an account? <Link to="/signup">Sign up</Link>{" "}
                  instead
                </label>
                <MDBBtn color="primary" type="submit">
                 Submit
                </MDBBtn>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Login;
