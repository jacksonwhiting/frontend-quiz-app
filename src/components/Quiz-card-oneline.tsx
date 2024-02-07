import { component$ } from "@builder.io/qwik";
import QuizIcon from "./Quiz-icon";
import { useQuizData } from "~/routes/layout";

export default component$(() => {
  const quizSignal = useQuizData();
  console.log(quizSignal.value);
  return (
    <div class="flex items-center gap-3 rounded-xl bg-white p-3">
      <QuizIcon
        class="bg-skin-html-cat/10"
        height={40}
        width={40}
        src="/src/media/icon-html.svg"
      />
      <h2 class="text-hdgXs font-medium">HTML</h2>
    </div>
  );
});
