$(document).ready(function() {

    resizeContent();

    $('.header-slides-link').click(function(e) {
        $(this).toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-slides').length == 0) {
            $('.header-slides-link').removeClass('open');
        }
    });

    $('.header-slides-list-content').jScrollPane({
        autoReinitialise: true
    });

    $('.header-stacks-link').click(function(e) {
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

    $('.main-menu-item-link').click(function(e) {
        var curBlock = $(this).parent();
        if (curBlock.find('.main-menu-content').length > 0) {
            curBlock.toggleClass('open');
            curBlock.find('.main-menu-content').slideToggle(300);
            $('.main').toggleClass('open');
            e.preventDefault();
        }
    });

    $('.header-stacks-item-link').click(function(e) {
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

    $('.page-inner .wrapper-content').jScrollPane({
        autoReinitialise: true
    });

    $('.tabs-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curTabs = curLi.parents().filter('.tabs');
            var curIndex = curTabs.find('.tabs-menu ul li').index(curLi);
            curTabs.find('.tabs-menu ul li.active').removeClass('active');
            curLi.addClass('active');
        }
        e.preventDefault();
    });

});

$(window).on('load resize', resizeContent);

function resizeContent() {
    $('.wrapper-content').css({'height': $('.wrapper').outerHeight() - $('header').height() - $('footer').height()});

    $('.insur-scheme-center-inner').each(function() {
        var curBlock = $(this);
        var curHeight = curBlock.parent().height();
        curBlock.height(curHeight);
        curBlock.find('span').css({'border-top-width': curHeight / 2, 'border-bottom-width': curHeight / 2});
    });
}