const GOOGLE_FORM = {
  actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf9XcoyaLSNXl5RznuM3X2DwdyhaW45YBG5_ckvyBUiMX9vyg/formResponse",
  planField: "entry.227867586"
};

const scenes = {
  invitation: document.querySelector("#invitation"),
  celebration: document.querySelector("#celebration"),
  plans: document.querySelector("#plans"),
  result: document.querySelector("#result")
};

const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");
const notNowButton = document.querySelector("#not-now-button");
const persuasion = document.querySelector("#persuasion");
const seePlansButton = document.querySelector("#see-plans-button");
const chosenPlan = document.querySelector("#chosen-plan");
const submissionStatus = document.querySelector("#submission-status");
const shareChoiceButton = document.querySelector("#share-choice-button");

const noReplies = [
  { button: "Are you absolutely sure?", note: "There will almost certainly be snacks.", scale: 1.08 },
  { button: "but me soo adorable", note: "I can add excellent music and your favourite dessert.", scale: 1.16 },
  { button: "One last think?", note: "No pressure. The invitation is simply very hopeful.", scale: 1.22 }
];

let noCount = 0;
let selectedPlan = "";

function moveNoButton() {
  const margin = 16;
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;
  const maxLeft = Math.max(margin, window.innerWidth - buttonWidth - margin);
  const maxTop = Math.max(margin, window.innerHeight - buttonHeight - margin);

  noButton.style.left = `${margin + Math.random() * (maxLeft - margin)}px`;
  noButton.style.top = `${margin + Math.random() * (maxTop - margin)}px`;
}

function enableEvasiveNo() {
  document.body.append(noButton);
  noButton.classList.add("is-evasive");
  notNowButton.hidden = false;
  moveNoButton();
}

function showScene(sceneName) {
  Object.entries(scenes).forEach(([name, scene]) => {
    const isTarget = name === sceneName;
    scene.hidden = !isTarget;
    scene.classList.toggle("is-active", isTarget);
    scene.classList.toggle("is-entering", isTarget);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
  const heading = scenes[sceneName].querySelector("h1, h2");
  window.setTimeout(() => heading?.focus({ preventScroll: true }), 50);
}

function makeConfetti() {
  const confetti = document.querySelector("#confetti");
  const colors = ["#d94f70", "#f6d86f", "#7187b7", "#426b4f", "#ffffff"];

  for (let index = 0; index < 48; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--fall-time", `${3.5 + Math.random() * 3}s`);
    piece.style.setProperty("--delay", `${Math.random() * -5}s`);
    piece.style.setProperty("--rotation", `${Math.random() * 180}deg`);
    piece.style.setProperty("--confetti-color", colors[index % colors.length]);
    confetti.append(piece);
  }
}

async function submitChoice(plan) {
  if (!GOOGLE_FORM.actionUrl || !GOOGLE_FORM.planField) {
    submissionStatus.textContent = "Send your pick to Bubs so the planning can begin.";
    shareChoiceButton.hidden = false;
    return;
  }

  const formData = new FormData();
  formData.append(GOOGLE_FORM.planField, plan);

  try {
    await fetch(GOOGLE_FORM.actionUrl, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });
    submissionStatus.textContent = "Your answer has been sent to Bubs.";
  } catch (error) {
    submissionStatus.textContent = "The message did not send. Please tell Bubs your pick directly.";
  }
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.append(textArea);
  textArea.select();
  const copied = document.execCommand("copy");
  textArea.remove();

  if (!copied) {
    throw new Error("Copy is unavailable");
  }
}

async function shareChoice() {
  const message = `It’s a date! I pick: ${selectedPlan}.`;

  try {
    if (navigator.share) {
      await navigator.share({ title: "Our date plan", text: message });
      submissionStatus.textContent = "Your pick is ready for Bubs.";
      return;
    }

    await copyText(message);
    submissionStatus.textContent = "Choice copied. Paste it into a message to Bubs.";
  } catch (error) {
    if (error.name !== "AbortError") {
      submissionStatus.textContent = "Please take a screenshot and send it to Bubs.";
    }
  }
}

noButton.addEventListener("click", () => {
  if (noButton.classList.contains("is-evasive")) {
    moveNoButton();
    return;
  }

  const reply = noReplies[Math.min(noCount, noReplies.length - 1)];
  noButton.textContent = reply.button;
  persuasion.textContent = reply.note;
  document.documentElement.style.setProperty("--yes-scale", reply.scale);
  noCount += 1;

  if (noCount === 2) {
    enableEvasiveNo();
  }
});

noButton.addEventListener("pointerover", () => {
  if (noButton.classList.contains("is-evasive")) {
    moveNoButton();
  }
});

noButton.addEventListener("pointerdown", (event) => {
  if (noButton.classList.contains("is-evasive")) {
    event.preventDefault();
    moveNoButton();
  }
});

noButton.addEventListener("focus", () => {
  if (noButton.classList.contains("is-evasive")) {
    moveNoButton();
  }
});

window.addEventListener("resize", () => {
  if (noButton.classList.contains("is-evasive")) {
    moveNoButton();
  }
});

notNowButton.addEventListener("click", () => {
  document.querySelector("#invitation-title").textContent = "That’s completely okay.";
  document.querySelector(".intro").textContent = "Thank you for answering honestly. The invitation stays warm, with no awkwardness attached.";
  document.querySelector(".answer-area").hidden = true;
  noButton.hidden = true;
  persuasion.textContent = "You’re still wonderful, obviously.";
  notNowButton.hidden = true;
});

yesButton.addEventListener("click", () => {
  noButton.hidden = true;
  showScene("celebration");
  makeConfetti();
});

seePlansButton.addEventListener("click", () => showScene("plans"));

document.querySelectorAll(".choose-plan").forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan;
    selectedPlan = plan;
    chosenPlan.textContent = `You picked ${plan}. Bubs has excellent taste in dates and even better taste in company.`;
    showScene("result");
    submitChoice(plan);
  });
});

shareChoiceButton.addEventListener("click", shareChoice);