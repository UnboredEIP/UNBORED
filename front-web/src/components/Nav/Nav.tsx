import React from "react";
import styles from "../../styles/components/Nav.module.css";
import * as data from "./links.json";
import logo from "../../unboredlogo.png";
import { ChakraProvider, MenuIcon } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import Sidebar from "../sidebar/Sidebar";
import { Link, FormControl, FormLabel, Input } from "@chakra-ui/react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const linkString = JSON.stringify(data);
const links = JSON.parse(linkString).links;

type Link = {
  label: string;
  href: string;
};

const Nav: React.FC<{}> = () => {
  return (
    <nav className={styles.navbar}>
      <Sidebar />
      <div className={styles["logo-container"]}>
        <span>
          <img src={logo} className={styles["nav-logo"]} alt="logo" />
        </span>
      </div>
      {/* <Box maxW="32rem">
        <Button
          size="lg"
          colorScheme="blue"
          color="whitesmoke"
          variant="custom"
          mt="24px"
        >
          Create a free account
        </Button>
      </Box> */}
      {/* <Heading>I'm a Heading</Heading> */}

      <h1>
        <Link href="/">UnBored</Link>
      </h1>
      <h2>Tu t'ennuie ? Arrête </h2>
      <Routes>
        <Route path="/" element={<LinkRedirection/>}></Route>
        <Route path="/login" element={<LinkRedirection/>}></Route>
        <Route path="/register" element={<LinkRedirection/>}></Route>
        <Route path="/overview" element={<LinkRedirection/>}></Route>
      </Routes>
    </nav>
  );
};

const LinkRedirection: React.FC<{}> = () => {
  return (
    <div className={styles["links-container"]}>
      {links.map((link: Link) => {
        return (
          <nav className={styles.bubble}>
            <div key={link.href} className={styles["link"]}>
              <a href={link.href}>{link.label}</a>
            </div>
          </nav>
        );
      })}
    </div>
  );
};

export default Nav;
