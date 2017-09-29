$(document).ready(function() {
    createSlides();

    resizeContent();

    $('body').on('click', '.header-slides-link', function(e) {
        $(this).toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-slides').length == 0) {
            $('.header-slides-link').removeClass('open');
        }
    });

    $('body').on('mouseover', '.header-slides-link', function(e) {
        var curImg = $(this).find('span img');
        var curScr = curImg.attr('src');
        curImg.attr('src', curImg.data('animate'));
        curImg.data('animate', curScr);
    });

    $('body').on('mouseout', '.header-slides-link', function(e) {
        var curImg = $(this).find('span img');
        var curScr = curImg.attr('src');
        curImg.attr('src', curImg.data('animate'));
        curImg.data('animate', curScr);
    });

    $('body').on('click', '.header-stacks-link', function(e) {
        $(this).toggleClass('open');
        $('.header-stacks-list').slideToggle();
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-stacks').length == 0) {
            $('.header-stacks-link').removeClass('open');
            $('.header-stacks-list').slideUp();
        }
    });

    $('body').on('mouseover', '.header-stacks-link', function(e) {
        var curImg = $(this).find('span img');
        var curScr = curImg.attr('src');
        curImg.attr('src', curImg.data('animate'));
        curImg.data('animate', curScr);
    });

    $('body').on('mouseout', '.header-stacks-link', function(e) {
        var curImg = $(this).find('span img');
        var curScr = curImg.attr('src');
        curImg.attr('src', curImg.data('animate'));
        curImg.data('animate', curScr);
    });

    $('body').on('mouseover', '.footer-link-charts, .footer-link-download, .footer-link-info', function(e) {
        var curImg = $(this).find('img');
        var curScr = curImg.attr('src');
        curImg.attr('src', curImg.data('animate'));
        curImg.data('animate', curScr);
    });

    $('body').on('mouseout', '.footer-link-charts, .footer-link-download, .footer-link-info', function(e) {
        var curImg = $(this).find('img');
        var curScr = curImg.attr('src');
        curImg.attr('src', curImg.data('animate'));
        curImg.data('animate', curScr);
    });

    $('body').on('click', '.main-menu-item-link', function(e) {
        var curBlock = $(this).parent();
        if (curBlock.find('.main-menu-content').length > 0) {
            curBlock.toggleClass('open');
            curBlock.find('.main-menu-content').slideToggle(300);
            $('.main').toggleClass('open');
            e.preventDefault();
        }
    });

    $('body').on('click', '.header-stacks-item-link', function(e) {
        var curBlock = $(this).parent();
        if (curBlock.find('.header-stacks-sub').length > 0) {
            curBlock.toggleClass('open');
            e.preventDefault();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-stacks-item').length == 0) {
            $('.header-stacks-item').removeClass('open');
        }
    });

    $('body').on('click', '.tabs-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curTabs = curLi.parents().filter('.tabs');
            var curIndex = curTabs.find('.tabs-menu ul li').index(curLi);
            curTabs.find('.tabs-menu ul li.active').removeClass('active');
            curLi.addClass('active');
        }
        e.preventDefault();
    });

    $('body').on('click', '.funds-item-link', function() {
        var curItem = $(this).parent();
        if (curItem.hasClass('active')) {
            curItem.removeClass('active');
        } else {
            $('.funds-item.active').removeClass('active');
            curItem.addClass('active');
        }
    });

    $('body').on('click', '.funds-item-window-prev', function(e) {
        var curIndex = $('.funds-item').index($('.funds-item.active'));
        curIndex--;
        if (curIndex < 0) {
            curIndex = $('.funds-item').length - 1;
        }
        $('.funds-item').eq(curIndex).find('.funds-item-link').trigger('click');
        e.preventDefault();
    });

    $('body').on('click', '.funds-item-window-next', function(e) {
        var curIndex = $('.funds-item').index($('.funds-item.active'));
        curIndex++;
        if (curIndex > $('.funds-item').length - 1) {
            curIndex = 0;
        }
        $('.funds-item').eq(curIndex).find('.funds-item-link').trigger('click');
        e.preventDefault();
    });

    $('body').on('click', '.funds-item-window-close', function(e) {
        $('.funds-item.active').removeClass('active');
        e.preventDefault();
    });

    $('body').on('click', '.ajax-page', function(e) {
        var curLink = $(this);

        if (typeof (history.pushState) != 'undefined') {
            var curLoad = $('.pageload-overlay');
            var curSrc = curLoad.find('img').attr('src');
            curLoad.find('img').attr('src', curLoad.find('img').data('animate'));
            curLoad.find('img').data('animate', curSrc);

            curLoad.fadeIn(function() {
                var startTime = Date.now();
                $.ajax({
                    url: curLink.attr('href'),
                    dataType: 'html',
                    cache: false
                }).done(function(response) {
                    var obj = {Page: '', Url: curLink.attr('href')};
                    history.pushState(obj, obj.Page, obj.Url);

                    var newHTML = $('<div></div>').html(response);
                    $('header').html(newHTML.find('header').html());
                    $('footer').html(newHTML.find('footer').html());
                    $('.wrapper-content').html(newHTML.find('.wrapper-content').html());
                    if (curLink.hasClass('ajax-page-main')) {
                        $('body').removeClass('page-inner');
                    } else {
                        $('body').addClass('page-inner');
                    }

                    newHTML.remove();

                    resizeContent();

                    var processTime = Date.now() - startTime;

                    if (processTime < 2000) {
                        window.setTimeout(showPage, 2000 - processTime);
                    } else {
                        showPage();
                    }

                    function showPage() {
                        $('.pageload-overlay').fadeOut(function() {
                            var curSrc = curLoad.find('img').attr('src');
                            curLoad.find('img').attr('src', curLoad.find('img').data('animate'));
                            curLoad.find('img').data('animate', curSrc);

                            afterLoadContent();
                        })
                    }
                });
            });

            e.preventDefault();
        }
    });

    $('body').on('click', '.pager a', function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            var curIndex = $('.pager a').index(curLink);
            $('.wrapper').slick('slickGoTo', curIndex);
        }
        e.preventDefault();
    });

    $('form').each(function() {
        initForm($(this));
    });

    var traceR1, traceR2, traceR3, traceR4, layoutR;

    $('.calc-form form').submit(function(e) {
        var curForm = $(this);
        if (!curForm.hasClass('loading')) {
            curForm.addClass('loading');
            curForm.find('input[type="submit"]').prop('disable', true)
            $.ajax({
                type: 'POST',
                url: curForm.attr('action'),
                dataType: 'json',
                data: curForm.serialize(),
                cache: false
            }).complete(function(data) {
                var obj = $.parseJSON(data.responseText);
                $('#ku').html(obj.ku);
                $('#amount').html(obj.amount);
                $('#profitableness').html(obj.profitableness);
                $('#iddpercent').html(obj.iddpercent);
                $('#idd').html(obj.idd);
                $('#summidd').html(obj.summidd);
                $('#iddcurrency').html(obj.iddcurrency);
                $('#total').html(obj.total);

                $('.calc-results-params-chart-inner').html('');
                $('.calc-results-params-chart-inner').html('<div id="chart2" class="chart-content"></div>');

                var trace1 = {
                    x: ['Начало<br /> действия<br /> договора'],
                    y: [Number(obj.amount.replace(/ /g, '').replace(/,/g, '.'))],
                    name: 'Начало действия договора',
                    type: 'bar',
                    hoverinfo: 'y',
                    marker: {color: '#c3c3c3'}
                }

                var trace2 = {
                    x: ['Итоговая<br /> выплата'],
                    y: [Number(obj.total.replace(/ /g, '').replace(/,/g, '.'))],
                    name: 'Итоговая выплата',
                    type: 'bar',
                    hoverinfo: 'y',
                    marker: {color: '#431a2d'}
                }

                var trace3 = {
                    x: ['Структура<br /> итоговой<br /> выплаты'],
                    y: [Number(obj.amount.replace(/ /g, '').replace(/,/g, '.'))],
                    name: 'Страховая премия',
                    type: 'bar',
                    hoverinfo: 'y',
                    marker: {color: '#aaaaaa'}
                }

                var trace4 = {
                    x: ['Структура<br /> итоговой<br /> выплаты'],
                    y: [Number(obj.idd.replace(/ /g, '').replace(/,/g, '.'))],
                    name: 'ИДД без учета валютной переоценки',
                    type: 'bar',
                    hoverinfo: 'y',
                    marker: {color: '#f1f1f1'}
                }

                var trace5 = {
                    x: ['Структура<br /> итоговой<br /> выплаты'],
                    y: [Number(obj.summidd.replace(/ /g, '').replace(/,/g, '.'))],
                    name: 'Сумма валютной переоценки для определения ИДД',
                    type: 'bar',
                    hoverinfo: 'y',
                    marker: {color: '#802e54'}
                }

                var data = [trace1, trace2, trace3, trace4, trace5];

                var layout = {
                    barmode: 'stack',
                    showlegend: false,
                    yaxis: {
                        side: 'right',
                        hoverformat: ',r',
                        tickformat: ',r'
                    }
                };

                Plotly.newPlot('chart2', data, layout, {displayModeBar: false});

                $('.calc-results-chart .chart').html('');
                $('.calc-results-chart .chart').html('<div id="chart1" class="chart-content" style="height:650px"></div>');

                var datesArray = [];
                for (var i = 0; i < obj.results.length; i++) {
                    datesArray.push(obj.results[i].date);
                }

                var baseArray = [];
                for (var i = 0; i < obj.results.length; i++) {
                    baseArray.push(Number(obj.results[i].base.replace(/ /g, '').replace(/,/g, '.')));
                }

                var smartArray = [];
                for (var i = 0; i < obj.results.length; i++) {
                    smartArray.push(Number(obj.results[i].smart.replace(/ /g, '').replace(/,/g, '.')));
                }

                var garantArray = [];
                for (var i = 0; i < obj.results.length; i++) {
                    garantArray.push(Number(obj.results[i].garant.replace(/ /g, '').replace(/,/g, '.')));
                }

                var smartcurrArray = [];
                for (var i = 0; i < obj.results.length; i++) {
                    smartcurrArray.push(Number(obj.results[i].smartcurr.replace(/ /g, '').replace(/,/g, '.')));
                }

                traceR1 = {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Базовый актив',
                    x: datesArray,
                    y: baseArray,
                    hoverinfo: 'y',
                    line: {color: '#431a2d'}
                }

                traceR2 = {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Смартполис',
                    x: datesArray,
                    y: smartArray,
                    hoverinfo: 'y',
                    line: {color: '#a18c96'}
                }

                traceR3 = {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Гарантия',
                    x: datesArray,
                    y: garantArray,
                    hoverinfo: 'y',
                    line: {color: '#d0c6ca'}
                }

                traceR4 = {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Смартполис без валютной переоценки',
                    x: datesArray,
                    y: smartcurrArray,
                    hoverinfo: 'y',
                    line: {color: '#e8e3e5'}
                }

                var data = [traceR1, traceR3, traceR4];

                layoutR = {
                    xaxis: {
                        autorange: true,
                        range: [datesArray[0], datesArray[-1]],
                        rangeselector: {buttons: [
                            {
                                count: 60,
                                label: '5 лет',
                                step: 'month',
                                stepmode: 'backward'
                            },
                            {
                                count: 84,
                                label: '7 лет',
                                step: 'month',
                                stepmode: 'backward'
                            },
                            {
                                count: 120,
                                label: '10 лет',
                                step: 'month',
                                stepmode: 'backward'
                            },
                        ]},
                        rangeslider: {range: [datesArray[0], datesArray[-1]]},
                        type: 'date'
                    },
                    yaxis: {
                        hoverformat: 'r',
                        tick: 'r'
                    },
                    font: {
                        family: 'FedraSansProBook, sans-serif',
                        size: 11,
                        color: '#707070'
                    },
                    showlegend: false
                };

                Plotly.newPlot('chart1', data, layoutR, {displayModeBar: false});

                if ($('#calc-currency').val() == '1') {
                    $('.chart-calc-currency').show();
                } else {
                    $('.chart-calc-currency').hide();
                }

                $('.chart-calc-currency-link').removeClass('active');
                $('.calc-results').addClass('open');
                $('.wrapper-content').animate({scrollTop: $('.calc-results').offset().top})
                curForm.removeClass('loading');
                curForm.find('input[type="submit"]').prop('disable', false)
            });
        }
        e.preventDefault();
    });

    $('body').on('click', '.chart-calc-currency-link', function(e) {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            var data = [traceR1, traceR2, traceR3];
            Plotly.purge('chart1');
            Plotly.plot('chart1', data, layoutR, {displayModeBar: false});
            $('#calc-results-chart-legend-item-1').removeClass('active');
            $('#calc-results-chart-legend-item-2').addClass('active');
        } else {
            var data = [traceR1, traceR3, traceR4];
            Plotly.purge('chart1');
            Plotly.plot('chart1', data, layoutR, {displayModeBar: false});
            $('#calc-results-chart-legend-item-2').removeClass('active');
            $('#calc-results-chart-legend-item-1').addClass('active');
        }
        e.preventDefault();
    });

});

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
    $('.form-select select').each(function() {
        var curSelect = $(this);
        if (curSelect.data('placeholder') != '') {
            curSelect.parent().find('.chosen-single').prepend('<strong>' + curSelect.data('placeholder') + '</strong>');
        }
    });
});

