export function setTheme(name) {
  document.documentElement.setAttribute("data-theme", name);
  localStorage.setItem("wsie-theme", name);
}
export function initTheme(defaultName = "peach") {
  const saved = localStorage.getItem("wsie-theme");
  setTheme(saved || defaultName);
}
