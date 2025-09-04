/* Mobile Menu Toggle */
$(function () {
  const $menu = $(".mobile-menu"),
    $overlay = $(".overlay"),
    $links = $(".menu-link");
  function closeMenu() {
    $menu.removeClass("active");
    $overlay.removeClass("active");
    $("body").css("overflow", "");
  }
  $(".mobile-toggle").on("click", function () {
    $menu.add($overlay).addClass("active");
    $("body").css("overflow", "hidden");
  });
  $(".close-menu, .overlay").on("click", closeMenu);

  $links.on("click", function (e) {
    e.preventDefault();
    const $sub = $(this).next(".sub-menu"),
      $icon = $(this).find("i");

    $(".sub-menu")
      .not($sub)
      .removeClass("active")
      .prev(".menu-link")
      .find("i")
      .css("transform", "");

    $sub.toggleClass("active");
    $icon.css("transform", $sub.hasClass("active") ? "rotate(180deg)" : "");
  });
});

$(document).ready(function () {
  /* banner video */
  const $div = $(".banner-course-include-card .video-div");
  const video = $div.find("video")[0];
  const $btn = $div.find(".player");
  const $playI = $btn.find(".play");
  const $pauseI = $btn.find(".pause");

  $btn.on("click", () => {
    if (video.paused) {
      video.play();
      $div.addClass("playing");
      $playI.hide();
      $pauseI.show();
    } else {
      video.pause();
      $playI.show();
      $pauseI.hide();
    }
  });

  $(video).on("ended", () => {
    $div.removeClass("playing");
    $playI.show();
    $pauseI.hide();
  });
});

/* Key Lessons Vedios */
$(function () {
  const $popup = $("#videoPopup"),
    $popupVideo = $("#popupVideo");
  let $activeCard = null;

  $(".webpro-key-lessons-card .play").on("click", function (e) {
    e.stopPropagation();
    $activeCard = $(this).closest(".card-video");

    const videoSrc = $activeCard.find("video").attr("src");

    $activeCard.find(".play").removeClass("active").hide();
    $activeCard.find(".pause").removeClass("active");
    $activeCard.find(".loading-spinner").show();

    setTimeout(() => {
      $activeCard.find(".loading-spinner").hide();
      $popup.css("display", "flex");
      $popupVideo.attr("src", videoSrc)[0].play();
      $activeCard.find(".pause").addClass("active");
    }, 2000);
  });

  const closePopup = () => {
    $popup.fadeOut(() => {
      $popupVideo[0].pause();
      $popupVideo.attr("src", "");
      if ($activeCard) {
        $activeCard.find(".play").show().addClass("active");
        $activeCard.find(".pause").removeClass("active");
        $activeCard.find(".loading-spinner").hide();
        $activeCard = null;
      }
    });
  };

  $(".close-popup").on("click", closePopup);
  $popup.on("click", (e) => e.target === $popup[0] && closePopup());
});

// webpro whatsapp float icon
$(function () {
  const $waBtn = $(".whatsapp-float");

  $(window).on("scroll", function () {
    $waBtn.toggleClass("show", $(this).scrollTop() > 200);
  });

  $waBtn.on("click", function () {
    const $ripple = $("<span>").addClass("ripple-effect").appendTo(this);
    setTimeout(() => $ripple.remove(), 600);
  });
});

// fiverr vs upwork search
(function () {
  const form = document.querySelector('.search-form');
  const input = form && form.querySelector('.search-feild');
  const clearBtn = form && form.querySelector('.clear-icon');
  if (!form || !input || !clearBtn) return;

  function setInvalid(on) {
    input.classList.toggle('invalid', !!on);
  }

  function toggleClear() {
    clearBtn.style.display = input.value.trim() ? 'block' : 'none';
    if (input.value.trim()) setInvalid(false);
  }

  input.addEventListener('input', toggleClear);

  clearBtn.addEventListener('click', function () {
    input.value = '';
    toggleClear();
    input.focus();
  });

  form.addEventListener('submit', function (e) {
    if (!input.value.trim()) {
      e.preventDefault();   // don't open new tab
      setInvalid(true);     // show red border only
      input.focus();
    }
  });

  // init state
  toggleClear();
})();

// students reviews slider
const swiper = new Swiper(".webpro-studens-reviews-slider", {
  slidesPerView: "auto",
  spaceBetween: 32,
  navigation: false,
  pagination: false,
  grabCursor: true,
  breakpoints: {
    0: {
      spaceBetween: 20,
    },
    769: {
      spaceBetween: 32,
    },
  },
});

