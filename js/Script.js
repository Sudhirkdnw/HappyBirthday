//----------------------Particles.Js Code ----------------------//
particlesJS("particles-js", {
    particles: {
        number: {
            value: 6,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "polygon",
            stroke: {
                width: 0,
                color: "#000"
            },
            polygon: {
                nb_sides: 6
            },
            image: {
                src: "img/github.svg",
                width: 100,
                height: 100
            },
        },
        opacity: {
            value: 0.5678591709256108,
            random: true,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            },
        },
        size: {
            value: 81,
            random: true,
            anim: {
                enable: true,
                speed: 43.11549363248037,
                size_min: 32.73583775799436,
                sync: true,
            },
        },
        line_linked: {
            enable: false,
            distance: 200,
            color: "#ffffff",
            opacity: 1,
            width: 2,
        },
        move: {
            enable: true,
            speed: 8,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            },
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: false,
                mode: "grab"
            },
            onclick: {
                enable: false,
                mode: "push"
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            },
        },
    },
    retina_detect: true,
});
var count_particles = document.querySelector(".js-count-particles");
var stats = new Stats();
stats.setMode(0);
stats.domElement.style.display = "none";
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);
var update = function() {
    stats.begin();
    stats.end();
    if (count_particles) {
        if (
            window.pJSDom[0].pJS.particles &&
            window.pJSDom[0].pJS.particles.array
        ) {
            count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
        }
    }
    requestAnimationFrame(update);
};
requestAnimationFrame(update);
//----------------------Time Counter ----------------------//

// function getTimeRemaining(endtime) {
//     var t = Date.parse(endtime) - Date.parse(new Date());
//     var seconds = Math.floor((t / 1000) % 60);
//     var minutes = Math.floor((t / 1000 / 60) % 60);
//     var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
//     var days = Math.floor(t / (1000 * 60 * 60 * 24));
//     return {
//         total: t,
//         days: days,
//         hours: hours,
//         minutes: minutes,
//         seconds: seconds,
//     };
// }

// function initializeClock(id, endtime) {
//     var clock = document.getElementById(id);
//     var daysSpan = clock.querySelector(".days");
//     var hoursSpan = clock.querySelector(".hours");
//     var minutesSpan = clock.querySelector(".minutes");
//     var secondsSpan = clock.querySelector(".seconds");

//     function updateClock() {
//         var t = getTimeRemaining(endtime);
//         daysSpan.innerHTML = t.days;
//         hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
//         minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
//         let spanElm = document.createElement("span");
//         spanElm.innerHTML = ("0" + t.seconds).slice(-2);
//         spanElm.addEventListener("animationend", removeSpan);
//         secondsSpan.append(spanElm);
//         if (t.total <= 0) {
//             clearInterval(timeinterval);
//         }
//     }

//     function removeSpan() {
//         this.remove();
//     }
//     updateClock();
//     var timeinterval = setInterval(updateClock, 1000);
// }
// var deadline = new Date(
//     document.querySelector("#clockdiv").getAttribute("data-deadline")
// );
// initializeClock("clockdiv", deadline);

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector(".days");
    var hoursSpan = clock.querySelector(".hours");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");

    function updateClock() {
        var t = getTimeRemaining(endtime);
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
        minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
        let spanElm = document.createElement("span");
        spanElm.innerHTML = ("0" + t.seconds).slice(-2);
        spanElm.addEventListener("animationend", removeSpan);
        secondsSpan.append(spanElm);

        // ✅ Jab countdown 0 ho jaye
        if (t.total <= 0) {
            clearInterval(timeinterval);
            // Redirect to index.html
            window.location.href = "main.html";
        }
    }

    function removeSpan() {
        this.remove();
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

// Get deadline from data attribute
var deadline = new Date(
    document.querySelector("#clockdiv").getAttribute("data-deadline")
);

// Initialize countdown
initializeClock("clockdiv", deadline);