function initForm(curForm) {
    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('focus');
        }
    });

    curForm.find('.form-input input, .form-input textarea').focus(function() {
        $(this).parent().addClass('focus');
    });

    curForm.find('.form-input input, .form-input textarea').blur(function() {
        if ($(this).val() == '') {
            $(this).parent().removeClass('focus');
        }
    });

    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});
    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        if (curSelect.data('placeholder') != '') {
            curSelect.parent().find('.chosen-single').prepend('<strong>' + curSelect.data('placeholder') + '</strong>');
        }
    });

    var dateFormat = 'dd.mm.yy';
    curForm.find('.form-input-date input').datepicker({
        dateFormat: dateFormat
    });
    window.setInterval(function() {
        $('.form-input-date input').each(function() {
            if ($(this).val() != '') {
                $(this).parent().addClass('focus');
            }
        });
    }, 100);
}

$(window).on('load resize', resizeContent);

function resizeContent() {
    var windowHeight = $(document).height();
    $('.wrapper-content').height(windowHeight - $('header').outerHeight() - $('footer').outerHeight());

    $('.insur-scheme-center-inner').each(function() {
        var curBlock = $(this);
        var curHeight = curBlock.parent().height();
        var curWidth = $('.content').width();
        curBlock.height(curHeight);
        curBlock.find('span').css({'border-top-width': curHeight / 2, 'border-bottom-width': curHeight / 2});
        curBlock.find('strong').css({'border-left-width': curWidth / 2, 'border-right-width': curWidth / 2});
    });
}

