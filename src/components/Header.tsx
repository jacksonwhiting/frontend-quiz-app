import { component$ } from "@builder.io/qwik";
import QuizIcon from "./Quiz-icon";
import { useLocation } from "@builder.io/qwik-city";
import { quizzes } from "../../public/data.json";

export default component$(() => {
  const loc = useLocation();
  const locPathName = loc.url.pathname.replaceAll("/", "");

  const matchQuizInfo = () => {
    const quizInfo = { title: "", icon: "", color: "" };
    quizzes.forEach((quiz) => {
      if (quiz.title.toLocaleLowerCase() === locPathName) {
        quizInfo.title = quiz.title;
        quizInfo.icon = quiz.icon;
        quizInfo.color = quiz.color;
      }
    });
    return quizInfo;
  };

  return (
    <header class="flex items-center justify-between ">
      <div class="flex items-center gap-4">
        {loc.url.pathname !== "/" && (
          <>
            <QuizIcon
              style={`background-color: ${matchQuizInfo().color}`}
              src={matchQuizInfo().icon}
              height={28}
              width={28}
            />
            <h2 class="font-semi-bold text-hdgXs">{matchQuizInfo().title}</h2>
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
