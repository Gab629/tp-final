
document.addEventListener("DOMContentLoaded", function(event) {

    //Un commentaire

    var hamburger = document.querySelector(".hamburger-animated");
    var menuMobile = document.querySelector(".nav-primary-mobile");

    hamburger.addEventListener("click", openMenu);




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

        coverflowEffect: {
            rotate: 30,
            slideShadows: true,
        },


    });


});

/* ------------------------------- Smooth Scroll -------------------------------------*/



function retourHaut() {
    window.scrollTo({top: 0, behavior: 'smooth'});

}



































