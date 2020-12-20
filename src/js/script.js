document.addEventListener("DOMContentLoaded", function (event) {

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



    /* ------------------------------- Base de donee -------------------------------------*/

    let connexion = new MovieDB();

    if (document.location.pathname.search('fiche-film.html') > 0) {
        let params = new URL(document.location).searchParams;
        connexion.requeteInfoFilms(params.get('id'));
        connexion.requetteActeur(params.get('id'));
    } else {
        connexion.requeteDernierFilms();
        connexion.requeteDernierFilmsCarrousel();
    }


});

/* ------------------------------- Smooth Scroll -------------------------------------*/


function retourHaut() {
    window.scrollTo({top: 0, behavior: 'smooth'});

}


/* ------------------------------- Base de donee -------------------------------------*/

class MovieDB {

    constructor() {
        console.log('new MovieDB()');

        this.apikey = "3c367a023e1abbda15e9e3c3b0db2d8b";
        this.lang = "fr-CA";
        this.baseUrl = "https://api.themoviedb.org/3/";
        this.imgPath = "https://image.tmdb.org/t/p/";
        this.totalFilm = 9;

    }

    requeteDernierFilms() {
        let requette = new XMLHttpRequest();
        requette.addEventListener('loadend', this.retourRequeteDernierFilm.bind(this));
        requette.open('GET', this.baseUrl + 'movie/top_rated?api_key=' + this.apikey + '&language=' + this.lang + '&page=1');
        requette.send();
    };

    retourRequeteDernierFilm(event) {
        console.log('ca marche');
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results;
        //console.log(data);

        this.afficheDernierFilm(data);

    };

    afficheDernierFilm(data) {
        let section = document.querySelector('#liste-films');
        console.log(section);

        for (let i = 0; i < this.totalFilm; i++) {
            //console.log(data[i].title);
            // console.log(data[i].overview);
            let article = document.querySelector('.displayFilms .film').cloneNode(true);

            section.appendChild(article);

            article.querySelector('h2').innerHTML = data[i].title;

            let src = this.imgPath + "w500" + data[i].poster_path;
            let image = article.querySelector('img');
            image.setAttribute('src', src);
            image.setAttribute('alt', data[i].title);

            article.querySelector('a').setAttribute('href', 'fiche-film.html?id=' + data[i].id);

            article.querySelector('.description').innerHTML = data[i].overview || "Aucune description disponible";

            article.querySelector('.vote').innerHTML = "Moyenne des votes : " + data[i].vote_average;

            article.querySelector('.annee').innerHTML = "Date de sortie : " + data[i].release_date;


        }
    }


    requeteDernierFilmsCarrousel() {
        let requette = new XMLHttpRequest();
        requette.addEventListener('loadend', this.retourRequeteDernierFilmCarrousel.bind(this));
        requette.open('GET', this.baseUrl + 'movie/popular?api_key=' + this.apikey + '&language=' + this.lang + '&page=1');
        requette.send();
    };

    retourRequeteDernierFilmCarrousel(event) {
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results;
        //console.log(data);

        this.afficheDernierFilmCarrousel(data);

    };

    afficheDernierFilmCarrousel(data) {
        let section2 = document.querySelector('.swiper-wrapper');

        for (let i = 0; i < this.totalFilm; i++) {
            let article = document.querySelector('.swiper-wrapper .swiper-slide').cloneNode(true);

            section2.appendChild(article);

            article.querySelector('h2').innerHTML = data[i].title;

            let src = this.imgPath + "w500" + data[i].poster_path;
            let image = article.querySelector('img');
            image.setAttribute('src', src);
            image.setAttribute('alt', data[i].title);

            article.querySelector('a').setAttribute('href', 'fiche-film.html?id=' + data[i].id);

            article.querySelector('.description').innerHTML = data[i].overview || "Aucune description disponible";

            article.querySelector('.vote').innerHTML = "Moyenne des votes : " + data[i].vote_average;


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
    }


    requeteInfoFilms(movieId) {
        let requette = new XMLHttpRequest();
        requette.addEventListener('loadend', this.retourRequeteInfoFilm.bind(this));
        requette.open('GET', this.baseUrl + 'movie/' + movieId + '?api_key=' + this.apikey + '&language=' + this.lang);
        requette.send();
    };

    retourRequeteInfoFilm(event) {
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText);
        //console.log(data);
        // console.log(target.responseText);

        this.afficheInfoFilm(data);
    };

    afficheInfoFilm(data) {
        let article = document.querySelector('.acteur');
        let src = this.imgPath + "w500" + data.poster_path;
        let image = article.querySelector('img');
        image.setAttribute('src', src);
        image.setAttribute('alt', data.title);

        document.querySelector('h2').innerHTML = data.title;
        article.querySelector('.description').innerHTML = data.overview || "Aucune description disponible";
        article.querySelector('.annee').innerHTML = "Date de sortie : " + data.release_date;
        article.querySelector('.etoiles').innerHTML = "Moyenne des votes : " + data.vote_average;
        article.querySelector('.langue').innerHTML = "Langue : " +data.original_language;
        article.querySelector('.duree').innerHTML = "Durée : " + data.runtime + " min";
        article.querySelector('.budget').innerHTML = "Budget : " + data.budget;
        article.querySelector('.recette').innerHTML = "Revenus : " + data.revenue + "$";


    }

    requetteActeur(movieId) {
        //GET CREDIT (movieDB) - requette AJAX
        let requette = new XMLHttpRequest();
        requette.addEventListener('loadend', this.retourRequetteActeur.bind(this));
        requette.open('GET', this.baseUrl + 'movie/' + movieId + '/credits' + '?api_key=' + this.apikey + '&language=' + this.lang);
        requette.send();


    }

    retourRequetteActeur(event) {
        //Faire attention au JSON.parse... il ny a pas de results
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).cast;
        console.log(data);
        //console.log(target.responseText);

        this.afficheActeur(data);
    }

    afficheActeur(data) {
        let section3 = document.querySelector('.swiper-wrapper');

        //boucle pour afficher tous les acteurs avec un cloneNode
        for (let i = 0; i < data.length; i++) {
            let article = document.querySelector('.swiper-wrapper .swiper-slide').cloneNode(true);

            section3.appendChild(article);

            let src = this.imgPath + "w500" + data[i].profile_path;
            let image = article.querySelector('img');

            if(data[i].profile_path == null){
                image.setAttribute('src', "images/image-temp.jpg");
            }else{
                image.setAttribute('src', src);
            }


            article.querySelector('h2').innerHTML = data[i].character;





        }
        //CARROUSEL ---------------------------------------//
        var mySwiper2 = new Swiper('.swiper-2', {
            loop: true,

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },

            autoplay: {
                delay: 5000,
            },


        });
    }


}





























