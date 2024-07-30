(function ($) {
  'use strict';

  /*
  |--------------------------------------------------------------------------
  | Template Name: Arkdin
  | Author: ThemeServices
  | Version: 1.0.0
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  |
  | 1. Preloader
  | 2. Mobile Menu
  | 3. Sticky Header
  | 4. Dynamic Background
  | 5. Slick Slider
  | 6. Horizonta Full Screen Swiper Slider
  | 7. Vertical Full Screen Swiper Slider
  | 8. Parallax Swiper Slider
  | 9. Modal Video
  | 10. Scroll Up
  | 11. Ripple
  | 12. Counter Animation
  | 13. Accordian
  | 14. Tabs
  | 15. Hover To Active
  | 16. Progress Bar
  | 17. Review
  | 18. Shining Active
  | 19. Hobble Effect
  | 20. Scroll Slider
  |
  */

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on('load', function () {
    preloader();
  });

  $(function () {
    mainNav();
    stickyHeader();
    dynamicBackground();
    counterInit();
    slickInit();
    modalVideo();
    scrollUp();
    rippleInit();
    accordian();
    tabs();
    hoverActive();
    progressBar();
    review();
    fullScreenHorizontalSlider();
    fullScreenVerticalSlider();
    parallaxSwiperSlider();
    shiningActive();
    hobbleEffect();
    scrollSliderActive();

    if ($.exists('.wow')) {
      new WOW().init();
    }
    if ($.exists('.player')) {
      $('.player').YTPlayer();
    }
  });

  $(window).on('scroll', function () {
    showScrollUp();
  });

  /*--------------------------------------------------------------
    1. Preloader
  --------------------------------------------------------------*/
  function preloader() {
    $('.cs_preloader').fadeOut();
    $('cs_preloader_in').delay(150).fadeOut('slow');
  }

  /*--------------------------------------------------------------
    2. Mobile Menu
  --------------------------------------------------------------*/
  function mainNav() {
    $('.cs_nav').append('<span class="cs_menu_toggle"><span></span></span>');
    $('.menu-item-has-children').append(
      '<span class="cs_menu_dropdown_toggle"><span></span></span>',
    );
    $('.cs_menu_toggle').on('click', function () {
      $(this)
        .toggleClass('cs_toggle_active')
        .siblings('.cs_nav_list')
        .toggleClass('cs_active');
    });
    $('.cs_menu_toggle')
      .parents('body')
      .find('.cs_side_header')
      .addClass('cs_has_main_nav');
    $('.cs_menu_toggle')
      .parents('body')
      .find('.cs_toolbox')
      .addClass('cs_has_main_nav');
    $('.cs_menu_dropdown_toggle').on('click', function () {
      $(this).toggleClass('active').siblings('ul').slideToggle();
      $(this).parent().toggleClass('active');
    });

    /* Side Nav */
    $('.cs_hamburger_info_btn').on('click', function () {
      $('.cs_side_header').addClass('active');
      $('html').addClass('cs_hamburger_active');
    });
    $('.cs_close, .cs_side_header_overlay').on('click', function () {
      $('.cs_side_header').removeClass('active');
      $('html').removeClass('cs_hamburger_active');
    });

    /* Hamburger Menu */
    $('.cs_hamburger_menu .menu-item-has-children>a').on('click', function (e) {
      e.preventDefault();
      $(this).siblings('ul').slideToggle();
      $(this).siblings('.cs_menu_dropdown_toggle').toggleClass('active');
    });

    $('.cs_hamburger_menu_btn').on('click', function (e) {
      $('.cs_hamburger_header, .cs_hamburger_overlay').addClass('active');
      $('html').addClass('cs_hamburger_active');
    });
    $('.cs_close_hamburger, .cs_hamburger_overlay').on('click', function (e) {
      $('.cs_hamburger_header, .cs_hamburger_overlay').removeClass('active');
      $('html').removeClass('cs_hamburger_active');
    });
  }

  /*--------------------------------------------------------------
    3. Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $('.cs_sticky_header');
    var headerHeight = $header.outerHeight() + 20;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass('cs_gescout_sticky');
      } else {
        $header.removeClass('cs_gescout_sticky');
        $header.removeClass('cs_gescout_show');
      }

      if ($header.hasClass('cs_gescout_sticky')) {
        if (windowTop < lastScrollTop) {
          $header.addClass('cs_gescout_show');
        } else {
          $header.removeClass('cs_gescout_show');
        }
      }
      lastScrollTop = windowTop;
    });
  }

  /*--------------------------------------------------------------
    4. Dynamic Background
  --------------------------------------------------------------*/
  function dynamicBackground() {
    $('[data-src]').each(function () {
      var src = $(this).attr('data-src');
      $(this).css({
        'background-image': 'url(' + src + ')',
      });
    });
  }

  /*--------------------------------------------------------------
    5. Slick Slider
  --------------------------------------------------------------*/
  function slickInit() {
    if ($.exists('.cs_slider')) {
      $('.cs_slider').each(function () {
        // Slick Variable
        var $ts = $(this).find('.cs_slider_container');
        var $slickActive = $(this).find('.cs_slider_wrapper');
        // Auto Play
        var autoPlayVar = parseInt($ts.attr('data-autoplay'), 10);
        // Auto Play Time Out
        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }
        // Slide Change Speed
        var speedVar = parseInt($ts.attr('data-speed'), 10);
        // Slider Loop
        var loopVar = Boolean(parseInt($ts.attr('data-loop'), 10));
        // Slider Center
        var centerVar = Boolean(parseInt($ts.attr('data-center'), 10));
        // Variable Width
        var variableWidthVar = Boolean(
          parseInt($ts.attr('data-variable-width'), 10),
        );
        // Pagination
        var paginaiton = $(this)
          .find('.cs_pagination')
          .hasClass('cs_pagination');
        // Slide Per View
        var slidesPerView = $ts.attr('data-slides-per-view');
        if (slidesPerView == 1) {
          slidesPerView = 1;
        }
        if (slidesPerView == 'responsive') {
          var slidesPerView = parseInt($ts.attr('data-add-slides'), 10);
          var lgPoint = parseInt($ts.attr('data-lg-slides'), 10);
          var mdPoint = parseInt($ts.attr('data-md-slides'), 10);
          var smPoint = parseInt($ts.attr('data-sm-slides'), 10);
          var xsPoing = parseInt($ts.attr('data-xs-slides'), 10);
        }
        // Fade Slider
        var fadeVar = parseInt($($ts).attr('data-fade-slide'));
        fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);

        // Slick Active Code
        $slickActive.slick({
          autoplay: autoPlayVar,
          dots: paginaiton,
          centerPadding: '28%',
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          fade: fadeVar,
          prevArrow: $(this).find('.cs_left_arrow'),
          nextArrow: $(this).find('.cs_right_arrow'),
          appendDots: $(this).find('.cs_pagination'),
          slidesToShow: slidesPerView,
          variableWidth: variableWidthVar,
          swipeToSlide: true,
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: lgPoint,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: mdPoint,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: smPoint,
              },
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: xsPoing,
                slidesToScroll: xsPoing,
              },
            },
          ],
        });
      });
    }
    // // // // // // // //
    $('.cs_single_product_thumb').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: '.cs_single_product_nav',
      appendDots: $('.cs_pagination_2'),
    });

    $('.cs_single_product_nav').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.cs_single_product_thumb',
      focusOnSelect: true,
      prevArrow: $('.cs_single_product_nav_left_arrow'),
      nextArrow: $('.cs_single_product_nav_right_arrow'),
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  /*--------------------------------------------------------------
    6. Horizonta Full Screen Swiper Slider
  --------------------------------------------------------------*/
  function fullScreenHorizontalSlider() {
    if ($.exists('.cs_fullscreen_horizontal_slider')) {
      var swiper = new Swiper('.cs_fullscreen_horizontal_slider', {
        mousewheel: true,
        loop: true,
        speed: 1000,
        pagination: {
          el: '.cs_swiper_pagination',
          clickable: true,
        },
      });
    }
  }

  /*--------------------------------------------------------------
    7. Vertical Full Screen Swiper Slider
  --------------------------------------------------------------*/
  function fullScreenVerticalSlider() {
    if ($.exists('.cs_fullscreen_vertical_slider')) {
      var swiper = new Swiper('.cs_fullscreen_vertical_slider', {
        direction: 'vertical',
        mousewheel: true,
        loop: true,
        speed: 1000,
        pagination: {
          el: '.cs_swiper_pagination',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.cs_swiper_button_next',
          prevEl: '.cs_swiper_button_prev',
        },
      });
    }
  }

  /*--------------------------------------------------------------
    8. Parallax Swiper Slider
  --------------------------------------------------------------*/
  function parallaxSwiperSlider() {
    if ($.exists('.cs_parallax_slider')) {
      let mainSliderSelector = '.cs_parallax_slider',
        interleaveOffset = 0.5;
      let mainSliderOptions = {
        loop: true,
        speed: 1000,
        autoplay: false,
        loopAdditionalSlides: 10,
        grabCursor: true,
        watchSlidesProgress: true,
        navigation: false,
        pagination: {
          el: '.cs_swiper_pagination_2',
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        },
        on: {
          init: function () {
            this.autoplay.stop();
          },
          imagesReady: function () {
            this.el.classList.remove('loading');
            this.autoplay.start();
          },
          progress: function (swiper) {
            for (let i = 0; i < swiper.slides.length; i++) {
              let slideProgress = swiper.slides[i].progress,
                innerOffset = swiper.width * interleaveOffset,
                innerTranslate = slideProgress * innerOffset;

              swiper.slides[i].querySelector(
                '.cs_swiper_parallax_bg',
              ).style.transform = 'translateX(' + innerTranslate + 'px)';
            }
          },
          touchStart: function (swiper) {
            for (let i = 0; i < swiper.slides.length; i++) {
              swiper.slides[i].style.transition = '';
            }
          },
          setTransition: function (swiper, transition) {
            for (let i = 0; i < swiper.slides.length; i++) {
              swiper.slides[i].style.transition = transition + 'ms';
              swiper.slides[i].querySelector(
                '.cs_swiper_parallax_bg',
              ).style.transition = transition + 'ms';
            }
          },
        },
      };
      let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);
    }
  }

  /*--------------------------------------------------------------
    9. Modal Video
  --------------------------------------------------------------*/
  function modalVideo() {
    if ($.exists('.cs_video_open')) {
      $('body').append(`
        <div class="cs_video_popup">
          <div class="cs_video_popup-overlay"></div>
          <div class="cs_video_popup-content">
            <div class="cs_video_popup-layer"></div>
            <div class="cs_video_popup-container">
              <div class="cs_video_popup-align">
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item" src="about:blank"></iframe>
                </div>
              </div>
              <div class="cs_video_popup-close"></div>
            </div>
          </div>
        </div>
      `);
      $(document).on('click', '.cs_video_open', function (e) {
        e.preventDefault();
        var video = $(this).attr('href');

        $('.cs_video_popup-container iframe').attr('src', `${video}`);

        $('.cs_video_popup').addClass('active');
      });
      $('.cs_video_popup-close, .cs_video_popup-layer').on(
        'click',
        function (e) {
          $('.cs_video_popup').removeClass('active');
          $('html').removeClass('overflow-hidden');
          $('.cs_video_popup-container iframe').attr('src', 'about:blank');
          e.preventDefault();
        },
      );
    }
  }

  /*--------------------------------------------------------------
    10. Scroll Up
  --------------------------------------------------------------*/
  function scrollUp() {
    $('.cs_scrollup').on('click', function (e) {
      e.preventDefault();
      $('html,body').animate(
        {
          scrollTop: 0,
        },
        0,
      );
    });
  }

  /* For Scroll Up */
  function showScrollUp() {
    let scroll = $(window).scrollTop();
    if (scroll >= 350) {
      $('.cs_scrollup').addClass('cs_scrollup_show');
    } else {
      $('.cs_scrollup').removeClass('cs_scrollup_show');
    }
  }

  /*--------------------------------------------------------------
    11. Ripple
  --------------------------------------------------------------*/
  function rippleInit() {
    if ($.exists('.cs_ripple_activate')) {
      $('.cs_ripple_activate').each(function () {
        $('.cs_ripple_activate').ripples({
          resolution: 512,
          dropRadius: 20,
          perturbance: 0.04,
        });
      });
    }
  }

  /*--------------------------------------------------------------
    12. Counter Animation
  --------------------------------------------------------------*/
  function counterInit() {
    if ($.exists('.odometer')) {
      $(window).on('scroll', function () {
        function winScrollPosition() {
          var scrollPos = $(window).scrollTop(),
            winHeight = $(window).height();
          var scrollPosition = Math.round(scrollPos + winHeight / 1.2);
          return scrollPosition;
        }

        $('.odometer').each(function () {
          var elemOffset = $(this).offset().top;
          if (elemOffset < winScrollPosition()) {
            $(this).html($(this).data('count-to'));
          }
        });
      });
    }
  }

  /*--------------------------------------------------------------
    13. Accordian
  --------------------------------------------------------------*/
  function accordian() {
    $('.cs_accordian').children('.cs_accordian_body').hide();
    $('.cs_accordian.active').children('.cs_accordian_body').show();
    $('.cs_accordian_head').on('click', function () {
      $(this)
        .parent('.cs_accordian')
        .siblings()
        .children('.cs_accordian_body')
        .slideUp(250);
      $(this).siblings().slideDown(250);
      $(this)
        .parent()
        .parent()
        .siblings()
        .find('.cs_accordian_body')
        .slideUp(250);
      /* Accordian Active Class */
      $(this).parents('.cs_accordian').addClass('active');
      $(this).parent('.cs_accordian').siblings().removeClass('active');
    });
  }

  /*--------------------------------------------------------------
    14. Tabs
  --------------------------------------------------------------*/
  function tabs() {
    $('.cs_tabs .cs_tab_links a').on('click', function (e) {
      var currentAttrValue = $(this).attr('href');
      $('.cs_tabs ' + currentAttrValue)
        .fadeIn(400)
        .siblings()
        .hide();
      $(this).parents('li').addClass('active').siblings().removeClass('active');
      e.preventDefault();
    });
  }

  /*--------------------------------------------------------------
    15. Hover To Active
  --------------------------------------------------------------*/
  function hoverActive() {
    $('.cs_hover_active .cs_case_study_in').hover(function () {
      $(this)
        .parents('.cs_hover_active')
        .addClass('active')
        .siblings()
        .removeClass('active');
    });
  }

  /*--------------------------------------------------------------
    16. Progress Bar
  --------------------------------------------------------------*/
  function progressBar() {
    $('.cs_progress').each(function () {
      var progressPercentage = $(this).data('progress') + '%';
      $(this).find('.cs_progress_in').css('width', progressPercentage);
    });
  }

  /*--------------------------------------------------------------
    17. Review
  --------------------------------------------------------------*/
  function review() {
    $('.cs_rating').each(function () {
      var review = $(this).data('rating');
      var reviewVal = review * 20 + '%';
      $(this).find('.cs_rating_percentage').css('width', reviewVal);
    });
  }
  /*--------------------------------------------------------------
    18. Shining Active
  --------------------------------------------------------------*/
  function shiningActive() {
    $('.cs_shining .cs_shining_btn').hover(
      function () {
        $(this)
          .parents('.cs_shining')
          .find('.cs_shining_item')
          .addClass('active');
      },
      function () {
        $(this)
          .parents('.cs_shining')
          .find('.cs_shining_item')
          .removeClass('active');
      },
    );
  }

  /*--------------------------------------------------------------
    19. Hobble Effect
  --------------------------------------------------------------*/
  function hobbleEffect() {
    $(document)
      .on('mousemove', '.cs_hobble', function (event) {
        var halfW = this.clientWidth / 2;
        var halfH = this.clientHeight / 2;
        var coorX = halfW - (event.pageX - $(this).offset().left);
        var coorY = halfH - (event.pageY - $(this).offset().top);
        var degX1 = (coorY / halfH) * -10 + 'px';
        var degY1 = (coorX / halfW) * 10 + 'px';
        var degX2 = (coorY / halfH) * 15 + 'deg';
        var degY2 = (coorX / halfW) * -15 + 'deg';

        $(this)
          .find('.cs_hover_layer_1')
          .css('transform', function () {
            return (
              'perspective( 800px ) translateX(' +
              degX1 +
              ') translateY(' +
              degY1 +
              ') scale(1.02)'
            );
          });
        $(this)
          .find('.cs_hover_layer_2')
          .css('transform', function () {
            return (
              'perspective( 800px ) translate3d( 0, 0, 0 ) rotateX(' +
              degX2 +
              ') rotateY(' +
              degY2 +
              ')'
            );
          });
      })
      .on('mouseout', '.cs_hobble', function () {
        $(this).find('.cs_hover_layer_1').removeAttr('style');
        $(this).find('.cs_hover_layer_2').removeAttr('style');
      });
  }

  /*--------------------------------------------------------------
    20. Scroll Slider
  --------------------------------------------------------------*/
  function scrollSliderActive() {
    if ($.exists('.cs_scroll_slide') && $(window).width() > 991) {
      var ctrl = new ScrollMagic.Controller({});
      /* This each sets the animation */
      $('.cs_scroll_slide').each(function (index, element) {
        $(':root').css('scroll-behavior', 'initial');

        /* scroll up */
        new ScrollMagic.Scene({
          triggerHook: 0,
          triggerElement: this,
          offset: -40,
        })
          .on('leave', function () {
            console.log('scroll up = ', index);
            TweenLite.to(window, 0.5, {
              scrollTo: {
                y:
                  $(window).height() * (index - 1) +
                  $('.cs_scroll_slider_container').offset().top,
                autoKill: false,
              },
              ease: Linear.easeNone,
            });
          })
          .addTo(ctrl);

        /* scroll down */
        new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: 0,
          offset: 40,
        })
          .on('enter', function () {
            console.log(
              'scroll down = ',
              $(window).height() +
                ' * (' +
                index +
                '+1)+' +
                $(window).scrollTop(),
              $(window).height() * (index + 1) + $(window).scrollTop(),
            );
            TweenLite.to(window, 0.5, {
              scrollTo: {
                y:
                  $(window).height() * (index + 1) +
                  $('.cs_scroll_slider_container').offset().top,
                autoKill: false,
              },
              ease: Linear.easeNone,
            });
          })
          .addTo(ctrl);
      });
    }
    var currentYear = new Date().getFullYear();
    $('.cs_copyright_year').text(currentYear);
  }
})(jQuery); // End of use strict
