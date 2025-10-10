const AW = {};

$.validator.addMethod('mobileRu', function (phone_number, element) {
  const ruPhone_number = phone_number.replace(/\(|\)|\s+|-/g, "");
  return this.optional(element) || ruPhone_number.length > 9 && /^((\+7|7|8)+([0-9]){10})$/.test(ruPhone_number);
}, "Please specify a valid mobile number.");

AW.FANCYBOX_DEFAULTS = {
  hideScrollbar: false,
  Hash: false,
  Thumbs: {
    type: 'classic',
  },
  Toolbar: {
    display: {
      left: ['infobar'],
      middle: [
        'zoomIn',
        'zoomOut',
      ],
      right: ['close'],
    },
  },
}

AW.modal = new HystModal({
  linkAttributeName: "data-hystmodal",
  closeOnOverlay: false,
  // afterClose: (modal) => {
  //   switch ($(modal.element).attr('id')) {
  //     case 'test': {

  //       break;
  //     }
  //   }
  // },
});

AW.initMask = function ($field) {
  const type = $field.attr('data-mask');
  let mask;
  switch (type) {
    case 'phone':
      mask = IMask($field[0], {
        mask: '+{7} (000) 000-00-00',
        lazy: true,
        placeholderChar: '_'
      });
      $field.on('focus', () => {
        if (mask.value === '') mask.value = '+7 ';
      });
      break;
  }
};

AW.validateForm = function ($el) {
  if ($el.length === 0) return;

  const validator = $el.validate({
    ignore: [],
    errorClass: 'form-group__error',
    errorPlacement: function (error, element) {
      const $parent = $(element).closest('.form-group').length ? $(element).closest('.form-group') : $(element).closest('.form-group1');
      $parent.append(error);
    },
    highlight: function (element) {
      const $parent = $(element).closest('.form-group').length ? $(element).closest('.form-group') : $(element).closest('.form-group1');
      $parent.addClass('form-group_error');
    },
    unhighlight: function (element) {
      const $parent = $(element).closest('.form-group').length ? $(element).closest('.form-group') : $(element).closest('.form-group1');
      $parent.removeClass('form-group_error');
    },
    submitHandler: function (form, event) {
      event.preventDefault();
      const trigger = $el.attr('data-onsubmit-trigger');
      if (trigger) {
        $(document).trigger(trigger, { event, form });
      } else {
        form.submit();
      }
    }
  });

  $el.find('.field-input1, .checkbox__input, select').each(function () {
    if ($(this).is(':required')) {
      if ($(this).attr('name') === 'agreement') {
        $(this).rules('add', {
          required: true,
          messages: {
            required: 'Вы должны согласиться',
          }
        });
      } else {
        $(this).rules('add', {
          required: true,
          messages: {
            required: 'Заполните это поле',
          }
        });
      }
    }

    if ($(this).attr('data-type') === 'phone') {
      $(this).rules('add', {
        mobileRu: true,
        messages: {
          mobileRu: 'Неверный формат',
        }
      });
    }

    if ($(this).attr('data-type') === 'email') {
      $(this).rules('add', {
        email: true,
        messages: {
          email: 'Неверный формат',
        }
      });
    }
  });

  // Переключение видимости пароля
  $el.on('click', '.form-group1__icon', function (e) {
    e.preventDefault();

    const $parent = $(this).closest('.form-group1');
    const $input = $parent.find('input[type="password"], input[type="text"]');

    if ($input.length > 0) {
      const isPassword = $input.attr('type') === 'password';
      $input.attr('type', isPassword ? 'text' : 'password');

      $parent.find('.eye1').toggleClass('hidden');
      $parent.find('.eye2').toggleClass('hidden');
    }
  });

  return validator;
}

