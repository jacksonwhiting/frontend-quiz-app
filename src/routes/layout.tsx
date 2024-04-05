import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import Header from "../components/Header";

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

export default component$(() => {
  return (
    <div
      class="mx-auto min-h-screen  bg-skin-canvas-pri bg-[url('/media/patter-background-mobile-light')]
     bg-no-repeat px-6 py-3 dark:bg-skin-text-pri dark:bg-[url('/media/pattern-background-mobile-dark.svg')]
     sm:bg-[url('/media/pattern-background-tablet-light.svg')]
     sm:py-10
     sm:dark:bg-[url('/media/pattern-background-tablet-dark.svg')]
     lg:py-14 
     xl:bg-[url('/media/pattern-background-desktop-light.svg')]
     xl:px-20 xl:dark:bg-[url('/media/pattern-background-desktop-dark.svg')]"
    >
      <Header />
      <main>
        <Slot />
      </main>
    </div>
  );
});
