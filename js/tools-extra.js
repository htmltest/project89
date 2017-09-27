$(document).ready(function() {
    
    if (getCookie("firstVisit") != "yes") {
        setCookie("firstVisit", "yes");
        
        // Вызываем окно
        
    }
    
    // Tooltip
    
    $("body").on("mouseover", ".tooltip-link", function () {
        
        if ($(this).data("tooltip-content").length) {
            
            var target = $(this);

            var tooltip = $('<div class="tooltip">' + $(this).data("tooltip-content") + '<div class="tooltip-arrow"></div></div>');

            $("body").append(tooltip);

            var targetX = target.offset().left + target.outerWidth()/2 - $(window).scrollLeft();
            var targetY = target.offset().top + target.outerHeight()/2 - $(window).scrollTop();
            
            var tooltipX = targetX,
                tooltipY = targetY,
                tooltipMarginLeft = - tooltip.outerWidth()/2,
                tooltipMarginTop = - tooltip.outerHeight() - target.outerHeight() - 3;
            
            if (targetX < tooltip.outerWidth()/2) {
                tooltipMarginLeft = 0;
                tooltipX = 0;
            } else if ($(window).width() - targetX < tooltip.outerWidth()/2) {
                tooltipMarginLeft =  - tooltip.outerWidth();
                tooltipX = "100%";
            }
            
            tooltip.css({
                left: tooltipX,
                top: tooltipY,
                marginLeft: tooltipMarginLeft,
                marginTop: tooltipMarginTop
            }).fadeIn(100);
            
            tooltip.find(".tooltip-arrow").css({
                left: targetX - tooltip.offset().left
            })
            
        }
        
    }).on("mouseout", ".tooltip-link", function () {
        $(".tooltip").remove();
    });
    
    // Tooltip END
    
    $("input.input-phone").mask("+7 (999) 999-99-99");
    
    $('.common-form select').chosen({disable_search: true, no_results_text: 'Нет результатов'});
    
    $(".modal form, .common-form form").validate();
    
});

jQuery.extend(jQuery.validator.messages, {
    required: "Заполните поле.",
    remote: "Please fix this field.",
    email: "Введите правильный e-mail.",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Пароли не совпадают.",

    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}