import { type ClassList, component$ } from "@builder.io/qwik";

export default component$(
  (props: { height: number; width: number; src: string; class: ClassList }) => {
    //div class must include a background color and opacity.

    return (
      <div class={["rounded-lg p-2", props.class]}>
        <img height={props.height} width={props.width} src={props.src} alt="" />
      </div>
    );
  },
);
