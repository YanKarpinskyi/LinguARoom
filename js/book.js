const text = `
While the town of Lawrence was undergoing burning and pillage, Governor Shannon wrote to Colonel Sumner to say that as the marshal and sheriff had finished making their arrests, and he presumed had by that time dismissed the posse, he required a company of United States troops to be stationed at Lawrence to secure "the safety of the citizens in both person and property," asking also a like company for Lecompton and Topeka.

The next day the citizens of Lawrence had the opportunity to smother their indignation when they saw the embers of the Free-State Hotel and the scattered fragments of their printing-presses patrolled and "protected" by the Federal dragoons whose presence they had vainly implored a few days before.

It was time the Governor should move. The guerrilla bands with their booty spread over the country, and the`;

const bookText = document.getElementById("bookText");
const tooltip = document.getElementById("tooltip");

const leftPage = document.getElementById("pageLeft");
const rightPage = document.getElementById("pageRight");

// Розбиваємо текст на параграфи
const paragraphs = text.trim().split(/\n\s*\n/);

function fillBook() {
  leftPage.innerHTML = "";
  rightPage.innerHTML = "";

  let target = leftPage;

  paragraphs.forEach((par) => {
    const p = document.createElement("p");
    p.innerHTML = wrapWords(par);

    target.appendChild(p);

    // Перевірка переповнення
    if (target.scrollHeight > target.clientHeight) {
      // Переносимо абзац на праву сторінку
      target.removeChild(p);
      target = rightPage;
      rightPage.appendChild(p);
    }
  });
}

// Обгортаємо слова в <span class="word">
function wrapWords(par) {
  return par
    .split(/\s+/)
    .map((w, i) => `<span class="word" data-word="${w}" id="w${i}">${w}</span>`)
    .join(" ");
}

fillBook();

bookText.addEventListener("click", (e) => {
  if (!e.target.classList.contains("word")) return;

  const word = e.target.dataset.word;
  const rect = e.target.getBoundingClientRect();

  tooltip.innerHTML = `
        <div><b>${word}</b></div>
        <div class="btn" onclick="explain('${word}')">Explain</div>
        <div class="btn" onclick="translate('${word}')">Translate</div>
    `;

  tooltip.style.left = rect.left + "px";
  tooltip.style.top = rect.top - 40 + "px";
  tooltip.classList.remove("hidden");
});

function explain(word) {
  tooltip.innerHTML = `<b>${word}</b>: This is a placeholder explanation.`;
}

function translate(word) {
  tooltip.innerHTML = `<b>${word}</b>: переклад (демо).`;
}

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("word")) {
    tooltip.classList.add("hidden");
  }
});