AW.initSliderProducts = function ($el) {
  return new Swiper($el[0], {
    loop: false,
    spaceBetween: 0,
    slidesPerView: 1,
    watchSlidesProgress: true,
    navigation: {
      nextEl: $el.find('.swiper-nav_next')[0],
      prevEl: $el.find('.swiper-nav_prev')[0],
    },
    breakpoints: {
      600: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 3,
      },
      1280: {
        slidesPerView: 4,
      }
    }
  });
}

AW.initSliderBrands = function ($el) {
  return new Swiper($el[0], {
    loop: true,
    spaceBetween: 0,
    slidesPerView: 'auto',
    initialSlide: 3,
    loopAdditionalSlides: 5,
  });
}

AW.initSliderCertificates = function ($el) {
  return new Swiper($el[0], {
    loop: false,
    spaceBetween: 20,
    slidesPerView: 1.4,
    watchSlidesProgress: true,

    breakpoints: {
      600: {
        slidesPerView: 2.5, spaceBetween: 20,
      },
      992: {
        slidesPerView: 3.5, spaceBetween: 60,
      },
      1400: {
        slidesPerView: 4.9, spaceBetween: 60,
      }
    }
  });
}

AW.initSliderIntro = function ($el) {
  return new Swiper($el[0], {
    loop: true,
    spaceBetween: 0,
    slidesPerView: 1,
    navigation: {
      nextEl: $el.find('.swiper-nav_next')[0],
      prevEl: $el.find('.swiper-nav_prev')[0]
    },
    pagination: {
      el: $el.find('.swiper-pagination')[0],
      clickable: true
    }
  });
}

AW.showHeaderSearch = function () {
  $('.header-search').addClass('active');
  $('.header-search-dd').addClass('active');
  $('.header-backdrop').addClass('active');
}

AW.hideHeaderSearch = function () {
  $('.header-search').removeClass('active');
  $('.header-search-dd').removeClass('active');
  $('.header-backdrop').removeClass('active');
}

AW.showCatalogMenu = function () {
  $('.catalog-menu').addClass('active');
}

AW.hideCatalogMenu = function () {
  $('.catalog-menu').removeClass('active');
  $('.btn-catalog').removeClass('active');
}

AW.showMobileMenu = function () {
  $('.header__cell-nav').addClass('active');
  $('body').addClass('noscroll');
}

AW.hideMobileMenu = function () {
  $('.header__cell-nav').removeClass('active');
  $('.btn-burger').removeClass('active');
  $('body').removeClass('noscroll');
}

AW.initSelect = function ($el, params = {}) {
  const defaults = {
    controlInput: null,
    create: true,
    render: {
      item: function (data, escape) {
        return `
          <div class="item">
            ${escape(data.text)}
          </div>
        `;
      },
    },
    onInitialize: function () {
      $(this.control).append(`
        <svg aria-hidden="true" width="14" height="9">
          <use xlink:href="img/sprite.svg#chevron2"></use>
        </svg>
      `);

      // Предварительно создаем структуру для SimpleBar
      this.on('dropdown_open', function () {
        if (!this.wrapper.querySelector('.ts-dropdown-simplebar')) {
          const simplebarDiv = document.createElement('div');
          simplebarDiv.className = 'ts-dropdown-simplebar';
          simplebarDiv.setAttribute('data-simplebar', '');

          while (this.dropdown.firstChild) {
            simplebarDiv.appendChild(this.dropdown.firstChild);
          }

          this.dropdown.appendChild(simplebarDiv);
        }
      });
    }
  }
  return new TomSelect($el[0], { ...defaults, ...params });
}

AW.renderCartItem = function (name, photoSrc) {
  return $(`
    <div class="cart-item">
      <div class="cart-item__photo">
        <img src="${photoSrc}" alt="">
      </div>
      <div class="cart-item__data">
        <div class="cart-item__title">В корзине</div>
        <div class="cart-item__name">${name}</div>
      </div>
      <button class="cart-item__close">
        <svg aria-hidden="true" width="14" height="14">
          <use xlink:href="img/sprite.svg#close1"></use>
        </svg>
      </button>
    </div>
  `);
}

