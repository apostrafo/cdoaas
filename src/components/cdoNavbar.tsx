import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import ThemeProvider from "./theme-provider";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "../hooks/useTranslation";

// Helper function to create links with language parameter
function createLinkWithLang(path: string, language: string) {
  return `${path}?lang=${language}`;
}

function NavList() {
  const { t, language } = useTranslation();
  
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href={createLinkWithLang("/", language)}
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          {t("nav.home")}
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href={createLinkWithLang("/services", language)}
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          {t("nav.services")}
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href={createLinkWithLang("/approach", language)}
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          {t("nav.approach")}
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href={createLinkWithLang("/case-studies", language)}
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          {t("nav.caseStudies")}
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href={createLinkWithLang("/tools", language)}
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          {t("nav.tools") || "Tools"}
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href={createLinkWithLang("/blog", language)}
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          {t("nav.blog") || "Blog"}
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href={createLinkWithLang("/contact", language)}
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          {t("nav.contact")}
        </ListItem>
      </Typography>
    </List>
  );
}

export default function CDONavbar() {
  const [openNav, setOpenNav] = useState(false);
  const { t, language } = useTranslation();
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  return (
    <ThemeProvider>
      <Navbar className="absolute mx-auto left-0 right-0 top-3 max-w-screen-xl px-4 py-2 z-10">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href={createLinkWithLang("/", language)}
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          >
            CDOaaS
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="hidden gap-2 lg:flex items-center">
            <LanguageSwitcher />
            <a href={createLinkWithLang("/contact", language)}>
              <Button size="sm" color="blue">
                {t("nav.bookCall")}
              </Button>
            </a>
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-wrap items-center gap-2 lg:hidden">
            <div className="w-full mb-2">
              <LanguageSwitcher />
            </div>
            <a href={createLinkWithLang("/contact", language)} className="w-full">
              <Button size="sm" fullWidth color="blue">
                {t("nav.bookCall")}
              </Button>
            </a>
          </div>
        </Collapse>
      </Navbar>
    </ThemeProvider>
  );
} 