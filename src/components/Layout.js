import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from '@emotion/styled';

const Header = styled.div`
  width: 100%;
  background: #902929;
  display: flex;
  padding: 1em;
`;

const Link = styled(NavLink)`
  background: none;
  border: none;
  border-radius: 1em;
  outline: none;
  color: white;
  text-decoration: none;
`;

const Layout = () => {
  return (
    <>
    <Header>
      <Link to="/">Home</Link>
    </Header>
    <Outlet />
    </>
  );
};

export default Layout;
