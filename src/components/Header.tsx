import { component$ } from "@builder.io/qwik";
import QuizIcon from "./Quiz-icon";

export default component$((props: { src: string }) => {
  return (
    <header class="flex items-center justify-between ">
      <div class="flex items-center gap-4">
        <QuizIcon
          class="bg-skin-brand-pri/10"
          src={props.src}
          height={28}
          width={28}
        />
        <h2 class="text-hdgXs font-semi-bold">Accessibility</h2>
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
