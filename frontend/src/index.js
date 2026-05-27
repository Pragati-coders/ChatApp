import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ChatProvider from "./context/ChatProvider";
import { BrowserRouter } from "react-router-dom";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#0f0f1a",
        color: "white",
      },
    },
  },
  components: {
    Modal: {
      baseStyle: {
        dialog: {
          bg: "#1a1a2e",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px",
        },
        header: { color: "white" },
        body: { color: "white" },
        closeButton: { color: "rgba(255,255,255,0.5)" },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          bg: "#1a1a2e",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px",
        },
        item: {
          bg: "transparent",
          color: "rgba(255,255,255,0.7)",
          _hover: {
            bg: "rgba(255,255,255,0.08)",
            color: "white",
          },
        },
      },
    },
    Drawer: {
      baseStyle: {
        dialog: {
          bg: "#1a1a2e",
        },
        header: { color: "white" },
        body: { color: "white" },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            borderRadius: "12px",
            _placeholder: { color: "rgba(255,255,255,0.3)" },
            _focus: {
              borderColor: "rgba(99,102,241,0.6)",
              boxShadow: "0 0 0 3px rgba(99,102,241,0.15)",
            },
          },
        },
      },
    },
    Button: {
      baseStyle: {
        borderRadius: "12px",
        fontFamily: "'DM Sans', sans-serif",
      },
    },
  },
  fonts: {
    heading: "'Syne', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  colors: {
    brand: {
      500: "#6366f1",
      600: "#8b5cf6",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChatProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ChatProvider>
  </BrowserRouter>
);
