$(document).ready(function () {
    // Вешаем обработчик события "клик" на все ссылки с классом ajax_link
    $(document).on("click", '.get_filling', function () {

        // Берем действие из атрибута data-action ссылки
        var id = $(this).data('id');
        var request = "request_get_filling"


        let filling = $(".slick-current.slick-active").next().children("img").attr("alt")
        if ($(this).text() != "сменить") {
            $('input[name="filling"]').val(filling)
        }

        // Ajax запрос к текущей страницы (а на ней наш сниппет) методом post
        // Модальное окно начинка START
        $.ajax({
            url: document.location.href,
            method: 'POST',
            data: {request: request, id: id},
            dataType: 'json',
            success: function (data) {
                // Выдаем ответ
                console.log('Запрос успешно выполнен')

                $('.modal-content.filling_replace').html(
                    `<div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">` + data.pagetitle + `</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-3">

                            </div>
                            <div class="col-md-9">
                                <div>
                                    <img class="w-100" src="` + data.image + `" alt="">
                                   ` + data.content + `
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>`
                );

                data.arFillings.forEach(function (item, index, array) {
                    $(".modal-body .row .col-md-3").append(
                        `<div class="menu_filling"><a href="#" data-id="` + item.id + `"
                                                                 class="get_filling">` + item.pagetitle + `</a></div>`
                    )
                });

                $(".col-md-3 .get_filling").each(function () {
                    if ($(this).attr("data-id") == id) {
                        $(this).parent().css({
                            "background": "#009be7"
                        })
                        $(this).css({
                            "color": "#fff",
                            "text-transform": "uppercase"
                        })
                    }

                })
            }

        });
        // Модальное окно начинка END

        // Не даем ссылке кликнуться - нам же не нужна перезагрузка страницы?
        return false;
    })
    $(document).on("click", ".btn.btn-primary.btn-block.mb-4.ripple-surface", function () {
        if ($('input[name="name"]').val() && $('input[name="email"]').val() && $("#form4Example3").val()) {
            var id_product = $('input[name="id_product"]').val()
            var name = $('input[name="name"]').val()
            var email = $('input[name="email"]').val()
            var comment = $("#form4Example3").val()
            var request = "request_add_cooment"

            console.log(name);
            console.log(email);
            console.log(comment);
            // Ajax запрос к текущей страницы (а на ней наш сниппет) методом post
            $.post(document.location.href, {
                request: request,
                id_product: id_product,
                name: name,
                email: email,
                comment: comment
            }, function (data) {
                // Выдаем ответ
                console.log('Запрос успешно выполнен')
                $('.modal-content.filling_replace').html(data);
            })
        }

    })

})