AW.addCartItem = function (name, photoSrc) {
  const $item = AW.renderCartItem(name, photoSrc);

  $('.cart-items-stack').append($item);
  $item.find('.cart-item__close').on('click', function () {
    $item.remove();
  });
  setTimeout(() => {
    $item.remove();
  }, 2000);
}

$(document).ready(() => {
  Fancybox.defaults.Hash = false;
  Fancybox.defaults.l10n = {
    CLOSE: 'Закрыть',
    NEXT: 'Следующий',
    PREV: 'Предыдущий',
    MODAL: 'Вы можете закрыть это окно нажав на клавишу ESC',
    ERROR: 'Что-то пошло не так, пожалуйста, попробуйте еще раз',
    IMAGE_ERROR: 'Изображение не найдено',
    ELEMENT_NOT_FOUND: 'HTML элемент не найден',
    AJAX_NOT_FOUND: 'Ошибка загрузки AJAX : Не найдено',
    AJAX_FORBIDDEN: 'Ошибка загрузки AJAX : Нет доступа',
    IFRAME_ERROR: 'Ошибка загрузки страницы',
    ZOOMIN: 'Увеличить',
    ZOOMOUT: 'Уменьшить',
    TOGGLE_THUMBS: 'Галерея',
    TOGGLE_SLIDESHOW: 'Слайдшоу',
    TOGGLE_FULLSCREEN: 'На весь экран',
    DOWNLOAD: 'Скачать'
  };

  Fancybox.bind('[data-fancybox]', AW.FANCYBOX_DEFAULTS);

  // Этот хак помогает избежать прыжков анимации при загрузке страницы
  $('body').removeClass('preload');

  if ($('.catalog-detail').length && $('[data-swiper="preview"]').length && $('[data-swiper="photos"]').length) {
    const previewSlider = new Swiper($('[data-swiper="preview"]')[0], {
      loop: false,
      spaceBetween: 0,
      slidesPerView: 5,
      watchSlidesProgress: true,
      direction: 'horizontal',
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
        1400: {
          direction: 'vertical',
          slidesPerView: 'auto',
        }
      }
    });
    const photosSlider = new Swiper($('[data-swiper="photos"]')[0], {
      loop: false,
      spaceBetween: 0,
      slidesPerView: 1,
      thumbs: {
        swiper: previewSlider,
      },
      navigation: {
        nextEl: $('[data-swiper="photos"]').find('.swiper-nav_next')[0],
        prevEl: $('[data-swiper="photos"]').find('.swiper-nav_prev')[0],
      },
    });
  }

  // $('.catalog-detail__status').on('click', function() {
  //   AW.addCartItem('Твердосплавная пластина ZCC-CT TNMG160404-PM YBC252', 'img/product1.webp');
  // });

  $('[data-mask]').each(function () {
    AW.initMask($(this));
  });

  $('[data-stepcounter]').each(function () {
    new AW.StepCounter($(this));
  });

  $('[data-select').each(function () {
    AW.initSelect($(this));
  });

  $('[data-swiper="intro"]').each(function () {
    AW.initSliderIntro($(this));
  });

  $('[data-swiper="products"]:visible').each(function () {
    AW.initSliderProducts($(this));
  });

  $('[data-swiper="brands"]').each(function () {
    AW.initSliderBrands($(this));
  });

  $('[data-swiper="certificates"]').each(function () {
    AW.initSliderCertificates($(this));
  });

  $('[data-validate]').each(function () {
    AW.validateForm($(this));
  });

  $('.catalog-menu__btn1').on('click', function () {
    $(this).closest('li').addClass('active1');
    $(this).closest('.scrollable').addClass('noscroll');
    $(this).closest('.scrollable').scrollTop(0);
  });

  $('.menu-main__catalog button').on('click', function () {
    AW.showCatalogMenu();
  });

  $('.menu-main__chevron1').on('click', function () {
    $(this).closest('li').addClass('active');
  });

  $('.header-search__clear').on('click', function () {
    $('.header-search__input').val('');
    AW.hideHeaderSearch();
  });

  $('.catalog-menu__lvl1').on('mouseenter', function () {
    $('.catalog-menu__lvl1.active').removeClass('active');
    $(this).addClass('active');
  });

  $('body').on('click', function (event) {
    if (
      $('.header-search-dd').hasClass('active')
      &&
      $(event.target).attr('data-action-input') !== 'showSearchDropdown'
      &&
      $(event.target).closest('.header-search-dd').length === 0
      &&
      !$(event.target).hasClass('header-search-dd')
    ) {
      AW.hideHeaderSearch();
    }

    if (
      $('.catalog-menu').hasClass('active')
      &&
      $(event.target).attr('data-action') !== 'toggleCatalogMenu'
      &&
      $(event.target).attr('data-action') !== 'showCatalogMenu'
      &&
      $(event.target).closest('.catalog-menu').length === 0
      &&
      !$(event.target).hasClass('catalog-menu')
    ) {
      AW.hideCatalogMenu();
    }

    if ($(event.target).hasClass('catalog-filter')) {
      $('body').removeClass('filter-active');
    }
  });

  $('body').on('click', '[data-action]', function (event) {
    const alias = $(this).attr('data-action');
    switch (alias) {
      case 'scroll': {
        event.preventDefault();
        const alias = $(this).attr('href');
        if (alias.length) {
          const yOffset = ($('.header').height() + 30) * -1;
          let element = document.getElementById(alias.slice(1));
          if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          } else if ($('.catalog-detail-tabs').length) {
            element = $('.catalog-detail-tabs')[0];
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            $(`[data-tab="${alias.slice(1)}"]`).trigger('click');
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
        break;
      }

      case 'showTab1': {
        if (!$(this).hasClass('active')) {
          const $container = $(this).closest('[data-container="tab1"]');
          const alias = $(this).attr('data-tab');
          if ($container.length && alias) {
            $container.find('.btn-text.active').removeClass('active');
            $(this).addClass('active');
            $container.find('[data-tab-content]').each(function () {
              if ($(this).attr('data-tab-content') === alias) {
                $(this).show();
                if ($(this).find('[data-swiper="products"]').length) {
                  if (!$(this).find('.swiper').hasClass('swiper-initialized')) {
                    AW.initSliderProducts($(this).find('.swiper'));
                  }
                }
              } else {
                $(this).hide();
              }
            });
          }
        }
        break;
      }

      case 'showTab2': {
        if (!$(this).hasClass('active')) {
          const $container = $(this).closest('.catalog-detail-tabs');
          const alias = $(this).attr('data-tab');
          if ($container.length && alias) {
            $container.find('.tab-nav1__btn.active').removeClass('active');
            $(this).addClass('active');
            $container.find('[data-tab-content]').each(function () {
              if ($(this).attr('data-tab-content') === alias) {
                $(this).show();
              } else {
                $(this).hide();
              }
            });
          }
        }
        break;
      }

      case 'toggleCatalogMenu': {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
          $('body').addClass('menu-open');
          AW.showCatalogMenu();
        } else {
          $('body').removeClass('menu-open');
          AW.hideCatalogMenu();
        }
        break;
      }

      case 'showCatalogMenu': {
        $('.btn-catalog').addClass('active');
        AW.showCatalogMenu();
        break;
      }

      case 'toggleMobileMenu': {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
          AW.showMobileMenu();
        } else {
          AW.hideMobileMenu();
        }
        break;
      }

      case 'menuBack1': {
        $(this).closest('li').removeClass('active');
        break;
      }

      case 'menuBack2': {
        AW.hideCatalogMenu();
        break;
      }

      case 'menuBack3': {
        $(this).closest('li').removeClass('active1');
        $('.catalog-menu > .scrollable').removeClass('noscroll');
        break;
      }

      case 'menuBack4': {
        $(this).closest('li').removeClass('active1');
        $(this).closest('.scrollable').removeClass('noscroll');
        break;
      }

      case 'expandList1': {
        $(this).closest('ul').addClass('expanded');
        break;
      }

      case 'collapseList1': {
        $(this).closest('ul').removeClass('expanded');
        break;
      }

      case 'expandList2': {
        $(this).closest('ul').addClass('expanded');
        break;
      }

      case 'collapseList2': {
        $(this).closest('ul').removeClass('expanded');
        break;
      }

      case 'expandSpecs1': {
        $(this).closest('.table-specs1-wrapper').addClass('expanded');
        break;
      }

      case 'collapseSpecs1': {
        $(this).closest('.table-specs1-wrapper').removeClass('expanded');
        break;
      }

      case 'expandText1': {
        $(this).closest('.text-cutter1').addClass('expanded');
        break;
      }

      case 'collapseText1': {
        $(this).closest('.text-cutter1').removeClass('expanded');
        break;
      }

      case 'showSpecs': {
        $(this).toggleClass('active');
        $(this).closest('.card-product3').toggleClass('card-product3_spec');
        break;
      }

      case 'toggleCatalogFilter': {
        const $parent = $(this).closest('.catalog-filter');
        $parent.toggleClass('expanded');
        if ($parent.hasClass('expanded')) {
          $parent.find('.catalog-filter__data').slideDown(300);
        } else {
          $parent.find('.catalog-filter__data').slideUp(300);
        }
        break;
      }

      case 'showFilter': {
        $('body').addClass('filter-active');
        break;
      }

      case 'hideFilter': {
        $('body').removeClass('filter-active');
        break;
      }
    }
  });

  $('body').on('input', '[data-action-input]', function () {
    const alias = $(this).attr('data-action-input');

    switch (alias) {
      case 'showSearchDropdown': {
        if ($(this).val() !== '') {
          AW.showHeaderSearch();
        } else {
          AW.hideHeaderSearch();
        }
        break;
      }
    }
  });
});

