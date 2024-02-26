import { component$ } from "@builder.io/qwik";
import QuizIcon from "./Quiz-icon";
import { useLocation } from "@builder.io/qwik-city";
import { quizzes } from "../../src/data.json";
import { matchQuizData } from "./Utilities";

export default component$(() => {
  const loc = useLocation();
  const categoryPath = loc.params.category;
  const quizData = matchQuizData(categoryPath, quizzes);

  return (
    <header class="flex items-center justify-between ">
      <div class="flex items-center gap-4">
        {loc.url.pathname !== "/" && (
          <>
            <QuizIcon
              style={`background-color: ${quizData.color}`}
              src={quizData.icon}
              height={28}
              width={28}
            />
            <h1 class="font-semi-bold text-hdgXs">{quizData.title}</h1>
          </>
        )}
      </div>
      <div class="flex items-center gap-3">
        <img
          height={14}
          width={14}
          src="../../src/media/icon-sun-dark.svg"
          alt=""
        />
        <label class="switch ">
          <input id="light-dark-switch" type="checkbox" />
          <span class="slider round"></span>
        </label>
        <img
          height={14}
          width={14}
          src="../../src/media/icon-moon-dark.svg"
          alt=""
        />
      </div>
    </header>
  );
});
