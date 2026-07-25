(function () {
    var stored = localStorage.getItem('theme');
    var initial = stored ? stored : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', initial);
})();

$(document).ready(function () {
    $('.theme-toggle').on('click', function() {
        var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    $('.menu-toggler').on('click', function() {
        $(this).toggleClass('open');
        $('.top-nav').toggleClass('open');
    });

    $('.top-nav .nav-link').on('click', function() {
        $('.menu-toggler').removeClass('open');
        $('.top-nav').removeClass('open');
    });

    $('nav a[href*="#"], .hero-btn-primary').on('click', function() {
        var href = $(this).attr('href');

        // Cross-page links (e.g. "index.html#about" from a subpage) should
        // navigate normally instead of being treated as a same-page anchor.
        if (href.charAt(0) !== '#') {
            return;
        }

        $('html, body').animate({
            scrollTop: $(href).offset().top - 90
        }, 2000);
    });

    $('#up').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1800);
    });

    var $siteNav = $('.site-nav');
    var $siteNavLinks = $('.site-nav-link');
    var $mobileNavLinks = $('.top-nav .nav-link[href^="#"]');
    var $sections = $('section[id]');

    function updateSiteNav() {
        var scrollTop = $(window).scrollTop();

        if (scrollTop > 60) {
            $siteNav.addClass('scrolled');
        } else {
            $siteNav.removeClass('scrolled');
        }

        var currentId = '';
        var pointer = scrollTop + 140;

        $sections.each(function() {
            if (pointer >= $(this).offset().top) {
                currentId = $(this).attr('id');
            }
        });

        $siteNavLinks.removeClass('active');
        $mobileNavLinks.removeClass('active');
        if (currentId) {
            $siteNavLinks.filter('[href="#' + currentId + '"]').addClass('active');
            $mobileNavLinks.filter('[href="#' + currentId + '"]').addClass('active');
        }
    }

    $(window).on('scroll', updateSiteNav);
    updateSiteNav();

    // Reduced-motion users still get every element revealed (via the CSS
    // transition-duration override in main.css) — AOS itself must stay
    // enabled, since AOS's `disable` option skips adding the reveal class
    // entirely and elements would stay permanently hidden at opacity:0.
    AOS.init({
        easing: 'ease',
        duration: 1800,
        once: true
    });
});