function setLanguage(lang) {
  document.querySelectorAll("[data-es]").forEach(el => {
    el.textContent = el.dataset[lang];
  });

  document.querySelectorAll("[data-placeholder-es]").forEach(el => {
    el.placeholder = el.getAttribute(`data-placeholder-${lang}`);
  });
  
  document.querySelectorAll(".language-switch button")
    .forEach(btn => btn.classList.remove("active"));

  document.querySelector(`.language-switch button[data-lang="${lang}"]`)
    .classList.add("active");

  localStorage.setItem("language", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".language-switch button").forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

  const savedLang = localStorage.getItem("language");

  if (savedLang) {
    setLanguage(savedLang);
  } else {
    const browserLang = navigator.language.startsWith("es") ? "es" : "en";
    setLanguage(browserLang);
  }
});
