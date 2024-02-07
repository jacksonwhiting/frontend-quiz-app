import { component$ } from "@builder.io/qwik";
import type { ClassList } from "@builder.io/qwik";

export default component$(
  (props: { class: ClassList; height: number; width: number; src: string }) => {
    //div class must include a background color and opacity.
    return (
      <div class={["rounded-lg p-2", props.class]}>
        <img height={props.height} width={props.width} src={props.src} alt="" />
      </div>
    );
  },
);
