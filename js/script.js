// Mobile Menu Toggle
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

// Banner Video (play on load)
const video = document.querySelector(".webpro-banner-video");
video.addEventListener("click", () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

$(document).ready(function () {
  /* Mentor Slider */
  const mentorSwiper = new Swiper(".mentor-swiper", {
    spaceBetween: 26,
    loop: false,
    autoplay: false,
    navigation: false, // set true if you want arrows
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      500: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 4.2,
        spaceBetween: 26,
      }, // Apply on large desktops
    },
  });

  /* select2 for select */
  $("#area-of-intrest").select2({
    minimumResultsForSearch: Infinity,
    dropdownAutoWidth: true,
    width: "100%",
  });

  /* Events Slider  */
  const eventsSwiper = new Swiper(".events-swiper", {
    spaceBetween: 21,
    loop: false,
    autoplay: false,
    navigation: {
      nextEl: ".event-button-next",
      prevEl: ".event-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
       550: {
        slidesPerView: 1.4,
      },
      768: {
        slidesPerView: 1.7,
      },
      850: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 2.5,
      },
      1200: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 3, // Apply on large desktops
      },
    },
  });

  /* testimonials Slider  */
  $(".testimonials-nav-swiper .swiper-wrapper").slick({
    slidesToShow: 3.3,
    centerPadding: "0",
    slidesToScroll: 1,
    asNavFor: ".testimonials-main-swiper .swiper-wrapper",
    dots: false,
    arrows: false,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 501, // below 500px
        settings: {
          slidesToShow: 1.2,
        },
      },
      {
        breakpoint: 769, // below 768px
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 993, // below 992px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1101, // below 1100px
        settings: {
          slidesToShow: 2.8,
        },
      },
      {
        breakpoint: 1301, // below 1300px
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });

  $(".testimonials-main-swiper .swiper-wrapper").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: ".testimonials-nav-swiper .swiper-wrapper",
    prevArrow: $(".swiper-button-prev"),
    nextArrow: $(".swiper-button-next"),
  });
});

/* Success Stories Video player */
$(function () {
  $(".webpro-success-card-video").each(function () {
    const $c = $(this),
      $v = $c.find("video"),
      $pl = $c.find(".success-play"),
      $pa = $c.find(".success-pause");

    function playVideo(delay) {
      const $spinner = $c.find(".loading-spinner");
      $spinner.show();
      $pl.removeClass("active");

      setTimeout(() => {
        $spinner.hide();
        $c.addClass("has-played");
        $v.addClass("play-effect")[0].play();
        $pa.addClass("active");
      }, delay);
    }

    $pl.on("click", function () {
      const delay = $c.hasClass("has-played") ? 500 : 2000;
      playVideo(delay);
    });

    $pa.on("click", function () {
      $v.removeClass("play-effect")[0].pause();
      $pa.removeClass("active");
      $pl.addClass("active");
    });

    $v.on("ended", function () {
      $v.removeClass("play-effect");
      $pa.removeClass("active");
      $pl.addClass("active");
    });
  });
});

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
