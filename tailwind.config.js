/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        skin: {
          "canvas-pri": "#F4F6FA", //Light Gray
          "brand-pri": "#A729F5", //Dark Purple
          "brand-sec": "#FFFFFF", //White
          "text-pri": "#313E51", //Dark Navy
          "fill-pri": "#F4F6FA", //Light Gray
          success: "#26D782", //Lime Green
          caution: "#EE5454", //Orange/Red
        },
      },
      fontFamily: {
        fontPri: [
          "Rubik Variable",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
          "sans-serif",
        ],
      },
      fontSize: {
        hdgL: "4rem",
        hdgM: "2.25rem",
        hdgS: "1.75rem",
        bodyM: ".75rem",
      },
    },
  },
  plugins: [],
};
