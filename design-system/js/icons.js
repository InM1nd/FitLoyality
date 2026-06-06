/* Icon helper — returns a Lucide placeholder span; lucide.createIcons() swaps to SVG */
window.ic = function (name, cls) {
  return '<i data-lucide="' + name + '"' + (cls ? ' class="' + cls + '"' : '') + '></i>';
};
/* (Re)render all lucide icons currently in the DOM */
window.renderIcons = function () {
  if (window.lucide && typeof lucide.createIcons === "function") {
    lucide.createIcons();
  }
};
