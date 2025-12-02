const text = `
While the town of Lawrence was undergoing burning and pillage, Governor Shannon wrote to Colonel Sumner to say that as the marshal and sheriff had finished making their arrests, and he presumed had by that time dismissed the posse, he required a company of United States troops to be stationed at Lawrence to secure "the safety of the citizens in both person and property," asking also a like company for Lecompton and Topeka.
The next day the citizens of Lawrence had the opportunity to smother their indignation when they saw the embers of the Free-State Hotel and the scattered fragments of their printing-presses patrolled and "protected" by the Federal dragoons whose presence they had vainly implored a few days before.
It was time the Governor should move. The guerrilla bands with their booty spread over the country, and the free-State men rose in a`;

const bookText = document.getElementById("bookText");
const tooltip = document.getElementById("tooltip");

const leftPage = document.getElementById("pageLeft");
const rightPage = document.getElementById("pageRight");

const paragraphs = text.trim().split("\n");

function fillBook() {
  leftPage.innerHTML = "";
  rightPage.innerHTML = "";

  let target = leftPage;

  paragraphs.forEach((par) => {
    let words = par.split(/\s+/);
    let p = document.createElement("p");

    target.appendChild(p);

    for (let w of words) {
      const span = document.createElement("span");
      span.className = "word";
      span.dataset.word = w;
      span.textContent = w + " ";

      p.appendChild(span);

      if (target.scrollHeight > target.clientHeight) {
        p.removeChild(span);

        if (p.textContent.trim() === "") {
          target.removeChild(p);
        }

        target = rightPage;

        p = document.createElement("p");
        rightPage.appendChild(p);

        p.appendChild(span);
      }
    }
  });
}

function wrapWords(par) {
  return par
    .split(/\s+/)
    .map((w, i) => `<span class="word" data-word="${w}" id="w${i}">${w}</span>`)
    .join(" ");
}

fillBook();

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("word")) {
    const word = e.target.dataset.word;
    const rect = e.target.getBoundingClientRect();

    tooltip.innerHTML = `
        <button class="btn" data-action="explain" data-word="${word}">Explain</button>
        |
        <button class="btn" data-action="translate" data-word="${word}">Translate</button>
    `;

    tooltip.style.left = rect.left + "px";
    tooltip.style.top = rect.top + 28 + "px";
    tooltip.classList.remove("hidden");
    return;
  }

  if (e.target.classList.contains("btn")) {
    const action = e.target.dataset.action;
    const word = e.target.dataset.word;

    if (action === "explain") explain(word);
    if (action === "translate") translate(word);

    return;
  }

  tooltip.classList.add("hidden");
});

function explain(word) {
  tooltip.innerHTML = `<b>${word}</b>: ${getExplain(word)}`;
}

function translate(word) {
  tooltip.innerHTML = `<b>${word}</b>: ${getTranslate(word)}`;
}

function getExplain(word) {
  return "This is a placeholder explanation.";
}

function getTranslate(word) {
  return "переклад (демо)";
}