//Карта
const map1 = document.querySelector("#map1");
if (map1) {
  if ("undefined" !== typeof ymaps) ymaps.ready((() => initMainMap()));
  else console.warn("Yandex Maps API не загружено для карты #map1");

  function initMainMap() {
    try {
      const isMobile = window.innerWidth <= 992;
      const baseCoords = [47.250522, 39.765606];

      // Смещаем координаты
      let centerCoords;
      if (isMobile) {
        // Для мобильных - смещаем вниз
        centerCoords = [baseCoords[0] + 0.006, baseCoords[1]]; // смещение по широте (вниз)
      } else {
        // Для десктопа - смещаем вправо
        centerCoords = [baseCoords[0], baseCoords[1] - 0.015]; // смещение по долготе (вправо)
      }

      var myMap1 = new ymaps.Map("map1", {
        center: centerCoords,
        zoom: 15,
        controls: ["zoomControl"],
        behaviors: ["drag"]
      }, {
        searchControlProvider: "yandex#search"
      });

      const placemark1 = new ymaps.Placemark([47.250522, 39.765606], {}, {
        iconLayout: "default#image",
        iconImageHref: "img/location2.svg",
        iconImageSize: [60, 60],
        iconImageOffset: [-30, -30]
      });

      myMap1.geoObjects.add(placemark1);
    } catch (error) {
      console.error("Ошибка при инициализации карты #map1:", error);
    }
  }
}

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding, opacity";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.opacity = "1"; // Начальное состояние

    // Плавное исчезновение
    requestAnimationFrame(() => {
      target.style.opacity = "0";
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
    });

    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      if (!showmore) {
        target.style.removeProperty("height");
      }
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("opacity");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");

      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: { target }
      }));
    }, duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;

    if (showmore) {
      target.style.removeProperty("height");
    }

    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.style.opacity = "0"; // Начальное состояние

    target.offsetHeight; // Force reflow

    target.style.transitionProperty = "height, margin, padding, opacity";
    target.style.transitionDuration = duration + "ms";

    requestAnimationFrame(() => {
      target.style.opacity = "1";
      target.style.height = height + "px";
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
    });

    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("opacity");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");

      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: { target }
      }));
    }, duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

