$(document).ready(function () {
    let menu = $('.menu-vertical-attachment').closest('section');
    if ($(document).scrollTop() >= menu.height()) {
        menu.addClass('fixed');
    }
    let lastActive = $(".nav li a.active");
    onScroll();

    $('.menu-vertical-attachment li a').click(function (event) {
        event.stopImmediatePropagation();
        let id = $(this).attr('href');
        if (id === '#') {
            $('html, body').animate({scrollTop: 0}, 'slow').promise().progress(function () {
                $('body').trigger('scroll');
            }).promise().done(function () {
                $('body').trigger('scroll');
            });
            return;
        }
        let target = $(id);
        let cssOffsetTop = parseInt(target.css('padding-top').replace('px', '')) + parseInt(target.css('margin-top').replace('px', ''));
        cssOffsetTop = 5;
        $('html, body').animate({scrollTop: target.offset().top + cssOffsetTop - menu.height()}, 'slow').promise().progress(function () {
            $('body').trigger('scroll');
        }).promise().done(function () {
            $('body').trigger('scroll');
        })
    });
    $(document).scroll(function (event) {
        let menuAttachment = $('.menu-vertical-attachment').closest('section');
        // TODO udělat podmínku pokud už je jedno menu někde fixed, tak na to místo další nefixovat (je potřeba dotáhnout data z DB)
        menuAttachment.css('z-index', 30);
        if ($(window).scrollTop() > menu.height()) {
            menuAttachment.addClass('fixed');
        } else {
            menuAttachment.removeClass('fixed');
        }
        onScroll(event);
    })

    function onScroll(event) {
        header = menu.height();
        scrollPos = $(document).scrollTop() + header;
        $.each($(".nav li a"), function (key, value) {
            fullCurrLink = $(this).attr("href");
            if (fullCurrLink !== undefined) {
                if (fullCurrLink === '#') {
                    refElement = $('section').first();
                    if (scrollPos === menu.height()) {
                        $(this).addClass("active");
                        lastActive = $(this);
                        return;
                    }
                } else {
                    refElement = undefined;
                    if (fullCurrLink.includes('#')) {
                        refElement = $(fullCurrLink);
                    }
                }
                if (refElement !== undefined) {
                    if (refElement.length) {
                        let cssOffsetTop = parseInt(refElement.css('padding-top').replace('px', '')) + parseInt(refElement.css('margin-top').replace('px', ''));
                        if (refElement.position().top - cssOffsetTop <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                            $(this).addClass("active");
                            lastActive = $(this);
                        } else {
                            if ($(this).attr('href') !== lastActive.attr('href')) {
                                $(this).removeClass("active");
                            }
                        }
                    }
                }

            }
        });
    }
});
