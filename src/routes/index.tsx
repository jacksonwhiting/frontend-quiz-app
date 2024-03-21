import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, type DocumentHead, Link } from "@builder.io/qwik-city";
import QuizCardOneline from "~/components/Quiz-card-oneline";
import quizData from "../../src/data.json";

export default component$(() => {
  const location = useLocation();
  console.log(location.url);

  useVisibleTask$(() => {
    sessionStorage.clear();
  });

  return (
    <>
      <div class="mx-auto max-w-[640px] dark:text-skin-brand-sec xl:grid xl:max-w-screen-xl xl:grid-cols-2 xl:px-12 xl:py-20">
        <section class="mt-10 font-light leading-[3rem] sm:leading-[5rem]">
          <h1 class="text-hdgM sm:text-hdgL ">
            Welcome to the <br /> <b class="font-semi-bold">Frontend Quiz!</b>
          </h1>
          <p class="text-bodyM italic sm:text-hdgXs">
            Pick a subject to get started
          </p>
        </section>
        <section class="mt-8">
          {quizData.quizzes.map((quiz) => {
            return (
              <Link key={quiz.title} href={`${quiz.title.toLowerCase()}/1`}>
                <QuizCardOneline
                  style={`background-color: ${quiz.color}`}
                  src={quiz.icon}
                  name={quiz.title}
                />
              </Link>
            );
          })}
        </section>
      </div>
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