//Спойлер
function spollers() {
  const spollersArray = document.querySelectorAll("[data-spollers]");
  if (spollersArray.length > 0) {
    const spollersRegular = Array.from(spollersArray).filter((function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    }));
    if (spollersRegular.length) initSpollers(spollersRegular);

    spollersArray.forEach(spollersBlock => {
      const mediaQuery = spollersBlock.dataset.spollers;
      if (mediaQuery) {
        const [maxWidth, type] = mediaQuery.split(",");
        const width = parseInt(maxWidth);

        if (type === "max" && window.innerWidth <= width) {
          if (!spollersBlock.classList.contains("_spoller-init")) {
            initSpollers([spollersBlock]);
          }
        } else if (type === "max" && window.innerWidth > width) {
          if (spollersBlock.classList.contains("_spoller-init")) {
            spollersBlock.classList.remove("_spoller-init");
            initSpollerBody(spollersBlock, false);
            spollersBlock.removeEventListener("click", setSpollerAction);
          }
        }
      }
    });

    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("_spoller-init");
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);
        } else {
          spollersBlock.classList.remove("_spoller-init");
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      }));
    }

    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
        spollerTitles.forEach((spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
            if (!spollerTitle.classList.contains("_spoller-active")) {
              spollerTitle.nextElementSibling.hidden = true;
            }
          } else {
            spollerTitle.setAttribute("tabindex", "-1");
            spollerTitle.nextElementSibling.hidden = false;
          }
        }));
      }
    }

    function setSpollerAction(e) {
      const el = e.target;
      if (el.closest("[data-spoller]")) {
        const spollerTitle = el.closest("[data-spoller]");

        const spollerItem = spollerTitle.closest(".spollers__item, .menu__item");
        const spollersBlock = spollerTitle.closest("[data-spollers]");

        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

        if (!spollersBlock.querySelectorAll("._slide").length) {
          if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) {
            hideSpollersBody(spollersBlock);
          }

          spollerTitle.classList.toggle("_spoller-active");
          if (spollerItem) spollerItem.classList.toggle("_spoller-active");

          const contentBlock = spollerTitle.nextElementSibling;
          _slideToggle(contentBlock, spollerSpeed);

          e.preventDefault();
        }
      }
    }

    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
      if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
        const spollerItem = spollerActiveTitle.closest(".spollers__item, .menu__item");

        spollerActiveTitle.classList.remove("_spoller-active");
        if (spollerItem) spollerItem.classList.remove("_spoller-active");
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
      }
    }

    const spollersClose = document.querySelectorAll("[data-spoller-close]");
    if (spollersClose.length) {
      document.addEventListener("click", (function (e) {
        const el = e.target;
        if (!el.closest("[data-spollers]")) {
          spollersClose.forEach((spollerClose => {
            const spollersBlock = spollerClose.closest("[data-spollers]");
            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
            spollerClose.classList.remove("_spoller-active");

            const spollerItem = spollerClose.closest(".spollers__item, .menu__item");
            if (spollerItem) spollerItem.classList.remove("_spoller-active");

            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
          }));
        }
      }));
    }
  }
}
spollers();
window.addEventListener('resize', function () {
  spollers();
});

