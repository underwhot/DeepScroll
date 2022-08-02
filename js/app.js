(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    let zSpacing = -1e3, lastPos = zSpacing / 5, $frames = document.getElementsByClassName("frame"), script_frames = Array.from($frames), zVals = [];
    window.onscroll = function() {
        let top = document.documentElement.scrollTop, delta = lastPos - top;
        lastPos = top;
        script_frames.forEach((function(n, i) {
            zVals.push(i * zSpacing + zSpacing);
            zVals[i] += -5.5 * delta;
            let frame = script_frames[i], transform = `translateZ(${zVals[i]}px)`, opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0;
            frame.setAttribute("style", `transform: ${transform}; opacity: ${opacity}`);
        }));
    };
    window.scrollTo(0, 1);
    let soundButton = document.querySelector(".sound-button"), audio = document.querySelector(".audio");
    soundButton.addEventListener("click", (e => {
        soundButton.classList.toggle("paused");
        audio.paused ? audio.play() : audio.pause();
    }));
    window.onfocus = function() {
        soundButton.classList.contains("paused") ? audio.pause() : audio.play();
    };
    window.onblur = function() {
        audio.pause();
    };
    window["FLS"] = true;
    isWebp();
})();