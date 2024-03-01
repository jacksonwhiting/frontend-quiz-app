import { component$, useSignal, $ } from "@builder.io/qwik";
import { Link, useLocation, type DocumentHead } from "@builder.io/qwik-city";
import ImgIconCorrect from "../../../media/icon-correct.svg?jsx";
import ImgIconIncorrect from "../../../media/icon-incorrect.svg?jsx";
import { quizzes } from "../../../data.json";
import QuizIcon from "~/components/Quiz-icon";

export default component$(() => {
  const loc = useLocation();
  const categoryPath = loc.params.category;
  const questionPathNumber = Number(loc.params.questions);
  const questionPath = loc.params.questions;
  const selectedAnswer = useSignal("");
  const numberCorrectAnswers = useSignal(0);
  const questionLetters = ["A", "B", "C", "D"];
  const hideSubmit = useSignal(false);
  const answerIsCorrect = useSignal(false);
  const successVisible = useSignal(false);
  const failureVisible = useSignal(false);
  const submitHandlerCorrect = $(() => {
    numberCorrectAnswers.value++;
    hideSubmit.value = true;
    successVisible.value = true;
    failureVisible.value = false;
    answerIsCorrect.value = true;
    console.log("correct");
  });
  const submitHandlerIncorrect = $(() => {
    hideSubmit.value = true;
    failureVisible.value = true;
    successVisible.value = false;
    console.log("incorrect");
  });

  return (
    <>
      {quizzes.map((quiz) => {
        if (
          categoryPath === quiz.title.toLowerCase() &&
          questionPathNumber <= quiz.questions.length
        ) {
          return (
            <section key={quiz.title} class="mt-10">
              <h2 class="text-skin-text-question text-bodyM font-light italic leading-6 ">
                {`Question ${questionPathNumber} of ${quiz.questions.length}`}
              </h2>
              <h3 class="mt-4 text-[1.25rem] font-medium leading-7 text-skin-text-pri">
                {quiz.questions[questionPathNumber - 1].question}
              </h3>

              {/* Progress Bar */}
              <div class="mt-6 rounded-full bg-skin-brand-sec p-1">
                <div
                  style="width: 20%"
                  class="rounded-full bg-skin-brand-pri p-1"
                ></div>
              </div>

              {/* Quiz Questions */}
              <form class="mt-10 space-y-4">
                {quiz.questions[questionPathNumber - 1].options.map(
                  (choice, index) => {
                    return (
                      <label
                        key={index}
                        class={[
                          "flex w-full items-center justify-between gap-6 rounded-2xl bg-white p-3 outline-none focus-within:ring-4 focus-within:ring-skin-brand-pri",
                          choice ===
                            quiz.questions[questionPathNumber - 1].answer &&
                            answerIsCorrect.value &&
                            "ring-4 ring-skin-success focus-within:ring-skin-success",
                        ]}
                      >
                        <input
                          type="radio"
                          class="sr-only"
                          onChange$={(event, currentTarget) => {
                            selectedAnswer.value = currentTarget.value;
                            console.log(selectedAnswer.value);
                          }}
                          name={quiz.questions[
                            questionPathNumber - 1
                          ].question.replaceAll(" ", "-")}
                          value={choice}
                        />
                        <div class="flex items-center gap-6">
                          <div class="text-skin-text-question h-14 w-14 rounded-lg bg-skin-fill-pri p-2 text-center text-hdgS">
                            {questionLetters[index]}
                          </div>
                          <h2 class="text-hdgXs text-left text-skin-text-pri">
                            {choice}
                          </h2>
                        </div>
                        {successVisible.value && <ImgIconCorrect />}
                        {failureVisible.value && <ImgIconIncorrect />}
                      </label>
                    );
                  },
                )}

                {/* Submit Button */}
                <button
                  type="button"
                  preventdefault:click
                  onClick$={() =>
                    selectedAnswer.value ===
                    quiz.questions[questionPathNumber - 1].answer
                      ? submitHandlerCorrect()
                      : submitHandlerIncorrect()
                  }
                  class="text-hdgXs flex w-full cursor-pointer items-center justify-center rounded-2xl bg-skin-brand-pri p-4 text-skin-brand-sec"
                >
                  Submit Answer
                </button>
                <p>{numberCorrectAnswers}</p>
                <Link
                  href={
                    questionPathNumber < quiz.questions.length
                      ? `../${questionPathNumber + 1}`
                      : `../results`
                  }
                  type="button"
                  class="text-hdgXs flex w-full cursor-pointer items-center justify-center rounded-2xl bg-skin-brand-pri p-4 text-skin-brand-sec"
                >
                  Next Question
                </Link>

                {/* No answer selected error message */}
                <div class="flex items-center justify-center gap-2">
                  <ImgIconIncorrect></ImgIconIncorrect>
                  <p class="text-hdgXs text-skin-caution">
                    Please select an answer
                  </p>
                </div>
              </form>
            </section>
          );
        }
      })}

      {/* Quiz completed page */}
      {quizzes.map((quiz) => {
        if (
          categoryPath === quiz.title.toLowerCase() &&
          questionPath === "results"
        ) {
          return (
            <div key={quiz.title} class="mt-10">
              <h2 class="mb-8 text-hdgM font-light text-skin-text-pri">
                Quiz completed <br />
                <b class="font-medium">You scored...</b>
              </h2>
              <div class="mb-4 space-y-4 rounded-xl bg-white px-3 py-8 text-center">
                <div class="flex items-center justify-center gap-4">
                  {loc.url.pathname !== "/" && (
                    <>
                      <QuizIcon
                        style={`background-color: ${quiz.color}`}
                        src={quiz.icon}
                        height={28}
                        width={28}
                      />
                      <h2 class="font-semi-bold text-hdgXs">{quiz.title}</h2>
                    </>
                  )}
                </div>
                <p class="text-[5.5rem] font-medium leading-none text-skin-text-pri">
                  8
                </p>
                <p class="text-hdgXs text-skin-text-question font-light">
                  {`out of ${quiz.questions.length}`}
                </p>
              </div>

              {/* Play Again button */}
              <a
                href={`/`}
                type="button"
                class="text-hdgXs flex w-full cursor-pointer items-center justify-center rounded-2xl bg-skin-brand-pri p-4 text-skin-brand-sec"
              >
                Play Again
              </a>
            </div>
          );
        }
      })}
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
