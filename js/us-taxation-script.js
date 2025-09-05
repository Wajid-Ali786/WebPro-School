/* 1---- Counter
 .webpro-freelance-skills-pay-counter h3 */
$(function () {
  // wrap numbers once
  $(".webpro-freelance-skills-pay-counter h3").each(function () {
    var $t = $(this);
    if ($t.find(".count").length) return;
    $t.html(
      $t.html().replace(/(\d[\d,]*)/g, function (m) {
        return (
          '<span class="count" data-target="' +
          m.replace(/,/g, "") +
          '">0</span>'
        );
      })
    );
  });

  function inView($el) {
    var wt = $(window).scrollTop(),
      wb = wt + $(window).height(),
      et = $el.offset().top,
      eb = et + $el.outerHeight();
    return et < wb && eb > wt;
  }

  function animate($s, dur) {
    if ($s.data("done")) return;
    var target = parseInt($s.data("target"), 10) || 0,
      startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / dur, 1),
        cur = Math.floor(target * p);
      $s.text(cur.toLocaleString());
      if (p < 1) requestAnimationFrame(step);
      else {
        $s.text(target.toLocaleString());
        $s.data("done", true);
      }
    }
    requestAnimationFrame(step);
  }

  $(window)
    .on("scroll load", function () {
      $(".webpro-counter-card").each(function () {
        var $card = $(this);
        if ($card.data("animated")) return;
        if (inView($card)) {
          $card.find(".count").each(function () {
            animate($(this), 1200);
          });
          $card.data("animated", true);
        }
      });
    })
    .trigger("load");
});

/* 2---- Counter
.results-speak-counter .title */
$(function () {
  var numRe = /(\d{1,3}(?:,\d{3})*(?:\.\d+)?|\d+(?:\.\d+)?)/g;

  // wrap numbers once
  $(".results-speak-counter .title").each(function () {
    var $t = $(this);
    if ($t.find(".count").length) return;
    $t.html(
      $t.html().replace(numRe, function (m) {
        var raw = m.replace(/,/g, "");
        var dec = raw.indexOf(".") > -1 ? raw.split(".")[1].length : 0;
        return (
          '<span class="count" data-target="' +
          raw +
          '" data-dec="' +
          dec +
          '">0</span>'
        );
      })
    );
  });

  function inView($el) {
    var wt = $(window).scrollTop(),
      wb = wt + $(window).height(),
      et = $el.offset().top,
      eb = et + $el.outerHeight();
    return et < wb && eb > wt;
  }

  function animate($s, dur) {
    if ($s.data("done")) return;
    var target = parseFloat($s.data("target")) || 0,
      dec = parseInt($s.data("dec"), 10) || 0,
      start = 0,
      t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var cur = start + (target - start) * p;
      if (dec > 0) {
        var v = Number(cur.toFixed(dec));
        $s.text(
          v.toLocaleString(undefined, {
            minimumFractionDigits: dec,
            maximumFractionDigits: dec,
          })
        );
      } else {
        $s.text(Math.floor(cur).toLocaleString());
      }
      if (p < 1) requestAnimationFrame(step);
      else $s.data("done", true);
    }
    requestAnimationFrame(step);
  }

  $(window)
    .on("scroll load", function () {
      $(".results-speak-counter .counter-item").each(function () {
        var $card = $(this);
        if ($card.data("animated")) return;
        if (inView($card)) {
          $card.find(".count").each(function () {
            animate($(this), 1200);
          });
          $card.data("animated", true);
        }
      });
    })
    .trigger("load");
});

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
  const form = document.querySelector(".search-form");
  const input = form && form.querySelector(".search-feild");
  const clearBtn = form && form.querySelector(".clear-icon");
  if (!form || !input || !clearBtn) return;

  function setInvalid(on) {
    input.classList.toggle("invalid", !!on);
  }

  function toggleClear() {
    clearBtn.style.display = input.value.trim() ? "block" : "none";
    if (input.value.trim()) setInvalid(false);
  }

  input.addEventListener("input", toggleClear);

  clearBtn.addEventListener("click", function () {
    input.value = "";
    toggleClear();
    input.focus();
  });

  form.addEventListener("submit", function (e) {
    if (!input.value.trim()) {
      e.preventDefault(); // don't open new tab
      setInvalid(true); // show red border only
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
