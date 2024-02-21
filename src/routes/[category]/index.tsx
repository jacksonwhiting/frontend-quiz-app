import { component$ } from "@builder.io/qwik";
import { useLocation, type DocumentHead } from "@builder.io/qwik-city";
import QuizCardOneline from "~/components/Quiz-card-oneline";
import quizData from "../../public/data.json";

export default component$(() => {
  const loc = useLocation();
  const locPathName = loc.url.pathname.replaceAll("/", "");

  return (
    <>
      {`This is the ${locPathName.toUpperCase()} page`}
      <section class="mt-10">
        <h2 class="text-skin-text-question text-bodyM font-light italic leading-6 ">
          Question 6 of 10
        </h2>
        <h3 class="mt-4 text-[1.25rem] font-medium leading-7 text-skin-text-pri">
          Which of these color contrast ratios defines the minimum WCAG 2.1
          Level AA requirement for normal text?
        </h3>

        {/* Progress Bar */}
        <div class="mt-6 rounded-full bg-skin-brand-sec p-1">
          <div
            style="width: 20%"
            class="rounded-full bg-skin-brand-pri p-1"
          ></div>
        </div>

        {/* Quiz Questions */}
        <section class="mt-10 space-y-6">
          <button
            type="button"
            class="flex w-full items-center gap-6 rounded-2xl bg-white p-3"
          >
            <div class="text-skin-text-question h-14 w-14 rounded-lg bg-skin-fill-pri p-2 text-center text-hdgS">
              A
            </div>
            <h2 class="text-hdgS text-skin-text-pri">4.5 : 1</h2>
          </button>
          <div class=" flex items-center gap-6 rounded-2xl bg-white p-3">
            <div class="text-skin-text-question h-14 w-14 rounded-lg bg-skin-fill-pri p-2 text-center text-hdgS">
              A
            </div>
            <h2 class="text-hdgS text-skin-text-pri">4.5 : 1</h2>
          </div>
          <button
            type="button"
            class="text-hdgXs flex w-full cursor-pointer items-center justify-center rounded-2xl bg-skin-brand-pri p-4 text-skin-brand-sec"
          >
            Submit Answer
          </button>
        </section>
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
