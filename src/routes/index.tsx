import { component$ } from "@builder.io/qwik";
import { useLocation, type DocumentHead } from "@builder.io/qwik-city";
import QuizCardOneline from "~/components/Quiz-card-oneline";
import quizData from "../../public/data.json";

export const quizColors = {
  html: "bg-skin-html-fill",
  css: "bg-skin-css-fill",
  javascript: "bg-skin-javascript-fill",
  accessibility: "bg-skin-accessibility-fill",
};

// quizData.quizzes.map((quiz) => {
//   console.log(
//     quizColors[`${quiz.title.toLocaleLowerCase() as keyof typeof quizColors}`],
//   );
// });

export default component$(() => {
  const location = useLocation();
  console.log(location.url);
  return (
    <>
      <section class="mt-10 font-light leading-[3rem]">
        <h1 class="text-hdgM  ">
          Welcome to the <br /> <b class="font-semi-bold">Frontend Quiz!</b>
        </h1>
        <p class="text-bodyM italic">Pick a subject to get started</p>
      </section>
      <section class="mt-8">
        {quizData.quizzes.map((quiz) => {
          return (
            <a key={quiz.title} href={`${quiz.title.toLowerCase()}`}>
              <QuizCardOneline
                style={`background-color: ${quiz.color}`}
                src={quiz.icon}
                name={quiz.title}
              />
            </a>
          );
        })}
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
