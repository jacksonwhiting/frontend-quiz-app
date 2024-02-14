import { component$ } from "@builder.io/qwik";
import QuizIcon from "./Quiz-icon";
import { useLocation } from "@builder.io/qwik-city";
import { quizColors } from "~/routes";

const properTitles = {
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  accessibility: "Accessibility",
};

export default component$((props: { src: string }) => {
  const loc = useLocation();
  const locPathName = loc.url.pathname.replaceAll("/", "");

  return (
    <header class="flex items-center justify-between ">
      <div class="flex items-center gap-4">
        {loc.url.pathname !== "/" && (
          <>
            <QuizIcon
              class={quizColors[`${locPathName as keyof typeof quizColors}`]}
              src={props.src}
              height={28}
              width={28}
            />
            <h2 class="font-semi-bold text-hdgXs">
              {properTitles[`${locPathName as keyof typeof properTitles}`]}
            </h2>
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
