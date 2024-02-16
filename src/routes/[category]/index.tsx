import { component$ } from "@builder.io/qwik";
import { useLocation, type DocumentHead } from "@builder.io/qwik-city";
import QuizCardOneline from "~/components/Quiz-card-oneline";
import quizData from "../../public/data.json";

export default component$(() => {
  const loc = useLocation();
  const locPathName = loc.url.pathname.replaceAll("/", "");

  return <>{`This is the ${locPathName.toUpperCase()} page`} </>;
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
