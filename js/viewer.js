function shortcutKey(element, scope) {
    if ("INPUT" != element.target.tagName && "SELECT" != element.target.tagName && "TEXTAREA" != element.target.tagName && !element.target.isContentEditable) {
        switch (element.code) {
            case"KeyP":
                scope.prevChapter();
                break;
            case"KeyN":
                scope.nextChapter()
        }
        scope.$apply()
    }
}
function generateTocItems(contents) {
    var list = document.createElement("ul");
    return list.className = "list", contents.forEach(function (chapter) {
        var listItem = document.createElement("li");
        listItem.className = "list-item";
        var item = document.createElement("a");
        if (item.textContent = chapter.label, Book.contents.navPath)var path = EPUBJS.core.folder(Book.contents.navPath);
        if (Book.contents.tocPath)var path = EPUBJS.core.folder(Book.contents.tocPath);
        if (path ? item.href = Book.settings.contentsPath + path + chapter.href : item.href = Book.settings.contentsPath + chapter.href, item.target = "epubjs-iframe", listItem.appendChild(item), list.appendChild(listItem), chapter.subitems && chapter.subitems.length) {
            var subitems = generateTocItems(chapter.subitems);
            listItem.appendChild(subitems)
        }
    }), list
}
function _get_window_Yscroll() {
    var iframe = document.getElementById("epubjs-iframe");
    return iframe.contentWindow.pageYOffset || iframe.contentDocument.body.scrollTop || iframe.contentDocument.documentElement.scrollTop || 0
}
function googleAnalytics(book) {
}


!function () {
    "use strict";
    function e(e, t) {
        if (e) {
            if (t.element_.classList.contains(t.CssClasses_.MDL_JS_RIPPLE_EFFECT)) {
                var s = document.createElement("span");
                s.classList.add(t.CssClasses_.MDL_RIPPLE_CONTAINER), s.classList.add(t.CssClasses_.MDL_JS_RIPPLE_EFFECT);
                var i = document.createElement("span");
                i.classList.add(t.CssClasses_.MDL_RIPPLE), s.appendChild(i), e.appendChild(s)
            }
            e.addEventListener("click", function (s) {
                s.preventDefault();
                var i = e.href.split("#")[1], n = t.element_.querySelector("#" + i);
                t.resetTabState_(), t.resetPanelState_(), e.classList.add(t.CssClasses_.ACTIVE_CLASS), n.classList.add(t.CssClasses_.ACTIVE_CLASS)
            })
        }
    }

    function t(e, t, s, i) {
        function n() {
            var n = e.href.split("#")[1], a = i.content_.querySelector("#" + n);
            i.resetTabState_(t), i.resetPanelState_(s), e.classList.add(i.CssClasses_.IS_ACTIVE), a.classList.add(i.CssClasses_.IS_ACTIVE)
        }

        if (i.tabBar_.classList.contains(i.CssClasses_.JS_RIPPLE_EFFECT)) {
            var a = document.createElement("span");
            a.classList.add(i.CssClasses_.RIPPLE_CONTAINER), a.classList.add(i.CssClasses_.JS_RIPPLE_EFFECT);
            var l = document.createElement("span");
            l.classList.add(i.CssClasses_.RIPPLE), a.appendChild(l), e.appendChild(a)
        }
        e.addEventListener("click", function (t) {
            "#" === e.getAttribute("href").charAt(0) && (t.preventDefault(), n())
        }), e.show = n, e.addEventListener("click", function (n) {
            n.preventDefault();
            var a = e.href.split("#")[1], l = i.content_.querySelector("#" + a);
            i.resetTabState_(t), i.resetPanelState_(s), e.classList.add(i.CssClasses_.IS_ACTIVE), l.classList.add(i.CssClasses_.IS_ACTIVE)
        })
    }

    var s = {
        upgradeDom: function (e, t) {
        }, upgradeElement: function (e, t) {
        }, upgradeElements: function (e) {
        }, upgradeAllRegistered: function () {
        }, registerUpgradedCallback: function (e, t) {
        }, register: function (e) {
        }, downgradeElements: function (e) {
        }
    };
    s = function () {
        function e(e, t) {
            for (var s = 0; s < h.length; s++)if (h[s].className === e)return "undefined" != typeof t && (h[s] = t), h[s];
            return !1
        }

        function t(e) {
            var t = e.getAttribute("data-upgraded");
            return null === t ? [""] : t.split(",")
        }

        function s(e, s) {
            var i = t(e);
            return -1 !== i.indexOf(s)
        }

        function i(t, s) {
            if ("undefined" == typeof t && "undefined" == typeof s)for (var a = 0; a < h.length; a++)i(h[a].className, h[a].cssClass); else {
                var l = t;
                if ("undefined" == typeof s) {
                    var o = e(l);
                    o && (s = o.cssClass)
                }
                for (var r = document.querySelectorAll("." + s), _ = 0; _ < r.length; _++)n(r[_], l)
            }
        }

        function n(i, n) {
            if (!("object" == typeof i && i instanceof Element))throw new Error("Invalid argument provided to upgrade MDL element.");
            var a = t(i), l = [];
            if (n)s(i, n) || l.push(e(n)); else {
                var o = i.classList;
                h.forEach(function (e) {
                    o.contains(e.cssClass) && -1 === l.indexOf(e) && !s(i, e.className) && l.push(e)
                })
            }
            for (var r, _ = 0, d = l.length; d > _; _++) {
                if (r = l[_], !r)throw new Error("Unable to find a registered component for the given class.");
                a.push(r.className), i.setAttribute("data-upgraded", a.join(","));
                var C = new r.classConstructor(i);
                C[p] = r, c.push(C);
                for (var u = 0, E = r.callbacks.length; E > u; u++)r.callbacks[u](i);
                r.widget && (i[r.className] = C);
                var m = document.createEvent("Events");
                m.initEvent("mdl-componentupgraded", !0, !0), i.dispatchEvent(m)
            }
        }

        function a(e) {
            Array.isArray(e) || (e = "function" == typeof e.item ? Array.prototype.slice.call(e) : [e]);
            for (var t, s = 0, i = e.length; i > s; s++)t = e[s], t instanceof HTMLElement && (n(t), t.children.length > 0 && a(t.children))
        }

        function l(t) {
            var s = "undefined" == typeof t.widget && "undefined" == typeof t.widget, i = !0;
            s || (i = t.widget || t.widget);
            var n = {
                classConstructor: t.constructor || t.constructor,
                className: t.classAsString || t.classAsString,
                cssClass: t.cssClass || t.cssClass,
                widget: i,
                callbacks: []
            };
            if (h.forEach(function (e) {
                    if (e.cssClass === n.cssClass)throw new Error("The provided cssClass has already been registered: " + e.cssClass);
                    if (e.className === n.className)throw new Error("The provided className has already been registered")
                }), t.constructor.prototype.hasOwnProperty(p))throw new Error("MDL component classes must not have " + p + " defined as a property.");
            var a = e(t.classAsString, n);
            a || h.push(n)
        }

        function o(t, s) {
            var i = e(t);
            i && i.callbacks.push(s)
        }

        function r() {
            for (var e = 0; e < h.length; e++)i(h[e].className)
        }

        function _(e) {
            var t = c.indexOf(e);
            c.splice(t, 1);
            var s = e.element_.getAttribute("data-upgraded").split(","), i = s.indexOf(e[p].classAsString);
            s.splice(i, 1), e.element_.setAttribute("data-upgraded", s.join(","));
            var n = document.createEvent("Events");
            n.initEvent("mdl-componentdowngraded", !0, !0), e.element_.dispatchEvent(n)
        }

        function d(e) {
            var t = function (e) {
                c.filter(function (t) {
                    return t.element_ === e
                }).forEach(_)
            };
            if (e instanceof Array || e instanceof NodeList)for (var s = 0; s < e.length; s++)t(e[s]); else {
                if (!(e instanceof Node))throw new Error("Invalid argument provided to downgrade MDL nodes.");
                t(e)
            }
        }

        var h = [], c = [], p = "mdlComponentConfigInternal_";
        return {
            upgradeDom: i,
            upgradeElement: n,
            upgradeElements: a,
            upgradeAllRegistered: r,
            registerUpgradedCallback: o,
            register: l,
            downgradeElements: d
        }
    }(), s.ComponentConfigPublic, s.ComponentConfig, s.Component, s.upgradeDom = s.upgradeDom, s.upgradeElement = s.upgradeElement, s.upgradeElements = s.upgradeElements, s.upgradeAllRegistered = s.upgradeAllRegistered, s.registerUpgradedCallback = s.registerUpgradedCallback, s.register = s.register, s.downgradeElements = s.downgradeElements, window.componentHandler = s, window.componentHandler = s, window.addEventListener("load", function () {
        "classList" in document.createElement("div") && "querySelector" in document && "addEventListener" in window && Array.prototype.forEach ? (document.documentElement.classList.add("mdl-js"), s.upgradeAllRegistered()) : (s.upgradeElement = function () {
        }, s.register = function () {
        })
    }), Date.now || (Date.now = function () {
        return (new Date).getTime()
    }, Date.now = Date.now);
    for (var i = ["webkit", "moz"], n = 0; n < i.length && !window.requestAnimationFrame; ++n) {
        var a = i[n];
        window.requestAnimationFrame = window[a + "RequestAnimationFrame"], window.cancelAnimationFrame = window[a + "CancelAnimationFrame"] || window[a + "CancelRequestAnimationFrame"], window.requestAnimationFrame = window.requestAnimationFrame, window.cancelAnimationFrame = window.cancelAnimationFrame
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var l = 0;
        window.requestAnimationFrame = function (e) {
            var t = Date.now(), s = Math.max(l + 16, t);
            return setTimeout(function () {
                e(l = s)
            }, s - t)
        }, window.cancelAnimationFrame = clearTimeout, window.requestAnimationFrame = window.requestAnimationFrame, window.cancelAnimationFrame = window.cancelAnimationFrame
    }
    var o = function (e) {
        this.element_ = e, this.init()
    };
    window.MaterialButton = o, o.prototype.Constant_ = {}, o.prototype.CssClasses_ = {
        RIPPLE_EFFECT: "mdl-js-ripple-effect",
        RIPPLE_CONTAINER: "mdl-button__ripple-container",
        RIPPLE: "mdl-ripple"
    }, o.prototype.blurHandler_ = function (e) {
        e && this.element_.blur()
    }, o.prototype.disable = function () {
        this.element_.disabled = !0
    }, o.prototype.disable = o.prototype.disable, o.prototype.enable = function () {
        this.element_.disabled = !1
    }, o.prototype.enable = o.prototype.enable, o.prototype.init = function () {
        if (this.element_) {
            if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
                var e = document.createElement("span");
                e.classList.add(this.CssClasses_.RIPPLE_CONTAINER), this.rippleElement_ = document.createElement("span"), this.rippleElement_.classList.add(this.CssClasses_.RIPPLE), e.appendChild(this.rippleElement_), this.boundRippleBlurHandler = this.blurHandler_.bind(this), this.rippleElement_.addEventListener("mouseup", this.boundRippleBlurHandler), this.element_.appendChild(e)
            }
            this.boundButtonBlurHandler = this.blurHandler_.bind(this), this.element_.addEventListener("mouseup", this.boundButtonBlurHandler), this.element_.addEventListener("mouseleave", this.boundButtonBlurHandler)
        }
    }, s.register({constructor: o, classAsString: "MaterialButton", cssClass: "mdl-js-button", widget: !0});
    var r = function (e) {
        this.element_ = e, this.init()
    };
    window.MaterialCheckbox = r, r.prototype.Constant_ = {TINY_TIMEOUT: .001}, r.prototype.CssClasses_ = {
        INPUT: "mdl-checkbox__input",
        BOX_OUTLINE: "mdl-checkbox__box-outline",
        FOCUS_HELPER: "mdl-checkbox__focus-helper",
        TICK_OUTLINE: "mdl-checkbox__tick-outline",
        RIPPLE_EFFECT: "mdl-js-ripple-effect",
        RIPPLE_IGNORE_EVENTS: "mdl-js-ripple-effect--ignore-events",
        RIPPLE_CONTAINER: "mdl-checkbox__ripple-container",
        RIPPLE_CENTER: "mdl-ripple--center",
        RIPPLE: "mdl-ripple",
        IS_FOCUSED: "is-focused",
        IS_DISABLED: "is-disabled",
        IS_CHECKED: "is-checked",
        IS_UPGRADED: "is-upgraded"
    }, r.prototype.onChange_ = function (e) {
        this.updateClasses_()
    }, r.prototype.onFocus_ = function (e) {
        this.element_.classList.add(this.CssClasses_.IS_FOCUSED)
    }, r.prototype.onBlur_ = function (e) {
        this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)
    }, r.prototype.onMouseUp_ = function (e) {
        this.blur_()
    }, r.prototype.updateClasses_ = function () {
        this.checkDisabled(), this.checkToggleState()
    }, r.prototype.blur_ = function () {
        window.setTimeout(function () {
            this.inputElement_.blur()
        }.bind(this), this.Constant_.TINY_TIMEOUT)
    }, r.prototype.checkToggleState = function () {
        this.inputElement_.checked ? this.element_.classList.add(this.CssClasses_.IS_CHECKED) : this.element_.classList.remove(this.CssClasses_.IS_CHECKED)
    }, r.prototype.checkToggleState = r.prototype.checkToggleState, r.prototype.checkDisabled = function () {
        this.inputElement_.disabled ? this.element_.classList.add(this.CssClasses_.IS_DISABLED) : this.element_.classList.remove(this.CssClasses_.IS_DISABLED)
    }, r.prototype.checkDisabled = r.prototype.checkDisabled, r.prototype.disable = function () {
        this.inputElement_.disabled = !0, this.updateClasses_()
    }, r.prototype.disable = r.prototype.disable, r.prototype.enable = function () {
        this.inputElement_.disabled = !1, this.updateClasses_()
    }, r.prototype.enable = r.prototype.enable, r.prototype.check = function () {
        this.inputElement_.checked = !0, this.updateClasses_()
    }, r.prototype.check = r.prototype.check, r.prototype.uncheck = function () {
        this.inputElement_.checked = !1, this.updateClasses_()
    }, r.prototype.uncheck = r.prototype.uncheck, r.prototype.init = function () {
        if (this.element_) {
            this.inputElement_ = this.element_.querySelector("." + this.CssClasses_.INPUT);
            var e = document.createElement("span");
            e.classList.add(this.CssClasses_.BOX_OUTLINE);
            var t = document.createElement("span");
            t.classList.add(this.CssClasses_.FOCUS_HELPER);
            var s = document.createElement("span");
            if (s.classList.add(this.CssClasses_.TICK_OUTLINE), e.appendChild(s), this.element_.appendChild(t), this.element_.appendChild(e), this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
                this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS), this.rippleContainerElement_ = document.createElement("span"), this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER), this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_EFFECT), this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER), this.boundRippleMouseUp = this.onMouseUp_.bind(this), this.rippleContainerElement_.addEventListener("mouseup", this.boundRippleMouseUp);
                var i = document.createElement("span");
                i.classList.add(this.CssClasses_.RIPPLE), this.rippleContainerElement_.appendChild(i), this.element_.appendChild(this.rippleContainerElement_)
            }
            this.boundInputOnChange = this.onChange_.bind(this), this.boundInputOnFocus = this.onFocus_.bind(this), this.boundInputOnBlur = this.onBlur_.bind(this), this.boundElementMouseUp = this.onMouseUp_.bind(this), this.inputElement_.addEventListener("change", this.boundInputOnChange), this.inputElement_.addEventListener("focus", this.boundInputOnFocus), this.inputElement_.addEventListener("blur", this.boundInputOnBlur), this.element_.addEventListener("mouseup", this.boundElementMouseUp), this.updateClasses_(), this.element_.classList.add(this.CssClasses_.IS_UPGRADED)
        }
    }, s.register({constructor: r, classAsString: "MaterialCheckbox", cssClass: "mdl-js-checkbox", widget: !0});
    var _ = function (e) {
        this.element_ = e, this.init()
    };
    window.MaterialIconToggle = _, _.prototype.Constant_ = {TINY_TIMEOUT: .001}, _.prototype.CssClasses_ = {
        INPUT: "mdl-icon-toggle__input",
        JS_RIPPLE_EFFECT: "mdl-js-ripple-effect",
        RIPPLE_IGNORE_EVENTS: "mdl-js-ripple-effect--ignore-events",
        RIPPLE_CONTAINER: "mdl-icon-toggle__ripple-container",
        RIPPLE_CENTER: "mdl-ripple--center",
        RIPPLE: "mdl-ripple",
        IS_FOCUSED: "is-focused",
        IS_DISABLED: "is-disabled",
        IS_CHECKED: "is-checked"
    }, _.prototype.onChange_ = function (e) {
        this.updateClasses_()
    }, _.prototype.onFocus_ = function (e) {
        this.element_.classList.add(this.CssClasses_.IS_FOCUSED)
    }, _.prototype.onBlur_ = function (e) {
        this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)
    }, _.prototype.onMouseUp_ = function (e) {
        this.blur_()
    }, _.prototype.updateClasses_ = function () {
        this.checkDisabled(), this.checkToggleState()
    }, _.prototype.blur_ = function () {
        window.setTimeout(function () {
            this.inputElement_.blur()
        }.bind(this), this.Constant_.TINY_TIMEOUT)
    }, _.prototype.checkToggleState = function () {
        this.inputElement_.checked ? this.element_.classList.add(this.CssClasses_.IS_CHECKED) : this.element_.classList.remove(this.CssClasses_.IS_CHECKED)
    }, _.prototype.checkToggleState = _.prototype.checkToggleState, _.prototype.checkDisabled = function () {
        this.inputElement_.disabled ? this.element_.classList.add(this.CssClasses_.IS_DISABLED) : this.element_.classList.remove(this.CssClasses_.IS_DISABLED)
    }, _.prototype.checkDisabled = _.prototype.checkDisabled, _.prototype.disable = function () {
        this.inputElement_.disabled = !0, this.updateClasses_()
    }, _.prototype.disable = _.prototype.disable, _.prototype.enable = function () {
        this.inputElement_.disabled = !1, this.updateClasses_()
    }, _.prototype.enable = _.prototype.enable, _.prototype.check = function () {
        this.inputElement_.checked = !0, this.updateClasses_()
    }, _.prototype.check = _.prototype.check, _.prototype.uncheck = function () {
        this.inputElement_.checked = !1, this.updateClasses_()
    }, _.prototype.uncheck = _.prototype.uncheck, _.prototype.init = function () {
        if (this.element_) {
            if (this.inputElement_ = this.element_.querySelector("." + this.CssClasses_.INPUT), this.element_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)) {
                this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS), this.rippleContainerElement_ = document.createElement("span"), this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER), this.rippleContainerElement_.classList.add(this.CssClasses_.JS_RIPPLE_EFFECT), this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER), this.boundRippleMouseUp = this.onMouseUp_.bind(this), this.rippleContainerElement_.addEventListener("mouseup", this.boundRippleMouseUp);
                var e = document.createElement("span");
                e.classList.add(this.CssClasses_.RIPPLE), this.rippleContainerElement_.appendChild(e), this.element_.appendChild(this.rippleContainerElement_)
            }
            this.boundInputOnChange = this.onChange_.bind(this), this.boundInputOnFocus = this.onFocus_.bind(this), this.boundInputOnBlur = this.onBlur_.bind(this), this.boundElementOnMouseUp = this.onMouseUp_.bind(this), this.inputElement_.addEventListener("change", this.boundInputOnChange), this.inputElement_.addEventListener("focus", this.boundInputOnFocus), this.inputElement_.addEventListener("blur", this.boundInputOnBlur), this.element_.addEventListener("mouseup", this.boundElementOnMouseUp), this.updateClasses_(), this.element_.classList.add("is-upgraded")
        }
    }, s.register({constructor: _, classAsString: "MaterialIconToggle", cssClass: "mdl-js-icon-toggle", widget: !0});
    var d = function (e) {
        this.element_ = e, this.init()
    };
    window.MaterialMenu = d, d.prototype.Constant_ = {
        TRANSITION_DURATION_SECONDS: .3,
        TRANSITION_DURATION_FRACTION: .8,
        CLOSE_TIMEOUT: 150
    }, d.prototype.Keycodes_ = {
        ENTER: 13,
        ESCAPE: 27,
        SPACE: 32,
        UP_ARROW: 38,
        DOWN_ARROW: 40
    }, d.prototype.CssClasses_ = {
        CONTAINER: "mdl-menu__container",
        OUTLINE: "mdl-menu__outline",
        ITEM: "mdl-menu__item",
        ITEM_RIPPLE_CONTAINER: "mdl-menu__item-ripple-container",
        RIPPLE_EFFECT: "mdl-js-ripple-effect",
        RIPPLE_IGNORE_EVENTS: "mdl-js-ripple-effect--ignore-events",
        RIPPLE: "mdl-ripple",
        IS_UPGRADED: "is-upgraded",
        IS_VISIBLE: "is-visible",
        IS_ANIMATING: "is-animating",
        BOTTOM_LEFT: "mdl-menu--bottom-left",
        BOTTOM_RIGHT: "mdl-menu--bottom-right",
        TOP_LEFT: "mdl-menu--top-left",
        TOP_RIGHT: "mdl-menu--top-right",
        UNALIGNED: "mdl-menu--unaligned"
    }, d.prototype.init = function () {
        if (this.element_) {
            var e = document.createElement("div");
            e.classList.add(this.CssClasses_.CONTAINER), this.element_.parentElement.insertBefore(e, this.element_), this.element_.parentElement.removeChild(this.element_), e.appendChild(this.element_), this.container_ = e;
            var t = document.createElement("div");
            t.classList.add(this.CssClasses_.OUTLINE), this.outline_ = t, e.insertBefore(t, this.element_);
            var s = this.element_.getAttribute("for") || this.element_.getAttribute("data-mdl-for"), i = null;
            s && (i = document.getElementById(s), i && (this.forElement_ = i, i.addEventListener("click", this.handleForClick_.bind(this)), i.addEventListener("keydown", this.handleForKeyboardEvent_.bind(this))));
            var n = this.element_.querySelectorAll("." + this.CssClasses_.ITEM);
            this.boundItemKeydown_ = this.handleItemKeyboardEvent_.bind(this), this.boundItemClick_ = this.handleItemClick_.bind(this);
            for (var a = 0; a < n.length; a++)n[a].addEventListener("click", this.boundItemClick_), n[a].tabIndex = "-1", n[a].addEventListener("keydown", this.boundItemKeydown_);
            if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT))for (this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS), a = 0; a < n.length; a++) {
                var l = n[a], o = document.createElement("span");
                o.classList.add(this.CssClasses_.ITEM_RIPPLE_CONTAINER);
                var r = document.createElement("span");
                r.classList.add(this.CssClasses_.RIPPLE), o.appendChild(r), l.appendChild(o), l.classList.add(this.CssClasses_.RIPPLE_EFFECT)
            }
            this.element_.classList.contains(this.CssClasses_.BOTTOM_LEFT) && this.outline_.classList.add(this.CssClasses_.BOTTOM_LEFT), this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT) && this.outline_.classList.add(this.CssClasses_.BOTTOM_RIGHT), this.element_.classList.contains(this.CssClasses_.TOP_LEFT) && this.outline_.classList.add(this.CssClasses_.TOP_LEFT), this.element_.classList.contains(this.CssClasses_.TOP_RIGHT) && this.outline_.classList.add(this.CssClasses_.TOP_RIGHT), this.element_.classList.contains(this.CssClasses_.UNALIGNED) && this.outline_.classList.add(this.CssClasses_.UNALIGNED), e.classList.add(this.CssClasses_.IS_UPGRADED)
        }
    }, d.prototype.handleForClick_ = function (e) {
        if (this.element_ && this.forElement_) {
            var t = this.forElement_.getBoundingClientRect(), s = this.forElement_.parentElement.getBoundingClientRect();
            this.element_.classList.contains(this.CssClasses_.UNALIGNED) || (this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT) ? (this.container_.style.right = s.right - t.right + "px", this.container_.style.top = this.forElement_.offsetTop + this.forElement_.offsetHeight + "px") : this.element_.classList.contains(this.CssClasses_.TOP_LEFT) ? (this.container_.style.left = this.forElement_.offsetLeft + "px", this.container_.style.bottom = s.bottom - t.top + "px") : this.element_.classList.contains(this.CssClasses_.TOP_RIGHT) ? (this.container_.style.right = s.right - t.right + "px", this.container_.style.bottom = s.bottom - t.top + "px") : (this.container_.style.left = this.forElement_.offsetLeft + "px", this.container_.style.top = this.forElement_.offsetTop + this.forElement_.offsetHeight + "px"))
        }
        this.toggle(e)
    }, d.prototype.handleForKeyboardEvent_ = function (e) {
        if (this.element_ && this.container_ && this.forElement_) {
            var t = this.element_.querySelectorAll("." + this.CssClasses_.ITEM + ":not([disabled])");
            t && t.length > 0 && this.container_.classList.contains(this.CssClasses_.IS_VISIBLE) && (e.keyCode === this.Keycodes_.UP_ARROW ? (e.preventDefault(), t[t.length - 1].focus()) : e.keyCode === this.Keycodes_.DOWN_ARROW && (e.preventDefault(), t[0].focus()))
        }
    }, d.prototype.handleItemKeyboardEvent_ = function (e) {
        if (this.element_ && this.container_) {
            var t = this.element_.querySelectorAll("." + this.CssClasses_.ITEM + ":not([disabled])");
            if (t && t.length > 0 && this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
                var s = Array.prototype.slice.call(t).indexOf(e.target);
                if (e.keyCode === this.Keycodes_.UP_ARROW)e.preventDefault(), s > 0 ? t[s - 1].focus() : t[t.length - 1].focus(); else if (e.keyCode === this.Keycodes_.DOWN_ARROW)e.preventDefault(), t.length > s + 1 ? t[s + 1].focus() : t[0].focus(); else if (e.keyCode === this.Keycodes_.SPACE || e.keyCode === this.Keycodes_.ENTER) {
                    e.preventDefault();
                    var i = new MouseEvent("mousedown");
                    e.target.dispatchEvent(i), i = new MouseEvent("mouseup"), e.target.dispatchEvent(i), e.target.click()
                } else e.keyCode === this.Keycodes_.ESCAPE && (e.preventDefault(), this.hide())
            }
        }
    }, d.prototype.handleItemClick_ = function (e) {
        e.target.hasAttribute("disabled") ? e.stopPropagation() : (this.closing_ = !0, window.setTimeout(function (e) {
            this.hide(), this.closing_ = !1
        }.bind(this), this.Constant_.CLOSE_TIMEOUT))
    }, d.prototype.applyClip_ = function (e, t) {
        this.element_.classList.contains(this.CssClasses_.UNALIGNED) ? this.element_.style.clip = "" : this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT) ? this.element_.style.clip = "rect(0 " + t + "px 0 " + t + "px)" : this.element_.classList.contains(this.CssClasses_.TOP_LEFT) ? this.element_.style.clip = "rect(" + e + "px 0 " + e + "px 0)" : this.element_.classList.contains(this.CssClasses_.TOP_RIGHT) ? this.element_.style.clip = "rect(" + e + "px " + t + "px " + e + "px " + t + "px)" : this.element_.style.clip = ""
    }, d.prototype.removeAnimationEndListener_ = function (e) {
        e.target.classList.remove(d.prototype.CssClasses_.IS_ANIMATING)
    }, d.prototype.addAnimationEndListener_ = function () {
        this.element_.addEventListener("transitionend", this.removeAnimationEndListener_), this.element_.addEventListener("webkitTransitionEnd", this.removeAnimationEndListener_)
    }, d.prototype.show = function (e) {
        if (this.element_ && this.container_ && this.outline_) {
            var t = this.element_.getBoundingClientRect().height, s = this.element_.getBoundingClientRect().width;
            this.container_.style.width = s + "px", this.container_.style.height = t + "px", this.outline_.style.width = s + "px", this.outline_.style.height = t + "px";
            for (var i = this.Constant_.TRANSITION_DURATION_SECONDS * this.Constant_.TRANSITION_DURATION_FRACTION, n = this.element_.querySelectorAll("." + this.CssClasses_.ITEM), a = 0; a < n.length; a++) {
                var l = null;
                l = this.element_.classList.contains(this.CssClasses_.TOP_LEFT) || this.element_.classList.contains(this.CssClasses_.TOP_RIGHT) ? (t - n[a].offsetTop - n[a].offsetHeight) / t * i + "s" : n[a].offsetTop / t * i + "s", n[a].style.transitionDelay = l
            }
            this.applyClip_(t, s), window.requestAnimationFrame(function () {
                this.element_.classList.add(this.CssClasses_.IS_ANIMATING), this.element_.style.clip = "rect(0 " + s + "px " + t + "px 0)", this.container_.classList.add(this.CssClasses_.IS_VISIBLE)
            }.bind(this)), this.addAnimationEndListener_();
            var o = function (t) {
                t === e || this.closing_ || t.target.parentNode === this.element_ || (document.removeEventListener("click", o), this.hide())
            }.bind(this);
            document.addEventListener("click", o)
        }
    }, d.prototype.show = d.prototype.show, d.prototype.hide = function () {
        if (this.element_ && this.container_ && this.outline_) {
            for (var e = this.element_.querySelectorAll("." + this.CssClasses_.ITEM), t = 0; t < e.length; t++)e[t].style.removeProperty("transition-delay");
            var s = this.element_.getBoundingClientRect(), i = s.height, n = s.width;
            this.element_.classList.add(this.CssClasses_.IS_ANIMATING), this.applyClip_(i, n), this.container_.classList.remove(this.CssClasses_.IS_VISIBLE), this.addAnimationEndListener_()
        }
    }, d.prototype.hide = d.prototype.hide, d.prototype.toggle = function (e) {
        this.container_.classList.contains(this.CssClasses_.IS_VISIBLE) ? this.hide() : this.show(e)
    }, d.prototype.toggle = d.prototype.toggle, s.register({
        constructor: d,
        classAsString: "MaterialMenu",
        cssClass: "mdl-js-menu",
        widget: !0
    });
    var h = function (e) {
        this.element_ = e, this.init()
    };
    window.MaterialProgress = h, h.prototype.Constant_ = {}, h.prototype.CssClasses_ = {INDETERMINATE_CLASS: "mdl-progress__indeterminate"}, h.prototype.setProgress = function (e) {
        this.element_.classList.contains(this.CssClasses_.INDETERMINATE_CLASS) || (this.progressbar_.style.width = e + "%")
    }, h.prototype.setProgress = h.prototype.setProgress, h.prototype.setBuffer = function (e) {
        this.bufferbar_.style.width = e + "%", this.auxbar_.style.width = 100 - e + "%"
    }, h.prototype.setBuffer = h.prototype.setBuffer, h.prototype.init = function () {
        if (this.element_) {
            var e = document.createElement("div");
            e.className = "progressbar bar bar1", this.element_.appendChild(e), this.progressbar_ = e, e = document.createElement("div"), e.className = "bufferbar bar bar2", this.element_.appendChild(e), this.bufferbar_ = e, e = document.createElement("div"), e.className = "auxbar bar bar3", this.element_.appendChild(e), this.auxbar_ = e, this.progressbar_.style.width = "0%", this.bufferbar_.style.width = "100%", this.auxbar_.style.width = "0%", this.element_.classList.add("is-upgraded")
        }
    }, s.register({constructor: h, classAsString: "MaterialProgress", cssClass: "mdl-js-progress", widget: !0});
    var c = function (e) {
        this.element_ = e, this.init()
    };
    window.MaterialRadio = c, c.prototype.Constant_ = {TINY_TIMEOUT: .001}, c.prototype.CssClasses_ = {
        IS_FOCUSED: "is-focused",
        IS_DISABLED: "is-disabled",
        IS_CHECKED: "is-checked",
        IS_UPGRADED: "is-upgraded",
        JS_RADIO: "mdl-js-radio",
        RADIO_BTN: "mdl-radio__button",
        RADIO_OUTER_CIRCLE: "mdl-radio__outer-circle",
        RADIO_INNER_CIRCLE: "mdl-radio__inner-circle",
        RIPPLE_EFFECT: "mdl-js-ripple-effect",
        RIPPLE_IGNORE_EVENTS: "mdl-js-ripple-effect--ignore-events",
        RIPPLE_CONTAINER: "mdl-radio__ripple-container",
        RIPPLE_CENTER: "mdl-ripple--center",
        RIPPLE: "mdl-ripple"
    }, c.prototype.onChange_ = function (e) {
        for (var t = document.getElementsByClassName(this.CssClasses_.JS_RADIO), s = 0; s < t.length; s++) {
            var i = t[s].querySelector("." + this.CssClasses_.RADIO_BTN);
            i.getAttribute("name") === this.btnElement_.getAttribute("name") && t[s].MaterialRadio.updateClasses_()
        }
    }, c.prototype.onFocus_ = function (e) {
        this.element_.classList.add(this.CssClasses_.IS_FOCUSED)
    }, c.prototype.onBlur_ = function (e) {
        this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)
    }, c.prototype.onMouseup_ = function (e) {
        this.blur_()
    }, c.prototype.updateClasses_ = function () {
        this.checkDisabled(), this.checkToggleState()
    }, c.prototype.blur_ = function () {
        window.setTimeout(function () {
            this.btnElement_.blur()
        }.bind(this), this.Constant_.TINY_TIMEOUT)
    }, c.prototype.checkDisabled = function () {
        this.btnElement_.disabled ? this.element_.classList.add(this.CssClasses_.IS_DISABLED) : this.element_.classList.remove(this.CssClasses_.IS_DISABLED)
    }, c.prototype.checkDisabled = c.prototype.checkDisabled, c.prototype.checkToggleState = function () {
        this.btnElement_.checked ? this.element_.classList.add(this.CssClasses_.IS_CHECKED) : this.element_.classList.remove(this.CssClasses_.IS_CHECKED)
    }, c.prototype.checkToggleState = c.prototype.checkToggleState, c.prototype.disable = function () {
        this.btnElement_.disabled = !0, this.updateClasses_()
    }, c.prototype.disable = c.prototype.disable, c.prototype.enable = function () {
        this.btnElement_.disabled = !1, this.updateClasses_()
    }, c.prototype.enable = c.prototype.enable, c.prototype.check = function () {
        this.btnElement_.checked = !0, this.updateClasses_()
    }, c.prototype.check = c.prototype.check, c.prototype.uncheck = function () {
        this.btnElement_.checked = !1, this.updateClasses_()
    }, c.prototype.uncheck = c.prototype.uncheck, c.prototype.init = function () {
        if (this.element_) {
            this.btnElement_ = this.element_.querySelector("." + this.CssClasses_.RADIO_BTN), this.boundChangeHandler_ = this.onChange_.bind(this), this.boundFocusHandler_ = this.onChange_.bind(this), this.boundBlurHandler_ = this.onBlur_.bind(this), this.boundMouseUpHandler_ = this.onMouseup_.bind(this);
            var e = document.createElement("span");
            e.classList.add(this.CssClasses_.RADIO_OUTER_CIRCLE);
            var t = document.createElement("span");
            t.classList.add(this.CssClasses_.RADIO_INNER_CIRCLE), this.element_.appendChild(e), this.element_.appendChild(t);
            var s;
            if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
                this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS), s = document.createElement("span"), s.classList.add(this.CssClasses_.RIPPLE_CONTAINER), s.classList.add(this.CssClasses_.RIPPLE_EFFECT), s.classList.add(this.CssClasses_.RIPPLE_CENTER), s.addEventListener("mouseup", this.boundMouseUpHandler_);
                var i = document.createElement("span");
                i.classList.add(this.CssClasses_.RIPPLE), s.appendChild(i), this.element_.appendChild(s)
            }
            this.btnElement_.addEventListener("change", this.boundChangeHandler_), this.btnElement_.addEventListener("focus", this.boundFocusHandler_), this.btnElement_.addEventListener("blur", this.boundBlurHandler_), this.element_.addEventListener("mouseup", this.boundMouseUpHandler_), this.updateClasses_(), this.element_.classList.add(this.CssClasses_.IS_UPGRADED)
        }
    }, s.register({constructor: c, classAsString: "MaterialRadio", cssClass: "mdl-js-radio", widget: !0});
    var p = function (e) {
        this.element_ = e, this.isIE_ = window.navigator.msPointerEnabled, this.init()
    };
    window.MaterialSlider = p, p.prototype.Constant_ = {}, p.prototype.CssClasses_ = {
        IE_CONTAINER: "mdl-slider__ie-container",
        SLIDER_CONTAINER: "mdl-slider__container",
        BACKGROUND_FLEX: "mdl-slider__background-flex",
        BACKGROUND_LOWER: "mdl-slider__background-lower",
        BACKGROUND_UPPER: "mdl-slider__background-upper",
        IS_LOWEST_VALUE: "is-lowest-value",
        IS_UPGRADED: "is-upgraded"
    }, p.prototype.onInput_ = function (e) {
        this.updateValueStyles_()
    }, p.prototype.onChange_ = function (e) {
        this.updateValueStyles_()
    }, p.prototype.onMouseUp_ = function (e) {
        e.target.blur()
    }, p.prototype.onContainerMouseDown_ = function (e) {
        if (e.target === this.element_.parentElement) {
            e.preventDefault();
            var t = new MouseEvent("mousedown", {
                target: e.target,
                buttons: e.buttons,
                clientX: e.clientX,
                clientY: this.element_.getBoundingClientRect().y
            });
            this.element_.dispatchEvent(t)
        }
    }, p.prototype.updateValueStyles_ = function () {
        var e = (this.element_.value - this.element_.min) / (this.element_.max - this.element_.min);
        0 === e ? this.element_.classList.add(this.CssClasses_.IS_LOWEST_VALUE) : this.element_.classList.remove(this.CssClasses_.IS_LOWEST_VALUE), this.isIE_ || (this.backgroundLower_.style.flex = e, this.backgroundLower_.style.webkitFlex = e, this.backgroundUpper_.style.flex = 1 - e, this.backgroundUpper_.style.webkitFlex = 1 - e)
    }, p.prototype.disable = function () {
        this.element_.disabled = !0
    }, p.prototype.disable = p.prototype.disable, p.prototype.enable = function () {
        this.element_.disabled = !1
    }, p.prototype.enable = p.prototype.enable, p.prototype.change = function (e) {
        "undefined" != typeof e && (this.element_.value = e), this.updateValueStyles_()
    }, p.prototype.change = p.prototype.change, p.prototype.init = function () {
        if (this.element_) {
            if (this.isIE_) {
                var e = document.createElement("div");
                e.classList.add(this.CssClasses_.IE_CONTAINER), this.element_.parentElement.insertBefore(e, this.element_), this.element_.parentElement.removeChild(this.element_), e.appendChild(this.element_)
            } else {
                var t = document.createElement("div");
                t.classList.add(this.CssClasses_.SLIDER_CONTAINER), this.element_.parentElement.insertBefore(t, this.element_), this.element_.parentElement.removeChild(this.element_), t.appendChild(this.element_);
                var s = document.createElement("div");
                s.classList.add(this.CssClasses_.BACKGROUND_FLEX), t.appendChild(s), this.backgroundLower_ = document.createElement("div"), this.backgroundLower_.classList.add(this.CssClasses_.BACKGROUND_LOWER), s.appendChild(this.backgroundLower_), this.backgroundUpper_ = document.createElement("div"), this.backgroundUpper_.classList.add(this.CssClasses_.BACKGROUND_UPPER), s.appendChild(this.backgroundUpper_)
            }
            this.boundInputHandler = this.onInput_.bind(this), this.boundChangeHandler = this.onChange_.bind(this), this.boundMouseUpHandler = this.onMouseUp_.bind(this), this.boundContainerMouseDownHandler = this.onContainerMouseDown_.bind(this), this.element_.addEventListener("input", this.boundInputHandler), this.element_.addEventListener("change", this.boundChangeHandler),
                this.element_.addEventListener("mouseup", this.boundMouseUpHandler), this.element_.parentElement.addEventListener("mousedown", this.boundContainerMouseDownHandler), this.updateValueStyles_(), this.element_.classList.add(this.CssClasses_.IS_UPGRADED)
        }
    }, s.register({constructor: p, classAsString: "MaterialSlider", cssClass: "mdl-js-slider", widget: !0});
    var C = function (e) {
        if (this.element_ = e, this.textElement_ = this.element_.querySelector("." + this.cssClasses_.MESSAGE), this.actionElement_ = this.element_.querySelector("." + this.cssClasses_.ACTION), !this.textElement_)throw new Error("There must be a message element for a snackbar.");
        if (!this.actionElement_)throw new Error("There must be an action element for a snackbar.");
        this.active = !1, this.actionHandler_ = void 0, this.message_ = void 0, this.actionText_ = void 0, this.queuedNotifications_ = [], this.setActionHidden_(!0)
    };
    window.MaterialSnackbar = C, C.prototype.Constant_ = {ANIMATION_LENGTH: 250}, C.prototype.cssClasses_ = {
        SNACKBAR: "mdl-snackbar",
        MESSAGE: "mdl-snackbar__text",
        ACTION: "mdl-snackbar__action",
        ACTIVE: "mdl-snackbar--active"
    }, C.prototype.displaySnackbar_ = function () {
        this.element_.setAttribute("aria-hidden", "true"), this.actionHandler_ && (this.actionElement_.textContent = this.actionText_, this.actionElement_.addEventListener("click", this.actionHandler_), this.setActionHidden_(!1)), this.textElement_.textContent = this.message_, this.element_.classList.add(this.cssClasses_.ACTIVE), this.element_.setAttribute("aria-hidden", "false"), setTimeout(this.cleanup_.bind(this), this.timeout_)
    }, C.prototype.showSnackbar = function (e) {
        if (void 0 === e)throw new Error("Please provide a data object with at least a message to display.");
        if (void 0 === e.message)throw new Error("Please provide a message to be displayed.");
        if (e.actionHandler && !e.actionText)throw new Error("Please provide action text with the handler.");
        this.active ? this.queuedNotifications_.push(e) : (this.active = !0, this.message_ = e.message, e.timeout ? this.timeout_ = e.timeout : this.timeout_ = 2750, e.actionHandler && (this.actionHandler_ = e.actionHandler), e.actionText && (this.actionText_ = e.actionText), this.displaySnackbar_())
    }, C.prototype.showSnackbar = C.prototype.showSnackbar, C.prototype.checkQueue_ = function () {
        this.queuedNotifications_.length > 0 && this.showSnackbar(this.queuedNotifications_.shift())
    }, C.prototype.cleanup_ = function () {
        this.element_.classList.remove(this.cssClasses_.ACTIVE), setTimeout(function () {
            this.element_.setAttribute("aria-hidden", "true"), this.textElement_.textContent = "", Boolean(this.actionElement_.getAttribute("aria-hidden")) || (this.setActionHidden_(!0), this.actionElement_.textContent = "", this.actionElement_.removeEventListener("click", this.actionHandler_)), this.actionHandler_ = void 0, this.message_ = void 0, this.actionText_ = void 0, this.active = !1, this.checkQueue_()
        }.bind(this), this.Constant_.ANIMATION_LENGTH)
    }, C.prototype.setActionHidden_ = function (e) {
        e ? this.actionElement_.setAttribute("aria-hidden", "true") : this.actionElement_.removeAttribute("aria-hidden")
    }, s.register({constructor: C, classAsString: "MaterialSnackbar", cssClass: "mdl-js-snackbar", widget: !0});
    var u = function (e) {
        this.element_ = e, this.init()
    };
    window.MaterialSpinner = u, u.prototype.Constant_ = {MDL_SPINNER_LAYER_COUNT: 4}, u.prototype.CssClasses_ = {
        MDL_SPINNER_LAYER: "mdl-spinner__layer",
        MDL_SPINNER_CIRCLE_CLIPPER: "mdl-spinner__circle-clipper",
        MDL_SPINNER_CIRCLE: "mdl-spinner__circle",
        MDL_SPINNER_GAP_PATCH: "mdl-spinner__gap-patch",
        MDL_SPINNER_LEFT: "mdl-spinner__left",
        MDL_SPINNER_RIGHT: "mdl-spinner__right"
    }, u.prototype.createLayer = function (e) {
        var t = document.createElement("div");
        t.classList.add(this.CssClasses_.MDL_SPINNER_LAYER), t.classList.add(this.CssClasses_.MDL_SPINNER_LAYER + "-" + e);
        var s = document.createElement("div");
        s.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER), s.classList.add(this.CssClasses_.MDL_SPINNER_LEFT);
        var i = document.createElement("div");
        i.classList.add(this.CssClasses_.MDL_SPINNER_GAP_PATCH);
        var n = document.createElement("div");
        n.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER), n.classList.add(this.CssClasses_.MDL_SPINNER_RIGHT);
        for (var a = [s, i, n], l = 0; l < a.length; l++) {
            var o = document.createElement("div");
            o.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE), a[l].appendChild(o)
        }
        t.appendChild(s), t.appendChild(i), t.appendChild(n), this.element_.appendChild(t)
    }, u.prototype.createLayer = u.prototype.createLayer, u.prototype.stop = function () {
        this.element_.classList.remove("is-active")
    }, u.prototype.stop = u.prototype.stop, u.prototype.start = function () {
        this.element_.classList.add("is-active")
    }, u.prototype.start = u.prototype.start, u.prototype.init = function () {
        if (this.element_) {
            for (var e = 1; e <= this.Constant_.MDL_SPINNER_LAYER_COUNT; e++)this.createLayer(e);
            this.element_.classList.add("is-upgraded")
        }
    }, s.register({constructor: u, classAsString: "MaterialSpinner", cssClass: "mdl-js-spinner", widget: !0});
    var E = function (e) {
        this.element_ = e, this.init()
    };
    window.MaterialSwitch = E, E.prototype.Constant_ = {TINY_TIMEOUT: .001}, E.prototype.CssClasses_ = {
        INPUT: "mdl-switch__input",
        TRACK: "mdl-switch__track",
        THUMB: "mdl-switch__thumb",
        FOCUS_HELPER: "mdl-switch__focus-helper",
        RIPPLE_EFFECT: "mdl-js-ripple-effect",
        RIPPLE_IGNORE_EVENTS: "mdl-js-ripple-effect--ignore-events",
        RIPPLE_CONTAINER: "mdl-switch__ripple-container",
        RIPPLE_CENTER: "mdl-ripple--center",
        RIPPLE: "mdl-ripple",
        IS_FOCUSED: "is-focused",
        IS_DISABLED: "is-disabled",
        IS_CHECKED: "is-checked"
    }, E.prototype.onChange_ = function (e) {
        this.updateClasses_()
    }, E.prototype.onFocus_ = function (e) {
        this.element_.classList.add(this.CssClasses_.IS_FOCUSED)
    }, E.prototype.onBlur_ = function (e) {
        this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)
    }, E.prototype.onMouseUp_ = function (e) {
        this.blur_()
    }, E.prototype.updateClasses_ = function () {
        this.checkDisabled(), this.checkToggleState()
    }, E.prototype.blur_ = function () {
        window.setTimeout(function () {
            this.inputElement_.blur()
        }.bind(this), this.Constant_.TINY_TIMEOUT)
    }, E.prototype.checkDisabled = function () {
        this.inputElement_.disabled ? this.element_.classList.add(this.CssClasses_.IS_DISABLED) : this.element_.classList.remove(this.CssClasses_.IS_DISABLED)
    }, E.prototype.checkDisabled = E.prototype.checkDisabled, E.prototype.checkToggleState = function () {
        this.inputElement_.checked ? this.element_.classList.add(this.CssClasses_.IS_CHECKED) : this.element_.classList.remove(this.CssClasses_.IS_CHECKED)
    }, E.prototype.checkToggleState = E.prototype.checkToggleState, E.prototype.disable = function () {
        this.inputElement_.disabled = !0, this.updateClasses_()
    }, E.prototype.disable = E.prototype.disable, E.prototype.enable = function () {
        this.inputElement_.disabled = !1, this.updateClasses_()
    }, E.prototype.enable = E.prototype.enable, E.prototype.on = function () {
        this.inputElement_.checked = !0, this.updateClasses_()
    }, E.prototype.on = E.prototype.on, E.prototype.off = function () {
        this.inputElement_.checked = !1, this.updateClasses_()
    }, E.prototype.off = E.prototype.off, E.prototype.init = function () {
        if (this.element_) {
            this.inputElement_ = this.element_.querySelector("." + this.CssClasses_.INPUT);
            var e = document.createElement("div");
            e.classList.add(this.CssClasses_.TRACK);
            var t = document.createElement("div");
            t.classList.add(this.CssClasses_.THUMB);
            var s = document.createElement("span");
            if (s.classList.add(this.CssClasses_.FOCUS_HELPER), t.appendChild(s), this.element_.appendChild(e), this.element_.appendChild(t), this.boundMouseUpHandler = this.onMouseUp_.bind(this), this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
                this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS), this.rippleContainerElement_ = document.createElement("span"), this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER), this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_EFFECT), this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER), this.rippleContainerElement_.addEventListener("mouseup", this.boundMouseUpHandler);
                var i = document.createElement("span");
                i.classList.add(this.CssClasses_.RIPPLE), this.rippleContainerElement_.appendChild(i), this.element_.appendChild(this.rippleContainerElement_)
            }
            this.boundChangeHandler = this.onChange_.bind(this), this.boundFocusHandler = this.onFocus_.bind(this), this.boundBlurHandler = this.onBlur_.bind(this), this.inputElement_.addEventListener("change", this.boundChangeHandler), this.inputElement_.addEventListener("focus", this.boundFocusHandler), this.inputElement_.addEventListener("blur", this.boundBlurHandler), this.element_.addEventListener("mouseup", this.boundMouseUpHandler), this.updateClasses_(), this.element_.classList.add("is-upgraded")
        }
    }, s.register({constructor: E, classAsString: "MaterialSwitch", cssClass: "mdl-js-switch", widget: !0});
    var m = function (e) {
        this.element_ = e, this.init()
    };
    window.MaterialTabs = m, m.prototype.Constant_ = {}, m.prototype.CssClasses_ = {
        TAB_CLASS: "mdl-tabs__tab",
        PANEL_CLASS: "mdl-tabs__panel",
        ACTIVE_CLASS: "is-active",
        UPGRADED_CLASS: "is-upgraded",
        MDL_JS_RIPPLE_EFFECT: "mdl-js-ripple-effect",
        MDL_RIPPLE_CONTAINER: "mdl-tabs__ripple-container",
        MDL_RIPPLE: "mdl-ripple",
        MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS: "mdl-js-ripple-effect--ignore-events"
    }, m.prototype.initTabs_ = function () {
        this.element_.classList.contains(this.CssClasses_.MDL_JS_RIPPLE_EFFECT) && this.element_.classList.add(this.CssClasses_.MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS), this.tabs_ = this.element_.querySelectorAll("." + this.CssClasses_.TAB_CLASS), this.panels_ = this.element_.querySelectorAll("." + this.CssClasses_.PANEL_CLASS);
        for (var t = 0; t < this.tabs_.length; t++)new e(this.tabs_[t], this);
        this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS)
    }, m.prototype.resetTabState_ = function () {
        for (var e = 0; e < this.tabs_.length; e++)this.tabs_[e].classList.remove(this.CssClasses_.ACTIVE_CLASS)
    }, m.prototype.resetPanelState_ = function () {
        for (var e = 0; e < this.panels_.length; e++)this.panels_[e].classList.remove(this.CssClasses_.ACTIVE_CLASS)
    }, m.prototype.init = function () {
        this.element_ && this.initTabs_()
    }, s.register({constructor: m, classAsString: "MaterialTabs", cssClass: "mdl-js-tabs"});
    var L = function (e) {
        this.element_ = e, this.maxRows = this.Constant_.NO_MAX_ROWS, this.init()
    };
    window.MaterialTextfield = L, L.prototype.Constant_ = {
        NO_MAX_ROWS: -1,
        MAX_ROWS_ATTRIBUTE: "maxrows"
    }, L.prototype.CssClasses_ = {
        LABEL: "mdl-textfield__label",
        INPUT: "mdl-textfield__input",
        IS_DIRTY: "is-dirty",
        IS_FOCUSED: "is-focused",
        IS_DISABLED: "is-disabled",
        IS_INVALID: "is-invalid",
        IS_UPGRADED: "is-upgraded"
    }, L.prototype.onKeyDown_ = function (e) {
        var t = e.target.value.split("\n").length;
        13 === e.keyCode && t >= this.maxRows && e.preventDefault()
    }, L.prototype.onFocus_ = function (e) {
        this.element_.classList.add(this.CssClasses_.IS_FOCUSED)
    }, L.prototype.onBlur_ = function (e) {
        this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)
    }, L.prototype.onReset_ = function (e) {
        this.updateClasses_()
    }, L.prototype.updateClasses_ = function () {
        this.checkDisabled(), this.checkValidity(), this.checkDirty(), this.checkFocus()
    }, L.prototype.checkDisabled = function () {
        this.input_.disabled ? this.element_.classList.add(this.CssClasses_.IS_DISABLED) : this.element_.classList.remove(this.CssClasses_.IS_DISABLED)
    }, L.prototype.checkDisabled = L.prototype.checkDisabled, L.prototype.checkFocus = function () {
        Boolean(this.element_.querySelector(":focus")) ? this.element_.classList.add(this.CssClasses_.IS_FOCUSED) : this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)
    }, L.prototype.checkFocus = L.prototype.checkFocus, L.prototype.checkValidity = function () {
        this.input_.validity && (this.input_.validity.valid ? this.element_.classList.remove(this.CssClasses_.IS_INVALID) : this.element_.classList.add(this.CssClasses_.IS_INVALID))
    }, L.prototype.checkValidity = L.prototype.checkValidity, L.prototype.checkDirty = function () {
        this.input_.value && this.input_.value.length > 0 ? this.element_.classList.add(this.CssClasses_.IS_DIRTY) : this.element_.classList.remove(this.CssClasses_.IS_DIRTY)
    }, L.prototype.checkDirty = L.prototype.checkDirty, L.prototype.disable = function () {
        this.input_.disabled = !0, this.updateClasses_()
    }, L.prototype.disable = L.prototype.disable, L.prototype.enable = function () {
        this.input_.disabled = !1, this.updateClasses_()
    }, L.prototype.enable = L.prototype.enable, L.prototype.change = function (e) {
        this.input_.value = e || "", this.updateClasses_()
    }, L.prototype.change = L.prototype.change, L.prototype.init = function () {
        if (this.element_ && (this.label_ = this.element_.querySelector("." + this.CssClasses_.LABEL), this.input_ = this.element_.querySelector("." + this.CssClasses_.INPUT), this.input_)) {
            this.input_.hasAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE) && (this.maxRows = parseInt(this.input_.getAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE), 10), isNaN(this.maxRows) && (this.maxRows = this.Constant_.NO_MAX_ROWS)), this.boundUpdateClassesHandler = this.updateClasses_.bind(this), this.boundFocusHandler = this.onFocus_.bind(this), this.boundBlurHandler = this.onBlur_.bind(this), this.boundResetHandler = this.onReset_.bind(this), this.input_.addEventListener("input", this.boundUpdateClassesHandler), this.input_.addEventListener("focus", this.boundFocusHandler), this.input_.addEventListener("blur", this.boundBlurHandler), this.input_.addEventListener("reset", this.boundResetHandler), this.maxRows !== this.Constant_.NO_MAX_ROWS && (this.boundKeyDownHandler = this.onKeyDown_.bind(this), this.input_.addEventListener("keydown", this.boundKeyDownHandler));
            var e = this.element_.classList.contains(this.CssClasses_.IS_INVALID);
            this.updateClasses_(), this.element_.classList.add(this.CssClasses_.IS_UPGRADED), e && this.element_.classList.add(this.CssClasses_.IS_INVALID), this.input_.hasAttribute("autofocus") && (this.element_.focus(), this.checkFocus())
        }
    }, s.register({constructor: L, classAsString: "MaterialTextfield", cssClass: "mdl-js-textfield", widget: !0});
    var I = function (e) {
        this.element_ = e, this.init()
    };
    window.MaterialTooltip = I, I.prototype.Constant_ = {}, I.prototype.CssClasses_ = {
        IS_ACTIVE: "is-active",
        BOTTOM: "mdl-tooltip--bottom",
        LEFT: "mdl-tooltip--left",
        RIGHT: "mdl-tooltip--right",
        TOP: "mdl-tooltip--top"
    }, I.prototype.handleMouseEnter_ = function (e) {
        var t = e.target.getBoundingClientRect(), s = t.left + t.width / 2, i = t.top + t.height / 2, n = -1 * (this.element_.offsetWidth / 2), a = -1 * (this.element_.offsetHeight / 2);
        this.element_.classList.contains(this.CssClasses_.LEFT) || this.element_.classList.contains(this.CssClasses_.RIGHT) ? (s = t.width / 2, 0 > i + a ? (this.element_.style.top = 0, this.element_.style.marginTop = 0) : (this.element_.style.top = i + "px", this.element_.style.marginTop = a + "px")) : 0 > s + n ? (this.element_.style.left = 0, this.element_.style.marginLeft = 0) : (this.element_.style.left = s + "px", this.element_.style.marginLeft = n + "px"), this.element_.classList.contains(this.CssClasses_.TOP) ? this.element_.style.top = t.top - this.element_.offsetHeight - 10 + "px" : this.element_.classList.contains(this.CssClasses_.RIGHT) ? this.element_.style.left = t.left + t.width + 10 + "px" : this.element_.classList.contains(this.CssClasses_.LEFT) ? this.element_.style.left = t.left - this.element_.offsetWidth - 10 + "px" : this.element_.style.top = t.top + t.height + 10 + "px", this.element_.classList.add(this.CssClasses_.IS_ACTIVE)
    }, I.prototype.handleMouseLeave_ = function () {
        this.element_.classList.remove(this.CssClasses_.IS_ACTIVE)
    }, I.prototype.init = function () {
        if (this.element_) {
            var e = this.element_.getAttribute("for");
            e && (this.forElement_ = document.getElementById(e)), this.forElement_ && (this.forElement_.hasAttribute("tabindex") || this.forElement_.setAttribute("tabindex", "0"), this.boundMouseEnterHandler = this.handleMouseEnter_.bind(this), this.boundMouseLeaveHandler = this.handleMouseLeave_.bind(this), this.forElement_.addEventListener("mouseenter", this.boundMouseEnterHandler, !1), this.forElement_.addEventListener("touchend", this.boundMouseEnterHandler, !1), this.forElement_.addEventListener("mouseleave", this.boundMouseLeaveHandler, !1), window.addEventListener("touchstart", this.boundMouseLeaveHandler))
        }
    }, s.register({constructor: I, classAsString: "MaterialTooltip", cssClass: "mdl-tooltip"});
    var f = function (e) {
        this.element_ = e, this.init()
    };
    window.MaterialLayout = f, f.prototype.Constant_ = {
        MAX_WIDTH: "(max-width: 1024px)",
        TAB_SCROLL_PIXELS: 100,
        MENU_ICON: "&#xE5D2;",
        CHEVRON_LEFT: "chevron_left",
        CHEVRON_RIGHT: "chevron_right"
    }, f.prototype.Keycodes_ = {ENTER: 13, ESCAPE: 27, SPACE: 32}, f.prototype.Mode_ = {
        STANDARD: 0,
        SEAMED: 1,
        WATERFALL: 2,
        SCROLL: 3
    }, f.prototype.CssClasses_ = {
        CONTAINER: "mdl-layout__container",
        HEADER: "mdl-layout__header",
        DRAWER: "mdl-layout__drawer",
        CONTENT: "mdl-layout__content",
        DRAWER_BTN: "mdl-layout__drawer-button",
        ICON: "material-icons",
        JS_RIPPLE_EFFECT: "mdl-js-ripple-effect",
        RIPPLE_CONTAINER: "mdl-layout__tab-ripple-container",
        RIPPLE: "mdl-ripple",
        RIPPLE_IGNORE_EVENTS: "mdl-js-ripple-effect--ignore-events",
        HEADER_SEAMED: "mdl-layout__header--seamed",
        HEADER_WATERFALL: "mdl-layout__header--waterfall",
        HEADER_SCROLL: "mdl-layout__header--scroll",
        FIXED_HEADER: "mdl-layout--fixed-header",
        OBFUSCATOR: "mdl-layout__obfuscator",
        TAB_BAR: "mdl-layout__tab-bar",
        TAB_CONTAINER: "mdl-layout__tab-bar-container",
        TAB: "mdl-layout__tab",
        TAB_BAR_BUTTON: "mdl-layout__tab-bar-button",
        TAB_BAR_LEFT_BUTTON: "mdl-layout__tab-bar-left-button",
        TAB_BAR_RIGHT_BUTTON: "mdl-layout__tab-bar-right-button",
        PANEL: "mdl-layout__tab-panel",
        HAS_DRAWER: "has-drawer",
        HAS_TABS: "has-tabs",
        HAS_SCROLLING_HEADER: "has-scrolling-header",
        CASTING_SHADOW: "is-casting-shadow",
        IS_COMPACT: "is-compact",
        IS_SMALL_SCREEN: "is-small-screen",
        IS_DRAWER_OPEN: "is-visible",
        IS_ACTIVE: "is-active",
        IS_UPGRADED: "is-upgraded",
        IS_ANIMATING: "is-animating",
        ON_LARGE_SCREEN: "mdl-layout--large-screen-only",
        ON_SMALL_SCREEN: "mdl-layout--small-screen-only"
    }, f.prototype.contentScrollHandler_ = function () {
        if (!this.header_.classList.contains(this.CssClasses_.IS_ANIMATING)) {
            var e = !this.element_.classList.contains(this.CssClasses_.IS_SMALL_SCREEN) || this.element_.classList.contains(this.CssClasses_.FIXED_HEADER);
            this.content_.scrollTop > 0 && !this.header_.classList.contains(this.CssClasses_.IS_COMPACT) ? (this.header_.classList.add(this.CssClasses_.CASTING_SHADOW), this.header_.classList.add(this.CssClasses_.IS_COMPACT), e && this.header_.classList.add(this.CssClasses_.IS_ANIMATING)) : this.content_.scrollTop <= 0 && this.header_.classList.contains(this.CssClasses_.IS_COMPACT) && (this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW), this.header_.classList.remove(this.CssClasses_.IS_COMPACT), e && this.header_.classList.add(this.CssClasses_.IS_ANIMATING))
        }
    }, f.prototype.keyboardEventHandler_ = function (e) {
        e.keyCode === this.Keycodes_.ESCAPE && this.toggleDrawer()
    }, f.prototype.screenSizeHandler_ = function () {
        this.screenSizeMediaQuery_.matches ? this.element_.classList.add(this.CssClasses_.IS_SMALL_SCREEN) : (this.element_.classList.remove(this.CssClasses_.IS_SMALL_SCREEN), this.drawer_ && (this.drawer_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN), this.obfuscator_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN)))
    }, f.prototype.drawerToggleHandler_ = function (e) {
        if (e && "keydown" === e.type) {
            if (e.keyCode !== this.Keycodes_.SPACE && e.keyCode !== this.Keycodes_.ENTER)return;
            e.preventDefault()
        }
        this.toggleDrawer()
    }, f.prototype.headerTransitionEndHandler_ = function () {
        this.header_.classList.remove(this.CssClasses_.IS_ANIMATING)
    }, f.prototype.headerClickHandler_ = function () {
        this.header_.classList.contains(this.CssClasses_.IS_COMPACT) && (this.header_.classList.remove(this.CssClasses_.IS_COMPACT), this.header_.classList.add(this.CssClasses_.IS_ANIMATING))
    }, f.prototype.resetTabState_ = function (e) {
        for (var t = 0; t < e.length; t++)e[t].classList.remove(this.CssClasses_.IS_ACTIVE)
    }, f.prototype.resetPanelState_ = function (e) {
        for (var t = 0; t < e.length; t++)e[t].classList.remove(this.CssClasses_.IS_ACTIVE)
    }, f.prototype.toggleDrawer = function () {
        var e = this.element_.querySelector("." + this.CssClasses_.DRAWER_BTN);
        this.drawer_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN), this.obfuscator_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN), this.drawer_.classList.contains(this.CssClasses_.IS_DRAWER_OPEN) ? (this.drawer_.setAttribute("aria-hidden", "false"), e.setAttribute("aria-expanded", "true")) : (this.drawer_.setAttribute("aria-hidden", "true"), e.setAttribute("aria-expanded", "false"))
    }, f.prototype.toggleDrawer = f.prototype.toggleDrawer, f.prototype.init = function () {
        if (this.element_) {
            var e = document.createElement("div");
            e.classList.add(this.CssClasses_.CONTAINER), this.element_.parentElement.insertBefore(e, this.element_), this.element_.parentElement.removeChild(this.element_), e.appendChild(this.element_);
            for (var s = this.element_.childNodes, i = s.length, n = 0; i > n; n++) {
                var a = s[n];
                a.classList && a.classList.contains(this.CssClasses_.HEADER) && (this.header_ = a), a.classList && a.classList.contains(this.CssClasses_.DRAWER) && (this.drawer_ = a), a.classList && a.classList.contains(this.CssClasses_.CONTENT) && (this.content_ = a)
            }
            window.addEventListener("pageshow", function (e) {
                e.persisted && (this.element_.style.overflowY = "hidden", requestAnimationFrame(function () {
                    this.element_.style.overflowY = ""
                }.bind(this)))
            }.bind(this), !1), this.header_ && (this.tabBar_ = this.header_.querySelector("." + this.CssClasses_.TAB_BAR));
            var l = this.Mode_.STANDARD;
            if (this.header_ && (this.header_.classList.contains(this.CssClasses_.HEADER_SEAMED) ? l = this.Mode_.SEAMED : this.header_.classList.contains(this.CssClasses_.HEADER_WATERFALL) ? (l = this.Mode_.WATERFALL, this.header_.addEventListener("transitionend", this.headerTransitionEndHandler_.bind(this)), this.header_.addEventListener("click", this.headerClickHandler_.bind(this))) : this.header_.classList.contains(this.CssClasses_.HEADER_SCROLL) && (l = this.Mode_.SCROLL, e.classList.add(this.CssClasses_.HAS_SCROLLING_HEADER)), l === this.Mode_.STANDARD ? (this.header_.classList.add(this.CssClasses_.CASTING_SHADOW), this.tabBar_ && this.tabBar_.classList.add(this.CssClasses_.CASTING_SHADOW)) : l === this.Mode_.SEAMED || l === this.Mode_.SCROLL ? (this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW), this.tabBar_ && this.tabBar_.classList.remove(this.CssClasses_.CASTING_SHADOW)) : l === this.Mode_.WATERFALL && (this.content_.addEventListener("scroll", this.contentScrollHandler_.bind(this)), this.contentScrollHandler_())), this.drawer_) {
                var o = this.element_.querySelector("." + this.CssClasses_.DRAWER_BTN);
                if (!o) {
                    o = document.createElement("div"), o.setAttribute("aria-expanded", "false"), o.setAttribute("role", "button"), o.setAttribute("tabindex", "0"), o.classList.add(this.CssClasses_.DRAWER_BTN);
                    var r = document.createElement("i");
                    r.classList.add(this.CssClasses_.ICON), r.innerHTML = this.Constant_.MENU_ICON, o.appendChild(r)
                }
                this.drawer_.classList.contains(this.CssClasses_.ON_LARGE_SCREEN) ? o.classList.add(this.CssClasses_.ON_LARGE_SCREEN) : this.drawer_.classList.contains(this.CssClasses_.ON_SMALL_SCREEN) && o.classList.add(this.CssClasses_.ON_SMALL_SCREEN), o.addEventListener("click", this.drawerToggleHandler_.bind(this)), o.addEventListener("keydown", this.drawerToggleHandler_.bind(this)), this.element_.classList.add(this.CssClasses_.HAS_DRAWER), this.element_.classList.contains(this.CssClasses_.FIXED_HEADER) ? this.header_.insertBefore(o, this.header_.firstChild) : this.element_.insertBefore(o, this.content_);
                var _ = document.createElement("div");
                _.classList.add(this.CssClasses_.OBFUSCATOR), this.element_.appendChild(_), _.addEventListener("click", this.drawerToggleHandler_.bind(this)), this.obfuscator_ = _, this.drawer_.addEventListener("keydown", this.keyboardEventHandler_.bind(this)), this.drawer_.setAttribute("aria-hidden", "true")
            }
            if (this.screenSizeMediaQuery_ = window.matchMedia(this.Constant_.MAX_WIDTH), this.screenSizeMediaQuery_.addListener(this.screenSizeHandler_.bind(this)), this.screenSizeHandler_(), this.header_ && this.tabBar_) {
                this.element_.classList.add(this.CssClasses_.HAS_TABS);
                var d = document.createElement("div");
                d.classList.add(this.CssClasses_.TAB_CONTAINER), this.header_.insertBefore(d, this.tabBar_), this.header_.removeChild(this.tabBar_);
                var h = document.createElement("div");
                h.classList.add(this.CssClasses_.TAB_BAR_BUTTON), h.classList.add(this.CssClasses_.TAB_BAR_LEFT_BUTTON);
                var c = document.createElement("i");
                c.classList.add(this.CssClasses_.ICON), c.textContent = this.Constant_.CHEVRON_LEFT, h.appendChild(c), h.addEventListener("click", function () {
                    this.tabBar_.scrollLeft -= this.Constant_.TAB_SCROLL_PIXELS
                }.bind(this));
                var p = document.createElement("div");
                p.classList.add(this.CssClasses_.TAB_BAR_BUTTON), p.classList.add(this.CssClasses_.TAB_BAR_RIGHT_BUTTON);
                var C = document.createElement("i");
                C.classList.add(this.CssClasses_.ICON), C.textContent = this.Constant_.CHEVRON_RIGHT, p.appendChild(C), p.addEventListener("click", function () {
                    this.tabBar_.scrollLeft += this.Constant_.TAB_SCROLL_PIXELS
                }.bind(this)), d.appendChild(h), d.appendChild(this.tabBar_), d.appendChild(p);
                var u = function () {
                    this.tabBar_.scrollLeft > 0 ? h.classList.add(this.CssClasses_.IS_ACTIVE) : h.classList.remove(this.CssClasses_.IS_ACTIVE), this.tabBar_.scrollLeft < this.tabBar_.scrollWidth - this.tabBar_.offsetWidth ? p.classList.add(this.CssClasses_.IS_ACTIVE) : p.classList.remove(this.CssClasses_.IS_ACTIVE)
                }.bind(this);
                this.tabBar_.addEventListener("scroll", u), u(), this.tabBar_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT) && this.tabBar_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
                for (var E = this.tabBar_.querySelectorAll("." + this.CssClasses_.TAB), m = this.content_.querySelectorAll("." + this.CssClasses_.PANEL), L = 0; L < E.length; L++)new t(E[L], E, m, this)
            }
            this.element_.classList.add(this.CssClasses_.IS_UPGRADED)
        }
    }, window.MaterialLayoutTab = t, s.register({
        constructor: f,
        classAsString: "MaterialLayout",
        cssClass: "mdl-js-layout"
    });
    var b = function (e) {
        this.element_ = e, this.init()
    };
    window.MaterialDataTable = b, b.prototype.Constant_ = {}, b.prototype.CssClasses_ = {
        DATA_TABLE: "mdl-data-table",
        SELECTABLE: "mdl-data-table--selectable",
        SELECT_ELEMENT: "mdl-data-table__select",
        IS_SELECTED: "is-selected",
        IS_UPGRADED: "is-upgraded"
    }, b.prototype.selectRow_ = function (e, t, s) {
        return t ? function () {
            e.checked ? t.classList.add(this.CssClasses_.IS_SELECTED) : t.classList.remove(this.CssClasses_.IS_SELECTED)
        }.bind(this) : s ? function () {
            var t, i;
            if (e.checked)for (t = 0; t < s.length; t++)i = s[t].querySelector("td").querySelector(".mdl-checkbox"), i.MaterialCheckbox.check(), s[t].classList.add(this.CssClasses_.IS_SELECTED); else for (t = 0; t < s.length; t++)i = s[t].querySelector("td").querySelector(".mdl-checkbox"), i.MaterialCheckbox.uncheck(), s[t].classList.remove(this.CssClasses_.IS_SELECTED)
        }.bind(this) : void 0
    }, b.prototype.createCheckbox_ = function (e, t) {
        var i = document.createElement("label"), n = ["mdl-checkbox", "mdl-js-checkbox", "mdl-js-ripple-effect", this.CssClasses_.SELECT_ELEMENT];
        i.className = n.join(" ");
        var a = document.createElement("input");
        return a.type = "checkbox", a.classList.add("mdl-checkbox__input"), e ? (a.checked = e.classList.contains(this.CssClasses_.IS_SELECTED), a.addEventListener("change", this.selectRow_(a, e))) : t && a.addEventListener("change", this.selectRow_(a, null, t)), i.appendChild(a), s.upgradeElement(i, "MaterialCheckbox"), i
    }, b.prototype.init = function () {
        if (this.element_) {
            var e = this.element_.querySelector("th"), t = Array.prototype.slice.call(this.element_.querySelectorAll("tbody tr")), s = Array.prototype.slice.call(this.element_.querySelectorAll("tfoot tr")), i = t.concat(s);
            if (this.element_.classList.contains(this.CssClasses_.SELECTABLE)) {
                var n = document.createElement("th"), a = this.createCheckbox_(null, i);
                n.appendChild(a), e.parentElement.insertBefore(n, e);
                for (var l = 0; l < i.length; l++) {
                    var o = i[l].querySelector("td");
                    if (o) {
                        var r = document.createElement("td");
                        if ("TBODY" === i[l].parentNode.nodeName.toUpperCase()) {
                            var _ = this.createCheckbox_(i[l]);
                            r.appendChild(_)
                        }
                        i[l].insertBefore(r, o)
                    }
                }
                this.element_.classList.add(this.CssClasses_.IS_UPGRADED)
            }
        }
    }, s.register({constructor: b, classAsString: "MaterialDataTable", cssClass: "mdl-js-data-table"});
    var y = function (e) {
        this.element_ = e, this.init()
    };
    window.MaterialRipple = y, y.prototype.Constant_ = {
        INITIAL_SCALE: "scale(0.0001, 0.0001)",
        INITIAL_SIZE: "1px",
        INITIAL_OPACITY: "0.4",
        FINAL_OPACITY: "0",
        FINAL_SCALE: ""
    }, y.prototype.CssClasses_ = {
        RIPPLE_CENTER: "mdl-ripple--center",
        RIPPLE_EFFECT_IGNORE_EVENTS: "mdl-js-ripple-effect--ignore-events",
        RIPPLE: "mdl-ripple",
        IS_ANIMATING: "is-animating",
        IS_VISIBLE: "is-visible"
    }, y.prototype.downHandler_ = function (e) {
        if (!this.rippleElement_.style.width && !this.rippleElement_.style.height) {
            var t = this.element_.getBoundingClientRect();
            this.boundHeight = t.height, this.boundWidth = t.width, this.rippleSize_ = 2 * Math.sqrt(t.width * t.width + t.height * t.height) + 2, this.rippleElement_.style.width = this.rippleSize_ + "px", this.rippleElement_.style.height = this.rippleSize_ + "px"
        }
        if (this.rippleElement_.classList.add(this.CssClasses_.IS_VISIBLE), "mousedown" === e.type && this.ignoringMouseDown_)this.ignoringMouseDown_ = !1; else {
            "touchstart" === e.type && (this.ignoringMouseDown_ = !0);
            var s = this.getFrameCount();
            if (s > 0)return;
            this.setFrameCount(1);
            var i, n, a = e.currentTarget.getBoundingClientRect();
            if (0 === e.clientX && 0 === e.clientY)i = Math.round(a.width / 2), n = Math.round(a.height / 2); else {
                var l = e.clientX ? e.clientX : e.touches[0].clientX, o = e.clientY ? e.clientY : e.touches[0].clientY;
                i = Math.round(l - a.left), n = Math.round(o - a.top)
            }
            this.setRippleXY(i, n), this.setRippleStyles(!0), window.requestAnimationFrame(this.animFrameHandler.bind(this))
        }
    }, y.prototype.upHandler_ = function (e) {
        e && 2 !== e.detail && window.setTimeout(function () {
            this.rippleElement_.classList.remove(this.CssClasses_.IS_VISIBLE)
        }.bind(this), 0)
    }, y.prototype.init = function () {
        if (this.element_) {
            var e = this.element_.classList.contains(this.CssClasses_.RIPPLE_CENTER);
            this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT_IGNORE_EVENTS) || (this.rippleElement_ = this.element_.querySelector("." + this.CssClasses_.RIPPLE), this.frameCount_ = 0, this.rippleSize_ = 0, this.x_ = 0, this.y_ = 0, this.ignoringMouseDown_ = !1, this.boundDownHandler = this.downHandler_.bind(this), this.element_.addEventListener("mousedown", this.boundDownHandler), this.element_.addEventListener("touchstart", this.boundDownHandler), this.boundUpHandler = this.upHandler_.bind(this), this.element_.addEventListener("mouseup", this.boundUpHandler), this.element_.addEventListener("mouseleave", this.boundUpHandler), this.element_.addEventListener("touchend", this.boundUpHandler), this.element_.addEventListener("blur", this.boundUpHandler), this.getFrameCount = function () {
                return this.frameCount_
            }, this.setFrameCount = function (e) {
                this.frameCount_ = e
            }, this.getRippleElement = function () {
                return this.rippleElement_
            }, this.setRippleXY = function (e, t) {
                this.x_ = e, this.y_ = t
            }, this.setRippleStyles = function (t) {
                if (null !== this.rippleElement_) {
                    var s, i, n, a = "translate(" + this.x_ + "px, " + this.y_ + "px)";
                    t ? (i = this.Constant_.INITIAL_SCALE, n = this.Constant_.INITIAL_SIZE) : (i = this.Constant_.FINAL_SCALE, n = this.rippleSize_ + "px", e && (a = "translate(" + this.boundWidth / 2 + "px, " + this.boundHeight / 2 + "px)")), s = "translate(-50%, -50%) " + a + i, this.rippleElement_.style.webkitTransform = s, this.rippleElement_.style.msTransform = s, this.rippleElement_.style.transform = s, t ? this.rippleElement_.classList.remove(this.CssClasses_.IS_ANIMATING) : this.rippleElement_.classList.add(this.CssClasses_.IS_ANIMATING)
                }
            }, this.animFrameHandler = function () {
                this.frameCount_-- > 0 ? window.requestAnimationFrame(this.animFrameHandler.bind(this)) : this.setRippleStyles(!1)
            })
        }
    }, s.register({constructor: y, classAsString: "MaterialRipple", cssClass: "mdl-js-ripple-effect", widget: !1})
}(), function (window, document, undefined) {
    "use strict";
    function minErr(module, ErrorConstructor) {
        return ErrorConstructor = ErrorConstructor || Error, function () {
            var paramPrefix, i, SKIP_INDEXES = 2, templateArgs = arguments, code = templateArgs[0], message = "[" + (module ? module + ":" : "") + code + "] ", template = templateArgs[1];
            for (message += template.replace(/\{\d+\}/g, function (match) {
                var index = +match.slice(1, -1), shiftedIndex = index + SKIP_INDEXES;
                return shiftedIndex < templateArgs.length ? toDebugString(templateArgs[shiftedIndex]) : match
            }), message += "\nhttp://errors.angularjs.org/1.5.0/" + (module ? module + "/" : "") + code, i = SKIP_INDEXES, paramPrefix = "?"; i < templateArgs.length; i++, paramPrefix = "&")message += paramPrefix + "p" + (i - SKIP_INDEXES) + "=" + encodeURIComponent(toDebugString(templateArgs[i]));
            return new ErrorConstructor(message)
        }
    }

    function isArrayLike(obj) {
        if (null == obj || isWindow(obj))return !1;
        if (isArray(obj) || isString(obj) || jqLite && obj instanceof jqLite)return !0;
        var length = "length" in Object(obj) && obj.length;
        return isNumber(length) && (length >= 0 && (length - 1 in obj || obj instanceof Array) || "function" == typeof obj.item)
    }

    function forEach(obj, iterator, context) {
        var key, length;
        if (obj)if (isFunction(obj))for (key in obj)"prototype" == key || "length" == key || "name" == key || obj.hasOwnProperty && !obj.hasOwnProperty(key) || iterator.call(context, obj[key], key, obj); else if (isArray(obj) || isArrayLike(obj)) {
            var isPrimitive = "object" != typeof obj;
            for (key = 0,
                     length = obj.length; length > key; key++)(isPrimitive || key in obj) && iterator.call(context, obj[key], key, obj)
        } else if (obj.forEach && obj.forEach !== forEach)obj.forEach(iterator, context, obj); else if (isBlankObject(obj))for (key in obj)iterator.call(context, obj[key], key, obj); else if ("function" == typeof obj.hasOwnProperty)for (key in obj)obj.hasOwnProperty(key) && iterator.call(context, obj[key], key, obj); else for (key in obj)hasOwnProperty.call(obj, key) && iterator.call(context, obj[key], key, obj);
        return obj
    }

    function forEachSorted(obj, iterator, context) {
        for (var keys = Object.keys(obj).sort(), i = 0; i < keys.length; i++)iterator.call(context, obj[keys[i]], keys[i]);
        return keys
    }

    function reverseParams(iteratorFn) {
        return function (value, key) {
            iteratorFn(key, value)
        }
    }

    function nextUid() {
        return ++uid
    }

    function setHashKey(obj, h) {
        h ? obj.$$hashKey = h : delete obj.$$hashKey
    }

    function baseExtend(dst, objs, deep) {
        for (var h = dst.$$hashKey, i = 0, ii = objs.length; ii > i; ++i) {
            var obj = objs[i];
            if (isObject(obj) || isFunction(obj))for (var keys = Object.keys(obj), j = 0, jj = keys.length; jj > j; j++) {
                var key = keys[j], src = obj[key];
                deep && isObject(src) ? isDate(src) ? dst[key] = new Date(src.valueOf()) : isRegExp(src) ? dst[key] = new RegExp(src) : src.nodeName ? dst[key] = src.cloneNode(!0) : isElement(src) ? dst[key] = src.clone() : (isObject(dst[key]) || (dst[key] = isArray(src) ? [] : {}), baseExtend(dst[key], [src], !0)) : dst[key] = src
            }
        }
        return setHashKey(dst, h), dst
    }

    function extend(dst) {
        return baseExtend(dst, slice.call(arguments, 1), !1)
    }

    function merge(dst) {
        return baseExtend(dst, slice.call(arguments, 1), !0)
    }

    function toInt(str) {
        return parseInt(str, 10)
    }

    function inherit(parent, extra) {
        return extend(Object.create(parent), extra)
    }

    function noop() {
    }

    function identity($) {
        return $
    }

    function valueFn(value) {
        return function () {
            return value
        }
    }

    function hasCustomToString(obj) {
        return isFunction(obj.toString) && obj.toString !== toString
    }

    function isUndefined(value) {
        return "undefined" == typeof value
    }

    function isDefined(value) {
        return "undefined" != typeof value
    }

    function isObject(value) {
        return null !== value && "object" == typeof value
    }

    function isBlankObject(value) {
        return null !== value && "object" == typeof value && !getPrototypeOf(value)
    }

    function isString(value) {
        return "string" == typeof value
    }

    function isNumber(value) {
        return "number" == typeof value
    }

    function isDate(value) {
        return "[object Date]" === toString.call(value)
    }

    function isFunction(value) {
        return "function" == typeof value
    }

    function isRegExp(value) {
        return "[object RegExp]" === toString.call(value)
    }

    function isWindow(obj) {
        return obj && obj.window === obj
    }

    function isScope(obj) {
        return obj && obj.$evalAsync && obj.$watch
    }

    function isFile(obj) {
        return "[object File]" === toString.call(obj)
    }

    function isFormData(obj) {
        return "[object FormData]" === toString.call(obj)
    }

    function isBlob(obj) {
        return "[object Blob]" === toString.call(obj)
    }

    function isBoolean(value) {
        return "boolean" == typeof value
    }

    function isPromiseLike(obj) {
        return obj && isFunction(obj.then)
    }

    function isTypedArray(value) {
        return value && isNumber(value.length) && TYPED_ARRAY_REGEXP.test(toString.call(value))
    }

    function isArrayBuffer(obj) {
        return "[object ArrayBuffer]" === toString.call(obj)
    }

    function isElement(node) {
        return !(!node || !(node.nodeName || node.prop && node.attr && node.find))
    }

    function makeMap(str) {
        var i, obj = {}, items = str.split(",");
        for (i = 0; i < items.length; i++)obj[items[i]] = !0;
        return obj
    }

    function nodeName_(element) {
        return lowercase(element.nodeName || element[0] && element[0].nodeName)
    }

    function arrayRemove(array, value) {
        var index = array.indexOf(value);
        return index >= 0 && array.splice(index, 1), index
    }

    function copy(source, destination) {
        function copyRecurse(source, destination) {
            var key, h = destination.$$hashKey;
            if (isArray(source))for (var i = 0, ii = source.length; ii > i; i++)destination.push(copyElement(source[i])); else if (isBlankObject(source))for (key in source)destination[key] = copyElement(source[key]); else if (source && "function" == typeof source.hasOwnProperty)for (key in source)source.hasOwnProperty(key) && (destination[key] = copyElement(source[key])); else for (key in source)hasOwnProperty.call(source, key) && (destination[key] = copyElement(source[key]));
            return setHashKey(destination, h), destination
        }

        function copyElement(source) {
            if (!isObject(source))return source;
            var index = stackSource.indexOf(source);
            if (-1 !== index)return stackDest[index];
            if (isWindow(source) || isScope(source))throw ngMinErr("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
            var needsRecurse = !1, destination = copyType(source);
            return destination === undefined && (destination = isArray(source) ? [] : Object.create(getPrototypeOf(source)), needsRecurse = !0), stackSource.push(source), stackDest.push(destination), needsRecurse ? copyRecurse(source, destination) : destination
        }

        function copyType(source) {
            switch (toString.call(source)) {
                case"[object Int8Array]":
                case"[object Int16Array]":
                case"[object Int32Array]":
                case"[object Float32Array]":
                case"[object Float64Array]":
                case"[object Uint8Array]":
                case"[object Uint8ClampedArray]":
                case"[object Uint16Array]":
                case"[object Uint32Array]":
                    return new source.constructor(copyElement(source.buffer));
                case"[object ArrayBuffer]":
                    if (!source.slice) {
                        var copied = new ArrayBuffer(source.byteLength);
                        return new Uint8Array(copied).set(new Uint8Array(source)), copied
                    }
                    return source.slice(0);
                case"[object Boolean]":
                case"[object Number]":
                case"[object String]":
                case"[object Date]":
                    return new source.constructor(source.valueOf());
                case"[object RegExp]":
                    var re = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
                    return re.lastIndex = source.lastIndex, re
            }
            return isFunction(source.cloneNode) ? source.cloneNode(!0) : void 0
        }

        var stackSource = [], stackDest = [];
        if (destination) {
            if (isTypedArray(destination) || isArrayBuffer(destination))throw ngMinErr("cpta", "Can't copy! TypedArray destination cannot be mutated.");
            if (source === destination)throw ngMinErr("cpi", "Can't copy! Source and destination are identical.");
            return isArray(destination) ? destination.length = 0 : forEach(destination, function (value, key) {
                "$$hashKey" !== key && delete destination[key]
            }), stackSource.push(source), stackDest.push(destination), copyRecurse(source, destination)
        }
        return copyElement(source)
    }

    function shallowCopy(src, dst) {
        if (isArray(src)) {
            dst = dst || [];
            for (var i = 0, ii = src.length; ii > i; i++)dst[i] = src[i]
        } else if (isObject(src)) {
            dst = dst || {};
            for (var key in src)"$" === key.charAt(0) && "$" === key.charAt(1) || (dst[key] = src[key])
        }
        return dst || src
    }

    function equals(o1, o2) {
        if (o1 === o2)return !0;
        if (null === o1 || null === o2)return !1;
        if (o1 !== o1 && o2 !== o2)return !0;
        var length, key, keySet, t1 = typeof o1, t2 = typeof o2;
        if (t1 == t2 && "object" == t1) {
            if (!isArray(o1)) {
                if (isDate(o1))return isDate(o2) ? equals(o1.getTime(), o2.getTime()) : !1;
                if (isRegExp(o1))return isRegExp(o2) ? o1.toString() == o2.toString() : !1;
                if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) || isArray(o2) || isDate(o2) || isRegExp(o2))return !1;
                keySet = createMap();
                for (key in o1)if ("$" !== key.charAt(0) && !isFunction(o1[key])) {
                    if (!equals(o1[key], o2[key]))return !1;
                    keySet[key] = !0
                }
                for (key in o2)if (!(key in keySet) && "$" !== key.charAt(0) && isDefined(o2[key]) && !isFunction(o2[key]))return !1;
                return !0
            }
            if (!isArray(o2))return !1;
            if ((length = o1.length) == o2.length) {
                for (key = 0; length > key; key++)if (!equals(o1[key], o2[key]))return !1;
                return !0
            }
        }
        return !1
    }

    function concat(array1, array2, index) {
        return array1.concat(slice.call(array2, index))
    }

    function sliceArgs(args, startIndex) {
        return slice.call(args, startIndex || 0)
    }

    function bind(self, fn) {
        var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
        return !isFunction(fn) || fn instanceof RegExp ? fn : curryArgs.length ? function () {
            return arguments.length ? fn.apply(self, concat(curryArgs, arguments, 0)) : fn.apply(self, curryArgs)
        } : function () {
            return arguments.length ? fn.apply(self, arguments) : fn.call(self)
        }
    }

    function toJsonReplacer(key, value) {
        var val = value;
        return "string" == typeof key && "$" === key.charAt(0) && "$" === key.charAt(1) ? val = undefined : isWindow(value) ? val = "$WINDOW" : value && document === value ? val = "$DOCUMENT" : isScope(value) && (val = "$SCOPE"), val
    }

    function toJson(obj, pretty) {
        return isUndefined(obj) ? undefined : (isNumber(pretty) || (pretty = pretty ? 2 : null), JSON.stringify(obj, toJsonReplacer, pretty))
    }

    function fromJson(json) {
        return isString(json) ? JSON.parse(json) : json
    }

    function timezoneToOffset(timezone, fallback) {
        timezone = timezone.replace(ALL_COLONS, "");
        var requestedTimezoneOffset = Date.parse("Jan 01, 1970 00:00:00 " + timezone) / 6e4;
        return isNaN(requestedTimezoneOffset) ? fallback : requestedTimezoneOffset
    }

    function addDateMinutes(date, minutes) {
        return date = new Date(date.getTime()), date.setMinutes(date.getMinutes() + minutes), date
    }

    function convertTimezoneToLocal(date, timezone, reverse) {
        reverse = reverse ? -1 : 1;
        var dateTimezoneOffset = date.getTimezoneOffset(), timezoneOffset = timezoneToOffset(timezone, dateTimezoneOffset);
        return addDateMinutes(date, reverse * (timezoneOffset - dateTimezoneOffset))
    }

    function startingTag(element) {
        element = jqLite(element).clone();
        try {
            element.empty()
        } catch (e) {
        }
        var elemHtml = jqLite("<div>").append(element).html();
        try {
            return element[0].nodeType === NODE_TYPE_TEXT ? lowercase(elemHtml) : elemHtml.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (match, nodeName) {
                return "<" + lowercase(nodeName)
            })
        } catch (e) {
            return lowercase(elemHtml)
        }
    }

    function tryDecodeURIComponent(value) {
        try {
            return decodeURIComponent(value)
        } catch (e) {
        }
    }

    function parseKeyValue(keyValue) {
        var obj = {};
        return forEach((keyValue || "").split("&"), function (keyValue) {
            var splitPoint, key, val;
            keyValue && (key = keyValue = keyValue.replace(/\+/g, "%20"), splitPoint = keyValue.indexOf("="), -1 !== splitPoint && (key = keyValue.substring(0, splitPoint), val = keyValue.substring(splitPoint + 1)), key = tryDecodeURIComponent(key), isDefined(key) && (val = isDefined(val) ? tryDecodeURIComponent(val) : !0, hasOwnProperty.call(obj, key) ? isArray(obj[key]) ? obj[key].push(val) : obj[key] = [obj[key], val] : obj[key] = val))
        }), obj
    }

    function toKeyValue(obj) {
        var parts = [];
        return forEach(obj, function (value, key) {
            isArray(value) ? forEach(value, function (arrayValue) {
                parts.push(encodeUriQuery(key, !0) + (arrayValue === !0 ? "" : "=" + encodeUriQuery(arrayValue, !0)))
            }) : parts.push(encodeUriQuery(key, !0) + (value === !0 ? "" : "=" + encodeUriQuery(value, !0)))
        }), parts.length ? parts.join("&") : ""
    }

    function encodeUriSegment(val) {
        return encodeUriQuery(val, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }

    function encodeUriQuery(val, pctEncodeSpaces) {
        return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, pctEncodeSpaces ? "%20" : "+")
    }

    function getNgAttribute(element, ngAttr) {
        var attr, i, ii = ngAttrPrefixes.length;
        for (i = 0; ii > i; ++i)if (attr = ngAttrPrefixes[i] + ngAttr, isString(attr = element.getAttribute(attr)))return attr;
        return null
    }

    function angularInit(element, bootstrap) {
        var appElement, module, config = {};
        forEach(ngAttrPrefixes, function (prefix) {
            var name = prefix + "app";
            !appElement && element.hasAttribute && element.hasAttribute(name) && (appElement = element, module = element.getAttribute(name))
        }), forEach(ngAttrPrefixes, function (prefix) {
            var candidate, name = prefix + "app";
            !appElement && (candidate = element.querySelector("[" + name.replace(":", "\\:") + "]")) && (appElement = candidate, module = candidate.getAttribute(name))
        }), appElement && (config.strictDi = null !== getNgAttribute(appElement, "strict-di"), bootstrap(appElement, module ? [module] : [], config))
    }

    function bootstrap(element, modules, config) {
        isObject(config) || (config = {});
        var defaultConfig = {strictDi: !1};
        config = extend(defaultConfig, config);
        var doBootstrap = function () {
            if (element = jqLite(element), element.injector()) {
                var tag = element[0] === document ? "document" : startingTag(element);
                throw ngMinErr("btstrpd", "App Already Bootstrapped with this Element '{0}'", tag.replace(/</, "&lt;").replace(/>/, "&gt;"))
            }
            modules = modules || [], modules.unshift(["$provide", function ($provide) {
                $provide.value("$rootElement", element)
            }]), config.debugInfoEnabled && modules.push(["$compileProvider", function ($compileProvider) {
                $compileProvider.debugInfoEnabled(!0)
            }]), modules.unshift("ng");
            var injector = createInjector(modules, config.strictDi);
            return injector.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function (scope, element, compile, injector) {
                scope.$apply(function () {
                    element.data("$injector", injector), compile(element)(scope)
                })
            }]), injector
        }, NG_ENABLE_DEBUG_INFO = /^NG_ENABLE_DEBUG_INFO!/, NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;
        return window && NG_ENABLE_DEBUG_INFO.test(window.name) && (config.debugInfoEnabled = !0, window.name = window.name.replace(NG_ENABLE_DEBUG_INFO, "")), window && !NG_DEFER_BOOTSTRAP.test(window.name) ? doBootstrap() : (window.name = window.name.replace(NG_DEFER_BOOTSTRAP, ""), angular.resumeBootstrap = function (extraModules) {
            return forEach(extraModules, function (module) {
                modules.push(module)
            }), doBootstrap()
        }, void(isFunction(angular.resumeDeferredBootstrap) && angular.resumeDeferredBootstrap()))
    }

    function reloadWithDebugInfo() {
        window.name = "NG_ENABLE_DEBUG_INFO!" + window.name, window.location.reload()
    }

    function getTestability(rootElement) {
        var injector = angular.element(rootElement).injector();
        if (!injector)throw ngMinErr("test", "no injector found for element argument to getTestability");
        return injector.get("$$testability")
    }

    function snake_case(name, separator) {
        return separator = separator || "_", name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
            return (pos ? separator : "") + letter.toLowerCase()
        })
    }

    function bindJQuery() {
        var originalCleanData;
        if (!bindJQueryFired) {
            var jqName = jq();
            jQuery = isUndefined(jqName) ? window.jQuery : jqName ? window[jqName] : undefined, jQuery && jQuery.fn.on ? (jqLite = jQuery, extend(jQuery.fn, {
                scope: JQLitePrototype.scope,
                isolateScope: JQLitePrototype.isolateScope,
                controller: JQLitePrototype.controller,
                injector: JQLitePrototype.injector,
                inheritedData: JQLitePrototype.inheritedData
            }), originalCleanData = jQuery.cleanData, jQuery.cleanData = function (elems) {
                for (var events, elem, i = 0; null != (elem = elems[i]); i++)events = jQuery._data(elem, "events"), events && events.$destroy && jQuery(elem).triggerHandler("$destroy");
                originalCleanData(elems)
            }) : jqLite = JQLite, angular.element = jqLite, bindJQueryFired = !0
        }
    }

    function assertArg(arg, name, reason) {
        if (!arg)throw ngMinErr("areq", "Argument '{0}' is {1}", name || "?", reason || "required");
        return arg
    }

    function assertArgFn(arg, name, acceptArrayAnnotation) {
        return acceptArrayAnnotation && isArray(arg) && (arg = arg[arg.length - 1]), assertArg(isFunction(arg), name, "not a function, got " + (arg && "object" == typeof arg ? arg.constructor.name || "Object" : typeof arg)), arg
    }

    function assertNotHasOwnProperty(name, context) {
        if ("hasOwnProperty" === name)throw ngMinErr("badname", "hasOwnProperty is not a valid {0} name", context)
    }

    function getter(obj, path, bindFnToScope) {
        if (!path)return obj;
        for (var key, keys = path.split("."), lastInstance = obj, len = keys.length, i = 0; len > i; i++)key = keys[i], obj && (obj = (lastInstance = obj)[key]);
        return !bindFnToScope && isFunction(obj) ? bind(lastInstance, obj) : obj
    }

    function getBlockNodes(nodes) {
        for (var blockNodes, node = nodes[0], endNode = nodes[nodes.length - 1], i = 1; node !== endNode && (node = node.nextSibling); i++)(blockNodes || nodes[i] !== node) && (blockNodes || (blockNodes = jqLite(slice.call(nodes, 0, i))), blockNodes.push(node));
        return blockNodes || nodes
    }

    function createMap() {
        return Object.create(null)
    }

    function setupModuleLoader(window) {
        function ensure(obj, name, factory) {
            return obj[name] || (obj[name] = factory())
        }

        var $injectorMinErr = minErr("$injector"), ngMinErr = minErr("ng"), angular = ensure(window, "angular", Object);
        return angular.$$minErr = angular.$$minErr || minErr, ensure(angular, "module", function () {
            var modules = {};
            return function (name, requires, configFn) {
                var assertNotHasOwnProperty = function (name, context) {
                    if ("hasOwnProperty" === name)throw ngMinErr("badname", "hasOwnProperty is not a valid {0} name", context)
                };
                return assertNotHasOwnProperty(name, "module"), requires && modules.hasOwnProperty(name) && (modules[name] = null), ensure(modules, name, function () {
                    function invokeLater(provider, method, insertMethod, queue) {
                        return queue || (queue = invokeQueue), function () {
                            return queue[insertMethod || "push"]([provider, method, arguments]), moduleInstance
                        }
                    }

                    function invokeLaterAndSetModuleName(provider, method) {
                        return function (recipeName, factoryFunction) {
                            return factoryFunction && isFunction(factoryFunction) && (factoryFunction.$$moduleName = name), invokeQueue.push([provider, method, arguments]), moduleInstance
                        }
                    }

                    if (!requires)throw $injectorMinErr("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", name);
                    var invokeQueue = [], configBlocks = [], runBlocks = [], config = invokeLater("$injector", "invoke", "push", configBlocks), moduleInstance = {
                        _invokeQueue: invokeQueue,
                        _configBlocks: configBlocks,
                        _runBlocks: runBlocks,
                        requires: requires,
                        name: name,
                        provider: invokeLaterAndSetModuleName("$provide", "provider"),
                        factory: invokeLaterAndSetModuleName("$provide", "factory"),
                        service: invokeLaterAndSetModuleName("$provide", "service"),
                        value: invokeLater("$provide", "value"),
                        constant: invokeLater("$provide", "constant", "unshift"),
                        decorator: invokeLaterAndSetModuleName("$provide", "decorator"),
                        animation: invokeLaterAndSetModuleName("$animateProvider", "register"),
                        filter: invokeLaterAndSetModuleName("$filterProvider", "register"),
                        controller: invokeLaterAndSetModuleName("$controllerProvider", "register"),
                        directive: invokeLaterAndSetModuleName("$compileProvider", "directive"),
                        component: invokeLaterAndSetModuleName("$compileProvider", "component"),
                        config: config,
                        run: function (block) {
                            return runBlocks.push(block), this
                        }
                    };
                    return configFn && config(configFn), moduleInstance
                })
            }
        })
    }

    function serializeObject(obj) {
        var seen = [];
        return JSON.stringify(obj, function (key, val) {
            if (val = toJsonReplacer(key, val), isObject(val)) {
                if (seen.indexOf(val) >= 0)return "...";
                seen.push(val)
            }
            return val
        })
    }

    function toDebugString(obj) {
        return "function" == typeof obj ? obj.toString().replace(/ \{[\s\S]*$/, "") : isUndefined(obj) ? "undefined" : "string" != typeof obj ? serializeObject(obj) : obj
    }

    function publishExternalAPI(angular) {
        extend(angular, {
            bootstrap: bootstrap,
            copy: copy,
            extend: extend,
            merge: merge,
            equals: equals,
            element: jqLite,
            forEach: forEach,
            injector: createInjector,
            noop: noop,
            bind: bind,
            toJson: toJson,
            fromJson: fromJson,
            identity: identity,
            isUndefined: isUndefined,
            isDefined: isDefined,
            isString: isString,
            isFunction: isFunction,
            isObject: isObject,
            isNumber: isNumber,
            isElement: isElement,
            isArray: isArray,
            version: version,
            isDate: isDate,
            lowercase: lowercase,
            uppercase: uppercase,
            callbacks: {counter: 0},
            getTestability: getTestability,
            $$minErr: minErr,
            $$csp: csp,
            reloadWithDebugInfo: reloadWithDebugInfo
        }), (angularModule = setupModuleLoader(window))("ng", ["ngLocale"], ["$provide", function ($provide) {
            $provide.provider({$$sanitizeUri: $$SanitizeUriProvider}), $provide.provider("$compile", $CompileProvider).directive({
                a: htmlAnchorDirective,
                input: inputDirective,
                textarea: inputDirective,
                form: formDirective,
                script: scriptDirective,
                select: selectDirective,
                style: styleDirective,
                option: optionDirective,
                ngBind: ngBindDirective,
                ngBindHtml: ngBindHtmlDirective,
                ngBindTemplate: ngBindTemplateDirective,
                ngClass: ngClassDirective,
                ngClassEven: ngClassEvenDirective,
                ngClassOdd: ngClassOddDirective,
                ngCloak: ngCloakDirective,
                ngController: ngControllerDirective,
                ngForm: ngFormDirective,
                ngHide: ngHideDirective,
                ngIf: ngIfDirective,
                ngInclude: ngIncludeDirective,
                ngInit: ngInitDirective,
                ngNonBindable: ngNonBindableDirective,
                ngPluralize: ngPluralizeDirective,
                ngRepeat: ngRepeatDirective,
                ngShow: ngShowDirective,
                ngStyle: ngStyleDirective,
                ngSwitch: ngSwitchDirective,
                ngSwitchWhen: ngSwitchWhenDirective,
                ngSwitchDefault: ngSwitchDefaultDirective,
                ngOptions: ngOptionsDirective,
                ngTransclude: ngTranscludeDirective,
                ngModel: ngModelDirective,
                ngList: ngListDirective,
                ngChange: ngChangeDirective,
                pattern: patternDirective,
                ngPattern: patternDirective,
                required: requiredDirective,
                ngRequired: requiredDirective,
                minlength: minlengthDirective,
                ngMinlength: minlengthDirective,
                maxlength: maxlengthDirective,
                ngMaxlength: maxlengthDirective,
                ngValue: ngValueDirective,
                ngModelOptions: ngModelOptionsDirective
            }).directive({ngInclude: ngIncludeFillContentDirective}).directive(ngAttributeAliasDirectives).directive(ngEventDirectives), $provide.provider({
                $anchorScroll: $AnchorScrollProvider,
                $animate: $AnimateProvider,
                $animateCss: $CoreAnimateCssProvider,
                $$animateJs: $$CoreAnimateJsProvider,
                $$animateQueue: $$CoreAnimateQueueProvider,
                $$AnimateRunner: $$AnimateRunnerFactoryProvider,
                $$animateAsyncRun: $$AnimateAsyncRunFactoryProvider,
                $browser: $BrowserProvider,
                $cacheFactory: $CacheFactoryProvider,
                $controller: $ControllerProvider,
                $document: $DocumentProvider,
                $exceptionHandler: $ExceptionHandlerProvider,
                $filter: $FilterProvider,
                $$forceReflow: $$ForceReflowProvider,
                $interpolate: $InterpolateProvider,
                $interval: $IntervalProvider,
                $http: $HttpProvider,
                $httpParamSerializer: $HttpParamSerializerProvider,
                $httpParamSerializerJQLike: $HttpParamSerializerJQLikeProvider,
                $httpBackend: $HttpBackendProvider,
                $xhrFactory: $xhrFactoryProvider,
                $location: $LocationProvider,
                $log: $LogProvider,
                $parse: $ParseProvider,
                $rootScope: $RootScopeProvider,
                $q: $QProvider,
                $$q: $$QProvider,
                $sce: $SceProvider,
                $sceDelegate: $SceDelegateProvider,
                $sniffer: $SnifferProvider,
                $templateCache: $TemplateCacheProvider,
                $templateRequest: $TemplateRequestProvider,
                $$testability: $$TestabilityProvider,
                $timeout: $TimeoutProvider,
                $window: $WindowProvider,
                $$rAF: $$RAFProvider,
                $$jqLite: $$jqLiteProvider,
                $$HashMap: $$HashMapProvider,
                $$cookieReader: $$CookieReaderProvider
            })
        }])
    }

    function jqNextId() {
        return ++jqId
    }

    function camelCase(name) {
        return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter
        }).replace(MOZ_HACK_REGEXP, "Moz$1")
    }

    function jqLiteIsTextNode(html) {
        return !HTML_REGEXP.test(html)
    }

    function jqLiteAcceptsData(node) {
        var nodeType = node.nodeType;
        return nodeType === NODE_TYPE_ELEMENT || !nodeType || nodeType === NODE_TYPE_DOCUMENT
    }

    function jqLiteHasData(node) {
        for (var key in jqCache[node.ng339])return !0;
        return !1
    }

    function jqLiteCleanData(nodes) {
        for (var i = 0, ii = nodes.length; ii > i; i++)jqLiteRemoveData(nodes[i])
    }

    function jqLiteBuildFragment(html, context) {
        var tmp, tag, wrap, i, fragment = context.createDocumentFragment(), nodes = [];
        if (jqLiteIsTextNode(html))nodes.push(context.createTextNode(html)); else {
            for (tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (TAG_NAME_REGEXP.exec(html) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + html.replace(XHTML_TAG_REGEXP, "<$1></$2>") + wrap[2], i = wrap[0]; i--;)tmp = tmp.lastChild;
            nodes = concat(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = ""
        }
        return fragment.textContent = "", fragment.innerHTML = "", forEach(nodes, function (node) {
            fragment.appendChild(node)
        }), fragment
    }

    function jqLiteParseHTML(html, context) {
        context = context || document;
        var parsed;
        return (parsed = SINGLE_TAG_REGEXP.exec(html)) ? [context.createElement(parsed[1])] : (parsed = jqLiteBuildFragment(html, context)) ? parsed.childNodes : []
    }

    function jqLiteWrapNode(node, wrapper) {
        var parent = node.parentNode;
        parent && parent.replaceChild(wrapper, node), wrapper.appendChild(node)
    }

    function JQLite(element) {
        if (element instanceof JQLite)return element;
        var argIsString;
        if (isString(element) && (element = trim(element), argIsString = !0), !(this instanceof JQLite)) {
            if (argIsString && "<" != element.charAt(0))throw jqLiteMinErr("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
            return new JQLite(element)
        }
        argIsString ? jqLiteAddNodes(this, jqLiteParseHTML(element)) : jqLiteAddNodes(this, element)
    }

    function jqLiteClone(element) {
        return element.cloneNode(!0)
    }

    function jqLiteDealoc(element, onlyDescendants) {
        if (onlyDescendants || jqLiteRemoveData(element), element.querySelectorAll)for (var descendants = element.querySelectorAll("*"), i = 0, l = descendants.length; l > i; i++)jqLiteRemoveData(descendants[i])
    }

    function jqLiteOff(element, type, fn, unsupported) {
        if (isDefined(unsupported))throw jqLiteMinErr("offargs", "jqLite#off() does not support the `selector` argument");
        var expandoStore = jqLiteExpandoStore(element), events = expandoStore && expandoStore.events, handle = expandoStore && expandoStore.handle;
        if (handle)if (type) {
            var removeHandler = function (type) {
                var listenerFns = events[type];
                isDefined(fn) && arrayRemove(listenerFns || [], fn), isDefined(fn) && listenerFns && listenerFns.length > 0 || (removeEventListenerFn(element, type, handle), delete events[type])
            };
            forEach(type.split(" "), function (type) {
                removeHandler(type), MOUSE_EVENT_MAP[type] && removeHandler(MOUSE_EVENT_MAP[type])
            })
        } else for (type in events)"$destroy" !== type && removeEventListenerFn(element, type, handle), delete events[type]
    }

    function jqLiteRemoveData(element, name) {
        var expandoId = element.ng339, expandoStore = expandoId && jqCache[expandoId];
        if (expandoStore) {
            if (name)return void delete expandoStore.data[name];
            expandoStore.handle && (expandoStore.events.$destroy && expandoStore.handle({}, "$destroy"), jqLiteOff(element)), delete jqCache[expandoId], element.ng339 = undefined
        }
    }

    function jqLiteExpandoStore(element, createIfNecessary) {
        var expandoId = element.ng339, expandoStore = expandoId && jqCache[expandoId];
        return createIfNecessary && !expandoStore && (element.ng339 = expandoId = jqNextId(), expandoStore = jqCache[expandoId] = {
            events: {},
            data: {},
            handle: undefined
        }), expandoStore
    }

    function jqLiteData(element, key, value) {
        if (jqLiteAcceptsData(element)) {
            var isSimpleSetter = isDefined(value), isSimpleGetter = !isSimpleSetter && key && !isObject(key), massGetter = !key, expandoStore = jqLiteExpandoStore(element, !isSimpleGetter), data = expandoStore && expandoStore.data;
            if (isSimpleSetter)data[key] = value; else {
                if (massGetter)return data;
                if (isSimpleGetter)return data && data[key];
                extend(data, key)
            }
        }
    }

    function jqLiteHasClass(element, selector) {
        return element.getAttribute ? (" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + selector + " ") > -1 : !1
    }

    function jqLiteRemoveClass(element, cssClasses) {
        cssClasses && element.setAttribute && forEach(cssClasses.split(" "), function (cssClass) {
            element.setAttribute("class", trim((" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + trim(cssClass) + " ", " ")))
        })
    }

    function jqLiteAddClass(element, cssClasses) {
        if (cssClasses && element.setAttribute) {
            var existingClasses = (" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            forEach(cssClasses.split(" "), function (cssClass) {
                cssClass = trim(cssClass), -1 === existingClasses.indexOf(" " + cssClass + " ") && (existingClasses += cssClass + " ")
            }), element.setAttribute("class", trim(existingClasses))
        }
    }

    function jqLiteAddNodes(root, elements) {
        if (elements)if (elements.nodeType)root[root.length++] = elements; else {
            var length = elements.length;
            if ("number" == typeof length && elements.window !== elements) {
                if (length)for (var i = 0; length > i; i++)root[root.length++] = elements[i]
            } else root[root.length++] = elements
        }
    }

    function jqLiteController(element, name) {
        return jqLiteInheritedData(element, "$" + (name || "ngController") + "Controller")
    }

    function jqLiteInheritedData(element, name, value) {
        element.nodeType == NODE_TYPE_DOCUMENT && (element = element.documentElement);
        for (var names = isArray(name) ? name : [name]; element;) {
            for (var i = 0, ii = names.length; ii > i; i++)if (isDefined(value = jqLite.data(element, names[i])))return value;
            element = element.parentNode || element.nodeType === NODE_TYPE_DOCUMENT_FRAGMENT && element.host
        }
    }

    function jqLiteEmpty(element) {
        for (jqLiteDealoc(element, !0); element.firstChild;)element.removeChild(element.firstChild)
    }

    function jqLiteRemove(element, keepData) {
        keepData || jqLiteDealoc(element);
        var parent = element.parentNode;
        parent && parent.removeChild(element)
    }

    function jqLiteDocumentLoaded(action, win) {
        win = win || window, "complete" === win.document.readyState ? win.setTimeout(action) : jqLite(win).on("load", action)
    }

    function getBooleanAttrName(element, name) {
        var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];
        return booleanAttr && BOOLEAN_ELEMENTS[nodeName_(element)] && booleanAttr
    }

    function getAliasedAttrName(name) {
        return ALIASED_ATTR[name]
    }

    function createEventHandler(element, events) {
        var eventHandler = function (event, type) {
            event.isDefaultPrevented = function () {
                return event.defaultPrevented
            };
            var eventFns = events[type || event.type], eventFnsLength = eventFns ? eventFns.length : 0;
            if (eventFnsLength) {
                if (isUndefined(event.immediatePropagationStopped)) {
                    var originalStopImmediatePropagation = event.stopImmediatePropagation;
                    event.stopImmediatePropagation = function () {
                        event.immediatePropagationStopped = !0, event.stopPropagation && event.stopPropagation(), originalStopImmediatePropagation && originalStopImmediatePropagation.call(event)
                    }
                }
                event.isImmediatePropagationStopped = function () {
                    return event.immediatePropagationStopped === !0
                };
                var handlerWrapper = eventFns.specialHandlerWrapper || defaultHandlerWrapper;
                eventFnsLength > 1 && (eventFns = shallowCopy(eventFns));
                for (var i = 0; eventFnsLength > i; i++)event.isImmediatePropagationStopped() || handlerWrapper(element, event, eventFns[i])
            }
        };
        return eventHandler.elem = element, eventHandler
    }

    function defaultHandlerWrapper(element, event, handler) {
        handler.call(element, event)
    }

    function specialMouseHandlerWrapper(target, event, handler) {
        var related = event.relatedTarget;
        related && (related === target || jqLiteContains.call(target, related)) || handler.call(target, event)
    }

    function $$jqLiteProvider() {
        this.$get = function () {
            return extend(JQLite, {
                hasClass: function (node, classes) {
                    return node.attr && (node = node[0]), jqLiteHasClass(node, classes)
                }, addClass: function (node, classes) {
                    return node.attr && (node = node[0]), jqLiteAddClass(node, classes)
                }, removeClass: function (node, classes) {
                    return node.attr && (node = node[0]), jqLiteRemoveClass(node, classes)
                }
            })
        }
    }

    function hashKey(obj, nextUidFn) {
        var key = obj && obj.$$hashKey;
        if (key)return "function" == typeof key && (key = obj.$$hashKey()), key;
        var objType = typeof obj;
        return key = "function" == objType || "object" == objType && null !== obj ? obj.$$hashKey = objType + ":" + (nextUidFn || nextUid)() : objType + ":" + obj
    }

    function HashMap(array, isolatedUid) {
        if (isolatedUid) {
            var uid = 0;
            this.nextUid = function () {
                return ++uid
            }
        }
        forEach(array, this.put, this)
    }

    function extractArgs(fn) {
        var fnText = fn.toString().replace(STRIP_COMMENTS, ""), args = fnText.match(ARROW_ARG) || fnText.match(FN_ARGS);
        return args
    }

    function anonFn(fn) {
        var args = extractArgs(fn);
        return args ? "function(" + (args[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn"
    }

    function annotate(fn, strictDi, name) {
        var $inject, argDecl, last;
        if ("function" == typeof fn) {
            if (!($inject = fn.$inject)) {
                if ($inject = [], fn.length) {
                    if (strictDi)throw isString(name) && name || (name = fn.name || anonFn(fn)), $injectorMinErr("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", name);
                    argDecl = extractArgs(fn), forEach(argDecl[1].split(FN_ARG_SPLIT), function (arg) {
                        arg.replace(FN_ARG, function (all, underscore, name) {
                            $inject.push(name)
                        })
                    })
                }
                fn.$inject = $inject
            }
        } else isArray(fn) ? (last = fn.length - 1, assertArgFn(fn[last], "fn"), $inject = fn.slice(0, last)) : assertArgFn(fn, "fn", !0);
        return $inject
    }

    function createInjector(modulesToLoad, strictDi) {
        function supportObject(delegate) {
            return function (key, value) {
                return isObject(key) ? void forEach(key, reverseParams(delegate)) : delegate(key, value)
            }
        }

        function provider(name, provider_) {
            if (assertNotHasOwnProperty(name, "service"), (isFunction(provider_) || isArray(provider_)) && (provider_ = providerInjector.instantiate(provider_)), !provider_.$get)throw $injectorMinErr("pget", "Provider '{0}' must define $get factory method.", name);
            return providerCache[name + providerSuffix] = provider_
        }

        function enforceReturnValue(name, factory) {
            return function () {
                var result = instanceInjector.invoke(factory, this);
                if (isUndefined(result))throw $injectorMinErr("undef", "Provider '{0}' must return a value from $get factory method.", name);
                return result
            }
        }

        function factory(name, factoryFn, enforce) {
            return provider(name, {$get: enforce !== !1 ? enforceReturnValue(name, factoryFn) : factoryFn})
        }

        function service(name, constructor) {
            return factory(name, ["$injector", function ($injector) {
                return $injector.instantiate(constructor)
            }])
        }

        function value(name, val) {
            return factory(name, valueFn(val), !1)
        }

        function constant(name, value) {
            assertNotHasOwnProperty(name, "constant"), providerCache[name] = value, instanceCache[name] = value
        }

        function decorator(serviceName, decorFn) {
            var origProvider = providerInjector.get(serviceName + providerSuffix), orig$get = origProvider.$get;
            origProvider.$get = function () {
                var origInstance = instanceInjector.invoke(orig$get, origProvider);
                return instanceInjector.invoke(decorFn, null, {$delegate: origInstance})
            }
        }

        function loadModules(modulesToLoad) {
            assertArg(isUndefined(modulesToLoad) || isArray(modulesToLoad), "modulesToLoad", "not an array");
            var moduleFn, runBlocks = [];
            return forEach(modulesToLoad, function (module) {
                function runInvokeQueue(queue) {
                    var i, ii;
                    for (i = 0, ii = queue.length; ii > i; i++) {
                        var invokeArgs = queue[i], provider = providerInjector.get(invokeArgs[0]);
                        provider[invokeArgs[1]].apply(provider, invokeArgs[2])
                    }
                }

                if (!loadedModules.get(module)) {
                    loadedModules.put(module, !0);
                    try {
                        isString(module) ? (moduleFn = angularModule(module), runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks), runInvokeQueue(moduleFn._invokeQueue), runInvokeQueue(moduleFn._configBlocks)) : isFunction(module) ? runBlocks.push(providerInjector.invoke(module)) : isArray(module) ? runBlocks.push(providerInjector.invoke(module)) : assertArgFn(module, "module")
                    } catch (e) {
                        throw isArray(module) && (module = module[module.length - 1]), e.message && e.stack && -1 == e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), $injectorMinErr("modulerr", "Failed to instantiate module {0} due to:\n{1}", module, e.stack || e.message || e)
                    }
                }
            }), runBlocks
        }

        function createInternalInjector(cache, factory) {
            function getService(serviceName, caller) {
                if (cache.hasOwnProperty(serviceName)) {
                    if (cache[serviceName] === INSTANTIATING)throw $injectorMinErr("cdep", "Circular dependency found: {0}", serviceName + " <- " + path.join(" <- "));
                    return cache[serviceName]
                }
                try {
                    return path.unshift(serviceName), cache[serviceName] = INSTANTIATING, cache[serviceName] = factory(serviceName, caller)
                } catch (err) {
                    throw cache[serviceName] === INSTANTIATING && delete cache[serviceName], err
                } finally {
                    path.shift()
                }
            }

            function injectionArgs(fn, locals, serviceName) {
                for (var args = [], $inject = createInjector.$$annotate(fn, strictDi, serviceName), i = 0, length = $inject.length; length > i; i++) {
                    var key = $inject[i];
                    if ("string" != typeof key)throw $injectorMinErr("itkn", "Incorrect injection token! Expected service name as string, got {0}", key);
                    args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key, serviceName))
                }
                return args
            }

            function isClass(func) {
                return 11 >= msie ? !1 : "function" == typeof func && /^(?:class\s|constructor\()/.test(Function.prototype.toString.call(func))
            }

            function invoke(fn, self, locals, serviceName) {
                "string" == typeof locals && (serviceName = locals, locals = null);
                var args = injectionArgs(fn, locals, serviceName);
                return isArray(fn) && (fn = fn[fn.length - 1]), isClass(fn) ? (args.unshift(null), new (Function.prototype.bind.apply(fn, args))) : fn.apply(self, args)
            }

            function instantiate(Type, locals, serviceName) {
                var ctor = isArray(Type) ? Type[Type.length - 1] : Type, args = injectionArgs(Type, locals, serviceName);
                return args.unshift(null), new (Function.prototype.bind.apply(ctor, args))
            }

            return {
                invoke: invoke,
                instantiate: instantiate,
                get: getService,
                annotate: createInjector.$$annotate,
                has: function (name) {
                    return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name)
                }
            }
        }

        strictDi = strictDi === !0;
        var INSTANTIATING = {}, providerSuffix = "Provider", path = [], loadedModules = new HashMap([], !0), providerCache = {
            $provide: {
                provider: supportObject(provider),
                factory: supportObject(factory),
                service: supportObject(service),
                value: supportObject(value),
                constant: supportObject(constant),
                decorator: decorator
            }
        }, providerInjector = providerCache.$injector = createInternalInjector(providerCache, function (serviceName, caller) {
            throw angular.isString(caller) && path.push(caller), $injectorMinErr("unpr", "Unknown provider: {0}", path.join(" <- "))
        }), instanceCache = {}, protoInstanceInjector = createInternalInjector(instanceCache, function (serviceName, caller) {
            var provider = providerInjector.get(serviceName + providerSuffix, caller);
            return instanceInjector.invoke(provider.$get, provider, undefined, serviceName)
        }), instanceInjector = protoInstanceInjector;
        providerCache["$injector" + providerSuffix] = {$get: valueFn(protoInstanceInjector)};
        var runBlocks = loadModules(modulesToLoad);
        return instanceInjector = protoInstanceInjector.get("$injector"), instanceInjector.strictDi = strictDi, forEach(runBlocks, function (fn) {
            fn && instanceInjector.invoke(fn)
        }), instanceInjector
    }

    function $AnchorScrollProvider() {
        var autoScrollingEnabled = !0;
        this.disableAutoScrolling = function () {
            autoScrollingEnabled = !1
        }, this.$get = ["$window", "$location", "$rootScope", function ($window, $location, $rootScope) {
            function getFirstAnchor(list) {
                var result = null;
                return Array.prototype.some.call(list, function (element) {
                    return "a" === nodeName_(element) ? (result = element, !0) : void 0
                }), result
            }

            function getYOffset() {
                var offset = scroll.yOffset;
                if (isFunction(offset))offset = offset(); else if (isElement(offset)) {
                    var elem = offset[0], style = $window.getComputedStyle(elem);
                    offset = "fixed" !== style.position ? 0 : elem.getBoundingClientRect().bottom
                } else isNumber(offset) || (offset = 0);
                return offset
            }

            function scrollTo(elem) {
                if (elem) {
                    elem.scrollIntoView();
                    var offset = getYOffset();
                    if (offset) {
                        var elemTop = elem.getBoundingClientRect().top;
                        $window.scrollBy(0, elemTop - offset)
                    }
                } else $window.scrollTo(0, 0)
            }

            function scroll(hash) {
                hash = isString(hash) ? hash : $location.hash();
                var elm;
                hash ? (elm = document.getElementById(hash)) ? scrollTo(elm) : (elm = getFirstAnchor(document.getElementsByName(hash))) ? scrollTo(elm) : "top" === hash && scrollTo(null) : scrollTo(null)
            }

            var document = $window.document;
            return autoScrollingEnabled && $rootScope.$watch(function () {
                return $location.hash()
            }, function (newVal, oldVal) {
                newVal === oldVal && "" === newVal || jqLiteDocumentLoaded(function () {
                    $rootScope.$evalAsync(scroll)
                })
            }), scroll
        }]
    }

    function mergeClasses(a, b) {
        return a || b ? a ? b ? (isArray(a) && (a = a.join(" ")), isArray(b) && (b = b.join(" ")), a + " " + b) : a : b : ""
    }

    function extractElementNode(element) {
        for (var i = 0; i < element.length; i++) {
            var elm = element[i];
            if (elm.nodeType === ELEMENT_NODE)return elm
        }
    }

    function splitClasses(classes) {
        isString(classes) && (classes = classes.split(" "));
        var obj = createMap();
        return forEach(classes, function (klass) {
            klass.length && (obj[klass] = !0)
        }), obj
    }

    function prepareAnimateOptions(options) {
        return isObject(options) ? options : {}
    }

    function Browser(window, document, $log, $sniffer) {
        function completeOutstandingRequest(fn) {
            try {
                fn.apply(null, sliceArgs(arguments, 1))
            } finally {
                if (outstandingRequestCount--, 0 === outstandingRequestCount)for (; outstandingRequestCallbacks.length;)try {
                    outstandingRequestCallbacks.pop()()
                } catch (e) {
                    $log.error(e)
                }
            }
        }

        function getHash(url) {
            var index = url.indexOf("#");
            return -1 === index ? "" : url.substr(index)
        }

        function cacheStateAndFireUrlChange() {
            pendingLocation = null, cacheState(), fireUrlChange()
        }

        function getCurrentState() {
            try {
                return history.state
            } catch (e) {
            }
        }

        function cacheState() {
            cachedState = getCurrentState(), cachedState = isUndefined(cachedState) ? null : cachedState, equals(cachedState, lastCachedState) && (cachedState = lastCachedState), lastCachedState = cachedState
        }

        function fireUrlChange() {
            lastBrowserUrl === self.url() && lastHistoryState === cachedState || (lastBrowserUrl = self.url(), lastHistoryState = cachedState, forEach(urlChangeListeners, function (listener) {
                listener(self.url(), cachedState)
            }))
        }

        var self = this, location = (document[0], window.location), history = window.history, setTimeout = window.setTimeout, clearTimeout = window.clearTimeout, pendingDeferIds = {};
        self.isMock = !1;
        var outstandingRequestCount = 0, outstandingRequestCallbacks = [];
        self.$$completeOutstandingRequest = completeOutstandingRequest, self.$$incOutstandingRequestCount = function () {
            outstandingRequestCount++
        }, self.notifyWhenNoOutstandingRequests = function (callback) {
            0 === outstandingRequestCount ? callback() : outstandingRequestCallbacks.push(callback)
        };
        var cachedState, lastHistoryState, lastBrowserUrl = location.href, baseElement = document.find("base"), pendingLocation = null;
        cacheState(), lastHistoryState = cachedState, self.url = function (url, replace, state) {
            if (isUndefined(state) && (state = null), location !== window.location && (location = window.location), history !== window.history && (history = window.history), url) {
                var sameState = lastHistoryState === state;
                if (lastBrowserUrl === url && (!$sniffer.history || sameState))return self;
                var sameBase = lastBrowserUrl && stripHash(lastBrowserUrl) === stripHash(url);
                return lastBrowserUrl = url, lastHistoryState = state, !$sniffer.history || sameBase && sameState ? (sameBase && !pendingLocation || (pendingLocation = url), replace ? location.replace(url) : sameBase ? location.hash = getHash(url) : location.href = url, location.href !== url && (pendingLocation = url)) : (history[replace ? "replaceState" : "pushState"](state, "", url), cacheState(), lastHistoryState = cachedState), self
            }
            return pendingLocation || location.href.replace(/%27/g, "'")
        }, self.state = function () {
            return cachedState
        };
        var urlChangeListeners = [], urlChangeInit = !1, lastCachedState = null;
        self.onUrlChange = function (callback) {
            return urlChangeInit || ($sniffer.history && jqLite(window).on("popstate", cacheStateAndFireUrlChange), jqLite(window).on("hashchange", cacheStateAndFireUrlChange), urlChangeInit = !0), urlChangeListeners.push(callback), callback
        }, self.$$applicationDestroyed = function () {
            jqLite(window).off("hashchange popstate", cacheStateAndFireUrlChange)
        }, self.$$checkUrlChange = fireUrlChange, self.baseHref = function () {
            var href = baseElement.attr("href");
            return href ? href.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
        }, self.defer = function (fn, delay) {
            var timeoutId;
            return outstandingRequestCount++, timeoutId = setTimeout(function () {
                delete pendingDeferIds[timeoutId], completeOutstandingRequest(fn)
            }, delay || 0), pendingDeferIds[timeoutId] = !0, timeoutId
        }, self.defer.cancel = function (deferId) {
            return pendingDeferIds[deferId] ? (delete pendingDeferIds[deferId], clearTimeout(deferId), completeOutstandingRequest(noop), !0) : !1
        }
    }

    function $BrowserProvider() {
        this.$get = ["$window", "$log", "$sniffer", "$document", function ($window, $log, $sniffer, $document) {
            return new Browser($window, $document, $log, $sniffer)
        }]
    }

    function $CacheFactoryProvider() {
        this.$get = function () {
            function cacheFactory(cacheId, options) {
                function refresh(entry) {
                    entry != freshEnd && (staleEnd ? staleEnd == entry && (staleEnd = entry.n) : staleEnd = entry, link(entry.n, entry.p), link(entry, freshEnd), freshEnd = entry, freshEnd.n = null)
                }

                function link(nextEntry, prevEntry) {
                    nextEntry != prevEntry && (nextEntry && (nextEntry.p = prevEntry), prevEntry && (prevEntry.n = nextEntry))
                }

                if (cacheId in caches)throw minErr("$cacheFactory")("iid", "CacheId '{0}' is already taken!", cacheId);
                var size = 0, stats = extend({}, options, {id: cacheId}), data = createMap(), capacity = options && options.capacity || Number.MAX_VALUE, lruHash = createMap(), freshEnd = null, staleEnd = null;
                return caches[cacheId] = {
                    put: function (key, value) {
                        if (!isUndefined(value)) {
                            if (capacity < Number.MAX_VALUE) {
                                var lruEntry = lruHash[key] || (lruHash[key] = {key: key});
                                refresh(lruEntry)
                            }
                            return key in data || size++, data[key] = value, size > capacity && this.remove(staleEnd.key), value
                        }
                    }, get: function (key) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key];
                            if (!lruEntry)return;
                            refresh(lruEntry)
                        }
                        return data[key]
                    }, remove: function (key) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key];
                            if (!lruEntry)return;
                            lruEntry == freshEnd && (freshEnd = lruEntry.p), lruEntry == staleEnd && (staleEnd = lruEntry.n), link(lruEntry.n, lruEntry.p), delete lruHash[key]
                        }
                        key in data && (delete data[key], size--)
                    }, removeAll: function () {
                        data = createMap(), size = 0, lruHash = createMap(), freshEnd = staleEnd = null
                    }, destroy: function () {
                        data = null, stats = null, lruHash = null, delete caches[cacheId]
                    }, info: function () {
                        return extend({}, stats, {size: size})
                    }
                }
            }

            var caches = {};
            return cacheFactory.info = function () {
                var info = {};
                return forEach(caches, function (cache, cacheId) {
                    info[cacheId] = cache.info()
                }), info
            }, cacheFactory.get = function (cacheId) {
                return caches[cacheId]
            }, cacheFactory
        }
    }

    function $TemplateCacheProvider() {
        this.$get = ["$cacheFactory", function ($cacheFactory) {
            return $cacheFactory("templates")
        }]
    }

    function $CompileProvider($provide, $$sanitizeUriProvider) {
        function parseIsolateBindings(scope, directiveName, isController) {
            var LOCAL_REGEXP = /^\s*([@&<]|=(\*?))(\??)\s*(\w*)\s*$/, bindings = {};
            return forEach(scope, function (definition, scopeName) {
                var match = definition.match(LOCAL_REGEXP);
                if (!match)throw $compileMinErr("iscp", "Invalid {3} for directive '{0}'. Definition: {... {1}: '{2}' ...}", directiveName, scopeName, definition, isController ? "controller bindings definition" : "isolate scope definition");
                bindings[scopeName] = {
                    mode: match[1][0],
                    collection: "*" === match[2],
                    optional: "?" === match[3],
                    attrName: match[4] || scopeName
                }
            }), bindings
        }

        function parseDirectiveBindings(directive, directiveName) {
            var bindings = {isolateScope: null, bindToController: null};
            if (isObject(directive.scope) && (directive.bindToController === !0 ? (bindings.bindToController = parseIsolateBindings(directive.scope, directiveName, !0), bindings.isolateScope = {}) : bindings.isolateScope = parseIsolateBindings(directive.scope, directiveName, !1)), isObject(directive.bindToController) && (bindings.bindToController = parseIsolateBindings(directive.bindToController, directiveName, !0)), isObject(bindings.bindToController)) {
                var controller = directive.controller, controllerAs = directive.controllerAs;
                if (!controller)throw $compileMinErr("noctrl", "Cannot bind to controller without directive '{0}'s controller.", directiveName);
                if (!identifierForController(controller, controllerAs))throw $compileMinErr("noident", "Cannot bind to controller without identifier for directive '{0}'.", directiveName)
            }
            return bindings
        }

        function assertValidDirectiveName(name) {
            var letter = name.charAt(0);
            if (!letter || letter !== lowercase(letter))throw $compileMinErr("baddir", "Directive name '{0}' is invalid. The first character must be a lowercase letter", name);
            if (name !== name.trim())throw $compileMinErr("baddir", "Directive name '{0}' is invalid. The name should not contain leading or trailing whitespaces", name)
        }

        var hasDirectives = {}, Suffix = "Directive", COMMENT_DIRECTIVE_REGEXP = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/, CLASS_DIRECTIVE_REGEXP = /(([\w\-]+)(?:\:([^;]+))?;?)/, ALL_OR_NOTHING_ATTRS = makeMap("ngSrc,ngSrcset,src,srcset"), REQUIRE_PREFIX_REGEXP = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/, EVENT_HANDLER_ATTR_REGEXP = /^(on[a-z]+|formaction)$/;
        this.directive = function registerDirective(name, directiveFactory) {
            return assertNotHasOwnProperty(name, "directive"), isString(name) ? (assertValidDirectiveName(name), assertArg(directiveFactory, "directiveFactory"), hasDirectives.hasOwnProperty(name) || (hasDirectives[name] = [], $provide.factory(name + Suffix, ["$injector", "$exceptionHandler", function ($injector, $exceptionHandler) {
                var directives = [];
                return forEach(hasDirectives[name], function (directiveFactory, index) {
                    try {
                        var directive = $injector.invoke(directiveFactory);
                        isFunction(directive) ? directive = {compile: valueFn(directive)} : !directive.compile && directive.link && (directive.compile = valueFn(directive.link)), directive.priority = directive.priority || 0, directive.index = index, directive.name = directive.name || name, directive.require = directive.require || directive.controller && directive.name, directive.restrict = directive.restrict || "EA";
                        var bindings = directive.$$bindings = parseDirectiveBindings(directive, directive.name);
                        isObject(bindings.isolateScope) && (directive.$$isolateBindings = bindings.isolateScope), directive.$$moduleName = directiveFactory.$$moduleName, directives.push(directive)
                    } catch (e) {
                        $exceptionHandler(e)
                    }
                }), directives
            }])), hasDirectives[name].push(directiveFactory)) : forEach(name, reverseParams(registerDirective)), this
        }, this.component = function (name, options) {
            function factory($injector) {
                function makeInjectable(fn) {
                    return isFunction(fn) || isArray(fn) ? function (tElement, tAttrs) {
                        return $injector.invoke(fn, this, {$element: tElement, $attrs: tAttrs})
                    } : fn
                }

                var template = options.template || options.templateUrl ? options.template : "";
                return {
                    controller: controller,
                    controllerAs: identifierForController(options.controller) || options.controllerAs || "$ctrl",
                    template: makeInjectable(template),
                    templateUrl: makeInjectable(options.templateUrl),
                    transclude: options.transclude,
                    scope: {},
                    bindToController: options.bindings || {},
                    restrict: "E",
                    require: options.require
                }
            }

            var controller = options.controller || function () {
                };
            return forEach(options, function (val, key) {
                "$" === key.charAt(0) && (factory[key] = val)
            }), factory.$inject = ["$injector"], this.directive(name, factory)
        }, this.aHrefSanitizationWhitelist = function (regexp) {
            return isDefined(regexp) ? ($$sanitizeUriProvider.aHrefSanitizationWhitelist(regexp), this) : $$sanitizeUriProvider.aHrefSanitizationWhitelist()
        }, this.imgSrcSanitizationWhitelist = function (regexp) {
            return isDefined(regexp) ? ($$sanitizeUriProvider.imgSrcSanitizationWhitelist(regexp), this) : $$sanitizeUriProvider.imgSrcSanitizationWhitelist()
        };
        var debugInfoEnabled = !0;
        this.debugInfoEnabled = function (enabled) {
            return isDefined(enabled) ? (debugInfoEnabled = enabled, this) : debugInfoEnabled
        }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$sce", "$animate", "$$sanitizeUri", function ($injector, $interpolate, $exceptionHandler, $templateRequest, $parse, $controller, $rootScope, $sce, $animate, $$sanitizeUri) {
            function setSpecialAttr(element, attrName, value) {
                specialAttrHolder.innerHTML = "<span " + attrName + ">";
                var attributes = specialAttrHolder.firstChild.attributes, attribute = attributes[0];
                attributes.removeNamedItem(attribute.name), attribute.value = value, element.attributes.setNamedItem(attribute)
            }

            function safeAddClass($element, className) {
                try {
                    $element.addClass(className)
                } catch (e) {
                }
            }

            function compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext) {
                $compileNodes instanceof jqLite || ($compileNodes = jqLite($compileNodes));
                for (var NOT_EMPTY = /\S+/, i = 0, len = $compileNodes.length; len > i; i++) {
                    var domNode = $compileNodes[i];
                    domNode.nodeType === NODE_TYPE_TEXT && domNode.nodeValue.match(NOT_EMPTY) && jqLiteWrapNode(domNode, $compileNodes[i] = document.createElement("span"))
                }
                var compositeLinkFn = compileNodes($compileNodes, transcludeFn, $compileNodes, maxPriority, ignoreDirective, previousCompileContext);
                compile.$$addScopeClass($compileNodes);
                var namespace = null;
                return function (scope, cloneConnectFn, options) {
                    assertArg(scope, "scope"), previousCompileContext && previousCompileContext.needsNewScope && (scope = scope.$parent.$new()), options = options || {};
                    var parentBoundTranscludeFn = options.parentBoundTranscludeFn, transcludeControllers = options.transcludeControllers, futureParentElement = options.futureParentElement;
                    parentBoundTranscludeFn && parentBoundTranscludeFn.$$boundTransclude && (parentBoundTranscludeFn = parentBoundTranscludeFn.$$boundTransclude), namespace || (namespace = detectNamespaceForChildElements(futureParentElement));
                    var $linkNode;
                    if ($linkNode = "html" !== namespace ? jqLite(wrapTemplate(namespace, jqLite("<div>").append($compileNodes).html())) : cloneConnectFn ? JQLitePrototype.clone.call($compileNodes) : $compileNodes, transcludeControllers)for (var controllerName in transcludeControllers)$linkNode.data("$" + controllerName + "Controller", transcludeControllers[controllerName].instance);
                    return compile.$$addScopeInfo($linkNode, scope), cloneConnectFn && cloneConnectFn($linkNode, scope), compositeLinkFn && compositeLinkFn(scope, $linkNode, $linkNode, parentBoundTranscludeFn), $linkNode
                }
            }

            function detectNamespaceForChildElements(parentElement) {
                var node = parentElement && parentElement[0];
                return node && "foreignobject" !== nodeName_(node) && toString.call(node).match(/SVG/) ? "svg" : "html"
            }

            function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority, ignoreDirective, previousCompileContext) {
                function compositeLinkFn(scope, nodeList, $rootElement, parentBoundTranscludeFn) {
                    var nodeLinkFn, childLinkFn, node, childScope, i, ii, idx, childBoundTranscludeFn, stableNodeList;
                    if (nodeLinkFnFound) {
                        var nodeListLength = nodeList.length;
                        for (stableNodeList = new Array(nodeListLength), i = 0; i < linkFns.length; i += 3)idx = linkFns[i], stableNodeList[idx] = nodeList[idx]
                    } else stableNodeList = nodeList;
                    for (i = 0, ii = linkFns.length; ii > i;)node = stableNodeList[linkFns[i++]], nodeLinkFn = linkFns[i++], childLinkFn = linkFns[i++], nodeLinkFn ? (nodeLinkFn.scope ? (childScope = scope.$new(), compile.$$addScopeInfo(jqLite(node), childScope)) : childScope = scope, childBoundTranscludeFn = nodeLinkFn.transcludeOnThisElement ? createBoundTranscludeFn(scope, nodeLinkFn.transclude, parentBoundTranscludeFn) : !nodeLinkFn.templateOnThisElement && parentBoundTranscludeFn ? parentBoundTranscludeFn : !parentBoundTranscludeFn && transcludeFn ? createBoundTranscludeFn(scope, transcludeFn) : null, nodeLinkFn(childLinkFn, childScope, node, $rootElement, childBoundTranscludeFn)) : childLinkFn && childLinkFn(scope, node.childNodes, undefined, parentBoundTranscludeFn)
                }

                for (var attrs, directives, nodeLinkFn, childNodes, childLinkFn, linkFnFound, nodeLinkFnFound, linkFns = [], i = 0; i < nodeList.length; i++)attrs = new Attributes, directives = collectDirectives(nodeList[i], [], attrs, 0 === i ? maxPriority : undefined, ignoreDirective), nodeLinkFn = directives.length ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement, null, [], [], previousCompileContext) : null, nodeLinkFn && nodeLinkFn.scope && compile.$$addScopeClass(attrs.$$element), childLinkFn = nodeLinkFn && nodeLinkFn.terminal || !(childNodes = nodeList[i].childNodes) || !childNodes.length ? null : compileNodes(childNodes, nodeLinkFn ? (nodeLinkFn.transcludeOnThisElement || !nodeLinkFn.templateOnThisElement) && nodeLinkFn.transclude : transcludeFn), (nodeLinkFn || childLinkFn) && (linkFns.push(i, nodeLinkFn, childLinkFn), linkFnFound = !0, nodeLinkFnFound = nodeLinkFnFound || nodeLinkFn), previousCompileContext = null;
                return linkFnFound ? compositeLinkFn : null
            }

            function createBoundTranscludeFn(scope, transcludeFn, previousBoundTranscludeFn) {
                var boundTranscludeFn = function (transcludedScope, cloneFn, controllers, futureParentElement, containingScope) {
                    return transcludedScope || (transcludedScope = scope.$new(!1, containingScope), transcludedScope.$$transcluded = !0), transcludeFn(transcludedScope, cloneFn, {
                        parentBoundTranscludeFn: previousBoundTranscludeFn,
                        transcludeControllers: controllers,
                        futureParentElement: futureParentElement
                    })
                }, boundSlots = boundTranscludeFn.$$slots = createMap();
                for (var slotName in transcludeFn.$$slots)transcludeFn.$$slots[slotName] ? boundSlots[slotName] = createBoundTranscludeFn(scope, transcludeFn.$$slots[slotName], previousBoundTranscludeFn) : boundSlots[slotName] = null;
                return boundTranscludeFn
            }

            function collectDirectives(node, directives, attrs, maxPriority, ignoreDirective) {
                var match, className, nodeType = node.nodeType, attrsMap = attrs.$attr;
                switch (nodeType) {
                    case NODE_TYPE_ELEMENT:
                        addDirective(directives, directiveNormalize(nodeName_(node)), "E", maxPriority, ignoreDirective);
                        for (var attr, name, nName, ngAttrName, value, isNgAttr, nAttrs = node.attributes, j = 0, jj = nAttrs && nAttrs.length; jj > j; j++) {
                            var attrStartName = !1, attrEndName = !1;
                            attr = nAttrs[j], name = attr.name, value = trim(attr.value), ngAttrName = directiveNormalize(name), (isNgAttr = NG_ATTR_BINDING.test(ngAttrName)) && (name = name.replace(PREFIX_REGEXP, "").substr(8).replace(/_(.)/g, function (match, letter) {
                                return letter.toUpperCase()
                            }));
                            var multiElementMatch = ngAttrName.match(MULTI_ELEMENT_DIR_RE);
                            multiElementMatch && directiveIsMultiElement(multiElementMatch[1]) && (attrStartName = name, attrEndName = name.substr(0, name.length - 5) + "end", name = name.substr(0, name.length - 6)), nName = directiveNormalize(name.toLowerCase()), attrsMap[nName] = name, !isNgAttr && attrs.hasOwnProperty(nName) || (attrs[nName] = value, getBooleanAttrName(node, nName) && (attrs[nName] = !0)), addAttrInterpolateDirective(node, directives, value, nName, isNgAttr), addDirective(directives, nName, "A", maxPriority, ignoreDirective, attrStartName, attrEndName)
                        }
                        if (className = node.className, isObject(className) && (className = className.animVal), isString(className) && "" !== className)for (; match = CLASS_DIRECTIVE_REGEXP.exec(className);)nName = directiveNormalize(match[2]), addDirective(directives, nName, "C", maxPriority, ignoreDirective) && (attrs[nName] = trim(match[3])), className = className.substr(match.index + match[0].length);
                        break;
                    case NODE_TYPE_TEXT:
                        if (11 === msie)for (; node.parentNode && node.nextSibling && node.nextSibling.nodeType === NODE_TYPE_TEXT;)node.nodeValue = node.nodeValue + node.nextSibling.nodeValue, node.parentNode.removeChild(node.nextSibling);
                        addTextInterpolateDirective(directives, node.nodeValue);
                        break;
                    case NODE_TYPE_COMMENT:
                        try {
                            match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue), match && (nName = directiveNormalize(match[1]), addDirective(directives, nName, "M", maxPriority, ignoreDirective) && (attrs[nName] = trim(match[2])))
                        } catch (e) {
                        }
                }
                return directives.sort(byPriority), directives
            }

            function groupScan(node, attrStart, attrEnd) {
                var nodes = [], depth = 0;
                if (attrStart && node.hasAttribute && node.hasAttribute(attrStart)) {
                    do {
                        if (!node)throw $compileMinErr("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", attrStart, attrEnd);
                        node.nodeType == NODE_TYPE_ELEMENT && (node.hasAttribute(attrStart) && depth++, node.hasAttribute(attrEnd) && depth--), nodes.push(node), node = node.nextSibling
                    } while (depth > 0)
                } else nodes.push(node);
                return jqLite(nodes)
            }

            function groupElementsLinkFnWrapper(linkFn, attrStart, attrEnd) {
                return function (scope, element, attrs, controllers, transcludeFn) {
                    return element = groupScan(element[0], attrStart, attrEnd), linkFn(scope, element, attrs, controllers, transcludeFn)
                }
            }

            function compilationGenerator(eager, $compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext) {
                if (eager)return compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext);
                var compiled;
                return function () {
                    return compiled || (compiled = compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext), $compileNodes = transcludeFn = previousCompileContext = null), compiled.apply(this, arguments)
                }
            }

            function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn, jqCollection, originalReplaceDirective, preLinkFns, postLinkFns, previousCompileContext) {
                function addLinkFns(pre, post, attrStart, attrEnd) {
                    pre && (attrStart && (pre = groupElementsLinkFnWrapper(pre, attrStart, attrEnd)), pre.require = directive.require, pre.directiveName = directiveName, (newIsolateScopeDirective === directive || directive.$$isolateScope) && (pre = cloneAndAnnotateFn(pre, {isolateScope: !0})), preLinkFns.push(pre)), post && (attrStart && (post = groupElementsLinkFnWrapper(post, attrStart, attrEnd)), post.require = directive.require, post.directiveName = directiveName, (newIsolateScopeDirective === directive || directive.$$isolateScope) && (post = cloneAndAnnotateFn(post, {isolateScope: !0})), postLinkFns.push(post))
                }

                function getControllers(directiveName, require, $element, elementControllers) {
                    var value;
                    if (isString(require)) {
                        var match = require.match(REQUIRE_PREFIX_REGEXP), name = require.substring(match[0].length), inheritType = match[1] || match[3], optional = "?" === match[2];
                        if ("^^" === inheritType ? $element = $element.parent() : (value = elementControllers && elementControllers[name], value = value && value.instance), !value) {
                            var dataName = "$" + name + "Controller";
                            value = inheritType ? $element.inheritedData(dataName) : $element.data(dataName)
                        }
                        if (!value && !optional)throw $compileMinErr("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", name, directiveName)
                    } else if (isArray(require)) {
                        value = [];
                        for (var i = 0, ii = require.length; ii > i; i++)value[i] = getControllers(directiveName, require[i], $element, elementControllers)
                    } else isObject(require) && (value = {}, forEach(require, function (controller, property) {
                        value[property] = getControllers(directiveName, controller, $element, elementControllers)
                    }));
                    return value || null
                }

                function setupControllers($element, attrs, transcludeFn, controllerDirectives, isolateScope, scope) {
                    var elementControllers = createMap();
                    for (var controllerKey in controllerDirectives) {
                        var directive = controllerDirectives[controllerKey], locals = {
                            $scope: directive === newIsolateScopeDirective || directive.$$isolateScope ? isolateScope : scope,
                            $element: $element,
                            $attrs: attrs,
                            $transclude: transcludeFn
                        }, controller = directive.controller;
                        "@" == controller && (controller = attrs[directive.name]);
                        var controllerInstance = $controller(controller, locals, !0, directive.controllerAs);
                        elementControllers[directive.name] = controllerInstance, hasElementTranscludeDirective || $element.data("$" + directive.name + "Controller", controllerInstance.instance)
                    }
                    return elementControllers
                }

                function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn) {
                    function controllersBoundTransclude(scope, cloneAttachFn, futureParentElement, slotName) {
                        var transcludeControllers;
                        if (isScope(scope) || (slotName = futureParentElement, futureParentElement = cloneAttachFn, cloneAttachFn = scope, scope = undefined), hasElementTranscludeDirective && (transcludeControllers = elementControllers), futureParentElement || (futureParentElement = hasElementTranscludeDirective ? $element.parent() : $element), !slotName)return boundTranscludeFn(scope, cloneAttachFn, transcludeControllers, futureParentElement, scopeToChild);
                        var slotTranscludeFn = boundTranscludeFn.$$slots[slotName];
                        if (slotTranscludeFn)return slotTranscludeFn(scope, cloneAttachFn, transcludeControllers, futureParentElement, scopeToChild);
                        if (isUndefined(slotTranscludeFn))throw $compileMinErr("noslot", 'No parent directive that requires a transclusion with slot name "{0}". Element: {1}', slotName, startingTag($element))
                    }

                    var i, ii, linkFn, isolateScope, controllerScope, elementControllers, transcludeFn, $element, attrs, removeScopeBindingWatches, removeControllerBindingWatches;
                    compileNode === linkNode ? (attrs = templateAttrs, $element = templateAttrs.$$element) : ($element = jqLite(linkNode), attrs = new Attributes($element, templateAttrs)), controllerScope = scope, newIsolateScopeDirective ? isolateScope = scope.$new(!0) : newScopeDirective && (controllerScope = scope.$parent), boundTranscludeFn && (transcludeFn = controllersBoundTransclude, transcludeFn.$$boundTransclude = boundTranscludeFn, transcludeFn.isSlotFilled = function (slotName) {
                        return !!boundTranscludeFn.$$slots[slotName]
                    }), controllerDirectives && (elementControllers = setupControllers($element, attrs, transcludeFn, controllerDirectives, isolateScope, scope)), newIsolateScopeDirective && (compile.$$addScopeInfo($element, isolateScope, !0, !(templateDirective && (templateDirective === newIsolateScopeDirective || templateDirective === newIsolateScopeDirective.$$originalDirective))), compile.$$addScopeClass($element, !0), isolateScope.$$isolateBindings = newIsolateScopeDirective.$$isolateBindings, removeScopeBindingWatches = initializeDirectiveBindings(scope, attrs, isolateScope, isolateScope.$$isolateBindings, newIsolateScopeDirective), removeScopeBindingWatches && isolateScope.$on("$destroy", removeScopeBindingWatches));
                    for (var name in elementControllers) {
                        var controllerDirective = controllerDirectives[name], controller = elementControllers[name], bindings = controllerDirective.$$bindings.bindToController;
                        controller.identifier && bindings && (removeControllerBindingWatches = initializeDirectiveBindings(controllerScope, attrs, controller.instance, bindings, controllerDirective));
                        var controllerResult = controller();
                        controllerResult !== controller.instance && (controller.instance = controllerResult, $element.data("$" + controllerDirective.name + "Controller", controllerResult), removeControllerBindingWatches && removeControllerBindingWatches(), removeControllerBindingWatches = initializeDirectiveBindings(controllerScope, attrs, controller.instance, bindings, controllerDirective))
                    }
                    for (forEach(controllerDirectives, function (controllerDirective, name) {
                        var require = controllerDirective.require;
                        controllerDirective.bindToController && !isArray(require) && isObject(require) && extend(elementControllers[name].instance, getControllers(name, require, $element, elementControllers))
                    }), forEach(elementControllers, function (controller) {
                        isFunction(controller.instance.$onInit) && controller.instance.$onInit()
                    }), i = 0, ii = preLinkFns.length; ii > i; i++)linkFn = preLinkFns[i], invokeLinkFn(linkFn, linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn);
                    var scopeToChild = scope;
                    for (newIsolateScopeDirective && (newIsolateScopeDirective.template || null === newIsolateScopeDirective.templateUrl) && (scopeToChild = isolateScope), childLinkFn && childLinkFn(scopeToChild, linkNode.childNodes, undefined, boundTranscludeFn), i = postLinkFns.length - 1; i >= 0; i--)linkFn = postLinkFns[i], invokeLinkFn(linkFn, linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn)
                }

                previousCompileContext = previousCompileContext || {};
                for (var directive, directiveName, $template, linkFn, directiveValue, terminalPriority = -Number.MAX_VALUE, newScopeDirective = previousCompileContext.newScopeDirective, controllerDirectives = previousCompileContext.controllerDirectives, newIsolateScopeDirective = previousCompileContext.newIsolateScopeDirective, templateDirective = previousCompileContext.templateDirective, nonTlbTranscludeDirective = previousCompileContext.nonTlbTranscludeDirective, hasTranscludeDirective = !1, hasTemplate = !1, hasElementTranscludeDirective = previousCompileContext.hasElementTranscludeDirective, $compileNode = templateAttrs.$$element = jqLite(compileNode), replaceDirective = originalReplaceDirective, childTranscludeFn = transcludeFn, didScanForMultipleTransclusion = !1, mightHaveMultipleTransclusionError = !1, i = 0, ii = directives.length; ii > i; i++) {
                    directive = directives[i];
                    var attrStart = directive.$$start, attrEnd = directive.$$end;
                    if (attrStart && ($compileNode = groupScan(compileNode, attrStart, attrEnd)), $template = undefined, terminalPriority > directive.priority)break;
                    if ((directiveValue = directive.scope) && (directive.templateUrl || (isObject(directiveValue) ? (assertNoDuplicate("new/isolated scope", newIsolateScopeDirective || newScopeDirective, directive, $compileNode),
                            newIsolateScopeDirective = directive) : assertNoDuplicate("new/isolated scope", newIsolateScopeDirective, directive, $compileNode)), newScopeDirective = newScopeDirective || directive), directiveName = directive.name, !didScanForMultipleTransclusion && (directive.replace && (directive.templateUrl || directive.template) || directive.transclude && !directive.$$tlb)) {
                        for (var candidateDirective, scanningIndex = i + 1; candidateDirective = directives[scanningIndex++];)if (candidateDirective.transclude && !candidateDirective.$$tlb || candidateDirective.replace && (candidateDirective.templateUrl || candidateDirective.template)) {
                            mightHaveMultipleTransclusionError = !0;
                            break
                        }
                        didScanForMultipleTransclusion = !0
                    }
                    if (!directive.templateUrl && directive.controller && (directiveValue = directive.controller, controllerDirectives = controllerDirectives || createMap(), assertNoDuplicate("'" + directiveName + "' controller", controllerDirectives[directiveName], directive, $compileNode), controllerDirectives[directiveName] = directive), directiveValue = directive.transclude)if (hasTranscludeDirective = !0, directive.$$tlb || (assertNoDuplicate("transclusion", nonTlbTranscludeDirective, directive, $compileNode), nonTlbTranscludeDirective = directive), "element" == directiveValue)hasElementTranscludeDirective = !0, terminalPriority = directive.priority, $template = $compileNode, $compileNode = templateAttrs.$$element = jqLite(document.createComment(" " + directiveName + ": " + templateAttrs[directiveName] + " ")), compileNode = $compileNode[0], replaceWith(jqCollection, sliceArgs($template), compileNode), childTranscludeFn = compilationGenerator(mightHaveMultipleTransclusionError, $template, transcludeFn, terminalPriority, replaceDirective && replaceDirective.name, {nonTlbTranscludeDirective: nonTlbTranscludeDirective}); else {
                        var slots = createMap();
                        if ($template = jqLite(jqLiteClone(compileNode)).contents(), isObject(directiveValue)) {
                            $template = [];
                            var slotMap = createMap(), filledSlots = createMap();
                            forEach(directiveValue, function (elementSelector, slotName) {
                                var optional = "?" === elementSelector.charAt(0);
                                elementSelector = optional ? elementSelector.substring(1) : elementSelector, slotMap[elementSelector] = slotName, slots[slotName] = null, filledSlots[slotName] = optional
                            }), forEach($compileNode.contents(), function (node) {
                                var slotName = slotMap[directiveNormalize(nodeName_(node))];
                                slotName ? (filledSlots[slotName] = !0, slots[slotName] = slots[slotName] || [], slots[slotName].push(node)) : $template.push(node)
                            }), forEach(filledSlots, function (filled, slotName) {
                                if (!filled)throw $compileMinErr("reqslot", "Required transclusion slot `{0}` was not filled.", slotName)
                            });
                            for (var slotName in slots)slots[slotName] && (slots[slotName] = compilationGenerator(mightHaveMultipleTransclusionError, slots[slotName], transcludeFn))
                        }
                        $compileNode.empty(), childTranscludeFn = compilationGenerator(mightHaveMultipleTransclusionError, $template, transcludeFn, undefined, undefined, {needsNewScope: directive.$$isolateScope || directive.$$newScope}), childTranscludeFn.$$slots = slots
                    }
                    if (directive.template)if (hasTemplate = !0, assertNoDuplicate("template", templateDirective, directive, $compileNode), templateDirective = directive, directiveValue = isFunction(directive.template) ? directive.template($compileNode, templateAttrs) : directive.template, directiveValue = denormalizeTemplate(directiveValue), directive.replace) {
                        if (replaceDirective = directive, $template = jqLiteIsTextNode(directiveValue) ? [] : removeComments(wrapTemplate(directive.templateNamespace, trim(directiveValue))), compileNode = $template[0], 1 != $template.length || compileNode.nodeType !== NODE_TYPE_ELEMENT)throw $compileMinErr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", directiveName, "");
                        replaceWith(jqCollection, $compileNode, compileNode);
                        var newTemplateAttrs = {$attr: {}}, templateDirectives = collectDirectives(compileNode, [], newTemplateAttrs), unprocessedDirectives = directives.splice(i + 1, directives.length - (i + 1));
                        (newIsolateScopeDirective || newScopeDirective) && markDirectiveScope(templateDirectives, newIsolateScopeDirective, newScopeDirective), directives = directives.concat(templateDirectives).concat(unprocessedDirectives), mergeTemplateAttributes(templateAttrs, newTemplateAttrs), ii = directives.length
                    } else $compileNode.html(directiveValue);
                    if (directive.templateUrl)hasTemplate = !0, assertNoDuplicate("template", templateDirective, directive, $compileNode), templateDirective = directive, directive.replace && (replaceDirective = directive), nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), $compileNode, templateAttrs, jqCollection, hasTranscludeDirective && childTranscludeFn, preLinkFns, postLinkFns, {
                        controllerDirectives: controllerDirectives,
                        newScopeDirective: newScopeDirective !== directive && newScopeDirective,
                        newIsolateScopeDirective: newIsolateScopeDirective,
                        templateDirective: templateDirective,
                        nonTlbTranscludeDirective: nonTlbTranscludeDirective
                    }), ii = directives.length; else if (directive.compile)try {
                        linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn), isFunction(linkFn) ? addLinkFns(null, linkFn, attrStart, attrEnd) : linkFn && addLinkFns(linkFn.pre, linkFn.post, attrStart, attrEnd)
                    } catch (e) {
                        $exceptionHandler(e, startingTag($compileNode))
                    }
                    directive.terminal && (nodeLinkFn.terminal = !0, terminalPriority = Math.max(terminalPriority, directive.priority))
                }
                return nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope === !0, nodeLinkFn.transcludeOnThisElement = hasTranscludeDirective, nodeLinkFn.templateOnThisElement = hasTemplate, nodeLinkFn.transclude = childTranscludeFn, previousCompileContext.hasElementTranscludeDirective = hasElementTranscludeDirective, nodeLinkFn
            }

            function markDirectiveScope(directives, isolateScope, newScope) {
                for (var j = 0, jj = directives.length; jj > j; j++)directives[j] = inherit(directives[j], {
                    $$isolateScope: isolateScope,
                    $$newScope: newScope
                })
            }

            function addDirective(tDirectives, name, location, maxPriority, ignoreDirective, startAttrName, endAttrName) {
                if (name === ignoreDirective)return null;
                var match = null;
                if (hasDirectives.hasOwnProperty(name))for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; ii > i; i++)try {
                    directive = directives[i], (isUndefined(maxPriority) || maxPriority > directive.priority) && -1 != directive.restrict.indexOf(location) && (startAttrName && (directive = inherit(directive, {
                        $$start: startAttrName,
                        $$end: endAttrName
                    })), tDirectives.push(directive), match = directive)
                } catch (e) {
                    $exceptionHandler(e)
                }
                return match
            }

            function directiveIsMultiElement(name) {
                if (hasDirectives.hasOwnProperty(name))for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; ii > i; i++)if (directive = directives[i], directive.multiElement)return !0;
                return !1
            }

            function mergeTemplateAttributes(dst, src) {
                var srcAttr = src.$attr, dstAttr = dst.$attr, $element = dst.$$element;
                forEach(dst, function (value, key) {
                    "$" != key.charAt(0) && (src[key] && src[key] !== value && (value += ("style" === key ? ";" : " ") + src[key]), dst.$set(key, value, !0, srcAttr[key]))
                }), forEach(src, function (value, key) {
                    "class" == key ? (safeAddClass($element, value), dst["class"] = (dst["class"] ? dst["class"] + " " : "") + value) : "style" == key ? ($element.attr("style", $element.attr("style") + ";" + value), dst.style = (dst.style ? dst.style + ";" : "") + value) : "$" == key.charAt(0) || dst.hasOwnProperty(key) || (dst[key] = value, dstAttr[key] = srcAttr[key])
                })
            }

            function compileTemplateUrl(directives, $compileNode, tAttrs, $rootElement, childTranscludeFn, preLinkFns, postLinkFns, previousCompileContext) {
                var afterTemplateNodeLinkFn, afterTemplateChildLinkFn, linkQueue = [], beforeTemplateCompileNode = $compileNode[0], origAsyncDirective = directives.shift(), derivedSyncDirective = inherit(origAsyncDirective, {
                    templateUrl: null,
                    transclude: null,
                    replace: null,
                    $$originalDirective: origAsyncDirective
                }), templateUrl = isFunction(origAsyncDirective.templateUrl) ? origAsyncDirective.templateUrl($compileNode, tAttrs) : origAsyncDirective.templateUrl, templateNamespace = origAsyncDirective.templateNamespace;
                return $compileNode.empty(), $templateRequest(templateUrl).then(function (content) {
                    var compileNode, tempTemplateAttrs, $template, childBoundTranscludeFn;
                    if (content = denormalizeTemplate(content), origAsyncDirective.replace) {
                        if ($template = jqLiteIsTextNode(content) ? [] : removeComments(wrapTemplate(templateNamespace, trim(content))), compileNode = $template[0], 1 != $template.length || compileNode.nodeType !== NODE_TYPE_ELEMENT)throw $compileMinErr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", origAsyncDirective.name, templateUrl);
                        tempTemplateAttrs = {$attr: {}}, replaceWith($rootElement, $compileNode, compileNode);
                        var templateDirectives = collectDirectives(compileNode, [], tempTemplateAttrs);
                        isObject(origAsyncDirective.scope) && markDirectiveScope(templateDirectives, !0), directives = templateDirectives.concat(directives), mergeTemplateAttributes(tAttrs, tempTemplateAttrs)
                    } else compileNode = beforeTemplateCompileNode, $compileNode.html(content);
                    for (directives.unshift(derivedSyncDirective), afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs, childTranscludeFn, $compileNode, origAsyncDirective, preLinkFns, postLinkFns, previousCompileContext), forEach($rootElement, function (node, i) {
                        node == compileNode && ($rootElement[i] = $compileNode[0])
                    }), afterTemplateChildLinkFn = compileNodes($compileNode[0].childNodes, childTranscludeFn); linkQueue.length;) {
                        var scope = linkQueue.shift(), beforeTemplateLinkNode = linkQueue.shift(), linkRootElement = linkQueue.shift(), boundTranscludeFn = linkQueue.shift(), linkNode = $compileNode[0];
                        if (!scope.$$destroyed) {
                            if (beforeTemplateLinkNode !== beforeTemplateCompileNode) {
                                var oldClasses = beforeTemplateLinkNode.className;
                                previousCompileContext.hasElementTranscludeDirective && origAsyncDirective.replace || (linkNode = jqLiteClone(compileNode)), replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode), safeAddClass(jqLite(linkNode), oldClasses)
                            }
                            childBoundTranscludeFn = afterTemplateNodeLinkFn.transcludeOnThisElement ? createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude, boundTranscludeFn) : boundTranscludeFn, afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement, childBoundTranscludeFn)
                        }
                    }
                    linkQueue = null
                }), function (ignoreChildLinkFn, scope, node, rootElement, boundTranscludeFn) {
                    var childBoundTranscludeFn = boundTranscludeFn;
                    scope.$$destroyed || (linkQueue ? linkQueue.push(scope, node, rootElement, childBoundTranscludeFn) : (afterTemplateNodeLinkFn.transcludeOnThisElement && (childBoundTranscludeFn = createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude, boundTranscludeFn)), afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, childBoundTranscludeFn)))
                }
            }

            function byPriority(a, b) {
                var diff = b.priority - a.priority;
                return 0 !== diff ? diff : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index
            }

            function assertNoDuplicate(what, previousDirective, directive, element) {
                function wrapModuleNameIfDefined(moduleName) {
                    return moduleName ? " (module: " + moduleName + ")" : ""
                }

                if (previousDirective)throw $compileMinErr("multidir", "Multiple directives [{0}{1}, {2}{3}] asking for {4} on: {5}", previousDirective.name, wrapModuleNameIfDefined(previousDirective.$$moduleName), directive.name, wrapModuleNameIfDefined(directive.$$moduleName), what, startingTag(element))
            }

            function addTextInterpolateDirective(directives, text) {
                var interpolateFn = $interpolate(text, !0);
                interpolateFn && directives.push({
                    priority: 0, compile: function (templateNode) {
                        var templateNodeParent = templateNode.parent(), hasCompileParent = !!templateNodeParent.length;
                        return hasCompileParent && compile.$$addBindingClass(templateNodeParent), function (scope, node) {
                            var parent = node.parent();
                            hasCompileParent || compile.$$addBindingClass(parent), compile.$$addBindingInfo(parent, interpolateFn.expressions), scope.$watch(interpolateFn, function (value) {
                                node[0].nodeValue = value
                            })
                        }
                    }
                })
            }

            function wrapTemplate(type, template) {
                switch (type = lowercase(type || "html")) {
                    case"svg":
                    case"math":
                        var wrapper = document.createElement("div");
                        return wrapper.innerHTML = "<" + type + ">" + template + "</" + type + ">", wrapper.childNodes[0].childNodes;
                    default:
                        return template
                }
            }

            function getTrustedContext(node, attrNormalizedName) {
                if ("srcdoc" == attrNormalizedName)return $sce.HTML;
                var tag = nodeName_(node);
                return "xlinkHref" == attrNormalizedName || "form" == tag && "action" == attrNormalizedName || "img" != tag && ("src" == attrNormalizedName || "ngSrc" == attrNormalizedName) ? $sce.RESOURCE_URL : void 0
            }

            function addAttrInterpolateDirective(node, directives, value, name, allOrNothing) {
                var trustedContext = getTrustedContext(node, name);
                allOrNothing = ALL_OR_NOTHING_ATTRS[name] || allOrNothing;
                var interpolateFn = $interpolate(value, !0, trustedContext, allOrNothing);
                if (interpolateFn) {
                    if ("multiple" === name && "select" === nodeName_(node))throw $compileMinErr("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", startingTag(node));
                    directives.push({
                        priority: 100, compile: function () {
                            return {
                                pre: function (scope, element, attr) {
                                    var $$observers = attr.$$observers || (attr.$$observers = createMap());
                                    if (EVENT_HANDLER_ATTR_REGEXP.test(name))throw $compileMinErr("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                                    var newValue = attr[name];
                                    newValue !== value && (interpolateFn = newValue && $interpolate(newValue, !0, trustedContext, allOrNothing), value = newValue), interpolateFn && (attr[name] = interpolateFn(scope), ($$observers[name] || ($$observers[name] = [])).$$inter = !0, (attr.$$observers && attr.$$observers[name].$$scope || scope).$watch(interpolateFn, function (newValue, oldValue) {
                                        "class" === name && newValue != oldValue ? attr.$updateClass(newValue, oldValue) : attr.$set(name, newValue)
                                    }))
                                }
                            }
                        }
                    })
                }
            }

            function replaceWith($rootElement, elementsToRemove, newNode) {
                var i, ii, firstElementToRemove = elementsToRemove[0], removeCount = elementsToRemove.length, parent = firstElementToRemove.parentNode;
                if ($rootElement)for (i = 0, ii = $rootElement.length; ii > i; i++)if ($rootElement[i] == firstElementToRemove) {
                    $rootElement[i++] = newNode;
                    for (var j = i, j2 = j + removeCount - 1, jj = $rootElement.length; jj > j; j++, j2++)jj > j2 ? $rootElement[j] = $rootElement[j2] : delete $rootElement[j];
                    $rootElement.length -= removeCount - 1, $rootElement.context === firstElementToRemove && ($rootElement.context = newNode);
                    break
                }
                parent && parent.replaceChild(newNode, firstElementToRemove);
                var fragment = document.createDocumentFragment();
                for (i = 0; removeCount > i; i++)fragment.appendChild(elementsToRemove[i]);
                for (jqLite.hasData(firstElementToRemove) && (jqLite.data(newNode, jqLite.data(firstElementToRemove)), jqLite(firstElementToRemove).off("$destroy")), jqLite.cleanData(fragment.querySelectorAll("*")), i = 1; removeCount > i; i++)delete elementsToRemove[i];
                elementsToRemove[0] = newNode, elementsToRemove.length = 1
            }

            function cloneAndAnnotateFn(fn, annotation) {
                return extend(function () {
                    return fn.apply(null, arguments)
                }, fn, annotation)
            }

            function invokeLinkFn(linkFn, scope, $element, attrs, controllers, transcludeFn) {
                try {
                    linkFn(scope, $element, attrs, controllers, transcludeFn)
                } catch (e) {
                    $exceptionHandler(e, startingTag($element))
                }
            }

            function initializeDirectiveBindings(scope, attrs, destination, bindings, directive) {
                var removeWatchCollection = [];
                return forEach(bindings, function (definition, scopeName) {
                    var lastValue, parentGet, parentSet, compare, removeWatch, attrName = definition.attrName, optional = definition.optional, mode = definition.mode;
                    switch (mode) {
                        case"@":
                            optional || hasOwnProperty.call(attrs, attrName) || (destination[scopeName] = attrs[attrName] = void 0), attrs.$observe(attrName, function (value) {
                                isString(value) && (destination[scopeName] = value)
                            }), attrs.$$observers[attrName].$$scope = scope, lastValue = attrs[attrName], isString(lastValue) ? destination[scopeName] = $interpolate(lastValue)(scope) : isBoolean(lastValue) && (destination[scopeName] = lastValue);
                            break;
                        case"=":
                            if (!hasOwnProperty.call(attrs, attrName)) {
                                if (optional)break;
                                attrs[attrName] = void 0
                            }
                            if (optional && !attrs[attrName])break;
                            parentGet = $parse(attrs[attrName]), compare = parentGet.literal ? equals : function (a, b) {
                                return a === b || a !== a && b !== b
                            }, parentSet = parentGet.assign || function () {
                                    throw lastValue = destination[scopeName] = parentGet(scope), $compileMinErr("nonassign", "Expression '{0}' in attribute '{1}' used with directive '{2}' is non-assignable!", attrs[attrName], attrName, directive.name)
                                }, lastValue = destination[scopeName] = parentGet(scope);
                            var parentValueWatch = function (parentValue) {
                                return compare(parentValue, destination[scopeName]) || (compare(parentValue, lastValue) ? parentSet(scope, parentValue = destination[scopeName]) : destination[scopeName] = parentValue), lastValue = parentValue
                            };
                            parentValueWatch.$stateful = !0, removeWatch = definition.collection ? scope.$watchCollection(attrs[attrName], parentValueWatch) : scope.$watch($parse(attrs[attrName], parentValueWatch), null, parentGet.literal), removeWatchCollection.push(removeWatch);
                            break;
                        case"<":
                            if (!hasOwnProperty.call(attrs, attrName)) {
                                if (optional)break;
                                attrs[attrName] = void 0
                            }
                            if (optional && !attrs[attrName])break;
                            parentGet = $parse(attrs[attrName]), destination[scopeName] = parentGet(scope), removeWatch = scope.$watch(parentGet, function (newParentValue) {
                                destination[scopeName] = newParentValue
                            }, parentGet.literal), removeWatchCollection.push(removeWatch);
                            break;
                        case"&":
                            if (parentGet = attrs.hasOwnProperty(attrName) ? $parse(attrs[attrName]) : noop, parentGet === noop && optional)break;
                            destination[scopeName] = function (locals) {
                                return parentGet(scope, locals)
                            }
                    }
                }), removeWatchCollection.length && function () {
                    for (var i = 0, ii = removeWatchCollection.length; ii > i; ++i)removeWatchCollection[i]()
                }
            }

            var SIMPLE_ATTR_NAME = /^\w/, specialAttrHolder = document.createElement("div"), Attributes = function (element, attributesToCopy) {
                if (attributesToCopy) {
                    var i, l, key, keys = Object.keys(attributesToCopy);
                    for (i = 0, l = keys.length; l > i; i++)key = keys[i], this[key] = attributesToCopy[key]
                } else this.$attr = {};
                this.$$element = element
            };
            Attributes.prototype = {
                $normalize: directiveNormalize, $addClass: function (classVal) {
                    classVal && classVal.length > 0 && $animate.addClass(this.$$element, classVal)
                }, $removeClass: function (classVal) {
                    classVal && classVal.length > 0 && $animate.removeClass(this.$$element, classVal)
                }, $updateClass: function (newClasses, oldClasses) {
                    var toAdd = tokenDifference(newClasses, oldClasses);
                    toAdd && toAdd.length && $animate.addClass(this.$$element, toAdd);
                    var toRemove = tokenDifference(oldClasses, newClasses);
                    toRemove && toRemove.length && $animate.removeClass(this.$$element, toRemove)
                }, $set: function (key, value, writeAttr, attrName) {
                    var nodeName, node = this.$$element[0], booleanKey = getBooleanAttrName(node, key), aliasedKey = getAliasedAttrName(key), observer = key;
                    if (booleanKey ? (this.$$element.prop(key, value), attrName = booleanKey) : aliasedKey && (this[aliasedKey] = value, observer = aliasedKey), this[key] = value, attrName ? this.$attr[key] = attrName : (attrName = this.$attr[key], attrName || (this.$attr[key] = attrName = snake_case(key, "-"))), nodeName = nodeName_(this.$$element), "a" === nodeName && ("href" === key || "xlinkHref" === key) || "img" === nodeName && "src" === key)this[key] = value = $$sanitizeUri(value, "src" === key); else if ("img" === nodeName && "srcset" === key) {
                        for (var result = "", trimmedSrcset = trim(value), srcPattern = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, pattern = /\s/.test(trimmedSrcset) ? srcPattern : /(,)/, rawUris = trimmedSrcset.split(pattern), nbrUrisWith2parts = Math.floor(rawUris.length / 2), i = 0; nbrUrisWith2parts > i; i++) {
                            var innerIdx = 2 * i;
                            result += $$sanitizeUri(trim(rawUris[innerIdx]), !0), result += " " + trim(rawUris[innerIdx + 1])
                        }
                        var lastTuple = trim(rawUris[2 * i]).split(/\s/);
                        result += $$sanitizeUri(trim(lastTuple[0]), !0), 2 === lastTuple.length && (result += " " + trim(lastTuple[1])), this[key] = value = result
                    }
                    writeAttr !== !1 && (null === value || isUndefined(value) ? this.$$element.removeAttr(attrName) : SIMPLE_ATTR_NAME.test(attrName) ? this.$$element.attr(attrName, value) : setSpecialAttr(this.$$element[0], attrName, value));
                    var $$observers = this.$$observers;
                    $$observers && forEach($$observers[observer], function (fn) {
                        try {
                            fn(value)
                        } catch (e) {
                            $exceptionHandler(e)
                        }
                    })
                }, $observe: function (key, fn) {
                    var attrs = this, $$observers = attrs.$$observers || (attrs.$$observers = createMap()), listeners = $$observers[key] || ($$observers[key] = []);
                    return listeners.push(fn), $rootScope.$evalAsync(function () {
                        listeners.$$inter || !attrs.hasOwnProperty(key) || isUndefined(attrs[key]) || fn(attrs[key])
                    }), function () {
                        arrayRemove(listeners, fn)
                    }
                }
            };
            var startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), denormalizeTemplate = "{{" == startSymbol && "}}" == endSymbol ? identity : function (template) {
                return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol)
            }, NG_ATTR_BINDING = /^ngAttr[A-Z]/, MULTI_ELEMENT_DIR_RE = /^(.+)Start$/;
            return compile.$$addBindingInfo = debugInfoEnabled ? function ($element, binding) {
                var bindings = $element.data("$binding") || [];
                isArray(binding) ? bindings = bindings.concat(binding) : bindings.push(binding), $element.data("$binding", bindings)
            } : noop, compile.$$addBindingClass = debugInfoEnabled ? function ($element) {
                safeAddClass($element, "ng-binding")
            } : noop, compile.$$addScopeInfo = debugInfoEnabled ? function ($element, scope, isolated, noTemplate) {
                var dataName = isolated ? noTemplate ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
                $element.data(dataName, scope)
            } : noop, compile.$$addScopeClass = debugInfoEnabled ? function ($element, isolated) {
                safeAddClass($element, isolated ? "ng-isolate-scope" : "ng-scope")
            } : noop, compile
        }]
    }

    function directiveNormalize(name) {
        return camelCase(name.replace(PREFIX_REGEXP, ""))
    }

    function tokenDifference(str1, str2) {
        var values = "", tokens1 = str1.split(/\s+/), tokens2 = str2.split(/\s+/);
        outer:for (var i = 0; i < tokens1.length; i++) {
            for (var token = tokens1[i], j = 0; j < tokens2.length; j++)if (token == tokens2[j])continue outer;
            values += (values.length > 0 ? " " : "") + token
        }
        return values
    }

    function removeComments(jqNodes) {
        jqNodes = jqLite(jqNodes);
        var i = jqNodes.length;
        if (1 >= i)return jqNodes;
        for (; i--;) {
            var node = jqNodes[i];
            node.nodeType === NODE_TYPE_COMMENT && splice.call(jqNodes, i, 1)
        }
        return jqNodes
    }

    function identifierForController(controller, ident) {
        if (ident && isString(ident))return ident;
        if (isString(controller)) {
            var match = CNTRL_REG.exec(controller);
            if (match)return match[3]
        }
    }

    function $ControllerProvider() {
        var controllers = {}, globals = !1;
        this.register = function (name, constructor) {
            assertNotHasOwnProperty(name, "controller"), isObject(name) ? extend(controllers, name) : controllers[name] = constructor
        }, this.allowGlobals = function () {
            globals = !0
        }, this.$get = ["$injector", "$window", function ($injector, $window) {
            function addIdentifier(locals, identifier, instance, name) {
                if (!locals || !isObject(locals.$scope))throw minErr("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", name, identifier);
                locals.$scope[identifier] = instance
            }

            return function (expression, locals, later, ident) {
                var instance, match, constructor, identifier;
                if (later = later === !0, ident && isString(ident) && (identifier = ident), isString(expression)) {
                    if (match = expression.match(CNTRL_REG), !match)throw $controllerMinErr("ctrlfmt", "Badly formed controller string '{0}'. Must match `__name__ as __id__` or `__name__`.", expression);
                    constructor = match[1], identifier = identifier || match[3], expression = controllers.hasOwnProperty(constructor) ? controllers[constructor] : getter(locals.$scope, constructor, !0) || (globals ? getter($window, constructor, !0) : undefined), assertArgFn(expression, constructor, !0)
                }
                if (later) {
                    var controllerPrototype = (isArray(expression) ? expression[expression.length - 1] : expression).prototype;
                    instance = Object.create(controllerPrototype || null), identifier && addIdentifier(locals, identifier, instance, constructor || expression.name);
                    var instantiate;
                    return instantiate = extend(function () {
                        var result = $injector.invoke(expression, instance, locals, constructor);
                        return result !== instance && (isObject(result) || isFunction(result)) && (instance = result, identifier && addIdentifier(locals, identifier, instance, constructor || expression.name)), instance
                    }, {instance: instance, identifier: identifier})
                }
                return instance = $injector.instantiate(expression, locals, constructor), identifier && addIdentifier(locals, identifier, instance, constructor || expression.name), instance
            }
        }]
    }

    function $DocumentProvider() {
        this.$get = ["$window", function (window) {
            return jqLite(window.document)
        }]
    }

    function $ExceptionHandlerProvider() {
        this.$get = ["$log", function ($log) {
            return function (exception, cause) {
                $log.error.apply($log, arguments)
            }
        }]
    }

    function serializeValue(v) {
        return isObject(v) ? isDate(v) ? v.toISOString() : toJson(v) : v
    }

    function $HttpParamSerializerProvider() {
        this.$get = function () {
            return function (params) {
                if (!params)return "";
                var parts = [];
                return forEachSorted(params, function (value, key) {
                    null === value || isUndefined(value) || (isArray(value) ? forEach(value, function (v, k) {
                        parts.push(encodeUriQuery(key) + "=" + encodeUriQuery(serializeValue(v)))
                    }) : parts.push(encodeUriQuery(key) + "=" + encodeUriQuery(serializeValue(value))))
                }), parts.join("&")
            }
        }
    }

    function $HttpParamSerializerJQLikeProvider() {
        this.$get = function () {
            return function (params) {
                function serialize(toSerialize, prefix, topLevel) {
                    null === toSerialize || isUndefined(toSerialize) || (isArray(toSerialize) ? forEach(toSerialize, function (value, index) {
                        serialize(value, prefix + "[" + (isObject(value) ? index : "") + "]")
                    }) : isObject(toSerialize) && !isDate(toSerialize) ? forEachSorted(toSerialize, function (value, key) {
                        serialize(value, prefix + (topLevel ? "" : "[") + key + (topLevel ? "" : "]"))
                    }) : parts.push(encodeUriQuery(prefix) + "=" + encodeUriQuery(serializeValue(toSerialize))))
                }

                if (!params)return "";
                var parts = [];
                return serialize(params, "", !0), parts.join("&")
            }
        }
    }

    function defaultHttpResponseTransform(data, headers) {
        if (isString(data)) {
            var tempData = data.replace(JSON_PROTECTION_PREFIX, "").trim();
            if (tempData) {
                var contentType = headers("Content-Type");
                (contentType && 0 === contentType.indexOf(APPLICATION_JSON) || isJsonLike(tempData)) && (data = fromJson(tempData))
            }
        }
        return data
    }

    function isJsonLike(str) {
        var jsonStart = str.match(JSON_START);
        return jsonStart && JSON_ENDS[jsonStart[0]].test(str)
    }

    function parseHeaders(headers) {
        function fillInParsed(key, val) {
            key && (parsed[key] = parsed[key] ? parsed[key] + ", " + val : val)
        }

        var i, parsed = createMap();
        return isString(headers) ? forEach(headers.split("\n"), function (line) {
            i = line.indexOf(":"), fillInParsed(lowercase(trim(line.substr(0, i))), trim(line.substr(i + 1)))
        }) : isObject(headers) && forEach(headers, function (headerVal, headerKey) {
            fillInParsed(lowercase(headerKey), trim(headerVal))
        }), parsed
    }

    function headersGetter(headers) {
        var headersObj;
        return function (name) {
            if (headersObj || (headersObj = parseHeaders(headers)), name) {
                var value = headersObj[lowercase(name)];
                return void 0 === value && (value = null), value
            }
            return headersObj
        }
    }

    function transformData(data, headers, status, fns) {
        return isFunction(fns) ? fns(data, headers, status) : (forEach(fns, function (fn) {
            data = fn(data, headers, status)
        }), data)
    }

    function isSuccess(status) {
        return status >= 200 && 300 > status
    }

    function $HttpProvider() {
        var defaults = this.defaults = {
            transformResponse: [defaultHttpResponseTransform],
            transformRequest: [function (d) {
                return !isObject(d) || isFile(d) || isBlob(d) || isFormData(d) ? d : toJson(d)
            }],
            headers: {
                common: {Accept: "application/json, text/plain, */*"},
                post: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                put: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                patch: shallowCopy(CONTENT_TYPE_APPLICATION_JSON)
            },
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            paramSerializer: "$httpParamSerializer"
        }, useApplyAsync = !1;
        this.useApplyAsync = function (value) {
            return isDefined(value) ? (useApplyAsync = !!value, this) : useApplyAsync
        };
        var useLegacyPromise = !0;
        this.useLegacyPromiseExtensions = function (value) {
            return isDefined(value) ? (useLegacyPromise = !!value, this) : useLegacyPromise
        };
        var interceptorFactories = this.interceptors = [];
        this.$get = ["$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function ($httpBackend, $$cookieReader, $cacheFactory, $rootScope, $q, $injector) {
            function $http(requestConfig) {
                function transformResponse(response) {
                    var resp = extend({}, response);
                    return resp.data = transformData(response.data, response.headers, response.status, config.transformResponse), isSuccess(response.status) ? resp : $q.reject(resp)
                }

                function executeHeaderFns(headers, config) {
                    var headerContent, processedHeaders = {};
                    return forEach(headers, function (headerFn, header) {
                        isFunction(headerFn) ? (headerContent = headerFn(config), null != headerContent && (processedHeaders[header] = headerContent)) : processedHeaders[header] = headerFn
                    }), processedHeaders
                }

                function mergeHeaders(config) {
                    var defHeaderName, lowercaseDefHeaderName, reqHeaderName, defHeaders = defaults.headers, reqHeaders = extend({}, config.headers);
                    defHeaders = extend({}, defHeaders.common, defHeaders[lowercase(config.method)]);
                    defaultHeadersIteration:for (defHeaderName in defHeaders) {
                        lowercaseDefHeaderName = lowercase(defHeaderName);
                        for (reqHeaderName in reqHeaders)if (lowercase(reqHeaderName) === lowercaseDefHeaderName)continue defaultHeadersIteration;
                        reqHeaders[defHeaderName] = defHeaders[defHeaderName]
                    }
                    return executeHeaderFns(reqHeaders, shallowCopy(config))
                }

                if (!isObject(requestConfig))throw minErr("$http")("badreq", "Http request configuration must be an object.  Received: {0}", requestConfig);
                if (!isString(requestConfig.url))throw minErr("$http")("badreq", "Http request configuration url must be a string.  Received: {0}", requestConfig.url);
                var config = extend({
                    method: "get",
                    transformRequest: defaults.transformRequest,
                    transformResponse: defaults.transformResponse,
                    paramSerializer: defaults.paramSerializer
                }, requestConfig);
                config.headers = mergeHeaders(requestConfig), config.method = uppercase(config.method), config.paramSerializer = isString(config.paramSerializer) ? $injector.get(config.paramSerializer) : config.paramSerializer;
                var serverRequest = function (config) {
                    var headers = config.headers, reqData = transformData(config.data, headersGetter(headers), undefined, config.transformRequest);
                    return isUndefined(reqData) && forEach(headers, function (value, header) {
                        "content-type" === lowercase(header) && delete headers[header]
                    }), isUndefined(config.withCredentials) && !isUndefined(defaults.withCredentials) && (config.withCredentials = defaults.withCredentials), sendReq(config, reqData).then(transformResponse, transformResponse)
                }, chain = [serverRequest, undefined], promise = $q.when(config);
                for (forEach(reversedInterceptors, function (interceptor) {
                    (interceptor.request || interceptor.requestError) && chain.unshift(interceptor.request, interceptor.requestError), (interceptor.response || interceptor.responseError) && chain.push(interceptor.response, interceptor.responseError)
                }); chain.length;) {
                    var thenFn = chain.shift(), rejectFn = chain.shift();
                    promise = promise.then(thenFn, rejectFn)
                }
                return useLegacyPromise ? (promise.success = function (fn) {
                    return assertArgFn(fn, "fn"), promise.then(function (response) {
                        fn(response.data, response.status, response.headers, config)
                    }), promise
                }, promise.error = function (fn) {
                    return assertArgFn(fn, "fn"), promise.then(null, function (response) {
                        fn(response.data, response.status, response.headers, config)
                    }), promise
                }) : (promise.success = $httpMinErrLegacyFn("success"), promise.error = $httpMinErrLegacyFn("error")), promise
            }

            function createShortMethods(names) {
                forEach(arguments, function (name) {
                    $http[name] = function (url, config) {
                        return $http(extend({}, config || {}, {method: name, url: url}))
                    }
                })
            }

            function createShortMethodsWithData(name) {
                forEach(arguments, function (name) {
                    $http[name] = function (url, data, config) {
                        return $http(extend({}, config || {}, {method: name, url: url, data: data}))
                    }
                })
            }

            function sendReq(config, reqData) {
                function done(status, response, headersString, statusText) {
                    function resolveHttpPromise() {
                        resolvePromise(response, status, headersString, statusText)
                    }

                    cache && (isSuccess(status) ? cache.put(url, [status, response, parseHeaders(headersString), statusText]) : cache.remove(url)), useApplyAsync ? $rootScope.$applyAsync(resolveHttpPromise) : (resolveHttpPromise(), $rootScope.$$phase || $rootScope.$apply())
                }

                function resolvePromise(response, status, headers, statusText) {
                    status = status >= -1 ? status : 0, (isSuccess(status) ? deferred.resolve : deferred.reject)({
                        data: response,
                        status: status,
                        headers: headersGetter(headers),
                        config: config,
                        statusText: statusText
                    })
                }

                function resolvePromiseWithResult(result) {
                    resolvePromise(result.data, result.status, shallowCopy(result.headers()), result.statusText)
                }

                function removePendingReq() {
                    var idx = $http.pendingRequests.indexOf(config);
                    -1 !== idx && $http.pendingRequests.splice(idx, 1)
                }

                var cache, cachedResp, deferred = $q.defer(), promise = deferred.promise, reqHeaders = config.headers, url = buildUrl(config.url, config.paramSerializer(config.params));
                if ($http.pendingRequests.push(config), promise.then(removePendingReq, removePendingReq), !config.cache && !defaults.cache || config.cache === !1 || "GET" !== config.method && "JSONP" !== config.method || (cache = isObject(config.cache) ? config.cache : isObject(defaults.cache) ? defaults.cache : defaultCache), cache && (cachedResp = cache.get(url), isDefined(cachedResp) ? isPromiseLike(cachedResp) ? cachedResp.then(resolvePromiseWithResult, resolvePromiseWithResult) : isArray(cachedResp) ? resolvePromise(cachedResp[1], cachedResp[0], shallowCopy(cachedResp[2]), cachedResp[3]) : resolvePromise(cachedResp, 200, {}, "OK") : cache.put(url, promise)),
                        isUndefined(cachedResp)) {
                    var xsrfValue = urlIsSameOrigin(config.url) ? $$cookieReader()[config.xsrfCookieName || defaults.xsrfCookieName] : undefined;
                    xsrfValue && (reqHeaders[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue), $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout, config.withCredentials, config.responseType)
                }
                return promise
            }

            function buildUrl(url, serializedParams) {
                return serializedParams.length > 0 && (url += (-1 == url.indexOf("?") ? "?" : "&") + serializedParams), url
            }

            var defaultCache = $cacheFactory("$http");
            defaults.paramSerializer = isString(defaults.paramSerializer) ? $injector.get(defaults.paramSerializer) : defaults.paramSerializer;
            var reversedInterceptors = [];
            return forEach(interceptorFactories, function (interceptorFactory) {
                reversedInterceptors.unshift(isString(interceptorFactory) ? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory))
            }), $http.pendingRequests = [], createShortMethods("get", "delete", "head", "jsonp"), createShortMethodsWithData("post", "put", "patch"), $http.defaults = defaults, $http
        }]
    }

    function $xhrFactoryProvider() {
        this.$get = function () {
            return function () {
                return new window.XMLHttpRequest
            }
        }
    }

    function $HttpBackendProvider() {
        this.$get = ["$browser", "$window", "$document", "$xhrFactory", function ($browser, $window, $document, $xhrFactory) {
            return createHttpBackend($browser, $xhrFactory, $browser.defer, $window.angular.callbacks, $document[0])
        }]
    }

    function createHttpBackend($browser, createXhr, $browserDefer, callbacks, rawDocument) {
        function jsonpReq(url, callbackId, done) {
            var script = rawDocument.createElement("script"), callback = null;
            return script.type = "text/javascript", script.src = url, script.async = !0, callback = function (event) {
                removeEventListenerFn(script, "load", callback), removeEventListenerFn(script, "error", callback), rawDocument.body.removeChild(script), script = null;
                var status = -1, text = "unknown";
                event && ("load" !== event.type || callbacks[callbackId].called || (event = {type: "error"}), text = event.type, status = "error" === event.type ? 404 : 200), done && done(status, text)
            }, addEventListenerFn(script, "load", callback), addEventListenerFn(script, "error", callback), rawDocument.body.appendChild(script), callback
        }

        return function (method, url, post, callback, headers, timeout, withCredentials, responseType) {
            function timeoutRequest() {
                jsonpDone && jsonpDone(), xhr && xhr.abort()
            }

            function completeRequest(callback, status, response, headersString, statusText) {
                isDefined(timeoutId) && $browserDefer.cancel(timeoutId), jsonpDone = xhr = null, callback(status, response, headersString, statusText), $browser.$$completeOutstandingRequest(noop)
            }

            if ($browser.$$incOutstandingRequestCount(), url = url || $browser.url(), "jsonp" == lowercase(method)) {
                var callbackId = "_" + (callbacks.counter++).toString(36);
                callbacks[callbackId] = function (data) {
                    callbacks[callbackId].data = data, callbacks[callbackId].called = !0
                };
                var jsonpDone = jsonpReq(url.replace("JSON_CALLBACK", "angular.callbacks." + callbackId), callbackId, function (status, text) {
                    completeRequest(callback, status, callbacks[callbackId].data, "", text), callbacks[callbackId] = noop
                })
            } else {
                var xhr = createXhr(method, url);
                xhr.open(method, url, !0), forEach(headers, function (value, key) {
                    isDefined(value) && xhr.setRequestHeader(key, value)
                }), xhr.onload = function () {
                    var statusText = xhr.statusText || "", response = "response" in xhr ? xhr.response : xhr.responseText, status = 1223 === xhr.status ? 204 : xhr.status;
                    0 === status && (status = response ? 200 : "file" == urlResolve(url).protocol ? 404 : 0), completeRequest(callback, status, response, xhr.getAllResponseHeaders(), statusText)
                };
                var requestError = function () {
                    completeRequest(callback, -1, null, null, "")
                };
                if (xhr.onerror = requestError, xhr.onabort = requestError, withCredentials && (xhr.withCredentials = !0), responseType)try {
                    xhr.responseType = responseType
                } catch (e) {
                    if ("json" !== responseType)throw e
                }
                xhr.send(isUndefined(post) ? null : post)
            }
            if (timeout > 0)var timeoutId = $browserDefer(timeoutRequest, timeout); else isPromiseLike(timeout) && timeout.then(timeoutRequest)
        }
    }

    function $InterpolateProvider() {
        var startSymbol = "{{", endSymbol = "}}";
        this.startSymbol = function (value) {
            return value ? (startSymbol = value, this) : startSymbol
        }, this.endSymbol = function (value) {
            return value ? (endSymbol = value, this) : endSymbol
        }, this.$get = ["$parse", "$exceptionHandler", "$sce", function ($parse, $exceptionHandler, $sce) {
            function escape(ch) {
                return "\\\\\\" + ch
            }

            function unescapeText(text) {
                return text.replace(escapedStartRegexp, startSymbol).replace(escapedEndRegexp, endSymbol)
            }

            function stringify(value) {
                if (null == value)return "";
                switch (typeof value) {
                    case"string":
                        break;
                    case"number":
                        value = "" + value;
                        break;
                    default:
                        value = toJson(value)
                }
                return value
            }

            function constantWatchDelegate(scope, listener, objectEquality, constantInterp) {
                var unwatch;
                return unwatch = scope.$watch(function (scope) {
                    return unwatch(), constantInterp(scope)
                }, listener, objectEquality)
            }

            function $interpolate(text, mustHaveExpression, trustedContext, allOrNothing) {
                function parseStringifyInterceptor(value) {
                    try {
                        return value = getValue(value), allOrNothing && !isDefined(value) ? value : stringify(value)
                    } catch (err) {
                        $exceptionHandler($interpolateMinErr.interr(text, err))
                    }
                }

                if (!text.length || -1 === text.indexOf(startSymbol)) {
                    var constantInterp;
                    if (!mustHaveExpression) {
                        var unescapedText = unescapeText(text);
                        constantInterp = valueFn(unescapedText), constantInterp.exp = text, constantInterp.expressions = [], constantInterp.$$watchDelegate = constantWatchDelegate
                    }
                    return constantInterp
                }
                allOrNothing = !!allOrNothing;
                for (var startIndex, endIndex, exp, index = 0, expressions = [], parseFns = [], textLength = text.length, concat = [], expressionPositions = []; textLength > index;) {
                    if (-1 == (startIndex = text.indexOf(startSymbol, index)) || -1 == (endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength))) {
                        index !== textLength && concat.push(unescapeText(text.substring(index)));
                        break
                    }
                    index !== startIndex && concat.push(unescapeText(text.substring(index, startIndex))), exp = text.substring(startIndex + startSymbolLength, endIndex), expressions.push(exp), parseFns.push($parse(exp, parseStringifyInterceptor)), index = endIndex + endSymbolLength, expressionPositions.push(concat.length), concat.push("")
                }
                if (trustedContext && concat.length > 1 && $interpolateMinErr.throwNoconcat(text), !mustHaveExpression || expressions.length) {
                    var compute = function (values) {
                        for (var i = 0, ii = expressions.length; ii > i; i++) {
                            if (allOrNothing && isUndefined(values[i]))return;
                            concat[expressionPositions[i]] = values[i]
                        }
                        return concat.join("")
                    }, getValue = function (value) {
                        return trustedContext ? $sce.getTrusted(trustedContext, value) : $sce.valueOf(value)
                    };
                    return extend(function (context) {
                        var i = 0, ii = expressions.length, values = new Array(ii);
                        try {
                            for (; ii > i; i++)values[i] = parseFns[i](context);
                            return compute(values)
                        } catch (err) {
                            $exceptionHandler($interpolateMinErr.interr(text, err))
                        }
                    }, {
                        exp: text, expressions: expressions, $$watchDelegate: function (scope, listener) {
                            var lastValue;
                            return scope.$watchGroup(parseFns, function (values, oldValues) {
                                var currValue = compute(values);
                                isFunction(listener) && listener.call(this, currValue, values !== oldValues ? lastValue : currValue, scope), lastValue = currValue
                            })
                        }
                    })
                }
            }

            var startSymbolLength = startSymbol.length, endSymbolLength = endSymbol.length, escapedStartRegexp = new RegExp(startSymbol.replace(/./g, escape), "g"), escapedEndRegexp = new RegExp(endSymbol.replace(/./g, escape), "g");
            return $interpolate.startSymbol = function () {
                return startSymbol
            }, $interpolate.endSymbol = function () {
                return endSymbol
            }, $interpolate
        }]
    }

    function $IntervalProvider() {
        this.$get = ["$rootScope", "$window", "$q", "$$q", "$browser", function ($rootScope, $window, $q, $$q, $browser) {
            function interval(fn, delay, count, invokeApply) {
                function callback() {
                    hasParams ? fn.apply(null, args) : fn(iteration)
                }

                var hasParams = arguments.length > 4, args = hasParams ? sliceArgs(arguments, 4) : [], setInterval = $window.setInterval, clearInterval = $window.clearInterval, iteration = 0, skipApply = isDefined(invokeApply) && !invokeApply, deferred = (skipApply ? $$q : $q).defer(), promise = deferred.promise;
                return count = isDefined(count) ? count : 0, promise.$$intervalId = setInterval(function () {
                    skipApply ? $browser.defer(callback) : $rootScope.$evalAsync(callback), deferred.notify(iteration++), count > 0 && iteration >= count && (deferred.resolve(iteration), clearInterval(promise.$$intervalId), delete intervals[promise.$$intervalId]), skipApply || $rootScope.$apply()
                }, delay), intervals[promise.$$intervalId] = deferred, promise
            }

            var intervals = {};
            return interval.cancel = function (promise) {
                return promise && promise.$$intervalId in intervals ? (intervals[promise.$$intervalId].reject("canceled"), $window.clearInterval(promise.$$intervalId), delete intervals[promise.$$intervalId], !0) : !1
            }, interval
        }]
    }

    function encodePath(path) {
        for (var segments = path.split("/"), i = segments.length; i--;)segments[i] = encodeUriSegment(segments[i]);
        return segments.join("/")
    }

    function parseAbsoluteUrl(absoluteUrl, locationObj) {
        var parsedUrl = urlResolve(absoluteUrl);
        locationObj.$$protocol = parsedUrl.protocol, locationObj.$$host = parsedUrl.hostname, locationObj.$$port = toInt(parsedUrl.port) || DEFAULT_PORTS[parsedUrl.protocol] || null
    }

    function parseAppUrl(relativeUrl, locationObj) {
        var prefixed = "/" !== relativeUrl.charAt(0);
        prefixed && (relativeUrl = "/" + relativeUrl);
        var match = urlResolve(relativeUrl);
        locationObj.$$path = decodeURIComponent(prefixed && "/" === match.pathname.charAt(0) ? match.pathname.substring(1) : match.pathname), locationObj.$$search = parseKeyValue(match.search), locationObj.$$hash = decodeURIComponent(match.hash), locationObj.$$path && "/" != locationObj.$$path.charAt(0) && (locationObj.$$path = "/" + locationObj.$$path)
    }

    function beginsWith(begin, whole) {
        return 0 === whole.indexOf(begin) ? whole.substr(begin.length) : void 0
    }

    function stripHash(url) {
        var index = url.indexOf("#");
        return -1 == index ? url : url.substr(0, index)
    }

    function trimEmptyHash(url) {
        return url.replace(/(#.+)|#$/, "$1")
    }

    function stripFile(url) {
        return url.substr(0, stripHash(url).lastIndexOf("/") + 1)
    }

    function serverBase(url) {
        return url.substring(0, url.indexOf("/", url.indexOf("//") + 2))
    }

    function LocationHtml5Url(appBase, appBaseNoFile, basePrefix) {
        this.$$html5 = !0, basePrefix = basePrefix || "", parseAbsoluteUrl(appBase, this), this.$$parse = function (url) {
            var pathUrl = beginsWith(appBaseNoFile, url);
            if (!isString(pathUrl))throw $locationMinErr("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', url, appBaseNoFile);
            parseAppUrl(pathUrl, this), this.$$path || (this.$$path = "/"), this.$$compose()
        }, this.$$compose = function () {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBaseNoFile + this.$$url.substr(1)
        }, this.$$parseLinkUrl = function (url, relHref) {
            if (relHref && "#" === relHref[0])return this.hash(relHref.slice(1)), !0;
            var appUrl, prevAppUrl, rewrittenUrl;
            return isDefined(appUrl = beginsWith(appBase, url)) ? (prevAppUrl = appUrl, rewrittenUrl = isDefined(appUrl = beginsWith(basePrefix, appUrl)) ? appBaseNoFile + (beginsWith("/", appUrl) || appUrl) : appBase + prevAppUrl) : isDefined(appUrl = beginsWith(appBaseNoFile, url)) ? rewrittenUrl = appBaseNoFile + appUrl : appBaseNoFile == url + "/" && (rewrittenUrl = appBaseNoFile), rewrittenUrl && this.$$parse(rewrittenUrl), !!rewrittenUrl
        }
    }

    function LocationHashbangUrl(appBase, appBaseNoFile, hashPrefix) {
        parseAbsoluteUrl(appBase, this), this.$$parse = function (url) {
            function removeWindowsDriveName(path, url, base) {
                var firstPathSegmentMatch, windowsFilePathExp = /^\/[A-Z]:(\/.*)/;
                return 0 === url.indexOf(base) && (url = url.replace(base, "")), windowsFilePathExp.exec(url) ? path : (firstPathSegmentMatch = windowsFilePathExp.exec(path), firstPathSegmentMatch ? firstPathSegmentMatch[1] : path)
            }

            var withoutHashUrl, withoutBaseUrl = beginsWith(appBase, url) || beginsWith(appBaseNoFile, url);
            isUndefined(withoutBaseUrl) || "#" !== withoutBaseUrl.charAt(0) ? this.$$html5 ? withoutHashUrl = withoutBaseUrl : (withoutHashUrl = "", isUndefined(withoutBaseUrl) && (appBase = url, this.replace())) : (withoutHashUrl = beginsWith(hashPrefix, withoutBaseUrl), isUndefined(withoutHashUrl) && (withoutHashUrl = withoutBaseUrl)), parseAppUrl(withoutHashUrl, this), this.$$path = removeWindowsDriveName(this.$$path, withoutHashUrl, appBase), this.$$compose()
        }, this.$$compose = function () {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBase + (this.$$url ? hashPrefix + this.$$url : "")
        }, this.$$parseLinkUrl = function (url, relHref) {
            return stripHash(appBase) == stripHash(url) ? (this.$$parse(url), !0) : !1
        }
    }

    function LocationHashbangInHtml5Url(appBase, appBaseNoFile, hashPrefix) {
        this.$$html5 = !0, LocationHashbangUrl.apply(this, arguments), this.$$parseLinkUrl = function (url, relHref) {
            if (relHref && "#" === relHref[0])return this.hash(relHref.slice(1)), !0;
            var rewrittenUrl, appUrl;
            return appBase == stripHash(url) ? rewrittenUrl = url : (appUrl = beginsWith(appBaseNoFile, url)) ? rewrittenUrl = appBase + hashPrefix + appUrl : appBaseNoFile === url + "/" && (rewrittenUrl = appBaseNoFile), rewrittenUrl && this.$$parse(rewrittenUrl), !!rewrittenUrl
        }, this.$$compose = function () {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBase + hashPrefix + this.$$url
        }
    }

    function locationGetter(property) {
        return function () {
            return this[property]
        }
    }

    function locationGetterSetter(property, preprocess) {
        return function (value) {
            return isUndefined(value) ? this[property] : (this[property] = preprocess(value), this.$$compose(), this)
        }
    }

    function $LocationProvider() {
        var hashPrefix = "", html5Mode = {enabled: !1, requireBase: !0, rewriteLinks: !0};
        this.hashPrefix = function (prefix) {
            return isDefined(prefix) ? (hashPrefix = prefix, this) : hashPrefix
        }, this.html5Mode = function (mode) {
            return isBoolean(mode) ? (html5Mode.enabled = mode, this) : isObject(mode) ? (isBoolean(mode.enabled) && (html5Mode.enabled = mode.enabled), isBoolean(mode.requireBase) && (html5Mode.requireBase = mode.requireBase), isBoolean(mode.rewriteLinks) && (html5Mode.rewriteLinks = mode.rewriteLinks), this) : html5Mode
        }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function ($rootScope, $browser, $sniffer, $rootElement, $window) {
            function setBrowserUrlWithFallback(url, replace, state) {
                var oldUrl = $location.url(), oldState = $location.$$state;
                try {
                    $browser.url(url, replace, state), $location.$$state = $browser.state()
                } catch (e) {
                    throw $location.url(oldUrl), $location.$$state = oldState, e
                }
            }

            function afterLocationChange(oldUrl, oldState) {
                $rootScope.$broadcast("$locationChangeSuccess", $location.absUrl(), oldUrl, $location.$$state, oldState)
            }

            var $location, LocationMode, appBase, baseHref = $browser.baseHref(), initialUrl = $browser.url();
            if (html5Mode.enabled) {
                if (!baseHref && html5Mode.requireBase)throw $locationMinErr("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
                appBase = serverBase(initialUrl) + (baseHref || "/"), LocationMode = $sniffer.history ? LocationHtml5Url : LocationHashbangInHtml5Url
            } else appBase = stripHash(initialUrl), LocationMode = LocationHashbangUrl;
            var appBaseNoFile = stripFile(appBase);
            $location = new LocationMode(appBase, appBaseNoFile, "#" + hashPrefix), $location.$$parseLinkUrl(initialUrl, initialUrl), $location.$$state = $browser.state();
            var IGNORE_URI_REGEXP = /^\s*(javascript|mailto):/i;
            $rootElement.on("click", function (event) {
                if (html5Mode.rewriteLinks && !event.ctrlKey && !event.metaKey && !event.shiftKey && 2 != event.which && 2 != event.button) {
                    for (var elm = jqLite(event.target); "a" !== nodeName_(elm[0]);)if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0])return;
                    var absHref = elm.prop("href"), relHref = elm.attr("href") || elm.attr("xlink:href");
                    isObject(absHref) && "[object SVGAnimatedString]" === absHref.toString() && (absHref = urlResolve(absHref.animVal).href), IGNORE_URI_REGEXP.test(absHref) || !absHref || elm.attr("target") || event.isDefaultPrevented() || $location.$$parseLinkUrl(absHref, relHref) && (event.preventDefault(), $location.absUrl() != $browser.url() && ($rootScope.$apply(), $window.angular["ff-684208-preventDefault"] = !0))
                }
            }), trimEmptyHash($location.absUrl()) != trimEmptyHash(initialUrl) && $browser.url($location.absUrl(), !0);
            var initializing = !0;
            return $browser.onUrlChange(function (newUrl, newState) {
                return isUndefined(beginsWith(appBaseNoFile, newUrl)) ? void($window.location.href = newUrl) : ($rootScope.$evalAsync(function () {
                    var defaultPrevented, oldUrl = $location.absUrl(), oldState = $location.$$state;
                    newUrl = trimEmptyHash(newUrl), $location.$$parse(newUrl), $location.$$state = newState, defaultPrevented = $rootScope.$broadcast("$locationChangeStart", newUrl, oldUrl, newState, oldState).defaultPrevented, $location.absUrl() === newUrl && (defaultPrevented ? ($location.$$parse(oldUrl), $location.$$state = oldState, setBrowserUrlWithFallback(oldUrl, !1, oldState)) : (initializing = !1, afterLocationChange(oldUrl, oldState)))
                }), void($rootScope.$$phase || $rootScope.$digest()))
            }), $rootScope.$watch(function () {
                var oldUrl = trimEmptyHash($browser.url()), newUrl = trimEmptyHash($location.absUrl()), oldState = $browser.state(), currentReplace = $location.$$replace, urlOrStateChanged = oldUrl !== newUrl || $location.$$html5 && $sniffer.history && oldState !== $location.$$state;
                (initializing || urlOrStateChanged) && (initializing = !1, $rootScope.$evalAsync(function () {
                    var newUrl = $location.absUrl(), defaultPrevented = $rootScope.$broadcast("$locationChangeStart", newUrl, oldUrl, $location.$$state, oldState).defaultPrevented;
                    $location.absUrl() === newUrl && (defaultPrevented ? ($location.$$parse(oldUrl), $location.$$state = oldState) : (urlOrStateChanged && setBrowserUrlWithFallback(newUrl, currentReplace, oldState === $location.$$state ? null : $location.$$state), afterLocationChange(oldUrl, oldState)))
                })), $location.$$replace = !1
            }), $location
        }]
    }

    function $LogProvider() {
        var debug = !0, self = this;
        this.debugEnabled = function (flag) {
            return isDefined(flag) ? (debug = flag, this) : debug
        }, this.$get = ["$window", function ($window) {
            function formatError(arg) {
                return arg instanceof Error && (arg.stack ? arg = arg.message && -1 === arg.stack.indexOf(arg.message) ? "Error: " + arg.message + "\n" + arg.stack : arg.stack : arg.sourceURL && (arg = arg.message + "\n" + arg.sourceURL + ":" + arg.line)), arg
            }

            function consoleLog(type) {
                var console = $window.console || {}, logFn = console[type] || console.log || noop, hasApply = !1;
                try {
                    hasApply = !!logFn.apply
                } catch (e) {
                }
                return hasApply ? function () {
                    var args = [];
                    return forEach(arguments, function (arg) {
                        args.push(formatError(arg))
                    }), logFn.apply(console, args)
                } : function (arg1, arg2) {
                    logFn(arg1, null == arg2 ? "" : arg2)
                }
            }

            return {
                log: consoleLog("log"),
                info: consoleLog("info"),
                warn: consoleLog("warn"),
                error: consoleLog("error"),
                debug: function () {
                    var fn = consoleLog("debug");
                    return function () {
                        debug && fn.apply(self, arguments)
                    }
                }()
            }
        }]
    }

    function ensureSafeMemberName(name, fullExpression) {
        if ("__defineGetter__" === name || "__defineSetter__" === name || "__lookupGetter__" === name || "__lookupSetter__" === name || "__proto__" === name)throw $parseMinErr("isecfld", "Attempting to access a disallowed field in Angular expressions! Expression: {0}", fullExpression);
        return name
    }

    function getStringValue(name) {
        return name + ""
    }

    function ensureSafeObject(obj, fullExpression) {
        if (obj) {
            if (obj.constructor === obj)throw $parseMinErr("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", fullExpression);
            if (obj.window === obj)throw $parseMinErr("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", fullExpression);
            if (obj.children && (obj.nodeName || obj.prop && obj.attr && obj.find))throw $parseMinErr("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", fullExpression);
            if (obj === Object)throw $parseMinErr("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", fullExpression)
        }
        return obj
    }

    function ensureSafeFunction(obj, fullExpression) {
        if (obj) {
            if (obj.constructor === obj)throw $parseMinErr("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", fullExpression);
            if (obj === CALL || obj === APPLY || obj === BIND)throw $parseMinErr("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", fullExpression)
        }
    }

    function ensureSafeAssignContext(obj, fullExpression) {
        if (obj && (obj === 0..constructor || obj === (!1).constructor || obj === "".constructor || obj === {}.constructor || obj === [].constructor || obj === Function.constructor))throw $parseMinErr("isecaf", "Assigning to a constructor is disallowed! Expression: {0}", fullExpression)
    }

    function ifDefined(v, d) {
        return "undefined" != typeof v ? v : d
    }

    function plusFn(l, r) {
        return "undefined" == typeof l ? r : "undefined" == typeof r ? l : l + r
    }

    function isStateless($filter, filterName) {
        var fn = $filter(filterName);
        return !fn.$stateful
    }

    function findConstantAndWatchExpressions(ast, $filter) {
        var allConstants, argsToWatch;
        switch (ast.type) {
            case AST.Program:
                allConstants = !0, forEach(ast.body, function (expr) {
                    findConstantAndWatchExpressions(expr.expression, $filter), allConstants = allConstants && expr.expression.constant
                }), ast.constant = allConstants;
                break;
            case AST.Literal:
                ast.constant = !0, ast.toWatch = [];
                break;
            case AST.UnaryExpression:
                findConstantAndWatchExpressions(ast.argument, $filter), ast.constant = ast.argument.constant, ast.toWatch = ast.argument.toWatch;
                break;
            case AST.BinaryExpression:
                findConstantAndWatchExpressions(ast.left, $filter), findConstantAndWatchExpressions(ast.right, $filter), ast.constant = ast.left.constant && ast.right.constant, ast.toWatch = ast.left.toWatch.concat(ast.right.toWatch);
                break;
            case AST.LogicalExpression:
                findConstantAndWatchExpressions(ast.left, $filter), findConstantAndWatchExpressions(ast.right, $filter), ast.constant = ast.left.constant && ast.right.constant, ast.toWatch = ast.constant ? [] : [ast];
                break;
            case AST.ConditionalExpression:
                findConstantAndWatchExpressions(ast.test, $filter), findConstantAndWatchExpressions(ast.alternate, $filter), findConstantAndWatchExpressions(ast.consequent, $filter), ast.constant = ast.test.constant && ast.alternate.constant && ast.consequent.constant, ast.toWatch = ast.constant ? [] : [ast];
                break;
            case AST.Identifier:
                ast.constant = !1, ast.toWatch = [ast];
                break;
            case AST.MemberExpression:
                findConstantAndWatchExpressions(ast.object, $filter), ast.computed && findConstantAndWatchExpressions(ast.property, $filter), ast.constant = ast.object.constant && (!ast.computed || ast.property.constant), ast.toWatch = [ast];
                break;
            case AST.CallExpression:
                allConstants = ast.filter ? isStateless($filter, ast.callee.name) : !1, argsToWatch = [], forEach(ast.arguments, function (expr) {
                    findConstantAndWatchExpressions(expr, $filter), allConstants = allConstants && expr.constant, expr.constant || argsToWatch.push.apply(argsToWatch, expr.toWatch)
                }), ast.constant = allConstants, ast.toWatch = ast.filter && isStateless($filter, ast.callee.name) ? argsToWatch : [ast];
                break;
            case AST.AssignmentExpression:
                findConstantAndWatchExpressions(ast.left, $filter), findConstantAndWatchExpressions(ast.right, $filter), ast.constant = ast.left.constant && ast.right.constant, ast.toWatch = [ast];
                break;
            case AST.ArrayExpression:
                allConstants = !0, argsToWatch = [], forEach(ast.elements, function (expr) {
                    findConstantAndWatchExpressions(expr, $filter), allConstants = allConstants && expr.constant, expr.constant || argsToWatch.push.apply(argsToWatch, expr.toWatch)
                }), ast.constant = allConstants, ast.toWatch = argsToWatch;
                break;
            case AST.ObjectExpression:
                allConstants = !0, argsToWatch = [], forEach(ast.properties, function (property) {
                    findConstantAndWatchExpressions(property.value, $filter), allConstants = allConstants && property.value.constant, property.value.constant || argsToWatch.push.apply(argsToWatch, property.value.toWatch)
                }), ast.constant = allConstants, ast.toWatch = argsToWatch;
                break;
            case AST.ThisExpression:
                ast.constant = !1, ast.toWatch = [];
                break;
            case AST.LocalsExpression:
                ast.constant = !1, ast.toWatch = []
        }
    }

    function getInputs(body) {
        if (1 == body.length) {
            var lastExpression = body[0].expression, candidate = lastExpression.toWatch;
            return 1 !== candidate.length ? candidate : candidate[0] !== lastExpression ? candidate : undefined
        }
    }

    function isAssignable(ast) {
        return ast.type === AST.Identifier || ast.type === AST.MemberExpression
    }

    function assignableAST(ast) {
        return 1 === ast.body.length && isAssignable(ast.body[0].expression) ? {
            type: AST.AssignmentExpression,
            left: ast.body[0].expression,
            right: {type: AST.NGValueParameter},
            operator: "="
        } : void 0
    }

    function isLiteral(ast) {
        return 0 === ast.body.length || 1 === ast.body.length && (ast.body[0].expression.type === AST.Literal || ast.body[0].expression.type === AST.ArrayExpression || ast.body[0].expression.type === AST.ObjectExpression)
    }

    function isConstant(ast) {
        return ast.constant
    }

    function ASTCompiler(astBuilder, $filter) {
        this.astBuilder = astBuilder, this.$filter = $filter
    }

    function ASTInterpreter(astBuilder, $filter) {
        this.astBuilder = astBuilder, this.$filter = $filter
    }

    function isPossiblyDangerousMemberName(name) {
        return "constructor" == name
    }

    function getValueOf(value) {
        return isFunction(value.valueOf) ? value.valueOf() : objectValueOf.call(value)
    }

    function $ParseProvider() {
        var cacheDefault = createMap(), cacheExpensive = createMap();
        this.$get = ["$filter", function ($filter) {
            function $parse(exp, interceptorFn, expensiveChecks) {
                var parsedExpression, oneTime, cacheKey;
                switch (expensiveChecks = expensiveChecks || runningChecksEnabled, typeof exp) {
                    case"string":
                        exp = exp.trim(), cacheKey = exp;
                        var cache = expensiveChecks ? cacheExpensive : cacheDefault;
                        if (parsedExpression = cache[cacheKey], !parsedExpression) {
                            ":" === exp.charAt(0) && ":" === exp.charAt(1) && (oneTime = !0, exp = exp.substring(2));
                            var parseOptions = expensiveChecks ? $parseOptionsExpensive : $parseOptions, lexer = new Lexer(parseOptions), parser = new Parser(lexer, $filter, parseOptions);
                            parsedExpression = parser.parse(exp), parsedExpression.constant ? parsedExpression.$$watchDelegate = constantWatchDelegate : oneTime ? parsedExpression.$$watchDelegate = parsedExpression.literal ? oneTimeLiteralWatchDelegate : oneTimeWatchDelegate : parsedExpression.inputs && (parsedExpression.$$watchDelegate = inputsWatchDelegate), expensiveChecks && (parsedExpression = expensiveChecksInterceptor(parsedExpression)), cache[cacheKey] = parsedExpression
                        }
                        return addInterceptor(parsedExpression, interceptorFn);
                    case"function":
                        return addInterceptor(exp, interceptorFn);
                    default:
                        return addInterceptor(noop, interceptorFn)
                }
            }

            function expensiveChecksInterceptor(fn) {
                function expensiveCheckFn(scope, locals, assign, inputs) {
                    var expensiveCheckOldValue = runningChecksEnabled;
                    runningChecksEnabled = !0;
                    try {
                        return fn(scope, locals, assign, inputs)
                    } finally {
                        runningChecksEnabled = expensiveCheckOldValue
                    }
                }

                if (!fn)return fn;
                expensiveCheckFn.$$watchDelegate = fn.$$watchDelegate, expensiveCheckFn.assign = expensiveChecksInterceptor(fn.assign), expensiveCheckFn.constant = fn.constant, expensiveCheckFn.literal = fn.literal;
                for (var i = 0; fn.inputs && i < fn.inputs.length; ++i)fn.inputs[i] = expensiveChecksInterceptor(fn.inputs[i]);
                return expensiveCheckFn.inputs = fn.inputs, expensiveCheckFn
            }

            function expressionInputDirtyCheck(newValue, oldValueOfValue) {
                return null == newValue || null == oldValueOfValue ? newValue === oldValueOfValue : "object" == typeof newValue && (newValue = getValueOf(newValue), "object" == typeof newValue) ? !1 : newValue === oldValueOfValue || newValue !== newValue && oldValueOfValue !== oldValueOfValue
            }

            function inputsWatchDelegate(scope, listener, objectEquality, parsedExpression, prettyPrintExpression) {
                var lastResult, inputExpressions = parsedExpression.inputs;
                if (1 === inputExpressions.length) {
                    var oldInputValueOf = expressionInputDirtyCheck;
                    return inputExpressions = inputExpressions[0], scope.$watch(function (scope) {
                        var newInputValue = inputExpressions(scope);
                        return expressionInputDirtyCheck(newInputValue, oldInputValueOf) || (lastResult = parsedExpression(scope, undefined, undefined, [newInputValue]), oldInputValueOf = newInputValue && getValueOf(newInputValue)), lastResult
                    }, listener, objectEquality, prettyPrintExpression)
                }
                for (var oldInputValueOfValues = [], oldInputValues = [], i = 0, ii = inputExpressions.length; ii > i; i++)oldInputValueOfValues[i] = expressionInputDirtyCheck, oldInputValues[i] = null;
                return scope.$watch(function (scope) {
                    for (var changed = !1, i = 0, ii = inputExpressions.length; ii > i; i++) {
                        var newInputValue = inputExpressions[i](scope);
                        (changed || (changed = !expressionInputDirtyCheck(newInputValue, oldInputValueOfValues[i]))) && (oldInputValues[i] = newInputValue, oldInputValueOfValues[i] = newInputValue && getValueOf(newInputValue))
                    }
                    return changed && (lastResult = parsedExpression(scope, undefined, undefined, oldInputValues)), lastResult
                }, listener, objectEquality, prettyPrintExpression)
            }

            function oneTimeWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                var unwatch, lastValue;
                return unwatch = scope.$watch(function (scope) {
                    return parsedExpression(scope)
                }, function (value, old, scope) {
                    lastValue = value, isFunction(listener) && listener.apply(this, arguments), isDefined(value) && scope.$$postDigest(function () {
                        isDefined(lastValue) && unwatch()
                    })
                }, objectEquality)
            }

            function oneTimeLiteralWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                function isAllDefined(value) {
                    var allDefined = !0;
                    return forEach(value, function (val) {
                        isDefined(val) || (allDefined = !1)
                    }), allDefined
                }

                var unwatch, lastValue;
                return unwatch = scope.$watch(function (scope) {
                    return parsedExpression(scope)
                }, function (value, old, scope) {
                    lastValue = value, isFunction(listener) && listener.call(this, value, old, scope), isAllDefined(value) && scope.$$postDigest(function () {
                        isAllDefined(lastValue) && unwatch()
                    })
                }, objectEquality)
            }

            function constantWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                var unwatch;
                return unwatch = scope.$watch(function (scope) {
                    return unwatch(), parsedExpression(scope)
                }, listener, objectEquality)
            }

            function addInterceptor(parsedExpression, interceptorFn) {
                if (!interceptorFn)return parsedExpression;
                var watchDelegate = parsedExpression.$$watchDelegate, useInputs = !1, regularWatch = watchDelegate !== oneTimeLiteralWatchDelegate && watchDelegate !== oneTimeWatchDelegate, fn = regularWatch ? function (scope, locals, assign, inputs) {
                    var value = useInputs && inputs ? inputs[0] : parsedExpression(scope, locals, assign, inputs);
                    return interceptorFn(value, scope, locals)
                } : function (scope, locals, assign, inputs) {
                    var value = parsedExpression(scope, locals, assign, inputs), result = interceptorFn(value, scope, locals);
                    return isDefined(value) ? result : value
                };
                return parsedExpression.$$watchDelegate && parsedExpression.$$watchDelegate !== inputsWatchDelegate ? fn.$$watchDelegate = parsedExpression.$$watchDelegate : interceptorFn.$stateful || (fn.$$watchDelegate = inputsWatchDelegate, useInputs = !parsedExpression.inputs, fn.inputs = parsedExpression.inputs ? parsedExpression.inputs : [parsedExpression]), fn
            }

            var noUnsafeEval = csp().noUnsafeEval, $parseOptions = {
                csp: noUnsafeEval,
                expensiveChecks: !1
            }, $parseOptionsExpensive = {csp: noUnsafeEval, expensiveChecks: !0}, runningChecksEnabled = !1;
            return $parse.$$runningExpensiveChecks = function () {
                return runningChecksEnabled
            }, $parse
        }]
    }

    function $QProvider() {
        this.$get = ["$rootScope", "$exceptionHandler", function ($rootScope, $exceptionHandler) {
            return qFactory(function (callback) {
                $rootScope.$evalAsync(callback)
            }, $exceptionHandler)
        }]
    }

    function $$QProvider() {
        this.$get = ["$browser", "$exceptionHandler", function ($browser, $exceptionHandler) {
            return qFactory(function (callback) {
                $browser.defer(callback)
            }, $exceptionHandler)
        }]
    }

    function qFactory(nextTick, exceptionHandler) {
        function Promise() {
            this.$$state = {status: 0}
        }

        function simpleBind(context, fn) {
            return function (value) {
                fn.call(context, value)
            }
        }

        function processQueue(state) {
            var fn, deferred, pending;
            pending = state.pending, state.processScheduled = !1, state.pending = undefined;
            for (var i = 0, ii = pending.length; ii > i; ++i) {
                deferred = pending[i][0], fn = pending[i][state.status];
                try {
                    isFunction(fn) ? deferred.resolve(fn(state.value)) : 1 === state.status ? deferred.resolve(state.value) : deferred.reject(state.value)
                } catch (e) {
                    deferred.reject(e), exceptionHandler(e)
                }
            }
        }

        function scheduleProcessQueue(state) {
            !state.processScheduled && state.pending && (state.processScheduled = !0, nextTick(function () {
                processQueue(state)
            }))
        }

        function Deferred() {
            this.promise = new Promise
        }

        function all(promises) {
            var deferred = new Deferred, counter = 0, results = isArray(promises) ? [] : {};
            return forEach(promises, function (promise, key) {
                counter++, when(promise).then(function (value) {
                    results.hasOwnProperty(key) || (results[key] = value, --counter || deferred.resolve(results))
                }, function (reason) {
                    results.hasOwnProperty(key) || deferred.reject(reason)
                })
            }), 0 === counter && deferred.resolve(results), deferred.promise
        }

        var $qMinErr = minErr("$q", TypeError), defer = function () {
            var d = new Deferred;
            return d.resolve = simpleBind(d, d.resolve), d.reject = simpleBind(d, d.reject), d.notify = simpleBind(d, d.notify), d
        };
        extend(Promise.prototype, {
            then: function (onFulfilled, onRejected, progressBack) {
                if (isUndefined(onFulfilled) && isUndefined(onRejected) && isUndefined(progressBack))return this;
                var result = new Deferred;
                return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([result, onFulfilled, onRejected, progressBack]), this.$$state.status > 0 && scheduleProcessQueue(this.$$state), result.promise
            }, "catch": function (callback) {
                return this.then(null, callback)
            }, "finally": function (callback, progressBack) {
                return this.then(function (value) {
                    return handleCallback(value, !0, callback)
                }, function (error) {
                    return handleCallback(error, !1, callback)
                }, progressBack)
            }
        }), extend(Deferred.prototype, {
            resolve: function (val) {
                this.promise.$$state.status || (val === this.promise ? this.$$reject($qMinErr("qcycle", "Expected promise to be resolved with value other than itself '{0}'", val)) : this.$$resolve(val))
            }, $$resolve: function (val) {
                function resolvePromise(val) {
                    done || (done = !0, that.$$resolve(val))
                }

                function rejectPromise(val) {
                    done || (done = !0, that.$$reject(val))
                }

                var then, that = this, done = !1;
                try {
                    (isObject(val) || isFunction(val)) && (then = val && val.then), isFunction(then) ? (this.promise.$$state.status = -1, then.call(val, resolvePromise, rejectPromise, simpleBind(this, this.notify))) : (this.promise.$$state.value = val, this.promise.$$state.status = 1, scheduleProcessQueue(this.promise.$$state))
                } catch (e) {
                    rejectPromise(e), exceptionHandler(e)
                }
            }, reject: function (reason) {
                this.promise.$$state.status || this.$$reject(reason)
            }, $$reject: function (reason) {
                this.promise.$$state.value = reason, this.promise.$$state.status = 2, scheduleProcessQueue(this.promise.$$state)
            }, notify: function (progress) {
                var callbacks = this.promise.$$state.pending;
                this.promise.$$state.status <= 0 && callbacks && callbacks.length && nextTick(function () {
                    for (var callback, result, i = 0, ii = callbacks.length; ii > i; i++) {
                        result = callbacks[i][0], callback = callbacks[i][3];
                        try {
                            result.notify(isFunction(callback) ? callback(progress) : progress)
                        } catch (e) {
                            exceptionHandler(e)
                        }
                    }
                })
            }
        });
        var reject = function (reason) {
            var result = new Deferred;
            return result.reject(reason), result.promise
        }, makePromise = function (value, resolved) {
            var result = new Deferred;
            return resolved ? result.resolve(value) : result.reject(value), result.promise
        }, handleCallback = function (value, isResolved, callback) {
            var callbackOutput = null;
            try {
                isFunction(callback) && (callbackOutput = callback())
            } catch (e) {
                return makePromise(e, !1)
            }
            return isPromiseLike(callbackOutput) ? callbackOutput.then(function () {
                return makePromise(value, isResolved)
            }, function (error) {
                return makePromise(error, !1)
            }) : makePromise(value, isResolved)
        }, when = function (value, callback, errback, progressBack) {
            var result = new Deferred;
            return result.resolve(value), result.promise.then(callback, errback, progressBack)
        }, resolve = when, $Q = function (resolver) {
            function resolveFn(value) {
                deferred.resolve(value)
            }

            function rejectFn(reason) {
                deferred.reject(reason)
            }

            if (!isFunction(resolver))throw $qMinErr("norslvr", "Expected resolverFn, got '{0}'", resolver);
            var deferred = new Deferred;
            return resolver(resolveFn, rejectFn), deferred.promise
        };
        return $Q.prototype = Promise.prototype, $Q.defer = defer, $Q.reject = reject, $Q.when = when, $Q.resolve = resolve, $Q.all = all, $Q
    }

    function $$RAFProvider() {
        this.$get = ["$window", "$timeout", function ($window, $timeout) {
            var requestAnimationFrame = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame, cancelAnimationFrame = $window.cancelAnimationFrame || $window.webkitCancelAnimationFrame || $window.webkitCancelRequestAnimationFrame, rafSupported = !!requestAnimationFrame, raf = rafSupported ? function (fn) {
                var id = requestAnimationFrame(fn);
                return function () {
                    cancelAnimationFrame(id)
                }
            } : function (fn) {
                var timer = $timeout(fn, 16.66, !1);
                return function () {
                    $timeout.cancel(timer)
                }
            };
            return raf.supported = rafSupported, raf
        }]
    }

    function $RootScopeProvider() {
        function createChildScopeClass(parent) {
            function ChildScope() {
                this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = nextUid(), this.$$ChildScope = null
            }

            return ChildScope.prototype = parent, ChildScope
        }

        var TTL = 10, $rootScopeMinErr = minErr("$rootScope"), lastDirtyWatch = null, applyAsyncId = null;
        this.digestTtl = function (value) {
            return arguments.length && (TTL = value), TTL
        }, this.$get = ["$exceptionHandler", "$parse", "$browser", function ($exceptionHandler, $parse, $browser) {
            function destroyChildScope($event) {
                $event.currentScope.$$destroyed = !0
            }

            function cleanUpScope($scope) {
                9 === msie && ($scope.$$childHead && cleanUpScope($scope.$$childHead), $scope.$$nextSibling && cleanUpScope($scope.$$nextSibling)), $scope.$parent = $scope.$$nextSibling = $scope.$$prevSibling = $scope.$$childHead = $scope.$$childTail = $scope.$root = $scope.$$watchers = null
            }

            function Scope() {
                this.$id = nextUid(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$$isolateBindings = null
            }

            function beginPhase(phase) {
                if ($rootScope.$$phase)throw $rootScopeMinErr("inprog", "{0} already in progress", $rootScope.$$phase);
                $rootScope.$$phase = phase
            }

            function clearPhase() {
                $rootScope.$$phase = null
            }

            function incrementWatchersCount(current, count) {
                do current.$$watchersCount += count; while (current = current.$parent)
            }

            function decrementListenerCount(current, count, name) {
                do current.$$listenerCount[name] -= count, 0 === current.$$listenerCount[name] && delete current.$$listenerCount[name]; while (current = current.$parent)
            }

            function initWatchVal() {
            }

            function flushApplyAsync() {
                for (; applyAsyncQueue.length;)try {
                    applyAsyncQueue.shift()()
                } catch (e) {
                    $exceptionHandler(e)
                }
                applyAsyncId = null
            }

            function scheduleApplyAsync() {
                null === applyAsyncId && (applyAsyncId = $browser.defer(function () {
                    $rootScope.$apply(flushApplyAsync)
                }))
            }

            Scope.prototype = {
                constructor: Scope, $new: function (isolate, parent) {
                    var child;
                    return parent = parent || this, isolate ? (child = new Scope, child.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = createChildScopeClass(this)), child = new this.$$ChildScope), child.$parent = parent, child.$$prevSibling = parent.$$childTail, parent.$$childHead ? (parent.$$childTail.$$nextSibling = child, parent.$$childTail = child) : parent.$$childHead = parent.$$childTail = child, (isolate || parent != this) && child.$on("$destroy", destroyChildScope), child
                }, $watch: function (watchExp, listener, objectEquality, prettyPrintExpression) {
                    var get = $parse(watchExp);
                    if (get.$$watchDelegate)return get.$$watchDelegate(this, listener, objectEquality, get, watchExp);
                    var scope = this, array = scope.$$watchers, watcher = {
                        fn: listener,
                        last: initWatchVal,
                        get: get,
                        exp: prettyPrintExpression || watchExp,
                        eq: !!objectEquality
                    };
                    return lastDirtyWatch = null, isFunction(listener) || (watcher.fn = noop), array || (array = scope.$$watchers = []), array.unshift(watcher), incrementWatchersCount(this, 1), function () {
                        arrayRemove(array, watcher) >= 0 && incrementWatchersCount(scope, -1), lastDirtyWatch = null
                    }
                }, $watchGroup: function (watchExpressions, listener) {
                    function watchGroupAction() {
                        changeReactionScheduled = !1, firstRun ? (firstRun = !1, listener(newValues, newValues, self)) : listener(newValues, oldValues, self)
                    }

                    var oldValues = new Array(watchExpressions.length), newValues = new Array(watchExpressions.length), deregisterFns = [], self = this, changeReactionScheduled = !1, firstRun = !0;
                    if (!watchExpressions.length) {
                        var shouldCall = !0;
                        return self.$evalAsync(function () {
                            shouldCall && listener(newValues, newValues, self)
                        }), function () {
                            shouldCall = !1
                        }
                    }
                    return 1 === watchExpressions.length ? this.$watch(watchExpressions[0], function (value, oldValue, scope) {
                        newValues[0] = value, oldValues[0] = oldValue, listener(newValues, value === oldValue ? newValues : oldValues, scope)
                    }) : (forEach(watchExpressions, function (expr, i) {
                        var unwatchFn = self.$watch(expr, function (value, oldValue) {
                            newValues[i] = value, oldValues[i] = oldValue, changeReactionScheduled || (changeReactionScheduled = !0, self.$evalAsync(watchGroupAction))
                        });
                        deregisterFns.push(unwatchFn)
                    }), function () {
                        for (; deregisterFns.length;)deregisterFns.shift()()
                    })
                }, $watchCollection: function (obj, listener) {
                    function $watchCollectionInterceptor(_value) {
                        newValue = _value;
                        var newLength, key, bothNaN, newItem, oldItem;
                        if (!isUndefined(newValue)) {
                            if (isObject(newValue))if (isArrayLike(newValue)) {
                                oldValue !== internalArray && (oldValue = internalArray, oldLength = oldValue.length = 0, changeDetected++), newLength = newValue.length, oldLength !== newLength && (changeDetected++, oldValue.length = oldLength = newLength);
                                for (var i = 0; newLength > i; i++)oldItem = oldValue[i], newItem = newValue[i], bothNaN = oldItem !== oldItem && newItem !== newItem, bothNaN || oldItem === newItem || (changeDetected++, oldValue[i] = newItem)
                            } else {
                                oldValue !== internalObject && (oldValue = internalObject = {}, oldLength = 0, changeDetected++), newLength = 0;
                                for (key in newValue)hasOwnProperty.call(newValue, key) && (newLength++, newItem = newValue[key], oldItem = oldValue[key], key in oldValue ? (bothNaN = oldItem !== oldItem && newItem !== newItem, bothNaN || oldItem === newItem || (changeDetected++, oldValue[key] = newItem)) : (oldLength++, oldValue[key] = newItem, changeDetected++));
                                if (oldLength > newLength) {
                                    changeDetected++;
                                    for (key in oldValue)hasOwnProperty.call(newValue, key) || (oldLength--, delete oldValue[key])
                                }
                            } else oldValue !== newValue && (oldValue = newValue, changeDetected++);
                            return changeDetected
                        }
                    }

                    function $watchCollectionAction() {
                        if (initRun ? (initRun = !1, listener(newValue, newValue, self)) : listener(newValue, veryOldValue, self), trackVeryOldValue)if (isObject(newValue))if (isArrayLike(newValue)) {
                            veryOldValue = new Array(newValue.length);
                            for (var i = 0; i < newValue.length; i++)veryOldValue[i] = newValue[i]
                        } else {
                            veryOldValue = {};
                            for (var key in newValue)hasOwnProperty.call(newValue, key) && (veryOldValue[key] = newValue[key])
                        } else veryOldValue = newValue
                    }

                    $watchCollectionInterceptor.$stateful = !0;
                    var newValue, oldValue, veryOldValue, self = this, trackVeryOldValue = listener.length > 1, changeDetected = 0, changeDetector = $parse(obj, $watchCollectionInterceptor), internalArray = [], internalObject = {}, initRun = !0, oldLength = 0;
                    return this.$watch(changeDetector, $watchCollectionAction)
                }, $digest: function () {
                    var watch, value, last, fn, get, watchers, length, dirty, next, current, logIdx, asyncTask, ttl = TTL, target = this, watchLog = [];
                    beginPhase("$digest"), $browser.$$checkUrlChange(), this === $rootScope && null !== applyAsyncId && ($browser.defer.cancel(applyAsyncId), flushApplyAsync()), lastDirtyWatch = null;
                    do {
                        for (dirty = !1, current = target; asyncQueue.length;) {
                            try {
                                asyncTask = asyncQueue.shift(), asyncTask.scope.$eval(asyncTask.expression, asyncTask.locals)
                            } catch (e) {
                                $exceptionHandler(e)
                            }
                            lastDirtyWatch = null
                        }
                        traverseScopesLoop:do {
                            if (watchers = current.$$watchers)for (length = watchers.length; length--;)try {
                                if (watch = watchers[length])if (get = watch.get, (value = get(current)) === (last = watch.last) || (watch.eq ? equals(value, last) : "number" == typeof value && "number" == typeof last && isNaN(value) && isNaN(last))) {
                                    if (watch === lastDirtyWatch) {
                                        dirty = !1;
                                        break traverseScopesLoop
                                    }
                                } else dirty = !0, lastDirtyWatch = watch, watch.last = watch.eq ? copy(value, null) : value, fn = watch.fn, fn(value, last === initWatchVal ? value : last, current), 5 > ttl && (logIdx = 4 - ttl, watchLog[logIdx] || (watchLog[logIdx] = []), watchLog[logIdx].push({
                                    msg: isFunction(watch.exp) ? "fn: " + (watch.exp.name || watch.exp.toString()) : watch.exp,
                                    newVal: value,
                                    oldVal: last
                                }))
                            } catch (e) {
                                $exceptionHandler(e)
                            }
                            if (!(next = current.$$watchersCount && current.$$childHead || current !== target && current.$$nextSibling))for (; current !== target && !(next = current.$$nextSibling);)current = current.$parent
                        } while (current = next);
                        if ((dirty || asyncQueue.length) && !ttl--)throw clearPhase(), $rootScopeMinErr("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", TTL, watchLog)
                    } while (dirty || asyncQueue.length);
                    for (clearPhase(); postDigestQueue.length;)try {
                        postDigestQueue.shift()()
                    } catch (e) {
                        $exceptionHandler(e)
                    }
                }, $destroy: function () {
                    if (!this.$$destroyed) {
                        var parent = this.$parent;
                        this.$broadcast("$destroy"), this.$$destroyed = !0, this === $rootScope && $browser.$$applicationDestroyed(), incrementWatchersCount(this, -this.$$watchersCount);
                        for (var eventName in this.$$listenerCount)decrementListenerCount(this, this.$$listenerCount[eventName], eventName);
                        parent && parent.$$childHead == this && (parent.$$childHead = this.$$nextSibling), parent && parent.$$childTail == this && (parent.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = noop, this.$on = this.$watch = this.$watchGroup = function () {
                            return noop
                        }, this.$$listeners = {}, this.$$nextSibling = null, cleanUpScope(this)
                    }
                }, $eval: function (expr, locals) {
                    return $parse(expr)(this, locals)
                }, $evalAsync: function (expr, locals) {
                    $rootScope.$$phase || asyncQueue.length || $browser.defer(function () {
                        asyncQueue.length && $rootScope.$digest()
                    }), asyncQueue.push({scope: this, expression: $parse(expr), locals: locals})
                }, $$postDigest: function (fn) {
                    postDigestQueue.push(fn)
                }, $apply: function (expr) {
                    try {
                        beginPhase("$apply");
                        try {
                            return this.$eval(expr)
                        } finally {
                            clearPhase()
                        }
                    } catch (e) {
                        $exceptionHandler(e)
                    } finally {
                        try {
                            $rootScope.$digest()
                        } catch (e) {
                            throw $exceptionHandler(e), e
                        }
                    }
                }, $applyAsync: function (expr) {
                    function $applyAsyncExpression() {
                        scope.$eval(expr)
                    }

                    var scope = this;
                    expr && applyAsyncQueue.push($applyAsyncExpression), expr = $parse(expr), scheduleApplyAsync()
                }, $on: function (name, listener) {
                    var namedListeners = this.$$listeners[name];
                    namedListeners || (this.$$listeners[name] = namedListeners = []), namedListeners.push(listener);
                    var current = this;
                    do current.$$listenerCount[name] || (current.$$listenerCount[name] = 0), current.$$listenerCount[name]++; while (current = current.$parent);
                    var self = this;
                    return function () {
                        var indexOfListener = namedListeners.indexOf(listener);
                        -1 !== indexOfListener && (namedListeners[indexOfListener] = null, decrementListenerCount(self, 1, name))
                    }
                }, $emit: function (name, args) {
                    var namedListeners, i, length, empty = [], scope = this, stopPropagation = !1, event = {
                        name: name,
                        targetScope: scope,
                        stopPropagation: function () {
                            stopPropagation = !0
                        },
                        preventDefault: function () {
                            event.defaultPrevented = !0
                        },
                        defaultPrevented: !1
                    }, listenerArgs = concat([event], arguments, 1);
                    do {
                        for (namedListeners = scope.$$listeners[name] || empty, event.currentScope = scope, i = 0, length = namedListeners.length; length > i; i++)if (namedListeners[i])try {
                            namedListeners[i].apply(null, listenerArgs)
                        } catch (e) {
                            $exceptionHandler(e)
                        } else namedListeners.splice(i, 1), i--, length--;
                        if (stopPropagation)return event.currentScope = null, event;
                        scope = scope.$parent
                    } while (scope);
                    return event.currentScope = null, event
                }, $broadcast: function (name, args) {
                    var target = this, current = target, next = target, event = {
                        name: name,
                        targetScope: target,
                        preventDefault: function () {
                            event.defaultPrevented = !0
                        },
                        defaultPrevented: !1
                    };
                    if (!target.$$listenerCount[name])return event;
                    for (var listeners, i, length, listenerArgs = concat([event], arguments, 1); current = next;) {
                        for (event.currentScope = current, listeners = current.$$listeners[name] || [], i = 0, length = listeners.length; length > i; i++)if (listeners[i])try {
                            listeners[i].apply(null, listenerArgs)
                        } catch (e) {
                            $exceptionHandler(e)
                        } else listeners.splice(i, 1), i--, length--;
                        if (!(next = current.$$listenerCount[name] && current.$$childHead || current !== target && current.$$nextSibling))for (; current !== target && !(next = current.$$nextSibling);)current = current.$parent
                    }
                    return event.currentScope = null, event
                }
            };
            var $rootScope = new Scope, asyncQueue = $rootScope.$$asyncQueue = [], postDigestQueue = $rootScope.$$postDigestQueue = [], applyAsyncQueue = $rootScope.$$applyAsyncQueue = [];
            return $rootScope
        }]
    }

    function $$SanitizeUriProvider() {
        var aHrefSanitizationWhitelist = /^\s*(https?|ftp|mailto|tel|file):/, imgSrcSanitizationWhitelist = /^\s*((https?|ftp|file|blob):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function (regexp) {
            return isDefined(regexp) ? (aHrefSanitizationWhitelist = regexp, this) : aHrefSanitizationWhitelist
        }, this.imgSrcSanitizationWhitelist = function (regexp) {
            return isDefined(regexp) ? (imgSrcSanitizationWhitelist = regexp, this) : imgSrcSanitizationWhitelist
        }, this.$get = function () {
            return function (uri, isImage) {
                var normalizedVal, regex = isImage ? imgSrcSanitizationWhitelist : aHrefSanitizationWhitelist;
                return normalizedVal = urlResolve(uri).href, "" === normalizedVal || normalizedVal.match(regex) ? uri : "unsafe:" + normalizedVal
            }
        }
    }

    function adjustMatcher(matcher) {
        if ("self" === matcher)return matcher;
        if (isString(matcher)) {
            if (matcher.indexOf("***") > -1)throw $sceMinErr("iwcard", "Illegal sequence *** in string matcher.  String: {0}", matcher);
            return matcher = escapeForRegexp(matcher).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + matcher + "$")
        }
        if (isRegExp(matcher))return new RegExp("^" + matcher.source + "$");
        throw $sceMinErr("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
    }

    function adjustMatchers(matchers) {
        var adjustedMatchers = [];
        return isDefined(matchers) && forEach(matchers, function (matcher) {
            adjustedMatchers.push(adjustMatcher(matcher))
        }), adjustedMatchers
    }

    function $SceDelegateProvider() {
        this.SCE_CONTEXTS = SCE_CONTEXTS;
        var resourceUrlWhitelist = ["self"], resourceUrlBlacklist = [];
        this.resourceUrlWhitelist = function (value) {
            return arguments.length && (resourceUrlWhitelist = adjustMatchers(value)), resourceUrlWhitelist
        }, this.resourceUrlBlacklist = function (value) {
            return arguments.length && (resourceUrlBlacklist = adjustMatchers(value)), resourceUrlBlacklist
        }, this.$get = ["$injector", function ($injector) {
            function matchUrl(matcher, parsedUrl) {
                return "self" === matcher ? urlIsSameOrigin(parsedUrl) : !!matcher.exec(parsedUrl.href)
            }

            function isResourceUrlAllowedByPolicy(url) {
                var i, n, parsedUrl = urlResolve(url.toString()), allowed = !1;
                for (i = 0, n = resourceUrlWhitelist.length; n > i; i++)if (matchUrl(resourceUrlWhitelist[i], parsedUrl)) {
                    allowed = !0;
                    break
                }
                if (allowed)for (i = 0, n = resourceUrlBlacklist.length; n > i; i++)if (matchUrl(resourceUrlBlacklist[i], parsedUrl)) {
                    allowed = !1;
                    break
                }
                return allowed
            }

            function generateHolderType(Base) {
                var holderType = function (trustedValue) {
                    this.$$unwrapTrustedValue = function () {
                        return trustedValue
                    }
                };
                return Base && (holderType.prototype = new Base), holderType.prototype.valueOf = function () {
                    return this.$$unwrapTrustedValue()
                }, holderType.prototype.toString = function () {
                    return this.$$unwrapTrustedValue().toString()
                }, holderType
            }

            function trustAs(type, trustedValue) {
                var Constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                if (!Constructor)throw $sceMinErr("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", type, trustedValue);
                if (null === trustedValue || isUndefined(trustedValue) || "" === trustedValue)return trustedValue;
                if ("string" != typeof trustedValue)throw $sceMinErr("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", type);
                return new Constructor(trustedValue)
            }

            function valueOf(maybeTrusted) {
                return maybeTrusted instanceof trustedValueHolderBase ? maybeTrusted.$$unwrapTrustedValue() : maybeTrusted
            }

            function getTrusted(type, maybeTrusted) {
                if (null === maybeTrusted || isUndefined(maybeTrusted) || "" === maybeTrusted)return maybeTrusted;
                var constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                if (constructor && maybeTrusted instanceof constructor)return maybeTrusted.$$unwrapTrustedValue();
                if (type === SCE_CONTEXTS.RESOURCE_URL) {
                    if (isResourceUrlAllowedByPolicy(maybeTrusted))return maybeTrusted;
                    throw $sceMinErr("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", maybeTrusted.toString())
                }
                if (type === SCE_CONTEXTS.HTML)return htmlSanitizer(maybeTrusted);
                throw $sceMinErr("unsafe", "Attempting to use an unsafe value in a safe context.")
            }

            var htmlSanitizer = function (html) {
                throw $sceMinErr("unsafe", "Attempting to use an unsafe value in a safe context.")
            };
            $injector.has("$sanitize") && (htmlSanitizer = $injector.get("$sanitize"));
            var trustedValueHolderBase = generateHolderType(), byType = {};
            return byType[SCE_CONTEXTS.HTML] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.CSS] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.URL] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.JS] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.RESOURCE_URL] = generateHolderType(byType[SCE_CONTEXTS.URL]), {
                trustAs: trustAs,
                getTrusted: getTrusted,
                valueOf: valueOf
            }
        }]
    }

    function $SceProvider() {
        var enabled = !0;
        this.enabled = function (value) {
            return arguments.length && (enabled = !!value), enabled
        }, this.$get = ["$parse", "$sceDelegate", function ($parse, $sceDelegate) {
            if (enabled && 8 > msie)throw $sceMinErr("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
            var sce = shallowCopy(SCE_CONTEXTS);
            sce.isEnabled = function () {
                return enabled
            }, sce.trustAs = $sceDelegate.trustAs, sce.getTrusted = $sceDelegate.getTrusted, sce.valueOf = $sceDelegate.valueOf, enabled || (sce.trustAs = sce.getTrusted = function (type, value) {
                return value
            }, sce.valueOf = identity), sce.parseAs = function (type, expr) {
                var parsed = $parse(expr);
                return parsed.literal && parsed.constant ? parsed : $parse(expr, function (value) {
                    return sce.getTrusted(type, value)
                })
            };
            var parse = sce.parseAs, getTrusted = sce.getTrusted, trustAs = sce.trustAs;
            return forEach(SCE_CONTEXTS, function (enumValue, name) {
                var lName = lowercase(name);
                sce[camelCase("parse_as_" + lName)] = function (expr) {
                    return parse(enumValue, expr)
                }, sce[camelCase("get_trusted_" + lName)] = function (value) {
                    return getTrusted(enumValue, value)
                }, sce[camelCase("trust_as_" + lName)] = function (value) {
                    return trustAs(enumValue, value)
                }
            }), sce
        }]
    }

    function $SnifferProvider() {
        this.$get = ["$window", "$document", function ($window, $document) {
            var vendorPrefix, match, eventSupport = {}, android = toInt((/android (\d+)/.exec(lowercase(($window.navigator || {}).userAgent)) || [])[1]), boxee = /Boxee/i.test(($window.navigator || {}).userAgent), document = $document[0] || {}, vendorRegex = /^(Moz|webkit|ms)(?=[A-Z])/, bodyStyle = document.body && document.body.style, transitions = !1, animations = !1;
            if (bodyStyle) {
                for (var prop in bodyStyle)if (match = vendorRegex.exec(prop)) {
                    vendorPrefix = match[0], vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1);
                    break
                }
                vendorPrefix || (vendorPrefix = "WebkitOpacity" in bodyStyle && "webkit"), transitions = !!("transition" in bodyStyle || vendorPrefix + "Transition" in bodyStyle), animations = !!("animation" in bodyStyle || vendorPrefix + "Animation" in bodyStyle), !android || transitions && animations || (transitions = isString(bodyStyle.webkitTransition), animations = isString(bodyStyle.webkitAnimation))
            }
            return {
                history: !(!$window.history || !$window.history.pushState || 4 > android || boxee),
                hasEvent: function (event) {
                    if ("input" === event && 11 >= msie)return !1;
                    if (isUndefined(eventSupport[event])) {
                        var divElm = document.createElement("div");
                        eventSupport[event] = "on" + event in divElm
                    }
                    return eventSupport[event]
                },
                csp: csp(),
                vendorPrefix: vendorPrefix,
                transitions: transitions,
                animations: animations,
                android: android
            }
        }]
    }

    function $TemplateRequestProvider() {
        var httpOptions;
        this.httpOptions = function (val) {
            return val ? (httpOptions = val, this) : httpOptions
        }, this.$get = ["$templateCache", "$http", "$q", "$sce", function ($templateCache, $http, $q, $sce) {
            function handleRequestFn(tpl, ignoreRequestError) {
                function handleError(resp) {
                    if (!ignoreRequestError)throw $compileMinErr("tpload", "Failed to load template: {0} (HTTP status: {1} {2})", tpl, resp.status, resp.statusText);
                    return $q.reject(resp)
                }

                handleRequestFn.totalPendingRequests++, isString(tpl) && $templateCache.get(tpl) || (tpl = $sce.getTrustedResourceUrl(tpl));
                var transformResponse = $http.defaults && $http.defaults.transformResponse;
                return isArray(transformResponse) ? transformResponse = transformResponse.filter(function (transformer) {
                    return transformer !== defaultHttpResponseTransform
                }) : transformResponse === defaultHttpResponseTransform && (transformResponse = null), $http.get(tpl, extend({
                    cache: $templateCache,
                    transformResponse: transformResponse
                }, httpOptions))["finally"](function () {
                    handleRequestFn.totalPendingRequests--
                }).then(function (response) {
                    return $templateCache.put(tpl, response.data), response.data
                }, handleError)
            }

            return handleRequestFn.totalPendingRequests = 0, handleRequestFn
        }]
    }

    function $$TestabilityProvider() {
        this.$get = ["$rootScope", "$browser", "$location", function ($rootScope, $browser, $location) {
            var testability = {};
            return testability.findBindings = function (element, expression, opt_exactMatch) {
                var bindings = element.getElementsByClassName("ng-binding"), matches = [];
                return forEach(bindings, function (binding) {
                    var dataBinding = angular.element(binding).data("$binding");
                    dataBinding && forEach(dataBinding, function (bindingName) {
                        if (opt_exactMatch) {
                            var matcher = new RegExp("(^|\\s)" + escapeForRegexp(expression) + "(\\s|\\||$)");
                            matcher.test(bindingName) && matches.push(binding)
                        } else-1 != bindingName.indexOf(expression) && matches.push(binding)
                    })
                }), matches
            }, testability.findModels = function (element, expression, opt_exactMatch) {
                for (var prefixes = ["ng-", "data-ng-", "ng\\:"], p = 0; p < prefixes.length; ++p) {
                    var attributeEquals = opt_exactMatch ? "=" : "*=", selector = "[" + prefixes[p] + "model" + attributeEquals + '"' + expression + '"]', elements = element.querySelectorAll(selector);
                    if (elements.length)return elements
                }
            }, testability.getLocation = function () {
                return $location.url()
            }, testability.setLocation = function (url) {
                url !== $location.url() && ($location.url(url), $rootScope.$digest())
            }, testability.whenStable = function (callback) {
                $browser.notifyWhenNoOutstandingRequests(callback)
            }, testability
        }]
    }

    function $TimeoutProvider() {
        this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function ($rootScope, $browser, $q, $$q, $exceptionHandler) {
            function timeout(fn, delay, invokeApply) {
                isFunction(fn) || (invokeApply = delay, delay = fn, fn = noop);
                var timeoutId, args = sliceArgs(arguments, 3), skipApply = isDefined(invokeApply) && !invokeApply, deferred = (skipApply ? $$q : $q).defer(), promise = deferred.promise;
                return timeoutId = $browser.defer(function () {
                    try {
                        deferred.resolve(fn.apply(null, args))
                    } catch (e) {
                        deferred.reject(e), $exceptionHandler(e)
                    } finally {
                        delete deferreds[promise.$$timeoutId]
                    }
                    skipApply || $rootScope.$apply()
                }, delay), promise.$$timeoutId = timeoutId, deferreds[timeoutId] = deferred, promise
            }

            var deferreds = {};
            return timeout.cancel = function (promise) {
                return promise && promise.$$timeoutId in deferreds ? (deferreds[promise.$$timeoutId].reject("canceled"), delete deferreds[promise.$$timeoutId], $browser.defer.cancel(promise.$$timeoutId)) : !1
            }, timeout
        }]
    }

    function urlResolve(url) {
        var href = url;
        return msie && (urlParsingNode.setAttribute("href", href), href = urlParsingNode.href), urlParsingNode.setAttribute("href", href), {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: "/" === urlParsingNode.pathname.charAt(0) ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        }
    }

    function urlIsSameOrigin(requestUrl) {
        var parsed = isString(requestUrl) ? urlResolve(requestUrl) : requestUrl;
        return parsed.protocol === originUrl.protocol && parsed.host === originUrl.host
    }

    function $WindowProvider() {
        this.$get = valueFn(window)
    }

    function $$CookieReader($document) {
        function safeDecodeURIComponent(str) {
            try {
                return decodeURIComponent(str)
            } catch (e) {
                return str
            }
        }

        var rawDocument = $document[0] || {}, lastCookies = {}, lastCookieString = "";
        return function () {
            var cookieArray, cookie, i, index, name, currentCookieString = rawDocument.cookie || "";
            if (currentCookieString !== lastCookieString)for (lastCookieString = currentCookieString, cookieArray = lastCookieString.split("; "), lastCookies = {}, i = 0; i < cookieArray.length; i++)cookie = cookieArray[i], index = cookie.indexOf("="), index > 0 && (name = safeDecodeURIComponent(cookie.substring(0, index)), isUndefined(lastCookies[name]) && (lastCookies[name] = safeDecodeURIComponent(cookie.substring(index + 1))));
            return lastCookies
        }
    }

    function $$CookieReaderProvider() {
        this.$get = $$CookieReader
    }

    function $FilterProvider($provide) {
        function register(name, factory) {
            if (isObject(name)) {
                var filters = {};
                return forEach(name, function (filter, key) {
                    filters[key] = register(key, filter)
                }), filters
            }
            return $provide.factory(name + suffix, factory)
        }

        var suffix = "Filter";
        this.register = register, this.$get = ["$injector", function ($injector) {
            return function (name) {
                return $injector.get(name + suffix)
            }
        }], register("currency", currencyFilter), register("date", dateFilter), register("filter", filterFilter), register("json", jsonFilter), register("limitTo", limitToFilter), register("lowercase", lowercaseFilter), register("number", numberFilter), register("orderBy", orderByFilter), register("uppercase", uppercaseFilter)
    }

    function filterFilter() {
        return function (array, expression, comparator) {
            if (!isArrayLike(array)) {
                if (null == array)return array;
                throw minErr("filter")("notarray", "Expected array but received: {0}", array)
            }
            var predicateFn, matchAgainstAnyProp, expressionType = getTypeForFilter(expression);
            switch (expressionType) {
                case"function":
                    predicateFn = expression;
                    break;
                case"boolean":
                case"null":
                case"number":
                case"string":
                    matchAgainstAnyProp = !0;
                case"object":
                    predicateFn = createPredicateFn(expression, comparator, matchAgainstAnyProp);
                    break;
                default:
                    return array
            }
            return Array.prototype.filter.call(array, predicateFn)
        }
    }

    function createPredicateFn(expression, comparator, matchAgainstAnyProp) {
        var predicateFn, shouldMatchPrimitives = isObject(expression) && "$" in expression;
        return comparator === !0 ? comparator = equals : isFunction(comparator) || (comparator = function (actual, expected) {
            return isUndefined(actual) ? !1 : null === actual || null === expected ? actual === expected : isObject(expected) || isObject(actual) && !hasCustomToString(actual) ? !1 : (actual = lowercase("" + actual), expected = lowercase("" + expected), -1 !== actual.indexOf(expected))
        }), predicateFn = function (item) {
            return shouldMatchPrimitives && !isObject(item) ? deepCompare(item, expression.$, comparator, !1) : deepCompare(item, expression, comparator, matchAgainstAnyProp)
        }
    }

    function deepCompare(actual, expected, comparator, matchAgainstAnyProp, dontMatchWholeObject) {
        var actualType = getTypeForFilter(actual), expectedType = getTypeForFilter(expected);
        if ("string" === expectedType && "!" === expected.charAt(0))return !deepCompare(actual, expected.substring(1), comparator, matchAgainstAnyProp);
        if (isArray(actual))return actual.some(function (item) {
            return deepCompare(item, expected, comparator, matchAgainstAnyProp)
        });
        switch (actualType) {
            case"object":
                var key;
                if (matchAgainstAnyProp) {
                    for (key in actual)if ("$" !== key.charAt(0) && deepCompare(actual[key], expected, comparator, !0))return !0;
                    return dontMatchWholeObject ? !1 : deepCompare(actual, expected, comparator, !1)
                }
                if ("object" === expectedType) {
                    for (key in expected) {
                        var expectedVal = expected[key];
                        if (!isFunction(expectedVal) && !isUndefined(expectedVal)) {
                            var matchAnyProperty = "$" === key, actualVal = matchAnyProperty ? actual : actual[key];
                            if (!deepCompare(actualVal, expectedVal, comparator, matchAnyProperty, matchAnyProperty))return !1
                        }
                    }
                    return !0
                }
                return comparator(actual, expected);
            case"function":
                return !1;
            default:
                return comparator(actual, expected)
        }
    }

    function getTypeForFilter(val) {
        return null === val ? "null" : typeof val
    }

    function currencyFilter($locale) {
        var formats = $locale.NUMBER_FORMATS;
        return function (amount, currencySymbol, fractionSize) {
            return isUndefined(currencySymbol) && (currencySymbol = formats.CURRENCY_SYM), isUndefined(fractionSize) && (fractionSize = formats.PATTERNS[1].maxFrac), null == amount ? amount : formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize).replace(/\u00A4/g, currencySymbol)
        }
    }

    function numberFilter($locale) {
        var formats = $locale.NUMBER_FORMATS;
        return function (number, fractionSize) {
            return null == number ? number : formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize)
        }
    }

    function parse(numStr) {
        var digits, numberOfIntegerDigits, i, j, zeros, exponent = 0;
        for ((numberOfIntegerDigits = numStr.indexOf(DECIMAL_SEP)) > -1 && (numStr = numStr.replace(DECIMAL_SEP, "")), (i = numStr.search(/e/i)) > 0 ? (0 > numberOfIntegerDigits && (numberOfIntegerDigits = i), numberOfIntegerDigits += +numStr.slice(i + 1), numStr = numStr.substring(0, i)) : 0 > numberOfIntegerDigits && (numberOfIntegerDigits = numStr.length), i = 0; numStr.charAt(i) == ZERO_CHAR; i++);
        if (i == (zeros = numStr.length))digits = [0], numberOfIntegerDigits = 1; else {
            for (zeros--; numStr.charAt(zeros) == ZERO_CHAR;)zeros--;
            for (numberOfIntegerDigits -= i, digits = [], j = 0; zeros >= i; i++, j++)digits[j] = +numStr.charAt(i)
        }
        return numberOfIntegerDigits > MAX_DIGITS && (digits = digits.splice(0, MAX_DIGITS - 1), exponent = numberOfIntegerDigits - 1, numberOfIntegerDigits = 1), {
            d: digits,
            e: exponent,
            i: numberOfIntegerDigits
        }
    }

    function roundNumber(parsedNumber, fractionSize, minFrac, maxFrac) {
        var digits = parsedNumber.d, fractionLen = digits.length - parsedNumber.i;
        fractionSize = isUndefined(fractionSize) ? Math.min(Math.max(minFrac, fractionLen), maxFrac) : +fractionSize;
        var roundAt = fractionSize + parsedNumber.i, digit = digits[roundAt];
        if (roundAt > 0)digits.splice(roundAt); else {
            parsedNumber.i = 1, digits.length = roundAt = fractionSize + 1;
            for (var i = 0; roundAt > i; i++)digits[i] = 0
        }
        for (digit >= 5 && digits[roundAt - 1]++; fractionSize > fractionLen; fractionLen++)digits.push(0);
        var carry = digits.reduceRight(function (carry, d, i, digits) {
            return d += carry, digits[i] = d % 10, Math.floor(d / 10)
        }, 0);
        carry && (digits.unshift(carry), parsedNumber.i++)
    }

    function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
        if (!isString(number) && !isNumber(number) || isNaN(number))return "";
        var parsedNumber, isInfinity = !isFinite(number), isZero = !1, numStr = Math.abs(number) + "", formattedText = "";
        if (isInfinity)formattedText = "∞"; else {
            parsedNumber = parse(numStr), roundNumber(parsedNumber, fractionSize, pattern.minFrac, pattern.maxFrac);
            var digits = parsedNumber.d, integerLen = parsedNumber.i, exponent = parsedNumber.e, decimals = [];
            for (isZero = digits.reduce(function (isZero, d) {
                return isZero && !d
            }, !0); 0 > integerLen;)digits.unshift(0), integerLen++;
            integerLen > 0 ? decimals = digits.splice(integerLen) : (decimals = digits, digits = [0]);
            var groups = [];
            for (digits.length > pattern.lgSize && groups.unshift(digits.splice(-pattern.lgSize).join("")); digits.length > pattern.gSize;)groups.unshift(digits.splice(-pattern.gSize).join(""));
            digits.length && groups.unshift(digits.join("")), formattedText = groups.join(groupSep), decimals.length && (formattedText += decimalSep + decimals.join("")), exponent && (formattedText += "e+" + exponent)
        }
        return 0 > number && !isZero ? pattern.negPre + formattedText + pattern.negSuf : pattern.posPre + formattedText + pattern.posSuf
    }

    function padNumber(num, digits, trim) {
        var neg = "";
        for (0 > num && (neg = "-", num = -num), num = "" + num; num.length < digits;)num = ZERO_CHAR + num;
        return trim && (num = num.substr(num.length - digits)), neg + num
    }

    function dateGetter(name, size, offset, trim) {
        return offset = offset || 0, function (date) {
            var value = date["get" + name]();
            return (offset > 0 || value > -offset) && (value += offset), 0 === value && -12 == offset && (value = 12), padNumber(value, size, trim)
        }
    }

    function dateStrGetter(name, shortForm) {
        return function (date, formats) {
            var value = date["get" + name](), get = uppercase(shortForm ? "SHORT" + name : name);
            return formats[get][value]
        }
    }

    function timeZoneGetter(date, formats, offset) {
        var zone = -1 * offset, paddedZone = zone >= 0 ? "+" : "";
        return paddedZone += padNumber(Math[zone > 0 ? "floor" : "ceil"](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2)
    }

    function getFirstThursdayOfYear(year) {
        var dayOfWeekOnFirst = new Date(year, 0, 1).getDay();
        return new Date(year, 0, (4 >= dayOfWeekOnFirst ? 5 : 12) - dayOfWeekOnFirst)
    }

    function getThursdayThisWeek(datetime) {
        return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate() + (4 - datetime.getDay()))
    }

    function weekGetter(size) {
        return function (date) {
            var firstThurs = getFirstThursdayOfYear(date.getFullYear()), thisThurs = getThursdayThisWeek(date), diff = +thisThurs - +firstThurs, result = 1 + Math.round(diff / 6048e5);
            return padNumber(result, size)
        }
    }

    function ampmGetter(date, formats) {
        return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1]
    }

    function eraGetter(date, formats) {
        return date.getFullYear() <= 0 ? formats.ERAS[0] : formats.ERAS[1]
    }

    function longEraGetter(date, formats) {
        return date.getFullYear() <= 0 ? formats.ERANAMES[0] : formats.ERANAMES[1]
    }

    function dateFilter($locale) {
        function jsonStringToDate(string) {
            var match;
            if (match = string.match(R_ISO8601_STR)) {
                var date = new Date(0), tzHour = 0, tzMin = 0, dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear, timeSetter = match[8] ? date.setUTCHours : date.setHours;
                match[9] && (tzHour = toInt(match[9] + match[10]), tzMin = toInt(match[9] + match[11])), dateSetter.call(date, toInt(match[1]), toInt(match[2]) - 1, toInt(match[3]));
                var h = toInt(match[4] || 0) - tzHour, m = toInt(match[5] || 0) - tzMin, s = toInt(match[6] || 0), ms = Math.round(1e3 * parseFloat("0." + (match[7] || 0)));
                return timeSetter.call(date, h, m, s, ms), date
            }
            return string
        }

        var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function (date, format, timezone) {
            var fn, match, text = "", parts = [];
            if (format = format || "mediumDate", format = $locale.DATETIME_FORMATS[format] || format, isString(date) && (date = NUMBER_STRING.test(date) ? toInt(date) : jsonStringToDate(date)), isNumber(date) && (date = new Date(date)), !isDate(date) || !isFinite(date.getTime()))return date;
            for (; format;)match = DATE_FORMATS_SPLIT.exec(format), match ? (parts = concat(parts, match, 1), format = parts.pop()) : (parts.push(format), format = null);
            var dateTimezoneOffset = date.getTimezoneOffset();
            return timezone && (dateTimezoneOffset = timezoneToOffset(timezone, dateTimezoneOffset), date = convertTimezoneToLocal(date, timezone, !0)), forEach(parts, function (value) {
                fn = DATE_FORMATS[value], text += fn ? fn(date, $locale.DATETIME_FORMATS, dateTimezoneOffset) : "''" === value ? "'" : value.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            }), text
        }
    }

    function jsonFilter() {
        return function (object, spacing) {
            return isUndefined(spacing) && (spacing = 2), toJson(object, spacing)
        }
    }

    function limitToFilter() {
        return function (input, limit, begin) {
            return limit = Math.abs(Number(limit)) === 1 / 0 ? Number(limit) : toInt(limit), isNaN(limit) ? input : (isNumber(input) && (input = input.toString()), isArray(input) || isString(input) ? (begin = !begin || isNaN(begin) ? 0 : toInt(begin), begin = 0 > begin ? Math.max(0, input.length + begin) : begin, limit >= 0 ? input.slice(begin, begin + limit) : 0 === begin ? input.slice(limit, input.length) : input.slice(Math.max(0, begin + limit), begin)) : input)
        }
    }

    function orderByFilter($parse) {
        function processPredicates(sortPredicate, reverseOrder) {
            return reverseOrder = reverseOrder ? -1 : 1, sortPredicate.map(function (predicate) {
                var descending = 1, get = identity;
                if (isFunction(predicate))get = predicate; else if (isString(predicate) && ("+" != predicate.charAt(0) && "-" != predicate.charAt(0) || (descending = "-" == predicate.charAt(0) ? -1 : 1, predicate = predicate.substring(1)), "" !== predicate && (get = $parse(predicate), get.constant))) {
                    var key = get();
                    get = function (value) {
                        return value[key]
                    }
                }
                return {get: get, descending: descending * reverseOrder}
            })
        }

        function isPrimitive(value) {
            switch (typeof value) {
                case"number":
                case"boolean":
                case"string":
                    return !0;
                default:
                    return !1
            }
        }

        function objectValue(value, index) {
            return "function" == typeof value.valueOf && (value = value.valueOf(), isPrimitive(value)) ? value : hasCustomToString(value) && (value = value.toString(), isPrimitive(value)) ? value : index
        }

        function getPredicateValue(value, index) {
            var type = typeof value;
            return null === value ? (type = "string", value = "null") : "string" === type ? value = value.toLowerCase() : "object" === type && (value = objectValue(value, index)), {
                value: value,
                type: type
            }
        }

        function compare(v1, v2) {
            var result = 0;
            return v1.type === v2.type ? v1.value !== v2.value && (result = v1.value < v2.value ? -1 : 1) : result = v1.type < v2.type ? -1 : 1, result
        }

        return function (array, sortPredicate, reverseOrder) {
            function getComparisonObject(value, index) {
                return {
                    value: value, predicateValues: predicates.map(function (predicate) {
                        return getPredicateValue(predicate.get(value), index)
                    })
                }
            }

            function doComparison(v1, v2) {
                for (var result = 0, index = 0, length = predicates.length; length > index && !(result = compare(v1.predicateValues[index], v2.predicateValues[index]) * predicates[index].descending); ++index);
                return result
            }

            if (null == array)return array;
            if (!isArrayLike(array))throw minErr("orderBy")("notarray", "Expected array but received: {0}", array);
            isArray(sortPredicate) || (sortPredicate = [sortPredicate]), 0 === sortPredicate.length && (sortPredicate = ["+"]);
            var predicates = processPredicates(sortPredicate, reverseOrder);
            predicates.push({
                get: function () {
                    return {}
                }, descending: reverseOrder ? -1 : 1
            });
            var compareValues = Array.prototype.map.call(array, getComparisonObject);
            return compareValues.sort(doComparison), array = compareValues.map(function (item) {
                return item.value
            })
        }
    }

    function ngDirective(directive) {
        return isFunction(directive) && (directive = {link: directive}), directive.restrict = directive.restrict || "AC", valueFn(directive)
    }

    function nullFormRenameControl(control, name) {
        control.$name = name
    }

    function FormController(element, attrs, $scope, $animate, $interpolate) {
        var form = this, controls = [];
        form.$error = {}, form.$$success = {}, form.$pending = undefined, form.$name = $interpolate(attrs.name || attrs.ngForm || "")($scope), form.$dirty = !1, form.$pristine = !0, form.$valid = !0, form.$invalid = !1, form.$submitted = !1, form.$$parentForm = nullFormCtrl, form.$rollbackViewValue = function () {
            forEach(controls, function (control) {
                control.$rollbackViewValue()
            })
        }, form.$commitViewValue = function () {
            forEach(controls, function (control) {
                control.$commitViewValue()
            })
        }, form.$addControl = function (control) {
            assertNotHasOwnProperty(control.$name, "input"), controls.push(control), control.$name && (form[control.$name] = control), control.$$parentForm = form
        }, form.$$renameControl = function (control, newName) {
            var oldName = control.$name;
            form[oldName] === control && delete form[oldName], form[newName] = control, control.$name = newName
        }, form.$removeControl = function (control) {
            control.$name && form[control.$name] === control && delete form[control.$name], forEach(form.$pending, function (value, name) {
                form.$setValidity(name, null, control)
            }), forEach(form.$error, function (value, name) {
                form.$setValidity(name, null, control)
            }), forEach(form.$$success, function (value, name) {
                form.$setValidity(name, null, control)
            }), arrayRemove(controls, control), control.$$parentForm = nullFormCtrl
        }, addSetValidityMethod({
            ctrl: this, $element: element, set: function (object, property, controller) {
                var list = object[property];
                if (list) {
                    var index = list.indexOf(controller);
                    -1 === index && list.push(controller)
                } else object[property] = [controller]
            }, unset: function (object, property, controller) {
                var list = object[property];
                list && (arrayRemove(list, controller), 0 === list.length && delete object[property])
            }, $animate: $animate
        }), form.$setDirty = function () {
            $animate.removeClass(element, PRISTINE_CLASS), $animate.addClass(element, DIRTY_CLASS), form.$dirty = !0, form.$pristine = !1, form.$$parentForm.$setDirty()
        }, form.$setPristine = function () {
            $animate.setClass(element, PRISTINE_CLASS, DIRTY_CLASS + " " + SUBMITTED_CLASS), form.$dirty = !1, form.$pristine = !0, form.$submitted = !1, forEach(controls, function (control) {
                control.$setPristine()
            })
        }, form.$setUntouched = function () {
            forEach(controls, function (control) {
                control.$setUntouched()
            })
        }, form.$setSubmitted = function () {
            $animate.addClass(element, SUBMITTED_CLASS), form.$submitted = !0, form.$$parentForm.$setSubmitted()
        }
    }

    function stringBasedInputType(ctrl) {
        ctrl.$formatters.push(function (value) {
            return ctrl.$isEmpty(value) ? value : value.toString()
        })
    }

    function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser), stringBasedInputType(ctrl)
    }

    function baseInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        var type = lowercase(element[0].type);
        if (!$sniffer.android) {
            var composing = !1;
            element.on("compositionstart", function (data) {
                composing = !0
            }), element.on("compositionend", function () {
                composing = !1, listener()
            })
        }
        var listener = function (ev) {
            if (timeout && ($browser.defer.cancel(timeout), timeout = null), !composing) {
                var value = element.val(), event = ev && ev.type;
                "password" === type || attr.ngTrim && "false" === attr.ngTrim || (value = trim(value)), (ctrl.$viewValue !== value || "" === value && ctrl.$$hasNativeValidators) && ctrl.$setViewValue(value, event)
            }
        };
        if ($sniffer.hasEvent("input"))element.on("input", listener); else {
            var timeout, deferListener = function (ev, input, origValue) {
                timeout || (timeout = $browser.defer(function () {
                    timeout = null, input && input.value === origValue || listener(ev)
                }))
            };
            element.on("keydown", function (event) {
                var key = event.keyCode;
                91 === key || key > 15 && 19 > key || key >= 37 && 40 >= key || deferListener(event, this, this.value)
            }), $sniffer.hasEvent("paste") && element.on("paste cut", deferListener)
        }
        element.on("change", listener), ctrl.$render = function () {
            var value = ctrl.$isEmpty(ctrl.$viewValue) ? "" : ctrl.$viewValue;
            element.val() !== value && element.val(value)
        }
    }

    function weekParser(isoWeek, existingDate) {
        if (isDate(isoWeek))return isoWeek;
        if (isString(isoWeek)) {
            WEEK_REGEXP.lastIndex = 0;
            var parts = WEEK_REGEXP.exec(isoWeek);
            if (parts) {
                var year = +parts[1], week = +parts[2], hours = 0, minutes = 0, seconds = 0, milliseconds = 0, firstThurs = getFirstThursdayOfYear(year), addDays = 7 * (week - 1);
                return existingDate && (hours = existingDate.getHours(), minutes = existingDate.getMinutes(), seconds = existingDate.getSeconds(), milliseconds = existingDate.getMilliseconds()), new Date(year, 0, firstThurs.getDate() + addDays, hours, minutes, seconds, milliseconds)
            }
        }
        return NaN
    }

    function createDateParser(regexp, mapping) {
        return function (iso, date) {
            var parts, map;
            if (isDate(iso))return iso;
            if (isString(iso)) {
                if ('"' == iso.charAt(0) && '"' == iso.charAt(iso.length - 1) && (iso = iso.substring(1, iso.length - 1)), ISO_DATE_REGEXP.test(iso))return new Date(iso);
                if (regexp.lastIndex = 0, parts = regexp.exec(iso))return parts.shift(), map = date ? {
                    yyyy: date.getFullYear(),
                    MM: date.getMonth() + 1,
                    dd: date.getDate(),
                    HH: date.getHours(),
                    mm: date.getMinutes(),
                    ss: date.getSeconds(),
                    sss: date.getMilliseconds() / 1e3
                } : {yyyy: 1970, MM: 1, dd: 1, HH: 0, mm: 0, ss: 0, sss: 0}, forEach(parts, function (part, index) {
                    index < mapping.length && (map[mapping[index]] = +part)
                }), new Date(map.yyyy, map.MM - 1, map.dd, map.HH, map.mm, map.ss || 0, 1e3 * map.sss || 0)
            }
            return NaN
        }
    }

    function createDateInputType(type, regexp, parseDate, format) {
        return function (scope, element, attr, ctrl, $sniffer, $browser, $filter) {
            function isValidDate(value) {
                return value && !(value.getTime && value.getTime() !== value.getTime())
            }

            function parseObservedDateValue(val) {
                return isDefined(val) && !isDate(val) ? parseDate(val) || undefined : val
            }

            badInputChecker(scope, element, attr, ctrl), baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
            var previousDate, timezone = ctrl && ctrl.$options && ctrl.$options.timezone;
            if (ctrl.$$parserName = type, ctrl.$parsers.push(function (value) {
                    if (ctrl.$isEmpty(value))return null;
                    if (regexp.test(value)) {
                        var parsedDate = parseDate(value, previousDate);
                        return timezone && (parsedDate = convertTimezoneToLocal(parsedDate, timezone)), parsedDate
                    }
                    return undefined
                }), ctrl.$formatters.push(function (value) {
                    if (value && !isDate(value))throw ngModelMinErr("datefmt", "Expected `{0}` to be a date", value);
                    return isValidDate(value) ? (previousDate = value, previousDate && timezone && (previousDate = convertTimezoneToLocal(previousDate, timezone, !0)), $filter("date")(value, format, timezone)) : (previousDate = null, "")
                }), isDefined(attr.min) || attr.ngMin) {
                var minVal;
                ctrl.$validators.min = function (value) {
                    return !isValidDate(value) || isUndefined(minVal) || parseDate(value) >= minVal
                }, attr.$observe("min", function (val) {
                    minVal = parseObservedDateValue(val), ctrl.$validate()
                })
            }
            if (isDefined(attr.max) || attr.ngMax) {
                var maxVal;
                ctrl.$validators.max = function (value) {
                    return !isValidDate(value) || isUndefined(maxVal) || parseDate(value) <= maxVal
                }, attr.$observe("max", function (val) {
                    maxVal = parseObservedDateValue(val), ctrl.$validate()
                })
            }
        }
    }

    function badInputChecker(scope, element, attr, ctrl) {
        var node = element[0], nativeValidation = ctrl.$$hasNativeValidators = isObject(node.validity);
        nativeValidation && ctrl.$parsers.push(function (value) {
            var validity = element.prop(VALIDITY_STATE_PROPERTY) || {};
            return validity.badInput || validity.typeMismatch ? undefined : value
        })
    }

    function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        if (badInputChecker(scope, element, attr, ctrl), baseInputType(scope, element, attr, ctrl, $sniffer, $browser), ctrl.$$parserName = "number", ctrl.$parsers.push(function (value) {
                return ctrl.$isEmpty(value) ? null : NUMBER_REGEXP.test(value) ? parseFloat(value) : undefined
            }), ctrl.$formatters.push(function (value) {
                if (!ctrl.$isEmpty(value)) {
                    if (!isNumber(value))throw ngModelMinErr("numfmt", "Expected `{0}` to be a number", value);
                    value = value.toString()
                }
                return value
            }), isDefined(attr.min) || attr.ngMin) {
            var minVal;
            ctrl.$validators.min = function (value) {
                return ctrl.$isEmpty(value) || isUndefined(minVal) || value >= minVal
            }, attr.$observe("min", function (val) {
                isDefined(val) && !isNumber(val) && (val = parseFloat(val, 10)), minVal = isNumber(val) && !isNaN(val) ? val : undefined, ctrl.$validate()
            })
        }
        if (isDefined(attr.max) || attr.ngMax) {
            var maxVal;
            ctrl.$validators.max = function (value) {
                return ctrl.$isEmpty(value) || isUndefined(maxVal) || maxVal >= value
            }, attr.$observe("max", function (val) {
                isDefined(val) && !isNumber(val) && (val = parseFloat(val, 10)), maxVal = isNumber(val) && !isNaN(val) ? val : undefined, ctrl.$validate()
            })
        }
    }

    function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser), stringBasedInputType(ctrl), ctrl.$$parserName = "url", ctrl.$validators.url = function (modelValue, viewValue) {
            var value = modelValue || viewValue;
            return ctrl.$isEmpty(value) || URL_REGEXP.test(value)
        }
    }

    function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser), stringBasedInputType(ctrl), ctrl.$$parserName = "email", ctrl.$validators.email = function (modelValue, viewValue) {
            var value = modelValue || viewValue;
            return ctrl.$isEmpty(value) || EMAIL_REGEXP.test(value)
        }
    }

    function radioInputType(scope, element, attr, ctrl) {
        isUndefined(attr.name) && element.attr("name", nextUid());
        var listener = function (ev) {
            element[0].checked && ctrl.$setViewValue(attr.value, ev && ev.type)
        };
        element.on("click", listener), ctrl.$render = function () {
            var value = attr.value;
            element[0].checked = value == ctrl.$viewValue
        }, attr.$observe("value", ctrl.$render)
    }

    function parseConstantExpr($parse, context, name, expression, fallback) {
        var parseFn;
        if (isDefined(expression)) {
            if (parseFn = $parse(expression), !parseFn.constant)throw ngModelMinErr("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", name, expression);
            return parseFn(context)
        }
        return fallback
    }

    function checkboxInputType(scope, element, attr, ctrl, $sniffer, $browser, $filter, $parse) {
        var trueValue = parseConstantExpr($parse, scope, "ngTrueValue", attr.ngTrueValue, !0), falseValue = parseConstantExpr($parse, scope, "ngFalseValue", attr.ngFalseValue, !1), listener = function (ev) {
            ctrl.$setViewValue(element[0].checked, ev && ev.type)
        };
        element.on("click", listener), ctrl.$render = function () {
            element[0].checked = ctrl.$viewValue
        }, ctrl.$isEmpty = function (value) {
            return value === !1
        }, ctrl.$formatters.push(function (value) {
            return equals(value, trueValue)
        }), ctrl.$parsers.push(function (value) {
            return value ? trueValue : falseValue
        })
    }

    function classDirective(name, selector) {
        return name = "ngClass" + name, ["$animate", function ($animate) {
            function arrayDifference(tokens1, tokens2) {
                var values = [];
                outer:for (var i = 0; i < tokens1.length; i++) {
                    for (var token = tokens1[i], j = 0; j < tokens2.length; j++)if (token == tokens2[j])continue outer;
                    values.push(token)
                }
                return values
            }

            function arrayClasses(classVal) {
                var classes = [];
                return isArray(classVal) ? (forEach(classVal, function (v) {
                    classes = classes.concat(arrayClasses(v))
                }), classes) : isString(classVal) ? classVal.split(" ") : isObject(classVal) ? (forEach(classVal, function (v, k) {
                    v && (classes = classes.concat(k.split(" ")))
                }), classes) : classVal
            }

            return {
                restrict: "AC", link: function (scope, element, attr) {
                    function addClasses(classes) {
                        var newClasses = digestClassCounts(classes, 1);
                        attr.$addClass(newClasses)
                    }

                    function removeClasses(classes) {
                        var newClasses = digestClassCounts(classes, -1);
                        attr.$removeClass(newClasses)
                    }

                    function digestClassCounts(classes, count) {
                        var classCounts = element.data("$classCounts") || createMap(), classesToUpdate = [];
                        return forEach(classes, function (className) {
                            (count > 0 || classCounts[className]) && (classCounts[className] = (classCounts[className] || 0) + count, classCounts[className] === +(count > 0) && classesToUpdate.push(className))
                        }), element.data("$classCounts", classCounts), classesToUpdate.join(" ")
                    }

                    function updateClasses(oldClasses, newClasses) {
                        var toAdd = arrayDifference(newClasses, oldClasses), toRemove = arrayDifference(oldClasses, newClasses);
                        toAdd = digestClassCounts(toAdd, 1), toRemove = digestClassCounts(toRemove, -1), toAdd && toAdd.length && $animate.addClass(element, toAdd), toRemove && toRemove.length && $animate.removeClass(element, toRemove)
                    }

                    function ngClassWatchAction(newVal) {
                        if (selector === !0 || scope.$index % 2 === selector) {
                            var newClasses = arrayClasses(newVal || []);
                            if (oldVal) {
                                if (!equals(newVal, oldVal)) {
                                    var oldClasses = arrayClasses(oldVal);
                                    updateClasses(oldClasses, newClasses)
                                }
                            } else addClasses(newClasses)
                        }
                        oldVal = shallowCopy(newVal)
                    }

                    var oldVal;
                    scope.$watch(attr[name], ngClassWatchAction, !0), attr.$observe("class", function (value) {
                        ngClassWatchAction(scope.$eval(attr[name]))
                    }), "ngClass" !== name && scope.$watch("$index", function ($index, old$index) {
                        var mod = 1 & $index;
                        if (mod !== (1 & old$index)) {
                            var classes = arrayClasses(scope.$eval(attr[name]));
                            mod === selector ? addClasses(classes) : removeClasses(classes)
                        }
                    })
                }
            }
        }]
    }

    function addSetValidityMethod(context) {
        function setValidity(validationErrorKey, state, controller) {
            isUndefined(state) ? createAndSet("$pending", validationErrorKey, controller) : unsetAndCleanup("$pending", validationErrorKey, controller), isBoolean(state) ? state ? (unset(ctrl.$error, validationErrorKey, controller), set(ctrl.$$success, validationErrorKey, controller)) : (set(ctrl.$error, validationErrorKey, controller), unset(ctrl.$$success, validationErrorKey, controller)) : (unset(ctrl.$error, validationErrorKey, controller), unset(ctrl.$$success, validationErrorKey, controller)), ctrl.$pending ? (cachedToggleClass(PENDING_CLASS, !0), ctrl.$valid = ctrl.$invalid = undefined, toggleValidationCss("", null)) : (cachedToggleClass(PENDING_CLASS, !1), ctrl.$valid = isObjectEmpty(ctrl.$error), ctrl.$invalid = !ctrl.$valid, toggleValidationCss("", ctrl.$valid));
            var combinedState;
            combinedState = ctrl.$pending && ctrl.$pending[validationErrorKey] ? undefined : ctrl.$error[validationErrorKey] ? !1 : ctrl.$$success[validationErrorKey] ? !0 : null, toggleValidationCss(validationErrorKey, combinedState), ctrl.$$parentForm.$setValidity(validationErrorKey, combinedState, ctrl)
        }

        function createAndSet(name, value, controller) {
            ctrl[name] || (ctrl[name] = {}), set(ctrl[name], value, controller)
        }

        function unsetAndCleanup(name, value, controller) {
            ctrl[name] && unset(ctrl[name], value, controller), isObjectEmpty(ctrl[name]) && (ctrl[name] = undefined)
        }

        function cachedToggleClass(className, switchValue) {
            switchValue && !classCache[className] ? ($animate.addClass($element, className), classCache[className] = !0) : !switchValue && classCache[className] && ($animate.removeClass($element, className), classCache[className] = !1)
        }

        function toggleValidationCss(validationErrorKey, isValid) {
            validationErrorKey = validationErrorKey ? "-" + snake_case(validationErrorKey, "-") : "", cachedToggleClass(VALID_CLASS + validationErrorKey, isValid === !0), cachedToggleClass(INVALID_CLASS + validationErrorKey, isValid === !1)
        }

        var ctrl = context.ctrl, $element = context.$element, classCache = {}, set = context.set, unset = context.unset, $animate = context.$animate;
        classCache[INVALID_CLASS] = !(classCache[VALID_CLASS] = $element.hasClass(VALID_CLASS)), ctrl.$setValidity = setValidity
    }

    function isObjectEmpty(obj) {
        if (obj)for (var prop in obj)if (obj.hasOwnProperty(prop))return !1;
        return !0
    }

    function chromeHack(optionElement) {
        optionElement[0].hasAttribute("selected") && (optionElement[0].selected = !0)
    }

    var REGEX_STRING_REGEXP = /^\/(.+)\/([a-z]*)$/, VALIDITY_STATE_PROPERTY = "validity", hasOwnProperty = Object.prototype.hasOwnProperty, lowercase = function (string) {
        return isString(string) ? string.toLowerCase() : string
    }, uppercase = function (string) {
        return isString(string) ? string.toUpperCase() : string
    }, manualLowercase = function (s) {
        return isString(s) ? s.replace(/[A-Z]/g, function (ch) {
            return String.fromCharCode(32 | ch.charCodeAt(0))
        }) : s
    }, manualUppercase = function (s) {
        return isString(s) ? s.replace(/[a-z]/g, function (ch) {
            return String.fromCharCode(-33 & ch.charCodeAt(0))
        }) : s
    };
    "i" !== "I".toLowerCase() && (lowercase = manualLowercase, uppercase = manualUppercase);
    var msie, jqLite, jQuery, angularModule, slice = [].slice, splice = [].splice, push = [].push, toString = Object.prototype.toString, getPrototypeOf = Object.getPrototypeOf, ngMinErr = minErr("ng"), angular = window.angular || (window.angular = {}), uid = 0;
    msie = document.documentMode, noop.$inject = [], identity.$inject = [];
    var isArray = Array.isArray, TYPED_ARRAY_REGEXP = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/, trim = function (value) {
        return isString(value) ? value.trim() : value
    }, escapeForRegexp = function (s) {
        return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
    }, csp = function () {
        function noUnsafeEval() {
            try {
                return new Function(""), !1
            } catch (e) {
                return !0
            }
        }

        if (!isDefined(csp.rules)) {
            var ngCspElement = document.querySelector("[ng-csp]") || document.querySelector("[data-ng-csp]");
            if (ngCspElement) {
                var ngCspAttribute = ngCspElement.getAttribute("ng-csp") || ngCspElement.getAttribute("data-ng-csp");
                csp.rules = {
                    noUnsafeEval: !ngCspAttribute || -1 !== ngCspAttribute.indexOf("no-unsafe-eval"),
                    noInlineStyle: !ngCspAttribute || -1 !== ngCspAttribute.indexOf("no-inline-style")
                }
            } else csp.rules = {noUnsafeEval: noUnsafeEval(), noInlineStyle: !1}
        }
        return csp.rules
    }, jq = function () {
        if (isDefined(jq.name_))return jq.name_;
        var el, i, prefix, name, ii = ngAttrPrefixes.length;
        for (i = 0; ii > i; ++i)if (prefix = ngAttrPrefixes[i], el = document.querySelector("[" + prefix.replace(":", "\\:") + "jq]")) {
            name = el.getAttribute(prefix + "jq");
            break
        }
        return jq.name_ = name
    }, ALL_COLONS = /:/g, ngAttrPrefixes = ["ng-", "data-ng-", "ng:", "x-ng-"], SNAKE_CASE_REGEXP = /[A-Z]/g, bindJQueryFired = !1, NODE_TYPE_ELEMENT = 1, NODE_TYPE_ATTRIBUTE = 2, NODE_TYPE_TEXT = 3, NODE_TYPE_COMMENT = 8, NODE_TYPE_DOCUMENT = 9, NODE_TYPE_DOCUMENT_FRAGMENT = 11, version = {
        full: "1.5.0",
        major: 1,
        minor: 5,
        dot: 0,
        codeName: "ennoblement-facilitation"
    };
    JQLite.expando = "ng339";
    var jqCache = JQLite.cache = {}, jqId = 1, addEventListenerFn = function (element, type, fn) {
        element.addEventListener(type, fn, !1)
    }, removeEventListenerFn = function (element, type, fn) {
        element.removeEventListener(type, fn, !1)
    };
    JQLite._data = function (node) {
        return this.cache[node[this.expando]] || {}
    };
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g, MOZ_HACK_REGEXP = /^moz([A-Z])/, MOUSE_EVENT_MAP = {
        mouseleave: "mouseout",
        mouseenter: "mouseover"
    }, jqLiteMinErr = minErr("jqLite"), SINGLE_TAG_REGEXP = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, HTML_REGEXP = /<|&#?\w+;/, TAG_NAME_REGEXP = /<([\w:-]+)/, XHTML_TAG_REGEXP = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, wrapMap = {
        option: [1, '<select multiple="multiple">', "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td;
    var jqLiteContains = Node.prototype.contains || function (arg) {
            return !!(16 & this.compareDocumentPosition(arg))
        }, JQLitePrototype = JQLite.prototype = {
        ready: function (fn) {
            function trigger() {
                fired || (fired = !0, fn())
            }

            var fired = !1;
            "complete" === document.readyState ? setTimeout(trigger) : (this.on("DOMContentLoaded", trigger), JQLite(window).on("load", trigger))
        }, toString: function () {
            var value = [];
            return forEach(this, function (e) {
                value.push("" + e)
            }), "[" + value.join(", ") + "]"
        }, eq: function (index) {
            return jqLite(index >= 0 ? this[index] : this[this.length + index])
        }, length: 0, push: push, sort: [].sort, splice: [].splice
    }, BOOLEAN_ATTR = {};
    forEach("multiple,selected,checked,disabled,readOnly,required,open".split(","), function (value) {
        BOOLEAN_ATTR[lowercase(value)] = value
    });
    var BOOLEAN_ELEMENTS = {};
    forEach("input,select,option,textarea,button,form,details".split(","), function (value) {
        BOOLEAN_ELEMENTS[value] = !0
    });
    var ALIASED_ATTR = {
        ngMinlength: "minlength",
        ngMaxlength: "maxlength",
        ngMin: "min",
        ngMax: "max",
        ngPattern: "pattern"
    };
    forEach({
        data: jqLiteData,
        removeData: jqLiteRemoveData,
        hasData: jqLiteHasData,
        cleanData: jqLiteCleanData
    }, function (fn, name) {
        JQLite[name] = fn
    }), forEach({
        data: jqLiteData, inheritedData: jqLiteInheritedData, scope: function (element) {
            return jqLite.data(element, "$scope") || jqLiteInheritedData(element.parentNode || element, ["$isolateScope", "$scope"])
        }, isolateScope: function (element) {
            return jqLite.data(element, "$isolateScope") || jqLite.data(element, "$isolateScopeNoTemplate")
        }, controller: jqLiteController, injector: function (element) {
            return jqLiteInheritedData(element, "$injector")
        }, removeAttr: function (element, name) {
            element.removeAttribute(name)
        }, hasClass: jqLiteHasClass, css: function (element, name, value) {
            return name = camelCase(name), isDefined(value) ? void(element.style[name] = value) : element.style[name]
        }, attr: function (element, name, value) {
            var nodeType = element.nodeType;
            if (nodeType !== NODE_TYPE_TEXT && nodeType !== NODE_TYPE_ATTRIBUTE && nodeType !== NODE_TYPE_COMMENT) {
                var lowercasedName = lowercase(name);
                if (BOOLEAN_ATTR[lowercasedName]) {
                    if (!isDefined(value))return element[name] || (element.attributes.getNamedItem(name) || noop).specified ? lowercasedName : undefined;
                    value ? (element[name] = !0, element.setAttribute(name, lowercasedName)) : (element[name] = !1, element.removeAttribute(lowercasedName))
                } else if (isDefined(value))element.setAttribute(name, value); else if (element.getAttribute) {
                    var ret = element.getAttribute(name, 2);
                    return null === ret ? undefined : ret
                }
            }
        }, prop: function (element, name, value) {
            return isDefined(value) ? void(element[name] = value) : element[name]
        }, text: function () {
            function getText(element, value) {
                if (isUndefined(value)) {
                    var nodeType = element.nodeType;
                    return nodeType === NODE_TYPE_ELEMENT || nodeType === NODE_TYPE_TEXT ? element.textContent : ""
                }
                element.textContent = value
            }

            return getText.$dv = "", getText
        }(), val: function (element, value) {
            if (isUndefined(value)) {
                if (element.multiple && "select" === nodeName_(element)) {
                    var result = [];
                    return forEach(element.options, function (option) {
                        option.selected && result.push(option.value || option.text)
                    }), 0 === result.length ? null : result
                }
                return element.value
            }
            element.value = value
        }, html: function (element, value) {
            return isUndefined(value) ? element.innerHTML : (jqLiteDealoc(element, !0), void(element.innerHTML = value))
        }, empty: jqLiteEmpty
    }, function (fn, name) {
        JQLite.prototype[name] = function (arg1, arg2) {
            var i, key, nodeCount = this.length;
            if (fn !== jqLiteEmpty && isUndefined(2 == fn.length && fn !== jqLiteHasClass && fn !== jqLiteController ? arg1 : arg2)) {
                if (isObject(arg1)) {
                    for (i = 0; nodeCount > i; i++)if (fn === jqLiteData)fn(this[i], arg1); else for (key in arg1)fn(this[i], key, arg1[key]);
                    return this
                }
                for (var value = fn.$dv, jj = isUndefined(value) ? Math.min(nodeCount, 1) : nodeCount, j = 0; jj > j; j++) {
                    var nodeValue = fn(this[j], arg1, arg2);
                    value = value ? value + nodeValue : nodeValue
                }
                return value
            }
            for (i = 0; nodeCount > i; i++)fn(this[i], arg1, arg2);
            return this
        }
    }), forEach({
        removeData: jqLiteRemoveData,
        on: function (element, type, fn, unsupported) {
            if (isDefined(unsupported))throw jqLiteMinErr("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
            if (jqLiteAcceptsData(element)) {
                var expandoStore = jqLiteExpandoStore(element, !0), events = expandoStore.events, handle = expandoStore.handle;
                handle || (handle = expandoStore.handle = createEventHandler(element, events));
                for (var types = type.indexOf(" ") >= 0 ? type.split(" ") : [type], i = types.length, addHandler = function (type, specialHandlerWrapper, noEventListener) {
                    var eventFns = events[type];
                    eventFns || (eventFns = events[type] = [], eventFns.specialHandlerWrapper = specialHandlerWrapper, "$destroy" === type || noEventListener || addEventListenerFn(element, type, handle)), eventFns.push(fn)
                }; i--;)type = types[i], MOUSE_EVENT_MAP[type] ? (addHandler(MOUSE_EVENT_MAP[type], specialMouseHandlerWrapper), addHandler(type, undefined, !0)) : addHandler(type)
            }
        },
        off: jqLiteOff,
        one: function (element, type, fn) {
            element = jqLite(element), element.on(type, function onFn() {
                element.off(type, fn), element.off(type, onFn)
            }), element.on(type, fn)
        },
        replaceWith: function (element, replaceNode) {
            var index, parent = element.parentNode;
            jqLiteDealoc(element), forEach(new JQLite(replaceNode), function (node) {
                index ? parent.insertBefore(node, index.nextSibling) : parent.replaceChild(node, element), index = node
            })
        },
        children: function (element) {
            var children = [];
            return forEach(element.childNodes, function (element) {
                element.nodeType === NODE_TYPE_ELEMENT && children.push(element)
            }), children
        },
        contents: function (element) {
            return element.contentDocument || element.childNodes || []
        },
        append: function (element, node) {
            var nodeType = element.nodeType;
            if (nodeType === NODE_TYPE_ELEMENT || nodeType === NODE_TYPE_DOCUMENT_FRAGMENT) {
                node = new JQLite(node);
                for (var i = 0, ii = node.length; ii > i; i++) {
                    var child = node[i];
                    element.appendChild(child)
                }
            }
        },
        prepend: function (element, node) {
            if (element.nodeType === NODE_TYPE_ELEMENT) {
                var index = element.firstChild;
                forEach(new JQLite(node), function (child) {
                    element.insertBefore(child, index)
                })
            }
        },
        wrap: function (element, wrapNode) {
            jqLiteWrapNode(element, jqLite(wrapNode).eq(0).clone()[0])
        },
        remove: jqLiteRemove,
        detach: function (element) {
            jqLiteRemove(element, !0)
        },
        after: function (element, newElement) {
            var index = element, parent = element.parentNode;
            newElement = new JQLite(newElement);
            for (var i = 0, ii = newElement.length; ii > i; i++) {
                var node = newElement[i];
                parent.insertBefore(node, index.nextSibling), index = node
            }
        },
        addClass: jqLiteAddClass,
        removeClass: jqLiteRemoveClass,
        toggleClass: function (element, selector, condition) {
            selector && forEach(selector.split(" "), function (className) {
                var classCondition = condition;
                isUndefined(classCondition) && (classCondition = !jqLiteHasClass(element, className)), (classCondition ? jqLiteAddClass : jqLiteRemoveClass)(element, className)
            })
        },
        parent: function (element) {
            var parent = element.parentNode;
            return parent && parent.nodeType !== NODE_TYPE_DOCUMENT_FRAGMENT ? parent : null
        },
        next: function (element) {
            return element.nextElementSibling
        },
        find: function (element, selector) {
            return element.getElementsByTagName ? element.getElementsByTagName(selector) : []
        },
        clone: jqLiteClone,
        triggerHandler: function (element, event, extraParameters) {
            var dummyEvent, eventFnsCopy, handlerArgs, eventName = event.type || event, expandoStore = jqLiteExpandoStore(element), events = expandoStore && expandoStore.events, eventFns = events && events[eventName];
            eventFns && (dummyEvent = {
                preventDefault: function () {
                    this.defaultPrevented = !0
                }, isDefaultPrevented: function () {
                    return this.defaultPrevented === !0
                }, stopImmediatePropagation: function () {
                    this.immediatePropagationStopped = !0
                }, isImmediatePropagationStopped: function () {
                    return this.immediatePropagationStopped === !0
                }, stopPropagation: noop, type: eventName, target: element
            }, event.type && (dummyEvent = extend(dummyEvent, event)), eventFnsCopy = shallowCopy(eventFns), handlerArgs = extraParameters ? [dummyEvent].concat(extraParameters) : [dummyEvent], forEach(eventFnsCopy, function (fn) {
                dummyEvent.isImmediatePropagationStopped() || fn.apply(element, handlerArgs)
            }))
        }
    }, function (fn, name) {
        JQLite.prototype[name] = function (arg1, arg2, arg3) {
            for (var value, i = 0, ii = this.length; ii > i; i++)isUndefined(value) ? (value = fn(this[i], arg1, arg2, arg3), isDefined(value) && (value = jqLite(value))) : jqLiteAddNodes(value, fn(this[i], arg1, arg2, arg3));
            return isDefined(value) ? value : this
        }, JQLite.prototype.bind = JQLite.prototype.on, JQLite.prototype.unbind = JQLite.prototype.off
    }), HashMap.prototype = {
        put: function (key, value) {
            this[hashKey(key, this.nextUid)] = value
        }, get: function (key) {
            return this[hashKey(key, this.nextUid)]
        }, remove: function (key) {
            var value = this[key = hashKey(key, this.nextUid)];
            return delete this[key], value
        }
    };
    var $$HashMapProvider = [function () {
        this.$get = [function () {
            return HashMap
        }]
    }], ARROW_ARG = /^([^\(]+?)=>/, FN_ARGS = /^[^\(]*\(\s*([^\)]*)\)/m, FN_ARG_SPLIT = /,/, FN_ARG = /^\s*(_?)(\S+?)\1\s*$/, STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, $injectorMinErr = minErr("$injector");
    createInjector.$$annotate = annotate;
    var $animateMinErr = minErr("$animate"), ELEMENT_NODE = 1, NG_ANIMATE_CLASSNAME = "ng-animate", $$CoreAnimateJsProvider = function () {
        this.$get = function () {
        }
    }, $$CoreAnimateQueueProvider = function () {
        var postDigestQueue = new HashMap, postDigestElements = [];
        this.$get = ["$$AnimateRunner", "$rootScope", function ($$AnimateRunner, $rootScope) {
            function updateData(data, classes, value) {
                var changed = !1;
                return classes && (classes = isString(classes) ? classes.split(" ") : isArray(classes) ? classes : [], forEach(classes, function (className) {
                    className && (changed = !0, data[className] = value)
                })), changed
            }

            function handleCSSClassChanges() {
                forEach(postDigestElements, function (element) {
                    var data = postDigestQueue.get(element);
                    if (data) {
                        var existing = splitClasses(element.attr("class")), toAdd = "", toRemove = "";
                        forEach(data, function (status, className) {
                            var hasClass = !!existing[className];
                            status !== hasClass && (status ? toAdd += (toAdd.length ? " " : "") + className : toRemove += (toRemove.length ? " " : "") + className)
                        }), forEach(element, function (elm) {
                            toAdd && jqLiteAddClass(elm, toAdd), toRemove && jqLiteRemoveClass(elm, toRemove)
                        }), postDigestQueue.remove(element)
                    }
                }), postDigestElements.length = 0
            }

            function addRemoveClassesPostDigest(element, add, remove) {
                var data = postDigestQueue.get(element) || {}, classesAdded = updateData(data, add, !0), classesRemoved = updateData(data, remove, !1);
                (classesAdded || classesRemoved) && (postDigestQueue.put(element, data), postDigestElements.push(element), 1 === postDigestElements.length && $rootScope.$$postDigest(handleCSSClassChanges))
            }

            return {
                enabled: noop,
                on: noop,
                off: noop,
                pin: noop,
                push: function (element, event, options, domOperation) {
                    domOperation && domOperation(), options = options || {}, options.from && element.css(options.from), options.to && element.css(options.to), (options.addClass || options.removeClass) && addRemoveClassesPostDigest(element, options.addClass, options.removeClass);
                    var runner = new $$AnimateRunner;
                    return runner.complete(), runner
                }
            }
        }]
    }, $AnimateProvider = ["$provide", function ($provide) {
        var provider = this;
        this.$$registeredAnimations = Object.create(null), this.register = function (name, factory) {
            if (name && "." !== name.charAt(0))throw $animateMinErr("notcsel", "Expecting class selector starting with '.' got '{0}'.", name);
            var key = name + "-animation";
            provider.$$registeredAnimations[name.substr(1)] = key, $provide.factory(key, factory)
        }, this.classNameFilter = function (expression) {
            if (1 === arguments.length && (this.$$classNameFilter = expression instanceof RegExp ? expression : null, this.$$classNameFilter)) {
                var reservedRegex = new RegExp("(\\s+|\\/)" + NG_ANIMATE_CLASSNAME + "(\\s+|\\/)");
                if (reservedRegex.test(this.$$classNameFilter.toString()))throw $animateMinErr("nongcls", '$animateProvider.classNameFilter(regex) prohibits accepting a regex value which matches/contains the "{0}" CSS class.', NG_ANIMATE_CLASSNAME)
            }
            return this.$$classNameFilter
        }, this.$get = ["$$animateQueue", function ($$animateQueue) {
            function domInsert(element, parentElement, afterElement) {
                if (afterElement) {
                    var afterNode = extractElementNode(afterElement);
                    !afterNode || afterNode.parentNode || afterNode.previousElementSibling || (afterElement = null)
                }
                afterElement ? afterElement.after(element) : parentElement.prepend(element)
            }

            return {
                on: $$animateQueue.on,
                off: $$animateQueue.off,
                pin: $$animateQueue.pin,
                enabled: $$animateQueue.enabled,
                cancel: function (runner) {
                    runner.end && runner.end()
                },
                enter: function (element, parent, after, options) {
                    return parent = parent && jqLite(parent), after = after && jqLite(after), parent = parent || after.parent(), domInsert(element, parent, after), $$animateQueue.push(element, "enter", prepareAnimateOptions(options))
                },
                move: function (element, parent, after, options) {
                    return parent = parent && jqLite(parent), after = after && jqLite(after), parent = parent || after.parent(), domInsert(element, parent, after), $$animateQueue.push(element, "move", prepareAnimateOptions(options))
                },
                leave: function (element, options) {
                    return $$animateQueue.push(element, "leave", prepareAnimateOptions(options), function () {
                        element.remove()
                    })
                },
                addClass: function (element, className, options) {
                    return options = prepareAnimateOptions(options), options.addClass = mergeClasses(options.addclass, className), $$animateQueue.push(element, "addClass", options)
                },
                removeClass: function (element, className, options) {
                    return options = prepareAnimateOptions(options), options.removeClass = mergeClasses(options.removeClass, className), $$animateQueue.push(element, "removeClass", options)
                },
                setClass: function (element, add, remove, options) {
                    return options = prepareAnimateOptions(options), options.addClass = mergeClasses(options.addClass, add), options.removeClass = mergeClasses(options.removeClass, remove), $$animateQueue.push(element, "setClass", options)
                },
                animate: function (element, from, to, className, options) {
                    return options = prepareAnimateOptions(options), options.from = options.from ? extend(options.from, from) : from, options.to = options.to ? extend(options.to, to) : to, className = className || "ng-inline-animate", options.tempClasses = mergeClasses(options.tempClasses, className), $$animateQueue.push(element, "animate", options)
                }
            }
        }]
    }], $$AnimateAsyncRunFactoryProvider = function () {
        this.$get = ["$$rAF", function ($$rAF) {
            function waitForTick(fn) {
                waitQueue.push(fn), waitQueue.length > 1 || $$rAF(function () {
                    for (var i = 0; i < waitQueue.length; i++)waitQueue[i]();
                    waitQueue = []
                })
            }

            var waitQueue = [];
            return function () {
                var passed = !1;
                return waitForTick(function () {
                    passed = !0
                }), function (callback) {
                    passed ? callback() : waitForTick(callback)
                }
            }
        }]
    }, $$AnimateRunnerFactoryProvider = function () {
        this.$get = ["$q", "$sniffer", "$$animateAsyncRun", "$document", "$timeout", function ($q, $sniffer, $$animateAsyncRun, $document, $timeout) {
            function AnimateRunner(host) {
                this.setHost(host);
                var rafTick = $$animateAsyncRun(), timeoutTick = function (fn) {
                    $timeout(fn, 0, !1)
                };
                this._doneCallbacks = [], this._tick = function (fn) {
                    var doc = $document[0];
                    doc && doc.hidden ? timeoutTick(fn) : rafTick(fn)
                }, this._state = 0
            }

            var INITIAL_STATE = 0, DONE_PENDING_STATE = 1, DONE_COMPLETE_STATE = 2;
            return AnimateRunner.chain = function (chain, callback) {
                function next() {
                    return index === chain.length ? void callback(!0) : void chain[index](function (response) {
                        return response === !1 ? void callback(!1) : (index++, void next())
                    })
                }

                var index = 0;
                next()
            }, AnimateRunner.all = function (runners, callback) {
                function onProgress(response) {
                    status = status && response, ++count === runners.length && callback(status)
                }

                var count = 0, status = !0;
                forEach(runners, function (runner) {
                    runner.done(onProgress)
                })
            }, AnimateRunner.prototype = {
                setHost: function (host) {
                    this.host = host || {}
                }, done: function (fn) {
                    this._state === DONE_COMPLETE_STATE ? fn() : this._doneCallbacks.push(fn)
                }, progress: noop, getPromise: function () {
                    if (!this.promise) {
                        var self = this;
                        this.promise = $q(function (resolve, reject) {
                            self.done(function (status) {
                                status === !1 ? reject() : resolve()
                            })
                        })
                    }
                    return this.promise
                }, then: function (resolveHandler, rejectHandler) {
                    return this.getPromise().then(resolveHandler, rejectHandler)
                }, "catch": function (handler) {
                    return this.getPromise()["catch"](handler)
                }, "finally": function (handler) {
                    return this.getPromise()["finally"](handler)
                }, pause: function () {
                    this.host.pause && this.host.pause()
                }, resume: function () {
                    this.host.resume && this.host.resume()
                }, end: function () {
                    this.host.end && this.host.end(), this._resolve(!0)
                }, cancel: function () {
                    this.host.cancel && this.host.cancel(), this._resolve(!1)
                }, complete: function (response) {
                    var self = this;
                    self._state === INITIAL_STATE && (self._state = DONE_PENDING_STATE, self._tick(function () {
                        self._resolve(response)
                    }))
                }, _resolve: function (response) {
                    this._state !== DONE_COMPLETE_STATE && (forEach(this._doneCallbacks, function (fn) {
                        fn(response)
                    }), this._doneCallbacks.length = 0, this._state = DONE_COMPLETE_STATE)
                }
            }, AnimateRunner
        }]
    }, $CoreAnimateCssProvider = function () {
        this.$get = ["$$rAF", "$q", "$$AnimateRunner", function ($$rAF, $q, $$AnimateRunner) {
            return function (element, initialOptions) {
                function run() {
                    return $$rAF(function () {
                        applyAnimationContents(), closed || runner.complete(), closed = !0
                    }), runner
                }

                function applyAnimationContents() {
                    options.addClass && (element.addClass(options.addClass), options.addClass = null), options.removeClass && (element.removeClass(options.removeClass), options.removeClass = null), options.to && (element.css(options.to), options.to = null)
                }

                var options = initialOptions || {};
                options.$$prepared || (options = copy(options)), options.cleanupStyles && (options.from = options.to = null), options.from && (element.css(options.from), options.from = null);
                var closed, runner = new $$AnimateRunner;
                return {start: run, end: run}
            }
        }]
    }, $compileMinErr = minErr("$compile");
    $CompileProvider.$inject = ["$provide", "$$sanitizeUriProvider"];
    var PREFIX_REGEXP = /^((?:x|data)[\:\-_])/i, $controllerMinErr = minErr("$controller"), CNTRL_REG = /^(\S+)(\s+as\s+([\w$]+))?$/, $$ForceReflowProvider = function () {
        this.$get = ["$document", function ($document) {
            return function (domNode) {
                return domNode ? !domNode.nodeType && domNode instanceof jqLite && (domNode = domNode[0]) : domNode = $document[0].body, domNode.offsetWidth + 1
            }
        }]
    }, APPLICATION_JSON = "application/json", CONTENT_TYPE_APPLICATION_JSON = {"Content-Type": APPLICATION_JSON + ";charset=utf-8"}, JSON_START = /^\[|^\{(?!\{)/, JSON_ENDS = {
        "[": /]$/,
        "{": /}$/
    }, JSON_PROTECTION_PREFIX = /^\)\]\}',?\n/, $httpMinErr = minErr("$http"), $httpMinErrLegacyFn = function (method) {
        return function () {
            throw $httpMinErr("legacy", "The method `{0}` on the promise returned from `$http` has been disabled.", method)
        }
    }, $interpolateMinErr = angular.$interpolateMinErr = minErr("$interpolate");
    $interpolateMinErr.throwNoconcat = function (text) {
        throw $interpolateMinErr("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", text)
    }, $interpolateMinErr.interr = function (text, err) {
        return $interpolateMinErr("interr", "Can't interpolate: {0}\n{1}", text, err.toString())
    };
    var PATH_MATCH = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, DEFAULT_PORTS = {
        http: 80,
        https: 443,
        ftp: 21
    }, $locationMinErr = minErr("$location"), locationPrototype = {
        $$html5: !1,
        $$replace: !1,
        absUrl: locationGetter("$$absUrl"),
        url: function (url) {
            if (isUndefined(url))return this.$$url;
            var match = PATH_MATCH.exec(url);
            return (match[1] || "" === url) && this.path(decodeURIComponent(match[1])), (match[2] || match[1] || "" === url) && this.search(match[3] || ""), this.hash(match[5] || ""), this
        },
        protocol: locationGetter("$$protocol"),
        host: locationGetter("$$host"),
        port: locationGetter("$$port"),
        path: locationGetterSetter("$$path", function (path) {
            return path = null !== path ? path.toString() : "", "/" == path.charAt(0) ? path : "/" + path
        }),
        search: function (search, paramValue) {
            switch (arguments.length) {
                case 0:
                    return this.$$search;
                case 1:
                    if (isString(search) || isNumber(search))search = search.toString(), this.$$search = parseKeyValue(search); else {
                        if (!isObject(search))throw $locationMinErr("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                        search = copy(search, {}), forEach(search, function (value, key) {
                            null == value && delete search[key]
                        }), this.$$search = search
                    }
                    break;
                default:
                    isUndefined(paramValue) || null === paramValue ? delete this.$$search[search] : this.$$search[search] = paramValue
            }
            return this.$$compose(), this
        },
        hash: locationGetterSetter("$$hash", function (hash) {
            return null !== hash ? hash.toString() : ""
        }),
        replace: function () {
            return this.$$replace = !0, this
        }
    };
    forEach([LocationHashbangInHtml5Url, LocationHashbangUrl, LocationHtml5Url], function (Location) {
        Location.prototype = Object.create(locationPrototype), Location.prototype.state = function (state) {
            if (!arguments.length)return this.$$state;
            if (Location !== LocationHtml5Url || !this.$$html5)throw $locationMinErr("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
            return this.$$state = isUndefined(state) ? null : state, this
        }
    });
    var $parseMinErr = minErr("$parse"), CALL = Function.prototype.call, APPLY = Function.prototype.apply, BIND = Function.prototype.bind, OPERATORS = createMap();
    forEach("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function (operator) {
        OPERATORS[operator] = !0
    });
    var ESCAPE = {n: "\n", f: "\f", r: "\r", t: "	", v: "\x0B", "'": "'", '"': '"'}, Lexer = function (options) {
        this.options = options
    };
    Lexer.prototype = {
        constructor: Lexer, lex: function (text) {
            for (this.text = text, this.index = 0, this.tokens = []; this.index < this.text.length;) {
                var ch = this.text.charAt(this.index);
                if ('"' === ch || "'" === ch)this.readString(ch); else if (this.isNumber(ch) || "." === ch && this.isNumber(this.peek()))this.readNumber(); else if (this.isIdent(ch))this.readIdent(); else if (this.is(ch, "(){}[].,;:?"))this.tokens.push({
                    index: this.index,
                    text: ch
                }), this.index++; else if (this.isWhitespace(ch))this.index++; else {
                    var ch2 = ch + this.peek(), ch3 = ch2 + this.peek(2), op1 = OPERATORS[ch], op2 = OPERATORS[ch2], op3 = OPERATORS[ch3];
                    if (op1 || op2 || op3) {
                        var token = op3 ? ch3 : op2 ? ch2 : ch;
                        this.tokens.push({index: this.index, text: token, operator: !0}), this.index += token.length
                    } else this.throwError("Unexpected next character ", this.index, this.index + 1)
                }
            }
            return this.tokens
        }, is: function (ch, chars) {
            return -1 !== chars.indexOf(ch)
        }, peek: function (i) {
            var num = i || 1;
            return this.index + num < this.text.length ? this.text.charAt(this.index + num) : !1
        }, isNumber: function (ch) {
            return ch >= "0" && "9" >= ch && "string" == typeof ch
        }, isWhitespace: function (ch) {
            return " " === ch || "\r" === ch || "	" === ch || "\n" === ch || "\x0B" === ch || " " === ch
        }, isIdent: function (ch) {
            return ch >= "a" && "z" >= ch || ch >= "A" && "Z" >= ch || "_" === ch || "$" === ch
        }, isExpOperator: function (ch) {
            return "-" === ch || "+" === ch || this.isNumber(ch)
        }, throwError: function (error, start, end) {
            end = end || this.index;
            var colStr = isDefined(start) ? "s " + start + "-" + this.index + " [" + this.text.substring(start, end) + "]" : " " + end;
            throw $parseMinErr("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", error, colStr, this.text)
        }, readNumber: function () {
            for (var number = "", start = this.index; this.index < this.text.length;) {
                var ch = lowercase(this.text.charAt(this.index));
                if ("." == ch || this.isNumber(ch))number += ch; else {
                    var peekCh = this.peek();
                    if ("e" == ch && this.isExpOperator(peekCh))number += ch; else if (this.isExpOperator(ch) && peekCh && this.isNumber(peekCh) && "e" == number.charAt(number.length - 1))number += ch; else {
                        if (!this.isExpOperator(ch) || peekCh && this.isNumber(peekCh) || "e" != number.charAt(number.length - 1))break;
                        this.throwError("Invalid exponent")
                    }
                }
                this.index++
            }
            this.tokens.push({index: start, text: number, constant: !0, value: Number(number)})
        }, readIdent: function () {
            for (var start = this.index; this.index < this.text.length;) {
                var ch = this.text.charAt(this.index);
                if (!this.isIdent(ch) && !this.isNumber(ch))break;
                this.index++
            }
            this.tokens.push({index: start, text: this.text.slice(start, this.index), identifier: !0})
        }, readString: function (quote) {
            var start = this.index;
            this.index++;
            for (var string = "", rawString = quote, escape = !1; this.index < this.text.length;) {
                var ch = this.text.charAt(this.index);
                if (rawString += ch, escape) {
                    if ("u" === ch) {
                        var hex = this.text.substring(this.index + 1, this.index + 5);
                        hex.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + hex + "]"), this.index += 4, string += String.fromCharCode(parseInt(hex, 16))
                    } else {
                        var rep = ESCAPE[ch];
                        string += rep || ch
                    }
                    escape = !1
                } else if ("\\" === ch)escape = !0; else {
                    if (ch === quote)return this.index++, void this.tokens.push({
                        index: start,
                        text: rawString,
                        constant: !0,
                        value: string
                    });
                    string += ch
                }
                this.index++
            }
            this.throwError("Unterminated quote", start)
        }
    };
    var AST = function (lexer, options) {
        this.lexer = lexer, this.options = options
    };
    AST.Program = "Program", AST.ExpressionStatement = "ExpressionStatement", AST.AssignmentExpression = "AssignmentExpression", AST.ConditionalExpression = "ConditionalExpression", AST.LogicalExpression = "LogicalExpression", AST.BinaryExpression = "BinaryExpression", AST.UnaryExpression = "UnaryExpression", AST.CallExpression = "CallExpression", AST.MemberExpression = "MemberExpression", AST.Identifier = "Identifier", AST.Literal = "Literal", AST.ArrayExpression = "ArrayExpression", AST.Property = "Property", AST.ObjectExpression = "ObjectExpression", AST.ThisExpression = "ThisExpression", AST.LocalsExpression = "LocalsExpression", AST.NGValueParameter = "NGValueParameter", AST.prototype = {
        ast: function (text) {
            this.text = text, this.tokens = this.lexer.lex(text);
            var value = this.program();
            return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), value
        },
        program: function () {
            for (var body = []; ;)if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && body.push(this.expressionStatement()), !this.expect(";"))return {
                type: AST.Program,
                body: body
            }
        },
        expressionStatement: function () {
            return {type: AST.ExpressionStatement, expression: this.filterChain()}
        },
        filterChain: function () {
            for (var token, left = this.expression(); token = this.expect("|");)left = this.filter(left);
            return left
        },
        expression: function () {
            return this.assignment()
        },
        assignment: function () {
            var result = this.ternary();
            return this.expect("=") && (result = {
                type: AST.AssignmentExpression,
                left: result,
                right: this.assignment(),
                operator: "="
            }), result
        },
        ternary: function () {
            var alternate, consequent, test = this.logicalOR();
            return this.expect("?") && (alternate = this.expression(), this.consume(":")) ? (consequent = this.expression(), {
                type: AST.ConditionalExpression,
                test: test,
                alternate: alternate,
                consequent: consequent
            }) : test
        },
        logicalOR: function () {
            for (var left = this.logicalAND(); this.expect("||");)left = {
                type: AST.LogicalExpression,
                operator: "||",
                left: left,
                right: this.logicalAND()
            };
            return left
        },
        logicalAND: function () {
            for (var left = this.equality(); this.expect("&&");)left = {
                type: AST.LogicalExpression,
                operator: "&&",
                left: left,
                right: this.equality()
            };
            return left
        },
        equality: function () {
            for (var token, left = this.relational(); token = this.expect("==", "!=", "===", "!==");)left = {
                type: AST.BinaryExpression,
                operator: token.text,
                left: left,
                right: this.relational()
            };
            return left
        },
        relational: function () {
            for (var token, left = this.additive(); token = this.expect("<", ">", "<=", ">=");)left = {
                type: AST.BinaryExpression,
                operator: token.text,
                left: left,
                right: this.additive()
            };
            return left
        },
        additive: function () {
            for (var token, left = this.multiplicative(); token = this.expect("+", "-");)left = {
                type: AST.BinaryExpression,
                operator: token.text,
                left: left,
                right: this.multiplicative()
            };
            return left
        },
        multiplicative: function () {
            for (var token, left = this.unary(); token = this.expect("*", "/", "%");)left = {
                type: AST.BinaryExpression,
                operator: token.text,
                left: left,
                right: this.unary()
            };
            return left
        },
        unary: function () {
            var token;
            return (token = this.expect("+", "-", "!")) ? {
                type: AST.UnaryExpression,
                operator: token.text,
                prefix: !0,
                argument: this.unary()
            } : this.primary()
        },
        primary: function () {
            var primary;
            this.expect("(") ? (primary = this.filterChain(), this.consume(")")) : this.expect("[") ? primary = this.arrayDeclaration() : this.expect("{") ? primary = this.object() : this.constants.hasOwnProperty(this.peek().text) ? primary = copy(this.constants[this.consume().text]) : this.peek().identifier ? primary = this.identifier() : this.peek().constant ? primary = this.constant() : this.throwError("not a primary expression", this.peek());
            for (var next; next = this.expect("(", "[", ".");)"(" === next.text ? (primary = {
                type: AST.CallExpression,
                callee: primary,
                arguments: this.parseArguments()
            }, this.consume(")")) : "[" === next.text ? (primary = {
                type: AST.MemberExpression,
                object: primary,
                property: this.expression(),
                computed: !0
            }, this.consume("]")) : "." === next.text ? primary = {
                type: AST.MemberExpression,
                object: primary,
                property: this.identifier(),
                computed: !1
            } : this.throwError("IMPOSSIBLE");
            return primary
        },
        filter: function (baseExpression) {
            for (var args = [baseExpression], result = {
                type: AST.CallExpression,
                callee: this.identifier(),
                arguments: args,
                filter: !0
            }; this.expect(":");)args.push(this.expression());
            return result
        },
        parseArguments: function () {
            var args = [];
            if (")" !== this.peekToken().text)do args.push(this.expression()); while (this.expect(","));
            return args
        },
        identifier: function () {
            var token = this.consume();
            return token.identifier || this.throwError("is not a valid identifier", token), {
                type: AST.Identifier,
                name: token.text
            }
        },
        constant: function () {
            return {type: AST.Literal, value: this.consume().value}
        },
        arrayDeclaration: function () {
            var elements = [];
            if ("]" !== this.peekToken().text)do {
                if (this.peek("]"))break;
                elements.push(this.expression())
            } while (this.expect(","));
            return this.consume("]"), {type: AST.ArrayExpression, elements: elements}
        },
        object: function () {
            var property, properties = [];
            if ("}" !== this.peekToken().text)do {
                if (this.peek("}"))break;
                property = {
                    type: AST.Property,
                    kind: "init"
                }, this.peek().constant ? property.key = this.constant() : this.peek().identifier ? property.key = this.identifier() : this.throwError("invalid key", this.peek()), this.consume(":"), property.value = this.expression(), properties.push(property)
            } while (this.expect(","));
            return this.consume("}"), {type: AST.ObjectExpression, properties: properties}
        },
        throwError: function (msg, token) {
            throw $parseMinErr("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", token.text, msg, token.index + 1, this.text, this.text.substring(token.index))
        },
        consume: function (e1) {
            if (0 === this.tokens.length)throw $parseMinErr("ueoe", "Unexpected end of expression: {0}", this.text);
            var token = this.expect(e1);
            return token || this.throwError("is unexpected, expecting [" + e1 + "]", this.peek()), token
        },
        peekToken: function () {
            if (0 === this.tokens.length)throw $parseMinErr("ueoe", "Unexpected end of expression: {0}", this.text);
            return this.tokens[0]
        },
        peek: function (e1, e2, e3, e4) {
            return this.peekAhead(0, e1, e2, e3, e4)
        },
        peekAhead: function (i, e1, e2, e3, e4) {
            if (this.tokens.length > i) {
                var token = this.tokens[i], t = token.text;
                if (t === e1 || t === e2 || t === e3 || t === e4 || !e1 && !e2 && !e3 && !e4)return token
            }
            return !1
        },
        expect: function (e1, e2, e3, e4) {
            var token = this.peek(e1, e2, e3, e4);
            return token ? (this.tokens.shift(), token) : !1
        },
        constants: {
            "true": {type: AST.Literal, value: !0},
            "false": {type: AST.Literal, value: !1},
            "null": {type: AST.Literal, value: null},
            undefined: {type: AST.Literal, value: undefined},
            "this": {type: AST.ThisExpression},
            $locals: {type: AST.LocalsExpression}
        }
    }, ASTCompiler.prototype = {
        compile: function (expression, expensiveChecks) {
            var self = this, ast = this.astBuilder.ast(expression);
            this.state = {
                nextId: 0,
                filters: {},
                expensiveChecks: expensiveChecks,
                fn: {vars: [], body: [], own: {}},
                assign: {vars: [], body: [], own: {}},
                inputs: []
            }, findConstantAndWatchExpressions(ast, self.$filter);
            var assignable, extra = "";
            if (this.stage = "assign", assignable = assignableAST(ast)) {
                this.state.computing = "assign";
                var result = this.nextId();
                this.recurse(assignable, result), this.return_(result), extra = "fn.assign=" + this.generateFunction("assign", "s,v,l")
            }
            var toWatch = getInputs(ast.body);
            self.stage = "inputs", forEach(toWatch, function (watch, key) {
                var fnKey = "fn" + key;
                self.state[fnKey] = {vars: [], body: [], own: {}}, self.state.computing = fnKey;
                var intoId = self.nextId();
                self.recurse(watch, intoId), self.return_(intoId), self.state.inputs.push(fnKey), watch.watchId = key
            }), this.state.computing = "fn", this.stage = "main", this.recurse(ast);
            var fnString = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + extra + this.watchFns() + "return fn;", fn = new Function("$filter", "ensureSafeMemberName", "ensureSafeObject", "ensureSafeFunction", "getStringValue", "ensureSafeAssignContext", "ifDefined", "plus", "text", fnString)(this.$filter, ensureSafeMemberName, ensureSafeObject, ensureSafeFunction, getStringValue, ensureSafeAssignContext, ifDefined, plusFn, expression);
            return this.state = this.stage = undefined, fn.literal = isLiteral(ast), fn.constant = isConstant(ast), fn
        }, USE: "use", STRICT: "strict", watchFns: function () {
            var result = [], fns = this.state.inputs, self = this;
            return forEach(fns, function (name) {
                result.push("var " + name + "=" + self.generateFunction(name, "s"))
            }), fns.length && result.push("fn.inputs=[" + fns.join(",") + "];"), result.join("")
        }, generateFunction: function (name, params) {
            return "function(" + params + "){" + this.varsPrefix(name) + this.body(name) + "};"
        }, filterPrefix: function () {
            var parts = [], self = this;
            return forEach(this.state.filters, function (id, filter) {
                parts.push(id + "=$filter(" + self.escape(filter) + ")")
            }), parts.length ? "var " + parts.join(",") + ";" : ""
        }, varsPrefix: function (section) {
            return this.state[section].vars.length ? "var " + this.state[section].vars.join(",") + ";" : ""
        }, body: function (section) {
            return this.state[section].body.join("")
        }, recurse: function (ast, intoId, nameId, recursionFn, create, skipWatchIdCheck) {
            var left, right, args, expression, self = this;
            if (recursionFn = recursionFn || noop, !skipWatchIdCheck && isDefined(ast.watchId))return intoId = intoId || this.nextId(), void this.if_("i", this.lazyAssign(intoId, this.computedMember("i", ast.watchId)), this.lazyRecurse(ast, intoId, nameId, recursionFn, create, !0));
            switch (ast.type) {
                case AST.Program:
                    forEach(ast.body, function (expression, pos) {
                        self.recurse(expression.expression, undefined, undefined, function (expr) {
                            right = expr
                        }), pos !== ast.body.length - 1 ? self.current().body.push(right, ";") : self.return_(right)
                    });
                    break;
                case AST.Literal:
                    expression = this.escape(ast.value), this.assign(intoId, expression), recursionFn(expression);
                    break;
                case AST.UnaryExpression:
                    this.recurse(ast.argument, undefined, undefined, function (expr) {
                        right = expr
                    }), expression = ast.operator + "(" + this.ifDefined(right, 0) + ")", this.assign(intoId, expression), recursionFn(expression);
                    break;
                case AST.BinaryExpression:
                    this.recurse(ast.left, undefined, undefined, function (expr) {
                        left = expr
                    }), this.recurse(ast.right, undefined, undefined, function (expr) {
                        right = expr
                    }), expression = "+" === ast.operator ? this.plus(left, right) : "-" === ast.operator ? this.ifDefined(left, 0) + ast.operator + this.ifDefined(right, 0) : "(" + left + ")" + ast.operator + "(" + right + ")", this.assign(intoId, expression), recursionFn(expression);
                    break;
                case AST.LogicalExpression:
                    intoId = intoId || this.nextId(), self.recurse(ast.left, intoId), self.if_("&&" === ast.operator ? intoId : self.not(intoId), self.lazyRecurse(ast.right, intoId)), recursionFn(intoId);
                    break;
                case AST.ConditionalExpression:
                    intoId = intoId || this.nextId(), self.recurse(ast.test, intoId), self.if_(intoId, self.lazyRecurse(ast.alternate, intoId), self.lazyRecurse(ast.consequent, intoId)), recursionFn(intoId);
                    break;
                case AST.Identifier:
                    intoId = intoId || this.nextId(), nameId && (nameId.context = "inputs" === self.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", ast.name) + "?l:s"), nameId.computed = !1, nameId.name = ast.name), ensureSafeMemberName(ast.name), self.if_("inputs" === self.stage || self.not(self.getHasOwnProperty("l", ast.name)), function () {
                        self.if_("inputs" === self.stage || "s", function () {
                            create && 1 !== create && self.if_(self.not(self.nonComputedMember("s", ast.name)), self.lazyAssign(self.nonComputedMember("s", ast.name), "{}")), self.assign(intoId, self.nonComputedMember("s", ast.name))
                        })
                    }, intoId && self.lazyAssign(intoId, self.nonComputedMember("l", ast.name))), (self.state.expensiveChecks || isPossiblyDangerousMemberName(ast.name)) && self.addEnsureSafeObject(intoId), recursionFn(intoId);
                    break;
                case AST.MemberExpression:
                    left = nameId && (nameId.context = this.nextId()) || this.nextId(), intoId = intoId || this.nextId(), self.recurse(ast.object, left, undefined, function () {
                        self.if_(self.notNull(left), function () {
                            create && 1 !== create && self.addEnsureSafeAssignContext(left), ast.computed ? (right = self.nextId(), self.recurse(ast.property, right), self.getStringValue(right), self.addEnsureSafeMemberName(right), create && 1 !== create && self.if_(self.not(self.computedMember(left, right)), self.lazyAssign(self.computedMember(left, right), "{}")), expression = self.ensureSafeObject(self.computedMember(left, right)), self.assign(intoId, expression), nameId && (nameId.computed = !0, nameId.name = right)) : (ensureSafeMemberName(ast.property.name), create && 1 !== create && self.if_(self.not(self.nonComputedMember(left, ast.property.name)), self.lazyAssign(self.nonComputedMember(left, ast.property.name), "{}")), expression = self.nonComputedMember(left, ast.property.name), (self.state.expensiveChecks || isPossiblyDangerousMemberName(ast.property.name)) && (expression = self.ensureSafeObject(expression)), self.assign(intoId, expression), nameId && (nameId.computed = !1, nameId.name = ast.property.name))
                        }, function () {
                            self.assign(intoId, "undefined")
                        }), recursionFn(intoId)
                    }, !!create);
                    break;
                case AST.CallExpression:
                    intoId = intoId || this.nextId(), ast.filter ? (right = self.filter(ast.callee.name), args = [], forEach(ast.arguments, function (expr) {
                        var argument = self.nextId();
                        self.recurse(expr, argument), args.push(argument)
                    }), expression = right + "(" + args.join(",") + ")", self.assign(intoId, expression), recursionFn(intoId)) : (right = self.nextId(), left = {}, args = [], self.recurse(ast.callee, right, left, function () {
                        self.if_(self.notNull(right), function () {
                            self.addEnsureSafeFunction(right), forEach(ast.arguments, function (expr) {
                                self.recurse(expr, self.nextId(), undefined, function (argument) {
                                    args.push(self.ensureSafeObject(argument))
                                })
                            }), left.name ? (self.state.expensiveChecks || self.addEnsureSafeObject(left.context), expression = self.member(left.context, left.name, left.computed) + "(" + args.join(",") + ")") : expression = right + "(" + args.join(",") + ")", expression = self.ensureSafeObject(expression), self.assign(intoId, expression)
                        }, function () {
                            self.assign(intoId, "undefined")
                        }), recursionFn(intoId)
                    }));
                    break;
                case AST.AssignmentExpression:
                    if (right = this.nextId(), left = {}, !isAssignable(ast.left))throw $parseMinErr("lval", "Trying to assign a value to a non l-value");
                    this.recurse(ast.left, undefined, left, function () {
                        self.if_(self.notNull(left.context), function () {
                            self.recurse(ast.right, right), self.addEnsureSafeObject(self.member(left.context, left.name, left.computed)), self.addEnsureSafeAssignContext(left.context), expression = self.member(left.context, left.name, left.computed) + ast.operator + right, self.assign(intoId, expression), recursionFn(intoId || expression)
                        })
                    }, 1);
                    break;
                case AST.ArrayExpression:
                    args = [], forEach(ast.elements, function (expr) {
                        self.recurse(expr, self.nextId(), undefined, function (argument) {
                            args.push(argument)
                        })
                    }), expression = "[" + args.join(",") + "]", this.assign(intoId, expression), recursionFn(expression);
                    break;
                case AST.ObjectExpression:
                    args = [], forEach(ast.properties, function (property) {
                        self.recurse(property.value, self.nextId(), undefined, function (expr) {
                            args.push(self.escape(property.key.type === AST.Identifier ? property.key.name : "" + property.key.value) + ":" + expr)
                        })
                    }), expression = "{" + args.join(",") + "}", this.assign(intoId, expression), recursionFn(expression);
                    break;
                case AST.ThisExpression:
                    this.assign(intoId, "s"), recursionFn("s");
                    break;
                case AST.LocalsExpression:
                    this.assign(intoId, "l"), recursionFn("l");
                    break;
                case AST.NGValueParameter:
                    this.assign(intoId, "v"), recursionFn("v")
            }
        }, getHasOwnProperty: function (element, property) {
            var key = element + "." + property, own = this.current().own;
            return own.hasOwnProperty(key) || (own[key] = this.nextId(!1, element + "&&(" + this.escape(property) + " in " + element + ")")), own[key]
        }, assign: function (id, value) {
            return id ? (this.current().body.push(id, "=", value, ";"), id) : void 0
        }, filter: function (filterName) {
            return this.state.filters.hasOwnProperty(filterName) || (this.state.filters[filterName] = this.nextId(!0)), this.state.filters[filterName]
        }, ifDefined: function (id, defaultValue) {
            return "ifDefined(" + id + "," + this.escape(defaultValue) + ")"
        }, plus: function (left, right) {
            return "plus(" + left + "," + right + ")";
        }, return_: function (id) {
            this.current().body.push("return ", id, ";")
        }, if_: function (test, alternate, consequent) {
            if (test === !0)alternate(); else {
                var body = this.current().body;
                body.push("if(", test, "){"), alternate(), body.push("}"), consequent && (body.push("else{"), consequent(), body.push("}"))
            }
        }, not: function (expression) {
            return "!(" + expression + ")"
        }, notNull: function (expression) {
            return expression + "!=null"
        }, nonComputedMember: function (left, right) {
            return left + "." + right
        }, computedMember: function (left, right) {
            return left + "[" + right + "]"
        }, member: function (left, right, computed) {
            return computed ? this.computedMember(left, right) : this.nonComputedMember(left, right)
        }, addEnsureSafeObject: function (item) {
            this.current().body.push(this.ensureSafeObject(item), ";")
        }, addEnsureSafeMemberName: function (item) {
            this.current().body.push(this.ensureSafeMemberName(item), ";")
        }, addEnsureSafeFunction: function (item) {
            this.current().body.push(this.ensureSafeFunction(item), ";")
        }, addEnsureSafeAssignContext: function (item) {
            this.current().body.push(this.ensureSafeAssignContext(item), ";")
        }, ensureSafeObject: function (item) {
            return "ensureSafeObject(" + item + ",text)"
        }, ensureSafeMemberName: function (item) {
            return "ensureSafeMemberName(" + item + ",text)"
        }, ensureSafeFunction: function (item) {
            return "ensureSafeFunction(" + item + ",text)"
        }, getStringValue: function (item) {
            this.assign(item, "getStringValue(" + item + ")")
        }, ensureSafeAssignContext: function (item) {
            return "ensureSafeAssignContext(" + item + ",text)"
        }, lazyRecurse: function (ast, intoId, nameId, recursionFn, create, skipWatchIdCheck) {
            var self = this;
            return function () {
                self.recurse(ast, intoId, nameId, recursionFn, create, skipWatchIdCheck)
            }
        }, lazyAssign: function (id, value) {
            var self = this;
            return function () {
                self.assign(id, value)
            }
        }, stringEscapeRegex: /[^ a-zA-Z0-9]/g, stringEscapeFn: function (c) {
            return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4)
        }, escape: function (value) {
            if (isString(value))return "'" + value.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
            if (isNumber(value))return value.toString();
            if (value === !0)return "true";
            if (value === !1)return "false";
            if (null === value)return "null";
            if ("undefined" == typeof value)return "undefined";
            throw $parseMinErr("esc", "IMPOSSIBLE")
        }, nextId: function (skip, init) {
            var id = "v" + this.state.nextId++;
            return skip || this.current().vars.push(id + (init ? "=" + init : "")), id
        }, current: function () {
            return this.state[this.state.computing]
        }
    }, ASTInterpreter.prototype = {
        compile: function (expression, expensiveChecks) {
            var self = this, ast = this.astBuilder.ast(expression);
            this.expression = expression, this.expensiveChecks = expensiveChecks, findConstantAndWatchExpressions(ast, self.$filter);
            var assignable, assign;
            (assignable = assignableAST(ast)) && (assign = this.recurse(assignable));
            var inputs, toWatch = getInputs(ast.body);
            toWatch && (inputs = [], forEach(toWatch, function (watch, key) {
                var input = self.recurse(watch);
                watch.input = input, inputs.push(input), watch.watchId = key
            }));
            var expressions = [];
            forEach(ast.body, function (expression) {
                expressions.push(self.recurse(expression.expression))
            });
            var fn = 0 === ast.body.length ? function () {
            } : 1 === ast.body.length ? expressions[0] : function (scope, locals) {
                var lastValue;
                return forEach(expressions, function (exp) {
                    lastValue = exp(scope, locals)
                }), lastValue
            };
            return assign && (fn.assign = function (scope, value, locals) {
                return assign(scope, locals, value)
            }), inputs && (fn.inputs = inputs), fn.literal = isLiteral(ast), fn.constant = isConstant(ast), fn
        }, recurse: function (ast, context, create) {
            var left, right, args, self = this;
            if (ast.input)return this.inputs(ast.input, ast.watchId);
            switch (ast.type) {
                case AST.Literal:
                    return this.value(ast.value, context);
                case AST.UnaryExpression:
                    return right = this.recurse(ast.argument), this["unary" + ast.operator](right, context);
                case AST.BinaryExpression:
                    return left = this.recurse(ast.left), right = this.recurse(ast.right), this["binary" + ast.operator](left, right, context);
                case AST.LogicalExpression:
                    return left = this.recurse(ast.left), right = this.recurse(ast.right), this["binary" + ast.operator](left, right, context);
                case AST.ConditionalExpression:
                    return this["ternary?:"](this.recurse(ast.test), this.recurse(ast.alternate), this.recurse(ast.consequent), context);
                case AST.Identifier:
                    return ensureSafeMemberName(ast.name, self.expression), self.identifier(ast.name, self.expensiveChecks || isPossiblyDangerousMemberName(ast.name), context, create, self.expression);
                case AST.MemberExpression:
                    return left = this.recurse(ast.object, !1, !!create), ast.computed || (ensureSafeMemberName(ast.property.name, self.expression), right = ast.property.name), ast.computed && (right = this.recurse(ast.property)), ast.computed ? this.computedMember(left, right, context, create, self.expression) : this.nonComputedMember(left, right, self.expensiveChecks, context, create, self.expression);
                case AST.CallExpression:
                    return args = [], forEach(ast.arguments, function (expr) {
                        args.push(self.recurse(expr))
                    }), ast.filter && (right = this.$filter(ast.callee.name)), ast.filter || (right = this.recurse(ast.callee, !0)), ast.filter ? function (scope, locals, assign, inputs) {
                        for (var values = [], i = 0; i < args.length; ++i)values.push(args[i](scope, locals, assign, inputs));
                        var value = right.apply(undefined, values, inputs);
                        return context ? {context: undefined, name: undefined, value: value} : value
                    } : function (scope, locals, assign, inputs) {
                        var value, rhs = right(scope, locals, assign, inputs);
                        if (null != rhs.value) {
                            ensureSafeObject(rhs.context, self.expression), ensureSafeFunction(rhs.value, self.expression);
                            for (var values = [], i = 0; i < args.length; ++i)values.push(ensureSafeObject(args[i](scope, locals, assign, inputs), self.expression));
                            value = ensureSafeObject(rhs.value.apply(rhs.context, values), self.expression)
                        }
                        return context ? {value: value} : value
                    };
                case AST.AssignmentExpression:
                    return left = this.recurse(ast.left, !0, 1), right = this.recurse(ast.right), function (scope, locals, assign, inputs) {
                        var lhs = left(scope, locals, assign, inputs), rhs = right(scope, locals, assign, inputs);
                        return ensureSafeObject(lhs.value, self.expression), ensureSafeAssignContext(lhs.context), lhs.context[lhs.name] = rhs, context ? {value: rhs} : rhs
                    };
                case AST.ArrayExpression:
                    return args = [], forEach(ast.elements, function (expr) {
                        args.push(self.recurse(expr))
                    }), function (scope, locals, assign, inputs) {
                        for (var value = [], i = 0; i < args.length; ++i)value.push(args[i](scope, locals, assign, inputs));
                        return context ? {value: value} : value
                    };
                case AST.ObjectExpression:
                    return args = [], forEach(ast.properties, function (property) {
                        args.push({
                            key: property.key.type === AST.Identifier ? property.key.name : "" + property.key.value,
                            value: self.recurse(property.value)
                        })
                    }), function (scope, locals, assign, inputs) {
                        for (var value = {}, i = 0; i < args.length; ++i)value[args[i].key] = args[i].value(scope, locals, assign, inputs);
                        return context ? {value: value} : value
                    };
                case AST.ThisExpression:
                    return function (scope) {
                        return context ? {value: scope} : scope
                    };
                case AST.LocalsExpression:
                    return function (scope, locals) {
                        return context ? {value: locals} : locals
                    };
                case AST.NGValueParameter:
                    return function (scope, locals, assign, inputs) {
                        return context ? {value: assign} : assign
                    }
            }
        }, "unary+": function (argument, context) {
            return function (scope, locals, assign, inputs) {
                var arg = argument(scope, locals, assign, inputs);
                return arg = isDefined(arg) ? +arg : 0, context ? {value: arg} : arg
            }
        }, "unary-": function (argument, context) {
            return function (scope, locals, assign, inputs) {
                var arg = argument(scope, locals, assign, inputs);
                return arg = isDefined(arg) ? -arg : 0, context ? {value: arg} : arg
            }
        }, "unary!": function (argument, context) {
            return function (scope, locals, assign, inputs) {
                var arg = !argument(scope, locals, assign, inputs);
                return context ? {value: arg} : arg
            }
        }, "binary+": function (left, right, context) {
            return function (scope, locals, assign, inputs) {
                var lhs = left(scope, locals, assign, inputs), rhs = right(scope, locals, assign, inputs), arg = plusFn(lhs, rhs);
                return context ? {value: arg} : arg
            }
        }, "binary-": function (left, right, context) {
            return function (scope, locals, assign, inputs) {
                var lhs = left(scope, locals, assign, inputs), rhs = right(scope, locals, assign, inputs), arg = (isDefined(lhs) ? lhs : 0) - (isDefined(rhs) ? rhs : 0);
                return context ? {value: arg} : arg
            }
        }, "binary*": function (left, right, context) {
            return function (scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) * right(scope, locals, assign, inputs);
                return context ? {value: arg} : arg
            }
        }, "binary/": function (left, right, context) {
            return function (scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) / right(scope, locals, assign, inputs);
                return context ? {value: arg} : arg
            }
        }, "binary%": function (left, right, context) {
            return function (scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) % right(scope, locals, assign, inputs);
                return context ? {value: arg} : arg
            }
        }, "binary===": function (left, right, context) {
            return function (scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) === right(scope, locals, assign, inputs);
                return context ? {value: arg} : arg
            }
        }, "binary!==": function (left, right, context) {
            return function (scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) !== right(scope, locals, assign, inputs);
                return context ? {value: arg} : arg
            }
        }, "binary==": function (left, right, context) {
            return function (scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) == right(scope, locals, assign, inputs);
                return context ? {value: arg} : arg
            }
        }, "binary!=": function (left, right, context) {
            return function (scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) != right(scope, locals, assign, inputs);
                return context ? {value: arg} : arg
            }
        }, "binary<": function (left, right, context) {
            return function (scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) < right(scope, locals, assign, inputs);
                return context ? {value: arg} : arg
            }
        }, "binary>": function (left, right, context) {
            return function (scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) > right(scope, locals, assign, inputs);
                return context ? {value: arg} : arg
            }
        }, "binary<=": function (left, right, context) {
            return function (scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) <= right(scope, locals, assign, inputs);
                return context ? {value: arg} : arg
            }
        }, "binary>=": function (left, right, context) {
            return function (scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) >= right(scope, locals, assign, inputs);
                return context ? {value: arg} : arg
            }
        }, "binary&&": function (left, right, context) {
            return function (scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) && right(scope, locals, assign, inputs);
                return context ? {value: arg} : arg
            }
        }, "binary||": function (left, right, context) {
            return function (scope, locals, assign, inputs) {
                var arg = left(scope, locals, assign, inputs) || right(scope, locals, assign, inputs);
                return context ? {value: arg} : arg
            }
        }, "ternary?:": function (test, alternate, consequent, context) {
            return function (scope, locals, assign, inputs) {
                var arg = test(scope, locals, assign, inputs) ? alternate(scope, locals, assign, inputs) : consequent(scope, locals, assign, inputs);
                return context ? {value: arg} : arg
            }
        }, value: function (value, context) {
            return function () {
                return context ? {context: undefined, name: undefined, value: value} : value
            }
        }, identifier: function (name, expensiveChecks, context, create, expression) {
            return function (scope, locals, assign, inputs) {
                var base = locals && name in locals ? locals : scope;
                create && 1 !== create && base && !base[name] && (base[name] = {});
                var value = base ? base[name] : undefined;
                return expensiveChecks && ensureSafeObject(value, expression), context ? {
                    context: base,
                    name: name,
                    value: value
                } : value
            }
        }, computedMember: function (left, right, context, create, expression) {
            return function (scope, locals, assign, inputs) {
                var rhs, value, lhs = left(scope, locals, assign, inputs);
                return null != lhs && (rhs = right(scope, locals, assign, inputs), rhs = getStringValue(rhs), ensureSafeMemberName(rhs, expression), create && 1 !== create && (ensureSafeAssignContext(lhs), lhs && !lhs[rhs] && (lhs[rhs] = {})), value = lhs[rhs], ensureSafeObject(value, expression)), context ? {
                    context: lhs,
                    name: rhs,
                    value: value
                } : value
            }
        }, nonComputedMember: function (left, right, expensiveChecks, context, create, expression) {
            return function (scope, locals, assign, inputs) {
                var lhs = left(scope, locals, assign, inputs);
                create && 1 !== create && (ensureSafeAssignContext(lhs), lhs && !lhs[right] && (lhs[right] = {}));
                var value = null != lhs ? lhs[right] : undefined;
                return (expensiveChecks || isPossiblyDangerousMemberName(right)) && ensureSafeObject(value, expression), context ? {
                    context: lhs,
                    name: right,
                    value: value
                } : value
            }
        }, inputs: function (input, watchId) {
            return function (scope, value, locals, inputs) {
                return inputs ? inputs[watchId] : input(scope, value, locals)
            }
        }
    };
    var Parser = function (lexer, $filter, options) {
        this.lexer = lexer, this.$filter = $filter, this.options = options, this.ast = new AST(this.lexer), this.astCompiler = options.csp ? new ASTInterpreter(this.ast, $filter) : new ASTCompiler(this.ast, $filter)
    };
    Parser.prototype = {
        constructor: Parser, parse: function (text) {
            return this.astCompiler.compile(text, this.options.expensiveChecks)
        }
    };
    var objectValueOf = Object.prototype.valueOf, $sceMinErr = minErr("$sce"), SCE_CONTEXTS = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    }, $compileMinErr = minErr("$compile"), urlParsingNode = document.createElement("a"), originUrl = urlResolve(window.location.href);
    $$CookieReader.$inject = ["$document"], $FilterProvider.$inject = ["$provide"];
    var MAX_DIGITS = 22, DECIMAL_SEP = ".", ZERO_CHAR = "0";
    currencyFilter.$inject = ["$locale"], numberFilter.$inject = ["$locale"];
    var DATE_FORMATS = {
        yyyy: dateGetter("FullYear", 4),
        yy: dateGetter("FullYear", 2, 0, !0),
        y: dateGetter("FullYear", 1),
        MMMM: dateStrGetter("Month"),
        MMM: dateStrGetter("Month", !0),
        MM: dateGetter("Month", 2, 1),
        M: dateGetter("Month", 1, 1),
        dd: dateGetter("Date", 2),
        d: dateGetter("Date", 1),
        HH: dateGetter("Hours", 2),
        H: dateGetter("Hours", 1),
        hh: dateGetter("Hours", 2, -12),
        h: dateGetter("Hours", 1, -12),
        mm: dateGetter("Minutes", 2),
        m: dateGetter("Minutes", 1),
        ss: dateGetter("Seconds", 2),
        s: dateGetter("Seconds", 1),
        sss: dateGetter("Milliseconds", 3),
        EEEE: dateStrGetter("Day"),
        EEE: dateStrGetter("Day", !0),
        a: ampmGetter,
        Z: timeZoneGetter,
        ww: weekGetter(2),
        w: weekGetter(1),
        G: eraGetter,
        GG: eraGetter,
        GGG: eraGetter,
        GGGG: longEraGetter
    }, DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/, NUMBER_STRING = /^\-?\d+$/;
    dateFilter.$inject = ["$locale"];
    var lowercaseFilter = valueFn(lowercase), uppercaseFilter = valueFn(uppercase);
    orderByFilter.$inject = ["$parse"];
    var htmlAnchorDirective = valueFn({
        restrict: "E", compile: function (element, attr) {
            return attr.href || attr.xlinkHref ? void 0 : function (scope, element) {
                if ("a" === element[0].nodeName.toLowerCase()) {
                    var href = "[object SVGAnimatedString]" === toString.call(element.prop("href")) ? "xlink:href" : "href";
                    element.on("click", function (event) {
                        element.attr(href) || event.preventDefault()
                    })
                }
            }
        }
    }), ngAttributeAliasDirectives = {};
    forEach(BOOLEAN_ATTR, function (propName, attrName) {
        function defaultLinkFn(scope, element, attr) {
            scope.$watch(attr[normalized], function (value) {
                attr.$set(attrName, !!value)
            })
        }

        if ("multiple" != propName) {
            var normalized = directiveNormalize("ng-" + attrName), linkFn = defaultLinkFn;
            "checked" === propName && (linkFn = function (scope, element, attr) {
                attr.ngModel !== attr[normalized] && defaultLinkFn(scope, element, attr)
            }), ngAttributeAliasDirectives[normalized] = function () {
                return {restrict: "A", priority: 100, link: linkFn}
            }
        }
    }), forEach(ALIASED_ATTR, function (htmlAttr, ngAttr) {
        ngAttributeAliasDirectives[ngAttr] = function () {
            return {
                priority: 100, link: function (scope, element, attr) {
                    if ("ngPattern" === ngAttr && "/" == attr.ngPattern.charAt(0)) {
                        var match = attr.ngPattern.match(REGEX_STRING_REGEXP);
                        if (match)return void attr.$set("ngPattern", new RegExp(match[1], match[2]))
                    }
                    scope.$watch(attr[ngAttr], function (value) {
                        attr.$set(ngAttr, value)
                    })
                }
            }
        }
    }), forEach(["src", "srcset", "href"], function (attrName) {
        var normalized = directiveNormalize("ng-" + attrName);
        ngAttributeAliasDirectives[normalized] = function () {
            return {
                priority: 99, link: function (scope, element, attr) {
                    var propName = attrName, name = attrName;
                    "href" === attrName && "[object SVGAnimatedString]" === toString.call(element.prop("href")) && (name = "xlinkHref", attr.$attr[name] = "xlink:href", propName = null), attr.$observe(normalized, function (value) {
                        return value ? (attr.$set(name, value), void(msie && propName && element.prop(propName, attr[name]))) : void("href" === attrName && attr.$set(name, null))
                    })
                }
            }
        }
    });
    var nullFormCtrl = {
        $addControl: noop,
        $$renameControl: nullFormRenameControl,
        $removeControl: noop,
        $setValidity: noop,
        $setDirty: noop,
        $setPristine: noop,
        $setSubmitted: noop
    }, SUBMITTED_CLASS = "ng-submitted";
    FormController.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];
    var formDirectiveFactory = function (isNgForm) {
        return ["$timeout", "$parse", function ($timeout, $parse) {
            function getSetter(expression) {
                return "" === expression ? $parse('this[""]').assign : $parse(expression).assign || noop
            }

            var formDirective = {
                name: "form",
                restrict: isNgForm ? "EAC" : "E",
                require: ["form", "^^?form"],
                controller: FormController,
                compile: function (formElement, attr) {
                    formElement.addClass(PRISTINE_CLASS).addClass(VALID_CLASS);
                    var nameAttr = attr.name ? "name" : isNgForm && attr.ngForm ? "ngForm" : !1;
                    return {
                        pre: function (scope, formElement, attr, ctrls) {
                            var controller = ctrls[0];
                            if (!("action" in attr)) {
                                var handleFormSubmission = function (event) {
                                    scope.$apply(function () {
                                        controller.$commitViewValue(), controller.$setSubmitted()
                                    }), event.preventDefault()
                                };
                                addEventListenerFn(formElement[0], "submit", handleFormSubmission), formElement.on("$destroy", function () {
                                    $timeout(function () {
                                        removeEventListenerFn(formElement[0], "submit", handleFormSubmission)
                                    }, 0, !1)
                                })
                            }
                            var parentFormCtrl = ctrls[1] || controller.$$parentForm;
                            parentFormCtrl.$addControl(controller);
                            var setter = nameAttr ? getSetter(controller.$name) : noop;
                            nameAttr && (setter(scope, controller), attr.$observe(nameAttr, function (newValue) {
                                controller.$name !== newValue && (setter(scope, undefined), controller.$$parentForm.$$renameControl(controller, newValue), (setter = getSetter(controller.$name))(scope, controller))
                            })), formElement.on("$destroy", function () {
                                controller.$$parentForm.$removeControl(controller), setter(scope, undefined), extend(controller, nullFormCtrl)
                            })
                        }
                    }
                }
            };
            return formDirective
        }]
    }, formDirective = formDirectiveFactory(), ngFormDirective = formDirectiveFactory(!0), ISO_DATE_REGEXP = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/, URL_REGEXP = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:\/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i, EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, DATE_REGEXP = /^(\d{4})-(\d{2})-(\d{2})$/, DATETIMELOCAL_REGEXP = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, WEEK_REGEXP = /^(\d{4})-W(\d\d)$/, MONTH_REGEXP = /^(\d{4})-(\d\d)$/, TIME_REGEXP = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, inputType = {
        text: textInputType,
        date: createDateInputType("date", DATE_REGEXP, createDateParser(DATE_REGEXP, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"),
        "datetime-local": createDateInputType("datetimelocal", DATETIMELOCAL_REGEXP, createDateParser(DATETIMELOCAL_REGEXP, ["yyyy", "MM", "dd", "HH", "mm", "ss", "sss"]), "yyyy-MM-ddTHH:mm:ss.sss"),
        time: createDateInputType("time", TIME_REGEXP, createDateParser(TIME_REGEXP, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"),
        week: createDateInputType("week", WEEK_REGEXP, weekParser, "yyyy-Www"),
        month: createDateInputType("month", MONTH_REGEXP, createDateParser(MONTH_REGEXP, ["yyyy", "MM"]), "yyyy-MM"),
        number: numberInputType,
        url: urlInputType,
        email: emailInputType,
        radio: radioInputType,
        checkbox: checkboxInputType,
        hidden: noop,
        button: noop,
        submit: noop,
        reset: noop,
        file: noop
    }, inputDirective = ["$browser", "$sniffer", "$filter", "$parse", function ($browser, $sniffer, $filter, $parse) {
        return {
            restrict: "E", require: ["?ngModel"], link: {
                pre: function (scope, element, attr, ctrls) {
                    ctrls[0] && (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrls[0], $sniffer, $browser, $filter, $parse)
                }
            }
        }
    }], CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/, ngValueDirective = function () {
        return {
            restrict: "A", priority: 100, compile: function (tpl, tplAttr) {
                return CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue) ? function (scope, elm, attr) {
                    attr.$set("value", scope.$eval(attr.ngValue))
                } : function (scope, elm, attr) {
                    scope.$watch(attr.ngValue, function (value) {
                        attr.$set("value", value)
                    })
                }
            }
        }
    }, ngBindDirective = ["$compile", function ($compile) {
        return {
            restrict: "AC", compile: function (templateElement) {
                return $compile.$$addBindingClass(templateElement), function (scope, element, attr) {
                    $compile.$$addBindingInfo(element, attr.ngBind), element = element[0], scope.$watch(attr.ngBind, function (value) {
                        element.textContent = isUndefined(value) ? "" : value
                    })
                }
            }
        }
    }], ngBindTemplateDirective = ["$interpolate", "$compile", function ($interpolate, $compile) {
        return {
            compile: function (templateElement) {
                return $compile.$$addBindingClass(templateElement), function (scope, element, attr) {
                    var interpolateFn = $interpolate(element.attr(attr.$attr.ngBindTemplate));
                    $compile.$$addBindingInfo(element, interpolateFn.expressions), element = element[0], attr.$observe("ngBindTemplate", function (value) {
                        element.textContent = isUndefined(value) ? "" : value
                    })
                }
            }
        }
    }], ngBindHtmlDirective = ["$sce", "$parse", "$compile", function ($sce, $parse, $compile) {
        return {
            restrict: "A", compile: function (tElement, tAttrs) {
                var ngBindHtmlGetter = $parse(tAttrs.ngBindHtml), ngBindHtmlWatch = $parse(tAttrs.ngBindHtml, function (value) {
                    return (value || "").toString()
                });
                return $compile.$$addBindingClass(tElement), function (scope, element, attr) {
                    $compile.$$addBindingInfo(element, attr.ngBindHtml), scope.$watch(ngBindHtmlWatch, function () {
                        element.html($sce.getTrustedHtml(ngBindHtmlGetter(scope)) || "")
                    })
                }
            }
        }
    }], ngChangeDirective = valueFn({
        restrict: "A", require: "ngModel", link: function (scope, element, attr, ctrl) {
            ctrl.$viewChangeListeners.push(function () {
                scope.$eval(attr.ngChange)
            })
        }
    }), ngClassDirective = classDirective("", !0), ngClassOddDirective = classDirective("Odd", 0), ngClassEvenDirective = classDirective("Even", 1), ngCloakDirective = ngDirective({
        compile: function (element, attr) {
            attr.$set("ngCloak", undefined), element.removeClass("ng-cloak")
        }
    }), ngControllerDirective = [function () {
        return {restrict: "A", scope: !0, controller: "@", priority: 500}
    }], ngEventDirectives = {}, forceAsyncEvents = {blur: !0, focus: !0};
    forEach("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (eventName) {
        var directiveName = directiveNormalize("ng-" + eventName);
        ngEventDirectives[directiveName] = ["$parse", "$rootScope", function ($parse, $rootScope) {
            return {
                restrict: "A", compile: function ($element, attr) {
                    var fn = $parse(attr[directiveName], null, !0);
                    return function (scope, element) {
                        element.on(eventName, function (event) {
                            var callback = function () {
                                fn(scope, {$event: event})
                            };
                            forceAsyncEvents[eventName] && $rootScope.$$phase ? scope.$evalAsync(callback) : scope.$apply(callback)
                        })
                    }
                }
            }
        }]
    });
    var ngIfDirective = ["$animate", function ($animate) {
        return {
            multiElement: !0,
            transclude: "element",
            priority: 600,
            terminal: !0,
            restrict: "A",
            $$tlb: !0,
            link: function ($scope, $element, $attr, ctrl, $transclude) {
                var block, childScope, previousElements;
                $scope.$watch($attr.ngIf, function (value) {
                    value ? childScope || $transclude(function (clone, newScope) {
                        childScope = newScope, clone[clone.length++] = document.createComment(" end ngIf: " + $attr.ngIf + " "), block = {clone: clone}, $animate.enter(clone, $element.parent(), $element)
                    }) : (previousElements && (previousElements.remove(), previousElements = null), childScope && (childScope.$destroy(), childScope = null), block && (previousElements = getBlockNodes(block.clone), $animate.leave(previousElements).then(function () {
                        previousElements = null
                    }), block = null))
                })
            }
        }
    }], ngIncludeDirective = ["$templateRequest", "$anchorScroll", "$animate", function ($templateRequest, $anchorScroll, $animate) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: !0,
            transclude: "element",
            controller: angular.noop,
            compile: function (element, attr) {
                var srcExp = attr.ngInclude || attr.src, onloadExp = attr.onload || "", autoScrollExp = attr.autoscroll;
                return function (scope, $element, $attr, ctrl, $transclude) {
                    var currentScope, previousElement, currentElement, changeCounter = 0, cleanupLastIncludeContent = function () {
                        previousElement && (previousElement.remove(), previousElement = null), currentScope && (currentScope.$destroy(), currentScope = null), currentElement && ($animate.leave(currentElement).then(function () {
                            previousElement = null
                        }), previousElement = currentElement, currentElement = null)
                    };
                    scope.$watch(srcExp, function (src) {
                        var afterAnimation = function () {
                            !isDefined(autoScrollExp) || autoScrollExp && !scope.$eval(autoScrollExp) || $anchorScroll()
                        }, thisChangeId = ++changeCounter;
                        src ? ($templateRequest(src, !0).then(function (response) {
                            if (!scope.$$destroyed && thisChangeId === changeCounter) {
                                var newScope = scope.$new();
                                ctrl.template = response;
                                var clone = $transclude(newScope, function (clone) {
                                    cleanupLastIncludeContent(), $animate.enter(clone, null, $element).then(afterAnimation)
                                });
                                currentScope = newScope, currentElement = clone, currentScope.$emit("$includeContentLoaded", src), scope.$eval(onloadExp)
                            }
                        }, function () {
                            scope.$$destroyed || thisChangeId === changeCounter && (cleanupLastIncludeContent(), scope.$emit("$includeContentError", src))
                        }), scope.$emit("$includeContentRequested", src)) : (cleanupLastIncludeContent(), ctrl.template = null)
                    })
                }
            }
        }
    }], ngIncludeFillContentDirective = ["$compile", function ($compile) {
        return {
            restrict: "ECA", priority: -400, require: "ngInclude", link: function (scope, $element, $attr, ctrl) {
                return toString.call($element[0]).match(/SVG/) ? ($element.empty(), void $compile(jqLiteBuildFragment(ctrl.template, document).childNodes)(scope, function (clone) {
                    $element.append(clone)
                }, {futureParentElement: $element})) : ($element.html(ctrl.template), void $compile($element.contents())(scope))
            }
        }
    }], ngInitDirective = ngDirective({
        priority: 450, compile: function () {
            return {
                pre: function (scope, element, attrs) {
                    scope.$eval(attrs.ngInit)
                }
            }
        }
    }), ngListDirective = function () {
        return {
            restrict: "A", priority: 100, require: "ngModel", link: function (scope, element, attr, ctrl) {
                var ngList = element.attr(attr.$attr.ngList) || ", ", trimValues = "false" !== attr.ngTrim, separator = trimValues ? trim(ngList) : ngList, parse = function (viewValue) {
                    if (!isUndefined(viewValue)) {
                        var list = [];
                        return viewValue && forEach(viewValue.split(separator), function (value) {
                            value && list.push(trimValues ? trim(value) : value)
                        }), list
                    }
                };
                ctrl.$parsers.push(parse), ctrl.$formatters.push(function (value) {
                    return isArray(value) ? value.join(ngList) : undefined
                }), ctrl.$isEmpty = function (value) {
                    return !value || !value.length
                }
            }
        }
    }, VALID_CLASS = "ng-valid", INVALID_CLASS = "ng-invalid", PRISTINE_CLASS = "ng-pristine", DIRTY_CLASS = "ng-dirty", UNTOUCHED_CLASS = "ng-untouched", TOUCHED_CLASS = "ng-touched", PENDING_CLASS = "ng-pending", EMPTY_CLASS = "ng-empty", NOT_EMPTY_CLASS = "ng-not-empty", ngModelMinErr = minErr("ngModel"), NgModelController = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function ($scope, $exceptionHandler, $attr, $element, $parse, $animate, $timeout, $rootScope, $q, $interpolate) {
        this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$$rawModelValue = undefined, this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, this.$pending = undefined, this.$name = $interpolate($attr.name || "", !1)($scope), this.$$parentForm = nullFormCtrl;
        var parserValid, parsedNgModel = $parse($attr.ngModel), parsedNgModelAssign = parsedNgModel.assign, ngModelGet = parsedNgModel, ngModelSet = parsedNgModelAssign, pendingDebounce = null, ctrl = this;
        this.$$setOptions = function (options) {
            if (ctrl.$options = options, options && options.getterSetter) {
                var invokeModelGetter = $parse($attr.ngModel + "()"), invokeModelSetter = $parse($attr.ngModel + "($$$p)");
                ngModelGet = function ($scope) {
                    var modelValue = parsedNgModel($scope);
                    return isFunction(modelValue) && (modelValue = invokeModelGetter($scope)), modelValue
                }, ngModelSet = function ($scope, newValue) {
                    isFunction(parsedNgModel($scope)) ? invokeModelSetter($scope, {$$$p: ctrl.$modelValue}) : parsedNgModelAssign($scope, ctrl.$modelValue)
                }
            } else if (!parsedNgModel.assign)throw ngModelMinErr("nonassign", "Expression '{0}' is non-assignable. Element: {1}", $attr.ngModel, startingTag($element))
        }, this.$render = noop, this.$isEmpty = function (value) {
            return isUndefined(value) || "" === value || null === value || value !== value
        }, this.$$updateEmptyClasses = function (value) {
            ctrl.$isEmpty(value) ? ($animate.removeClass($element, NOT_EMPTY_CLASS), $animate.addClass($element, EMPTY_CLASS)) : ($animate.removeClass($element, EMPTY_CLASS), $animate.addClass($element, NOT_EMPTY_CLASS))
        };
        var currentValidationRunId = 0;
        addSetValidityMethod({
            ctrl: this, $element: $element, set: function (object, property) {
                object[property] = !0
            }, unset: function (object, property) {
                delete object[property]
            }, $animate: $animate
        }), this.$setPristine = function () {
            ctrl.$dirty = !1, ctrl.$pristine = !0, $animate.removeClass($element, DIRTY_CLASS), $animate.addClass($element, PRISTINE_CLASS)
        }, this.$setDirty = function () {
            ctrl.$dirty = !0, ctrl.$pristine = !1, $animate.removeClass($element, PRISTINE_CLASS), $animate.addClass($element, DIRTY_CLASS), ctrl.$$parentForm.$setDirty()
        }, this.$setUntouched = function () {
            ctrl.$touched = !1, ctrl.$untouched = !0, $animate.setClass($element, UNTOUCHED_CLASS, TOUCHED_CLASS)
        }, this.$setTouched = function () {
            ctrl.$touched = !0, ctrl.$untouched = !1, $animate.setClass($element, TOUCHED_CLASS, UNTOUCHED_CLASS)
        }, this.$rollbackViewValue = function () {
            $timeout.cancel(pendingDebounce), ctrl.$viewValue = ctrl.$$lastCommittedViewValue, ctrl.$render()
        }, this.$validate = function () {
            if (!isNumber(ctrl.$modelValue) || !isNaN(ctrl.$modelValue)) {
                var viewValue = ctrl.$$lastCommittedViewValue, modelValue = ctrl.$$rawModelValue, prevValid = ctrl.$valid, prevModelValue = ctrl.$modelValue, allowInvalid = ctrl.$options && ctrl.$options.allowInvalid;
                ctrl.$$runValidators(modelValue, viewValue, function (allValid) {
                    allowInvalid || prevValid === allValid || (ctrl.$modelValue = allValid ? modelValue : undefined, ctrl.$modelValue !== prevModelValue && ctrl.$$writeModelToScope())
                })
            }
        }, this.$$runValidators = function (modelValue, viewValue, doneCallback) {
            function processParseErrors() {
                var errorKey = ctrl.$$parserName || "parse";
                return isUndefined(parserValid) ? (setValidity(errorKey, null), !0) : (parserValid || (forEach(ctrl.$validators, function (v, name) {
                    setValidity(name, null)
                }), forEach(ctrl.$asyncValidators, function (v, name) {
                    setValidity(name, null)
                })), setValidity(errorKey, parserValid), parserValid)
            }

            function processSyncValidators() {
                var syncValidatorsValid = !0;
                return forEach(ctrl.$validators, function (validator, name) {
                    var result = validator(modelValue, viewValue);
                    syncValidatorsValid = syncValidatorsValid && result, setValidity(name, result)
                }), syncValidatorsValid ? !0 : (forEach(ctrl.$asyncValidators, function (v, name) {
                    setValidity(name, null)
                }), !1)
            }

            function processAsyncValidators() {
                var validatorPromises = [], allValid = !0;
                forEach(ctrl.$asyncValidators, function (validator, name) {
                    var promise = validator(modelValue, viewValue);
                    if (!isPromiseLike(promise))throw ngModelMinErr("nopromise", "Expected asynchronous validator to return a promise but got '{0}' instead.", promise);
                    setValidity(name, undefined), validatorPromises.push(promise.then(function () {
                        setValidity(name, !0)
                    }, function (error) {
                        allValid = !1, setValidity(name, !1)
                    }))
                }), validatorPromises.length ? $q.all(validatorPromises).then(function () {
                    validationDone(allValid)
                }, noop) : validationDone(!0)
            }

            function setValidity(name, isValid) {
                localValidationRunId === currentValidationRunId && ctrl.$setValidity(name, isValid)
            }

            function validationDone(allValid) {
                localValidationRunId === currentValidationRunId && doneCallback(allValid)
            }

            currentValidationRunId++;
            var localValidationRunId = currentValidationRunId;
            return processParseErrors() && processSyncValidators() ? void processAsyncValidators() : void validationDone(!1)
        }, this.$commitViewValue = function () {
            var viewValue = ctrl.$viewValue;
            $timeout.cancel(pendingDebounce), (ctrl.$$lastCommittedViewValue !== viewValue || "" === viewValue && ctrl.$$hasNativeValidators) && (ctrl.$$updateEmptyClasses(viewValue), ctrl.$$lastCommittedViewValue = viewValue, ctrl.$pristine && this.$setDirty(), this.$$parseAndValidate())
        }, this.$$parseAndValidate = function () {
            function writeToModelIfNeeded() {
                ctrl.$modelValue !== prevModelValue && ctrl.$$writeModelToScope()
            }

            var viewValue = ctrl.$$lastCommittedViewValue, modelValue = viewValue;
            if (parserValid = isUndefined(modelValue) ? undefined : !0)for (var i = 0; i < ctrl.$parsers.length; i++)if (modelValue = ctrl.$parsers[i](modelValue), isUndefined(modelValue)) {
                parserValid = !1;
                break
            }
            isNumber(ctrl.$modelValue) && isNaN(ctrl.$modelValue) && (ctrl.$modelValue = ngModelGet($scope));
            var prevModelValue = ctrl.$modelValue, allowInvalid = ctrl.$options && ctrl.$options.allowInvalid;
            ctrl.$$rawModelValue = modelValue, allowInvalid && (ctrl.$modelValue = modelValue, writeToModelIfNeeded()), ctrl.$$runValidators(modelValue, ctrl.$$lastCommittedViewValue, function (allValid) {
                allowInvalid || (ctrl.$modelValue = allValid ? modelValue : undefined,
                    writeToModelIfNeeded())
            })
        }, this.$$writeModelToScope = function () {
            ngModelSet($scope, ctrl.$modelValue), forEach(ctrl.$viewChangeListeners, function (listener) {
                try {
                    listener()
                } catch (e) {
                    $exceptionHandler(e)
                }
            })
        }, this.$setViewValue = function (value, trigger) {
            ctrl.$viewValue = value, ctrl.$options && !ctrl.$options.updateOnDefault || ctrl.$$debounceViewValueCommit(trigger)
        }, this.$$debounceViewValueCommit = function (trigger) {
            var debounce, debounceDelay = 0, options = ctrl.$options;
            options && isDefined(options.debounce) && (debounce = options.debounce, isNumber(debounce) ? debounceDelay = debounce : isNumber(debounce[trigger]) ? debounceDelay = debounce[trigger] : isNumber(debounce["default"]) && (debounceDelay = debounce["default"])), $timeout.cancel(pendingDebounce), debounceDelay ? pendingDebounce = $timeout(function () {
                ctrl.$commitViewValue()
            }, debounceDelay) : $rootScope.$$phase ? ctrl.$commitViewValue() : $scope.$apply(function () {
                ctrl.$commitViewValue()
            })
        }, $scope.$watch(function () {
            var modelValue = ngModelGet($scope);
            if (modelValue !== ctrl.$modelValue && (ctrl.$modelValue === ctrl.$modelValue || modelValue === modelValue)) {
                ctrl.$modelValue = ctrl.$$rawModelValue = modelValue, parserValid = undefined;
                for (var formatters = ctrl.$formatters, idx = formatters.length, viewValue = modelValue; idx--;)viewValue = formatters[idx](viewValue);
                ctrl.$viewValue !== viewValue && (ctrl.$$updateEmptyClasses(viewValue), ctrl.$viewValue = ctrl.$$lastCommittedViewValue = viewValue, ctrl.$render(), ctrl.$$runValidators(modelValue, viewValue, noop))
            }
            return modelValue
        })
    }], ngModelDirective = ["$rootScope", function ($rootScope) {
        return {
            restrict: "A",
            require: ["ngModel", "^?form", "^?ngModelOptions"],
            controller: NgModelController,
            priority: 1,
            compile: function (element) {
                return element.addClass(PRISTINE_CLASS).addClass(UNTOUCHED_CLASS).addClass(VALID_CLASS), {
                    pre: function (scope, element, attr, ctrls) {
                        var modelCtrl = ctrls[0], formCtrl = ctrls[1] || modelCtrl.$$parentForm;
                        modelCtrl.$$setOptions(ctrls[2] && ctrls[2].$options), formCtrl.$addControl(modelCtrl), attr.$observe("name", function (newValue) {
                            modelCtrl.$name !== newValue && modelCtrl.$$parentForm.$$renameControl(modelCtrl, newValue)
                        }), scope.$on("$destroy", function () {
                            modelCtrl.$$parentForm.$removeControl(modelCtrl)
                        })
                    }, post: function (scope, element, attr, ctrls) {
                        var modelCtrl = ctrls[0];
                        modelCtrl.$options && modelCtrl.$options.updateOn && element.on(modelCtrl.$options.updateOn, function (ev) {
                            modelCtrl.$$debounceViewValueCommit(ev && ev.type)
                        }), element.on("blur", function (ev) {
                            modelCtrl.$touched || ($rootScope.$$phase ? scope.$evalAsync(modelCtrl.$setTouched) : scope.$apply(modelCtrl.$setTouched))
                        })
                    }
                }
            }
        }
    }], DEFAULT_REGEXP = /(\s+|^)default(\s+|$)/, ngModelOptionsDirective = function () {
        return {
            restrict: "A", controller: ["$scope", "$attrs", function ($scope, $attrs) {
                var that = this;
                this.$options = copy($scope.$eval($attrs.ngModelOptions)), isDefined(this.$options.updateOn) ? (this.$options.updateOnDefault = !1, this.$options.updateOn = trim(this.$options.updateOn.replace(DEFAULT_REGEXP, function () {
                    return that.$options.updateOnDefault = !0, " "
                }))) : this.$options.updateOnDefault = !0
            }]
        }
    }, ngNonBindableDirective = ngDirective({
        terminal: !0,
        priority: 1e3
    }), ngOptionsMinErr = minErr("ngOptions"), NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, ngOptionsDirective = ["$compile", "$parse", function ($compile, $parse) {
        function parseOptionsExpression(optionsExp, selectElement, scope) {
            function Option(selectValue, viewValue, label, group, disabled) {
                this.selectValue = selectValue, this.viewValue = viewValue, this.label = label, this.group = group, this.disabled = disabled
            }

            function getOptionValuesKeys(optionValues) {
                var optionValuesKeys;
                if (!keyName && isArrayLike(optionValues))optionValuesKeys = optionValues; else {
                    optionValuesKeys = [];
                    for (var itemKey in optionValues)optionValues.hasOwnProperty(itemKey) && "$" !== itemKey.charAt(0) && optionValuesKeys.push(itemKey)
                }
                return optionValuesKeys
            }

            var match = optionsExp.match(NG_OPTIONS_REGEXP);
            if (!match)throw ngOptionsMinErr("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", optionsExp, startingTag(selectElement));
            var valueName = match[5] || match[7], keyName = match[6], selectAs = / as /.test(match[0]) && match[1], trackBy = match[9], valueFn = $parse(match[2] ? match[1] : valueName), selectAsFn = selectAs && $parse(selectAs), viewValueFn = selectAsFn || valueFn, trackByFn = trackBy && $parse(trackBy), getTrackByValueFn = trackBy ? function (value, locals) {
                return trackByFn(scope, locals)
            } : function (value) {
                return hashKey(value)
            }, getTrackByValue = function (value, key) {
                return getTrackByValueFn(value, getLocals(value, key))
            }, displayFn = $parse(match[2] || match[1]), groupByFn = $parse(match[3] || ""), disableWhenFn = $parse(match[4] || ""), valuesFn = $parse(match[8]), locals = {}, getLocals = keyName ? function (value, key) {
                return locals[keyName] = key, locals[valueName] = value, locals
            } : function (value) {
                return locals[valueName] = value, locals
            };
            return {
                trackBy: trackBy,
                getTrackByValue: getTrackByValue,
                getWatchables: $parse(valuesFn, function (optionValues) {
                    var watchedArray = [];
                    optionValues = optionValues || [];
                    for (var optionValuesKeys = getOptionValuesKeys(optionValues), optionValuesLength = optionValuesKeys.length, index = 0; optionValuesLength > index; index++) {
                        var key = optionValues === optionValuesKeys ? index : optionValuesKeys[index], locals = (optionValues[key], getLocals(optionValues[key], key)), selectValue = getTrackByValueFn(optionValues[key], locals);
                        if (watchedArray.push(selectValue), match[2] || match[1]) {
                            var label = displayFn(scope, locals);
                            watchedArray.push(label)
                        }
                        if (match[4]) {
                            var disableWhen = disableWhenFn(scope, locals);
                            watchedArray.push(disableWhen)
                        }
                    }
                    return watchedArray
                }),
                getOptions: function () {
                    for (var optionItems = [], selectValueMap = {}, optionValues = valuesFn(scope) || [], optionValuesKeys = getOptionValuesKeys(optionValues), optionValuesLength = optionValuesKeys.length, index = 0; optionValuesLength > index; index++) {
                        var key = optionValues === optionValuesKeys ? index : optionValuesKeys[index], value = optionValues[key], locals = getLocals(value, key), viewValue = viewValueFn(scope, locals), selectValue = getTrackByValueFn(viewValue, locals), label = displayFn(scope, locals), group = groupByFn(scope, locals), disabled = disableWhenFn(scope, locals), optionItem = new Option(selectValue, viewValue, label, group, disabled);
                        optionItems.push(optionItem), selectValueMap[selectValue] = optionItem
                    }
                    return {
                        items: optionItems,
                        selectValueMap: selectValueMap,
                        getOptionFromViewValue: function (value) {
                            return selectValueMap[getTrackByValue(value)]
                        },
                        getViewValueFromOption: function (option) {
                            return trackBy ? angular.copy(option.viewValue) : option.viewValue
                        }
                    }
                }
            }
        }

        function ngOptionsPostLink(scope, selectElement, attr, ctrls) {
            function updateOptionElement(option, element) {
                option.element = element, element.disabled = option.disabled, option.label !== element.label && (element.label = option.label, element.textContent = option.label), option.value !== element.value && (element.value = option.selectValue)
            }

            function addOrReuseElement(parent, current, type, templateElement) {
                var element;
                return current && lowercase(current.nodeName) === type ? element = current : (element = templateElement.cloneNode(!1), current ? parent.insertBefore(element, current) : parent.appendChild(element)), element
            }

            function removeExcessElements(current) {
                for (var next; current;)next = current.nextSibling, jqLiteRemove(current), current = next
            }

            function skipEmptyAndUnknownOptions(current) {
                var emptyOption_ = emptyOption && emptyOption[0], unknownOption_ = unknownOption && unknownOption[0];
                if (emptyOption_ || unknownOption_)for (; current && (current === emptyOption_ || current === unknownOption_ || current.nodeType === NODE_TYPE_COMMENT || "option" === nodeName_(current) && "" === current.value);)current = current.nextSibling;
                return current
            }

            function updateOptions() {
                var previousValue = options && selectCtrl.readValue();
                options = ngOptions.getOptions();
                var groupMap = {}, currentElement = selectElement[0].firstChild;
                if (providedEmptyOption && selectElement.prepend(emptyOption), currentElement = skipEmptyAndUnknownOptions(currentElement), options.items.forEach(function (option) {
                        var group, groupElement, optionElement;
                        isDefined(option.group) ? (group = groupMap[option.group], group || (groupElement = addOrReuseElement(selectElement[0], currentElement, "optgroup", optGroupTemplate), currentElement = groupElement.nextSibling, groupElement.label = option.group, group = groupMap[option.group] = {
                            groupElement: groupElement,
                            currentOptionElement: groupElement.firstChild
                        }), optionElement = addOrReuseElement(group.groupElement, group.currentOptionElement, "option", optionTemplate), updateOptionElement(option, optionElement), group.currentOptionElement = optionElement.nextSibling) : (optionElement = addOrReuseElement(selectElement[0], currentElement, "option", optionTemplate), updateOptionElement(option, optionElement), currentElement = optionElement.nextSibling)
                    }), Object.keys(groupMap).forEach(function (key) {
                        removeExcessElements(groupMap[key].currentOptionElement)
                    }), removeExcessElements(currentElement), ngModelCtrl.$render(), !ngModelCtrl.$isEmpty(previousValue)) {
                    var nextValue = selectCtrl.readValue(), isNotPrimitive = ngOptions.trackBy || multiple;
                    (isNotPrimitive ? equals(previousValue, nextValue) : previousValue === nextValue) || (ngModelCtrl.$setViewValue(nextValue), ngModelCtrl.$render())
                }
            }

            for (var emptyOption, selectCtrl = ctrls[0], ngModelCtrl = ctrls[1], multiple = attr.multiple, i = 0, children = selectElement.children(), ii = children.length; ii > i; i++)if ("" === children[i].value) {
                emptyOption = children.eq(i);
                break
            }
            var providedEmptyOption = !!emptyOption, unknownOption = jqLite(optionTemplate.cloneNode(!1));
            unknownOption.val("?");
            var options, ngOptions = parseOptionsExpression(attr.ngOptions, selectElement, scope), renderEmptyOption = function () {
                providedEmptyOption || selectElement.prepend(emptyOption), selectElement.val(""), emptyOption.prop("selected", !0), emptyOption.attr("selected", !0)
            }, removeEmptyOption = function () {
                providedEmptyOption || emptyOption.remove()
            }, renderUnknownOption = function () {
                selectElement.prepend(unknownOption), selectElement.val("?"), unknownOption.prop("selected", !0), unknownOption.attr("selected", !0)
            }, removeUnknownOption = function () {
                unknownOption.remove()
            };
            multiple ? (ngModelCtrl.$isEmpty = function (value) {
                return !value || 0 === value.length
            }, selectCtrl.writeValue = function (value) {
                options.items.forEach(function (option) {
                    option.element.selected = !1
                }), value && value.forEach(function (item) {
                    var option = options.getOptionFromViewValue(item);
                    option && !option.disabled && (option.element.selected = !0)
                })
            }, selectCtrl.readValue = function () {
                var selectedValues = selectElement.val() || [], selections = [];
                return forEach(selectedValues, function (value) {
                    var option = options.selectValueMap[value];
                    option && !option.disabled && selections.push(options.getViewValueFromOption(option))
                }), selections
            }, ngOptions.trackBy && scope.$watchCollection(function () {
                return isArray(ngModelCtrl.$viewValue) ? ngModelCtrl.$viewValue.map(function (value) {
                    return ngOptions.getTrackByValue(value)
                }) : void 0
            }, function () {
                ngModelCtrl.$render()
            })) : (selectCtrl.writeValue = function (value) {
                var option = options.getOptionFromViewValue(value);
                option && !option.disabled ? selectElement[0].value !== option.selectValue && (removeUnknownOption(), removeEmptyOption(), selectElement[0].value = option.selectValue, option.element.selected = !0, option.element.setAttribute("selected", "selected")) : null === value || providedEmptyOption ? (removeUnknownOption(), renderEmptyOption()) : (removeEmptyOption(), renderUnknownOption())
            }, selectCtrl.readValue = function () {
                var selectedOption = options.selectValueMap[selectElement.val()];
                return selectedOption && !selectedOption.disabled ? (removeEmptyOption(), removeUnknownOption(), options.getViewValueFromOption(selectedOption)) : null
            }, ngOptions.trackBy && scope.$watch(function () {
                return ngOptions.getTrackByValue(ngModelCtrl.$viewValue)
            }, function () {
                ngModelCtrl.$render()
            })), providedEmptyOption ? (emptyOption.remove(), $compile(emptyOption)(scope), emptyOption.removeClass("ng-scope")) : emptyOption = jqLite(optionTemplate.cloneNode(!1)), updateOptions(), scope.$watchCollection(ngOptions.getWatchables, updateOptions)
        }

        var optionTemplate = document.createElement("option"), optGroupTemplate = document.createElement("optgroup");
        return {
            restrict: "A",
            terminal: !0,
            require: ["select", "ngModel"],
            link: {
                pre: function (scope, selectElement, attr, ctrls) {
                    ctrls[0].registerOption = noop
                }, post: ngOptionsPostLink
            }
        }
    }], ngPluralizeDirective = ["$locale", "$interpolate", "$log", function ($locale, $interpolate, $log) {
        var BRACE = /{}/g, IS_WHEN = /^when(Minus)?(.+)$/;
        return {
            link: function (scope, element, attr) {
                function updateElementText(newText) {
                    element.text(newText || "")
                }

                var lastCount, numberExp = attr.count, whenExp = attr.$attr.when && element.attr(attr.$attr.when), offset = attr.offset || 0, whens = scope.$eval(whenExp) || {}, whensExpFns = {}, startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), braceReplacement = startSymbol + numberExp + "-" + offset + endSymbol, watchRemover = angular.noop;
                forEach(attr, function (expression, attributeName) {
                    var tmpMatch = IS_WHEN.exec(attributeName);
                    if (tmpMatch) {
                        var whenKey = (tmpMatch[1] ? "-" : "") + lowercase(tmpMatch[2]);
                        whens[whenKey] = element.attr(attr.$attr[attributeName])
                    }
                }), forEach(whens, function (expression, key) {
                    whensExpFns[key] = $interpolate(expression.replace(BRACE, braceReplacement))
                }), scope.$watch(numberExp, function (newVal) {
                    var count = parseFloat(newVal), countIsNaN = isNaN(count);
                    if (countIsNaN || count in whens || (count = $locale.pluralCat(count - offset)), count !== lastCount && !(countIsNaN && isNumber(lastCount) && isNaN(lastCount))) {
                        watchRemover();
                        var whenExpFn = whensExpFns[count];
                        isUndefined(whenExpFn) ? (null != newVal && $log.debug("ngPluralize: no rule defined for '" + count + "' in " + whenExp), watchRemover = noop, updateElementText()) : watchRemover = scope.$watch(whenExpFn, updateElementText), lastCount = count
                    }
                })
            }
        }
    }], ngRepeatDirective = ["$parse", "$animate", function ($parse, $animate) {
        var NG_REMOVED = "$$NG_REMOVED", ngRepeatMinErr = minErr("ngRepeat"), updateScope = function (scope, index, valueIdentifier, value, keyIdentifier, key, arrayLength) {
            scope[valueIdentifier] = value, keyIdentifier && (scope[keyIdentifier] = key), scope.$index = index, scope.$first = 0 === index, scope.$last = index === arrayLength - 1, scope.$middle = !(scope.$first || scope.$last), scope.$odd = !(scope.$even = 0 === (1 & index))
        }, getBlockStart = function (block) {
            return block.clone[0]
        }, getBlockEnd = function (block) {
            return block.clone[block.clone.length - 1]
        };
        return {
            restrict: "A",
            multiElement: !0,
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            $$tlb: !0,
            compile: function ($element, $attr) {
                var expression = $attr.ngRepeat, ngRepeatEndComment = document.createComment(" end ngRepeat: " + expression + " "), match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                if (!match)throw ngRepeatMinErr("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", expression);
                var lhs = match[1], rhs = match[2], aliasAs = match[3], trackByExp = match[4];
                if (match = lhs.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/), !match)throw ngRepeatMinErr("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", lhs);
                var valueIdentifier = match[3] || match[1], keyIdentifier = match[2];
                if (aliasAs && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(aliasAs) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(aliasAs)))throw ngRepeatMinErr("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", aliasAs);
                var trackByExpGetter, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn, hashFnLocals = {$id: hashKey};
                return trackByExp ? trackByExpGetter = $parse(trackByExp) : (trackByIdArrayFn = function (key, value) {
                    return hashKey(value)
                }, trackByIdObjFn = function (key) {
                    return key
                }), function ($scope, $element, $attr, ctrl, $transclude) {
                    trackByExpGetter && (trackByIdExpFn = function (key, value, index) {
                        return keyIdentifier && (hashFnLocals[keyIdentifier] = key), hashFnLocals[valueIdentifier] = value, hashFnLocals.$index = index, trackByExpGetter($scope, hashFnLocals)
                    });
                    var lastBlockMap = createMap();
                    $scope.$watchCollection(rhs, function (collection) {
                        var index, length, nextNode, collectionLength, key, value, trackById, trackByIdFn, collectionKeys, block, nextBlockOrder, elementsToRemove, previousNode = $element[0], nextBlockMap = createMap();
                        if (aliasAs && ($scope[aliasAs] = collection), isArrayLike(collection))collectionKeys = collection, trackByIdFn = trackByIdExpFn || trackByIdArrayFn; else {
                            trackByIdFn = trackByIdExpFn || trackByIdObjFn, collectionKeys = [];
                            for (var itemKey in collection)hasOwnProperty.call(collection, itemKey) && "$" !== itemKey.charAt(0) && collectionKeys.push(itemKey)
                        }
                        for (collectionLength = collectionKeys.length, nextBlockOrder = new Array(collectionLength), index = 0; collectionLength > index; index++)if (key = collection === collectionKeys ? index : collectionKeys[index], value = collection[key], trackById = trackByIdFn(key, value, index), lastBlockMap[trackById])block = lastBlockMap[trackById], delete lastBlockMap[trackById], nextBlockMap[trackById] = block, nextBlockOrder[index] = block; else {
                            if (nextBlockMap[trackById])throw forEach(nextBlockOrder, function (block) {
                                block && block.scope && (lastBlockMap[block.id] = block)
                            }), ngRepeatMinErr("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", expression, trackById, value);
                            nextBlockOrder[index] = {
                                id: trackById,
                                scope: undefined,
                                clone: undefined
                            }, nextBlockMap[trackById] = !0
                        }
                        for (var blockKey in lastBlockMap) {
                            if (block = lastBlockMap[blockKey], elementsToRemove = getBlockNodes(block.clone), $animate.leave(elementsToRemove), elementsToRemove[0].parentNode)for (index = 0, length = elementsToRemove.length; length > index; index++)elementsToRemove[index][NG_REMOVED] = !0;
                            block.scope.$destroy()
                        }
                        for (index = 0; collectionLength > index; index++)if (key = collection === collectionKeys ? index : collectionKeys[index], value = collection[key], block = nextBlockOrder[index], block.scope) {
                            nextNode = previousNode;
                            do nextNode = nextNode.nextSibling; while (nextNode && nextNode[NG_REMOVED]);
                            getBlockStart(block) != nextNode && $animate.move(getBlockNodes(block.clone), null, jqLite(previousNode)), previousNode = getBlockEnd(block), updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength)
                        } else $transclude(function (clone, scope) {
                            block.scope = scope;
                            var endNode = ngRepeatEndComment.cloneNode(!1);
                            clone[clone.length++] = endNode, $animate.enter(clone, null, jqLite(previousNode)), previousNode = endNode, block.clone = clone, nextBlockMap[block.id] = block, updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength)
                        });
                        lastBlockMap = nextBlockMap
                    })
                }
            }
        }
    }], NG_HIDE_CLASS = "ng-hide", NG_HIDE_IN_PROGRESS_CLASS = "ng-hide-animate", ngShowDirective = ["$animate", function ($animate) {
        return {
            restrict: "A", multiElement: !0, link: function (scope, element, attr) {
                scope.$watch(attr.ngShow, function (value) {
                    $animate[value ? "removeClass" : "addClass"](element, NG_HIDE_CLASS, {tempClasses: NG_HIDE_IN_PROGRESS_CLASS})
                })
            }
        }
    }], ngHideDirective = ["$animate", function ($animate) {
        return {
            restrict: "A", multiElement: !0, link: function (scope, element, attr) {
                scope.$watch(attr.ngHide, function (value) {
                    $animate[value ? "addClass" : "removeClass"](element, NG_HIDE_CLASS, {tempClasses: NG_HIDE_IN_PROGRESS_CLASS})
                })
            }
        }
    }], ngStyleDirective = ngDirective(function (scope, element, attr) {
        scope.$watch(attr.ngStyle, function (newStyles, oldStyles) {
            oldStyles && newStyles !== oldStyles && forEach(oldStyles, function (val, style) {
                element.css(style, "")
            }), newStyles && element.css(newStyles)
        }, !0)
    }), ngSwitchDirective = ["$animate", function ($animate) {
        return {
            require: "ngSwitch", controller: ["$scope", function () {
                this.cases = {}
            }], link: function (scope, element, attr, ngSwitchController) {
                var watchExpr = attr.ngSwitch || attr.on, selectedTranscludes = [], selectedElements = [], previousLeaveAnimations = [], selectedScopes = [], spliceFactory = function (array, index) {
                    return function () {
                        array.splice(index, 1)
                    }
                };
                scope.$watch(watchExpr, function (value) {
                    var i, ii;
                    for (i = 0, ii = previousLeaveAnimations.length; ii > i; ++i)$animate.cancel(previousLeaveAnimations[i]);
                    for (previousLeaveAnimations.length = 0, i = 0, ii = selectedScopes.length; ii > i; ++i) {
                        var selected = getBlockNodes(selectedElements[i].clone);
                        selectedScopes[i].$destroy();
                        var promise = previousLeaveAnimations[i] = $animate.leave(selected);
                        promise.then(spliceFactory(previousLeaveAnimations, i))
                    }
                    selectedElements.length = 0, selectedScopes.length = 0, (selectedTranscludes = ngSwitchController.cases["!" + value] || ngSwitchController.cases["?"]) && forEach(selectedTranscludes, function (selectedTransclude) {
                        selectedTransclude.transclude(function (caseElement, selectedScope) {
                            selectedScopes.push(selectedScope);
                            var anchor = selectedTransclude.element;
                            caseElement[caseElement.length++] = document.createComment(" end ngSwitchWhen: ");
                            var block = {clone: caseElement};
                            selectedElements.push(block), $animate.enter(caseElement, anchor.parent(), anchor)
                        })
                    })
                })
            }
        }
    }], ngSwitchWhenDirective = ngDirective({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function (scope, element, attrs, ctrl, $transclude) {
            ctrl.cases["!" + attrs.ngSwitchWhen] = ctrl.cases["!" + attrs.ngSwitchWhen] || [], ctrl.cases["!" + attrs.ngSwitchWhen].push({
                transclude: $transclude,
                element: element
            })
        }
    }), ngSwitchDefaultDirective = ngDirective({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function (scope, element, attr, ctrl, $transclude) {
            ctrl.cases["?"] = ctrl.cases["?"] || [], ctrl.cases["?"].push({transclude: $transclude, element: element})
        }
    }), ngTranscludeMinErr = minErr("ngTransclude"), ngTranscludeDirective = ngDirective({
        restrict: "EAC",
        link: function ($scope, $element, $attrs, controller, $transclude) {
            function ngTranscludeCloneAttachFn(clone) {
                clone.length && ($element.empty(), $element.append(clone))
            }

            if ($attrs.ngTransclude === $attrs.$attr.ngTransclude && ($attrs.ngTransclude = ""), !$transclude)throw ngTranscludeMinErr("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", startingTag($element));
            var slotName = $attrs.ngTransclude || $attrs.ngTranscludeSlot;
            $transclude(ngTranscludeCloneAttachFn, null, slotName)
        }
    }), scriptDirective = ["$templateCache", function ($templateCache) {
        return {
            restrict: "E", terminal: !0, compile: function (element, attr) {
                if ("text/ng-template" == attr.type) {
                    var templateUrl = attr.id, text = element[0].text;
                    $templateCache.put(templateUrl, text)
                }
            }
        }
    }], noopNgModelController = {
        $setViewValue: noop,
        $render: noop
    }, SelectController = ["$element", "$scope", "$attrs", function ($element, $scope, $attrs) {
        var self = this, optionsMap = new HashMap;
        self.ngModelCtrl = noopNgModelController, self.unknownOption = jqLite(document.createElement("option")), self.renderUnknownOption = function (val) {
            var unknownVal = "? " + hashKey(val) + " ?";
            self.unknownOption.val(unknownVal), $element.prepend(self.unknownOption), $element.val(unknownVal)
        }, $scope.$on("$destroy", function () {
            self.renderUnknownOption = noop
        }), self.removeUnknownOption = function () {
            self.unknownOption.parent() && self.unknownOption.remove()
        }, self.readValue = function () {
            return self.removeUnknownOption(), $element.val()
        }, self.writeValue = function (value) {
            self.hasOption(value) ? (self.removeUnknownOption(), $element.val(value), "" === value && self.emptyOption.prop("selected", !0)) : null == value && self.emptyOption ? (self.removeUnknownOption(), $element.val("")) : self.renderUnknownOption(value)
        }, self.addOption = function (value, element) {
            if (element[0].nodeType !== NODE_TYPE_COMMENT) {
                assertNotHasOwnProperty(value, '"option value"'), "" === value && (self.emptyOption = element);
                var count = optionsMap.get(value) || 0;
                optionsMap.put(value, count + 1), self.ngModelCtrl.$render(), chromeHack(element)
            }
        }, self.removeOption = function (value) {
            var count = optionsMap.get(value);
            count && (1 === count ? (optionsMap.remove(value), "" === value && (self.emptyOption = undefined)) : optionsMap.put(value, count - 1))
        }, self.hasOption = function (value) {
            return !!optionsMap.get(value)
        }, self.registerOption = function (optionScope, optionElement, optionAttrs, interpolateValueFn, interpolateTextFn) {
            if (interpolateValueFn) {
                var oldVal;
                optionAttrs.$observe("value", function (newVal) {
                    isDefined(oldVal) && self.removeOption(oldVal), oldVal = newVal, self.addOption(newVal, optionElement)
                })
            } else interpolateTextFn ? optionScope.$watch(interpolateTextFn, function (newVal, oldVal) {
                optionAttrs.$set("value", newVal), oldVal !== newVal && self.removeOption(oldVal), self.addOption(newVal, optionElement)
            }) : self.addOption(optionAttrs.value, optionElement);
            optionElement.on("$destroy", function () {
                self.removeOption(optionAttrs.value), self.ngModelCtrl.$render()
            })
        }
    }], selectDirective = function () {
        function selectPreLink(scope, element, attr, ctrls) {
            var ngModelCtrl = ctrls[1];
            if (ngModelCtrl) {
                var selectCtrl = ctrls[0];
                if (selectCtrl.ngModelCtrl = ngModelCtrl, element.on("change", function () {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(selectCtrl.readValue())
                        })
                    }), attr.multiple) {
                    selectCtrl.readValue = function () {
                        var array = [];
                        return forEach(element.find("option"), function (option) {
                            option.selected && array.push(option.value)
                        }), array
                    }, selectCtrl.writeValue = function (value) {
                        var items = new HashMap(value);
                        forEach(element.find("option"), function (option) {
                            option.selected = isDefined(items.get(option.value))
                        })
                    };
                    var lastView, lastViewRef = NaN;
                    scope.$watch(function () {
                        lastViewRef !== ngModelCtrl.$viewValue || equals(lastView, ngModelCtrl.$viewValue) || (lastView = shallowCopy(ngModelCtrl.$viewValue), ngModelCtrl.$render()), lastViewRef = ngModelCtrl.$viewValue
                    }), ngModelCtrl.$isEmpty = function (value) {
                        return !value || 0 === value.length
                    }
                }
            }
        }

        function selectPostLink(scope, element, attrs, ctrls) {
            var ngModelCtrl = ctrls[1];
            if (ngModelCtrl) {
                var selectCtrl = ctrls[0];
                ngModelCtrl.$render = function () {
                    selectCtrl.writeValue(ngModelCtrl.$viewValue)
                }
            }
        }

        return {
            restrict: "E",
            require: ["select", "?ngModel"],
            controller: SelectController,
            priority: 1,
            link: {pre: selectPreLink, post: selectPostLink}
        }
    }, optionDirective = ["$interpolate", function ($interpolate) {
        return {
            restrict: "E", priority: 100, compile: function (element, attr) {
                if (isDefined(attr.value))var interpolateValueFn = $interpolate(attr.value, !0); else {
                    var interpolateTextFn = $interpolate(element.text(), !0);
                    interpolateTextFn || attr.$set("value", element.text())
                }
                return function (scope, element, attr) {
                    var selectCtrlName = "$selectController", parent = element.parent(), selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName);
                    selectCtrl && selectCtrl.registerOption(scope, element, attr, interpolateValueFn, interpolateTextFn)
                }
            }
        }
    }], styleDirective = valueFn({restrict: "E", terminal: !1}), requiredDirective = function () {
        return {
            restrict: "A", require: "?ngModel", link: function (scope, elm, attr, ctrl) {
                ctrl && (attr.required = !0, ctrl.$validators.required = function (modelValue, viewValue) {
                    return !attr.required || !ctrl.$isEmpty(viewValue)
                }, attr.$observe("required", function () {
                    ctrl.$validate()
                }))
            }
        }
    }, patternDirective = function () {
        return {
            restrict: "A", require: "?ngModel", link: function (scope, elm, attr, ctrl) {
                if (ctrl) {
                    var regexp, patternExp = attr.ngPattern || attr.pattern;
                    attr.$observe("pattern", function (regex) {
                        if (isString(regex) && regex.length > 0 && (regex = new RegExp("^" + regex + "$")), regex && !regex.test)throw minErr("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", patternExp, regex, startingTag(elm));
                        regexp = regex || undefined, ctrl.$validate()
                    }), ctrl.$validators.pattern = function (modelValue, viewValue) {
                        return ctrl.$isEmpty(viewValue) || isUndefined(regexp) || regexp.test(viewValue)
                    }
                }
            }
        }
    }, maxlengthDirective = function () {
        return {
            restrict: "A", require: "?ngModel", link: function (scope, elm, attr, ctrl) {
                if (ctrl) {
                    var maxlength = -1;
                    attr.$observe("maxlength", function (value) {
                        var intVal = toInt(value);
                        maxlength = isNaN(intVal) ? -1 : intVal, ctrl.$validate()
                    }), ctrl.$validators.maxlength = function (modelValue, viewValue) {
                        return 0 > maxlength || ctrl.$isEmpty(viewValue) || viewValue.length <= maxlength
                    }
                }
            }
        }
    }, minlengthDirective = function () {
        return {
            restrict: "A", require: "?ngModel", link: function (scope, elm, attr, ctrl) {
                if (ctrl) {
                    var minlength = 0;
                    attr.$observe("minlength", function (value) {
                        minlength = toInt(value) || 0, ctrl.$validate()
                    }), ctrl.$validators.minlength = function (modelValue, viewValue) {
                        return ctrl.$isEmpty(viewValue) || viewValue.length >= minlength
                    }
                }
            }
        }
    };
    return window.angular.bootstrap ? void console.log("WARNING: Tried to load angular more than once.") : (bindJQuery(), publishExternalAPI(angular), angular.module("ngLocale", [], ["$provide", function ($provide) {
        function getDecimals(n) {
            n += "";
            var i = n.indexOf(".");
            return -1 == i ? 0 : n.length - i - 1
        }

        function getVF(n, opt_precision) {
            var v = opt_precision;
            undefined === v && (v = Math.min(getDecimals(n), 3));
            var base = Math.pow(10, v), f = (n * base | 0) % base;
            return {v: v, f: f}
        }

        var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
        $provide.value("$locale", {
            DATETIME_FORMATS: {
                AMPMS: ["AM", "PM"],
                DAY: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                ERANAMES: ["Before Christ", "Anno Domini"],
                ERAS: ["BC", "AD"],
                FIRSTDAYOFWEEK: 6,
                MONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                SHORTDAY: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                SHORTMONTH: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                STANDALONEMONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                WEEKENDRANGE: [5, 6],
                fullDate: "EEEE, MMMM d, y",
                longDate: "MMMM d, y",
                medium: "MMM d, y h:mm:ss a",
                mediumDate: "MMM d, y",
                mediumTime: "h:mm:ss a",
                "short": "M/d/yy h:mm a",
                shortDate: "M/d/yy",
                shortTime: "h:mm a"
            },
            NUMBER_FORMATS: {
                CURRENCY_SYM: "$",
                DECIMAL_SEP: ".",
                GROUP_SEP: ",",
                PATTERNS: [{
                    gSize: 3,
                    lgSize: 3,
                    maxFrac: 3,
                    minFrac: 0,
                    minInt: 1,
                    negPre: "-",
                    negSuf: "",
                    posPre: "",
                    posSuf: ""
                }, {
                    gSize: 3,
                    lgSize: 3,
                    maxFrac: 2,
                    minFrac: 2,
                    minInt: 1,
                    negPre: "-¤",
                    negSuf: "",
                    posPre: "¤",
                    posSuf: ""
                }]
            },
            id: "en-us",
            localeID: "en_US",
            pluralCat: function (n, opt_precision) {
                var i = 0 | n, vf = getVF(n, opt_precision);
                return 1 == i && 0 == vf.v ? PLURAL_CATEGORY.ONE : PLURAL_CATEGORY.OTHER
            }
        })
    }]), void jqLite(document).ready(function () {
        angularInit(document, bootstrap)
    }))
}(window, document), !window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>'), function () {
    "use strict";
    function lib$rsvp$utils$$objectOrFunction(x) {
        return "function" == typeof x || "object" == typeof x && null !== x
    }

    function lib$rsvp$utils$$isFunction(x) {
        return "function" == typeof x
    }

    function lib$rsvp$utils$$isMaybeThenable(x) {
        return "object" == typeof x && null !== x
    }

    function lib$rsvp$utils$$F() {
    }

    function lib$rsvp$events$$indexOf(callbacks, callback) {
        for (var i = 0, l = callbacks.length; l > i; i++)if (callbacks[i] === callback)return i;
        return -1
    }

    function lib$rsvp$events$$callbacksFor(object) {
        var callbacks = object._promiseCallbacks;
        return callbacks || (callbacks = object._promiseCallbacks = {}), callbacks
    }

    function lib$rsvp$config$$configure(name, value) {
        return "onerror" === name ? void lib$rsvp$config$$config.on("error", value) : 2 !== arguments.length ? lib$rsvp$config$$config[name] : void(lib$rsvp$config$$config[name] = value)
    }

    function lib$rsvp$instrument$$scheduleFlush() {
        setTimeout(function () {
            for (var entry, i = 0; i < lib$rsvp$instrument$$queue.length; i++) {
                entry = lib$rsvp$instrument$$queue[i];
                var payload = entry.payload;
                payload.guid = payload.key + payload.id, payload.childGuid = payload.key + payload.childId, payload.error && (payload.stack = payload.error.stack), lib$rsvp$config$$config.trigger(entry.name, entry.payload)
            }
            lib$rsvp$instrument$$queue.length = 0
        }, 50)
    }

    function lib$rsvp$instrument$$instrument(eventName, promise, child) {
        1 === lib$rsvp$instrument$$queue.push({
            name: eventName,
            payload: {
                key: promise._guidKey,
                id: promise._id,
                eventName: eventName,
                detail: promise._result,
                childId: child && child._id,
                label: promise._label,
                timeStamp: lib$rsvp$utils$$now(),
                error: lib$rsvp$config$$config["instrument-with-stack"] ? new Error(promise._label) : null
            }
        }) && lib$rsvp$instrument$$scheduleFlush()
    }

    function lib$rsvp$$internal$$withOwnPromise() {
        return new TypeError("A promises callback cannot return that same promise.")
    }

    function lib$rsvp$$internal$$noop() {
    }

    function lib$rsvp$$internal$$getThen(promise) {
        try {
            return promise.then
        } catch (error) {
            return lib$rsvp$$internal$$GET_THEN_ERROR.error = error, lib$rsvp$$internal$$GET_THEN_ERROR
        }
    }

    function lib$rsvp$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
        try {
            then.call(value, fulfillmentHandler, rejectionHandler)
        } catch (e) {
            return e
        }
    }

    function lib$rsvp$$internal$$handleForeignThenable(promise, thenable, then) {
        lib$rsvp$config$$config.async(function (promise) {
            var sealed = !1, error = lib$rsvp$$internal$$tryThen(then, thenable, function (value) {
                sealed || (sealed = !0, thenable !== value ? lib$rsvp$$internal$$resolve(promise, value) : lib$rsvp$$internal$$fulfill(promise, value))
            }, function (reason) {
                sealed || (sealed = !0, lib$rsvp$$internal$$reject(promise, reason))
            }, "Settle: " + (promise._label || " unknown promise"));
            !sealed && error && (sealed = !0, lib$rsvp$$internal$$reject(promise, error))
        }, promise)
    }

    function lib$rsvp$$internal$$handleOwnThenable(promise, thenable) {
        thenable._state === lib$rsvp$$internal$$FULFILLED ? lib$rsvp$$internal$$fulfill(promise, thenable._result) : thenable._state === lib$rsvp$$internal$$REJECTED ? (thenable._onError = null, lib$rsvp$$internal$$reject(promise, thenable._result)) : lib$rsvp$$internal$$subscribe(thenable, void 0, function (value) {
            thenable !== value ? lib$rsvp$$internal$$resolve(promise, value) : lib$rsvp$$internal$$fulfill(promise, value)
        }, function (reason) {
            lib$rsvp$$internal$$reject(promise, reason)
        })
    }

    function lib$rsvp$$internal$$handleMaybeThenable(promise, maybeThenable) {
        if (maybeThenable.constructor === promise.constructor)lib$rsvp$$internal$$handleOwnThenable(promise, maybeThenable); else {
            var then = lib$rsvp$$internal$$getThen(maybeThenable);
            then === lib$rsvp$$internal$$GET_THEN_ERROR ? lib$rsvp$$internal$$reject(promise, lib$rsvp$$internal$$GET_THEN_ERROR.error) : void 0 === then ? lib$rsvp$$internal$$fulfill(promise, maybeThenable) : lib$rsvp$utils$$isFunction(then) ? lib$rsvp$$internal$$handleForeignThenable(promise, maybeThenable, then) : lib$rsvp$$internal$$fulfill(promise, maybeThenable)
        }
    }

    function lib$rsvp$$internal$$resolve(promise, value) {
        promise === value ? lib$rsvp$$internal$$fulfill(promise, value) : lib$rsvp$utils$$objectOrFunction(value) ? lib$rsvp$$internal$$handleMaybeThenable(promise, value) : lib$rsvp$$internal$$fulfill(promise, value)
    }

    function lib$rsvp$$internal$$publishRejection(promise) {
        promise._onError && promise._onError(promise._result), lib$rsvp$$internal$$publish(promise)
    }

    function lib$rsvp$$internal$$fulfill(promise, value) {
        promise._state === lib$rsvp$$internal$$PENDING && (promise._result = value, promise._state = lib$rsvp$$internal$$FULFILLED, 0 === promise._subscribers.length ? lib$rsvp$config$$config.instrument && lib$rsvp$instrument$$default("fulfilled", promise) : lib$rsvp$config$$config.async(lib$rsvp$$internal$$publish, promise))
    }

    function lib$rsvp$$internal$$reject(promise, reason) {
        promise._state === lib$rsvp$$internal$$PENDING && (promise._state = lib$rsvp$$internal$$REJECTED, promise._result = reason, lib$rsvp$config$$config.async(lib$rsvp$$internal$$publishRejection, promise))
    }

    function lib$rsvp$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
        var subscribers = parent._subscribers, length = subscribers.length;
        parent._onError = null, subscribers[length] = child, subscribers[length + lib$rsvp$$internal$$FULFILLED] = onFulfillment, subscribers[length + lib$rsvp$$internal$$REJECTED] = onRejection, 0 === length && parent._state && lib$rsvp$config$$config.async(lib$rsvp$$internal$$publish, parent)
    }

    function lib$rsvp$$internal$$publish(promise) {
        var subscribers = promise._subscribers, settled = promise._state;
        if (lib$rsvp$config$$config.instrument && lib$rsvp$instrument$$default(settled === lib$rsvp$$internal$$FULFILLED ? "fulfilled" : "rejected", promise), 0 !== subscribers.length) {
            for (var child, callback, detail = promise._result, i = 0; i < subscribers.length; i += 3)child = subscribers[i], callback = subscribers[i + settled], child ? lib$rsvp$$internal$$invokeCallback(settled, child, callback, detail) : callback(detail);
            promise._subscribers.length = 0
        }
    }

    function lib$rsvp$$internal$$ErrorObject() {
        this.error = null
    }

    function lib$rsvp$$internal$$tryCatch(callback, detail) {
        try {
            return callback(detail)
        } catch (e) {
            return lib$rsvp$$internal$$TRY_CATCH_ERROR.error = e, lib$rsvp$$internal$$TRY_CATCH_ERROR
        }
    }

    function lib$rsvp$$internal$$invokeCallback(settled, promise, callback, detail) {
        var value, error, succeeded, failed, hasCallback = lib$rsvp$utils$$isFunction(callback);
        if (hasCallback) {
            if (value = lib$rsvp$$internal$$tryCatch(callback, detail), value === lib$rsvp$$internal$$TRY_CATCH_ERROR ? (failed = !0, error = value.error, value = null) : succeeded = !0, promise === value)return void lib$rsvp$$internal$$reject(promise, lib$rsvp$$internal$$withOwnPromise())
        } else value = detail, succeeded = !0;
        promise._state !== lib$rsvp$$internal$$PENDING || (hasCallback && succeeded ? lib$rsvp$$internal$$resolve(promise, value) : failed ? lib$rsvp$$internal$$reject(promise, error) : settled === lib$rsvp$$internal$$FULFILLED ? lib$rsvp$$internal$$fulfill(promise, value) : settled === lib$rsvp$$internal$$REJECTED && lib$rsvp$$internal$$reject(promise, value))
    }

    function lib$rsvp$$internal$$initializePromise(promise, resolver) {
        var resolved = !1;
        try {
            resolver(function (value) {
                resolved || (resolved = !0, lib$rsvp$$internal$$resolve(promise, value))
            }, function (reason) {
                resolved || (resolved = !0, lib$rsvp$$internal$$reject(promise, reason))
            })
        } catch (e) {
            lib$rsvp$$internal$$reject(promise, e)
        }
    }

    function lib$rsvp$enumerator$$makeSettledResult(state, position, value) {
        return state === lib$rsvp$$internal$$FULFILLED ? {state: "fulfilled", value: value} : {
            state: "rejected",
            reason: value
        }
    }

    function lib$rsvp$enumerator$$Enumerator(Constructor, input, abortOnReject, label) {
        var enumerator = this;
        enumerator._instanceConstructor = Constructor, enumerator.promise = new Constructor(lib$rsvp$$internal$$noop, label), enumerator._abortOnReject = abortOnReject, enumerator._validateInput(input) ? (enumerator._input = input, enumerator.length = input.length, enumerator._remaining = input.length, enumerator._init(), 0 === enumerator.length ? lib$rsvp$$internal$$fulfill(enumerator.promise, enumerator._result) : (enumerator.length = enumerator.length || 0, enumerator._enumerate(), 0 === enumerator._remaining && lib$rsvp$$internal$$fulfill(enumerator.promise, enumerator._result))) : lib$rsvp$$internal$$reject(enumerator.promise, enumerator._validationError())
    }

    function lib$rsvp$promise$all$$all(entries, label) {
        return new lib$rsvp$enumerator$$default(this, entries, !0, label).promise
    }

    function lib$rsvp$promise$race$$race(entries, label) {
        function onFulfillment(value) {
            lib$rsvp$$internal$$resolve(promise, value)
        }

        function onRejection(reason) {
            lib$rsvp$$internal$$reject(promise, reason)
        }

        var Constructor = this, promise = new Constructor(lib$rsvp$$internal$$noop, label);
        if (!lib$rsvp$utils$$isArray(entries))return lib$rsvp$$internal$$reject(promise, new TypeError("You must pass an array to race.")), promise;
        for (var length = entries.length, i = 0; promise._state === lib$rsvp$$internal$$PENDING && length > i; i++)lib$rsvp$$internal$$subscribe(Constructor.resolve(entries[i]), void 0, onFulfillment, onRejection);
        return promise
    }

    function lib$rsvp$promise$resolve$$resolve(object, label) {
        var Constructor = this;
        if (object && "object" == typeof object && object.constructor === Constructor)return object;
        var promise = new Constructor(lib$rsvp$$internal$$noop, label);
        return lib$rsvp$$internal$$resolve(promise, object), promise
    }

    function lib$rsvp$promise$reject$$reject(reason, label) {
        var Constructor = this, promise = new Constructor(lib$rsvp$$internal$$noop, label);
        return lib$rsvp$$internal$$reject(promise, reason), promise
    }

    function lib$rsvp$promise$$needsResolver() {
        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
    }

    function lib$rsvp$promise$$needsNew() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
    }

    function lib$rsvp$promise$$Promise(resolver, label) {
        var promise = this;
        promise._id = lib$rsvp$promise$$counter++, promise._label = label, promise._state = void 0, promise._result = void 0, promise._subscribers = [], lib$rsvp$config$$config.instrument && lib$rsvp$instrument$$default("created", promise), lib$rsvp$$internal$$noop !== resolver && (lib$rsvp$utils$$isFunction(resolver) || lib$rsvp$promise$$needsResolver(), promise instanceof lib$rsvp$promise$$Promise || lib$rsvp$promise$$needsNew(), lib$rsvp$$internal$$initializePromise(promise, resolver))
    }

    function lib$rsvp$all$settled$$AllSettled(Constructor, entries, label) {
        this._superConstructor(Constructor, entries, !1, label)
    }

    function lib$rsvp$all$settled$$allSettled(entries, label) {
        return new lib$rsvp$all$settled$$AllSettled(lib$rsvp$promise$$default, entries, label).promise
    }

    function lib$rsvp$all$$all(array, label) {
        return lib$rsvp$promise$$default.all(array, label)
    }

    function lib$rsvp$asap$$asap(callback, arg) {
        lib$rsvp$asap$$queue[lib$rsvp$asap$$len] = callback, lib$rsvp$asap$$queue[lib$rsvp$asap$$len + 1] = arg, lib$rsvp$asap$$len += 2, 2 === lib$rsvp$asap$$len && lib$rsvp$asap$$scheduleFlush()
    }

    function lib$rsvp$asap$$useNextTick() {
        var nextTick = process.nextTick, version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
        return Array.isArray(version) && "0" === version[1] && "10" === version[2] && (nextTick = setImmediate), function () {
            nextTick(lib$rsvp$asap$$flush)
        }
    }

    function lib$rsvp$asap$$useVertxTimer() {
        return function () {
            lib$rsvp$asap$$vertxNext(lib$rsvp$asap$$flush)
        }
    }

    function lib$rsvp$asap$$useMutationObserver() {
        var iterations = 0, observer = new lib$rsvp$asap$$BrowserMutationObserver(lib$rsvp$asap$$flush), node = document.createTextNode("");
        return observer.observe(node, {characterData: !0}), function () {
            node.data = iterations = ++iterations % 2
        }
    }

    function lib$rsvp$asap$$useMessageChannel() {
        var channel = new MessageChannel;
        return channel.port1.onmessage = lib$rsvp$asap$$flush, function () {
            channel.port2.postMessage(0)
        }
    }

    function lib$rsvp$asap$$useSetTimeout() {
        return function () {
            setTimeout(lib$rsvp$asap$$flush, 1)
        }
    }

    function lib$rsvp$asap$$flush() {
        for (var i = 0; lib$rsvp$asap$$len > i; i += 2) {
            var callback = lib$rsvp$asap$$queue[i], arg = lib$rsvp$asap$$queue[i + 1];
            callback(arg), lib$rsvp$asap$$queue[i] = void 0, lib$rsvp$asap$$queue[i + 1] = void 0
        }
        lib$rsvp$asap$$len = 0
    }

    function lib$rsvp$asap$$attemptVertex() {
        try {
            var r = require, vertx = r("vertx");
            return lib$rsvp$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext, lib$rsvp$asap$$useVertxTimer()
        } catch (e) {
            return lib$rsvp$asap$$useSetTimeout()
        }
    }

    function lib$rsvp$defer$$defer(label) {
        var deferred = {};
        return deferred.promise = new lib$rsvp$promise$$default(function (resolve, reject) {
            deferred.resolve = resolve, deferred.reject = reject
        }, label), deferred
    }

    function lib$rsvp$filter$$filter(promises, filterFn, label) {
        return lib$rsvp$promise$$default.all(promises, label).then(function (values) {
            if (!lib$rsvp$utils$$isFunction(filterFn))throw new TypeError("You must pass a function as filter's second argument.");
            for (var length = values.length, filtered = new Array(length), i = 0; length > i; i++)filtered[i] = filterFn(values[i]);
            return lib$rsvp$promise$$default.all(filtered, label).then(function (filtered) {
                for (var results = new Array(length), newLength = 0, i = 0; length > i; i++)filtered[i] && (results[newLength] = values[i], newLength++);
                return results.length = newLength, results
            })
        })
    }

    function lib$rsvp$promise$hash$$PromiseHash(Constructor, object, label) {
        this._superConstructor(Constructor, object, !0, label)
    }

    function lib$rsvp$hash$settled$$HashSettled(Constructor, object, label) {
        this._superConstructor(Constructor, object, !1, label)
    }

    function lib$rsvp$hash$settled$$hashSettled(object, label) {
        return new lib$rsvp$hash$settled$$HashSettled(lib$rsvp$promise$$default, object, label).promise
    }

    function lib$rsvp$hash$$hash(object, label) {
        return new lib$rsvp$promise$hash$$default(lib$rsvp$promise$$default, object, label).promise
    }

    function lib$rsvp$map$$map(promises, mapFn, label) {
        return lib$rsvp$promise$$default.all(promises, label).then(function (values) {
            if (!lib$rsvp$utils$$isFunction(mapFn))throw new TypeError("You must pass a function as map's second argument.");
            for (var length = values.length, results = new Array(length), i = 0; length > i; i++)results[i] = mapFn(values[i]);
            return lib$rsvp$promise$$default.all(results, label)
        })
    }

    function lib$rsvp$node$$Result() {
        this.value = void 0
    }

    function lib$rsvp$node$$getThen(obj) {
        try {
            return obj.then
        } catch (error) {
            return lib$rsvp$node$$ERROR.value = error, lib$rsvp$node$$ERROR
        }
    }

    function lib$rsvp$node$$tryApply(f, s, a) {
        try {
            f.apply(s, a)
        } catch (error) {
            return lib$rsvp$node$$ERROR.value = error, lib$rsvp$node$$ERROR
        }
    }

    function lib$rsvp$node$$makeObject(_, argumentNames) {
        for (var name, i, obj = {}, length = _.length, args = new Array(length), x = 0; length > x; x++)args[x] = _[x];
        for (i = 0; i < argumentNames.length; i++)name = argumentNames[i], obj[name] = args[i + 1];
        return obj
    }

    function lib$rsvp$node$$arrayResult(_) {
        for (var length = _.length, args = new Array(length - 1), i = 1; length > i; i++)args[i - 1] = _[i];
        return args
    }

    function lib$rsvp$node$$wrapThenable(then, promise) {
        return {
            then: function (onFulFillment, onRejection) {
                return then.call(promise, onFulFillment, onRejection)
            }
        }
    }

    function lib$rsvp$node$$denodeify(nodeFunc, options) {
        var fn = function () {
            for (var arg, self = this, l = arguments.length, args = new Array(l + 1), promiseInput = !1, i = 0; l > i; ++i) {
                if (arg = arguments[i], !promiseInput) {
                    if (promiseInput = lib$rsvp$node$$needsPromiseInput(arg), promiseInput === lib$rsvp$node$$GET_THEN_ERROR) {
                        var p = new lib$rsvp$promise$$default(lib$rsvp$$internal$$noop);
                        return lib$rsvp$$internal$$reject(p, lib$rsvp$node$$GET_THEN_ERROR.value), p
                    }
                    promiseInput && promiseInput !== !0 && (arg = lib$rsvp$node$$wrapThenable(promiseInput, arg))
                }
                args[i] = arg
            }
            var promise = new lib$rsvp$promise$$default(lib$rsvp$$internal$$noop);
            return args[l] = function (err, val) {
                err ? lib$rsvp$$internal$$reject(promise, err) : void 0 === options ? lib$rsvp$$internal$$resolve(promise, val) : options === !0 ? lib$rsvp$$internal$$resolve(promise, lib$rsvp$node$$arrayResult(arguments)) : lib$rsvp$utils$$isArray(options) ? lib$rsvp$$internal$$resolve(promise, lib$rsvp$node$$makeObject(arguments, options)) : lib$rsvp$$internal$$resolve(promise, val)
            }, promiseInput ? lib$rsvp$node$$handlePromiseInput(promise, args, nodeFunc, self) : lib$rsvp$node$$handleValueInput(promise, args, nodeFunc, self)
        };
        return fn.__proto__ = nodeFunc, fn
    }

    function lib$rsvp$node$$handleValueInput(promise, args, nodeFunc, self) {
        var result = lib$rsvp$node$$tryApply(nodeFunc, self, args);
        return result === lib$rsvp$node$$ERROR && lib$rsvp$$internal$$reject(promise, result.value), promise
    }

    function lib$rsvp$node$$handlePromiseInput(promise, args, nodeFunc, self) {
        return lib$rsvp$promise$$default.all(args).then(function (args) {
            var result = lib$rsvp$node$$tryApply(nodeFunc, self, args);
            return result === lib$rsvp$node$$ERROR && lib$rsvp$$internal$$reject(promise, result.value), promise
        })
    }

    function lib$rsvp$node$$needsPromiseInput(arg) {
        return arg && "object" == typeof arg ? arg.constructor === lib$rsvp$promise$$default ? !0 : lib$rsvp$node$$getThen(arg) : !1
    }

    function lib$rsvp$race$$race(array, label) {
        return lib$rsvp$promise$$default.race(array, label)
    }

    function lib$rsvp$reject$$reject(reason, label) {
        return lib$rsvp$promise$$default.reject(reason, label)
    }

    function lib$rsvp$resolve$$resolve(value, label) {
        return lib$rsvp$promise$$default.resolve(value, label)
    }

    function lib$rsvp$rethrow$$rethrow(reason) {
        throw setTimeout(function () {
            throw reason
        }), reason
    }

    function lib$rsvp$$async(callback, arg) {
        lib$rsvp$config$$config.async(callback, arg)
    }

    function lib$rsvp$$on() {
        lib$rsvp$config$$config.on.apply(lib$rsvp$config$$config, arguments)
    }

    function lib$rsvp$$off() {
        lib$rsvp$config$$config.off.apply(lib$rsvp$config$$config, arguments)
    }

    var lib$rsvp$utils$$_isArray;
    lib$rsvp$utils$$_isArray = Array.isArray ? Array.isArray : function (x) {
        return "[object Array]" === Object.prototype.toString.call(x)
    };
    var lib$rsvp$utils$$isArray = lib$rsvp$utils$$_isArray, lib$rsvp$utils$$now = Date.now || function () {
            return (new Date).getTime()
        }, lib$rsvp$utils$$o_create = Object.create || function (o) {
            if (arguments.length > 1)throw new Error("Second argument not supported");
            if ("object" != typeof o)throw new TypeError("Argument must be an object");
            return lib$rsvp$utils$$F.prototype = o, new lib$rsvp$utils$$F
        }, lib$rsvp$events$$default = {
        mixin: function (object) {
            return object.on = this.on, object.off = this.off, object.trigger = this.trigger, object._promiseCallbacks = void 0, object
        }, on: function (eventName, callback) {
            if ("function" != typeof callback)throw new TypeError("Callback must be a function");
            var callbacks, allCallbacks = lib$rsvp$events$$callbacksFor(this);
            callbacks = allCallbacks[eventName], callbacks || (callbacks = allCallbacks[eventName] = []), -1 === lib$rsvp$events$$indexOf(callbacks, callback) && callbacks.push(callback)
        }, off: function (eventName, callback) {
            var callbacks, index, allCallbacks = lib$rsvp$events$$callbacksFor(this);
            return callback ? (callbacks = allCallbacks[eventName], index = lib$rsvp$events$$indexOf(callbacks, callback), void(-1 !== index && callbacks.splice(index, 1))) : void(allCallbacks[eventName] = [])
        }, trigger: function (eventName, options, label) {
            var callbacks, callback, allCallbacks = lib$rsvp$events$$callbacksFor(this);
            if (callbacks = allCallbacks[eventName])for (var i = 0; i < callbacks.length; i++)(callback = callbacks[i])(options, label)
        }
    }, lib$rsvp$config$$config = {instrument: !1};
    lib$rsvp$events$$default.mixin(lib$rsvp$config$$config);
    var lib$rsvp$instrument$$queue = [], lib$rsvp$instrument$$default = lib$rsvp$instrument$$instrument, lib$rsvp$$internal$$PENDING = void 0, lib$rsvp$$internal$$FULFILLED = 1, lib$rsvp$$internal$$REJECTED = 2, lib$rsvp$$internal$$GET_THEN_ERROR = new lib$rsvp$$internal$$ErrorObject, lib$rsvp$$internal$$TRY_CATCH_ERROR = new lib$rsvp$$internal$$ErrorObject, lib$rsvp$enumerator$$default = lib$rsvp$enumerator$$Enumerator;
    lib$rsvp$enumerator$$Enumerator.prototype._validateInput = function (input) {
        return lib$rsvp$utils$$isArray(input)
    }, lib$rsvp$enumerator$$Enumerator.prototype._validationError = function () {
        return new Error("Array Methods must be provided an Array")
    }, lib$rsvp$enumerator$$Enumerator.prototype._init = function () {
        this._result = new Array(this.length)
    }, lib$rsvp$enumerator$$Enumerator.prototype._enumerate = function () {
        for (var enumerator = this, length = enumerator.length, promise = enumerator.promise, input = enumerator._input, i = 0; promise._state === lib$rsvp$$internal$$PENDING && length > i; i++)enumerator._eachEntry(input[i], i)
    }, lib$rsvp$enumerator$$Enumerator.prototype._eachEntry = function (entry, i) {
        var enumerator = this, c = enumerator._instanceConstructor;
        lib$rsvp$utils$$isMaybeThenable(entry) ? entry.constructor === c && entry._state !== lib$rsvp$$internal$$PENDING ? (entry._onError = null, enumerator._settledAt(entry._state, i, entry._result)) : enumerator._willSettleAt(c.resolve(entry), i) : (enumerator._remaining--, enumerator._result[i] = enumerator._makeResult(lib$rsvp$$internal$$FULFILLED, i, entry))
    }, lib$rsvp$enumerator$$Enumerator.prototype._settledAt = function (state, i, value) {
        var enumerator = this, promise = enumerator.promise;
        promise._state === lib$rsvp$$internal$$PENDING && (enumerator._remaining--, enumerator._abortOnReject && state === lib$rsvp$$internal$$REJECTED ? lib$rsvp$$internal$$reject(promise, value) : enumerator._result[i] = enumerator._makeResult(state, i, value)), 0 === enumerator._remaining && lib$rsvp$$internal$$fulfill(promise, enumerator._result)
    }, lib$rsvp$enumerator$$Enumerator.prototype._makeResult = function (state, i, value) {
        return value
    }, lib$rsvp$enumerator$$Enumerator.prototype._willSettleAt = function (promise, i) {
        var enumerator = this;
        lib$rsvp$$internal$$subscribe(promise, void 0, function (value) {
            enumerator._settledAt(lib$rsvp$$internal$$FULFILLED, i, value)
        }, function (reason) {
            enumerator._settledAt(lib$rsvp$$internal$$REJECTED, i, reason)
        })
    };
    var lib$rsvp$promise$all$$default = lib$rsvp$promise$all$$all, lib$rsvp$promise$race$$default = lib$rsvp$promise$race$$race, lib$rsvp$promise$resolve$$default = lib$rsvp$promise$resolve$$resolve, lib$rsvp$promise$reject$$default = lib$rsvp$promise$reject$$reject, lib$rsvp$promise$$guidKey = "rsvp_" + lib$rsvp$utils$$now() + "-", lib$rsvp$promise$$counter = 0, lib$rsvp$promise$$default = lib$rsvp$promise$$Promise;
    lib$rsvp$promise$$Promise.cast = lib$rsvp$promise$resolve$$default, lib$rsvp$promise$$Promise.all = lib$rsvp$promise$all$$default, lib$rsvp$promise$$Promise.race = lib$rsvp$promise$race$$default, lib$rsvp$promise$$Promise.resolve = lib$rsvp$promise$resolve$$default, lib$rsvp$promise$$Promise.reject = lib$rsvp$promise$reject$$default, lib$rsvp$promise$$Promise.prototype = {
        constructor: lib$rsvp$promise$$Promise,
        _guidKey: lib$rsvp$promise$$guidKey,
        _onError: function (reason) {
            var promise = this;
            lib$rsvp$config$$config.after(function () {
                promise._onError && lib$rsvp$config$$config.trigger("error", reason, promise._label)
            })
        },
        then: function (onFulfillment, onRejection, label) {
            var parent = this, state = parent._state;
            if (state === lib$rsvp$$internal$$FULFILLED && !onFulfillment || state === lib$rsvp$$internal$$REJECTED && !onRejection)return lib$rsvp$config$$config.instrument && lib$rsvp$instrument$$default("chained", parent, parent), parent;
            parent._onError = null;
            var child = new parent.constructor(lib$rsvp$$internal$$noop, label), result = parent._result;
            if (lib$rsvp$config$$config.instrument && lib$rsvp$instrument$$default("chained", parent, child), state) {
                var callback = arguments[state - 1];
                lib$rsvp$config$$config.async(function () {
                    lib$rsvp$$internal$$invokeCallback(state, child, callback, result)
                })
            } else lib$rsvp$$internal$$subscribe(parent, child, onFulfillment, onRejection);
            return child
        },
        "catch": function (onRejection, label) {
            return this.then(void 0, onRejection, label)
        },
        "finally": function (callback, label) {
            var promise = this, constructor = promise.constructor;
            return promise.then(function (value) {
                return constructor.resolve(callback()).then(function () {
                    return value
                })
            }, function (reason) {
                return constructor.resolve(callback()).then(function () {
                    throw reason
                })
            }, label)
        }
    }, lib$rsvp$all$settled$$AllSettled.prototype = lib$rsvp$utils$$o_create(lib$rsvp$enumerator$$default.prototype), lib$rsvp$all$settled$$AllSettled.prototype._superConstructor = lib$rsvp$enumerator$$default, lib$rsvp$all$settled$$AllSettled.prototype._makeResult = lib$rsvp$enumerator$$makeSettledResult, lib$rsvp$all$settled$$AllSettled.prototype._validationError = function () {
        return new Error("allSettled must be called with an array")
    };
    var lib$rsvp$asap$$vertxNext, lib$rsvp$asap$$scheduleFlush, lib$rsvp$all$settled$$default = lib$rsvp$all$settled$$allSettled, lib$rsvp$all$$default = lib$rsvp$all$$all, lib$rsvp$asap$$len = 0, lib$rsvp$asap$$default = ({}.toString, lib$rsvp$asap$$asap), lib$rsvp$asap$$browserWindow = "undefined" != typeof window ? window : void 0, lib$rsvp$asap$$browserGlobal = lib$rsvp$asap$$browserWindow || {}, lib$rsvp$asap$$BrowserMutationObserver = lib$rsvp$asap$$browserGlobal.MutationObserver || lib$rsvp$asap$$browserGlobal.WebKitMutationObserver, lib$rsvp$asap$$isNode = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process), lib$rsvp$asap$$isWorker = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel, lib$rsvp$asap$$queue = new Array(1e3);
    lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$isNode ? lib$rsvp$asap$$useNextTick() : lib$rsvp$asap$$BrowserMutationObserver ? lib$rsvp$asap$$useMutationObserver() : lib$rsvp$asap$$isWorker ? lib$rsvp$asap$$useMessageChannel() : void 0 === lib$rsvp$asap$$browserWindow && "function" == typeof require ? lib$rsvp$asap$$attemptVertex() : lib$rsvp$asap$$useSetTimeout();
    var lib$rsvp$defer$$default = lib$rsvp$defer$$defer, lib$rsvp$filter$$default = lib$rsvp$filter$$filter, lib$rsvp$promise$hash$$default = lib$rsvp$promise$hash$$PromiseHash;
    lib$rsvp$promise$hash$$PromiseHash.prototype = lib$rsvp$utils$$o_create(lib$rsvp$enumerator$$default.prototype), lib$rsvp$promise$hash$$PromiseHash.prototype._superConstructor = lib$rsvp$enumerator$$default, lib$rsvp$promise$hash$$PromiseHash.prototype._init = function () {
        this._result = {}
    }, lib$rsvp$promise$hash$$PromiseHash.prototype._validateInput = function (input) {
        return input && "object" == typeof input
    }, lib$rsvp$promise$hash$$PromiseHash.prototype._validationError = function () {
        return new Error("Promise.hash must be called with an object")
    }, lib$rsvp$promise$hash$$PromiseHash.prototype._enumerate = function () {
        var enumerator = this, promise = enumerator.promise, input = enumerator._input, results = [];
        for (var key in input)promise._state === lib$rsvp$$internal$$PENDING && Object.prototype.hasOwnProperty.call(input, key) && results.push({
            position: key,
            entry: input[key]
        });
        var length = results.length;
        enumerator._remaining = length;
        for (var result, i = 0; promise._state === lib$rsvp$$internal$$PENDING && length > i; i++)result = results[i], enumerator._eachEntry(result.entry, result.position)
    }, lib$rsvp$hash$settled$$HashSettled.prototype = lib$rsvp$utils$$o_create(lib$rsvp$promise$hash$$default.prototype), lib$rsvp$hash$settled$$HashSettled.prototype._superConstructor = lib$rsvp$enumerator$$default, lib$rsvp$hash$settled$$HashSettled.prototype._makeResult = lib$rsvp$enumerator$$makeSettledResult, lib$rsvp$hash$settled$$HashSettled.prototype._validationError = function () {
        return new Error("hashSettled must be called with an object")
    };
    var lib$rsvp$platform$$platform, lib$rsvp$hash$settled$$default = lib$rsvp$hash$settled$$hashSettled, lib$rsvp$hash$$default = lib$rsvp$hash$$hash, lib$rsvp$map$$default = lib$rsvp$map$$map, lib$rsvp$node$$ERROR = new lib$rsvp$node$$Result, lib$rsvp$node$$GET_THEN_ERROR = new lib$rsvp$node$$Result, lib$rsvp$node$$default = lib$rsvp$node$$denodeify;
    if ("object" == typeof self)lib$rsvp$platform$$platform = self; else {
        if ("object" != typeof global)throw new Error("no global: `self` or `global` found");
        lib$rsvp$platform$$platform = global
    }
    var lib$rsvp$platform$$default = lib$rsvp$platform$$platform, lib$rsvp$race$$default = lib$rsvp$race$$race, lib$rsvp$reject$$default = lib$rsvp$reject$$reject, lib$rsvp$resolve$$default = lib$rsvp$resolve$$resolve, lib$rsvp$rethrow$$default = lib$rsvp$rethrow$$rethrow;
    lib$rsvp$config$$config.async = lib$rsvp$asap$$default, lib$rsvp$config$$config.after = function (cb) {
        setTimeout(cb, 0)
    };
    if ("undefined" != typeof window && "object" == typeof window.__PROMISE_INSTRUMENTATION__) {
        var lib$rsvp$$callbacks = window.__PROMISE_INSTRUMENTATION__;
        lib$rsvp$config$$configure("instrument", !0);
        for (var lib$rsvp$$eventName in lib$rsvp$$callbacks)lib$rsvp$$callbacks.hasOwnProperty(lib$rsvp$$eventName) && lib$rsvp$$on(lib$rsvp$$eventName, lib$rsvp$$callbacks[lib$rsvp$$eventName])
    }
    var lib$rsvp$umd$$RSVP = {
        race: lib$rsvp$race$$default,
        Promise: lib$rsvp$promise$$default,
        allSettled: lib$rsvp$all$settled$$default,
        hash: lib$rsvp$hash$$default,
        hashSettled: lib$rsvp$hash$settled$$default,
        denodeify: lib$rsvp$node$$default,
        on: lib$rsvp$$on,
        off: lib$rsvp$$off,
        map: lib$rsvp$map$$default,
        filter: lib$rsvp$filter$$default,
        resolve: lib$rsvp$resolve$$default,
        reject: lib$rsvp$reject$$default,
        all: lib$rsvp$all$$default,
        rethrow: lib$rsvp$rethrow$$default,
        defer: lib$rsvp$defer$$default,
        EventTarget: lib$rsvp$events$$default,
        configure: lib$rsvp$config$$configure,
        async: lib$rsvp$$async
    };
    "function" == typeof define && define.amd ? define(function () {
        return lib$rsvp$umd$$RSVP
    }) : "undefined" != typeof module && module.exports ? module.exports = lib$rsvp$umd$$RSVP : "undefined" != typeof lib$rsvp$platform$$default && (lib$rsvp$platform$$default.RSVP = lib$rsvp$umd$$RSVP)
}.call(this);



// EPup.js.
var EPUBJS = EPUBJS || {};
EPUBJS.VERSION = "0.2.14", EPUBJS.plugins = EPUBJS.plugins || {}, EPUBJS.filePath = EPUBJS.filePath || "/epubjs/", EPUBJS.Render = {}, function (root) {
    var ePub = (root.ePub || {}, root.ePub = function () {
        var bookPath, options;
        return "undefined" != typeof arguments[0] && ("string" == typeof arguments[0] || arguments[0] instanceof ArrayBuffer) && (bookPath = arguments[0], arguments[1] && "object" == typeof arguments[1] ? (options = arguments[1], options.bookPath = bookPath) : options = {bookPath: bookPath}), !arguments[0] || "object" != typeof arguments[0] || arguments[0] instanceof ArrayBuffer || (options = arguments[0]), new EPUBJS.Book(options)
    });
    "function" == typeof define && define.amd ? define(["rsvp", "jszip", "localforage"], function (RSVP, JSZip, localForage) {
        return ePub
    }) : "undefined" != typeof module && module.exports && (global.RSVP = require("rsvp"), global.JSZip = require("jszip"), global.localForage = require("localforage"), module.exports = ePub)
}(window), EPUBJS.Book = function (options) {
    this.settings = EPUBJS.core.defaults(options || {}, {
        bookPath: void 0,
        bookKey: void 0,
        packageUrl: void 0,
        storage: !1,
        fromStorage: !1,
        saved: !1,
        online: !0,
        contained: !1,
        width: void 0,
        height: void 0,
        layoutOveride: void 0,
        orientation: void 0,
        minSpreadWidth: 768,
        gap: "auto",
        version: 1,
        restore: !1,
        reload: !1,
        "goto": !1,
        styles: {},
        headTags: {},
        withCredentials: !1,
        render_method: "Iframe"
    }), this.settings.EPUBJSVERSION = EPUBJS.VERSION, this.spinePos = 0, this.stored = !1, this.online = this.settings.online || navigator.onLine, this.networkListeners(), this.ready = {
        manifest: new RSVP.defer,
        spine: new RSVP.defer,
        metadata: new RSVP.defer,
        cover: new RSVP.defer,
        toc: new RSVP.defer,
        pageList: new RSVP.defer
    }, this.readyPromises = [this.ready.manifest.promise, this.ready.spine.promise, this.ready.metadata.promise, this.ready.cover.promise, this.ready.toc.promise], this.pageList = [], this.pagination = new EPUBJS.Pagination, this.pageListReady = this.ready.pageList.promise, this.ready.all = RSVP.all(this.readyPromises), this.ready.all.then(this._ready.bind(this)), this.isRendered = !1, this._q = EPUBJS.core.queue(this), this._rendering = !1, this._displayQ = EPUBJS.core.queue(this), this._moving = !1, this._gotoQ = EPUBJS.core.queue(this), this.renderer = new EPUBJS.Renderer(this.settings.render_method), this.renderer.setMinSpreadWidth(this.settings.minSpreadWidth), this.renderer.setGap(this.settings.gap), this.listenToRenderer(this.renderer), this.defer_opened = new RSVP.defer, this.opened = this.defer_opened.promise, this.store = !1, this.settings.storage !== !1 && this.fromStorage(!0), ("string" == typeof this.settings.bookPath || this.settings.bookPath instanceof ArrayBuffer) && this.open(this.settings.bookPath, this.settings.reload), window.addEventListener("beforeunload", this.unload.bind(this), !1)
}, EPUBJS.Book.prototype.open = function (bookPath, forceReload) {
    var epubpackage, book = this, opened = new RSVP.defer;
    return this.settings.bookPath = bookPath, this.settings.contained || this.isContained(bookPath) ? (this.settings.contained = this.contained = !0, this.bookUrl = "", epubpackage = this.unarchive(bookPath).then(function () {
        return book.loadPackage()
    })) : (this.bookUrl = this.urlFrom(bookPath), epubpackage = this.loadPackage()), this.settings.restore && !forceReload && localStorage ? epubpackage.then(function (packageXml) {
        var identifier = book.packageIdentifier(packageXml), restored = book.restore(identifier);
        restored || book.unpack(packageXml), opened.resolve(), book.defer_opened.resolve()
    }) : epubpackage.then(function (packageXml) {
        book.unpack(packageXml), opened.resolve(), book.defer_opened.resolve()
    }), this._registerReplacements(this.renderer), opened.promise
}, EPUBJS.Book.prototype.loadPackage = function (_containerPath) {
    var packageXml, book = this, parse = new EPUBJS.Parser, containerPath = _containerPath || "META-INF/container.xml";
    return packageXml = this.settings.packageUrl ? book.loadXml(book.settings.packageUrl) : book.loadXml(book.bookUrl + containerPath).then(function (containerXml) {
        return parse.container(containerXml)
    }).then(function (paths) {
        return book.settings.contentsPath = book.bookUrl + paths.basePath, book.settings.packageUrl = book.bookUrl + paths.packagePath, book.settings.encoding = paths.encoding, book.loadXml(book.settings.packageUrl)
    }), packageXml["catch"](function (error) {
        console.error("Could not load book at: " + containerPath), book.trigger("book:loadFailed", containerPath)
    }), packageXml
}, EPUBJS.Book.prototype.packageIdentifier = function (packageXml) {
    var parse = new EPUBJS.Parser;
    return parse.identifier(packageXml)
}, EPUBJS.Book.prototype.unpack = function (packageXml) {
    var book = this, parse = new EPUBJS.Parser;
    book.contents = parse.packageContents(packageXml, book.settings.contentsPath), book.manifest = book.contents.manifest, book.spine = book.contents.spine, book.spineIndexByURL = book.contents.spineIndexByURL, book.metadata = book.contents.metadata, book.settings.bookKey || (book.settings.bookKey = book.generateBookKey(book.metadata.identifier)), book.globalLayoutProperties = book.parseLayoutProperties(book.metadata), book.contents.coverPath && (book.cover = book.contents.cover = book.settings.contentsPath + book.contents.coverPath), book.spineNodeIndex = book.contents.spineNodeIndex, book.ready.manifest.resolve(book.contents.manifest), book.ready.spine.resolve(book.contents.spine), book.ready.metadata.resolve(book.contents.metadata), book.ready.cover.resolve(book.contents.cover), book.locations = new EPUBJS.Locations(book.spine, book.store, book.settings.withCredentials), book.contents.navPath ? (book.settings.navUrl = book.settings.contentsPath + book.contents.navPath, book.loadXml(book.settings.navUrl).then(function (navHtml) {
        return parse.nav(navHtml, book.spineIndexByURL, book.spine)
    }).then(function (toc) {
        book.toc = book.contents.toc = toc, book.ready.toc.resolve(book.contents.toc)
    }, function (error) {
        book.ready.toc.resolve(!1)
    }), book.loadXml(book.settings.navUrl).then(function (navHtml) {
        return parse.pageList(navHtml, book.spineIndexByURL, book.spine)
    }).then(function (pageList) {
        var epubcfi = new EPUBJS.EpubCFI, wait = 0;
        0 !== pageList.length && (book.pageList = book.contents.pageList = pageList, book.pageList.forEach(function (pg) {
            pg.cfi || (wait += 1, epubcfi.generateCfiFromHref(pg.href, book).then(function (cfi) {
                pg.cfi = cfi, pg.packageUrl = book.settings.packageUrl,
                    wait -= 1, 0 === wait && (book.pagination.process(book.pageList), book.ready.pageList.resolve(book.pageList))
            }))
        }), wait || (book.pagination.process(book.pageList), book.ready.pageList.resolve(book.pageList)))
    }, function (error) {
        book.ready.pageList.resolve([])
    })) : book.contents.tocPath ? (book.settings.tocUrl = book.settings.contentsPath + book.contents.tocPath, book.loadXml(book.settings.tocUrl).then(function (tocXml) {
        return parse.toc(tocXml, book.spineIndexByURL, book.spine)
    }, function (err) {
        console.error(err)
    }).then(function (toc) {
        book.toc = book.contents.toc = toc, book.ready.toc.resolve(book.contents.toc)
    }, function (error) {
        book.ready.toc.resolve(!1)
    })) : book.ready.toc.resolve(!1)
}, EPUBJS.Book.prototype.createHiddenRender = function (renderer, _width, _height) {
    var hiddenContainer, hiddenEl, box = this.element.getBoundingClientRect(), width = _width || this.settings.width || box.width, height = _height || this.settings.height || box.height;
    return renderer.setMinSpreadWidth(this.settings.minSpreadWidth), renderer.setGap(this.settings.gap), this._registerReplacements(renderer), this.settings.forceSingle && renderer.forceSingle(!0), hiddenContainer = document.createElement("div"), hiddenContainer.style.visibility = "hidden", hiddenContainer.style.overflow = "hidden", hiddenContainer.style.width = "0", hiddenContainer.style.height = "0", this.element.appendChild(hiddenContainer), hiddenEl = document.createElement("div"), hiddenEl.style.visibility = "hidden", hiddenEl.style.overflow = "hidden", hiddenEl.style.width = width + "px", hiddenEl.style.height = height + "px", hiddenContainer.appendChild(hiddenEl), renderer.initialize(hiddenEl, this.settings.width, this.settings.height), hiddenContainer
}, EPUBJS.Book.prototype.generatePageList = function (width, height, flag) {
    var pageList = [], pager = new EPUBJS.Renderer(this.settings.render_method, !1), hiddenContainer = this.createHiddenRender(pager, width, height), deferred = new RSVP.defer, spinePos = -1, spineLength = this.spine.length, currentPage = 0, nextChapter = function (deferred) {
        var chapter, next = spinePos + 1, done = deferred || new RSVP.defer;
        if (next >= spineLength)done.resolve(); else {
            if (flag && flag.cancelled)return pager.remove(), this.element.removeChild(hiddenContainer), void done.reject(new Error("User cancelled"));
            spinePos = next, chapter = new EPUBJS.Chapter(this.spine[spinePos], this.store), pager.displayChapter(chapter, this.globalLayoutProperties).then(function (chap) {
                pager.pageMap.forEach(function (item) {
                    currentPage += 1, pageList.push({cfi: item.start, page: currentPage})
                }), pager.pageMap.length % 2 > 0 && pager.spreads && (currentPage += 1, pageList.push({
                    cfi: pager.pageMap[pager.pageMap.length - 1].end,
                    page: currentPage
                })), setTimeout(function () {
                    nextChapter(done)
                }, 1)
            })
        }
        return done.promise
    }.bind(this);
    nextChapter().then(function () {
        pager.remove(), this.element.removeChild(hiddenContainer), deferred.resolve(pageList)
    }.bind(this), function (reason) {
        deferred.reject(reason)
    });
    return deferred.promise
}, EPUBJS.Book.prototype.generatePagination = function (width, height, flag) {
    var book = this, defered = new RSVP.defer;
    return this.ready.spine.promise.then(function () {
        book.generatePageList(width, height, flag).then(function (pageList) {
            book.pageList = book.contents.pageList = pageList, book.pagination.process(pageList), book.ready.pageList.resolve(book.pageList), defered.resolve(book.pageList)
        }, function (reason) {
            defered.reject(reason)
        })
    }), defered.promise
}, EPUBJS.Book.prototype.loadPagination = function (pagelistJSON) {
    var pageList = JSON.parse(pagelistJSON);
    return pageList && pageList.length && (this.pageList = pageList, this.pagination.process(this.pageList), this.ready.pageList.resolve(this.pageList)), this.pageList
}, EPUBJS.Book.prototype.getPageList = function () {
    return this.ready.pageList.promise
}, EPUBJS.Book.prototype.getMetadata = function () {
    return this.ready.metadata.promise
}, EPUBJS.Book.prototype.getToc = function () {
    return this.ready.toc.promise
}, EPUBJS.Book.prototype.networkListeners = function () {
    var book = this;
    window.addEventListener("offline", function (e) {
        book.online = !1, book.settings.storage && book.fromStorage(!0), book.trigger("book:offline")
    }, !1), window.addEventListener("online", function (e) {
        book.online = !0, book.settings.storage && book.fromStorage(!1), book.trigger("book:online")
    }, !1)
}, EPUBJS.Book.prototype.listenToRenderer = function (renderer) {
    var book = this;
    renderer.Events.forEach(function (eventName) {
        renderer.on(eventName, function (e) {
            book.trigger(eventName, e)
        })
    }), renderer.on("renderer:visibleRangeChanged", function (range) {
        var startPage, endPage, percent, pageRange = [];
        this.pageList.length > 0 && (startPage = this.pagination.pageFromCfi(range.start), percent = this.pagination.percentageFromPage(startPage), pageRange.push(startPage), range.end && (endPage = this.pagination.pageFromCfi(range.end), pageRange.push(endPage)), this.trigger("book:pageChanged", {
            anchorPage: startPage,
            percentage: percent,
            pageRange: pageRange
        }))
    }.bind(this)), renderer.on("render:loaded", this.loadChange.bind(this))
}, EPUBJS.Book.prototype.loadChange = function (url) {
    var spinePos, chapter, uri = EPUBJS.core.uri(url), chapterUri = EPUBJS.core.uri(this.currentChapter.absolute);
    uri.path != chapterUri.path ? (console.warn("Miss Match", uri.path, this.currentChapter.absolute), spinePos = this.spineIndexByURL[uri.filename], chapter = new EPUBJS.Chapter(this.spine[spinePos], this.store), this.currentChapter = chapter, this.renderer.currentChapter = chapter, this.renderer.afterLoad(this.renderer.render.docEl), this.renderer.beforeDisplay(function () {
        this.renderer.afterDisplay()
    }.bind(this))) : this._rendering || this.renderer.reformat()
}, EPUBJS.Book.prototype.unlistenToRenderer = function (renderer) {
    renderer.Events.forEach(function (eventName) {
        renderer.off(eventName)
    })
}, EPUBJS.Book.prototype.coverUrl = function () {
    var retrieved = this.ready.cover.promise.then(function (url) {
        return this.settings.fromStorage ? this.store.getUrl(this.contents.cover) : this.settings.contained ? this.zip.getUrl(this.contents.cover) : this.contents.cover
    }.bind(this));
    return retrieved.then(function (url) {
        this.cover = url
    }.bind(this)), retrieved
}, EPUBJS.Book.prototype.loadXml = function (url) {
    return this.settings.fromStorage ? this.store.getXml(url, this.settings.encoding) : this.settings.contained ? this.zip.getXml(url, this.settings.encoding) : EPUBJS.core.request(url, "xml", this.settings.withCredentials)
}, EPUBJS.Book.prototype.urlFrom = function (bookPath) {
    var base, uri = EPUBJS.core.uri(bookPath), absolute = uri.protocol, fromRoot = "/" == uri.path[0], location = window.location, origin = location.origin || location.protocol + "//" + location.host, baseTag = document.getElementsByTagName("base");
    return baseTag.length && (base = baseTag[0].href), uri.protocol ? uri.origin + uri.path : !absolute && fromRoot ? (base || origin) + uri.path : absolute || fromRoot ? void 0 : EPUBJS.core.resolveUrl(base || location.pathname, uri.path)
}, EPUBJS.Book.prototype.unarchive = function (bookPath) {
    return this.zip = new EPUBJS.Unarchiver, this.store = this.zip, this.zip.open(bookPath)
}, EPUBJS.Book.prototype.isContained = function (bookUrl) {
    if (bookUrl instanceof ArrayBuffer)return !0;
    var uri = EPUBJS.core.uri(bookUrl);
    return uri.extension && ("epub" == uri.extension || "zip" == uri.extension)
}, EPUBJS.Book.prototype.isSaved = function (bookKey) {
    var storedSettings;
    return localStorage ? (storedSettings = localStorage.getItem(bookKey), !(!localStorage || null === storedSettings)) : !1
}, EPUBJS.Book.prototype.generateBookKey = function (identifier) {
    return "epubjs:" + EPUBJS.VERSION + ":" + window.location.host + ":" + identifier
}, EPUBJS.Book.prototype.saveContents = function () {
    return localStorage ? void localStorage.setItem(this.settings.bookKey, JSON.stringify(this.contents)) : !1
}, EPUBJS.Book.prototype.removeSavedContents = function () {
    return localStorage ? void localStorage.removeItem(this.settings.bookKey) : !1
}, EPUBJS.Book.prototype.renderTo = function (elem) {
    var rendered, book = this;
    if (EPUBJS.core.isElement(elem))this.element = elem; else {
        if ("string" != typeof elem)return void console.error("Not an Element");
        this.element = EPUBJS.core.getEl(elem)
    }
    return rendered = this.opened.then(function () {
        return book.renderer.initialize(book.element, book.settings.width, book.settings.height), book.metadata.direction && book.renderer.setDirection(book.metadata.direction), book._rendered(), book.startDisplay()
    })
}, EPUBJS.Book.prototype.startDisplay = function () {
    var display;
    return display = this.settings["goto"] ? this["goto"](this.settings["goto"]) : this.settings.previousLocationCfi ? this.gotoCfi(this.settings.previousLocationCfi) : this.displayChapter(this.spinePos)
}, EPUBJS.Book.prototype.restore = function (identifier) {
    var i, book = this, fetch = ["manifest", "spine", "metadata", "cover", "toc", "spineNodeIndex", "spineIndexByURL", "globalLayoutProperties"], reject = !1, bookKey = this.generateBookKey(identifier), fromStore = localStorage.getItem(bookKey), len = fetch.length;
    if (this.settings.clearSaved && (reject = !0), !reject && "undefined" != fromStore && null !== fromStore)for (book.contents = JSON.parse(fromStore), i = 0; len > i; i++) {
        var item = fetch[i];
        if (!book.contents[item]) {
            reject = !0;
            break
        }
        book[item] = book.contents[item]
    }
    return !reject && fromStore && this.contents && this.settings.contentsPath ? (this.settings.bookKey = bookKey, this.ready.manifest.resolve(this.manifest), this.ready.spine.resolve(this.spine), this.ready.metadata.resolve(this.metadata), this.ready.cover.resolve(this.cover), this.ready.toc.resolve(this.toc), !0) : !1
}, EPUBJS.Book.prototype.displayChapter = function (chap, end, deferred) {
    var render, cfi, pos, chapter, book = this, defer = deferred || new RSVP.defer;
    return this.isRendered ? this._rendering || this.renderer._moving ? (this._displayQ.enqueue("displayChapter", [chap, end, defer]), defer.promise) : (EPUBJS.core.isNumber(chap) ? pos = chap : (cfi = new EPUBJS.EpubCFI(chap), pos = cfi.spinePos), (0 > pos || pos >= this.spine.length) && (console.warn("Not A Valid Location"), pos = 0, end = !1, cfi = !1), chapter = new EPUBJS.Chapter(this.spine[pos], this.store), this._rendering = !0, this._needsAssetReplacement() && chapter.registerHook("beforeChapterRender", [EPUBJS.replace.head, EPUBJS.replace.resources, EPUBJS.replace.svg], !0), book.currentChapter = chapter, render = book.renderer.displayChapter(chapter, this.globalLayoutProperties), cfi ? book.renderer.gotoCfi(cfi) : end && book.renderer.lastPage(), render.then(function (rendered) {
        book.spinePos = pos, defer.resolve(book.renderer), book.settings.fromStorage === !1 && book.settings.contained === !1 && book.preloadNextChapter(), book._rendering = !1, book._displayQ.dequeue(), 0 === book._displayQ.length() && book._gotoQ.dequeue()
    }, function (error) {
        console.error("Could not load Chapter: " + chapter.absolute, error), book.trigger("book:chapterLoadFailed", chapter.absolute), book._rendering = !1, defer.reject(error)
    }), defer.promise) : (this._q.enqueue("displayChapter", arguments), defer.reject({
        message: "Rendering",
        stack: (new Error).stack
    }), defer.promise)
}, EPUBJS.Book.prototype.nextPage = function (defer) {
    var defer = defer || new RSVP.defer;
    if (!this.isRendered)return this._q.enqueue("nextPage", [defer]), defer.promise;
    var next = this.renderer.nextPage();
    return next ? (defer.resolve(!0), defer.promise) : this.nextChapter(defer)
}, EPUBJS.Book.prototype.prevPage = function (defer) {
    var defer = defer || new RSVP.defer;
    if (!this.isRendered)return this._q.enqueue("prevPage", [defer]), defer.promise;
    var prev = this.renderer.prevPage();
    return prev ? (defer.resolve(!0), defer.promise) : this.prevChapter(defer)
}, EPUBJS.Book.prototype.nextChapter = function (defer) {
    var defer = defer || new RSVP.defer;
    if (this.spinePos < this.spine.length - 1) {
        for (var next = this.spinePos + 1; this.spine[next] && this.spine[next].linear && "no" == this.spine[next].linear;)next++;
        if (next < this.spine.length)return this.displayChapter(next, !1, defer)
    }
    return this.trigger("book:atEnd"), defer.resolve(!0), defer.promise
}, EPUBJS.Book.prototype.prevChapter = function (defer) {
    var defer = defer || new RSVP.defer;
    if (this.spinePos > 0) {
        for (var prev = this.spinePos - 1; this.spine[prev] && this.spine[prev].linear && "no" == this.spine[prev].linear;)prev--;
        if (prev >= 0)return this.displayChapter(prev, !0, defer)
    }
    return this.trigger("book:atStart"), defer.resolve(!0), defer.promise
}, EPUBJS.Book.prototype.getCurrentLocationCfi = function () {
    return this.isRendered ? this.renderer.currentLocationCfi : !1
}, EPUBJS.Book.prototype["goto"] = function (target) {
    return 0 === target.indexOf("epubcfi(") ? this.gotoCfi(target) : target.indexOf("%") === target.length - 1 ? this.gotoPercentage(parseInt(target.substring(0, target.length - 1)) / 100) : "number" == typeof target || isNaN(target) === !1 ? this.gotoPage(target) : this.gotoHref(target)
}, EPUBJS.Book.prototype.gotoCfi = function (cfiString, defer) {
    var cfi, spinePos, spineItem, promise, render, deferred = defer || new RSVP.defer;
    return this.isRendered ? this._moving || this._rendering ? (console.warn("Renderer is moving"), this._gotoQ.enqueue("gotoCfi", [cfiString, deferred]), !1) : (cfi = new EPUBJS.EpubCFI(cfiString), spinePos = cfi.spinePos, -1 == spinePos ? !1 : (spineItem = this.spine[spinePos], promise = deferred.promise, this._moving = !0, this.currentChapter && this.spinePos === spinePos ? (this.renderer.gotoCfi(cfi), this._moving = !1, deferred.resolve(this.renderer.currentLocationCfi)) : (spineItem && -1 != spinePos || (spinePos = 0, spineItem = this.spine[spinePos]), render = this.displayChapter(cfiString), render.then(function (rendered) {
        this._moving = !1, deferred.resolve(rendered.currentLocationCfi)
    }.bind(this), function () {
        this._moving = !1
    }.bind(this))), promise.then(function () {
        this._gotoQ.dequeue()
    }.bind(this)), promise)) : (console.warn("Not yet Rendered"), this.settings.previousLocationCfi = cfiString, !1)
}, EPUBJS.Book.prototype.gotoHref = function (url, defer) {
    var split, chapter, section, relativeURL, spinePos, deferred = defer || new RSVP.defer;
    return this.isRendered ? this._moving || this._rendering ? (this._gotoQ.enqueue("gotoHref", [url, deferred]), !1) : (split = url.split("#"), chapter = split[0], section = split[1] || !1, relativeURL = -1 == chapter.search("://") ? chapter.replace(EPUBJS.core.uri(this.settings.contentsPath).path, "") : chapter.replace(this.settings.contentsPath, ""), spinePos = this.spineIndexByURL[relativeURL], chapter || (spinePos = this.currentChapter ? this.currentChapter.spinePos : 0), "number" != typeof spinePos ? !1 : this.currentChapter && spinePos == this.currentChapter.spinePos ? (section ? this.renderer.section(section) : this.renderer.firstPage(), deferred.resolve(this.renderer.currentLocationCfi), deferred.promise.then(function () {
        this._gotoQ.dequeue()
    }.bind(this)), deferred.promise) : this.displayChapter(spinePos).then(function () {
        section && this.renderer.section(section), deferred.resolve(this.renderer.currentLocationCfi)
    }.bind(this))) : (this.settings["goto"] = url, !1)
}, EPUBJS.Book.prototype.gotoPage = function (pg) {
    var cfi = this.pagination.cfiFromPage(pg);
    return this.gotoCfi(cfi)
}, EPUBJS.Book.prototype.gotoPercentage = function (percent) {
    var pg = this.pagination.pageFromPercentage(percent);
    return this.gotoPage(pg)
}, EPUBJS.Book.prototype.preloadNextChapter = function () {
    var next, chap = this.spinePos + 1;
    return chap >= this.spine.length ? !1 : (next = new EPUBJS.Chapter(this.spine[chap]), void(next && EPUBJS.core.request(next.absolute)))
}, EPUBJS.Book.prototype.storeOffline = function () {
    var book = this, assets = EPUBJS.core.values(this.manifest);
    return this.store.put(assets).then(function () {
        book.settings.stored = !0, book.trigger("book:stored")
    })
}, EPUBJS.Book.prototype.availableOffline = function () {
    return this.settings.stored > 0
}, EPUBJS.Book.prototype.toStorage = function () {
    var key = this.settings.bookKey;
    this.store.isStored(key).then(function (stored) {
        return stored === !0 ? (this.settings.stored = !0, !0) : this.storeOffline().then(function () {
            this.store.token(key, !0)
        }.bind(this))
    }.bind(this))
}, EPUBJS.Book.prototype.fromStorage = function (stored) {
    [EPUBJS.replace.head, EPUBJS.replace.resources, EPUBJS.replace.svg];
    this.contained || this.settings.contained || (this.online && this.opened.then(this.toStorage.bind(this)), this.store && this.settings.fromStorage && stored === !1 ? (this.settings.fromStorage = !1, this.store.off("offline"), this.store = !1) : this.settings.fromStorage || (this.store = new EPUBJS.Storage(this.settings.credentials), this.store.on("offline", function (offline) {
        offline ? (this.offline = !0, this.settings.fromStorage = !0, this.trigger("book:offline")) : (this.offline = !1, this.settings.fromStorage = !1, this.trigger("book:online"))
    }.bind(this))))
}, EPUBJS.Book.prototype.setStyle = function (style, val, prefixed) {
    var noreflow = ["color", "background", "background-color"];
    return this.isRendered ? (this.settings.styles[style] = val, this.renderer.setStyle(style, val, prefixed), void(-1 === noreflow.indexOf(style) && this.renderer.reformat())) : this._q.enqueue("setStyle", arguments)
}, EPUBJS.Book.prototype.removeStyle = function (style) {
    return this.isRendered ? (this.renderer.removeStyle(style), this.renderer.reformat(), void delete this.settings.styles[style]) : this._q.enqueue("removeStyle", arguments)
}, EPUBJS.Book.prototype.addHeadTag = function (tag, attrs) {
    return this.isRendered ? void(this.settings.headTags[tag] = attrs) : this._q.enqueue("addHeadTag", arguments)
}, EPUBJS.Book.prototype.useSpreads = function (use) {
    console.warn("useSpreads is deprecated, use forceSingle or set a layoutOveride instead"), use === !1 ? this.forceSingle(!0) : this.forceSingle(!1)
}, EPUBJS.Book.prototype.forceSingle = function (_use) {
    var force = "undefined" == typeof _use ? !0 : _use;
    this.renderer.forceSingle(force), this.settings.forceSingle = force, this.isRendered && this.renderer.reformat()
}, EPUBJS.Book.prototype.setMinSpreadWidth = function (width) {
    this.settings.minSpreadWidth = width, this.isRendered && (this.renderer.setMinSpreadWidth(this.settings.minSpreadWidth), this.renderer.reformat())
}, EPUBJS.Book.prototype.setGap = function (gap) {
    this.settings.gap = gap, this.isRendered && (this.renderer.setGap(this.settings.gap), this.renderer.reformat())
}, EPUBJS.Book.prototype.chapter = function (path) {
    var spineItem, chapter, spinePos = this.spineIndexByURL[path];
    return spinePos && (spineItem = this.spine[spinePos], chapter = new EPUBJS.Chapter(spineItem, this.store, this.settings.withCredentials), chapter.load()), chapter
}, EPUBJS.Book.prototype.unload = function () {
    this.settings.restore && localStorage && this.saveContents(), this.unlistenToRenderer(this.renderer), this.trigger("book:unload")
}, EPUBJS.Book.prototype.destroy = function () {
    window.removeEventListener("beforeunload", this.unload), this.currentChapter && this.currentChapter.unload(), this.unload(), this.renderer && this.renderer.remove()
}, EPUBJS.Book.prototype._ready = function () {
    this.trigger("book:ready")
}, EPUBJS.Book.prototype._rendered = function (err) {
    this.isRendered = !0, this.trigger("book:rendered"), this._q.flush()
}, EPUBJS.Book.prototype.applyStyles = function (renderer, callback) {
    renderer.applyStyles(this.settings.styles), callback()
}, EPUBJS.Book.prototype.applyHeadTags = function (renderer, callback) {
    renderer.applyHeadTags(this.settings.headTags), callback()
}, EPUBJS.Book.prototype._registerReplacements = function (renderer) {
    renderer.registerHook("beforeChapterDisplay", this.applyStyles.bind(this, renderer), !0), renderer.registerHook("beforeChapterDisplay", this.applyHeadTags.bind(this, renderer), !0), renderer.registerHook("beforeChapterDisplay", EPUBJS.replace.hrefs.bind(this), !0)
}, EPUBJS.Book.prototype._needsAssetReplacement = function () {
    return this.settings.fromStorage ? !0 : !!this.settings.contained
}, EPUBJS.Book.prototype.parseLayoutProperties = function (metadata) {
    var layout = this.settings.layoutOveride && this.settings.layoutOveride.layout || metadata.layout || "reflowable", spread = this.settings.layoutOveride && this.settings.layoutOveride.spread || metadata.spread || "auto", orientation = this.settings.layoutOveride && this.settings.layoutOveride.orientation || metadata.orientation || "auto";
    return {layout: layout, spread: spread, orientation: orientation}
}, RSVP.EventTarget.mixin(EPUBJS.Book.prototype), RSVP.on("error", function (event) {
    console.error(event)
}), EPUBJS.Chapter = function (spineObject, store, credentials) {
    this.href = spineObject.href, this.absolute = spineObject.url, this.id = spineObject.id, this.spinePos = spineObject.index, this.cfiBase = spineObject.cfiBase, this.properties = spineObject.properties, this.manifestProperties = spineObject.manifestProperties, this.linear = spineObject.linear, this.pages = 1, this.store = store, this.credentials = credentials, this.epubcfi = new EPUBJS.EpubCFI, this.deferred = new RSVP.defer, this.loaded = this.deferred.promise, EPUBJS.Hooks.mixin(this), this.getHooks("beforeChapterRender"), this.caches = {}
}, EPUBJS.Chapter.prototype.load = function (_store, _credentials) {
    var promise, store = _store || this.store, credentials = _credentials || this.credentials;
    return promise = store ? store.getXml(this.absolute) : EPUBJS.core.request(this.absolute, !1, credentials), promise.then(function (xml) {
        try {
            this.setDocument(xml), this.deferred.resolve(this)
        } catch (error) {
            this.deferred.reject({message: this.absolute + " -> " + error.message, stack: (new Error).stack})
        }
    }.bind(this)), promise
}, EPUBJS.Chapter.prototype.render = function (_store) {
    return this.load().then(function (doc) {
        var head = doc.querySelector("head"), base = doc.createElement("base");
        return base.setAttribute("href", this.absolute), head.insertBefore(base, head.firstChild), this.contents = doc, new RSVP.Promise(function (resolve, reject) {
            this.triggerHooks("beforeChapterRender", function () {
                resolve(doc)
            }.bind(this), this)
        }.bind(this))
    }.bind(this)).then(function (doc) {
        var serializer = new XMLSerializer, contents = serializer.serializeToString(doc);
        return contents
    }.bind(this))
}, EPUBJS.Chapter.prototype.url = function (_store) {
    var url, deferred = new RSVP.defer, store = _store || this.store, chapter = this;
    return store ? this.tempUrl ? (url = this.tempUrl, deferred.resolve(url)) : store.getUrl(this.absolute).then(function (url) {
        chapter.tempUrl = url, deferred.resolve(url)
    }) : (url = this.absolute, deferred.resolve(url)), deferred.promise
}, EPUBJS.Chapter.prototype.setPages = function (num) {
    this.pages = num
}, EPUBJS.Chapter.prototype.getPages = function (num) {
    return this.pages
}, EPUBJS.Chapter.prototype.getID = function () {
    return this.ID
}, EPUBJS.Chapter.prototype.unload = function (store) {
    this.document = null, this.tempUrl && store && (store.revokeUrl(this.tempUrl), this.tempUrl = !1)
}, EPUBJS.Chapter.prototype.setDocument = function (_document) {
    var uri = _document.namespaceURI;
    _document.doctype;
    this.document = _document.implementation.createDocument(uri, null, null), this.contents = this.document.importNode(_document.documentElement, !0), this.document.appendChild(this.contents), !this.document.evaluate && document.evaluate && (this.document.evaluate = document.evaluate)
}, EPUBJS.Chapter.prototype.cfiFromRange = function (_range) {
    var range, startXpath, endXpath, startContainer, endContainer, cleanEndTextContent;
    if (this.document) {
        if ("undefined" != typeof document.evaluate) {
            if (startXpath = EPUBJS.core.getElementXPath(_range.startContainer), endXpath = EPUBJS.core.getElementXPath(_range.endContainer), startContainer = this.document.evaluate(startXpath, this.document, EPUBJS.core.nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue, _range.collapsed || (endContainer = this.document.evaluate(endXpath, this.document, EPUBJS.core.nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue), range = this.document.createRange(), startContainer)try {
                range.setStart(startContainer, _range.startOffset), !_range.collapsed && endContainer && range.setEnd(endContainer, _range.endOffset)
            } catch (e) {
                console.log("missed"), startContainer = !1
            }
            startContainer || (console.log("not found, try fuzzy match"), cleanStartTextContent = EPUBJS.core.cleanStringForXpath(_range.startContainer.textContent), startXpath = "//text()[contains(.," + cleanStartTextContent + ")]", startContainer = this.document.evaluate(startXpath, this.document, EPUBJS.core.nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue, startContainer && (range.setStart(startContainer, _range.startOffset), _range.collapsed || (cleanEndTextContent = EPUBJS.core.cleanStringForXpath(_range.endContainer.textContent), endXpath = "//text()[contains(.," + cleanEndTextContent + ")]", endContainer = this.document.evaluate(endXpath, this.document, EPUBJS.core.nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue, endContainer && range.setEnd(endContainer, _range.endOffset))))
        } else range = _range;
        return this.epubcfi.generateCfiFromRange(range, this.cfiBase)
    }
}, EPUBJS.Chapter.prototype.find = function (_query) {
    var chapter = this, matches = [], query = _query.toLowerCase(), find = function (node) {
        for (var cfi, pos, excerpt, text = node.textContent.toLowerCase(), range = chapter.document.createRange(), last = -1, limit = 150; -1 != pos;)pos = text.indexOf(query, last + 1), -1 != pos && (range = chapter.document.createRange(), range.setStart(node, pos), range.setEnd(node, pos + query.length), cfi = chapter.cfiFromRange(range), node.textContent.length < limit ? excerpt = node.textContent : (excerpt = node.textContent.substring(pos - limit / 2, pos + limit / 2), excerpt = "..." + excerpt + "..."), matches.push({
            cfi: cfi,
            excerpt: excerpt
        })), last = pos
    };
    return this.textSprint(this.document, function (node) {
        find(node)
    }), matches
}, EPUBJS.Chapter.prototype.textSprint = function (root, func) {
    for (var node, treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: function (node) {
            return node.data && !/^\s*$/.test(node.data) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
        }
    }, !1); node = treeWalker.nextNode();)func(node)
}, EPUBJS.Chapter.prototype.replace = function (query, func, finished, progress) {
    var items = this.contents.querySelectorAll(query), resources = Array.prototype.slice.call(items), count = resources.length;
    return 0 === count ? void finished(!1) : void resources.forEach(function (item) {
        var called = !1, after = function (result, full) {
            called === !1 && (count--, progress && progress(result, full, count), 0 >= count && finished && finished(!0), called = !0)
        };
        func(item, after)
    }.bind(this))
}, EPUBJS.Chapter.prototype.replaceWithStored = function (query, attr, func, callback) {
    var _oldUrls, _newUrls = {}, _store = this.store, _cache = this.caches[query], _uri = EPUBJS.core.uri(this.absolute), _chapterBase = _uri.base, _attr = attr, _wait = 5, progress = function (url, full, count) {
        _newUrls[full] = url
    }, finished = function (notempty) {
        callback && callback(), EPUBJS.core.values(_oldUrls).forEach(function (url) {
            _store.revokeUrl(url)
        }), _cache = _newUrls
    };
    _store && (_cache || (_cache = {}), _oldUrls = EPUBJS.core.clone(_cache), this.replace(query, function (link, done) {
        var src = link.getAttribute(_attr), full = EPUBJS.core.resolveUrl(_chapterBase, src), replaceUrl = function (url) {
            var timeout;
            link.onload = function () {
                clearTimeout(timeout), done(url, full)
            }, link.onerror = function (e) {
                clearTimeout(timeout), done(url, full), console.error(e)
            }, "svg image" == query && link.setAttribute("externalResourcesRequired", "true"), "link[href]" == query && "stylesheet" !== link.getAttribute("rel") ? done(url, full) : timeout = setTimeout(function () {
                done(url, full)
            }, _wait), url && link.setAttribute(_attr, url)
        };
        full in _oldUrls ? (replaceUrl(_oldUrls[full]), _newUrls[full] = _oldUrls[full], delete _oldUrls[full]) : func(_store, full, replaceUrl, link)
    }, finished, progress))
};
var EPUBJS = EPUBJS || {};
EPUBJS.core = {}, EPUBJS.core.getEl = function (elem) {
    return document.getElementById(elem)
}, EPUBJS.core.getEls = function (classes) {
    return document.getElementsByClassName(classes)
}, EPUBJS.core.request = function (url, type, withCredentials) {
    var uri, supportsURL = window.URL, BLOB_RESPONSE = supportsURL ? "blob" : "arraybuffer", deferred = new RSVP.defer, xhr = new XMLHttpRequest, xhrPrototype = XMLHttpRequest.prototype, handler = function () {
        var r;
        this.readyState == this.DONE && (200 !== this.status && 0 !== this.status || !this.response ? deferred.reject({
            message: this.response,
            stack: (new Error).stack
        }) : (r = "xml" == type ? this.responseXML ? this.responseXML : (new DOMParser).parseFromString(this.response, "application/xml") : "xhtml" == type ? this.responseXML ? this.responseXML : (new DOMParser).parseFromString(this.response, "application/xhtml+xml") : "html" == type ? this.responseXML ? this.responseXML : (new DOMParser).parseFromString(this.response, "text/html") : "json" == type ? JSON.parse(this.response) : "blob" == type ? supportsURL ? this.response : new Blob([this.response]) : this.response, deferred.resolve(r)))
    };
    return "overrideMimeType" in xhrPrototype || Object.defineProperty(xhrPrototype, "overrideMimeType", {
        value: function (mimeType) {
        }
    }), xhr.onreadystatechange = handler, xhr.open("GET", url, !0), withCredentials && (xhr.withCredentials = !0), type || (uri = EPUBJS.core.uri(url), type = uri.extension, type = {htm: "html"}[type] || type), "blob" == type && (xhr.responseType = BLOB_RESPONSE), "json" == type && xhr.setRequestHeader("Accept", "application/json"), "xml" == type && (xhr.responseType = "document", xhr.overrideMimeType("text/xml")), "xhtml" == type && (xhr.responseType = "document"), "html" == type && (xhr.responseType = "document"), "binary" == type && (xhr.responseType = "arraybuffer"), xhr.send(), deferred.promise
}, EPUBJS.core.toArray = function (obj) {
    var arr = [];
    for (var member in obj) {
        var newitm;
        obj.hasOwnProperty(member) && (newitm = obj[member], newitm.ident = member, arr.push(newitm))
    }
    return arr
}, EPUBJS.core.uri = function (url) {
    var withoutProtocol, dot, firstSlash, uri = {
        protocol: "",
        host: "",
        path: "",
        origin: "",
        directory: "",
        base: "",
        filename: "",
        extension: "",
        fragment: "",
        href: url
    }, blob = url.indexOf("blob:"), doubleSlash = url.indexOf("://"), search = url.indexOf("?"), fragment = url.indexOf("#");
    return 0 === blob ? (uri.protocol = "blob", uri.base = url.indexOf(0, fragment), uri) : (-1 != fragment && (uri.fragment = url.slice(fragment + 1), url = url.slice(0, fragment)), -1 != search && (uri.search = url.slice(search + 1), url = url.slice(0, search), href = url), -1 != doubleSlash ? (uri.protocol = url.slice(0, doubleSlash), withoutProtocol = url.slice(doubleSlash + 3), firstSlash = withoutProtocol.indexOf("/"), -1 === firstSlash ? (uri.host = uri.path, uri.path = "") : (uri.host = withoutProtocol.slice(0, firstSlash), uri.path = withoutProtocol.slice(firstSlash)), uri.origin = uri.protocol + "://" + uri.host, uri.directory = EPUBJS.core.folder(uri.path), uri.base = uri.origin + uri.directory) : (uri.path = url, uri.directory = EPUBJS.core.folder(url), uri.base = uri.directory), uri.filename = url.replace(uri.base, ""), dot = uri.filename.lastIndexOf("."), -1 != dot && (uri.extension = uri.filename.slice(dot + 1)), uri)
}, EPUBJS.core.folder = function (url) {
    var lastSlash = url.lastIndexOf("/");
    if (-1 == lastSlash)var folder = "";
    return folder = url.slice(0, lastSlash + 1)
}, EPUBJS.core.dataURLToBlob = function (dataURL) {
    var parts, contentType, raw, rawLength, uInt8Array, BASE64_MARKER = ";base64,";
    if (-1 == dataURL.indexOf(BASE64_MARKER))return parts = dataURL.split(","), contentType = parts[0].split(":")[1], raw = parts[1], new Blob([raw], {type: contentType});
    parts = dataURL.split(BASE64_MARKER), contentType = parts[0].split(":")[1], raw = window.atob(parts[1]), rawLength = raw.length, uInt8Array = new Uint8Array(rawLength);
    for (var i = 0; rawLength > i; ++i)uInt8Array[i] = raw.charCodeAt(i);
    return new Blob([uInt8Array], {type: contentType})
}, EPUBJS.core.addScript = function (src, callback, target) {
    var s, r;
    r = !1, s = document.createElement("script"), s.type = "text/javascript", s.async = !1, s.src = src, s.onload = s.onreadystatechange = function () {
        r || this.readyState && "complete" != this.readyState || (r = !0, callback && callback())
    }, target = target || document.body, target.appendChild(s)
}, EPUBJS.core.addScripts = function (srcArr, callback, target) {
    var total = srcArr.length, curr = 0, cb = function () {
        curr++, total == curr ? callback && callback() : EPUBJS.core.addScript(srcArr[curr], cb, target)
    };
    EPUBJS.core.addScript(srcArr[curr], cb, target)
}, EPUBJS.core.addCss = function (src, callback, target) {
    var s, r;
    r = !1, s = document.createElement("link"), s.type = "text/css", s.rel = "stylesheet", s.href = src, s.onload = s.onreadystatechange = function () {
        r || this.readyState && "complete" != this.readyState || (r = !0, callback && callback())
    }, target = target || document.body, target.appendChild(s)
}, EPUBJS.core.prefixed = function (unprefixed) {
    var vendors = ["Webkit", "Moz", "O", "ms"], upper = unprefixed[0].toUpperCase() + unprefixed.slice(1), length = vendors.length;
    if ("undefined" != typeof document.documentElement.style[unprefixed])return unprefixed;
    for (var i = 0; length > i; i++)if ("undefined" != typeof document.documentElement.style[vendors[i] + upper])return vendors[i] + upper;
    return unprefixed
}, EPUBJS.core.resolveUrl = function (base, path) {
    var url, paths, segments = [], uri = EPUBJS.core.uri(path), folders = base.split("/");
    return uri.host ? path : (folders.pop(), paths = path.split("/"), paths.forEach(function (p) {
        ".." === p ? folders.pop() : segments.push(p)
    }), url = folders.concat(segments), url.join("/"))
}, EPUBJS.core.uuid = function () {
    var d = (new Date).getTime(), uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (d + 16 * Math.random()) % 16 | 0;
        return d = Math.floor(d / 16), ("x" == c ? r : 7 & r | 8).toString(16)
    });
    return uuid
}, EPUBJS.core.insert = function (item, array, compareFunction) {
    var location = EPUBJS.core.locationOf(item, array, compareFunction);
    return array.splice(location, 0, item), location
}, EPUBJS.core.locationOf = function (item, array, compareFunction, _start, _end) {
    var compared, start = _start || 0, end = _end || array.length, pivot = parseInt(start + (end - start) / 2);
    return compareFunction || (compareFunction = function (a, b) {
        return a > b ? 1 : b > a ? -1 : (a = b) ? 0 : void 0
    }), 0 >= end - start ? pivot : (compared = compareFunction(array[pivot], item), end - start === 1 ? compared > 0 ? pivot : pivot + 1 : 0 === compared ? pivot : -1 === compared ? EPUBJS.core.locationOf(item, array, compareFunction, pivot, end) : EPUBJS.core.locationOf(item, array, compareFunction, start, pivot));
}, EPUBJS.core.indexOfSorted = function (item, array, compareFunction, _start, _end) {
    var compared, start = _start || 0, end = _end || array.length, pivot = parseInt(start + (end - start) / 2);
    return compareFunction || (compareFunction = function (a, b) {
        return a > b ? 1 : b > a ? -1 : (a = b) ? 0 : void 0
    }), 0 >= end - start ? -1 : (compared = compareFunction(array[pivot], item), end - start === 1 ? 0 === compared ? pivot : -1 : 0 === compared ? pivot : -1 === compared ? EPUBJS.core.indexOfSorted(item, array, compareFunction, pivot, end) : EPUBJS.core.indexOfSorted(item, array, compareFunction, start, pivot))
}, EPUBJS.core.queue = function (_scope) {
    var _q = [], scope = _scope, enqueue = function (funcName, args, context) {
        return _q.push({funcName: funcName, args: args, context: context}), _q
    }, dequeue = function () {
        var inwait;
        _q.length && (inwait = _q.shift(), scope[inwait.funcName].apply(inwait.context || scope, inwait.args))
    }, flush = function () {
        for (; _q.length;)dequeue()
    }, clear = function () {
        _q = []
    }, length = function () {
        return _q.length
    };
    return {enqueue: enqueue, dequeue: dequeue, flush: flush, clear: clear, length: length}
}, EPUBJS.core.getElementXPath = function (element) {
    return element && element.id ? '//*[@id="' + element.id + '"]' : EPUBJS.core.getElementTreeXPath(element)
}, EPUBJS.core.getElementTreeXPath = function (element) {
    var index, nodeName, tagName, pathIndex, paths = [], isXhtml = "http://www.w3.org/1999/xhtml" === element.ownerDocument.documentElement.getAttribute("xmlns");
    for (element.nodeType === Node.TEXT_NODE && (index = EPUBJS.core.indexOfTextNode(element) + 1, paths.push("text()[" + index + "]"), element = element.parentNode); element && 1 == element.nodeType; element = element.parentNode) {
        index = 0;
        for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling)sibling.nodeType != Node.DOCUMENT_TYPE_NODE && sibling.nodeName == element.nodeName && ++index;
        nodeName = element.nodeName.toLowerCase(), tagName = isXhtml ? "xhtml:" + nodeName : nodeName, pathIndex = index ? "[" + (index + 1) + "]" : "", paths.splice(0, 0, tagName + pathIndex)
    }
    return paths.length ? "./" + paths.join("/") : null
}, EPUBJS.core.nsResolver = function (prefix) {
    var ns = {xhtml: "http://www.w3.org/1999/xhtml", epub: "http://www.idpf.org/2007/ops"};
    return ns[prefix] || null
}, EPUBJS.core.cleanStringForXpath = function (str) {
    var parts = str.match(/[^'"]+|['"]/g);
    return parts = parts.map(function (part) {
        return "'" === part ? '"\'"' : '"' === part ? "'\"'" : "'" + part + "'"
    }), "concat(''," + parts.join(",") + ")"
}, EPUBJS.core.indexOfTextNode = function (textNode) {
    for (var sib, parent = textNode.parentNode, children = parent.childNodes, index = -1, i = 0; i < children.length && (sib = children[i], sib.nodeType === Node.TEXT_NODE && index++, sib != textNode); i++);
    return index
}, EPUBJS.core.defaults = function (obj) {
    for (var i = 1, length = arguments.length; length > i; i++) {
        var source = arguments[i];
        for (var prop in source)void 0 === obj[prop] && (obj[prop] = source[prop])
    }
    return obj
}, EPUBJS.core.extend = function (target) {
    var sources = [].slice.call(arguments, 1);
    return sources.forEach(function (source) {
        source && Object.getOwnPropertyNames(source).forEach(function (propName) {
            Object.defineProperty(target, propName, Object.getOwnPropertyDescriptor(source, propName))
        })
    }), target
}, EPUBJS.core.clone = function (obj) {
    return EPUBJS.core.isArray(obj) ? obj.slice() : EPUBJS.core.extend({}, obj)
}, EPUBJS.core.isElement = function (obj) {
    return !(!obj || 1 != obj.nodeType)
}, EPUBJS.core.isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}, EPUBJS.core.isString = function (str) {
    return "string" == typeof str || str instanceof String
}, EPUBJS.core.isArray = Array.isArray || function (obj) {
        return "[object Array]" === Object.prototype.toString.call(obj)
    }, EPUBJS.core.values = function (object) {
    var props, length, result, index = -1;
    if (!object)return [];
    for (props = Object.keys(object), length = props.length, result = Array(length); ++index < length;)result[index] = object[props[index]];
    return result
}, EPUBJS.EpubCFI = function (cfiStr) {
    return cfiStr ? this.parse(cfiStr) : void 0
}, EPUBJS.EpubCFI.prototype.generateChapterComponent = function (_spineNodeIndex, _pos, id) {
    var pos = parseInt(_pos), spineNodeIndex = _spineNodeIndex + 1, cfi = "/" + spineNodeIndex + "/";
    return cfi += 2 * (pos + 1), id && (cfi += "[" + id + "]"), cfi
}, EPUBJS.EpubCFI.prototype.generatePathComponent = function (steps) {
    var parts = [];
    return steps.forEach(function (part) {
        var segment = "";
        segment += 2 * (part.index + 1), part.id && (segment += "[" + part.id + "]"), parts.push(segment)
    }), parts.join("/")
}, EPUBJS.EpubCFI.prototype.generateCfiFromElement = function (element, chapter) {
    var steps = this.pathTo(element), path = this.generatePathComponent(steps);
    return path.length ? "epubcfi(" + chapter + "!" + path + "/1:0)" : "epubcfi(" + chapter + "!/4/)"
}, EPUBJS.EpubCFI.prototype.pathTo = function (node) {
    for (var children, stack = []; node && null !== node.parentNode && 9 != node.parentNode.nodeType;)children = node.parentNode.children, stack.unshift({
        id: node.id,
        tagName: node.tagName,
        index: children ? Array.prototype.indexOf.call(children, node) : 0
    }), node = node.parentNode;
    return stack
}, EPUBJS.EpubCFI.prototype.getChapterComponent = function (cfiStr) {
    var splitStr = cfiStr.split("!");
    return splitStr[0]
}, EPUBJS.EpubCFI.prototype.getPathComponent = function (cfiStr) {
    var splitStr = cfiStr.split("!"), pathComponent = splitStr[1] ? splitStr[1].split(":") : "";
    return pathComponent[0]
}, EPUBJS.EpubCFI.prototype.getCharecterOffsetComponent = EPUBJS.EpubCFI.prototype.getCharacterOffsetComponent = function (cfiStr) {
    var splitStr = cfiStr.split(":");
    return splitStr[1] || ""
}, EPUBJS.EpubCFI.prototype.parse = function (cfiStr) {
    var chapSegment, chapterComponent, pathComponent, characterOffsetComponent, assertion, chapId, path, end, endInt, cfi = {}, parseStep = function (part) {
        var type, index, has_brackets, id;
        return type = "element", index = parseInt(part) / 2 - 1, has_brackets = part.match(/\[(.*)\]/), has_brackets && has_brackets[1] && (id = has_brackets[1]), {
            type: type,
            index: index,
            id: id || !1
        }
    };
    return "string" != typeof cfiStr ? {spinePos: -1} : (cfi.str = cfiStr, 0 === cfiStr.indexOf("epubcfi(") && ")" === cfiStr[cfiStr.length - 1] && (cfiStr = cfiStr.slice(8, cfiStr.length - 1)), chapterComponent = this.getChapterComponent(cfiStr), pathComponent = this.getPathComponent(cfiStr) || "", characterOffsetComponent = this.getCharacterOffsetComponent(cfiStr), chapterComponent && (chapSegment = chapterComponent.split("/")[2] || "") ? (cfi.spinePos = parseInt(chapSegment) / 2 - 1 || 0, chapId = chapSegment.match(/\[(.*)\]/), cfi.spineId = chapId ? chapId[1] : !1, -1 != pathComponent.indexOf(",") && console.warn("CFI Ranges are not supported"), path = pathComponent.split("/"), end = path.pop(), cfi.steps = [], path.forEach(function (part) {
        var step;
        part && (step = parseStep(part), cfi.steps.push(step))
    }), endInt = parseInt(end), isNaN(endInt) || (endInt % 2 === 0 ? cfi.steps.push(parseStep(end)) : cfi.steps.push({
        type: "text",
        index: (endInt - 1) / 2
    })), assertion = characterOffsetComponent.match(/\[(.*)\]/), assertion && assertion[1] ? (cfi.characterOffset = parseInt(characterOffsetComponent.split("[")[0]), cfi.textLocationAssertion = assertion[1]) : cfi.characterOffset = parseInt(characterOffsetComponent), cfi) : {spinePos: -1})
}, EPUBJS.EpubCFI.prototype.addMarker = function (cfi, _doc, _marker) {
    var parent, lastStep, text, split, doc = _doc || document, marker = _marker || this.createMarker(doc);
    return "string" == typeof cfi && (cfi = this.parse(cfi)), lastStep = cfi.steps[cfi.steps.length - 1], -1 === cfi.spinePos ? !1 : (parent = this.findParent(cfi, doc)) ? (lastStep && "text" === lastStep.type ? (text = parent.childNodes[lastStep.index], cfi.characterOffset ? (split = text.splitText(cfi.characterOffset), marker.classList.add("EPUBJS-CFI-SPLIT"), parent.insertBefore(marker, split)) : parent.insertBefore(marker, text)) : parent.insertBefore(marker, parent.firstChild), marker) : !1
}, EPUBJS.EpubCFI.prototype.createMarker = function (_doc) {
    var doc = _doc || document, element = doc.createElement("span");
    return element.id = "EPUBJS-CFI-MARKER:" + EPUBJS.core.uuid(), element.classList.add("EPUBJS-CFI-MARKER"), element
}, EPUBJS.EpubCFI.prototype.removeMarker = function (marker, _doc) {
    _doc || document;
    marker.classList.contains("EPUBJS-CFI-SPLIT") ? (nextSib = marker.nextSibling, prevSib = marker.previousSibling, nextSib && prevSib && 3 === nextSib.nodeType && 3 === prevSib.nodeType && (prevSib.textContent += nextSib.textContent, marker.parentNode.removeChild(nextSib)), marker.parentNode.removeChild(marker)) : marker.classList.contains("EPUBJS-CFI-MARKER") && marker.parentNode.removeChild(marker)
}, EPUBJS.EpubCFI.prototype.findParent = function (cfi, _doc) {
    var part, sections, text, doc = _doc || document, element = doc.getElementsByTagName("html")[0], children = Array.prototype.slice.call(element.children);
    if ("string" == typeof cfi && (cfi = this.parse(cfi)), sections = cfi.steps.slice(0), !sections.length)return doc.getElementsByTagName("body")[0];
    for (; sections && sections.length > 0;) {
        if (part = sections.shift(), "text" === part.type ? (text = element.childNodes[part.index], element = text.parentNode || element) : element = part.id ? doc.getElementById(part.id) : children[part.index], !element || "undefined" == typeof element)return console.error("No Element For", part, cfi.str), !1;
        children = Array.prototype.slice.call(element.children)
    }
    return element
}, EPUBJS.EpubCFI.prototype.compare = function (cfiOne, cfiTwo) {
    if ("string" == typeof cfiOne && (cfiOne = new EPUBJS.EpubCFI(cfiOne)), "string" == typeof cfiTwo && (cfiTwo = new EPUBJS.EpubCFI(cfiTwo)), cfiOne.spinePos > cfiTwo.spinePos)return 1;
    if (cfiOne.spinePos < cfiTwo.spinePos)return -1;
    for (var i = 0; i < cfiOne.steps.length; i++) {
        if (!cfiTwo.steps[i])return 1;
        if (cfiOne.steps[i].index > cfiTwo.steps[i].index)return 1;
        if (cfiOne.steps[i].index < cfiTwo.steps[i].index)return -1
    }
    return cfiOne.steps.length < cfiTwo.steps.length ? -1 : cfiOne.characterOffset > cfiTwo.characterOffset ? 1 : cfiOne.characterOffset < cfiTwo.characterOffset ? -1 : 0
}, EPUBJS.EpubCFI.prototype.generateCfiFromHref = function (href, book) {
    var loaded, spineItem, uri = EPUBJS.core.uri(href), path = uri.path, fragment = uri.fragment, spinePos = book.spineIndexByURL[path], deferred = new RSVP.defer, epubcfi = new EPUBJS.EpubCFI;
    return "undefined" != typeof spinePos && (spineItem = book.spine[spinePos], loaded = book.loadXml(spineItem.url), loaded.then(function (doc) {
        var cfi, element = doc.getElementById(fragment);
        cfi = epubcfi.generateCfiFromElement(element, spineItem.cfiBase), deferred.resolve(cfi)
    })), deferred.promise
}, EPUBJS.EpubCFI.prototype.generateCfiFromTextNode = function (anchor, offset, base) {
    var parent = anchor.parentNode, steps = this.pathTo(parent), path = this.generatePathComponent(steps), index = 1 + 2 * Array.prototype.indexOf.call(parent.childNodes, anchor);
    return "epubcfi(" + base + "!" + path + "/" + index + ":" + (offset || 0) + ")"
}, EPUBJS.EpubCFI.prototype.generateCfiFromRangeAnchor = function (range, base) {
    var anchor = range.anchorNode, offset = range.anchorOffset;
    return this.generateCfiFromTextNode(anchor, offset, base)
}, EPUBJS.EpubCFI.prototype.generateCfiFromRange = function (range, base) {
    var start, startElement, startSteps, startPath, startOffset, startIndex, end, endElement, endSteps, endPath, endOffset, endIndex;
    if (start = range.startContainer, 3 === start.nodeType)startElement = start.parentNode, startIndex = 1 + 2 * EPUBJS.core.indexOfTextNode(start), startSteps = this.pathTo(startElement); else {
        if (range.collapsed)return this.generateCfiFromElement(start, base);
        startSteps = this.pathTo(start)
    }
    return startPath = this.generatePathComponent(startSteps), startOffset = range.startOffset, range.collapsed ? "epubcfi(" + base + "!" + startPath + "/" + startIndex + ":" + startOffset + ")" : (end = range.endContainer, 3 === end.nodeType ? (endElement = end.parentNode, endIndex = 1 + 2 * EPUBJS.core.indexOfTextNode(end), endSteps = this.pathTo(endElement)) : endSteps = this.pathTo(end), endPath = this.generatePathComponent(endSteps), endOffset = range.endOffset, endPath = endPath.replace(startPath, ""), endPath.length && (endPath += "/"), "epubcfi(" + base + "!" + startPath + "/" + startIndex + ":" + startOffset + "," + endPath + endIndex + ":" + endOffset + ")")
}, EPUBJS.EpubCFI.prototype.generateXpathFromSteps = function (steps) {
    var xpath = [".", "*"];
    return steps.forEach(function (step) {
        var position = step.index + 1;
        step.id ? xpath.push("*[position()=" + position + " and @id='" + step.id + "']") : "text" === step.type ? xpath.push("text()[" + position + "]") : xpath.push("*[" + position + "]")
    }), xpath.join("/")
}, EPUBJS.EpubCFI.prototype.generateQueryFromSteps = function (steps) {
    var query = ["html"];
    return steps.forEach(function (step) {
        var position = step.index + 1;
        step.id ? query.push("#" + step.id) : "text" === step.type || query.push("*:nth-child(" + position + ")")
    }), query.join(">")
}, EPUBJS.EpubCFI.prototype.generateRangeFromCfi = function (cfi, _doc) {
    var lastStep, xpath, startContainer, textLength, query, startContainerParent, doc = _doc || document, range = doc.createRange();
    return "string" == typeof cfi && (cfi = this.parse(cfi)), -1 === cfi.spinePos ? !1 : (lastStep = cfi.steps[cfi.steps.length - 1], "undefined" != typeof document.evaluate ? (xpath = this.generateXpathFromSteps(cfi.steps), startContainer = doc.evaluate(xpath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) : (query = this.generateQueryFromSteps(cfi.steps), startContainerParent = doc.querySelector(query), startContainerParent && "text" == lastStep.type && (startContainer = startContainerParent.childNodes[lastStep.index])), startContainer ? (startContainer && cfi.characterOffset >= 0 ? (textLength = startContainer.length, cfi.characterOffset < textLength ? (range.setStart(startContainer, cfi.characterOffset), range.setEnd(startContainer, textLength)) : (console.debug("offset greater than length:", cfi.characterOffset, textLength), range.setStart(startContainer, textLength - 1), range.setEnd(startContainer, textLength))) : startContainer && range.selectNode(startContainer), range) : null)
}, EPUBJS.EpubCFI.prototype.isCfiString = function (target) {
    return "string" == typeof target && 0 === target.indexOf("epubcfi(")
}, EPUBJS.Events = function (obj, el) {
    return this.events = {}, el ? this.el = el : this.el = document.createElement("div"), obj.createEvent = this.createEvent, obj.tell = this.tell, obj.listen = this.listen, obj.deafen = this.deafen, obj.listenUntil = this.listenUntil, this
}, EPUBJS.Events.prototype.createEvent = function (evt) {
    var e = new CustomEvent(evt);
    return this.events[evt] = e, e
}, EPUBJS.Events.prototype.tell = function (evt, msg) {
    var e;
    this.events[evt] ? e = this.events[evt] : (console.warn("No event:", evt, "defined yet, creating."), e = this.createEvent(evt)), msg && (e.msg = msg), this.el.dispatchEvent(e)
}, EPUBJS.Events.prototype.listen = function (evt, func, bindto) {
    return this.events[evt] ? void(bindto ? this.el.addEventListener(evt, func.bind(bindto), !1) : this.el.addEventListener(evt, func, !1)) : (console.warn("No event:", evt, "defined yet, creating."), void this.createEvent(evt))
}, EPUBJS.Events.prototype.deafen = function (evt, func) {
    this.el.removeEventListener(evt, func, !1)
}, EPUBJS.Events.prototype.listenUntil = function (OnEvt, OffEvt, func, bindto) {
    function unlisten() {
        this.deafen(OnEvt, func), this.deafen(OffEvt, unlisten)
    }

    this.listen(OnEvt, func, bindto), this.listen(OffEvt, unlisten, this)
}, EPUBJS.hooks = {}, EPUBJS.Hooks = function () {
    function hooks() {
    }

    return hooks.prototype.getHooks = function () {
        var plugs;
        this.hooks = {}, Array.prototype.slice.call(arguments).forEach(function (arg) {
            this.hooks[arg] = []
        }, this);
        for (var plugType in this.hooks)plugs = EPUBJS.core.values(EPUBJS.hooks[plugType]), plugs.forEach(function (hook) {
            this.registerHook(plugType, hook)
        }, this)
    }, hooks.prototype.registerHook = function (type, toAdd, toFront) {
        "undefined" != typeof this.hooks[type] ? "function" == typeof toAdd ? toFront ? this.hooks[type].unshift(toAdd) : this.hooks[type].push(toAdd) : Array.isArray(toAdd) && toAdd.forEach(function (hook) {
            toFront ? this.hooks[type].unshift(hook) : this.hooks[type].push(hook)
        }, this) : (this.hooks[type] = [toAdd], "function" == typeof toAdd ? this.hooks[type] = [toAdd] : Array.isArray(toAdd) && (this.hooks[type] = [], toAdd.forEach(function (hook) {
            this.hooks[type].push(hook)
        }, this)))
    }, hooks.prototype.removeHook = function (type, toRemove) {
        var index;
        "undefined" != typeof this.hooks[type] && ("function" == typeof toRemove ? (index = this.hooks[type].indexOf(toRemove), index > -1 && this.hooks[type].splice(index, 1)) : Array.isArray(toRemove) && toRemove.forEach(function (hook) {
            index = this.hooks[type].indexOf(hook), index > -1 && this.hooks[type].splice(index, 1)
        }, this))
    }, hooks.prototype.triggerHooks = function (type, callback, passed) {
        function countdown() {
            count--, 0 >= count && callback && callback()
        }

        var hooks, count;
        return "undefined" == typeof this.hooks[type] ? !1 : (hooks = this.hooks[type], count = hooks.length, 0 === count && callback && callback(), void hooks.forEach(function (hook) {
            hook(countdown, passed)
        }))
    }, {
        register: function (name) {
            if (void 0 === EPUBJS.hooks[name] && (EPUBJS.hooks[name] = {}), "object" != typeof EPUBJS.hooks[name])throw"Already registered: " + name;
            return EPUBJS.hooks[name]
        }, mixin: function (object) {
            for (var prop in hooks.prototype)object[prop] = hooks.prototype[prop]
        }
    }
}(), EPUBJS.Layout = EPUBJS.Layout || {}, EPUBJS.Layout.Reflowable = function () {
    this.documentElement = null, this.spreadWidth = null
}, EPUBJS.Layout.Reflowable.prototype.format = function (documentElement, _width, _height, _gap) {
    var columnAxis = EPUBJS.core.prefixed("columnAxis"), columnGap = EPUBJS.core.prefixed("columnGap"), columnWidth = EPUBJS.core.prefixed("columnWidth"), columnFill = EPUBJS.core.prefixed("columnFill"), width = Math.floor(_width), section = Math.floor(width / 8), gap = _gap >= 0 ? _gap : section % 2 === 0 ? section : section - 1;
    return this.documentElement = documentElement, this.spreadWidth = width + gap, documentElement.style.overflow = "hidden", documentElement.style.width = width + "px", documentElement.style.height = _height + "px", documentElement.style[columnAxis] = "horizontal", documentElement.style[columnFill] = "auto", documentElement.style[columnWidth] = width + "px", documentElement.style[columnGap] = gap + "px", this.colWidth = width, this.gap = gap, {
        pageWidth: this.spreadWidth,
        pageHeight: _height
    }
}, EPUBJS.Layout.Reflowable.prototype.calculatePages = function () {
    var totalWidth, displayedPages;
    return this.documentElement.style.width = "auto", totalWidth = this.documentElement.scrollWidth, displayedPages = Math.ceil(totalWidth / this.spreadWidth), {
        displayedPages: displayedPages,
        pageCount: displayedPages
    }
}, EPUBJS.Layout.ReflowableSpreads = function () {
    this.documentElement = null, this.spreadWidth = null
}, EPUBJS.Layout.ReflowableSpreads.prototype.format = function (documentElement, _width, _height, _gap) {
    var columnAxis = EPUBJS.core.prefixed("columnAxis"), columnGap = EPUBJS.core.prefixed("columnGap"), columnWidth = EPUBJS.core.prefixed("columnWidth"), columnFill = EPUBJS.core.prefixed("columnFill"), divisor = 2, fullWidth = Math.floor(_width), width = fullWidth % 2 === 0 ? fullWidth : fullWidth - 1, section = Math.floor(width / 8), gap = _gap >= 0 ? _gap : section % 2 === 0 ? section : section - 1, colWidth = Math.floor((width - gap) / divisor);
    return this.documentElement = documentElement, this.spreadWidth = (colWidth + gap) * divisor, documentElement.style.overflow = "hidden", documentElement.style.width = width + "px", documentElement.style.height = _height + "px", documentElement.style[columnAxis] = "horizontal", documentElement.style[columnFill] = "auto", documentElement.style[columnGap] = gap + "px", documentElement.style[columnWidth] = colWidth + "px", this.colWidth = colWidth, this.gap = gap, {
        pageWidth: this.spreadWidth,
        pageHeight: _height
    }
}, EPUBJS.Layout.ReflowableSpreads.prototype.calculatePages = function () {
    var totalWidth = this.documentElement.scrollWidth, displayedPages = Math.ceil(totalWidth / this.spreadWidth);
    return this.documentElement.style.width = displayedPages * this.spreadWidth - this.gap + "px", {
        displayedPages: displayedPages,
        pageCount: 2 * displayedPages
    }
}, EPUBJS.Layout.Fixed = function () {
    this.documentElement = null
}, EPUBJS.Layout.Fixed.prototype.format = function (documentElement, _width, _height, _gap) {
    var content, contents, width, height, columnWidth = EPUBJS.core.prefixed("columnWidth"), viewport = documentElement.querySelector("[name=viewport]");
    return this.documentElement = documentElement, viewport && viewport.hasAttribute("content") && (content = viewport.getAttribute("content"), contents = content.split(","), contents[0] && (width = contents[0].replace("width=", "")), contents[1] && (height = contents[1].replace("height=", ""))), documentElement.style.width = width + "px" || "auto", documentElement.style.height = height + "px" || "auto", documentElement.style[columnWidth] = "auto", documentElement.style.overflow = "auto", this.colWidth = width, this.gap = 0, {
        pageWidth: width,
        pageHeight: height
    }
}, EPUBJS.Layout.Fixed.prototype.calculatePages = function () {
    return {displayedPages: 1, pageCount: 1}
}, EPUBJS.Locations = function (spine, store, credentials) {
    this.spine = spine, this.store = store, this.credentials = credentials, this.epubcfi = new EPUBJS.EpubCFI, this._locations = [], this.total = 0, this["break"] = 150, this._current = 0
}, EPUBJS.Locations.prototype.generate = function (chars) {
    var finished, deferred = new RSVP.defer, spinePos = -1, spineLength = this.spine.length, nextChapter = function (deferred) {
        var chapter, next = spinePos + 1, done = deferred || new RSVP.defer;
        return next >= spineLength ? done.resolve() : (spinePos = next, chapter = new EPUBJS.Chapter(this.spine[spinePos], this.store, this.credentials), this.process(chapter).then(function () {
            setTimeout(function () {
                nextChapter(done)
            }, 1)
        })), done.promise
    }.bind(this);
    return "number" == typeof chars && (this["break"] = chars), finished = nextChapter().then(function () {
        this.total = this._locations.length - 1, this._currentCfi && (this.currentLocation = this._currentCfi), deferred.resolve(this._locations)
    }.bind(this)), deferred.promise
}, EPUBJS.Locations.prototype.process = function (chapter) {
    return chapter.load().then(function (_doc) {
        var range, prev, cfi, doc = _doc, contents = doc.documentElement.querySelector("body"), counter = 0;
        this.sprint(contents, function (node) {
            var dist, len = node.length, pos = 0;
            for (0 === counter && (range = doc.createRange(), range.setStart(node, 0)), dist = this["break"] - counter, dist > len && (counter += len, pos = len); len > pos;)counter = this["break"], pos += this["break"], pos >= len ? counter = len - (pos - this["break"]) : (range.setEnd(node, pos), cfi = chapter.cfiFromRange(range), this._locations.push(cfi), counter = 0, pos += 1, range = doc.createRange(), range.setStart(node, pos));
            prev = node
        }.bind(this)), range && (range.setEnd(prev, prev.length), cfi = chapter.cfiFromRange(range), this._locations.push(cfi), counter = 0)
    }.bind(this))
}, EPUBJS.Locations.prototype.sprint = function (root, func) {
    for (var node, treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, !1); node = treeWalker.nextNode();)func(node)
}, EPUBJS.Locations.prototype.locationFromCfi = function (cfi) {
    return 0 === this._locations.length ? -1 : EPUBJS.core.locationOf(cfi, this._locations, this.epubcfi.compare)
}, EPUBJS.Locations.prototype.percentageFromCfi = function (cfi) {
    var loc = this.locationFromCfi(cfi);
    return this.percentageFromLocation(loc)
}, EPUBJS.Locations.prototype.percentageFromLocation = function (loc) {
    return loc && this.total ? loc / this.total : 0
}, EPUBJS.Locations.prototype.cfiFromLocation = function (loc) {
    var cfi = -1;
    return "number" != typeof loc && (loc = parseInt(loc)), loc >= 0 && loc < this._locations.length && (cfi = this._locations[loc]), cfi
}, EPUBJS.Locations.prototype.cfiFromPercentage = function (value) {
    var percentage = value > 1 ? value / 100 : value, loc = Math.ceil(this.total * percentage);
    return this.cfiFromLocation(loc)
}, EPUBJS.Locations.prototype.load = function (locations) {
    return this._locations = JSON.parse(locations), this.total = this._locations.length - 1, this._locations
}, EPUBJS.Locations.prototype.save = function (json) {
    return JSON.stringify(this._locations)
}, EPUBJS.Locations.prototype.getCurrent = function (json) {
    return this._current
}, EPUBJS.Locations.prototype.setCurrent = function (curr) {
    var loc;
    if ("string" == typeof curr)this._currentCfi = curr; else {
        if ("number" != typeof curr)return;
        this._current = curr
    }
    0 !== this._locations.length && ("string" == typeof curr ? (loc = this.locationFromCfi(curr), this._current = loc) : loc = curr, this.trigger("changed", {percentage: this.percentageFromLocation(loc)}))
}, Object.defineProperty(EPUBJS.Locations.prototype, "currentLocation", {
    get: function () {
        return this._current
    }, set: function (curr) {
        this.setCurrent(curr)
    }
}), RSVP.EventTarget.mixin(EPUBJS.Locations.prototype), EPUBJS.Pagination = function (pageList) {
    this.pages = [], this.locations = [], this.epubcfi = new EPUBJS.EpubCFI, pageList && pageList.length && this.process(pageList)
}, EPUBJS.Pagination.prototype.process = function (pageList) {
    pageList.forEach(function (item) {
        this.pages.push(item.page), this.locations.push(item.cfi)
    }, this), this.pageList = pageList, this.firstPage = parseInt(this.pages[0]), this.lastPage = parseInt(this.pages[this.pages.length - 1]), this.totalPages = this.lastPage - this.firstPage
}, EPUBJS.Pagination.prototype.pageFromCfi = function (cfi) {
    var pg = -1;
    if (0 === this.locations.length)return -1;
    var index = EPUBJS.core.indexOfSorted(cfi, this.locations, this.epubcfi.compare);
    return -1 != index ? pg = this.pages[index] : (index = EPUBJS.core.locationOf(cfi, this.locations, this.epubcfi.compare), pg = index - 1 >= 0 ? this.pages[index - 1] : this.pages[0], void 0 !== pg || (pg = -1)), pg
}, EPUBJS.Pagination.prototype.cfiFromPage = function (pg) {
    var cfi = -1;
    "number" != typeof pg && (pg = parseInt(pg));
    var index = this.pages.indexOf(pg);
    return -1 != index && (cfi = this.locations[index]), cfi
}, EPUBJS.Pagination.prototype.pageFromPercentage = function (percent) {
    var pg = Math.round(this.totalPages * percent);
    return pg
}, EPUBJS.Pagination.prototype.percentageFromPage = function (pg) {
    var percentage = (pg - this.firstPage) / this.totalPages;
    return Math.round(1e3 * percentage) / 1e3
}, EPUBJS.Pagination.prototype.percentageFromCfi = function (cfi) {
    var pg = this.pageFromCfi(cfi), percentage = this.percentageFromPage(pg);
    return percentage
}, EPUBJS.Parser = function (baseUrl) {
    this.baseUrl = baseUrl || ""
}, EPUBJS.Parser.prototype.container = function (containerXml) {
    var rootfile, fullpath, folder, encoding;
    return containerXml ? (rootfile = containerXml.querySelector("rootfile")) ? (fullpath = rootfile.getAttribute("full-path"), folder = EPUBJS.core.uri(fullpath).directory, encoding = containerXml.xmlEncoding, {
        packagePath: fullpath,
        basePath: folder,
        encoding: encoding
    }) : void console.error("No RootFile Found") : void console.error("Container File Not Found")
}, EPUBJS.Parser.prototype.identifier = function (packageXml) {
    var metadataNode;
    return packageXml ? (metadataNode = packageXml.querySelector("metadata"), metadataNode ? this.getElementText(metadataNode, "identifier") : void console.error("No Metadata Found")) : void console.error("Package File Not Found")
}, EPUBJS.Parser.prototype.packageContents = function (packageXml, baseUrl) {
    var metadataNode, manifestNode, spineNode, manifest, navPath, tocPath, coverPath, spineNodeIndex, spine, spineIndexByURL, metadata, parse = this;
    return baseUrl && (this.baseUrl = baseUrl), packageXml ? (metadataNode = packageXml.querySelector("metadata")) ? (manifestNode = packageXml.querySelector("manifest")) ? (spineNode = packageXml.querySelector("spine")) ? (manifest = parse.manifest(manifestNode), navPath = parse.findNavPath(manifestNode), tocPath = parse.findTocPath(manifestNode, spineNode), coverPath = parse.findCoverPath(packageXml), spineNodeIndex = Array.prototype.indexOf.call(spineNode.parentNode.childNodes, spineNode), spine = parse.spine(spineNode, manifest), spineIndexByURL = {}, spine.forEach(function (item) {
        spineIndexByURL[item.href] = item.index
    }), metadata = parse.metadata(metadataNode), metadata.direction = spineNode.getAttribute("page-progression-direction"), {
        metadata: metadata,
        spine: spine,
        manifest: manifest,
        navPath: navPath,
        tocPath: tocPath,
        coverPath: coverPath,
        spineNodeIndex: spineNodeIndex,
        spineIndexByURL: spineIndexByURL
    }) : void console.error("No Spine Found") : void console.error("No Manifest Found") : void console.error("No Metadata Found") : void console.error("Package File Not Found")
}, EPUBJS.Parser.prototype.findNavPath = function (manifestNode) {
    var node = manifestNode.querySelector("item[properties$='nav'], item[properties^='nav '], item[properties*=' nav ']");
    return node ? node.getAttribute("href") : !1
}, EPUBJS.Parser.prototype.findTocPath = function (manifestNode, spineNode) {
    var tocId, node = manifestNode.querySelector("item[media-type='application/x-dtbncx+xml']");
    return node || (tocId = spineNode.getAttribute("toc"), tocId && (node = manifestNode.querySelector("item[id='" + tocId + "']"))), node ? node.getAttribute("href") : !1
}, EPUBJS.Parser.prototype.metadata = function (xml) {
    var metadata = {}, p = this;
    return metadata.bookTitle = p.getElementText(xml, "title"), metadata.creator = p.getElementText(xml, "creator"), metadata.description = p.getElementText(xml, "description"), metadata.pubdate = p.getElementText(xml, "date"), metadata.publisher = p.getElementText(xml, "publisher"), metadata.identifier = p.getElementText(xml, "identifier"), metadata.language = p.getElementText(xml, "language"), metadata.rights = p.getElementText(xml, "rights"), metadata.modified_date = p.querySelectorText(xml, "meta[property='dcterms:modified']"), metadata.layout = p.querySelectorText(xml, "meta[property='rendition:layout']"), metadata.orientation = p.querySelectorText(xml, "meta[property='rendition:orientation']"), metadata.spread = p.querySelectorText(xml, "meta[property='rendition:spread']"), metadata
}, EPUBJS.Parser.prototype.findCoverPath = function (packageXml) {
    var epubVersion = packageXml.querySelector("package").getAttribute("version");
    if ("2.0" === epubVersion) {
        var metaCover = packageXml.querySelector('meta[name="cover"]');
        if (metaCover) {
            var coverId = metaCover.getAttribute("content"), cover = packageXml.querySelector("item[id='" + coverId + "']");
            return cover ? cover.getAttribute("href") : !1
        }
        return !1
    }
    var node = packageXml.querySelector("item[properties='cover-image']");
    return node ? node.getAttribute("href") : !1
},EPUBJS.Parser.prototype.getElementText = function (xml, tag) {
    var el, found = xml.getElementsByTagNameNS("http://purl.org/dc/elements/1.1/", tag);
    return found && 0 !== found.length ? (el = found[0], el.childNodes.length ? el.childNodes[0].nodeValue : "") : ""
},EPUBJS.Parser.prototype.querySelectorText = function (xml, q) {
    var el = xml.querySelector(q);
    return el && el.childNodes.length ? el.childNodes[0].nodeValue : ""
},EPUBJS.Parser.prototype.manifest = function (manifestXml) {
    var baseUrl = this.baseUrl, manifest = {}, selected = manifestXml.querySelectorAll("item"), items = Array.prototype.slice.call(selected);
    return items.forEach(function (item) {
        var id = item.getAttribute("id"), href = item.getAttribute("href") || "", type = item.getAttribute("media-type") || "", properties = item.getAttribute("properties") || "";
        manifest[id] = {href: href, url: baseUrl + href, type: type, properties: properties}
    }), manifest
},EPUBJS.Parser.prototype.spine = function (spineXml, manifest) {
    var spine = [], selected = spineXml.getElementsByTagName("itemref"), items = Array.prototype.slice.call(selected), spineNodeIndex = Array.prototype.indexOf.call(spineXml.parentNode.childNodes, spineXml), epubcfi = new EPUBJS.EpubCFI;
    return items.forEach(function (item, index) {
        var Id = item.getAttribute("idref"), cfiBase = epubcfi.generateChapterComponent(spineNodeIndex, index, Id), props = item.getAttribute("properties") || "", propArray = props.length ? props.split(" ") : [], manifestProps = manifest[Id].properties, manifestPropArray = manifestProps.length ? manifestProps.split(" ") : [], vert = {
            id: Id,
            linear: item.getAttribute("linear") || "",
            properties: propArray,
            manifestProperties: manifestPropArray,
            href: manifest[Id].href,
            url: manifest[Id].url,
            index: index,
            cfiBase: cfiBase,
            cfi: "epubcfi(" + cfiBase + ")"
        };
        spine.push(vert)
    }), spine
},EPUBJS.Parser.prototype.querySelectorByType = function (html, element, type) {
    var query = html.querySelector(element + '[*|type="' + type + '"]');
    if (null !== query && 0 !== query.length)return query;
    query = html.querySelectorAll(element);
    for (var i = 0; i < query.length; i++)if (query[i].getAttributeNS("http://www.idpf.org/2007/ops", "type") === type)return query[i]
},EPUBJS.Parser.prototype.nav = function (navHtml, spineIndexByURL, bookSpine) {
    var i, item, parent, navElement = this.querySelectorByType(navHtml, "nav", "toc"), navItems = navElement ? navElement.querySelectorAll("ol li") : [], length = navItems.length, toc = {}, list = [];
    if (!navItems || 0 === length)return list;
    for (i = 0; length > i; ++i)item = this.navItem(navItems[i], spineIndexByURL, bookSpine), toc[item.id] = item, item.parent ? (parent = toc[item.parent], parent.subitems.push(item)) : list.push(item);
    return list
},EPUBJS.Parser.prototype.navItem = function (item, spineIndexByURL, bookSpine) {
    var parent, id = item.getAttribute("id") || !1, content = item.querySelector("a, span"), src = content.getAttribute("href") || "", text = content.textContent || "", split = src.split("#"), baseUrl = split[0], spinePos = spineIndexByURL[baseUrl], spineItem = bookSpine[spinePos], subitems = [], parentNode = item.parentNode, cfi = spineItem ? spineItem.cfi : "";
    return parentNode && "navPoint" === parentNode.nodeName && (parent = parentNode.getAttribute("id")), id || (spinePos ? (spineItem = bookSpine[spinePos], id = spineItem.id, cfi = spineItem.cfi) : (id = "epubjs-autogen-toc-id-" + EPUBJS.core.uuid(), item.setAttribute("id", id))), {
        id: id,
        href: src,
        label: text,
        spinePos: spinePos,
        subitems: subitems,
        parent: parent,
        cfi: cfi
    }
},EPUBJS.Parser.prototype.toc = function (tocXml, spineIndexByURL, bookSpine) {
    var i, item, parent, navPoints = tocXml.querySelectorAll("navMap navPoint"), length = navPoints.length, toc = {}, list = [];
    if (!navPoints || 0 === length)return list;
    for (i = 0; length > i; ++i)item = this.tocItem(navPoints[i], spineIndexByURL, bookSpine), toc[item.id] = item, item.parent ? (parent = toc[item.parent], parent.subitems.push(item)) : list.push(item);
    return list
},EPUBJS.Parser.prototype.tocItem = function (item, spineIndexByURL, bookSpine) {
    var parent, id = item.getAttribute("id") || !1, content = item.querySelector("content"), src = content.getAttribute("src"), navLabel = item.querySelector("navLabel"), text = navLabel.textContent ? navLabel.textContent : "", split = src.split("#"), baseUrl = split[0], spinePos = spineIndexByURL[baseUrl], spineItem = bookSpine[spinePos], subitems = [], parentNode = item.parentNode, cfi = spineItem ? spineItem.cfi : "";
    return parentNode && "navPoint" === parentNode.nodeName && (parent = parentNode.getAttribute("id")), id || (spinePos ? (spineItem = bookSpine[spinePos], id = spineItem.id, cfi = spineItem.cfi) : (id = "epubjs-autogen-toc-id-" + EPUBJS.core.uuid(), item.setAttribute("id", id))), {
        id: id,
        href: src,
        label: text,
        spinePos: spinePos,
        subitems: subitems,
        parent: parent,
        cfi: cfi
    }
},EPUBJS.Parser.prototype.pageList = function (navHtml, spineIndexByURL, bookSpine) {
    var i, item, navElement = this.querySelectorByType(navHtml, "nav", "page-list"), navItems = navElement ? navElement.querySelectorAll("ol li") : [], length = navItems.length, list = [];
    if (!navItems || 0 === length)return list;
    for (i = 0; length > i; ++i)item = this.pageListItem(navItems[i], spineIndexByURL, bookSpine), list.push(item);
    return list
},EPUBJS.Parser.prototype.pageListItem = function (item, spineIndexByURL, bookSpine) {
    var split, packageUrl, cfi, content = (item.getAttribute("id") || !1, item.querySelector("a")), href = content.getAttribute("href") || "", text = content.textContent || "", page = parseInt(text), isCfi = href.indexOf("epubcfi");
    return -1 != isCfi ? (split = href.split("#"), packageUrl = split[0], cfi = split.length > 1 ? split[1] : !1, {
        cfi: cfi,
        href: href,
        packageUrl: packageUrl,
        page: page
    }) : {href: href, page: page}
},EPUBJS.Render.Iframe = function () {
    this.iframe = null, this.document = null, this.window = null, this.docEl = null, this.bodyEl = null, this.leftPos = 0, this.pageWidth = 0
},EPUBJS.Render.Iframe.prototype.create = function () {
    return this.iframe = document.createElement("iframe"), this.iframe.id = "epubjs-iframe:" + EPUBJS.core.uuid(), this.iframe.scrolling = "no", this.iframe.seamless = "seamless", this.iframe.style.border = "none", this.iframe.addEventListener("load", this.loaded.bind(this), !1), this.isMobile = navigator.userAgent.match(/(iPad|iPhone|iPod|Mobile|Android)/g), this.transform = EPUBJS.core.prefixed("transform"), this.iframe
},EPUBJS.Render.Iframe.prototype.load = function (contents, url) {
    var render = this, deferred = new RSVP.defer;
    return this.window && this.unload(), this.iframe.onload = function (e) {
        render.document = render.iframe.contentDocument, render.docEl = render.document.documentElement, render.headEl = render.document.head, render.bodyEl = render.document.body || render.document.querySelector("body"), render.window = render.iframe.contentWindow, render.window.addEventListener("resize", render.resized.bind(render), !1), render.leftPos = 0, render.setLeft(0), render.bodyEl && (render.bodyEl.style.margin = "0"), "rtl" == render.direction && "rtl" != render.docEl.dir && (render.docEl.dir = "rtl", render.docEl.style.position = "absolute", render.docEl.style.right = "0"), deferred.resolve(render.docEl)
    }, this.iframe.onerror = function (e) {
        deferred.reject({message: "Error Loading Contents: " + e, stack: (new Error).stack})
    }, this.document = this.iframe.contentDocument, this.document ? (this.document.open(), this.document.write(contents), this.document.close(), deferred.promise) : (deferred.reject(new Error("No Document Available")), deferred.promise)
},EPUBJS.Render.Iframe.prototype.loaded = function (v) {
    var baseEl, base, url = this.iframe.contentWindow.location.href;
    this.document = this.iframe.contentDocument, this.docEl = this.document.documentElement, this.headEl = this.document.head, this.bodyEl = this.document.body || this.document.querySelector("body"), this.window = this.iframe.contentWindow, "about:blank" != url && (baseEl = this.iframe.contentDocument.querySelector("base"), base = baseEl.getAttribute("href"), this.trigger("render:loaded", base))
},EPUBJS.Render.Iframe.prototype.resize = function (width, height) {
    this.iframe && (this.iframe.height = height, isNaN(width) || width % 2 === 0 || (width += 1), this.iframe.width = width, this.width = this.iframe.getBoundingClientRect().width || width, this.height = this.iframe.getBoundingClientRect().height || height)
},EPUBJS.Render.Iframe.prototype.resized = function (e) {
    this.width = this.iframe.getBoundingClientRect().width, this.height = this.iframe.getBoundingClientRect().height
},EPUBJS.Render.Iframe.prototype.totalWidth = function () {
    return this.docEl.scrollWidth
},EPUBJS.Render.Iframe.prototype.totalHeight = function () {
    return this.docEl.scrollHeight
},EPUBJS.Render.Iframe.prototype.setPageDimensions = function (pageWidth, pageHeight) {
    this.pageWidth = pageWidth, this.pageHeight = pageHeight
},EPUBJS.Render.Iframe.prototype.setDirection = function (direction) {
    this.direction = direction, this.docEl && "rtl" == this.docEl.dir && (this.docEl.dir = "rtl", this.docEl.style.position = "static", this.docEl.style.right = "auto")
},EPUBJS.Render.Iframe.prototype.setLeft = function (leftPos) {
    this.isMobile ? this.docEl.style[this.transform] = "translate(" + -leftPos + "px, 0)" : this.document.defaultView.scrollTo(leftPos, 0)
},EPUBJS.Render.Iframe.prototype.setStyle = function (style, val, prefixed) {
    prefixed && (style = EPUBJS.core.prefixed(style)), this.bodyEl && (this.bodyEl.style[style] = val)
},EPUBJS.Render.Iframe.prototype.removeStyle = function (style) {
    this.bodyEl && (this.bodyEl.style[style] = "")
},EPUBJS.Render.Iframe.prototype.addHeadTag = function (tag, attrs, _doc) {
    var doc = _doc || this.document, tagEl = doc.createElement(tag), headEl = doc.head;
    for (var attr in attrs)tagEl.setAttribute(attr, attrs[attr]);
    headEl && headEl.insertBefore(tagEl, headEl.firstChild)
},EPUBJS.Render.Iframe.prototype.page = function (pg) {
    this.leftPos = this.pageWidth * (pg - 1), "rtl" === this.direction && (this.leftPos = -1 * this.leftPos), this.setLeft(this.leftPos)
},EPUBJS.Render.Iframe.prototype.getPageNumberByElement = function (el) {
    var left, pg;
    if (el)return left = this.leftPos + el.getBoundingClientRect().left, pg = Math.floor(left / this.pageWidth) + 1
},EPUBJS.Render.Iframe.prototype.getPageNumberByRect = function (boundingClientRect) {
    var left, pg;
    return left = this.leftPos + boundingClientRect.left, pg = Math.floor(left / this.pageWidth) + 1
},EPUBJS.Render.Iframe.prototype.getBaseElement = function () {
    return this.bodyEl
},EPUBJS.Render.Iframe.prototype.getDocumentElement = function () {
    return this.docEl
},EPUBJS.Render.Iframe.prototype.isElementVisible = function (el) {
    var rect, left;
    return !!(el && "function" == typeof el.getBoundingClientRect && (rect = el.getBoundingClientRect(), left = rect.left, 0 !== rect.width && 0 !== rect.height && left >= 0 && left < this.pageWidth))
},EPUBJS.Render.Iframe.prototype.scroll = function (bool) {
    bool ? this.iframe.scrolling = "yes" : this.iframe.scrolling = "no"
},EPUBJS.Render.Iframe.prototype.unload = function () {
    this.window.removeEventListener("resize", this.resized), this.window.location.reload()
},RSVP.EventTarget.mixin(EPUBJS.Render.Iframe.prototype),EPUBJS.Renderer = function (renderMethod, hidden) {
    this.listenedEvents = ["keydown", "keyup", "keypressed", "mouseup", "mousedown", "click"], this.upEvent = "mouseup", this.downEvent = "mousedown", "ontouchstart" in document.documentElement && (this.listenedEvents.push("touchstart", "touchend"), this.upEvent = "touchend", this.downEvent = "touchstart"), renderMethod && "undefined" != typeof EPUBJS.Render[renderMethod] ? this.render = new EPUBJS.Render[renderMethod] : console.error("Not a Valid Rendering Method"), this.render.on("render:loaded", this.loaded.bind(this)), this.caches = {}, this.epubcfi = new EPUBJS.EpubCFI, this.spreads = !0, this.isForcedSingle = !1, this.resized = this.onResized.bind(this), this.layoutSettings = {}, this.hidden = hidden || !1, EPUBJS.Hooks.mixin(this), this.getHooks("beforeChapterDisplay"), this._q = EPUBJS.core.queue(this), this._moving = !1
},EPUBJS.Renderer.prototype.Events = ["renderer:keydown", "renderer:keyup", "renderer:keypressed", "renderer:mouseup", "renderer:mousedown", "renderer:click", "renderer:touchstart", "renderer:touchend", "renderer:selected", "renderer:chapterUnload", "renderer:chapterUnloaded", "renderer:chapterDisplayed", "renderer:locationChanged", "renderer:visibleLocationChanged", "renderer:visibleRangeChanged", "renderer:resized", "renderer:spreads"],EPUBJS.Renderer.prototype.initialize = function (element, width, height) {
    this.container = element, this.element = this.render.create(), this.initWidth = width, this.initHeight = height, this.width = width || this.container.clientWidth, this.height = height || this.container.clientHeight, this.container.appendChild(this.element), width && height ? this.render.resize(this.width, this.height) : this.render.resize("100%", "100%"), document.addEventListener("orientationchange", this.onResized)
},EPUBJS.Renderer.prototype.displayChapter = function (chapter, globalLayout) {
    if (this._moving) {
        console.warning("Rendering In Progress");
        var deferred = new RSVP.defer;
        return deferred.reject({message: "Rendering In Progress", stack: (new Error).stack}), deferred.promise
    }
    return this._moving = !0, chapter.render().then(function (contents) {
        return this.currentChapter && (this.trigger("renderer:chapterUnload"), this.currentChapter.unload(), this.render.window && this.render.window.removeEventListener("resize", this.resized), this.removeEventListeners(), this.removeSelectionListeners(), this.trigger("renderer:chapterUnloaded"), this.contents = null, this.doc = null, this.pageMap = null), this.currentChapter = chapter, this.chapterPos = 1, this.currentChapterCfiBase = chapter.cfiBase, this.layoutSettings = this.reconcileLayoutSettings(globalLayout, chapter.properties), this.load(contents, chapter.href)
    }.bind(this), function () {
        this._moving = !1
    }.bind(this))
},EPUBJS.Renderer.prototype.load = function (contents, url) {
    var deferred = new RSVP.defer;
    return this.layoutMethod = this.determineLayout(this.layoutSettings), this.layout = new EPUBJS.Layout[this.layoutMethod], this.visible(!1), this.render.load(contents, url).then(function (contents) {
        this.afterLoad(contents), this.beforeDisplay(function () {
            this.afterDisplay(), this.visible(!0), deferred.resolve(this)
        }.bind(this))
    }.bind(this)), deferred.promise
},EPUBJS.Renderer.prototype.afterLoad = function (contents) {
    this.currentChapter.setDocument(this.render.document), this.contents = contents, this.doc = this.render.document, this.formated = this.layout.format(contents, this.render.width, this.render.height, this.gap), this.render.setPageDimensions(this.formated.pageWidth, this.formated.pageHeight), this.initWidth || this.initHeight || this.render.window.addEventListener("resize", this.resized, !1), this.addEventListeners(), this.addSelectionListeners()
},EPUBJS.Renderer.prototype.afterDisplay = function (contents) {
    var pages = this.layout.calculatePages(), msg = this.currentChapter, queued = this._q.length();
    this._moving = !1, this.updatePages(pages), this.visibleRangeCfi = this.getVisibleRangeCfi(), this.currentLocationCfi = this.visibleRangeCfi.start, 0 === queued && (this.trigger("renderer:locationChanged", this.currentLocationCfi), this.trigger("renderer:visibleRangeChanged", this.visibleRangeCfi)), msg.cfi = this.currentLocationCfi, this.trigger("renderer:chapterDisplayed", msg)
},EPUBJS.Renderer.prototype.loaded = function (url) {
    this.trigger("render:loaded", url)
},EPUBJS.Renderer.prototype.reconcileLayoutSettings = function (global, chapter) {
    var settings = {};
    for (var attr in global)global.hasOwnProperty(attr) && (settings[attr] = global[attr]);
    return chapter.forEach(function (prop) {
        var property, value, rendition = prop.replace("rendition:", ""), split = rendition.indexOf("-");
        -1 != split && (property = rendition.slice(0, split), value = rendition.slice(split + 1), settings[property] = value)
    }), settings
},EPUBJS.Renderer.prototype.determineLayout = function (settings) {
    var spreads = this.determineSpreads(this.minSpreadWidth), layoutMethod = spreads ? "ReflowableSpreads" : "Reflowable", scroll = !1;
    return "pre-paginated" === settings.layout && (layoutMethod = "Fixed", scroll = !0, spreads = !1), "reflowable" === settings.layout && "none" === settings.spread && (layoutMethod = "Reflowable", scroll = !1, spreads = !1), "reflowable" === settings.layout && "both" === settings.spread && (layoutMethod = "ReflowableSpreads", scroll = !1, spreads = !0), this.spreads = spreads, this.render.scroll(scroll), this.trigger("renderer:spreads", spreads), layoutMethod
},EPUBJS.Renderer.prototype.beforeDisplay = function (callback, renderer) {
    this.triggerHooks("beforeChapterDisplay", callback, this)
},EPUBJS.Renderer.prototype.updatePages = function (layout) {
    this.pageMap = this.mapPage(), this.spreads ? this.displayedPages = Math.ceil(this.pageMap.length / 2) : this.displayedPages = this.pageMap.length, this.currentChapter.pages = this.pageMap.length, this._q.flush()
},EPUBJS.Renderer.prototype.reformat = function () {
    var pages, spreads, renderer = this;
    this.contents && (spreads = this.determineSpreads(this.minSpreadWidth), spreads != this.spreads && (this.spreads = spreads, this.layoutMethod = this.determineLayout(this.layoutSettings), this.layout = new EPUBJS.Layout[this.layoutMethod]), this.chapterPos = 1, this.render.page(this.chapterPos), renderer.formated = renderer.layout.format(renderer.render.docEl, renderer.render.width, renderer.render.height, renderer.gap), renderer.render.setPageDimensions(renderer.formated.pageWidth, renderer.formated.pageHeight), pages = renderer.layout.calculatePages(), renderer.updatePages(pages), renderer.currentLocationCfi && renderer.gotoCfi(renderer.currentLocationCfi))
},EPUBJS.Renderer.prototype.visible = function (bool) {
    return "undefined" == typeof bool ? this.element.style.visibility : void(bool !== !0 || this.hidden ? bool === !1 && (this.element.style.visibility = "hidden") : this.element.style.visibility = "visible")
},EPUBJS.Renderer.prototype.remove = function () {
    this.render.window && (this.render.unload(), this.render.window.removeEventListener("resize", this.resized), this.removeEventListeners(), this.removeSelectionListeners()), this.container.removeChild(this.element)
},EPUBJS.Renderer.prototype.applyStyles = function (styles) {
    for (var style in styles)this.render.setStyle(style, styles[style])
},EPUBJS.Renderer.prototype.setStyle = function (style, val, prefixed) {
    this.render.setStyle(style, val, prefixed)
},EPUBJS.Renderer.prototype.removeStyle = function (style) {
    this.render.removeStyle(style)
},EPUBJS.Renderer.prototype.applyHeadTags = function (headTags) {
    for (var headTag in headTags)this.render.addHeadTag(headTag, headTags[headTag])
},EPUBJS.Renderer.prototype.page = function (pg) {
    return this.pageMap ? pg >= 1 && pg <= this.displayedPages ? (this.chapterPos = pg, this.render.page(pg), this.visibleRangeCfi = this.getVisibleRangeCfi(), this.currentLocationCfi = this.visibleRangeCfi.start, this.trigger("renderer:locationChanged", this.currentLocationCfi), this.trigger("renderer:visibleRangeChanged", this.visibleRangeCfi), !0) : !1 : (console.warn("pageMap not set, queuing"), this._q.enqueue("page", arguments), !0)
},EPUBJS.Renderer.prototype.nextPage = function () {
    return this.page(this.chapterPos + 1)
},EPUBJS.Renderer.prototype.prevPage = function () {
    return this.page(this.chapterPos - 1)
},EPUBJS.Renderer.prototype.pageByElement = function (el) {
    var pg;
    el && (pg = this.render.getPageNumberByElement(el), this.page(pg))
},EPUBJS.Renderer.prototype.lastPage = function () {
    return this._moving ? this._q.enqueue("lastPage", arguments) : void this.page(this.displayedPages)
},EPUBJS.Renderer.prototype.firstPage = function () {
    return this._moving ? this._q.enqueue("firstPage", arguments) : void this.page(1)
},EPUBJS.Renderer.prototype.section = function (fragment) {
    var el = this.doc.getElementById(fragment);
    el && this.pageByElement(el)
},EPUBJS.Renderer.prototype.firstElementisTextNode = function (node) {
    var children = node.childNodes, leng = children.length;
    return !!(leng && children[0] && 3 === children[0].nodeType && children[0].textContent.trim().length)
},EPUBJS.Renderer.prototype.isGoodNode = function (node) {
    var embeddedElements = ["audio", "canvas", "embed", "iframe", "img", "math", "object", "svg", "video"];
    return -1 !== embeddedElements.indexOf(node.tagName.toLowerCase()) ? !0 : this.firstElementisTextNode(node)
},EPUBJS.Renderer.prototype.walk = function (node, x, y) {
    for (var r, children, leng, prevNode, startNode = node, stack = [startNode], STOP = 1e4, ITER = 0; !r && stack.length;) {
        if (node = stack.shift(), this.containsPoint(node, x, y) && this.isGoodNode(node) && (r = node), !r && node && node.childElementCount > 0) {
            if (children = node.children, !children || !children.length)return r;
            leng = children.length ? children.length : 0;
            for (var i = leng - 1; i >= 0; i--)children[i] != prevNode && stack.unshift(children[i])
        }
        if (!r && 0 === stack.length && startNode && null !== startNode.parentNode && (stack.push(startNode.parentNode), prevNode = startNode, startNode = startNode.parentNode), ITER++, ITER > STOP) {
            console.error("ENDLESS LOOP");
            break
        }
    }
    return r
},EPUBJS.Renderer.prototype.containsPoint = function (el, x, y) {
    var rect;
    return !!(el && "function" == typeof el.getBoundingClientRect && (rect = el.getBoundingClientRect(), 0 !== rect.width && 0 !== rect.height && rect.left >= x && x <= rect.left + rect.width))
},EPUBJS.Renderer.prototype.textSprint = function (root, func) {
    var treeWalker, node, filterEmpty = function (node) {
        return /^\s*$/.test(node.data) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    };
    try {
        for (treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode: filterEmpty}, !1); node = treeWalker.nextNode();)func(node)
    } catch (e) {
        for (treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, filterEmpty, !1); node = treeWalker.nextNode();)func(node)
    }
},EPUBJS.Renderer.prototype.sprint = function (root, func) {
    for (var node, treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, null, !1); node = treeWalker.nextNode();)func(node)
},EPUBJS.Renderer.prototype.mapPage = function () {
    var prevRange, prevRanges, cfi, prevElement, startRange, endRange, startCfi, endCfi, renderer = this, map = [], root = this.render.getBaseElement(), page = 1, width = this.layout.colWidth + this.layout.gap, offset = this.formated.pageWidth * (this.chapterPos - 1), limit = width * page - offset, elLimit = 0, check = function (node) {
        var elPos, elRange, found;
        if (node.nodeType == Node.TEXT_NODE) {
            if (elRange = document.createRange(), elRange.selectNodeContents(node), elPos = elRange.getBoundingClientRect(), !elPos || 0 === elPos.width && 0 === elPos.height)return;
            elPos.left > elLimit && (found = checkText(node)), elPos.right > elLimit && (found = checkText(node)), prevElement = node, found && (prevRange = null)
        }
    }, checkText = function (node) {
        var result, ranges = renderer.splitTextNodeIntoWordsRanges(node);
        return ranges.forEach(function (range) {
            var pos = range.getBoundingClientRect();
            !pos || 0 === pos.width && 0 === pos.height || (pos.left + pos.width < limit ? map[page - 1] || (range.collapse(!0), cfi = renderer.currentChapter.cfiFromRange(range), result = map.push({
                start: cfi,
                end: null
            })) : (!prevRange && prevElement && (prevRanges = renderer.splitTextNodeIntoWordsRanges(prevElement), prevRange = prevRanges[prevRanges.length - 1]), prevRange && (prevRange.collapse(!1), cfi = renderer.currentChapter.cfiFromRange(prevRange), map[map.length - 1].end = cfi), range.collapse(!0), cfi = renderer.currentChapter.cfiFromRange(range), result = map.push({
                start: cfi,
                end: null
            }), page += 1, limit = width * page - offset, elLimit = limit), prevRange = range)
        }), result
    }, docEl = this.render.getDocumentElement(), dir = docEl.dir;
    return "rtl" == dir && (docEl.dir = "ltr", docEl.style.position = "static"), this.textSprint(root, check), "rtl" == dir && (docEl.dir = dir, docEl.style.left = "auto", docEl.style.right = "0"), !prevRange && prevElement && (prevRanges = renderer.splitTextNodeIntoWordsRanges(prevElement), prevRange = prevRanges[prevRanges.length - 1]), prevRange && (prevRange.collapse(!1), cfi = renderer.currentChapter.cfiFromRange(prevRange), map[map.length - 1].end = cfi), map.length || (startRange = this.doc.createRange(), startRange.selectNodeContents(root), startRange.collapse(!0), startCfi = renderer.currentChapter.cfiFromRange(startRange), endRange = this.doc.createRange(), endRange.selectNodeContents(root), endRange.collapse(!1), endCfi = renderer.currentChapter.cfiFromRange(endRange), map.push({
        start: startCfi,
        end: endCfi
    })), prevRange = null, prevRanges = void 0, startRange = null, endRange = null, root = null, map
},EPUBJS.Renderer.prototype.indexOfBreakableChar = function (text, startPosition) {
    var whiteCharacters = "- 	\r\n\b\f";
    startPosition || (startPosition = 0);
    for (var i = startPosition; i < text.length; i++)if (-1 != whiteCharacters.indexOf(text.charAt(i)))return i;
    return -1
},EPUBJS.Renderer.prototype.splitTextNodeIntoWordsRanges = function (node) {
    var range, ranges = [], text = node.textContent.trim(), pos = this.indexOfBreakableChar(text);
    if (-1 === pos)return range = this.doc.createRange(), range.selectNodeContents(node), [range];
    for (range = this.doc.createRange(), range.setStart(node, 0), range.setEnd(node, pos), ranges.push(range), range = this.doc.createRange(), range.setStart(node, pos + 1); -1 != pos;)pos = this.indexOfBreakableChar(text, pos + 1), pos > 0 && (range && (range.setEnd(node, pos), ranges.push(range)), range = this.doc.createRange(), range.setStart(node, pos + 1));
    return range && (range.setEnd(node, text.length), ranges.push(range)), ranges
},EPUBJS.Renderer.prototype.rangePosition = function (range) {
    var rect, list;
    return list = range.getClientRects(), list.length ? rect = list[0] : null
},EPUBJS.Renderer.prototype.getPageCfi = function () {
    var pg = 2 * this.chapterPos - 1;
    return this.pageMap[pg].start
},EPUBJS.Renderer.prototype.getRange = function (x, y, forceElement) {
    var position, range = this.doc.createRange();
    return forceElement = !0, "undefined" == typeof document.caretPositionFromPoint || forceElement ? "undefined" == typeof document.caretRangeFromPoint || forceElement ? (this.visibileEl = this.findElementAfter(x, y), range.setStart(this.visibileEl, 1)) : range = this.doc.caretRangeFromPoint(x, y) : (position = this.doc.caretPositionFromPoint(x, y), range.setStart(position.offsetNode, position.offset)), range
},EPUBJS.Renderer.prototype.pagesInCurrentChapter = function () {
    var pgs, length;
    return this.pageMap ? (length = this.pageMap.length, pgs = this.spreads ? Math.ceil(length / 2) : length) : (console.warn("page map not loaded"), !1)
},EPUBJS.Renderer.prototype.currentRenderedPage = function () {
    var pg;
    return this.pageMap ? pg = this.spreads && this.pageMap.length > 1 ? 2 * this.chapterPos : this.chapterPos : (console.warn("page map not loaded"), !1)
},EPUBJS.Renderer.prototype.getRenderedPagesLeft = function () {
    var pg, lastPage, pagesLeft;
    return this.pageMap ? (lastPage = this.pageMap.length, pg = this.spreads ? 2 * this.chapterPos : this.chapterPos, pagesLeft = lastPage - pg) : (console.warn("page map not loaded"), !1)
},EPUBJS.Renderer.prototype.getVisibleRangeCfi = function () {
    var pg, startRange, endRange;
    return this.pageMap ? (this.spreads ? (pg = 2 * this.chapterPos, startRange = this.pageMap[pg - 2], endRange = startRange, this.pageMap.length > 1 && this.pageMap.length > pg - 1 && (endRange = this.pageMap[pg - 1])) : (pg = this.chapterPos, startRange = this.pageMap[pg - 1], endRange = startRange), startRange || (console.warn("page range miss:", pg, this.pageMap), startRange = this.pageMap[this.pageMap.length - 1], endRange = startRange), {
        start: startRange.start,
        end: endRange.end
    }) : (console.warn("page map not loaded"), !1)
},EPUBJS.Renderer.prototype.gotoCfi = function (cfi) {
    var pg, marker, range;
    if (this._moving)return this._q.enqueue("gotoCfi", arguments);
    if (EPUBJS.core.isString(cfi) && (cfi = this.epubcfi.parse(cfi)), "undefined" == typeof document.evaluate)marker = this.epubcfi.addMarker(cfi, this.doc), marker && (pg = this.render.getPageNumberByElement(marker), this.epubcfi.removeMarker(marker, this.doc), this.page(pg)); else if (range = this.epubcfi.generateRangeFromCfi(cfi, this.doc)) {
        var rect = range.getBoundingClientRect();
        pg = rect ? this.render.getPageNumberByRect(rect) : 1, this.page(pg), this.currentLocationCfi = cfi.str
    } else this.page(1)
},EPUBJS.Renderer.prototype.findFirstVisible = function (startEl) {
    var found, el = startEl || this.render.getBaseElement();
    return found = this.walk(el, 0, 0), found ? found : startEl
},EPUBJS.Renderer.prototype.findElementAfter = function (x, y, startEl) {
    var found, el = startEl || this.render.getBaseElement();
    return found = this.walk(el, x, y), found ? found : el
},EPUBJS.Renderer.prototype.resize = function (width, height, setSize) {
    this.width = width, this.height = height, setSize !== !1 && this.render.resize(this.width, this.height), this.contents && this.reformat(), this.trigger("renderer:resized", {
        width: this.width,
        height: this.height
    })
},EPUBJS.Renderer.prototype.onResized = function (e) {
    var width = this.container.clientWidth, height = this.container.clientHeight;
    this.resize(width, height, !1)
},EPUBJS.Renderer.prototype.addEventListeners = function () {
    this.render.document && this.listenedEvents.forEach(function (eventName) {
        this.render.document.addEventListener(eventName, this.triggerEvent.bind(this), !1)
    }, this)
},EPUBJS.Renderer.prototype.removeEventListeners = function () {
    this.render.document && this.listenedEvents.forEach(function (eventName) {
        this.render.document.removeEventListener(eventName, this.triggerEvent, !1)
    }, this)
},EPUBJS.Renderer.prototype.triggerEvent = function (e) {
    this.trigger("renderer:" + e.type, e)
},EPUBJS.Renderer.prototype.addSelectionListeners = function () {
    this.render.document.addEventListener("selectionchange", this.onSelectionChange.bind(this), !1)
},EPUBJS.Renderer.prototype.removeSelectionListeners = function () {
    this.render.document && this.doc.removeEventListener("selectionchange", this.onSelectionChange, !1)
},EPUBJS.Renderer.prototype.onSelectionChange = function (e) {
    this.selectionEndTimeout && clearTimeout(this.selectionEndTimeout), this.selectionEndTimeout = setTimeout(function () {
        this.selectedRange = this.render.window.getSelection(), this.trigger("renderer:selected", this.selectedRange)
    }.bind(this), 500)
},EPUBJS.Renderer.prototype.setMinSpreadWidth = function (width) {
    this.minSpreadWidth = width, this.spreads = this.determineSpreads(width)
},EPUBJS.Renderer.prototype.determineSpreads = function (cutoff) {
    return !(this.isForcedSingle || !cutoff || this.width < cutoff)
},EPUBJS.Renderer.prototype.forceSingle = function (bool) {
    bool ? this.isForcedSingle = !0 : this.isForcedSingle = !1
},EPUBJS.Renderer.prototype.setGap = function (gap) {
    this.gap = gap
},EPUBJS.Renderer.prototype.setDirection = function (direction) {
    this.direction = direction, this.render.setDirection(this.direction)
},EPUBJS.Renderer.prototype.replace = function (query, func, finished, progress) {
    var items = this.contents.querySelectorAll(query), resources = Array.prototype.slice.call(items), count = resources.length;
    return 0 === count ? void finished(!1) : void resources.forEach(function (item) {
        var called = !1, after = function (result, full) {
            called === !1 && (count--, progress && progress(result, full, count), 0 >= count && finished && finished(!0), called = !0)
        };
        func(item, after)
    }.bind(this))
},RSVP.EventTarget.mixin(EPUBJS.Renderer.prototype);
var EPUBJS = EPUBJS || {};
EPUBJS.replace = {}, EPUBJS.replace.hrefs = function (callback, renderer) {
    var book = this, replacments = function (link, done) {
        var directory, relative, base, uri, url, href = link.getAttribute("href"), isRelative = href.search("://");
        -1 != isRelative ? link.setAttribute("target", "_blank") : (base = renderer.render.docEl.querySelector("base"), url = base.getAttribute("href"), uri = EPUBJS.core.uri(url), directory = uri.directory, relative = directory ? "file" === uri.protocol ? EPUBJS.core.resolveUrl(uri.base, href) : EPUBJS.core.resolveUrl(directory, href) : href, link.onclick = function () {
            return book["goto"](relative), !1
        }), done()
    };
    renderer.replace("a[href]", replacments, callback)
}, EPUBJS.replace.head = function (callback, renderer) {
    renderer.replaceWithStored("link[href]", "href", EPUBJS.replace.links, callback)
}, EPUBJS.replace.resources = function (callback, renderer) {
    renderer.replaceWithStored("[src]", "src", EPUBJS.replace.srcs, callback)
}, EPUBJS.replace.svg = function (callback, renderer) {
    renderer.replaceWithStored("svg image", "xlink:href", function (_store, full, done) {
        _store.getUrl(full).then(done)
    }, callback)
}, EPUBJS.replace.srcs = function (_store, full, done) {
    _store.getUrl(full).then(done)
}, EPUBJS.replace.links = function (_store, full, done, link) {
    "stylesheet" === link.getAttribute("rel") ? EPUBJS.replace.stylesheets(_store, full).then(function (url, full) {
        done(url, full)
    }, function (reason) {
        done(null)
    }) : _store.getUrl(full).then(done, function (reason) {
        done(null)
    })
}, EPUBJS.replace.stylesheets = function (_store, full) {
    var deferred = new RSVP.defer;
    if (_store)return _store.getText(full).then(function (text) {
        EPUBJS.replace.cssUrls(_store, full, text).then(function (newText) {
            var _URL = window.URL || window.webkitURL || window.mozURL, blob = new Blob([newText], {type: "text/css"}), url = _URL.createObjectURL(blob);
            deferred.resolve(url)
        }, function (reason) {
            deferred.reject(reason)
        })
    }, function (reason) {
        deferred.reject(reason)
    }), deferred.promise
}, EPUBJS.replace.cssUrls = function (_store, base, text) {
    var deferred = new RSVP.defer, promises = [], matches = text.match(/url\(\'?\"?((?!data:)[^\'|^\"^\)]*)\'?\"?\)/g);
    if (_store)return matches ? (matches.forEach(function (str) {
        var full = EPUBJS.core.resolveUrl(base, str.replace(/url\(|[|\)|\'|\"]|\?.*$/g, "")), replaced = _store.getUrl(full).then(function (url) {
            text = text.replace(str, 'url("' + url + '")')
        }, function (reason) {
            deferred.reject(reason)
        });
        promises.push(replaced)
    }), RSVP.all(promises).then(function () {
        deferred.resolve(text)
    }), deferred.promise) : (deferred.resolve(text), deferred.promise)
}, EPUBJS.Storage = function (withCredentials) {
    this.checkRequirements(), this.urlCache = {}, this.withCredentials = withCredentials, this.URL = window.URL || window.webkitURL || window.mozURL, this.offline = !1
}, EPUBJS.Storage.prototype.checkRequirements = function (callback) {
    "undefined" == typeof localforage && console.error("localForage library not loaded")
}, EPUBJS.Storage.prototype.put = function (assets, store) {
    var deferred = new RSVP.defer, count = assets.length, current = 0, next = function (deferred) {
        var url, encodedUrl, done = deferred || new RSVP.defer;
        return current >= count ? done.resolve() : (url = assets[current].url, encodedUrl = window.encodeURIComponent(url), EPUBJS.core.request(url, "binary").then(function (data) {
            return localforage.setItem(encodedUrl, data)
        }).then(function (data) {
            current++, setTimeout(function () {
                next(done)
            }, 1)
        })), done.promise
    }.bind(this);
    return Array.isArray(assets) || (assets = [assets]), next().then(function () {
        deferred.resolve()
    }.bind(this)), deferred.promise
}, EPUBJS.Storage.prototype.token = function (url, value) {
    var encodedUrl = window.encodeURIComponent(url);
    return localforage.setItem(encodedUrl, value).then(function (result) {
        return null !== result
    })
}, EPUBJS.Storage.prototype.isStored = function (url) {
    var encodedUrl = window.encodeURIComponent(url);
    return localforage.getItem(encodedUrl).then(function (result) {
        return null !== result
    })
}, EPUBJS.Storage.prototype.getText = function (url) {
    var encodedUrl = window.encodeURIComponent(url);
    return EPUBJS.core.request(url, "arraybuffer", this.withCredentials).then(function (buffer) {
        return this.offline && (this.offline = !1, this.trigger("offline", !1)), localforage.setItem(encodedUrl, buffer), buffer
    }.bind(this)).then(function (data) {
        var deferred = new RSVP.defer, mimeType = EPUBJS.core.getMimeType(url), blob = new Blob([data], {type: mimeType}), reader = new FileReader;
        return reader.addEventListener("loadend", function () {
            deferred.resolve(reader.result)
        }), reader.readAsText(blob, mimeType), deferred.promise
    })["catch"](function () {
        var deferred = new RSVP.defer, entry = localforage.getItem(encodedUrl);
        return this.offline || (this.offline = !0, this.trigger("offline", !0)), entry ? (entry.then(function (data) {
            var mimeType = EPUBJS.core.getMimeType(url), blob = new Blob([data], {type: mimeType}), reader = new FileReader;
            reader.addEventListener("loadend", function () {
                deferred.resolve(reader.result)
            }), reader.readAsText(blob, mimeType)
        }), deferred.promise) : (deferred.reject({
            message: "File not found in the storage: " + url,
            stack: (new Error).stack
        }), deferred.promise)
    }.bind(this))
}, EPUBJS.Storage.prototype.getUrl = function (url) {
    var encodedUrl = window.encodeURIComponent(url);
    return EPUBJS.core.request(url, "arraybuffer", this.withCredentials).then(function (buffer) {
        return this.offline && (this.offline = !1, this.trigger("offline", !1)), localforage.setItem(encodedUrl, buffer), url
    }.bind(this))["catch"](function () {
        var entry, tempUrl, deferred = new RSVP.defer, _URL = window.URL || window.webkitURL || window.mozURL;
        return this.offline || (this.offline = !0, this.trigger("offline", !0)), encodedUrl in this.urlCache ? (deferred.resolve(this.urlCache[encodedUrl]), deferred.promise) : (entry = localforage.getItem(encodedUrl)) ? (entry.then(function (data) {
            var blob = new Blob([data], {type: EPUBJS.core.getMimeType(url)});
            tempUrl = _URL.createObjectURL(blob), deferred.resolve(tempUrl), this.urlCache[encodedUrl] = tempUrl
        }.bind(this)), deferred.promise) : (deferred.reject({
            message: "File not found in the storage: " + url,
            stack: (new Error).stack
        }), deferred.promise)
    }.bind(this))
}, EPUBJS.Storage.prototype.getXml = function (url) {
    var encodedUrl = window.encodeURIComponent(url);
    return EPUBJS.core.request(url, "arraybuffer", this.withCredentials).then(function (buffer) {
        return this.offline && (this.offline = !1, this.trigger("offline", !1)), localforage.setItem(encodedUrl, buffer), buffer
    }.bind(this)).then(function (data) {
        var deferred = new RSVP.defer, mimeType = EPUBJS.core.getMimeType(url), blob = new Blob([data], {type: mimeType}), reader = new FileReader;
        return reader.addEventListener("loadend", function () {
            var parser = new DOMParser, doc = parser.parseFromString(reader.result, "text/xml");
            deferred.resolve(doc)
        }), reader.readAsText(blob, mimeType), deferred.promise
    })["catch"](function () {
        var deferred = new RSVP.defer, entry = localforage.getItem(encodedUrl);
        return this.offline || (this.offline = !0, this.trigger("offline", !0)), entry ? (entry.then(function (data) {
            var mimeType = EPUBJS.core.getMimeType(url), blob = new Blob([data], {type: mimeType}), reader = new FileReader;
            reader.addEventListener("loadend", function () {
                var parser = new DOMParser, doc = parser.parseFromString(reader.result, "text/xml");
                deferred.resolve(doc);
            }), reader.readAsText(blob, mimeType)
        }), deferred.promise) : (deferred.reject({
            message: "File not found in the storage: " + url,
            stack: (new Error).stack
        }), deferred.promise)
    }.bind(this))
}, EPUBJS.Storage.prototype.revokeUrl = function (url) {
    var _URL = window.URL || window.webkitURL || window.mozURL, fromCache = this.urlCache[url];
    fromCache && _URL.revokeObjectURL(fromCache)
}, EPUBJS.Storage.prototype.failed = function (error) {
    console.error(error)
}, RSVP.EventTarget.mixin(EPUBJS.Storage.prototype), EPUBJS.Unarchiver = function (url) {
    this.checkRequirements(), this.urlCache = {}
}, EPUBJS.Unarchiver.prototype.checkRequirements = function (callback) {
    "undefined" == typeof JSZip && console.error("JSZip lib not loaded")
}, EPUBJS.Unarchiver.prototype.open = function (zipUrl, callback) {
    if (zipUrl instanceof ArrayBuffer) {
        this.zip = new JSZip(zipUrl);
        var deferred = new RSVP.defer;
        return deferred.resolve(), deferred.promise
    }
    return EPUBJS.core.request(zipUrl, "binary").then(function (data) {
        this.zip = new JSZip(data)
    }.bind(this))
}, EPUBJS.Unarchiver.prototype.getXml = function (url, encoding) {
    var decodededUrl = window.decodeURIComponent(url);
    return this.getText(decodededUrl, encoding).then(function (text) {
        var parser = new DOMParser, mimeType = EPUBJS.core.getMimeType(url);
        return parser.parseFromString(text, mimeType)
    })
}, EPUBJS.Unarchiver.prototype.getUrl = function (url, mime) {
    var tempUrl, blob, unarchiver = this, deferred = new RSVP.defer, decodededUrl = window.decodeURIComponent(url), entry = this.zip.file(decodededUrl), _URL = window.URL || window.webkitURL || window.mozURL;
    return entry ? url in this.urlCache ? (deferred.resolve(this.urlCache[url]), deferred.promise) : (blob = new Blob([entry.asUint8Array()], {type: EPUBJS.core.getMimeType(entry.name)}), tempUrl = _URL.createObjectURL(blob), deferred.resolve(tempUrl), unarchiver.urlCache[url] = tempUrl, deferred.promise) : (deferred.reject({
        message: "File not found in the epub: " + url,
        stack: (new Error).stack
    }), deferred.promise)
}, EPUBJS.Unarchiver.prototype.getText = function (url, encoding) {
    var text, deferred = new RSVP.defer, decodededUrl = window.decodeURIComponent(url), entry = this.zip.file(decodededUrl);
    return entry ? (text = entry.asText(), deferred.resolve(text), deferred.promise) : (deferred.reject({
        message: "File not found in the epub: " + url,
        stack: (new Error).stack
    }), deferred.promise)
}, EPUBJS.Unarchiver.prototype.revokeUrl = function (url) {
    var _URL = window.URL || window.webkitURL || window.mozURL, fromCache = this.urlCache[url];
    fromCache && _URL.revokeObjectURL(fromCache)
}, EPUBJS.Unarchiver.prototype.failed = function (error) {
    console.error(error)
}, EPUBJS.Unarchiver.prototype.afterSaved = function (error) {
    this.callback()
}, EPUBJS.Unarchiver.prototype.toStorage = function (entries) {
    function callback() {
        count--, 0 === count && that.afterSaved()
    }

    var timeout = 0, delay = 20, that = this, count = entries.length;
    entries.forEach(function (entry) {
        setTimeout(function (entry) {
            that.saveEntryFileToStorage(entry, callback)
        }, timeout, entry), timeout += delay
    }), console.log("time", timeout)
}, function () {
    "use strict";
    var table = {
        application: {
            ecmascript: ["es", "ecma"],
            javascript: "js",
            ogg: "ogx",
            pdf: "pdf",
            postscript: ["ps", "ai", "eps", "epsi", "epsf", "eps2", "eps3"],
            "rdf+xml": "rdf",
            smil: ["smi", "smil"],
            "xhtml+xml": ["xhtml", "xht"],
            xml: ["xml", "xsl", "xsd", "opf", "ncx"],
            zip: "zip",
            "x-httpd-eruby": "rhtml",
            "x-latex": "latex",
            "x-maker": ["frm", "maker", "frame", "fm", "fb", "book", "fbdoc"],
            "x-object": "o",
            "x-shockwave-flash": ["swf", "swfl"],
            "x-silverlight": "scr",
            "epub+zip": "epub",
            "font-tdpfr": "pfr",
            "inkml+xml": ["ink", "inkml"],
            json: "json",
            "jsonml+json": "jsonml",
            "mathml+xml": "mathml",
            "metalink+xml": "metalink",
            mp4: "mp4s",
            "omdoc+xml": "omdoc",
            oxps: "oxps",
            "vnd.amazon.ebook": "azw",
            widget: "wgt",
            "x-dtbook+xml": "dtb",
            "x-dtbresource+xml": "res",
            "x-font-bdf": "bdf",
            "x-font-ghostscript": "gsf",
            "x-font-linux-psf": "psf",
            "x-font-otf": "otf",
            "x-font-pcf": "pcf",
            "x-font-snf": "snf",
            "x-font-ttf": ["ttf", "ttc"],
            "x-font-type1": ["pfa", "pfb", "pfm", "afm"],
            "x-font-woff": "woff",
            "x-mobipocket-ebook": ["prc", "mobi"],
            "x-mspublisher": "pub",
            "x-nzb": "nzb",
            "x-tgif": "obj",
            "xaml+xml": "xaml",
            "xml-dtd": "dtd",
            "xproc+xml": "xpl",
            "xslt+xml": "xslt",
            "internet-property-stream": "acx",
            "x-compress": "z",
            "x-compressed": "tgz",
            "x-gzip": "gz"
        },
        audio: {
            flac: "flac",
            midi: ["mid", "midi", "kar", "rmi"],
            mpeg: ["mpga", "mpega", "mp2", "mp3", "m4a", "mp2a", "m2a", "m3a"],
            mpegurl: "m3u",
            ogg: ["oga", "ogg", "spx"],
            "x-aiff": ["aif", "aiff", "aifc"],
            "x-ms-wma": "wma",
            "x-wav": "wav",
            adpcm: "adp",
            mp4: "mp4a",
            webm: "weba",
            "x-aac": "aac",
            "x-caf": "caf",
            "x-matroska": "mka",
            "x-pn-realaudio-plugin": "rmp",
            xm: "xm",
            mid: ["mid", "rmi"]
        },
        image: {
            gif: "gif",
            ief: "ief",
            jpeg: ["jpeg", "jpg", "jpe"],
            pcx: "pcx",
            png: "png",
            "svg+xml": ["svg", "svgz"],
            tiff: ["tiff", "tif"],
            "x-icon": "ico",
            bmp: "bmp",
            webp: "webp",
            "x-pict": ["pic", "pct"],
            "x-tga": "tga",
            "cis-cod": "cod"
        },
        message: {rfc822: ["eml", "mime", "mht", "mhtml", "nws"]},
        text: {
            "cache-manifest": ["manifest", "appcache"],
            calendar: ["ics", "icz", "ifb"],
            css: "css",
            csv: "csv",
            h323: "323",
            html: ["html", "htm", "shtml", "stm"],
            iuls: "uls",
            mathml: "mml",
            plain: ["txt", "text", "brf", "conf", "def", "list", "log", "in", "bas"],
            richtext: "rtx",
            "tab-separated-values": "tsv",
            "x-bibtex": "bib",
            "x-dsrc": "d",
            "x-diff": ["diff", "patch"],
            "x-haskell": "hs",
            "x-java": "java",
            "x-literate-haskell": "lhs",
            "x-moc": "moc",
            "x-pascal": ["p", "pas"],
            "x-pcs-gcd": "gcd",
            "x-perl": ["pl", "pm"],
            "x-python": "py",
            "x-scala": "scala",
            "x-setext": "etx",
            "x-tcl": ["tcl", "tk"],
            "x-tex": ["tex", "ltx", "sty", "cls"],
            "x-vcard": "vcf",
            sgml: ["sgml", "sgm"],
            "x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
            "x-fortran": ["f", "for", "f77", "f90"],
            "x-opml": "opml",
            "x-nfo": "nfo",
            "x-sfv": "sfv",
            "x-uuencode": "uu",
            webviewhtml: "htt"
        },
        video: {
            mpeg: ["mpeg", "mpg", "mpe", "m1v", "m2v", "mp2", "mpa", "mpv2"],
            mp4: ["mp4", "mp4v", "mpg4"],
            quicktime: ["qt", "mov"],
            ogg: "ogv",
            "vnd.mpegurl": ["mxu", "m4u"],
            "x-flv": "flv",
            "x-la-asf": ["lsf", "lsx"],
            "x-mng": "mng",
            "x-ms-asf": ["asf", "asx", "asr"],
            "x-ms-wm": "wm",
            "x-ms-wmv": "wmv",
            "x-ms-wmx": "wmx",
            "x-ms-wvx": "wvx",
            "x-msvideo": "avi",
            "x-sgi-movie": "movie",
            "x-matroska": ["mpv", "mkv", "mk3d", "mks"],
            "3gpp2": "3g2",
            h261: "h261",
            h263: "h263",
            h264: "h264",
            jpeg: "jpgv",
            jpm: ["jpm", "jpgm"],
            mj2: ["mj2", "mjp2"],
            "vnd.ms-playready.media.pyv": "pyv",
            "vnd.uvvu.mp4": ["uvu", "uvvu"],
            "vnd.vivo": "viv",
            webm: "webm",
            "x-f4v": "f4v",
            "x-m4v": "m4v",
            "x-ms-vob": "vob",
            "x-smv": "smv"
        }
    }, mimeTypes = function () {
        var type, subtype, val, index, mimeTypes = {};
        for (type in table)if (table.hasOwnProperty(type))for (subtype in table[type])if (table[type].hasOwnProperty(subtype))if (val = table[type][subtype], "string" == typeof val)mimeTypes[val] = type + "/" + subtype; else for (index = 0; index < val.length; index++)mimeTypes[val[index]] = type + "/" + subtype;
        return mimeTypes
    }();
    EPUBJS.core.getMimeType = function (filename) {
        var defaultValue = "text/plain";
        return filename && mimeTypes[filename.split(".").pop().toLowerCase()] || defaultValue
    }
}(), function () {
    var h, aa = aa || {}, k = this, ba = function () {
    }, ca = function (a) {
        var b = typeof a;
        if ("object" == b) {
            if (!a)return "null";
            if (a instanceof Array)return "array";
            if (a instanceof Object)return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c)return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))return "function"
        } else if ("function" == b && "undefined" == typeof a.call)return "object";
        return b
    }, m = function (a) {
        return "array" == ca(a)
    }, da = function (a) {
        var b = ca(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }, n = function (a) {
        return "string" == typeof a
    }, p = function (a) {
        return "function" == ca(a)
    }, ea = function (a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }, fa = function (a, b, c) {
        return a.call.apply(a.bind, arguments)
    }, ga = function (a, b, c) {
        if (!a)throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                return Array.prototype.unshift.apply(c, d), a.apply(b, c)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }, q = function (a, b, c) {
        return q = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? fa : ga, q.apply(null, arguments)
    }, ha = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var b = c.slice();
            return b.push.apply(b, arguments), a.apply(this, b)
        }
    }, r = Date.now || function () {
            return +new Date
        }, s = function (a, b) {
        var c = a.split("."), d = k;
        c[0] in d || !d.execScript || d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());)c.length || void 0 === b ? d = d[e] ? d[e] : d[e] = {} : d[e] = b
    }, t = function (a, b) {
        function c() {
        }

        c.prototype = b.prototype, a.J = b.prototype, a.prototype = new c, a.ic = function (a, c, f) {
            return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2))
        }
    };
    Function.prototype.bind = Function.prototype.bind || function (a, b) {
            if (1 < arguments.length) {
                var c = Array.prototype.slice.call(arguments, 1);
                return c.unshift(this, a), q.apply(null, c)
            }
            return q(this, a)
        };
    var u = function (a) {
        if (Error.captureStackTrace)Error.captureStackTrace(this, u); else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    };
    t(u, Error), u.prototype.name = "CustomError";
    var ia = function (a, b) {
        return b > a ? -1 : a > b ? 1 : 0
    }, v = Array.prototype, ja = v.indexOf ? function (a, b, c) {
        return v.indexOf.call(a, b, c)
    } : function (a, b, c) {
        if (c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c, n(a))return n(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)if (c in a && a[c] === b)return c;
        return -1
    }, ka = v.forEach ? function (a, b, c) {
        v.forEach.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = n(a) ? a.split("") : a, f = 0; d > f; f++)f in e && b.call(c, e[f], f, a)
    }, la = v.some ? function (a, b, c) {
        return v.some.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = n(a) ? a.split("") : a, f = 0; d > f; f++)if (f in e && b.call(c, e[f], f, a))return !0;
        return !1
    }, na = function (a) {
        var b;
        t:{
            b = ma;
            for (var c = a.length, d = n(a) ? a.split("") : a, e = 0; c > e; e++)if (e in d && b.call(void 0, d[e], e, a)) {
                b = e;
                break t
            }
            b = -1
        }
        return 0 > b ? null : n(a) ? a.charAt(b) : a[b]
    }, oa = function (a, b) {
        var d, c = ja(a, b);
        return (d = c >= 0) && v.splice.call(a, c, 1), d
    }, pa = function (a) {
        return v.concat.apply(v, arguments)
    }, qa = function (a) {
        var b = a.length;
        if (b > 0) {
            for (var c = Array(b), d = 0; b > d; d++)c[d] = a[d];
            return c
        }
        return []
    }, ra = "StopIteration" in k ? k.StopIteration : Error("StopIteration"), sa = function () {
    };
    sa.prototype.next = function () {
        throw ra
    }, sa.prototype.Tb = function () {
        return this
    };
    var ta = function (a, b, c) {
        for (var d in a)b.call(c, a[d], d, a)
    }, ua = function (a) {
        var d, b = [], c = 0;
        for (d in a)b[c++] = a[d];
        return b
    }, va = function (a) {
        var d, b = [], c = 0;
        for (d in a)b[c++] = d;
        return b
    }, wa = function (a, b) {
        var c;
        t:{
            for (c in a)if (b.call(void 0, a[c], c, a))break t;
            c = void 0
        }
        return c && a[c]
    }, xa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), ya = function (a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)a[c] = d[c];
            for (var f = 0; f < xa.length; f++)c = xa[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }, w = function (a, b) {
        this.o = {}, this.b = [], this.ea = this.g = 0;
        var c = arguments.length;
        if (c > 1) {
            if (c % 2)throw Error("Uneven number of arguments");
            for (var d = 0; c > d; d += 2)this.set(arguments[d], arguments[d + 1])
        } else a && this.Aa(a)
    };
    w.prototype.q = function () {
        za(this);
        for (var a = [], b = 0; b < this.b.length; b++)a.push(this.o[this.b[b]]);
        return a
    }, w.prototype.C = function () {
        return za(this), this.b.concat()
    }, w.prototype.Q = function (a) {
        return x(this.o, a)
    }, w.prototype.remove = function (a) {
        return x(this.o, a) ? (delete this.o[a], this.g--, this.ea++, this.b.length > 2 * this.g && za(this), !0) : !1
    };
    var za = function (a) {
        if (a.g != a.b.length) {
            for (var b = 0, c = 0; b < a.b.length;) {
                var d = a.b[b];
                x(a.o, d) && (a.b[c++] = d), b++
            }
            a.b.length = c
        }
        if (a.g != a.b.length) {
            for (var e = {}, c = b = 0; b < a.b.length;)d = a.b[b], x(e, d) || (a.b[c++] = d, e[d] = 1), b++;
            a.b.length = c
        }
    };
    h = w.prototype, h.get = function (a, b) {
        return x(this.o, a) ? this.o[a] : b
    }, h.set = function (a, b) {
        x(this.o, a) || (this.g++, this.b.push(a), this.ea++), this.o[a] = b
    }, h.Aa = function (a) {
        var b;
        a instanceof w ? (b = a.C(), a = a.q()) : (b = va(a), a = ua(a));
        for (var c = 0; c < b.length; c++)this.set(b[c], a[c])
    }, h.B = function () {
        return new w(this)
    }, h.jb = function () {
        za(this);
        for (var a = {}, b = 0; b < this.b.length; b++) {
            var c = this.b[b];
            a[c] = this.o[c]
        }
        return a
    }, h.Tb = function (a) {
        za(this);
        var b = 0, c = this.b, d = this.o, e = this.ea, f = this, g = new sa;
        return g.next = function () {
            for (; ;) {
                if (e != f.ea)throw Error("The map has changed since the iterator was created");
                if (b >= c.length)throw ra;
                var g = c[b++];
                return a ? g : d[g]
            }
        }, g
    };
    var x = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }, Aa = {
        id: "hitType",
        name: "t",
        valueType: "text",
        maxLength: void 0,
        defaultValue: void 0
    }, Ba = {
        id: "sessionControl",
        name: "sc",
        valueType: "text",
        maxLength: void 0,
        defaultValue: void 0
    }, Ca = {id: "description", name: "cd", valueType: "text", maxLength: 2048, defaultValue: void 0}, Da = {
        Jc: Aa,
        jc: {id: "anonymizeIp", name: "aip", valueType: "boolean", maxLength: void 0, defaultValue: void 0},
        Vc: {id: "queueTime", name: "qt", valueType: "integer", maxLength: void 0, defaultValue: void 0},
        pc: {id: "cacheBuster", name: "z", valueType: "text", maxLength: void 0, defaultValue: void 0},
        $c: Ba,
        Sc: {id: "nonInteraction", name: "ni", valueType: "boolean", maxLength: void 0, defaultValue: void 0},
        zc: Ca,
        jd: {id: "title", name: "dt", valueType: "text", maxLength: 1500, defaultValue: void 0},
        Ac: {id: "dimension", name: "cd[1-9][0-9]*", valueType: "text", maxLength: 150, defaultValue: void 0},
        Rc: {id: "metric", name: "cm[1-9][0-9]*", valueType: "integer", maxLength: void 0, defaultValue: void 0},
        lc: {id: "appId", name: "aid", valueType: "text", maxLength: 150, defaultValue: void 0},
        mc: {id: "appInstallerId", name: "aiid", valueType: "text", maxLength: 150, defaultValue: void 0},
        Dc: {id: "eventCategory", name: "ec", valueType: "text", maxLength: 150, defaultValue: void 0},
        Cc: {id: "eventAction", name: "ea", valueType: "text", maxLength: 500, defaultValue: void 0},
        Ec: {id: "eventLabel", name: "el", valueType: "text", maxLength: 500, defaultValue: void 0},
        Fc: {id: "eventValue", name: "ev", valueType: "integer", maxLength: void 0, defaultValue: void 0},
        bd: {id: "socialNetwork", name: "sn", valueType: "text", maxLength: 50, defaultValue: void 0},
        ad: {id: "socialAction", name: "sa", valueType: "text", maxLength: 50, defaultValue: void 0},
        cd: {id: "socialTarget", name: "st", valueType: "text", maxLength: 2048, defaultValue: void 0},
        md: {id: "transactionId", name: "ti", valueType: "text", maxLength: 500, defaultValue: void 0},
        ld: {id: "transactionAffiliation", name: "ta", valueType: "text", maxLength: 500, defaultValue: void 0},
        nd: {id: "transactionRevenue", name: "tr", valueType: "currency", maxLength: void 0, defaultValue: void 0},
        od: {id: "transactionShipping", name: "ts", valueType: "currency", maxLength: void 0, defaultValue: void 0},
        pd: {id: "transactionTax", name: "tt", valueType: "currency", maxLength: void 0, defaultValue: void 0},
        xc: {id: "currencyCode", name: "cu", valueType: "text", maxLength: 10, defaultValue: void 0},
        Nc: {id: "itemPrice", name: "ip", valueType: "currency", maxLength: void 0, defaultValue: void 0},
        Oc: {id: "itemQuantity", name: "iq", valueType: "integer", maxLength: void 0, defaultValue: void 0},
        Lc: {id: "itemCode", name: "ic", valueType: "text", maxLength: 500, defaultValue: void 0},
        Mc: {id: "itemName", name: "in", valueType: "text", maxLength: 500, defaultValue: void 0},
        Kc: {id: "itemCategory", name: "iv", valueType: "text", maxLength: 500, defaultValue: void 0},
        vc: {id: "campaignSource", name: "cs", valueType: "text", maxLength: 100, defaultValue: void 0},
        tc: {id: "campaignMedium", name: "cm", valueType: "text", maxLength: 50, defaultValue: void 0},
        uc: {id: "campaignName", name: "cn", valueType: "text", maxLength: 100, defaultValue: void 0},
        sc: {id: "campaignKeyword", name: "ck", valueType: "text", maxLength: 500, defaultValue: void 0},
        qc: {id: "campaignContent", name: "cc", valueType: "text", maxLength: 500, defaultValue: void 0},
        rc: {id: "campaignId", name: "ci", valueType: "text", maxLength: 100, defaultValue: void 0},
        Ic: {id: "gclid", name: "gclid", valueType: "text", maxLength: void 0, defaultValue: void 0},
        yc: {id: "dclid", name: "dclid", valueType: "text", maxLength: void 0, defaultValue: void 0},
        Uc: {id: "pageLoadTime", name: "plt", valueType: "integer", maxLength: void 0, defaultValue: void 0},
        Bc: {id: "dnsTime", name: "dns", valueType: "integer", maxLength: void 0, defaultValue: void 0},
        dd: {id: "tcpConnectTime", name: "tcp", valueType: "integer", maxLength: void 0, defaultValue: void 0},
        Zc: {id: "serverResponseTime", name: "srt", valueType: "integer", maxLength: void 0, defaultValue: void 0},
        Tc: {id: "pageDownloadTime", name: "pdt", valueType: "integer", maxLength: void 0, defaultValue: void 0},
        Wc: {id: "redirectResponseTime", name: "rrt", valueType: "integer", maxLength: void 0, defaultValue: void 0},
        ed: {id: "timingCategory", name: "utc", valueType: "text", maxLength: 150, defaultValue: void 0},
        hd: {id: "timingVar", name: "utv", valueType: "text", maxLength: 500, defaultValue: void 0},
        gd: {id: "timingValue", name: "utt", valueType: "integer", maxLength: void 0, defaultValue: void 0},
        fd: {id: "timingLabel", name: "utl", valueType: "text", maxLength: 500, defaultValue: void 0},
        Gc: {id: "exDescription", name: "exd", valueType: "text", maxLength: 150, defaultValue: void 0},
        Hc: {id: "exFatal", name: "exf", valueType: "boolean", maxLength: void 0, defaultValue: "1"}
    }, Ea = function (a, b) {
        this.width = a, this.height = b
    };
    Ea.prototype.B = function () {
        return new Ea(this.width, this.height)
    }, Ea.prototype.floor = function () {
        return this.width = Math.floor(this.width), this.height = Math.floor(this.height), this
    };
    var y, Fa, Ga, Ha, Ia = function () {
        return k.navigator ? k.navigator.userAgent : null
    };
    Ha = Ga = Fa = y = !1;
    var Ja;
    if (Ja = Ia()) {
        var Ka = k.navigator;
        y = 0 == Ja.lastIndexOf("Opera", 0), Fa = !y && (-1 != Ja.indexOf("MSIE") || -1 != Ja.indexOf("Trident")), Ga = !y && -1 != Ja.indexOf("WebKit"), Ha = !y && !Ga && !Fa && "Gecko" == Ka.product
    }
    var Na, La = y, z = Fa, A = Ha, B = Ga, Ma = function () {
        var a = k.document;
        return a ? a.documentMode : void 0
    };
    t:{
        var Pa, Oa = "";
        if (La && k.opera)var Qa = k.opera.version, Oa = "function" == typeof Qa ? Qa() : Qa; else if (A ? Pa = /rv\:([^\);]+)(\)|;)/ : z ? Pa = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : B && (Pa = /WebKit\/(\S+)/), Pa)var Ra = Pa.exec(Ia()), Oa = Ra ? Ra[1] : "";
        if (z) {
            var Sa = Ma();
            if (Sa > parseFloat(Oa)) {
                Na = String(Sa);
                break t
            }
        }
        Na = Oa
    }
    var Ta = Na, Ua = {}, C = function (a) {
        var b;
        if (!(b = Ua[a])) {
            b = 0;
            for (var c = String(Ta).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && e > f; f++) {
                var g = c[f] || "", l = d[f] || "", I = RegExp("(\\d*)(\\D*)", "g"), F = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var S = I.exec(g) || ["", "", ""], T = F.exec(l) || ["", "", ""];
                    if (0 == S[0].length && 0 == T[0].length)break;
                    b = ia(0 == S[1].length ? 0 : parseInt(S[1], 10), 0 == T[1].length ? 0 : parseInt(T[1], 10)) || ia(0 == S[2].length, 0 == T[2].length) || ia(S[2], T[2])
                } while (0 == b)
            }
            b = Ua[a] = b >= 0
        }
        return b
    }, Va = k.document, Wa = Va && z ? Ma() || ("CSS1Compat" == Va.compatMode ? parseInt(Ta, 10) : 5) : void 0;
    !A && !z || z && z && Wa >= 9 || A && C("1.9.1"), z && C("9");
    var Xa = function () {
    };
    Xa.prototype.Ga = !1, Xa.prototype.na = function () {
        this.Ga || (this.Ga = !0, this.j())
    }, Xa.prototype.j = function () {
        if (this.ob)for (; this.ob.length;)this.ob.shift()()
    };
    var D = function (a, b) {
        this.type = a, this.currentTarget = this.target = b, this.defaultPrevented = this.N = !1, this.Ra = !0
    };
    D.prototype.j = function () {
    }, D.prototype.na = function () {
    }, D.prototype.preventDefault = function () {
        this.defaultPrevented = !0, this.Ra = !1
    };
    var Ya = function (a) {
        return Ya[" "](a), a
    };
    Ya[" "] = ba;
    var Za = !z || z && Wa >= 9, $a = z && !C("9"), ab = !B || C("528"), bb = A && C("1.9b") || z && C("8") || La && C("9.5") || B && C("528"), cb = A && !C("8") || z && !C("9"), E = function (a, b) {
        if (D.call(this, a ? a.type : ""), this.relatedTarget = this.currentTarget = this.target = null, this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0, this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1, this.ib = this.state = null, a) {
            var c = this.type = a.type;
            this.target = a.target || a.srcElement, this.currentTarget = b;
            var d = a.relatedTarget;
            if (d) {
                if (A) {
                    var e;
                    t:{
                        try {
                            Ya(d.nodeName), e = !0;
                            break t
                        } catch (f) {
                        }
                        e = !1
                    }
                    e || (d = null)
                }
            } else"mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement);
            this.relatedTarget = d, this.offsetX = B || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY = B || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0, this.button = a.button, this.keyCode = a.keyCode || 0, this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0), this.ctrlKey = a.ctrlKey, this.altKey = a.altKey, this.shiftKey = a.shiftKey, this.metaKey = a.metaKey, this.state = a.state, this.ib = a, a.defaultPrevented && this.preventDefault()
        }
    };
    t(E, D), E.prototype.preventDefault = function () {
        E.J.preventDefault.call(this);
        var a = this.ib;
        if (a.preventDefault)a.preventDefault(); else if (a.returnValue = !1, $a)try {
            (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) && (a.keyCode = -1)
        } catch (b) {
        }
    }, E.prototype.j = function () {
    };
    var db = "closure_listenable_" + (1e6 * Math.random() | 0), eb = function (a) {
        try {
            return !(!a || !a[db])
        } catch (b) {
            return !1
        }
    }, fb = 0, gb = function (a, b, c, d, e) {
        this.H = a, this.proxy = null, this.src = b, this.type = c, this.fa = !!d, this.ha = e, this.key = ++fb, this.removed = this.ga = !1
    }, hb = function (a) {
        a.removed = !0, a.H = null, a.proxy = null, a.src = null, a.ha = null
    }, G = function (a) {
        this.src = a, this.h = {}, this.S = 0
    };
    G.prototype.add = function (a, b, c, d, e) {
        var f = a.toString();
        a = this.h[f], a || (a = this.h[f] = [], this.S++);
        var g = ib(a, b, d, e);
        return g > -1 ? (b = a[g], c || (b.ga = !1)) : (b = new gb(b, this.src, f, !!d, e), b.ga = c, a.push(b)), b
    }, G.prototype.remove = function (a, b, c, d) {
        if (a = a.toString(), !(a in this.h))return !1;
        var e = this.h[a];
        return b = ib(e, b, c, d), b > -1 ? (hb(e[b]), v.splice.call(e, b, 1), 0 == e.length && (delete this.h[a], this.S--), !0) : !1
    };
    var jb = function (a, b) {
        var c = b.type;
        if (!(c in a.h))return !1;
        var d = oa(a.h[c], b);
        return d && (hb(b), 0 == a.h[c].length && (delete a.h[c], a.S--)), d
    };
    G.prototype.removeAll = function (a) {
        a = a && a.toString();
        var c, b = 0;
        for (c in this.h)if (!a || c == a) {
            for (var d = this.h[c], e = 0; e < d.length; e++)++b, hb(d[e]);
            delete this.h[c], this.S--
        }
        return b
    }, G.prototype.R = function (a, b, c, d) {
        a = this.h[a.toString()];
        var e = -1;
        return a && (e = ib(a, b, c, d)), e > -1 ? a[e] : null
    };
    var ib = function (a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.removed && f.H == b && f.fa == !!c && f.ha == d)return e
        }
        return -1
    }, kb = "closure_lm_" + (1e6 * Math.random() | 0), lb = {}, mb = 0, nb = function (a, b, c, d, e) {
        if (m(b)) {
            for (var f = 0; f < b.length; f++)nb(a, b[f], c, d, e);
            return null
        }
        return c = ob(c), eb(a) ? a.listen(b, c, d, e) : pb(a, b, c, !1, d, e)
    }, pb = function (a, b, c, d, e, f) {
        if (!b)throw Error("Invalid event type");
        var g = !!e, l = qb(a);
        return l || (a[kb] = l = new G(a)), c = l.add(b, c, d, e, f), c.proxy ? c : (d = rb(), c.proxy = d, d.src = a, d.H = c, a.addEventListener ? a.addEventListener(b.toString(), d, g) : a.attachEvent(sb(b.toString()), d), mb++, c)
    }, rb = function () {
        var a = tb, b = Za ? function (c) {
            return a.call(b.src, b.H, c)
        } : function (c) {
            return c = a.call(b.src, b.H, c), c ? void 0 : c
        };
        return b
    }, ub = function (a, b, c, d, e) {
        if (m(b)) {
            for (var f = 0; f < b.length; f++)ub(a, b[f], c, d, e);
            return null
        }
        return c = ob(c), eb(a) ? a.Ja(b, c, d, e) : pb(a, b, c, !0, d, e)
    }, vb = function (a, b, c, d, e) {
        if (m(b))for (var f = 0; f < b.length; f++)vb(a, b[f], c, d, e); else c = ob(c), eb(a) ? a.Fa(b, c, d, e) : a && (a = qb(a)) && (b = a.R(b, c, !!d, e)) && wb(b)
    }, wb = function (a) {
        if ("number" == typeof a || !a || a.removed)return !1;
        var b = a.src;
        if (eb(b))return jb(b.t, a);
        var c = a.type, d = a.proxy;
        return b.removeEventListener ? b.removeEventListener(c, d, a.fa) : b.detachEvent && b.detachEvent(sb(c), d), mb--, (c = qb(b)) ? (jb(c, a), 0 == c.S && (c.src = null, b[kb] = null)) : hb(a), !0
    }, sb = function (a) {
        return a in lb ? lb[a] : lb[a] = "on" + a
    }, yb = function (a, b, c, d) {
        var e = 1;
        if ((a = qb(a)) && (b = a.h[b.toString()]))for (b = qa(b), a = 0; a < b.length; a++) {
            var f = b[a];
            f && f.fa == c && !f.removed && (e &= !1 !== xb(f, d))
        }
        return Boolean(e)
    }, xb = function (a, b) {
        var c = a.H, d = a.ha || a.src;
        return a.ga && wb(a), c.call(d, b)
    }, tb = function (a, b) {
        if (a.removed)return !0;
        if (!Za) {
            var c;
            if (!(c = b))t:{
                c = ["window", "event"];
                for (var e, d = k; e = c.shift();) {
                    if (null == d[e]) {
                        c = null;
                        break t
                    }
                    d = d[e]
                }
                c = d
            }
            if (e = c, c = new E(e, this), d = !0, !(0 > e.keyCode || void 0 != e.returnValue)) {
                t:{
                    var f = !1;
                    if (0 == e.keyCode)try {
                        e.keyCode = -1;
                        break t
                    } catch (g) {
                        f = !0
                    }
                    (f || void 0 == e.returnValue) && (e.returnValue = !0)
                }
                for (e = [], f = c.currentTarget; f; f = f.parentNode)e.push(f);
                for (var f = a.type, l = e.length - 1; !c.N && l >= 0; l--)c.currentTarget = e[l], d &= yb(e[l], f, !0, c);
                for (l = 0; !c.N && l < e.length; l++)c.currentTarget = e[l], d &= yb(e[l], f, !1, c)
            }
            return d
        }
        return xb(a, new E(b, this))
    }, qb = function (a) {
        return a = a[kb], a instanceof G ? a : null
    }, zb = "__closure_events_fn_" + (1e9 * Math.random() >>> 0), ob = function (a) {
        return p(a) ? a : a[zb] || (a[zb] = function (b) {
            return a.handleEvent(b)
        })
    }, H = function () {
        this.t = new G(this), this.Cb = this
    };
    t(H, Xa), H.prototype[db] = !0, h = H.prototype, h.Da = null, h.addEventListener = function (a, b, c, d) {
        nb(this, a, b, c, d)
    }, h.removeEventListener = function (a, b, c, d) {
        vb(this, a, b, c, d)
    }, h.dispatchEvent = function (a) {
        var b, c = this.Da;
        if (c) {
            b = [];
            for (var d = 1; c; c = c.Da)b.push(c), ++d
        }
        if (c = this.Cb, d = a.type || a, n(a))a = new D(a, c); else if (a instanceof D)a.target = a.target || c; else {
            var e = a;
            a = new D(d, c), ya(a, e)
        }
        var f, e = !0;
        if (b)for (var g = b.length - 1; !a.N && g >= 0; g--)f = a.currentTarget = b[g], e = Ab(f, d, !0, a) && e;
        if (a.N || (f = a.currentTarget = c, e = Ab(f, d, !0, a) && e, a.N || (e = Ab(f, d, !1, a) && e)), b)for (g = 0; !a.N && g < b.length; g++)f = a.currentTarget = b[g], e = Ab(f, d, !1, a) && e;
        return e
    }, h.j = function () {
        H.J.j.call(this), this.t && this.t.removeAll(void 0), this.Da = null
    }, h.listen = function (a, b, c, d) {
        return this.t.add(String(a), b, !1, c, d)
    }, h.Ja = function (a, b, c, d) {
        return this.t.add(String(a), b, !0, c, d)
    }, h.Fa = function (a, b, c, d) {
        return this.t.remove(String(a), b, c, d)
    };
    var Ab = function (a, b, c, d) {
        if (b = a.t.h[String(b)], !b)return !0;
        b = qa(b);
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.removed && g.fa == c) {
                var l = g.H, I = g.ha || g.src;
                g.ga && jb(a.t, g), e = !1 !== l.call(I, d) && e
            }
        }
        return e && 0 != d.Ra
    };
    H.prototype.R = function (a, b, c, d) {
        return this.t.R(String(a), b, c, d)
    };
    var Bb = function (a, b) {
        H.call(this), this.oa = a || 1, this.L = b || k, this.Ba = q(this.Db, this), this.Ca = r()
    };
    t(Bb, H), h = Bb.prototype, h.enabled = !1, h.e = null, h.Db = function () {
        if (this.enabled) {
            var a = r() - this.Ca;
            a > 0 && a < .8 * this.oa ? this.e = this.L.setTimeout(this.Ba, this.oa - a) : (this.e && (this.L.clearTimeout(this.e), this.e = null), this.dispatchEvent("tick"), this.enabled && (this.e = this.L.setTimeout(this.Ba, this.oa), this.Ca = r()))
        }
    }, h.start = function () {
        this.enabled = !0, this.e || (this.e = this.L.setTimeout(this.Ba, this.oa), this.Ca = r())
    }, h.stop = function () {
        this.enabled = !1, this.e && (this.L.clearTimeout(this.e), this.e = null)
    }, h.j = function () {
        Bb.J.j.call(this), this.stop(), delete this.L
    };
    var Cb = function (a, b, c) {
        if (p(a))c && (a = q(a, c)); else {
            if (!a || "function" != typeof a.handleEvent)throw Error("Invalid listener argument");
            a = q(a.handleEvent, a)
        }
        return b > 2147483647 ? -1 : k.setTimeout(a, b || 0)
    }, J = function (a) {
        this.Ea = a, this.b = {}
    };
    t(J, Xa);
    var Db = [];
    J.prototype.listen = function (a, b, c, d) {
        m(b) || (Db[0] = b, b = Db);
        for (var e = 0; e < b.length; e++) {
            var f = nb(a, b[e], c || this.handleEvent, d || !1, this.Ea || this);
            if (!f)break;
            this.b[f.key] = f
        }
        return this
    }, J.prototype.Ja = function (a, b, c, d) {
        return Eb(this, a, b, c, d)
    };
    var Eb = function (a, b, c, d, e, f) {
        if (m(c))for (var g = 0; g < c.length; g++)Eb(a, b, c[g], d, e, f); else {
            if (b = ub(b, c, d || a.handleEvent, e, f || a.Ea || a), !b)return a;
            a.b[b.key] = b
        }
        return a
    };
    J.prototype.Fa = function (a, b, c, d, e) {
        if (m(b))for (var f = 0; f < b.length; f++)this.Fa(a, b[f], c, d, e); else c = c || this.handleEvent, e = e || this.Ea || this, c = ob(c), d = !!d, b = eb(a) ? a.R(b, c, d, e) : a && (a = qb(a)) ? a.R(b, c, d, e) : null, b && (wb(b), delete this.b[b.key]);
        return this
    }, J.prototype.removeAll = function () {
        ta(this.b, wb), this.b = {}
    }, J.prototype.j = function () {
        J.J.j.call(this), this.removeAll()
    }, J.prototype.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented")
    };
    var K = function () {
        H.call(this), this.ia = new J(this), ab && (bb ? this.ia.listen(cb ? document.body : window, ["online", "offline"], this.Wa) : (this.Ya = ab ? navigator.onLine : !0, this.e = new Bb(250), this.ia.listen(this.e, "tick", this.zb), this.e.start()))
    };
    t(K, H), K.prototype.zb = function () {
        var a = ab ? navigator.onLine : !0;
        a != this.Ya && (this.Ya = a, this.Wa())
    }, K.prototype.Wa = function () {
        this.dispatchEvent((ab ? navigator.onLine : 1) ? "online" : "offline")
    }, K.prototype.j = function () {
        K.J.j.call(this), this.ia.na(), this.ia = null, this.e && (this.e.na(), this.e = null)
    };
    var Fb, Hb = function (a) {
        p(k.setImmediate) ? k.setImmediate(a) : (Fb || (Fb = Gb()), Fb(a))
    }, Gb = function () {
        var a = k.MessageChannel;
        if ("undefined" == typeof a && "undefined" != typeof window && window.postMessage && window.addEventListener && (a = function () {
                var a = document.createElement("iframe");
                a.style.display = "none", a.src = "", document.documentElement.appendChild(a);
                var b = a.contentWindow, a = b.document;
                a.open(), a.write(""), a.close();
                var c = "callImmediate" + Math.random(), d = b.location.protocol + "//" + b.location.host, a = q(function (a) {
                    a.origin != d && a.data != c || this.port1.onmessage()
                }, this);
                b.addEventListener("message", a, !1), this.port1 = {}, this.port2 = {
                    postMessage: function () {
                        b.postMessage(c, d)
                    }
                }
            }), "undefined" != typeof a) {
            var b = new a, c = {}, d = c;
            return b.port1.onmessage = function () {
                c = c.next;
                var a = c.lb;
                c.lb = null, a()
            }, function (a) {
                d.next = {lb: a}, d = d.next, b.port2.postMessage(0)
            }
        }
        return "undefined" != typeof document && "onreadystatechange" in document.createElement("script") ? function (a) {
            var b = document.createElement("script");
            b.onreadystatechange = function () {
                b.onreadystatechange = null, b.parentNode.removeChild(b), b = null, a(), a = null
            }, document.documentElement.appendChild(b)
        } : function (a) {
            k.setTimeout(a, 0)
        }
    }, Ib = function (a) {
        Hb(function () {
            throw a
        })
    }, Nb = function (a, b) {
        Jb || (Hb(Kb), Jb = !0), Lb.push(new Mb(a, b))
    }, Jb = !1, Lb = [], Kb = function () {
        for (; Lb.length;) {
            var a = Lb;
            Lb = [];
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                try {
                    c.Vb.call(c.scope)
                } catch (d) {
                    Ib(d)
                }
            }
        }
        Jb = !1
    }, Mb = function (a, b) {
        this.Vb = a, this.scope = b
    }, Ob = function (a) {
        a.prototype.then = a.prototype.then, a.prototype.$goog_Thenable = !0
    }, Pb = function (a) {
        if (!a)return !1;
        try {
            return !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    }, M = function (a, b) {
        this.k = 0, this.r = void 0, this.l = this.m = null, this.ja = this.ya = !1;
        try {
            var c = this;
            a.call(b, function (a) {
                L(c, 2, a)
            }, function (a) {
                L(c, 3, a)
            })
        } catch (d) {
            L(this, 3, d)
        }
    };
    M.prototype.then = function (a, b, c) {
        return Qb(this, p(a) ? a : null, p(b) ? b : null, c)
    }, Ob(M), M.prototype.cancel = function (a) {
        0 == this.k && Nb(function () {
            var b = new Rb(a);
            Sb(this, b)
        }, this)
    };
    var Sb = function (a, b) {
        if (0 == a.k)if (a.m) {
            var c = a.m;
            if (c.l) {
                for (var g, d = 0, e = -1, f = 0; (g = c.l[f]) && !((g = g.la) && (d++, g == a && (e = f), e >= 0 && d > 1)); f++);
                e >= 0 && (0 == c.k && 1 == d ? Sb(c, b) : (d = c.l.splice(e, 1)[0], Tb(c), d.za(b)))
            }
        } else L(a, 3, b)
    }, Vb = function (a, b) {
        a.l && a.l.length || 2 != a.k && 3 != a.k || Ub(a), a.l || (a.l = []), a.l.push(b)
    }, Qb = function (a, b, c, d) {
        var e = {la: null, Qa: null, za: null};
        return e.la = new M(function (a, g) {
            e.Qa = b ? function (c) {
                try {
                    var e = b.call(d, c);
                    a(e)
                } catch (F) {
                    g(F)
                }
            } : a, e.za = c ? function (b) {
                try {
                    var e = c.call(d, b);
                    void 0 === e && b instanceof Rb ? g(b) : a(e)
                } catch (F) {
                    g(F)
                }
            } : g
        }), e.la.m = a, Vb(a, e), e.la
    };
    M.prototype.Za = function (a) {
        this.k = 0, L(this, 2, a)
    }, M.prototype.$a = function (a) {
        this.k = 0, L(this, 3, a)
    };
    var L = function (a, b, c) {
        if (0 == a.k) {
            if (a == c)b = 3, c = new TypeError("Promise cannot resolve to itself"); else {
                if (Pb(c))return a.k = 1, void c.then(a.Za, a.$a, a);
                if (ea(c))try {
                    var d = c.then;
                    if (p(d))return void Wb(a, c, d)
                } catch (e) {
                    b = 3, c = e
                }
            }
            a.r = c, a.k = b, Ub(a), 3 != b || c instanceof Rb || Yb(a, c)
        }
    }, Wb = function (a, b, c) {
        a.k = 1;
        var d = !1, e = function (b) {
            d || (d = !0, a.Za(b))
        }, f = function (b) {
            d || (d = !0, a.$a(b))
        };
        try {
            c.call(b, e, f)
        } catch (g) {
            f(g)
        }
    }, Ub = function (a) {
        a.ya || (a.ya = !0, Nb(a.Rb, a))
    };
    M.prototype.Rb = function () {
        for (; this.l && this.l.length;) {
            var a = this.l;
            this.l = [];
            for (var b = 0; b < a.length; b++) {
                var c = a[b], d = this.r;
                2 == this.k ? c.Qa(d) : (Tb(this), c.za(d))
            }
        }
        this.ya = !1
    };
    var Tb = function (a) {
        for (; a && a.ja; a = a.m)a.ja = !1
    }, Yb = function (a, b) {
        a.ja = !0, Nb(function () {
            a.ja && Zb.call(null, b)
        })
    }, Zb = Ib, Rb = function (a) {
        u.call(this, a)
    };
    t(Rb, u), Rb.prototype.name = "cancel";
    var N = function (a, b) {
        this.ba = [], this.Oa = a, this.Na = b || null, this.O = this.K = !1, this.r = void 0, this.wa = this.qb = this.va = !1, this.ca = 0, this.m = null, this.ua = 0
    };
    N.prototype.cancel = function (a) {
        if (this.K)this.r instanceof N && this.r.cancel(); else {
            if (this.m) {
                var b = this.m;
                delete this.m, a ? b.cancel(a) : (b.ua--, 0 >= b.ua && b.cancel())
            }
            this.Oa ? this.Oa.call(this.Na, this) : this.wa = !0, this.K || this.A(new $b)
        }
    }, N.prototype.Pa = function (a, b) {
        this.va = !1, ac(this, a, b)
    };
    var ac = function (a, b, c) {
        a.K = !0, a.r = c, a.O = !b, bc(a)
    }, dc = function (a) {
        if (a.K) {
            if (!a.wa)throw new cc;
            a.wa = !1
        }
    };
    N.prototype.G = function (a) {
        dc(this), ac(this, !0, a)
    }, N.prototype.A = function (a) {
        dc(this), ac(this, !1, a)
    }, N.prototype.Ub = function (a, b) {
        return O(this, a, null, b)
    };
    var ec = function (a, b, c) {
        O(a, b, b, c)
    }, O = function (a, b, c, d) {
        return a.ba.push([b, c, d]), a.K && bc(a), a
    };
    N.prototype.then = function (a, b, c) {
        var d, e, f = new M(function (a, b) {
            d = a, e = b
        });
        return O(this, d, function (a) {
            a instanceof $b ? f.cancel() : e(a)
        }), f.then(a, b, c)
    }, Ob(N);
    var fc = function (a) {
        var b = new N;
        return O(a, b.G, b.A, b), b
    }, gc = function (a) {
        return la(a.ba, function (a) {
            return p(a[1])
        })
    }, bc = function (a) {
        if (a.ca && a.K && gc(a)) {
            var b = a.ca, c = hc[b];
            c && (k.clearTimeout(c.da), delete hc[b]), a.ca = 0
        }
        a.m && (a.m.ua--, delete a.m);
        for (var b = a.r, d = c = !1; a.ba.length && !a.va;) {
            var e = a.ba.shift(), f = e[0], g = e[1], e = e[2];
            if (f = a.O ? g : f)try {
                var l = f.call(e || a.Na, b);
                void 0 !== l && (a.O = a.O && (l == b || l instanceof Error), a.r = b = l), Pb(b) && (d = !0, a.va = !0)
            } catch (I) {
                b = I, a.O = !0, gc(a) || (c = !0);
            }
        }
        a.r = b, d && (l = q(a.Pa, a, !0), d = q(a.Pa, a, !1), b instanceof N ? (O(b, l, d), b.qb = !0) : b.then(l, d)), c && (b = new ic(b), hc[b.da] = b, a.ca = b.da)
    }, jc = function (a) {
        var b = new N;
        return b.G(a), b
    }, lc = function () {
        var a = kc, b = new N;
        return b.A(a), b
    }, cc = function () {
        u.call(this)
    };
    t(cc, u), cc.prototype.message = "Deferred has already fired", cc.prototype.name = "AlreadyCalledError";
    var $b = function () {
        u.call(this)
    };
    t($b, u), $b.prototype.message = "Deferred was canceled", $b.prototype.name = "CanceledError";
    var ic = function (a) {
        this.da = k.setTimeout(q(this.Nb, this), 0), this.$ = a
    };
    ic.prototype.Nb = function () {
        throw delete hc[this.da], this.$
    };
    var hc = {}, mc = function (a, b) {
        var c = Array.prototype.slice.call(arguments), d = c.shift();
        if ("undefined" == typeof d)throw Error("[goog.string.format] Template required");
        return d.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function (a, b, d, l, I, F, S, T) {
            if ("%" == F)return "%";
            var Xb = c.shift();
            if ("undefined" == typeof Xb)throw Error("[goog.string.format] Not enough arguments");
            return arguments[0] = Xb, P[F].apply(null, arguments)
        })
    }, P = {
        s: function (a, b, c) {
            return isNaN(c) || "" == c || a.length >= c ? a : a = -1 < b.indexOf("-", 0) ? a + Array(c - a.length + 1).join(" ") : Array(c - a.length + 1).join(" ") + a
        }, f: function (a, b, c, d, e) {
            d = a.toString(), isNaN(e) || "" == e || (d = a.toFixed(e));
            var f;
            return f = 0 > a ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "", a >= 0 && (d = f + d), isNaN(c) || d.length >= c ? d : (d = isNaN(e) ? Math.abs(a).toString() : Math.abs(a).toFixed(e), a = c - d.length - f.length, d = 0 <= b.indexOf("-", 0) ? f + d + Array(a + 1).join(" ") : f + Array(a + 1).join(0 <= b.indexOf("0", 0) ? "0" : " ") + d)
        }, d: function (a, b, c, d, e, f, g, l) {
            return P.f(parseInt(a, 10), b, c, d, 0, f, g, l)
        }
    };
    P.i = P.d, P.u = P.d;
    var nc = function (a) {
        if ("function" == typeof a.q)return a.q();
        if (n(a))return a.split("");
        if (da(a)) {
            for (var b = [], c = a.length, d = 0; c > d; d++)b.push(a[d]);
            return b
        }
        return ua(a)
    }, oc = function (a, b, c) {
        if ("function" == typeof a.forEach)a.forEach(b, c); else if (da(a) || n(a))ka(a, b, c); else {
            var d;
            if ("function" == typeof a.C)d = a.C(); else if ("function" != typeof a.q)if (da(a) || n(a)) {
                d = [];
                for (var e = a.length, f = 0; e > f; f++)d.push(f)
            } else d = va(a); else d = void 0;
            for (var e = nc(a), f = e.length, g = 0; f > g; g++)b.call(c, e[g], d && d[g], a)
        }
    }, Q = function (a) {
        this.M = new w, this.Aa(arguments)
    };
    Q.prototype.set = function (a, b) {
        this.M.set(a.name, {key: a, value: b})
    }, Q.prototype.remove = function (a) {
        this.M.remove(a.name)
    }, Q.prototype.get = function (a) {
        return a = this.M.get(a.name, null), null === a ? null : a.value
    }, Q.prototype.Aa = function (a) {
        for (var b = 0; b < a.length; b += 2)this.set(a[b], a[b + 1])
    };
    var pc = function (a, b) {
        ka(a.M.q(), function (a) {
            b(a.key, a.value)
        })
    };
    Q.prototype.jb = function () {
        var a = {};
        return pc(this, function (b, c) {
            a[b.id] = c
        }), a
    }, Q.prototype.B = function () {
        var a = new Q;
        return a.M = this.M.B(), a
    }, Q.prototype.toString = function () {
        var a = {};
        return pc(this, function (b, c) {
            a[b.id] = c
        }), JSON.stringify(a)
    };
    var qc = {
        id: "apiVersion",
        name: "v",
        valueType: "text",
        maxLength: void 0,
        defaultValue: void 0
    }, rc = {
        id: "appName",
        name: "an",
        valueType: "text",
        maxLength: 100,
        defaultValue: void 0
    }, sc = {
        id: "appVersion",
        name: "av",
        valueType: "text",
        maxLength: 100,
        defaultValue: void 0
    }, tc = {
        id: "clientId",
        name: "cid",
        valueType: "text",
        maxLength: void 0,
        defaultValue: void 0
    }, uc = {
        id: "language",
        name: "ul",
        valueType: "text",
        maxLength: 20,
        defaultValue: void 0
    }, vc = {
        id: "libVersion",
        name: "_v",
        valueType: "text",
        maxLength: void 0,
        defaultValue: void 0
    }, wc = {
        id: "screenColors",
        name: "sd",
        valueType: "text",
        maxLength: 20,
        defaultValue: void 0
    }, xc = {
        id: "screenResolution",
        name: "sr",
        valueType: "text",
        maxLength: 20,
        defaultValue: void 0
    }, yc = {
        id: "trackingId",
        name: "tid",
        valueType: "text",
        maxLength: void 0,
        defaultValue: void 0
    }, zc = {id: "viewportSize", name: "vp", valueType: "text", maxLength: 20, defaultValue: void 0}, Ac = {
        kc: qc,
        nc: rc,
        oc: sc,
        wc: tc,
        Pc: uc,
        Qc: vc,
        Xc: wc,
        Yc: xc,
        kd: yc,
        qd: zc
    }, Cc = function (a) {
        if (!n(a))return a;
        var b = Bc(a, Da);
        if (ea(b))return b;
        if (b = Bc(a, Ac), ea(b))return b;
        if (b = /^dimension(\d+)$/.exec(a), null !== b)return {
            id: a,
            name: "cd" + b[1],
            valueType: "text",
            maxLength: 150,
            defaultValue: void 0
        };
        if (b = /^metric(\d+)$/.exec(a), null !== b)return {
            id: a,
            name: "cm" + b[1],
            valueType: "integer",
            maxLength: void 0,
            defaultValue: void 0
        };
        throw Error(a + " is not a valid parameter name.")
    }, Bc = function (a, b) {
        var c = wa(b, function (b) {
            return b.id == a && "metric" != a && "dimension" != a
        });
        return ea(c) ? c : null
    }, Dc = function (a, b) {
        this.n = a, this.v = b
    };
    Dc.prototype.send = function (a, b) {
        return b.set(tc, this.n.xa), this.v.send(a, b)
    };
    var R = function () {
    };
    R.Lb = function () {
        return R.nb ? R.nb : R.nb = new R
    }, R.prototype.send = function () {
        return jc()
    };
    var U = function (a, b) {
        D.call(this, "a"), this.Sb = a, this.Ob = b
    };
    t(U, D), U.prototype.$b = function () {
        return this.Sb
    }, U.prototype.Zb = function () {
        return this.Ob.jb()
    };
    var Ec = function (a, b) {
        this.Ha = a, this.v = b
    };
    Ec.prototype.send = function (a, b) {
        return this.Ha.dispatchEvent(new U(a, b)), this.v.send(a, b)
    };
    var Fc = function (a) {
        this.v = a
    };
    Fc.prototype.send = function (a, b) {
        return Gc(b), Hc(b), this.v.send(a, b)
    };
    var Gc = function (a) {
        pc(a, function (b, c) {
            void 0 !== b.maxLength && "text" == b.valueType && 0 < b.maxLength && c.length > b.maxLength && a.set(b, c.substring(0, b.maxLength))
        })
    }, Hc = function (a) {
        pc(a, function (b, c) {
            void 0 !== b.defaultValue && c == b.defaultValue && a.remove(b)
        })
    }, kc = {status: "device-offline", pa: void 0}, Ic = {
        status: "rate-limited",
        pa: void 0
    }, Jc = {status: "sampled-out", pa: void 0}, Kc = {status: "sent", pa: void 0}, Lc = function (a, b) {
        this.yb = a, this.v = b
    };
    Lc.prototype.send = function (a, b) {
        var c;
        c = this.yb;
        var d = c.Ua(), e = Math.floor((d - c.Ta) * c.vb);
        return e > 0 && (c.T = Math.min(c.T + e, c.wb), c.Ta = d), 1 > c.T ? c = !1 : (c.T -= 1, c = !0), c || "item" == a || "transaction" == a ? this.v.send(a, b) : jc(Ic)
    };
    var Mc = function (a) {
        this.Pb = a
    };
    Mc.prototype.send = function (a, b) {
        return this.Pb.push({tb: a, ub: b}), jc()
    };
    var Nc = function (a, b, c) {
        this.n = a, this.ka = [], this.I = {
            enabled: new Mc(this.ka),
            disabled: c
        }, this.P = this.I.enabled, O(fc(this.n.aa), ha(this.sb, b), this.rb, this)
    };
    Nc.prototype.sb = function (a) {
        this.I.enabled = a(this.n), Oc(this), ka(this.ka, function (a) {
            this.send(a.tb, a.ub)
        }, this), this.ka = null, Pc(this.n, q(this.xb, this))
    }, Nc.prototype.rb = function () {
        this.P = this.I.enabled = this.I.disabled, this.ka = null
    }, Nc.prototype.send = function (a, b) {
        return this.P.send(a, b)
    };
    var Oc = function (a) {
        a.P = a.n.ab() ? a.I.enabled : a.I.disabled
    };
    Nc.prototype.xb = function (a) {
        switch (a) {
            case"analytics.tracking-permitted":
                Oc(this)
        }
    };
    var V = function (a, b) {
        this.P = a, this.Ha = b, this.cb = new Q, this.Ia = !1
    };
    h = V.prototype, h.set = function (a, b) {
        var c = Cc(a);
        this.cb.set(c, b)
    }, h.send = function (a, b) {
        var c = this.cb.B();
        return b && ta(b, function (a, b) {
            null != a && c.set(Cc(b), a)
        }, this), this.Ia && (this.Ia = !1, c.set(Ba, "start")), this.P.send(a, c)
    }, h.bc = function (a) {
        var b = {description: a};
        return this.set(Ca, a), this.send("appview", b)
    }, h.cc = function (a, b, c, d) {
        return this.send("event", {eventCategory: a, eventAction: b, eventLabel: c, eventValue: d})
    }, h.ec = function (a, b, c) {
        return this.send("social", {socialNetwork: a, socialAction: b, socialTarget: c})
    }, h.dc = function (a, b) {
        return this.send("exception", {exDescription: a, exFatal: b})
    }, h.hb = function (a, b, c, d) {
        return this.send("timing", {timingCategory: a, timingVar: b, timingLabel: d, timingValue: c})
    }, h.Wb = function () {
        this.Ia = !0
    }, h.hc = function (a, b, c) {
        return new Qc(this, a, b, c)
    }, h.Yb = function () {
        return this.Ha
    };
    var Qc = function (a, b, c, d) {
        this.eb = a, this.Gb = b, this.Kb = c, this.Hb = d, this.Jb = r()
    };
    Qc.prototype.send = function () {
        var a = this.eb.hb(this.Gb, this.Kb, r() - this.Jb, this.Hb);
        return this.eb = null, a
    };
    var Rc = function () {
        this.T = 60, this.wb = 500, this.vb = 5e-4, this.Ua = function () {
            return (new Date).getTime()
        }, this.Ta = this.Ua()
    }, Sc = function (a, b) {
        this.n = a, this.v = b
    };
    Sc.prototype.send = function (a, b) {
        var c = b.get(tc);
        return parseInt(c.split("-")[1], 16) < 655.36 * this.n.Sa ? this.v.send(a, b) : jc(Jc)
    };
    var Tc = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"), Uc = B, Vc = function (a, b) {
        if (Uc) {
            Uc = !1;
            var c = k.location;
            if (c) {
                var d = c.href;
                if (d && (d = (d = Vc(3, d)) && decodeURIComponent(d)) && d != c.hostname)throw Uc = !0, Error()
            }
        }
        return b.match(Tc)[a] || null
    }, Wc = function () {
    };
    Wc.prototype.kb = null;
    var Zc, Yc = function (a) {
        var b;
        return (b = a.kb) || (b = {}, Xc(a) && (b[0] = !0, b[1] = !0), b = a.kb = b), b
    }, $c = function () {
    };
    t($c, Wc);
    var ad = function (a) {
        return (a = Xc(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }, Xc = function (a) {
        if (!a.mb && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d), a.mb = d
                } catch (e) {
                }
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed")
        }
        return a.mb
    };
    Zc = new $c;
    var W = function (a) {
        H.call(this), this.headers = new w, this.Z = a || null, this.w = !1, this.W = this.a = null, this.V = this.ra = "", this.D = this.qa = this.U = this.ta = !1, this.Y = 0, this.X = null, this.Ka = "", this.sa = this.pb = !1
    };
    t(W, H);
    var bd = /^https?$/i, cd = ["POST", "PUT"], dd = [], ed = function (a, b, c) {
        var d = new W;
        dd.push(d), b && d.listen("complete", b), d.Ja("ready", d.Qb), d.send(a, "POST", c, void 0)
    };
    W.prototype.Qb = function () {
        this.na(), oa(dd, this)
    }, W.prototype.send = function (a, b, c, d) {
        if (this.a)throw Error("[goog.net.XhrIo] Object is active with another request=" + this.ra + "; newUri=" + a);
        b = b ? b.toUpperCase() : "GET", this.ra = a, this.V = "", this.ta = !1, this.w = !0, this.a = ad(this.Z ? this.Z : Zc), this.W = Yc(this.Z ? this.Z : Zc), this.a.onreadystatechange = q(this.La, this);
        try {
            this.qa = !0, this.a.open(b, String(a), !0), this.qa = !1
        } catch (e) {
            return void this.$(5, e)
        }
        a = c || "";
        var f = this.headers.B();
        d && oc(d, function (a, b) {
            f.set(b, a)
        }), d = na(f.C()), c = k.FormData && a instanceof k.FormData, !(0 <= ja(cd, b)) || d || c || f.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"), oc(f, function (a, b) {
            this.a.setRequestHeader(b, a)
        }, this), this.Ka && (this.a.responseType = this.Ka), "withCredentials" in this.a && (this.a.withCredentials = this.pb);
        try {
            fd(this), 0 < this.Y && ((this.sa = gd(this.a)) ? (this.a.timeout = this.Y, this.a.ontimeout = q(this.Ma, this)) : this.X = Cb(this.Ma, this.Y, this)), this.U = !0, this.a.send(a), this.U = !1
        } catch (g) {
            this.$(5, g)
        }
    };
    var gd = function (a) {
        return z && C(9) && "number" == typeof a.timeout && void 0 !== a.ontimeout
    }, ma = function (a) {
        return "content-type" == a.toLowerCase()
    };
    W.prototype.Ma = function () {
        "undefined" != typeof aa && this.a && (this.V = "Timed out after " + this.Y + "ms, aborting", this.dispatchEvent("timeout"), this.abort(8))
    }, W.prototype.$ = function (a, b) {
        this.w = !1, this.a && (this.D = !0, this.a.abort(), this.D = !1), this.V = b, hd(this), id(this)
    };
    var hd = function (a) {
        a.ta || (a.ta = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
    };
    W.prototype.abort = function () {
        this.a && this.w && (this.w = !1, this.D = !0, this.a.abort(), this.D = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), id(this))
    }, W.prototype.j = function () {
        this.a && (this.w && (this.w = !1, this.D = !0, this.a.abort(), this.D = !1), id(this, !0)), W.J.j.call(this)
    }, W.prototype.La = function () {
        this.Ga || (this.qa || this.U || this.D ? jd(this) : this.Bb())
    }, W.prototype.Bb = function () {
        jd(this)
    };
    var jd = function (a) {
        if (a.w && "undefined" != typeof aa && (!a.W[1] || 4 != kd(a) || 2 != ld(a)))if (a.U && 4 == kd(a))Cb(a.La, 0, a); else if (a.dispatchEvent("readystatechange"), 4 == kd(a)) {
            a.w = !1;
            try {
                var c, d, b = ld(a);
                t:switch (b) {
                    case 200:
                    case 201:
                    case 202:
                    case 204:
                    case 206:
                    case 304:
                    case 1223:
                        d = !0;
                        break t;
                    default:
                        d = !1
                }
                if (!(c = d)) {
                    var e;
                    if (e = 0 === b) {
                        var f = Vc(1, String(a.ra));
                        if (!f && self.location)var g = self.location.protocol, f = g.substr(0, g.length - 1);
                        e = !bd.test(f ? f.toLowerCase() : "")
                    }
                    c = e
                }
                if (c)a.dispatchEvent("complete"), a.dispatchEvent("success"); else {
                    var l;
                    try {
                        l = 2 < kd(a) ? a.a.statusText : ""
                    } catch (I) {
                        l = ""
                    }
                    a.V = l + " [" + ld(a) + "]", hd(a)
                }
            } finally {
                id(a)
            }
        }
    }, id = function (a, b) {
        if (a.a) {
            fd(a);
            var c = a.a, d = a.W[0] ? ba : null;
            a.a = null, a.W = null, b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d
            } catch (e) {
            }
        }
    }, fd = function (a) {
        a.a && a.sa && (a.a.ontimeout = null), "number" == typeof a.X && (k.clearTimeout(a.X), a.X = null)
    }, kd = function (a) {
        return a.a ? a.a.readyState : 0
    }, ld = function (a) {
        try {
            return 2 < kd(a) ? a.a.status : -1
        } catch (b) {
            return -1
        }
    }, md = function (a, b, c) {
        this.p = a || null, this.Mb = !!c
    }, Y = function (a) {
        if (!a.c && (a.c = new w, a.g = 0, a.p))for (var b = a.p.split("&"), c = 0; c < b.length; c++) {
            var d = b[c].indexOf("="), e = null, f = null;
            d >= 0 ? (e = b[c].substring(0, d), f = b[c].substring(d + 1)) : e = b[c], e = decodeURIComponent(e.replace(/\+/g, " ")), e = X(a, e), a.add(e, f ? decodeURIComponent(f.replace(/\+/g, " ")) : "")
        }
    };
    h = md.prototype, h.c = null, h.g = null, h.add = function (a, b) {
        Y(this), this.p = null, a = X(this, a);
        var c = this.c.get(a);
        return c || this.c.set(a, c = []), c.push(b), this.g++, this
    }, h.remove = function (a) {
        return Y(this), a = X(this, a), this.c.Q(a) ? (this.p = null, this.g -= this.c.get(a).length, this.c.remove(a)) : !1
    }, h.Q = function (a) {
        return Y(this), a = X(this, a), this.c.Q(a)
    }, h.C = function () {
        Y(this);
        for (var a = this.c.q(), b = this.c.C(), c = [], d = 0; d < b.length; d++)for (var e = a[d], f = 0; f < e.length; f++)c.push(b[d]);
        return c
    }, h.q = function (a) {
        Y(this);
        var b = [];
        if (n(a))this.Q(a) && (b = pa(b, this.c.get(X(this, a)))); else {
            a = this.c.q();
            for (var c = 0; c < a.length; c++)b = pa(b, a[c])
        }
        return b
    }, h.set = function (a, b) {
        return Y(this), this.p = null, a = X(this, a), this.Q(a) && (this.g -= this.c.get(a).length), this.c.set(a, [b]), this.g++, this
    }, h.get = function (a, b) {
        var c = a ? this.q(a) : [];
        return 0 < c.length ? String(c[0]) : b
    }, h.toString = function () {
        if (this.p)return this.p;
        if (!this.c)return "";
        for (var a = [], b = this.c.C(), c = 0; c < b.length; c++)for (var d = b[c], e = encodeURIComponent(String(d)), d = this.q(d), f = 0; f < d.length; f++) {
            var g = e;
            "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f]))), a.push(g)
        }
        return this.p = a.join("&")
    }, h.B = function () {
        var a = new md;
        return a.p = this.p, this.c && (a.c = this.c.B(), a.g = this.g), a
    };
    var X = function (a, b) {
        var c = String(b);
        return a.Mb && (c = c.toLowerCase()), c
    }, nd = function (a, b) {
        this.Ab = a, this.bb = b
    };
    nd.prototype.send = function (a, b) {
        if (ab && !navigator.onLine)return lc();
        var c = new N, d = od(a, b);
        return d.length > this.bb ? c.A({
            status: "payload-too-big",
            pa: mc("Encoded hit length == %s, but should be <= %s.", d.length, this.bb)
        }) : ed(this.Ab, function () {
            c.G(Kc)
        }, d), c
    };
    var pd, od = function (a, b) {
        var c = new md;
        return c.add(Aa.name, a), pc(b, function (a, b) {
            c.add(a.name, b.toString())
        }), c.toString()
    }, Z = function (a, b, c, d) {
        this.Ib = a, this.Eb = b, this.Fb = c, this.n = d
    };
    Z.prototype.ac = function (a) {
        var b = new H, b = new V(qd(this, b), b);
        return b.set(vc, this.Ib), b.set(qc, 1), b.set(rc, this.Eb), b.set(sc, this.Fb), b.set(yc, a), a = window.navigator.language, b.set(uc, a), a = screen.colorDepth + "-bit", b.set(wc, a), a = [screen.width, screen.height].join("x"), b.set(xc, a), a = window.document, a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body, a = new Ea(a.clientWidth, a.clientHeight), a = [a.width, a.height].join("x"), b.set(zc, a), b
    };
    var qd = function (a, b) {
        return new Nc(a.n, function (a) {
            if (!pd) {
                new K;
                var d = new Fc(new nd("https://www.google-analytics.com/collect", 8192)), e = new Rc;
                pd = new Dc(a, new Sc(a, new Lc(e, d)))
            }
            return new Ec(b, pd)
        }, R.Lb())
    };
    Z.prototype.Xb = function () {
        return fc(this.n.aa)
    };
    var $ = function (a) {
        this.F = a, this.Sa = 100, this.Va = [], this.aa = new N, this.ma = this.xa = null, rd(this)
    }, rd = function (a) {
        O(a.F.get("analytics.tracking-permitted"), function (a) {
            this.ma = void 0 !== a ? a : !0, this.fb()
        }, a.gb, a), O(sd(a), a.fb, a.gb, a)
    };
    $.prototype.gb = function (a) {
        this.aa.A(a)
    }, $.prototype.fb = function () {
        null === this.ma || null === this.xa || this.aa.G(this)
    };
    var Pc = function (a, b) {
        a.Va.push(b)
    };
    $.prototype.gc = function (a) {
        ec(this.F.set("analytics.tracking-permitted", a), function () {
            this.ma = a, ka(this.Va, function (a) {
                a("analytics.tracking-permitted")
            })
        }, this)
    }, $.prototype.ab = function () {
        var a;
        return (a = this.ma) && (a = k._gaUserPrefs, a = !(a && a.ioo && a.ioo())), a
    }, $.prototype.fc = function (a) {
        this.Sa = a
    };
    var sd = function (a) {
        var b = new N;
        return O(a.F.get("analytics.user-id"), function (a) {
            if (!a) {
                a = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
                for (var d = 0, e = a.length; e > d; d++)switch (a[d]) {
                    case"x":
                        a[d] = Math.floor(16 * Math.random()).toString(16);
                        break;
                    case"y":
                        a[d] = (Math.floor(4 * Math.random()) + 8).toString(16)
                }
                a = a.join(""), this.F.set("analytics.user-id", a)
            }
            this.xa = a, b.G()
        }, function (a) {
            b.A(a)
        }, a), b
    }, td = function (a, b) {
        if (!ea(a))throw Error("'storage' argument must be defined and not null.");
        this.F = a, this.Xa = b || ""
    };
    td.prototype.get = function (a) {
        var b = new N, c = this.Xa + "." + a;
        return this.F.get(c, function (a) {
            var e = chrome.runtime.lastError;
            e ? b.A(e) : b.G(a[c])
        }), b
    }, td.prototype.set = function (a, b) {
        var c = new N, d = {};
        return d[this.Xa + "." + a] = b, this.F.set(d, function () {
            var a = chrome.runtime.lastError;
            a ? c.A(a) : c.G()
        }), c
    };
    var ud = new w;
    s("goog.async.Deferred", N), s("goog.async.Deferred.prototype.addCallback", N.prototype.Ub), s("goog.events.EventTarget", H), s("goog.events.EventTarget.prototype.listen", H.prototype.listen), s("analytics.getService", function (a) {
        var b = ud.get(a, null);
        if (null === b) {
            var c, b = chrome.runtime.getManifest().version;
            c = new td(chrome.storage.local, "google-analytics"), c = new $(c), b = new Z("ca3", a, b, c), ud.set(a, b)
        }
        return b
    }), s("analytics.internal.GoogleAnalyticsService", Z), s("analytics.internal.GoogleAnalyticsService.prototype.getTracker", Z.prototype.ac), s("analytics.internal.GoogleAnalyticsService.prototype.getConfig", Z.prototype.Xb), s("analytics.internal.ServiceSettings", $), s("analytics.internal.ServiceSettings.prototype.setTrackingPermitted", $.prototype.gc), s("analytics.internal.ServiceSettings.prototype.isTrackingPermitted", $.prototype.ab), s("analytics.internal.ServiceSettings.prototype.setSampleRate", $.prototype.fc), s("analytics.internal.ServiceTracker", V), s("analytics.internal.ServiceTracker.prototype.send", V.prototype.send), s("analytics.internal.ServiceTracker.prototype.sendAppView", V.prototype.bc), s("analytics.internal.ServiceTracker.prototype.sendEvent", V.prototype.cc), s("analytics.internal.ServiceTracker.prototype.sendSocial", V.prototype.ec), s("analytics.internal.ServiceTracker.prototype.sendException", V.prototype.dc), s("analytics.internal.ServiceTracker.prototype.sendTiming", V.prototype.hb), s("analytics.internal.ServiceTracker.prototype.startTiming", V.prototype.hc), s("analytics.internal.ServiceTracker.Timing", Qc), s("analytics.internal.ServiceTracker.Timing.prototype.send", Qc.prototype.send), s("analytics.internal.ServiceTracker.prototype.forceSessionStart", V.prototype.Wb), s("analytics.internal.ServiceTracker.prototype.getEventTarget", V.prototype.Yb), s("analytics.HitTypes.APPVIEW", "appview"), s("analytics.HitTypes.EVENT", "event"), s("analytics.HitTypes.SOCIAL", "social"), s("analytics.HitTypes.TRANSACTION", "transaction"), s("analytics.HitTypes.ITEM", "item"), s("analytics.HitTypes.TIMING", "timing"), s("analytics.HitTypes.EXCEPTION", "exception"), s("analytics.Tracker.HitEvent", U), s("analytics.Tracker.HitEvent.EVENT_TYPE", "a"), s("analytics.Tracker.HitEvent.prototype.getHitType", U.prototype.$b), s("analytics.Tracker.HitEvent.prototype.getHit", U.prototype.Zb), ta(Da, function (a) {
        var b = a.id.replace(/[A-Z]/, "_$&").toUpperCase();
        s("analytics.Parameters." + b, a)
    })
}();
var epubViewer = angular.module("epubViewer", []);
epubViewer.config(["$locationProvider", function ($locationProvider) {
    $locationProvider.html5Mode({enabled: !0, requireBase: !1})
}]), epubViewer.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(["self", "filesystem:**"]), $sceDelegateProvider.resourceUrlBlacklist([])
});
var Book = ePub({version: 1, restore: !1, storage: !1, spreads: !1, fixedLayout: !1, styles: {}});
epubViewer.controller("BookCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {
    angular.element(document).ready(function () {
        $uuid = $location.search().uuid, localStorage[$uuid] ? ($scope.book = JSON.parse(localStorage[$uuid]), void 0 === $scope.book.textSize && ($scope.book.textSize = 100)) : $scope.book = {
            begin: !0,
            end: !1,
            chapter: "",
            spinePos: $location.hash() ? $location.hash() : 0,
            textSize: 100,
            pageXOffset: 0,
            pageYOffset: 0
        }, $location.search().epub && Book.open($location.search().epub)
    }), angular.element(window).on("keypress", function (e) {
        shortcutKey(e, $scope)
    }), $scope.prevChapter = function () {
        $scope.book.spinePos > 0 && ($scope.book.spinePos = $scope.book.spinePos - 1, $scope.book.chapter = Book.spine[$scope.book.spinePos].url)
    }, $scope.nextChapter = function () {
        $scope.book.spinePos < Book.spine.length - 1 && ($scope.book.spinePos = $scope.book.spinePos + 1, $scope.book.chapter = Book.spine[$scope.book.spinePos].url)
    }, $scope.dialogShow = function (target) {
        var dialog = document.querySelector(target);
        dialog.showModal();
        var service = analytics.getService("Readiator"), tracker = service.getTracker("UA-331449-9");
        tracker.sendEvent("Click", target)
    }, $scope.dialogHide = function (target) {
        var dialog = document.querySelector(target);
        dialog.close()
    }, $scope.fontChange = function (zoom) {
        $scope.book.textSize = $scope.book.textSize + zoom;
        var iframe = document.getElementById("epubjs-iframe");
        iframe.contentWindow.document.body.style.fontSize = $scope.book.textSize + "%"
    }, $scope.search = function (keyEvent) {
        if (13 === keyEvent.which) {
            var query = keyEvent.srcElement.value, iframe = document.getElementById("epubjs-iframe");
            0 == iframe.contentWindow.find(query)
        }
    }, Book.on("book:ready", function () {
        $scope.book.metadata = Book.metadata, Book.contents.coverPath, $scope.book.chapter = Book.spine[$scope.book.spinePos].url;
        try {
            var $select = document.getElementById("book-toc"), docfrag = document.createDocumentFragment(), items = generateTocItems(Book.toc);
            docfrag.appendChild(items), $select.appendChild(docfrag)
        } catch (err) {
            console.log(err)
        }
        $scope.book.metadata = Book.metadata, $scope.$apply();
        var service = analytics.getService("Readiator"), tracker = service.getTracker("UA-331449-9");
        tracker.sendAppView("viewer"), tracker.sendEvent("Reading", book.metadata.bookTitle)
    })
}]), epubViewer.directive("ngOnload", ["$location", function ($location) {
    return function ($scope, element, attrs) {
        element.bind("load", function () {
            if (attrs.name = "epubjs-iframe") {
                if (element[0].contentWindow.addEventListener("keypress", function (e) {
                        shortcutKey(e, $scope)
                    }), element[0].contentWindow.document.body.style.fontSize = $scope.book.textSize + "%", ($scope.book.pageXOffset || $scope.book.pageYOffset) && (element[0].contentWindow.scrollTo($scope.book.pageXOffset, $scope.book.pageYOffset), $scope.book.pageXOffset = 0, $scope.book.pageYOffset = 0), Book.spine) {
                    var i = 0;
                    for (i in Book.spine)if (element[0].contentWindow.location.href.split("#")[0].indexOf(Book.spine[i].url) > -1) {
                        $scope.book.spinePos = parseInt(i), Book.spinePos = parseInt(i), $location.hash(i);
                        break
                    }
                    $scope.book.begin = !1, $scope.book.end = !1, 0 == $scope.book.spinePos && ($scope.book.begin = !0), $scope.book.spinePos == Book.spine.length - 1 && ($scope.book.end = !0)
                }
                $scope.$$phase || $scope.$apply()
            }
        })
    }
}]), window.onbeforeunload = function (event) {
    var $scope = angular.element(document.body).scope(), iframe = document.getElementById("epubjs-iframe");
    $scope.book.pageXOffset = iframe.contentWindow.pageXOffset, $scope.book.pageYOffset = iframe.contentWindow.pageYOffset, localStorage.setItem($uuid, JSON.stringify($scope.book))
};