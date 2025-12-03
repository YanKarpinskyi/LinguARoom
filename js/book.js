const text = `
While the town of Lawrence was undergoing burning and pillage, Governor Shannon wrote to Colonel Sumner to say that as the marshal and sheriff had finished making their arrests, and he presumed had by that time dismissed the posse, he required a company of United States troops to be stationed at Lawrence to secure "the safety of the citizens in both, person and property," asking also a like company for Lecompton and Topeka. The next day the citizens of Lawrence had the opportunity to smother their indignation when they saw the embers of the Free-State Hotel and the scattered fragments of their printing-presses patrolled and "protected" by the Federal dragoons whose presence they had vainly implored a few days before. It was time the Governor should move. The guerrilla bands with their booty spread over the country, and the free-State men rose in a spirit of fierce retaliation. Assassinations, house-burnings, expulsions, and skirmishes broke out in all quarters. The sudden shower of lawlessness fell on the just and the unjust; and, forced at last to deal out equal protection, the Governor (June 4) issued his proclamation directing military organizations to disperse, "without regard to party names, or distinctions, and empowering Colonel Sumner to enforce the order. opportunity to smother their indignation when they saw the embers of the Free-State Hotel and the scattered fragments of their printing-presses patrolled and "protected" by the Federal dragoons whose presence they had vainly implored a few days before. It was time the Governor should move. The guerrilla bands with their booty spread over the country, and the free-State men rose in a spirit of fierce retaliation. Assassinations, house-burnings, expulsions, and skirmishes broke out in all quarters. The sudden shower of lawlessness fell on the just and the unjust; and, forced at last to deal out equal protection, the Governor (June 4) issued his proclamation directing military organizations to disperse, "without regard to party names, or distinctions," and empowering Colonel Sumner to enforce the order.`;

const leftPage = document.getElementById("pageLeft");
const rightPage = document.getElementById("pageRight");
const tooltip = document.getElementById("tooltip");

const cache = { explain: {}, translate: {} };

const paragraphs = text.trim().split("\n");

function fillBook() {
  leftPage.innerHTML = "";
  rightPage.innerHTML = "";
  let target = leftPage;

  paragraphs.forEach(par => {
    const words = par.split(/\s+/);
    let p = document.createElement("p");
    target.appendChild(p);

    words.forEach(wordWithPunct => {
      const cleanWord = wordWithPunct.replace(/[.,!?;:()"“”]/g, '').toLowerCase();
      const span = document.createElement("span");
      span.className = "word";
      span.dataset.word = cleanWord;
      span.textContent = wordWithPunct + " ";
      p.appendChild(span);

      if (target.scrollHeight > target.clientHeight + 20) {
        p.removeChild(span);
        if (p.textContent.trim() === "") target.removeChild(p);

        target = rightPage;
        p = document.createElement("p");
        target.appendChild(p);

        p.appendChild(span);
      }
    });
  });
}

fillBook();

async function getExplanation(word) {
  if (cache.explain[word]) return cache.explain[word];

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    const def = data[0]?.meanings[0]?.definitions[0];

    if (!def) throw new Error();

    const result = `${def.definition}${def.example ? `<br><small><i>Example: "${def.example}"</i></small>` : ''}`;

    cache.explain[word] = result;
    return result;
  } catch {
    return `<span class="error">Definition not found</span>`;
  }
}

async function getTranslation(word) {
  if (cache.translate[word]) return cache.translate[word];

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|uk`
    );
    const data = await res.json();

    if (data.responseStatus === 200) {
      const translation = data.responseData.translatedText;
      cache.translate[word] = translation;
      return translation;
    }
  } catch {}

  return "—";
}

document.addEventListener("click", async e => {
  if (e.target.classList.contains("word")) {
    const word = e.target.dataset.word;
    const rect = e.target.getBoundingClientRect();

    tooltip.innerHTML = `
      <button class="btn" data-action="explain" data-word="${word}">Explain</button>
      |
      <button class="btn" data-action="translate" data-word="${word}">Translate</button>
    `;
    tooltip.style.left = (rect.left + window.scrollX) + "px";
    tooltip.style.top = (rect.bottom + window.scrollY + 5) + "px";
    tooltip.classList.remove("hidden");
    return;
  }

  if (e.target.classList.contains("btn")) {
    const word = e.target.dataset.word;
    const action = e.target.dataset.action;

    tooltip.innerHTML = "<span class='loading'>Завантаження...</span>";

    if (action === "explain") {
      tooltip.innerHTML = `<b>${word}</b><br>${await getExplanation(word)}`;
    }

    if (action === "translate") {
      tooltip.innerHTML = `<b>${word}</b><br>${await getTranslation(word)}`;
    }

    return;
  }

  tooltip.classList.add("hidden");
});

const backBtn = document.getElementById("back-btn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    console.log("Back button clicked in book.html");
    window.location.href = "index.html";
  });
}