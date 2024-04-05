import { component$, $, useStore, useVisibleTask$ } from "@builder.io/qwik";
import {
  useLocation,
  type DocumentHead,
  useNavigate,
} from "@builder.io/qwik-city";
import { quizzes } from "../../../data.json";
import QuizIcon from "~/components/Quiz-icon";

export default component$(() => {
  const loc = useLocation();
  const categoryPath = loc.params.category;
  const questionPathNumber = Number(loc.params.questions);
  const questionPath = loc.params.questions;
  const nav = useNavigate();
  const questionLetters = ["A", "B", "C", "D"];

  //Get persisted data from Session Storage
  const getSessionData = $(async () => {
    const sessionDataArr = [];
    for (const value of Object.values(sessionStorage)) {
      const newValue = await JSON.parse(value);
      sessionDataArr.push(newValue);
    }
    sessionDataArr.sort((a, b) => a.question - b.question);
    return sessionDataArr;
  });

  const clearSessionData = $(() => {
    sessionStorage.clear();
  });

  const quizState = useStore({
    selectedAnswer: "",
    submittedAnswer: "",
    numberCorrectAnswers: 0,
    hideSubmit: false,
    answerIsCorrect: false,
    answerIsIncorrect: false,
    disableRadioInputs: false,
    showErrorMsg: false,
  });

  interface questionTrackerTypes {
    question: number;
    selectedAnswer: string;
    submittedAnswer: string;
    hideSubmit: boolean;
    answerIsCorrect: boolean;
    answerIsIncorrect: boolean;
    numberCorrectAnswers: number | undefined;
  }

  // const questionTracker: questionTrackerTypes[] = useStore([]);

  const pushDataToTracker = $(() => {
    const questionTracker = {
      question: questionPathNumber,
      selectedAnswer: quizState.submittedAnswer,
      submittedAnswer: quizState.submittedAnswer,
      hideSubmit: true,
      answerIsCorrect: quizState.answerIsCorrect,
      answerIsIncorrect: quizState.answerIsIncorrect,
      numberCorrectAnswers: quizState.numberCorrectAnswers,
    };

    console.log("push data to tracker");
    const stringTracker = JSON.stringify(questionTracker);
    sessionStorage.setItem(String(questionPathNumber), stringTracker);
  });

  const submitHandlerCorrect = $(() => {
    quizState.numberCorrectAnswers++;
    quizState.submittedAnswer = quizState.selectedAnswer;
    quizState.answerIsCorrect = true;
    quizState.disableRadioInputs = true;
    quizState.showErrorMsg = false;
    quizState.hideSubmit = true;
  });

  const submitHandlerIncorrect = $(() => {
    quizState.hideSubmit = true;
    quizState.submittedAnswer = quizState.selectedAnswer;
    quizState.answerIsIncorrect = true;
    quizState.disableRadioInputs = true;
    quizState.showErrorMsg = false;
    quizState.hideSubmit = true;
  });

  const submitHandler = $(async (quizAnswer: string) => {
    if (!quizState.selectedAnswer) {
      quizState.showErrorMsg = true;
    } else if (quizState.selectedAnswer === quizAnswer) {
      await submitHandlerCorrect();
      await pushDataToTracker();
    } else {
      await submitHandlerIncorrect();
      await pushDataToTracker();
    }
  });

  const ifBackwardsNavigate = $((answeredQuestions: questionTrackerTypes[]) => {
    answeredQuestions.forEach((question) => {
      if (question.question === questionPathNumber) {
        quizState.disableRadioInputs = true;
        quizState.hideSubmit = true;
        quizState.selectedAnswer = question.selectedAnswer;
        quizState.submittedAnswer = question.submittedAnswer;
        quizState.answerIsCorrect = question.answerIsCorrect;
        quizState.answerIsIncorrect = question.answerIsIncorrect;
      }
    });
  });

  const restoreDefaults = $(() => {
    quizState.selectedAnswer = "";
    quizState.submittedAnswer = "";
    quizState.hideSubmit = false;
    quizState.answerIsCorrect = false;
    quizState.answerIsIncorrect = false;
    quizState.disableRadioInputs = false;
  });

  useVisibleTask$(async () => {
    const answeredQuestions = await getSessionData();

    if (answeredQuestions.length > 0) {
      const lastAnsweredQuestion = answeredQuestions.filter(
        (item) => item.question === answeredQuestions.length,
      );
      quizState.numberCorrectAnswers =
        lastAnsweredQuestion[0].numberCorrectAnswers;
      console.log(answeredQuestions);
      console.log(quizState.numberCorrectAnswers);
    }

    ifBackwardsNavigate(answeredQuestions);

    console.log("Runs once when the component mounts in the server OR client.");
  });

  return (
    <>
      {quizzes.map((quiz) => {
        if (
          categoryPath === quiz.title.toLowerCase() &&
          questionPathNumber <= quiz.questions.length
        ) {
          return (
            <section
              key={quiz.title}
              class="mx-auto mt-10 max-w-screen-md gap-28 xl:mt-16 xl:grid xl:max-w-screen-xl xl:grid-cols-2 xl:grid-rows-2"
            >
              <div class="contents xl:block">
                <h2 class="text-bodyM font-light italic leading-6 text-skin-text-question dark:text-[#ABC1E1] xl:text-hdgXs ">
                  {`Question ${questionPathNumber} of ${quiz.questions.length}`}
                </h2>
                <h3 class="mt-4 text-[1.25rem] font-medium leading-7 text-skin-text-pri dark:text-skin-brand-sec xl:mt-10 xl:text-hdgS">
                  {quiz.questions[questionPathNumber - 1].question}
                </h3>

                {/* Progress Bar */}
                <div class="mt-6 self-start rounded-full bg-skin-brand-sec p-[0.175rem] dark:bg-skin-fill-navy xl:mt-60">
                  <div
                    style={`width: ${questionPathNumber * 10}%`}
                    class="rounded-full bg-skin-brand-pri p-1 xl:p-[.2rem]"
                  ></div>
                </div>
              </div>

              {/* Quiz Questions */}
              <form class="mt-10 space-y-4 xl:mt-0">
                {quiz.questions[questionPathNumber - 1].options.map(
                  (choice, index) => {
                    return (
                      <label
                        key={index}
                        class={[
                          "flex w-full items-center justify-between gap-4 rounded-2xl bg-white p-3 outline-none focus-within:ring-4 focus-within:ring-skin-brand-pri dark:bg-skin-fill-navy",
                          choice === quizState.submittedAnswer &&
                            quizState.answerIsCorrect &&
                            "ring-4 ring-skin-success focus-within:ring-skin-success",
                          choice === quizState.submittedAnswer &&
                            quizState.answerIsIncorrect &&
                            "ring-4 ring-skin-caution focus-within:ring-skin-caution",
                        ]}
                      >
                        <input
                          type="radio"
                          disabled={quizState.disableRadioInputs}
                          class="peer sr-only"
                          onclick$={(event, currentTarget) => {
                            quizState.selectedAnswer = currentTarget.value;
                            // console.log(quizState.selectedAnswer);
                          }}
                          name={quiz.questions[
                            questionPathNumber - 1
                          ].question.replaceAll(" ", "-")}
                          value={choice}
                        />

                        <div class="flex items-center gap-4">
                          <div class="h-14 w-14 shrink-0 rounded-lg bg-skin-fill-pri p-2 text-center text-hdgS text-skin-text-question">
                            {questionLetters[index]}
                          </div>
                          <h2 class="text-left text-[1rem] text-skin-text-pri dark:text-skin-brand-sec xl:text-[1.3rem]">
                            {choice}
                          </h2>
                        </div>

                        <div class="h-[40px] w-[40px]">
                          {choice === quizState.submittedAnswer &&
                            quizState.answerIsCorrect && (
                              <img
                                src="/media/icon-correct.svg"
                                width={40}
                                height={40}
                              ></img>
                            )}
                          {choice === quizState.submittedAnswer &&
                            quizState.answerIsIncorrect && (
                              <img
                                src="/media/icon-incorrect.svg"
                                width={40}
                                height={40}
                              ></img>
                            )}
                        </div>
                      </label>
                    );
                  },
                )}

                {/* Submit Button */}
                {!quizState.hideSubmit && (
                  <button
                    type="button"
                    preventdefault:click
                    onClick$={async () => {
                      await submitHandler(
                        quiz.questions[questionPathNumber - 1].answer,
                      );
                      await getSessionData();
                    }}
                    class="flex w-full cursor-pointer items-center justify-center rounded-2xl bg-skin-brand-pri p-4 text-hdgXs text-skin-brand-sec xl:text-[1.3rem]"
                  >
                    Submit Answer
                  </button>
                )}

                {/* Next Question Button */}
                {quizState.hideSubmit && (
                  <a
                    href={
                      questionPathNumber < quiz.questions.length
                        ? `../${questionPathNumber + 1}`
                        : `../results`
                    }
                    type="button"
                    onClick$={() => {
                      restoreDefaults();
                    }}
                    class="flex w-full cursor-pointer items-center justify-center rounded-2xl bg-skin-brand-pri p-4 text-hdgXs text-skin-brand-sec xl:text-[1.3rem]"
                  >
                    Next Question
                  </a>
                )}

                {/* Error message if no answer is selected */}
                {quizState.showErrorMsg && (
                  <div class="flex items-center justify-center gap-2">
                    <img
                      src="/media/icon-incorrect.svg"
                      width={40}
                      height={40}
                    ></img>
                    <p class="text-hdgXs text-skin-caution">
                      Please select an answer
                    </p>
                  </div>
                )}
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
            <div
              key={quiz.title}
              class="mx-auto mt-16 max-w-screen-md xl:mt-20 xl:grid xl:max-w-screen-xl xl:grid-cols-2 xl:gap-16"
            >
              <h2 class="mb-8 text-hdgM font-light text-skin-text-pri dark:text-skin-brand-sec xl:mb-0 xl:text-hdgL">
                Quiz completed <br />
                <b class="font-medium">You scored...</b>
              </h2>
              <div class="contents xl:block">
                <div class="mb-4 space-y-4 rounded-xl  bg-white px-3 py-8 text-center dark:bg-skin-fill-navy">
                  <div class="flex items-center justify-center gap-4">
                    {loc.url.pathname !== "/" && (
                      <>
                        <QuizIcon
                          style={`background-color: ${quiz.color}`}
                          src={quiz.icon}
                          height={28}
                          width={28}
                        />
                        <h2 class="font-semi-bold text-hdgXs dark:text-skin-brand-sec xl:text-hdgS">
                          {quiz.title}
                        </h2>
                      </>
                    )}
                  </div>
                  <p class="text-[5.5rem] font-medium leading-none text-skin-text-pri dark:text-skin-brand-sec xl:text-[8rem]">
                    {quizState.numberCorrectAnswers}
                  </p>
                  <p class="dark:text-skin-[#ABC1E1] text-hdgXs font-light text-skin-text-question dark:font-medium xl:text-hdgS">
                    {`out of ${quiz.questions.length}`}
                  </p>
                </div>

                {/* Play Again button */}
                <a
                  href={`/`}
                  type="button"
                  preventdefault:click
                  onClick$={() => {
                    clearSessionData();
                    restoreDefaults();
                    nav("/");
                  }}
                  class="flex w-full cursor-pointer items-center justify-center rounded-2xl bg-skin-brand-pri p-4 text-hdgXs text-skin-brand-sec xl:text-hdgS"
                >
                  Play Again
                </a>
              </div>
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
