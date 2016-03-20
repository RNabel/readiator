/**
 * Created by robin on 19/03/16.
 */
document.addEventListener("DOMContentLoaded", function (event) {
    var iframe = document.getElementById('epubjs-iframe');

    var moodDecider = function (emotions) {
        var emotion = "neutral";
        var largest = 0.5;

        if (emotions.anger - emotions.joy >= 0.2 && emotions.anger > 0.3) {
            emotion = "anger";
            largest = emotions.anger;
        }

        if (emotions.joy - emotions.anger >= 0.2 && emotions.joy > 0.3) {
            emotion = "joy";
            largest = emotions.joy;
        }

        if (emotions.disgust > largest) {
            emotion = "disgust";
            largest = emotions.disgust;
        }

        if (emotions.fear > largest) {
            emotion = "fear";
            largest = emotions.fear;
        }

        return [emotion, largest];
    };

    var elementInViewport = function (el, win) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while (el.offsetParent) {
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

    var moodExtractor = function (ev) {
        var emotions = {
                anger: parseFloat($('anger', ev.children).text()),
                disgust: 10 * $('disgust', ev.children).text(),
                fear: 10 * $('fear', ev.children).text(),
                sadness: 10 * $('sadness', ev.children).text(),
                joy: 10 * $('joy', ev.children).text()
            };
        var result = moodDecider(emotions);
        console.log(result);
        return emotions;
    };

    var scrollHandler = function (ev) {
        // Get all p elements.
        var pElements = $("p", this.document);
        var self = this;

        // Filter for elements which are visible.
        var visibleElements = $.map(pElements, function (element) {
            if (elementInViewport(element, self)) {
                return element;
            }
        });

        var text = $(visibleElements).text();

        $.ajax("http://gateway-a.watsonplatform.net/calls/text/TextGetEmotion", {
            type: "GET",
            data: {
                apikey: "1809d99ab469fc50ac1c54ec2eb06d8b8f2c07c9",
                text: encodeURI(text)
            }
        }).done(moodExtractor);
    };

    iframe.addEventListener('load', function () {
        // Register the scroll handler.
        $(iframe.contentWindow).scroll(scrollHandler);
    });
});