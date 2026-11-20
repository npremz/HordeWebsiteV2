/**
 * Horloge « MAR_15:44:22_17° » : jour, heure et température actuelle à Bruxelles (open-meteo).
 * Remplit tous les blocs `[data-home-clock]` de la page (hero de la home, carte BXL de la page
 * « L’agence ») :
 * - `data-days` : JSON des 7 jours abrégés, dimanche en premier ;
 * - `[data-home-clock-time]` reçoit « MAR_15:44:22 », `[data-home-clock-temp]` la température ;
 * - `[data-home-weather]` (pictos météo, facultatifs) : seul celui du temps actuel reste affiché.
 */

// Codes WMO renvoyés par open-meteo → picto affiché.
function weatherKind(code: number) {
  if (code <= 1) return "sun";
  if (code >= 95) return "storm";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if (code >= 51) return "rain";
  return "cloud";
}

let clockTimer: number | undefined;
let weatherTimer: number | undefined;

const pad = (value: number) => value.toString().padStart(2, "0");

function tick() {
  const now = new Date();
  document.querySelectorAll<HTMLElement>("[data-home-clock]").forEach((clock) => {
    const days = JSON.parse(clock.dataset.days || "[]") as string[];
    const target = clock.querySelector<HTMLElement>("[data-home-clock-time]");
    if (!target) return;
    target.textContent = `${days[now.getDay()] ?? ""}_${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  });
}

async function fetchWeather() {
  try {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=50.8503&longitude=4.3517&current_weather=true",
      { signal: controller.signal },
    );
    window.clearTimeout(timeout);
    const data = await response.json();
    const temp = Math.round(data.current_weather.temperature);
    const kind = weatherKind(Number(data.current_weather.weathercode));

    document.querySelectorAll<HTMLElement>("[data-home-clock-temp]").forEach((el) => {
      el.textContent = String(temp);
    });
    document.querySelectorAll<SVGElement>("[data-home-weather]").forEach((el) => {
      el.style.display = el.dataset.homeWeather === kind ? "" : "none";
    });
  } catch {
    // On garde les valeurs par défaut si l'API ne répond pas.
  }
}

/** Idempotent : relancer après une navigation remet les minuteurs à zéro. */
export function initHomeClock(): void {
  window.clearInterval(clockTimer);
  window.clearInterval(weatherTimer);
  if (!document.querySelector("[data-home-clock]")) return;

  tick();
  fetchWeather();
  clockTimer = window.setInterval(tick, 1000);
  weatherTimer = window.setInterval(fetchWeather, 15 * 60 * 1000);
}
