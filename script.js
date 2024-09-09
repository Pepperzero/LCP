//alert("it works");

/////////// MENU ANIMATIONS
window.addEventListener("DOMContentLoaded", (event) => {
  let navButton = $(".nav_btn");
  let menuWrap = $(".menu_wrap");
  let menuBackground = $(".menu_background");
  let lines = $(".nav_btn_line");

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
  showMainMenu.to(lines.eq(0), { y: 6, rotate: 45 }, "<");
  showMainMenu.to(lines.eq(1), { autoAlpha: 0 }, "<");
  showMainMenu.to(lines.eq(2), { y: -7, rotate: -45 }, "<");

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

////////// GLOBAL ANIMATIONS
gsap.registerPlugin(ScrollTrigger);

// Link timelines to scroll position
function createScrollTrigger(triggerElement, timeline) {
  // Reset tl when scroll out of view past bottom of screen
  ScrollTrigger.create({
    trigger: triggerElement,
    start: "top bottom",
    onLeaveBack: () => {
      timeline.progress(0);
      timeline.pause();
    },
  });
  // Play tl when scrolled into view (60% from top of screen)
  ScrollTrigger.create({
    trigger: triggerElement,
    start: "top 60%",
    onEnter: () => timeline.play(),
  });
}

$("[animate]").each(function (index) {
  let tl = gsap.timeline({ paused: true });
  tl.to($(this).children(), {
    opacity: 1,
    y: 0,
    duration: 1.4,
    ease: "power2.out",
    stagger: { amount: 0.3 },
  });
  createScrollTrigger($(this), tl);
});

//////////// DROPDOWNS
$(".faq_toggle").on("click", function () {
  // Close other accordions when opening new one
  if (!$(this).hasClass("open")) {
    $(".faq_toggle.open").click();
  }
  // Save the sibling of the toggle we clicked on
  let sibling = $(this).siblings(".faq_content");
  let animationDuration = 400;

  if ($(this).hasClass("open")) {
    // Close the content div if already open
    sibling.animate({ height: "0px" }, animationDuration);

    // Reset icon rotation when closing
    let icon = $(this).find(".faq_icon"); // Assuming the icon is inside the faq_toggle
    icon.css("transform", "rotate(0deg)");
  } else {
    // Open the content div if already closed
    sibling.css("height", "auto");
    let autoHeight = sibling.height();
    sibling.css("height", "0px");
    sibling.animate({ height: autoHeight }, animationDuration, function () {
      sibling.css("height", "auto");
    });

    // Rotate the icon 45 degrees here
    let icon = $(this).find(".faq_icon"); // Assuming the icon is inside the faq_toggle
    icon.css("transform", "rotate(45deg)");
  }
  // Open and close the toggle div
  $(this).toggleClass("open");
});

////////// CHARITY SWIPER
$(".charity-slider_component").each(function (index) {
  const swiper = new Swiper($(this).find(".swiper")[0], {
    effect: "fade",
    crossFade: true,
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 1200,
    centerInsufficientSlides: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
});
