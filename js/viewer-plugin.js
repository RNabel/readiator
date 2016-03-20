/**
 * Created by robin on 19/03/16.
 */
document.addEventListener("DOMContentLoaded", function (event) {
    var iframe = document.getElementById('epubjs-iframe');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

    console.log("Finished loading iframe.");

    var elementInViewport = function (el, win) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while(el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top >= win.pageYOffset &&
            left >= win.pageXOffset &&
            (top + height) <= (win.pageYOffset + win.innerHeight) &&
            (left + width) <= (win.pageXOffset + win.innerWidth)
        );
    };

    var scrollHandler = function (ev) {
        console.log("Scroll event");
        // All p elements.
        var pElements = $("p", this.document);
        var self = this;
        var visibleElements = $.map(pElements, function(element) {
            if (elementInViewport(element, self)) {
                return element;
            }
        });

        console.log(visibleElements);
        // TODO detect which p events are visible in iframe.
    };

    iframe.addEventListener('load', function () {
        console.log("LOADED");

        // Register the scroll handler.
        $(iframe.contentWindow).scroll(scrollHandler);
    });
});