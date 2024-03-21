import { component$ } from "@builder.io/qwik";

import QuizIcon from "./Quiz-icon";

export default component$(
  (props: { style: string; src: string; name: string }) => {
    return (
      <div class="dark:bg-skin-fill-navy mb-4 flex items-center gap-3 rounded-xl bg-white p-3 dark:text-white sm:gap-6">
        <QuizIcon style={props.style} height={40} width={40} src={props.src} />
        <h2 class="text-hdgXs font-normal sm:text-hdgS ">{props.name}</h2>
      </div>
    );
  },
);
