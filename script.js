/* =================================
   WEDDING COUNTDOWN
================================= */

const weddingDate = new Date(
    "2026-12-04T12:00:00+05:30"
).getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = weddingDate - now;


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }


    const days = Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (difference %
            (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );


    const minutes = Math.floor(
        (difference %
            (1000 * 60 * 60)) /
        (1000 * 60)
    );


    const seconds = Math.floor(
        (difference %
            (1000 * 60)) /
        1000
    );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);



/* =================================
   WEDDING MUSIC
================================= */

const music =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");


let musicPlaying = false;


musicButton.addEventListener(
    "click",
    function () {

        if (musicPlaying) {

            music.pause();

            musicButton.innerHTML = "♫";

            musicPlaying = false;

        } else {

            music.play()
                .then(function () {

                    musicButton.innerHTML = "❚❚";

                    musicPlaying = true;

                })
                .catch(function () {

                    alert(
                        "Please add wedding.mp3 inside the music folder."
                    );

                });

        }

    }
);

// Auto play music when website loads
window.addEventListener("load", function () {

    music.volume = 0.3;

    music.play()
        .then(function () {

            musicButton.innerHTML = "❚❚";

            musicPlaying = true;

        })
        .catch(function () {

            console.log("Autoplay blocked by browser");

        });

});

// Start music on first user interaction
document.addEventListener("click", function (event) {

    if (event.target.closest("#musicButton")) {
        return;
    }

    if (!musicPlaying) {

        music.play()
            .then(function () {

                musicButton.innerHTML = "❚❚";

                musicPlaying = true;

            })
            .catch(function (error) {

                console.log("Music could not play:", error);

            });

    }

}, { once: true });



/* =================================
   SCROLL REVEAL
================================= */

const animatedElements =
    document.querySelectorAll(
        ".event-card, .venue-wrapper, .gallery-item"
    );


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );


animatedElements.forEach(
    function (element) {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(40px)";

        element.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

        observer.observe(element);

    }
);