document.querySelectorAll('input[type="radio"].radio__input').forEach(radio => {
  const label = radio.closest('.checkbox-text');
  const targetClass = label ? label.getAttribute('data-target') : null;

  if (targetClass) {
    if (radio.checked) {
      label.classList.add('checked');
      document.querySelector(targetClass)?.classList.add('_active');
    }

    radio.addEventListener('change', () => {
      document.querySelectorAll('.checkbox-text').forEach(el => {
        el.classList.remove('checked');
        const target = el.getAttribute('data-target');
        if (target) document.querySelector(target)?.classList.remove('_active');
      });

      if (radio.checked) {
        label.classList.add('checked');
        document.querySelector(targetClass)?.classList.add('_active');
      }
    });
  }

  if (radio.checked) {
    radio.closest('.checkbox-text').classList.add('checked');
  }

  radio.addEventListener('change', () => {
    document.querySelectorAll('.checkbox-text').forEach(el => {
      el.classList.remove('checked');
    });

    if (radio.checked) {
      radio.closest('.checkbox-text').classList.add('checked');
    }
  });
});

const fileCabinets = document.querySelectorAll('.file-user-cabinet');
if (fileCabinets) {
  fileCabinets.forEach(function (cabinet) {
    const fileInput = cabinet.querySelector('input[type="file"]');
    const fileNameDisplay = cabinet.querySelector('.file-user-cabinet__file');

    if (!fileInput || !fileNameDisplay) return;

    const formColumn = cabinet.closest('.form-user-cabinet__column');
    const submitButton = formColumn ? formColumn.querySelector('.button-submit') : null;

    function updateSubmitButton() {
      if (submitButton) {
        if (fileInput.files && fileInput.files.length > 0) {
          submitButton.classList.remove('disabled');
        } else {
          submitButton.classList.add('disabled');
        }
      }
    }

    fileInput.addEventListener('change', function () {
      if (this.files && this.files.length > 0) {
        fileNameDisplay.textContent = this.files[0].name;
        fileNameDisplay.classList.add('file-selected');
      } else {
        fileNameDisplay.textContent = 'Файл не выбран';
        fileNameDisplay.classList.remove('file-selected');
      }

      updateSubmitButton();
    });

    if (submitButton) {
      updateSubmitButton();
    }
  });
}

