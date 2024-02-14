import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import Header from "../components/Header";
import dataJson from "../../public/data.json";

// Supports weights 300-900
import "@fontsource-variable/rubik";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

//https://mocki.io/v1/34bf1f5a-6158-440d-96fe-372a1e245700

// export const useQuizData = routeLoader$(async () => {

//   const data = await fetch(
//     "https://mocki.io/v1/34bf1f5a-6158-440d-96fe-372a1e245700",
//   ).then((response) => {
//     try {
//       if (!response.ok) {
//         throw new Error(
//           "Received a response other than 'ok' when fetching data from the URL ",
//         );
//       } else {
//         return response.json();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });
//   return data;
// });

export default component$(() => {
  // const quizSignal = useQuizData();

  return (
    <div class="min-h-screen bg-skin-canvas-pri bg-[url('./media/pattern-background-mobile-light.svg')] bg-no-repeat px-6 py-3">
      <Header src={dataJson.quizzes[0].icon} />
      <main>
        <Slot />
      </main>
    </div>
  );
});
