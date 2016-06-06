/*jslint browser: true */
/*global $, jQuery, alert, console, google */
$(document).ready(function () {
    'use strict';
    
    // for the (affix) and (resize btn-lg)
    if (window.innerWidth < 768) {
        $('.navbar').affix({offset: {top: 0} });
        //$('.btn').hasClass('.btn-lg').removeClass('btn-lg');
    }
    
    $(window).resize(function () {
        if (window.innerWidth < 768) {
            $('.navbar').affix({offset: {top: 0} });
           // $('.btn').hasClass('.btn-lg').removeClass('btn-lg');
        } else {
            $('.navbar').affix({offset: {top: 40} });
            //$('.btn').addClass('btn-lg');
        }
    });
    
    // trigger the MixitUp plugin
    $('#Container').mixItUp();
    
    
    // header panel code
    var prev = $('#home .prevBtn .fa'),
        prevLink = $('#home .prevBtn'),
        next = $('#home .nextBtn .fa'),
        nextLink = $('#home .nextBtn');
    
    function checkBoxes() {
        if ($('.box:first').hasClass('active')) {
            prev.css({
                background: "#565d34",
                opacity: '0.7'
            });
            prevLink.css({
                cursor: 'default',
                pointerEvents: 'none'
            });
        } else {
            prev.css({
                background: "#353a36",
                opacity: '1'
            });
            prevLink.css({
                cursor: 'pointer',
                pointerEvents: 'all'
            });
        }
        if ($('.box:last').hasClass('active')) {
            next.css({
                background: "#565d34",
                opacity: '0.7'
            });
            nextLink.css({
                cursor: 'default',
                pointerEvents: 'none'
            });
        } else {
            next.css({
                background: "#353a36",
                opacity: '1'
            });
            nextLink.css({
                cursor: 'pointer',
                pointerEvents: 'all'
            });
        }
    }
    
    $('.box').not($('.active')).hide();
    
    checkBoxes();
    
    nextLink.on('click', function () {
        $(this).parents('.box').removeClass('active').fadeOut(400, function () {
            $(this).next('.box').addClass('active').fadeIn();
            console.log($(this));
            checkBoxes();
        });
    });
    
    prevLink.on('click', function () {
        $(this).parents('.box').removeClass('active').fadeOut(400, function () {
            $(this).prev('.box').addClass('active').fadeIn();
            checkBoxes();
        });
    });
    
    // autohie plugin
    $(".main-navbar").autoHidingNavbar();
    
        // Add smooth scrolling to all links inside a navbar
    $("#myNavbar a").on('click', function (event) {

    // Prevent default anchor click behavior
        event.preventDefault();

      // Store hash (#)
        var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area (the speed of the animation)
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    });
    
});