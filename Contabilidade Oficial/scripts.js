//MOVIMENTAÃ‡ÃƒO
function movimenta(rolar) {
    $('html, body').animate({ scrollTop: $(rolar).offset().top }, 1000);
}

//TOPO
$(document).ready(function() {
    $('.up').click(function() {
        $('html, body').animate({ scrollTop: $('.topoAncora').offset().top }, 1000);
    })
    window.onscroll = function() {
        if (window.scrollY > 100) {
            $(".up").slideDown(500);
        } else {
            $(".up").slideUp(500);
        }
    }
})

//MENU
$(document).ready(function() {
    $('.botao-responsivo').click(function() {
        if ($(".main-menu").hasClass("d-none")) {
            $(".main-menu").hide().removeClass("d-none").slideDown(300);
        } else {
            $(".main-menu").slideUp(300, function() {
                $(".main-menu").addClass("d-none");
            });
        }
    });
});

//BANNER
$(document).ready(function() {

    $('.banner').cycle({
        timeout: 7000,
        speed: 1000,
        slides: '> div.banner-foto'
    });

    $(".owl-slogan").owlCarousel({
        autoplay: true,
        autoplayTimeout: 7000,
        autoplayHoverPause: true,
        items: 1,
        singleItem: true,
        loop: true,
        nav: false,
        dots: true
    });

    $(".owl-noticias").owlCarousel({
        autoplay: true,
        autoplayTimeout: 7000,
        autoplayHoverPause: true,
        stopOnHover: true,
        // singleItem : true,
        mouseDrag: true,
        loop: true,
        items: 1,
    });
});

//MODAL
var modal = document.getElementById('modal');

function janela_modal(janela) {
    modal.style.display = "flex";
    $(".janela_modal").hide();
    $(janela).show();
};

$(".close").click(function() { modal.style.display = "none"; });

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//ACORDION
$(document).ready(function() {
    $('.map').click(function() {
        if ($(this).next('.internoMap').is(':visible') == true) {
            $(".map").find("i").removeClass("fa-angle-up");
            $(".map").find("i").addClass("fa-angle-down");
            $('.internoMap').slideUp(500);
        } else {
            $('.internoMap').slideUp(500);
            $(this).next('.internoMap').slideDown(500);
            $(".map").find("i").addClass("fa-angle-up");
        }
    });
});

$(document).ready(function() {
    var SPMaskBehavior = function(val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        spOptions = {
            onKeyPress: function(val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };
    $('.celular-mask').mask(SPMaskBehavior, spOptions);

    $('#formcontato').submit(function() {
        var dados = $(this).serialize();

        $.ajax({
            type: "POST",
            url: "enviar.php",
            data: dados,
            dataType: 'json',
            beforeSend: function() {
                $("#resultado").removeClass('alert-white alert-danger alert-success alert-warning').addClass('alert alert-white');
                $("#resultado").html('Aguarde, enviando a mensagem');
                $("#resultado").fadeIn(250);
            },
            success: function(resposta) {
                $("#resultado").removeClass("alert-white alert-danger alert-success alert-warning").addClass(resposta.tipo);
                $("#resultado").html(resposta.mensagem);
                console.log(resposta);
            },
            error: function(resposta) {
                $("#resultado").removeClass("alert-white alert-danger alert-success alert-warning").addClass('alert-danger');
                $("#resultado").html('Um erro desconhecido aconteceu e sua mensagem nÃ£o pode ser enviada');
                console.log(resposta);
                $('#resposta-erro').html(resposta.responseText);
            }
        });
        return false;
    });

});

function reloadcaptcha() {
    $('#imgcaptcha').attr('src', 'captcha.php?l=160&a=40&tf=20&ql=5&new=' + (new Date()).getTime());
}

//FunÃ§Ã£o para abrir pop up
function popup(url) {
    varWindow = window.open(
        url,
        'Compartilhar',
        'width=500, height=650, top=100, left=200, scrollbars=no'
    );
}

//ConstrÃ³i a URL depois que o DOM estiver pronto        
document.addEventListener("DOMContentLoaded", function() {
    var url = encodeURIComponent(window.location.href);
    var titulo = encodeURIComponent(document.title).replace(/'|"|%25/g, "");
    //var via = encodeURIComponent("usuario-twitter"); //nome de usuÃ¡rio do twitter do seu site

    document.getElementById("share-facebook").href = "javascript:popup('https://www.facebook.com/sharer/sharer.php?u=" + url + "')"; //altera a URL do botÃ£o facebook
    document.getElementById("share-twitter").href = "javascript:popup('https://twitter.com/intent/tweet?url=" + url + "&text=" + titulo + "')"; //altera a URL do botÃ£o
    //document.getElementById("share-twitter").href = "javascript:popup(https://twitter.com/intent/tweet?url="+url+"&text="+titulo+"&via="+via+"')"; //se for usar o atributo via, utilize a seguinte url

    //tenta obter o conteÃºdo da meta tag description
    var summary = document.querySelector("meta[name='description']");
    summary = (!!summary) ? summary.getAttribute("content") : null;

    //se a meta tag description estiver ausente...
    if (!summary) {
        //...tenta obter o conteÃºdo da meta tag og:description
        summary = document.querySelector("meta[property='og:description']");
        summary = (!!summary) ? summary.getAttribute("content") : null;
    }
    //altera o link do botÃ£o
    linkedinLink = (!!summary) ? "https://www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + titulo + "&summary=" + encodeURIComponent(summary) : "https://www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + titulo;
    document.getElementById("share-linkedin").href = "javascript:popup('" + linkedinLink + "')";
}, false);