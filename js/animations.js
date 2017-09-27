$(document).ready(function () {
    
    $(".liq-chart").not(".animated").each(function() {
            
        if ($(this).length && $(this).offset().top + $(this).height()/2 < $(".wrapper-content").height() && !$(this).hasClass("animated")) {

            if ($(this).closest(".tab").hasClass("active") || !$(this).closest(".tab").length) {

                animateLiq($(this));

            }

        }

    });
    
    animateDidChart();
    
    animateFundsChart();
    
    animateProgramChart();
    
    $(".wrapper-content").on("scroll", function () {
        
        animateDidChart();
       
        animateFundsChart();
        
        animateProgramChart();
        
        $(".liq-chart").not(".animated").each(function() {
            
            if ($(this).length && $(this).offset().top + $(this).height()/2 < $(".wrapper-content").height() && !$(this).hasClass("animated")) {
            
                if ($(this).closest(".tab").hasClass("active") || !$(this).closest(".tab").length) {

                    animateLiq($(this));

                }
                
            }
            
        });
        
        
    });
    
    $('body').on('click', '.tabs-menu ul li a', function() {
       
        var curTab = $(this).closest(".tabs").find(".tab").eq($(this).closest("li").prevAll().length);
        
        if (curTab.find(".liq-chart").length) {
            if (!curTab.find(".liq-chart").hasClass("animated")) {
                animateLiq(curTab.find(".liq-chart"));
            }
        }
        
    });
    
});

function animateLiq(chart) {
    
    console.log(chart)
    
    chart.addClass("animated");

    chart.find(".chart-grid").css("top", "100%");

    TweenLite.to(chart, .5, {opacity:1});

    TweenLite.to(chart.find(".chart-grid"), 1, {
        delay: .5,
        top: 0
    });

    chart.find(".chart-subcol").each(function () {
        $(this).data("height",$(this).css("height"));
    });

    TweenLite.to(chart.find(".chart-subcol"), 0, {
        height: 0
    });

    chart.find(".chart-subcol").each(function () {

        TweenLite.to($(this), .7, {
            delay: 1 + .3 * $(this).closest(".chart-col").prevAll().length, 
            height: parseInt($(this).data("height"))
        }); 

    });
    
}

function animateDidChart () {
    
    if ($(".did-chart").length && $(".did-chart").offset().top + $(".did-chart").height()/2 < $(".wrapper-content").height() && !$(".did-chart").hasClass("animated")) {
            
        $(".did-chart").addClass("animated");

        $(".did-chart .chart-grid").css("top", "100%");

        TweenLite.to(".did-chart", .5, {opacity:1});

        TweenLite.to(".did-chart .chart-grid", 1, {
            delay: .5,
            top: 0
        });

        $(".did-chart .chart-subcol").each(function () {
            $(this).data("height",$(this).css("height"));
        });

        TweenLite.to(".did-chart .chart-subcol", 0, {
            height: 0
        });

        $(".did-chart .chart-subcol").each(function () {

            TweenLite.to($(this), .7, {
                delay: 1 + .3 * $(this).closest(".chart-col").prevAll().length, 
                height: parseInt($(this).data("height"))
            }); 

        });

        TweenLite.to($(".did-chart .chart-plot-captions-line"), 0, {
            right: "100%"
        });

        TweenLite.to($(".did-chart .chart-plot-captions-line"), 1, {
            delay: 2.5,
            right: 0
        });

        TweenLite.to($(".chart-caption-did"), 0, {
            x: -50,
            opacity: 0
        });

        TweenLite.to($(".chart-caption-did"), 1, {
            delay:3,
            x: 0,
            opacity: 1
        });

        TweenLite.to($(".chart-caption-idd"), 0, {
            x: 50,
            opacity: 0
        });

        TweenLite.to($(".chart-caption-idd"), 1, {
            delay:3,
            x: 0,
            opacity: 1
        });
    }
    
}

function animateFundsChart() {
    
    if ($(".funds-chart").length && $(".funds-chart").offset().top + $(".funds-chart").height()/2 < $(".wrapper-content").height() && !$(".funds-chart").hasClass("animated")) {
            
        $(".funds-chart").addClass("animated");

        TweenLite.to(".funds-chart", .5, {opacity:1});

        $(".funds-chart .chart-subrow").each(function () {
            $(this).data("width",$(this).css("width"));
        });

        TweenLite.to(".funds-chart .chart-subrow", 0, {
            width: 0
        });

        $(".funds-chart .chart-subrow").each(function () {

            TweenLite.to($(this), .5, {
                delay: 1 + .2 * $(this).closest(".chart-row").prevAll().length, 
                width: parseInt($(this).data("width"))
            }); 

        });

    }
    
}

function animateProgramChart() {
    
    if ($(".program-chart").length && $(".program-chart").offset().top + $(".program-chart").height()/2 < $(".wrapper-content").height() && !$(".program-chart").hasClass("animated")) {
            
        $(".program-chart").addClass("animated");

        $(".program-chart .chart-grid").css("top", "100%");

        TweenLite.to(".program-chart", .5, {opacity:1});

        TweenLite.to(".program-chart .chart-grid", 1, {
            delay: .5,
            top: 0
        });

        $(".program-chart .chart-subcol").each(function () {
            $(this).data("height",$(this).css("height"));
        });

        TweenLite.to(".program-chart .chart-subcol", 0, {
            height: 0
        });

        $(".program-chart .chart-subcol").each(function () {

            TweenLite.to($(this), .7, {
                delay: 1 + .3 * $(this).closest(".chart-col").prevAll().length, 
                height: parseInt($(this).data("height"))
            }); 

        });

        TweenLite.to($(".program-chart-caption-1"), 0, {
            x: -50,
            opacity: 0
        });

        TweenLite.to($(".program-chart-caption-1"), 1, {
            delay:3,
            x: 0,
            opacity: 1
        });

        TweenLite.to($(".program-chart-caption-4"), 0, {
            x: 50,
            opacity: 0
        });

        TweenLite.to($(".program-chart-caption-4"), 1, {
            delay:3,
            x: 0,
            opacity: 1
        });

        TweenLite.to($(".program-chart-caption-2"), 0, {
            y: 50,
            opacity: 0
        });

        TweenLite.to($(".program-chart-caption-2"), 1, {
            delay:3,
            y: 0,
            opacity: 1
        });

        TweenLite.to($(".program-chart-caption-3"), 0, {
            y: -50,
            opacity: 0
        });

        TweenLite.to($(".program-chart-caption-3"), 1, {
            delay:3,
            y: 0,
            opacity: 1
        });
    }
    
}