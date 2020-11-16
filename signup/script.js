const STEPS = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
];
const MAX_STEPS = 7;
let step = 0;

const radiosTo = document.querySelectorAll(".radio__to");

const element = (name) => document.querySelector(name);
const addAndRemoveHidden = (lastStep, nextStep) => {
  element(lastStep).classList.add("hidden");
  element(nextStep).classList.remove("hidden");
  element("#pet-slide").src = `../images/sign-up__${step}.jpg`;
};
const setRadioStep = () => {
  const FIRST_RADIO = step === 2;
  if (FIRST_RADIO) return (radiosTo[0].checked = true);

  const BETWEEN_THIRD_AND_FOURTH = step === 3 || step === 4;
  if (BETWEEN_THIRD_AND_FOURTH) return (radiosTo[1].checked = true);

  const BETWEEN_FIFTH_AND_SIXTH = step === 5 || step === 6;
  if (BETWEEN_FIFTH_AND_SIXTH) return (radiosTo[2].checked = true);

  const LAST_RADIO = step === 7;
  if (LAST_RADIO) return (radiosTo[3].checked = true);
};

const change = {
  1: () =>
    element(`.${STEPS[step]}`).parentNode.classList.remove("hidden"),
  2: (toggle = "add") => {
    element("footer").classList[toggle]("change__point");
    element(".side__content").classList[toggle]("change__point");
  },
};

function nextStep(e) {
  e.preventDefault();
  if (step === MAX_STEPS) {
    return;
  }

  step++;
  const lastStep = `.${STEPS[step - 1]}`;
  const nextStep = `.${STEPS[step]}`;
  addAndRemoveHidden(lastStep, nextStep);

  if (change[step]) change[step]();
  setRadioStep();
}

function backStep(e) {
  e.preventDefault();

  step--;
  const lastStep = `.${STEPS[step + 1]}`;
  const nextStep = `.${STEPS[step]}`;
  addAndRemoveHidden(lastStep, nextStep);

  if (step === 1) change["2"]("remove");
  setRadioStep();
}

element(".zip-code").addEventListener("submit", nextStep);
element(".sign-up").addEventListener("submit", (e) => {
  if (step !== MAX_STEPS) return nextStep(e);
});
element("#back-btn").addEventListener("click", backStep);
