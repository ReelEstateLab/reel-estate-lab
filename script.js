const leadInput = document.querySelector("#leadInput");
const generateBtn = document.querySelector("#generateBtn");
const result = document.querySelector("#result");
const copyBtn = document.querySelector("#copyBtn");
const leads = document.querySelector("#leads");
const lostRate = document.querySelector("#lostRate");
const dealValue = document.querySelector("#dealValue");
const calcResult = document.querySelector("#calcResult");

const formatter = new Intl.NumberFormat("hu-HU");

function inferIntent(text) {
  const lower = text.toLowerCase();
  if (lower.includes("megnéz") || lower.includes("időpont") || lower.includes("hétvég")) {
    return "Megtekintési időpont egyeztetés";
  }
  if (lower.includes("megvan") || lower.includes("elérhető")) {
    return "Elérhetőség ellenőrzése";
  }
  if (lower.includes("ár") || lower.includes("alku")) {
    return "Ár és alkulehetőség";
  }
  return "Általános érdeklődés";
}

function buildResponse() {
  const text = leadInput.value.trim();
  const intent = inferIntent(text);
  const response = "Szia! Igen, szívesen segítek. A lakás kapcsán tudok küldeni részleteket, és megtekintésre is tudunk időpontot egyeztetni. Neked a péntek délután vagy a szombat délelőtt lenne kényelmesebb? Ha megadod a telefonszámod, gyorsan visszahívlak.";
  const task = intent.includes("időpont") ? "Időpont egyeztetés ma 16:00 előtt" : "Visszahívás és részletek küldése";

  result.innerHTML = `
    <div class="result-card">
      <div>
        <span>Felismert szándék</span>
        <strong>${intent}</strong>
      </div>
      <div>
        <span>AI válaszjavaslat</span>
        <p>${response}</p>
      </div>
      <div>
        <span>Következő teendő</span>
        <strong>${task}</strong>
      </div>
      <div>
        <span>CRM státusz</span>
        <strong>Új lead - gyors válasz szükséges</strong>
      </div>
      <div>
        <span>Időnyereség</span>
        <strong>Kb. 5-8 perc megspórolt admin ezen az egy leaden</strong>
      </div>
    </div>
  `;
}

function updateCalculator() {
  const monthlyLeads = Math.max(Number(leads.value) || 0, 0);
  const lostPercent = Math.min(Math.max(Number(lostRate.value) || 0, 0), 100);
  const value = Math.max(Number(dealValue.value) || 0, 0);
  const estimated = monthlyLeads * (lostPercent / 100) * value;
  calcResult.textContent = `${formatter.format(Math.round(estimated))} Ft`;
}

async function copyScript() {
  const text = `Szia! Ingatlanosoknak építek egy egyszerű AI leadkezelő rendszert, ami segít gyorsabban válaszolni az érdeklődőknek, rendszerezi a leadeket, és automatikusan utánköveti azokat, akik még nem döntöttek.

Most az első pár ügyféllel tesztelem kedvezményes áron. Érdekelne egy 10 perces bemutató, hogy megmutassam, hogyan működne ez a te hirdetéseidnél?`;

  await navigator.clipboard.writeText(text);
  copyBtn.textContent = "Kimásolva";
  window.setTimeout(() => {
    copyBtn.textContent = "Üzenet másolása";
  }, 1600);
}

generateBtn.addEventListener("click", buildResponse);
[leads, lostRate, dealValue].forEach((input) => input.addEventListener("input", updateCalculator));
copyBtn.addEventListener("click", copyScript);

buildResponse();
updateCalculator();
