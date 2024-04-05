import { component$, useSignal } from "@builder.io/qwik";
import QuizIcon from "./Quiz-icon";
import { Link, useLocation } from "@builder.io/qwik-city";
import { quizzes } from "../../src/data.json";
import { matchQuizData } from "./Utilities";

export default component$(() => {
  const loc = useLocation();
  const categoryPath = loc.params.category;
  const quizData = matchQuizData(categoryPath, quizzes);
  const theme = useSignal("light");

  return (
    <header class="mx-auto flex max-w-screen-md items-center justify-between xl:max-w-screen-xl">
      <div class="flex items-center gap-4">
        {loc.url.pathname !== "/" && (
          <>
            <Link href="/">
              <QuizIcon
                style={`background-color: ${quizData.color}`}
                src={quizData.icon}
                height={28}
                width={28}
              />
            </Link>
            <h1 class="font-semi-bold text-hdgXs dark:text-skin-brand-sec xl:text-hdgS">
              {quizData.title}
            </h1>
          </>
        )}
      </div>
      <div class="flex items-center gap-3">
        {theme.value === "light" && (
          <img height={16} width={16} src="/media/icon-sun-dark.svg" alt="" />
        )}
        {theme.value === "dark" && (
          <img height={16} width={16} src="/media/icon-sun-light.svg" alt="" />
        )}

        <label class="switch ">
          <input
            id="light-dark-switch"
            type="checkbox"
            onClick$={(e, target) => {
              theme.value = document.documentElement.className;
              console.log(theme.value);
              console.log(target.checked);
              if (theme.value === "light") {
                document.documentElement.className = "dark";
                theme.value = "dark";
                localStorage.setItem("theme", "dark");
              } else {
                document.documentElement.className = "light";
                localStorage.setItem("theme", "light");
                theme.value = "light";
              }
            }}
          />
          <span class="slider round"></span>
        </label>
        <img height={14} width={14} src="/media/icon-moon-dark.svg" alt="" />
      </div>
    </header>
  );
});
