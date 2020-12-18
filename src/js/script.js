
document.addEventListener("DOMContentLoaded", function(event) {

    //Un commentaire
    console.log("Ça fonctionne!!!");

    var hamburger = document.querySelector(".hamburger-animated");
    var menuMobile = document.querySelector(".nav-primary-mobile");

    hamburger.addEventListener("click", openMenu);
    console.log("Oy!!!");



    function openMenu(evt) {
        evt.preventDefault();

        var cible = evt.currentTarget;


        if (cible.classList.contains("open")) {
            cible.classList.remove("open");
            menuMobile.classList.remove("open");
        } else {
            cible.classList.add("open");
            menuMobile.classList.add("open");
        }
    }

    var mySwiper = new Swiper('.swiper-container', {
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        autoplay: {
            delay: 5000,
        },


    });


});
