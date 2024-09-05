//alert("it works");

///// GSAP

//Menu animation
window.addEventListener("DOMContentLoaded", (event) => {
  let navButton = $(".nav_btn");
  let menuWrap = $(".menu_wrap");
  let menuBackground = $(".menu_background");
  let lines = $(".nav_button_line");

  let showMainMenu = gsap.timeline({
    paused: true,
    defaults: { duration: 0.5 },
    onReverseComplete: () => {
      navButton.attr("aria-label", "Open Main Menu");
    },
    onComplete: () => {
      menuWrap.find("button").first().focus();
      navButton.attr("aria-label", "Close Main Menu");
    },
  });
  showMainMenu.set(menuWrap, { display: "block" });
  showMainMenu.to("html", { "--navbar--text": "#131936" }, "<");
  showMainMenu.set(menuBackground, { display: "block" }, "<");
  showMainMenu.from(menuWrap, { y: "-100%" }, "<");
  showMainMenu.from(menuBackground, { opacity: 0 }, "<");
  showMainMenu.to(lines.eq(0), { y: 4, rotate: 45 }, "<");
  showMainMenu.to(lines.eq(1), { y: -4, rotate: -45 }, "<");

  navButton.on("click", function () {
    if (showMainMenu.progress() === 0) {
      showMainMenu.play();
    } else {
      showMainMenu.reverse();
      navButton.attr("aria-label", "Open Main Menu");
    }
  });

  menuBackground.on("click", function () {
    showMainMenu.reverse();
  });
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") showMainMenu.reverse();
  });
});
