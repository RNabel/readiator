/**
 * Created by robin on 19/03/16.
 */
document.addEventListener("DOMContentLoaded", function (event) {
        var iframe = document.getElementById('epubjs-iframe');

        var moodDecider = function (emotions) {
            var emotion = "neutral";
            var largest = 0.5;

            for (var key in emotions) {
                if (emotions.hasOwnProperty(key) &&
                    emotions[key] >= largest) {
                    emotion = key;
                    largest = emotions[key];
                }
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
                //anger: parseFloat($('anger', ev.children).text()),
                anger: $('anger', ev.children).text(),
                disgust: $('disgust', ev.children).text(),
                fear: $('fear', ev.children).text(),
                sadness: $('sadness', ev.children).text(),
                joy: $('joy', ev.children).text()
            };
            var result = moodDecider(emotions);
            console.log(result);
            return emotions;
        };

        var alchemyApiRequest = function (link, text, callback, type) {
            var type = type || "GET";
            $.ajax(link, {
                type: type,
                data: {
                    apikey: "1809d99ab469fc50ac1c54ec2eb06d8b8f2c07c9",
                    text: text,
                    sentiment: 1
                }
            }).done(callback)
        };

        var xml2json = function xml2json(xml, tab) {
            var X = {
                toObj: function (xml) {
                    var o = {};
                    if (xml.nodeType == 1) {   // element node ..
                        if (xml.attributes.length)   // element with attributes  ..
                            for (var i = 0; i < xml.attributes.length; i++)
                                o["@" + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
                        if (xml.firstChild) { // element has child nodes ..
                            var textChild = 0, cdataChild = 0, hasElementChild = false;
                            for (var n = xml.firstChild; n; n = n.nextSibling) {
                                if (n.nodeType == 1) hasElementChild = true;
                                else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                                else if (n.nodeType == 4) cdataChild++; // cdata section node
                            }
                            if (hasElementChild) {
                                if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                                    X.removeWhite(xml);
                                    for (var n = xml.firstChild; n; n = n.nextSibling) {
                                        if (n.nodeType == 3)  // text node
                                            o["#text"] = X.escape(n.nodeValue);
                                        else if (n.nodeType == 4)  // cdata node
                                            o["#cdata"] = X.escape(n.nodeValue);
                                        else if (o[n.nodeName]) {  // multiple occurence of element ..
                                            if (o[n.nodeName] instanceof Array)
                                                o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                            else
                                                o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                        }
                                        else  // first occurence of element..
                                            o[n.nodeName] = X.toObj(n);
                                    }
                                }
                                else { // mixed content
                                    if (!xml.attributes.length)
                                        o = X.escape(X.innerXml(xml));
                                    else
                                        o["#text"] = X.escape(X.innerXml(xml));
                                }
                            }
                            else if (textChild) { // pure text
                                if (!xml.attributes.length)
                                    o = X.escape(X.innerXml(xml));
                                else
                                    o["#text"] = X.escape(X.innerXml(xml));
                            }
                            else if (cdataChild) { // cdata
                                if (cdataChild > 1)
                                    o = X.escape(X.innerXml(xml));
                                else
                                    for (var n = xml.firstChild; n; n = n.nextSibling)
                                        o["#cdata"] = X.escape(n.nodeValue);
                            }
                        }
                        if (!xml.attributes.length && !xml.firstChild) o = null;
                    }
                    else if (xml.nodeType == 9) { // document.node
                        o = X.toObj(xml.documentElement);
                    }
                    else
                        alert("unhandled node type: " + xml.nodeType);
                    return o;
                },
                toJson: function (o, name, ind) {
                    var json = name ? ("\"" + name + "\"") : "";
                    if (o instanceof Array) {
                        for (var i = 0, n = o.length; i < n; i++)
                            o[i] = X.toJson(o[i], "", ind + "\t");
                        json += (name ? ":[" : "[") + (o.length > 1 ? ("\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind) : o.join("")) + "]";
                    }
                    else if (o == null)
                        json += (name && ":") + "null";
                    else if (typeof(o) == "object") {
                        var arr = [];
                        for (var m in o)
                            arr[arr.length] = X.toJson(o[m], m, ind + "\t");
                        json += (name ? ":{" : "{") + (arr.length > 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")) + "}";
                    }
                    else if (typeof(o) == "string")
                        json += (name && ":") + "\"" + o.toString() + "\"";
                    else
                        json += (name && ":") + o.toString();
                    return json;
                },
                innerXml: function (node) {
                    var s = ""
                    if ("innerHTML" in node)
                        s = node.innerHTML;
                    else {
                        var asXml = function (n) {
                            var s = "";
                            if (n.nodeType == 1) {
                                s += "<" + n.nodeName;
                                for (var i = 0; i < n.attributes.length; i++)
                                    s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
                                if (n.firstChild) {
                                    s += ">";
                                    for (var c = n.firstChild; c; c = c.nextSibling)
                                        s += asXml(c);
                                    s += "</" + n.nodeName + ">";
                                }
                                else
                                    s += "/>";
                            }
                            else if (n.nodeType == 3)
                                s += n.nodeValue;
                            else if (n.nodeType == 4)
                                s += "<![CDATA[" + n.nodeValue + "]]>";
                            return s;
                        };
                        for (var c = node.firstChild; c; c = c.nextSibling)
                            s += asXml(c);
                    }
                    return s;
                },
                escape: function (txt) {
                    return txt.replace(/[\\]/g, "\\\\")
                        .replace(/[\"]/g, '\\"')
                        .replace(/[\n]/g, '\\n')
                        .replace(/[\r]/g, '\\r');
                },
                removeWhite: function (e) {
                    e.normalize();
                    for (var n = e.firstChild; n;) {
                        if (n.nodeType == 3) {  // text node
                            if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                                var nxt = n.nextSibling;
                                e.removeChild(n);
                                n = nxt;
                            }
                            else
                                n = n.nextSibling;
                        }
                        else if (n.nodeType == 1) {  // element node
                            X.removeWhite(n);
                            n = n.nextSibling;
                        }
                        else                      // any other node
                            n = n.nextSibling;
                    }
                    return e;
                }
            };
            if (xml.nodeType == 9) // document node
                xml = xml.documentElement;
            var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
            return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
        };

        var lastTime = Date.now() / 1000 | 0;
        var requested = false;
        var bookTaxonomy = undefined;

        var scrollHandler = function (ev) {
            var currentTime = Date.now() / 1000 | 0;

            var difference = currentTime - lastTime;

            if (difference < 1) {
                requested = true;
                setTimeout(scrollHandler, (difference) * 1100);
                return;
            }

            // Get all p elements.
            var pElements = $("p", this.document);
            if (!bookTaxonomy) {
                alchemyApiRequest("http://gateway-a.watsonplatform.net/calls/text/TextGetRankedTaxonomy", pElements.text(), function (ev) {
                    var retObj = xml2json(ev);
                    bookTaxonomy = retObj;
                });
            }
            var self = this;

            // Filter for elements which are visible.
            var visibleElements = $.map(pElements, function (element) {
                if (elementInViewport(element, self)) {
                    return element;
                }
            });

            var text = $(visibleElements).text();

            // Get relevant keywords.
            alchemyApiRequest("http://gateway-a.watsonplatform.net/calls/text/TextGetRankedKeywords", text, function (ev) {
                var keywords = $('keyword', ev).children().map(function (e, v) {
                    return $(v).text();
                });
                if (keywords.length) {
                    keywords[1] = keywords[1]
                }
                var resultObj = JSON.parse(xml2json(ev).replace("undefined", ""));
                console.log(keywords);
            }, "POST");

            // Get mood.
            alchemyApiRequest("http://gateway-a.watsonplatform.net/calls/text/TextGetEmotion", text, moodExtractor);
        };

        iframe.addEventListener('load', function () {
            // Register the scroll handler.
            $(iframe.contentWindow).scroll(scrollHandler);
        });
    }
);