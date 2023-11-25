import { Outlet } from "react-router-dom";
import SkipToContentLink from "./SkipToContentLink";

const Layout = () => {
  return (
    <>
      <SkipToContentLink />
      <Outlet />
    </>
  );
};

export default Layout;