const filterButtons = document.querySelectorAll('.filter-user-cabinet__title');
const orderTables = document.querySelectorAll('.tables-user-cabinet__table');
if (filterButtons) {
  function filterOrders(filterType) {
    orderTables.forEach(table => {
      table.classList.add('hide');
    });

    const filteredTables = document.querySelectorAll(`.tables-user-cabinet__table[data-filter="${filterType}"]`);
    filteredTables.forEach(table => {
      table.classList.remove('hide');
    });

    filterButtons.forEach(button => {
      button.classList.remove('active');
      if (button.getAttribute('data-filter') === filterType) {
        button.classList.add('active');
      }
    });
  }
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filterType = this.getAttribute('data-filter');
      filterOrders(filterType);
    });
  });

  filterOrders('now');
}

// Обработчик для поля ИНН
$(document).on('input', '[data-inn-input]', function () {
  const $innField = $(this);
  const inn = $innField.val().trim();
  const $orgFields = $('[data-org-field]');

  // Проверяем валидность ИНН (10 или 12 цифр)
  if (/^\d{10}$|^\d{12}$/.test(inn)) {
    $orgFields.removeClass('hide');

  } else if (inn === '') {
    // Поле пустое - скрываем поля организации
    $orgFields.addClass('hide');

  } else {
    // Невалидный ИНН - скрываем поля
    $orgFields.addClass('hide');
    // showPopupNotification('Ошибка', 'Введите корректный ИНН (10 или 12 цифр)', 'OK');
  }

});

// Универсальный обработчик для всех кнопок с data-action="scroll"
document.querySelectorAll('a[data-action="scroll"]').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();

    const href = this.getAttribute('href');

    let targetBlock;
    if (href === '#description') {
      targetBlock = document.querySelector('.catalog-detail-data__description');
    } else if (href === '#specs') {
      targetBlock = document.querySelector('.catalog-detail-data__specs');
    }

    if (targetBlock) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const targetPosition = targetBlock.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});