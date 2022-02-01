import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUser, selectUser } from "../userSlice";
import EditUserForm from "./EditUserInfo";

/**JSX for displaying personal details */
const PersonalDetails = () => {
  const userInfo = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    /**fetch user details on mount */
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <>
      <h1 className="personal-details-heading">Personal Information</h1>
      <div className="single-product-container">
        <div className="single-product-left">
          <img
            className="single-product-image"
            alt="personal details"
            src={userInfo ? userInfo.profilePhoto : false}
          />
        </div>
        <div className="single-product-right">
          {/* component for viewing and editing user details */}
          <EditUserForm userInfo={userInfo} />
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;
