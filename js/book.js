const text = `
While the town of Lawrence was undergoing burning and pillage, Governor Shannon wrote to Colonel Sumner to say that as the marshal and sheriff had finished making their arrests, and he presumed had by that time dismissed the posse, he required a company of United States troops to be stationed at Lawrence to secure "the safety of the citizens in both person and property," asking also a like company for Lecompton and Topeka.

The next day the citizens of Lawrence had the opportunity to smother their indignation when they saw the embers of the Free-State Hotel and the scattered fragments of their printing-presses patrolled and "protected" by the Federal dragoons whose presence they had vainly implored a few days before.

It was time the Governor should move. The guerrilla bands with their booty spread over the country, and the`;

const bookText = document.getElementById("bookText");
const tooltip = document.getElementById("tooltip");

const leftPage = document.getElementById("pageLeft");
const rightPage = document.getElementById("pageRight");

const paragraphs = text.trim().split(/\n\s*\n/);

function fillBook() {
  leftPage.innerHTML = "";
  rightPage.innerHTML = "";

  let target = leftPage;

  paragraphs.forEach((par) => {
    const p = document.createElement("p");
    p.innerHTML = wrapWords(par);

    target.appendChild(p);

    if (target.scrollHeight > target.clientHeight) {
      target.removeChild(p);
      target = rightPage;
      rightPage.appendChild(p);
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
            <div class="btn" data-action="explain" data-word="${word}">Explain</div>
            <div class="btn" data-action="translate" data-word="${word}">Translate</div>
        `;

    tooltip.style.left = rect.left + "px";
    tooltip.style.top = rect.top + 20 + "px";
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
