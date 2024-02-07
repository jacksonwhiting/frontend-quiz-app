import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import QuizCardOneline from "~/components/Quiz-card-oneline";

export default component$(() => {
  return (
    <>
      <section class="mt-10 font-light leading-[3rem]">
        <h1 class="text-hdgM  ">
          Welcome to the <br /> <b class="font-semi-bold">Frontend Quiz!</b>
        </h1>
        <p class="text-bodyM italic">Pick a subject to get started</p>
      </section>
      <section class="mt-8">
        <QuizCardOneline />
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
