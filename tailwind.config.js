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
          "text-question": "#626C7F", //Grey Navy
          success: "#26D782", //Lime Green
          caution: "#EE5454", //Orange/Red
          "html-fill": "#FFF1E9", //Light Orange
          "css-fill": "#E0FDEF", //Light Green
          "javascript-fill": "#E0FDEF", //Light blue
          "accessibility-fill": "#F6E7FF", //Light Purple
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
        hdgL: "4rem", //64px
        hdgM: "2.5rem", //40px
        hdgS: "1.75rem", //28px
        hdgXs: "1.125rem", //18px
        bodyM: ".875rem", //14px
      },
    },
  },
  plugins: [],
};
