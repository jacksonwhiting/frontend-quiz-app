export interface quizType {
  title: string;
  icon: string;
  color: string;
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
}

export const matchQuizData = (pathName: string, quizzes: quizType[]) => {
  const quizInfo = { title: "", icon: "", color: "" };
  quizzes.forEach((quiz: quizType) => {
    if (quiz.title.toLocaleLowerCase() === pathName) {
      quizInfo.title = quiz.title;
      quizInfo.icon = quiz.icon;
      quizInfo.color = quiz.color;
    }
  });
  return quizInfo;
};
