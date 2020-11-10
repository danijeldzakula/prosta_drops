!function(c, h) {
    var e = /\+/g;

    function d(t) {
        return t
    }

    function f(t) {
        return decodeURIComponent(t.replace(e, " "))
    }
    c.cookie = function(t, e, r) {
        if (1 < arguments.length && (!/Object/.test(Object.prototype.toString.call(e)) || null == e)) {
            if (r = c.extend({}, c.cookie.defaults, r), null == e && (r.expires = -1), "number" == typeof r.expires) {
                var a = r.expires,
                    n = r.expires = new Date;
                n.setDate(n.getDate() + a)
            }
            return e = String(e), h.cookie = [encodeURIComponent(t), "=", r.raw ? e : encodeURIComponent(e), r.expires ? "; expires=" + r.expires.toUTCString() : "", r.path ? "; path=" + r.path : "", r.domain ? "; domain=" + r.domain : "", r.secure ? "; secure" : ""].join("")
        }
        for (var i, o = (r = e || c.cookie.defaults || {}).raw ? d : f, s = h.cookie.split("; "), u = 0; i = s[u] && s[u].split("="); u++)
            if (o(i.shift()) === t) return o(i.join("="));
        return null
    }, c.cookie.defaults = {}
}(jQuery, document),
function(s) {
    function u(t) {
        var e = "randDate" + t;
        if ("undefined" != typeof localStorage) return (r = localStorage.getItem(e)) || (r = (new Date).getTime() - 24 * t * 60 * 60 * 1e3, localStorage.setItem(e, r)), r;
        if (r = s.cookie(e)) return r;
        var r = (new Date).getTime() - 24 * t * 60 * 60 * 1e3;
        return s.cookie(e, r, {
            expires: 1
        }), r
    }

    function c(t, r, a) {
        var e = {
            year: t.getFullYear(),
            month: t.getMonth() + 1,
            day: t.getDate(),
            hour: t.getHours(),
            min: t.getMinutes(),
            sec: t.getSeconds()
        };
        return e.rus = function(t) {
            switch (t) {
                case 1:
                    return "januar";
                case 2:
                    return "februar";
                case 3:
                    return "mart";
                case 4:
                    return "april";
                case 5:
                    return "maj";
                case 6:
                    return "jun";
                case 7:
                    return "jul";
                case 8:
                    return "avgust";
                case 9:
                    return "septembar";
                case 10:
                    return "oktobar";
                case 11:
                    return "novembar";
                case 12:
                    return "decembar"
            }
        }(e.month), s.each(e, function(t, e) {
            "day" == t && a || e < 10 && (e = "0" + e), r = r.replace(t, e)
        }), r
    }
    var e = {
        init: function(t) {
            return this
        },
        rstart: function() {
            return this.each(function(t) {
                var e = s(this).attr("format"),
                    r = s(this).attr("daysago"),
                    a = void 0 !== s(this).attr("daysint");
                r = r || 29;
                var n = new Date(parseInt(u(r)));
                e ? s(this).html(c(n, e, a)) : s(this).html(c(n, "day rus year", a))
            })
        },
        rdate: function() {
            return this.each(function(t) {
                var e = s(this).attr("format"),
                    r = s(this).attr("daysago"),
                    a = void 0 !== s(this).attr("daysint");
                r = r || 29;
                var n = new Date(parseInt(u(r))),
                    i = 16 <= t ? 16 : t,
                    o = new Date(n.getTime() + i * (12 + i) * (60 + t) * 60 * (1e3 + t));
                e ? s(this).html(c(o, e, a)) : s(this).html(c(o, "day.month.year hour:min", a))
            })
        },
        ryear: function() {
            return this.each(function(t) {
                var e = s(this).data("decrease"),
                    r = e && 0 < e && e === parseInt(+e, 10) && !isNaN(parseInt(e)) ? e : 0;
                s(this).html((new Date).getFullYear() - r)
            })
        },
        rnow: function() {
            return this.each(function(t) {
                var e = s(this).attr("format"),
                    r = void 0 !== s(this).attr("daysint"),
                    a = new Date;
                e ? s(this).html(c(a, e, r)) : s(this).html(c(a, "day rus", r))
            })
        }
    };
    s.fn.randDate = function(t) {
        return e[t] ? e[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void s.error("ÐœÐµÑ‚Ð¾Ð´ Ñ Ð¸Ð¼ÐµÐ½ÐµÐ¼ " + t + " Ð½Ðµ ÑÑƒÑ‰ÐµÑÑ‚Ð²ÑƒÐµÑ‚ Ð´Ð»Ñ jQuery.randDate") : e.init.apply(this, arguments)
    }
}(jQuery), $(function() {
    $(".rstart, .startdate").randDate("rstart"), $(".rdate, .ypdate, .randdate").randDate("rdate"), $(".ryear, .nowyear").randDate("ryear"), $(".rnow, .nowdate").randDate("rnow")
});