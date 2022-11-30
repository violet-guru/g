/* eslint-disable no-undef */
import { CssVarsProvider } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import React, { useEffect, useState } from "react";
import Initial from "./Initial";
import Advent from "./Advent";

const pageIndex = 1;

function App() {
  const [langValue, setLangValue] = useState();

  useEffect(() => {
    if (pageIndex === 0) {
      Weglot.on("initialized", () => {
        // get the current active language
        let currentLang = Weglot.getCurrentLang();

        const urlParams = Object.fromEntries(
          new URLSearchParams(window.location.search).entries()
        );
        if (urlParams.hl != null) {
          currentLang = urlParams.hl;
          Weglot.switchTo(currentLang);
        }

        setLangValue(currentLang);
      });
    }

    if (pageIndex === 1) {
      document.body.classList.add("alteredBody");

      // Remove wf element
      document.querySelectorAll("#root + .blog-hero-section").forEach((el) => {
        el.style.display = "none";
      });

      document
        .querySelectorAll(".blog-hero-section + .blog-post-rich-text-section")
        .forEach((el) => {
          el.style.display = "none";
        });

      document
        .querySelectorAll(".cta-section + .terms-section-modal")
        .forEach((el) => {
          el.style.display = "none";
        });
    }

    console.log("inizzz"); // TODO
  }, []);

  const putLang = (_, actualLang) => {
    Weglot.switchTo(actualLang);
    setLangValue(actualLang);
  };

  return (
    <CssVarsProvider defaultMode={pageIndex === 0 ? "dark" : "light"}>
      <Box
        // https://gist.github.com/marcosvpj/768780cf6092e4b59c332df33a7bbc61
        sx={{
          maxWidth: "110ch",
          padding: pageIndex === 0 ? "2ch" : "1ch",
          margin: "auto",
          textAlign: pageIndex === 0 ? "center" : undefined,
        }}
      >
        {pageIndex === 0 && <Initial langValue={langValue} putLang={putLang} />}
        {pageIndex === 1 && <Advent langValue={langValue} putLang={putLang} />}
      </Box>
    </CssVarsProvider>
  );
}

export default App;
