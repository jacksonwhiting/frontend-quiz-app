import { component$ } from "@builder.io/qwik";

export default component$(
  (props: { height: number; width: number; src: string; style: string }) => {
    //div class must include a background color and opacity.

    return (
      <div class="rounded-lg p-2" style={props.style}>
        <img height={props.height} width={props.width} src={props.src} alt="" />
      </div>
    );
  },
);
