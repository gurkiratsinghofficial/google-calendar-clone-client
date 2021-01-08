import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectIsLoggedIn } from "../../features/User/userSlice";
import AuthNav from "./AuthNav";
import UnAuthNav from "./UnAuthNav";

/**JSX for main navigation bar */
function NavigationBar(props) {
  const loggedIn = useSelector(selectIsLoggedIn);

  const [isOpen, setIsOpen] = useState(false);

  /**function for collapsing navigation bar */
  const toggleCollapse = () => {
    setIsOpen({ isOpen: !isOpen });
  };
  return (
    <div>
      {loggedIn ? (
        // If user is logged in render AuthNav
        <AuthNav toggleCollapse={toggleCollapse} isOpen={isOpen} />
      ) : (
        // If user is not logged in render UnAuthNav
        <UnAuthNav toggleCollapse={toggleCollapse} isOpen={isOpen} />
      )}
    </div>
  );
}

export default NavigationBar;
