$("#submit-btn").click(function() {
    $('html, body').animate({
        scrollTop: $("#top-of-form").offset().top
    }, 5000);
});