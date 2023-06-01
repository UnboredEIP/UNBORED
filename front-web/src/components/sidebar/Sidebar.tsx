import React, { useState } from "react";
import logo from "../../unboredlogo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import styles from "../../styles/components/Sidebar.module.css";
import { IconContext } from "react-icons";
import { HiMenu } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";

const Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 3rem;
  width: 250px;
  background-color: var(--mainColor);
`;

const SidebarNav = styled.div<{ sidebar: boolean }>`
  background-color: var(--mainColor);
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "100%")};
`;

const NavIcon = styled(Link)`
  font-size: 2rem;
  margin-left: 2rem;
`;

const SidebarWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 6.2rem;
  background-color: var(--mainColor);
  padding-left: 75px;
`;

const Sidebar: React.FC<{}> = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <IconContext.Provider value={{ color: "whitesmoke" }}>
      <Nav>
        <NavIcon to="#" onClick={showSidebar}>
          <HiMenu />
        </NavIcon>
      </Nav>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon to="#" onClick={showSidebar}>
            <IoCloseSharp />
          </NavIcon>
        </SidebarWrap>
      </SidebarNav>
      {/* <nav className={styles.Nav}></nav> */}
    </IconContext.Provider>
  );
};

export default Sidebar;
