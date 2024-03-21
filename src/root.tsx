import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  //https://mocki.io/v1/34bf1f5a-6158-440d-96fe-372a1e245700

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <script
          dangerouslySetInnerHTML={`
        (function() {
          function setTheme(theme) {
            document.documentElement.className = theme;
            localStorage.setItem('theme', theme);
          }
          var theme = localStorage.getItem('theme');
          console.log(theme);
          if (theme) {
            setTheme(theme);
          } else {
            setTheme('light');
          }
        })();
        window.addEventListener('load', function() {
          var themeSwitch = document.getElementById('light-dark-switch');
          themeSwitch.checked = localStorage.getItem('theme') === 'light'? true: false;
        }
        );
      `}
        ></script>
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang="en" class="font-fontPri text-bodyM">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
