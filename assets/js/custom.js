$(document).ready(function () {
    $(document).on("click", "a[href='#']", function (e) {
        e.preventDefault()
    })
    $('input[type="tel"]').mask("+7(999) 999-9999");
    $(document).on("click", ".weights .more", function () {
        $(".item.border.rounded").each(function () {
            if (!$(this).hasClass("hide") && !$(this).hasClass("more")) {
                $(this).addClass("hide")
            } else {
                $(this).removeClass("hide")
            }
            if (!$(this).children().hasClass("rotate-90")) {
                $(this).children().addClass("rotate-90")
            } else {
                $(this).children().removeClass("rotate-90")
            }
        })
    })

    if ($(".replace_price.default").text()) {
        var price = 1280
    } else {
        var price = $(".replace_price").text()
        var price_own = true
    }
    $(document).on("click", ".weights .item", function () {

        if (!$(this).hasClass("more")) {
            $(".weights .item").removeClass("active")
            $(this).addClass("active")

            let kg = $(this).children().first().text().replace(/[^0-9]/g, "")
            console.log(kg)
            if (kg == "25") {
                kg = "2.5"
            }
            if (Number(kg) >= 4) {
                console.log("Cюда попало")
                if (!price_own) {
                    price = 2150
                }
            } else {
                if (!price_own) {
                    price = 1280
                }
            }
            console.log(price)
            $(".replace_kg").text(kg)
            $(".insertKg").text(kg)
            $(".replace_price").text(kg * price)
            $(".insertPrice").text(kg * price)
            $('input[name="weight"]').val(kg)

        }

        let data_title = $(this).attr("data-title")
        $(`.shipping_desc div`).css({"display": "none"})
        $(`.shipping_desc div[data-title="${data_title}"]`).css({"display": "block"})
    })

    $(".count_comment").text($(".comment .row.mb-4").length)

    $(window).on('load resize', function () {
        if ($(window).width() <= 768) {
            $('.block_replace_prece_js').html($('.adaptive_replace_js').detach());
        }
    });

    var StickyElement = function (node) {
        var doc = $(document),
            fixed_my = false,
            anchor = node.find('#intro'),
            content = node.find('.block_replace_prece_js');
        var onScroll = function (e) {
            var docTop = doc.scrollTop(),
                anchorTop = anchor.offset().top;
            if (docTop > anchorTop) {
                if (!fixed_my) {
                    anchor.height(content.outerHeight());
                    content.addClass('fixed_my');
                    fixed_my = true;
                }
            } else {
                if (fixed_my) {
                    anchor.height(0);
                    content.removeClass('fixed_my');
                    fixed_my = false;
                }
            }
        };
        $(window).on('scroll', onScroll);
    };
    var sticky = new StickyElement($('body'));

    $(document).on("click", "button.order", function () {
        let kg = $(".weights.slide .item.active .num_kg > div").text().replace(/[^0-9]/g, "")

        if (kg == "25") {
            kg = "2.5"
        }
        let filling = $(".slick-current.slick-active").next().children("img").attr("alt")
        // let img = $(".slick-current.slick-active").next().children("img").attr("src")
        let price = $(".replace_price").text()
        $('input[name="weight"]').val(kg)
        $('input[name="filling"]').val(filling)

        $(".insertPrice").text(price)
        $(".insertKg").text(kg)
        $(".insertTitleFiling").text(filling)
        // $(".imgFiling").attr("src", img)

        $(".insertWeightsSlide").empty()
        $(".insertWeightsSlide").html($(".weights.slide").clone())

        console.log()
    })

    $(document).on("click", "a.get_filling", function () {
        $("#exampleModal").css({"z-index": 1056})
    })

    $(document).on("click", ".orderSubmit", function () {
        if ($('#exampleCheck1').prop('checked')) {
            $(".form-check-label.checkbox").css({"color": "#4f4f4f"})
        } else {
            $(".form-check-label.checkbox").text("Вы не согласились на обработку персональных данных")
            $(".form-check-label.checkbox").css({"color": "brown"})
        }
    })
    $(document).on("click", "#exampleCheck1", function () {
        if ($('#exampleCheck1').prop('checked')) {
            $(".form-check-label.checkbox").css({"color": "#4f4f4f"})
            $(".form-check-label.checkbox").text("Я согласен на обработку персональных данных")
        } else {
            $(".form-check-label.checkbox").text("Вы не согласились на обработку персональных данных")
            $(".form-check-label.checkbox").css({"color": "brown"})
        }
    })

    $(document).on("click", "a.get_filling", function () {
        // при клике в модальном окне начинок, выбираем нужный слайд
        let indexCur = $("a.get_filling").index(this)
        if (indexCur == 0) {
            indexCur = $("a.get_filling").length - 2
        } else {
            indexCur = indexCur - 1
        }
        $(".slick-dots li button").eq(indexCur).trigger('click');

        if ($(this).text() != "сменить") {
            $(".insertTitleFiling").text($(this).text())
        }


    })
    $(document).on("click", ".cake_weight a", function () {
       if ($(".insertWeightsSlide").css("display") == "none"){
           $(".insertWeightsSlide").css({"display":"block"})
           $(this).text("Скрыть")
       }else{
           $(".insertWeightsSlide").css({"display":"none"})
           $(this).text("Сменить")
       }
    })

})


/*Слайды*/
$(document).ready(function () {
    $('.filling.sliders').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
        // focusOnSelect: true,
        nextArrow: '<img class="expand_less_right" src="/assets/img/svg/expand-less.svg" alt="">',
        prevArrow: '<img class="expand_less_left" src="/assets/img/svg/expand-less.svg" alt="">',
        // responsive: [
        //      {
        //        breakpoint: 1024,
        //        settings: {
        //          slidesToShow: 1,
        //          slidesToScroll: 1,
        //        }
        //      },
        //      {
        //        breakpoint: 768,
        //        settings: {
        //          slidesToShow: 2,
        //          slidesToScroll: 1
        //        }
        //      }
        //    ]

    });
    if ($(".slick-active").length == 1) {
        $(".slick-current.slick-active").css({"opacity": 1})
    } else {
        $(".slick-current.slick-active").next().css({"opacity": 1})
    }

    $(document).on("click", ".slick-arrow", function () {
        slideOpacity()
    })

    $('.filling.sliders').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        slideOpacity()
    });
})

function slideOpacity() {
    if ($(".slick-active").length != 1) {
        $(".slick-active").css({"opacity": ".3"})
        $(".slick-current.slick-active").next().css({"opacity": 1})
    } else {
        $(".slick-current.slick-active").css({"opacity": 1})
    }
}