$(window).on('load', function() {
    afterLoadContent();
});

function afterLoadContent() {
    $('.header-slides-list-content').jScrollPane({
        autoReinitialise: true
    });

    $('.page-inner .wrapper-content').jScrollPane({
        autoReinitialise: true
    });

    $('.funds-item').addClass('show');
}

function createSlides() {
    if ($('.pager').length > 0) {
        $('.wrapper-inner').addClass('loaded');
        var curPager = $('.pager');
        var curIndex = curPager.find('a').index(curPager.find('a.active'));
        curPager.find('a').each(function() {
            var newIndex = curPager.find('a').index($(this));
            if (newIndex < curIndex) {
                $('.wrapper').prepend('<div class="wrapper-inner"><div class="wrapper-content"></div></div>');
            }
            if (newIndex > curIndex) {
                $('.wrapper').append('<div class="wrapper-inner"><div class="wrapper-content"></div></div>');
            }
        });
        $('.wrapper').slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: curIndex,
            arrows: false,
            dots: false,
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var curSlide = $('.wrapper-inner').eq(nextSlide);
            if (!curSlide.hasClass('loaded')) {
                var curLink = $('.pager a').eq(nextSlide);
                if (typeof (history.pushState) != 'undefined') {
                    curSlide.find('.wrapper-content').append('<div class="pageload-overlay"></div>');
                    var startTime = Date.now();
                    $.ajax({
                        url: curLink.attr('href'),
                        dataType: 'html',
                        cache: false
                    }).done(function(response) {
                        var obj = {Page: '', Url: curLink.attr('href')};
                        history.pushState(obj, obj.Page, obj.Url);

                        var newHTML = $('<div></div>').html(response);
                        $('header').html(newHTML.find('header').html());
                        $('footer').html(newHTML.find('footer').html());

                        newHTML.remove();

                        var processTime = Date.now() - startTime;

                        if (processTime < 2000) {
                            window.setTimeout(function() {
                                var apiScroll = curSlide.find('.wrapper-content').data('jsp');
                                if (apiScroll) {
                                    apiScroll.destroy();
                                }
                                curSlide.find('.wrapper-content').prepend(newHTML.find('.wrapper-content').html());
                                curSlide.find('.wrapper-content').jScrollPane({
                                    autoReinitialise: true
                                });
                                curSlide.addClass('loaded');
                                curSlide.find('.pageload-overlay').remove();
                                afterLoadContent();
                            }, 2000 - processTime);
                        } else {
                            var apiScroll = curSlide.find('.wrapper-content').data('jsp');
                            if (apiScroll) {
                                apiScroll.destroy();
                            }
                            curSlide.find('.wrapper-content').prepend(newHTML.find('.wrapper-content').html());
                            curSlide.find('.wrapper-content').jScrollPane({
                                autoReinitialise: true
                            });
                            curSlide.addClass('loaded');
                            curSlide.find('.pageload-overlay').remove();
                            afterLoadContent();
                        }

                    });
                }
            }

            $('.pager a.active').removeClass('active');
            $('.pager a').eq(nextSlide).addClass('active');
        });
    }
}