/* Cytyle - iOS Interface Cascading Style Sheet
 * Copyright (C) 2007-2015  Jay Freeman (saurik)
*/

(function() {
    var uncytyle = function(e, d) {
        e.className = e.className.replace(new RegExp('(\\s|^)' + d + '(\\s|$)'), ' ');
    };

    var find = function(e) {
        for (var item = e.target; item != null && item.nodeName != 'A'; item = item.parentNode);
        if (item != null && item.href == '')
            return null;
        return item;
    };

    if ('ontouchstart' in document.documentElement) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);

            document.addEventListener('click', function(e) {
                var item = find(e);
                if (item == null)
                    return;

                //TODO: Match for other website
                if (typeof cydia != 'undefined')
                    if (item.href.substr(0, 32) == 'http://cydia.saurik.com/package/')
                        item.href = 'cydia://package/' + item.href.substr(32);

                item.className += ' cytyle-dn';
                uncytyle(item, 'cytyle-in');
            });
        }, false);

        var timeout = null;
        var clear = function() {
            if (timeout == null)
                return;
            clearTimeout(timeout);
            timeout = null;
        };

        document.addEventListener('touchstart', function(e) {
            var item = find(e);
            if (item == null)
                return;

            uncytyle(item, 'cytyle-up');
            timeout = setTimeout(function() {
                if (timeout != null)
                    item.className += ' cytyle-in';
            }, 50);
        });

        var stop = function(e) {
            var item = find(e);
            if (item == null)
                return;

            clear();
            uncytyle(item, 'cytyle-in');
        };

        document.addEventListener('touchmove', stop);
        document.addEventListener('touchend', stop);
    } else {
        document.addEventListener('click', function(e) {
            var item = find(e);
            if (item == null)
                return;
            item.className += ' cytyle-dn';
            uncytyle(item, 'cytyle-in');
        });

        document.addEventListener('mousedown', function(e) {
            var item = find(e);
            if (item == null)
                return;

            uncytyle(item, 'cytyle-up');
            item.className += ' cytyle-in';
        });

        var stop = function(e) {
            var item = find(e);
            if (item == null)
                return;

            uncytyle(item, 'cytyle-in');
        };

        document.addEventListener('mousemove', stop);
        document.addEventListener('mouseup', stop);
    }

    var wipe = function(e) {
        var items = document.getElementsByClassName('cytyle-dn');
        for (var i = items.length, e = 0; i != e; --i) {
            var item = items.item(i - 1);
            uncytyle(item, 'cytyle-in');
            item.className += ' cytyle-up';
            uncytyle(item, 'cytyle-dn');
        }
    };

    var page = function(e) {
        window.removeEventListener('pageshow', page);
        window.addEventListener('pageshow', wipe);
    };

    if (typeof cydia != 'undefined')
        document.addEventListener("CydiaViewWillAppear", wipe);
    else if (typeof window.onpageshow != 'undefined')
        window.addEventListener('pageshow', page);
})();

if (navigator.userAgent.search(/Cydia/) == -1)
    document.write('<base target="_top"/>');
else {
    document.write('<style type="text/css"> body.pinstripe { background: none; } </style>');
    document.write('<base target="_blank"/>');
}

// XXX: this might just fail on Chrome everywhere, even Mac :(
// https://code.google.com/p/chromium/issues/detail?id=168646
if (navigator.userAgent.search(/Linux/) != -1)
    document.write('<style type="text/css"> p { text-rendering: optimizeSpeed !important; } </style>');

(function() {
    var cytyle = window.location.search;
    cytyle = cytyle.match(/^\?cytyle=(.*)$/);

    if (cytyle != null)
        cytyle = ' cytyle-' + cytyle[1];
    else {
        cytyle = navigator.userAgent;
        cytyle = cytyle.match(/.*; CPU (?:iPhone )?OS ([0-9_]*) like Mac OS X[;)]/);
        cytyle = cytyle == null ? '7.0' : cytyle[1].replace(/_/g, '.');
        cytyle = parseInt(cytyle);
        cytyle = cytyle >= 7 ? ' cytyle-flat' : ' cytyle-faux';
    }

    var body = document.documentElement;
    body.className += cytyle;

    if (window.devicePixelRatio && devicePixelRatio >= 2) {
        var test = document.createElement('div');
        test.style.border = '.5px solid transparent';
        body.appendChild(test);
        if (test.offsetHeight == 1)
            body.className += ' cytyle-hair';
        body.removeChild(test);
    }
})();

(function() {
    var update = function() {
        if (window.parent != window)
            parent.postMessage({cytyle: {name: "iframe-y", value: document.body.scrollHeight}}, "*");
    };

    window.addEventListener('message', function(event) {
        var message = event.data.cytyle;
        if (message == undefined)
            return;

        switch (message.name) {
            case "iframe-y":
                var height = message.value;
                var iframes = document.getElementsByTagName("iframe");
                if (iframes.length != 1)
                    return;
                var iframe = iframes.item(0);
                iframe.style.height = height + 'px';
                update();
            break;
        }
    }, false);

    window.addEventListener('load', update, false);
})();

(function() {
    var text = document.createElement("span");
    text.appendChild(document.createTextNode("My"));

    var block = document.createElement("div");
    block.style.display = "inline-block";
    block.style.height = "0px";
    block.style.width = "1px";

    var div = document.createElement("div");
    div.id = 'cytyle-metric';
    div.style.lineHeight = "normal";

    div.appendChild(text);
    div.appendChild(block);

    var body = document.documentElement;
    body.appendChild(div); try {
        var full = text.offsetHeight;

        var style = div.currentStyle;
        if (typeof style == 'undefined')
            style = window.getComputedStyle(div, null);
        var font = parseInt(style.fontSize);

        block.style.verticalAlign = "baseline";
        var base = block.offsetTop - text.offsetTop;
        // XXX: on iOS 3 I am unable to do this?
        if (base == 0)
            base = 14;
    } finally {
        body.removeChild(div);
    }

    var top = base - font * 0.75;

    //var down = (font - base) / font / 2;
    //alert(down + "em = (" + font + " - " + base + ") / " + font + " / 2");
    var down = ((full - (base - top)) / 2 - top) / font;
    //alert(down + "em = ((" + full + " - (" + base + " - " + top + ")) / 2 - " + top + ") / " + font);

    //var over = 4.0; // Modern
    //var over = 2.5; // Legacy
    //var over = 3.5; // Chrome
    //var over = 3.0; // Medium
    //var desc = font * 0.25;
    //var down = (desc - over) / font;

    document.write('<style type="text/css"> p, input[type="password"], input[type="text"], select { top: ' + down + 'em; } </style>');
})();
/* XXX: this message is ultra-lame */
var _assert = function (expr, value) {
    if (!expr) {
        var message = "_assert(" + value + ")";
        console.log(message);
        throw message;
    }
}

// Compatibility {{{
if (typeof Array.prototype.push != "function")
    Array.prototype.push = function (value) {
        this[this.length] = value;
    };
// }}}

var $ = function (arg, doc) {
    if (this.magic_ != $.prototype.magic_)
        return new $(arg);

    if (arg == null)
        arg = [];

    var type = $.type(arg);

    if (type == "function")
        $.ready(arg);
    else if (type == "string") {
        if (typeof doc == 'undefined')
            doc = document;
        if (arg.charAt(0) == '#') {
            /* XXX: this is somewhat incorrect-a-porter */
            var element = doc.getElementById(arg.substring(1));
            return $(element == null ? [] : [element]);
        } else if (arg.charAt(0) == '.')
            return $(doc.getElementsByClassName(arg.substring(1)));
        else
            return $([doc]).descendants(arg);
    } else if (typeof arg.length != 'undefined') {
        _assert(typeof doc == 'undefined', "non-query with document to $");
        this.set(arg);
        return this;
    } else _assert(false, "unknown argument to $: " + typeof arg);
};

$.handlers = [];

$.check = function(code) {
    return function(arg0, arg1, arg2) { try {
        code(arg0, arg1, arg2);
    } catch (e) {
        var handlers = $.handlers;
        for (var i = 0; i != handlers.length; ++i) {
            var handler = handlers[i];
            handler(e);
        }
    } };
};

$.xml = function (value) {
    if (typeof value == 'undefined' || value == null)
        return value;

    return value
        .replace(/&/, "&amp;")
        .replace(/</, "&lt;")
        .replace(/>/, "&gt;")
        .replace(/"/, "&quot;")
        .replace(/'/, "&apos;")
    ;
};

$.uri = function(value) {
    if (typeof value == 'undefined' || value == null)
        return value;

    return encodeURI(value);
};

$.type = function (value) {
    var type = typeof value;

    if ((type == "function" || type == "object") && value.toString != null) {
        var string = value.toString();
        if (string.substring(0, 8) == "[object ")
            return string.substring(8, string.length - 1);
    }

    return type;
};

(function () {
    var ready_ = null;

    $.ready = function (_function) {
        if (ready_ == null) {
            ready_ = [];

            document.addEventListener("DOMContentLoaded", function () {
                for (var i = 0; i != ready_.length; ++i) {
                    var ready = ready_[i];
                    $.check(ready)();
                }
            }, false);
        }

        ready_.push(_function);
    };
})();

/* XXX: verify arg3 overflow */
$.each = function (values, _function, arg0, arg1, arg2) {
    for (var i = 0, e = values.length; i != e; ++i)
        _function(values[i], arg0, arg1, arg2);
};

/* XXX: verify arg3 overflow */
$.map = function (values, _function, arg0, arg1, arg2) {
    var mapped = [];
    for (var i = 0, e = values.length; i != e; ++i)
        mapped.push(_function(values[i], arg0, arg1, arg2));
    return mapped;
};

$.array = function (values) {
    if (values.constructor == Array)
        return values;
    _assert(typeof values.length != 'undefined', "$.array on underlying non-array");
    var array = [];
    for (var i = 0; i != values.length; ++i)
        array.push(values[i]);
    return array;
};

$.document = function (node) {
    for (;;) {
        var parent = node.parentNode;
        if (parent == null)
            return node;
        node = parent;
    }
};

$.reclass = function (_class) {
    return new RegExp('(\\s|^)' + _class + '(\\s|$)');
};

$.prototype = {
    magic_: 2041085062,

    add: function (nodes) {
        Array.prototype.push.apply(this, $.array(nodes));
    },

    at: function (name, value) {
        if (typeof value == 'undefined')
            return $.map(this, function (node) {
                return node.getAttribute(name);
            });
        else if (value == null)
            $.each(this, function (node) {
                node.removeAttribute(name);
            });
        else
            $.each(this, function (node) {
                node.setAttribute(name, value);
            });
    },

    set: function (nodes) {
        this.length = 0;
        this.add(nodes);
    },

    /* XXX: verify arg3 overflow */
    each: function (_function, arg0, arg1, arg2) {
        $.each(this, function (node) {
            _function($([node]), arg0, arg1, arg2);
        });
    },

    css: function (name, value) {
        $.each(this, function (node) {
            node.style[name] = value;
        });
    },

    addClass: function (_class) {
        $.each(this, function (node) {
            if (!$([node]).hasClass(_class)[0])
                node.className += " " + _class;
        });
    },

    blur: function () {
        $.each(this, function (node) {
            node.blur();
        });
    },

    focus: function () {
        $.each(this, function (node) {
            node.focus();
        });
    },

    removeClass: function (_class) {
        $.each(this, function (node) {
            node.className = node.className.replace($.reclass(_class), ' ');
        });
    },

    hasClass: function (_class) {
        return $.map(this, function (node) {
            return node.className.match($.reclass(_class));
        });
    },

    append: function (children) {
        var value = $([]);

        if ($.type(children) == "string")
            $.each(this, function (node) {
                var doc = $.document(node);

                // XXX: implement wrapper system
                var div = doc.createElement("div");
                div.innerHTML = children;

                while (div.childNodes.length != 0) {
                    var child = div.childNodes[0];
                    node.appendChild(child);
                    value.add([child]);
                }
            });
        else
            $.each(this, function (node) {
                $.each(children, function (child) {
                    node.appendChild(child);
                    value.add([child]);
                });
            });

        return value;
    },

    xpath: function (expression) {
        var value = $([]);

        $.each(this, function (node) {
            var doc = $.document(node);
            var results = doc.evaluate(expression, node, null, XPathResult.ANY_TYPE, null);
            var result;
            while (result = results.iterateNext())
                value.add([result]);
        });

        return value;
    },

    clone: function (deep) {
        return $($.map(this, function (node) {
            return node.cloneNode(deep);
        }));
    },

    descendants: function (expression) {
        var descendants = $([]);

        $.each(this, function (node) {
            var nodes = node.getElementsByTagName(expression);
            descendants.add(nodes);
        });

        return descendants;
    },

    remove: function () {
        $.each(this, function (node) {
            node.parentNode.removeChild(node);
        });
    }
};

$.scroll = function (x, y) {
    window.scrollTo(x, y);
};

// XXX: document.all?
$.all = function (doc) {
    if (typeof doc == 'undefined')
        doc = document;
    return $(doc.getElementsByTagName("*"));
};

$.inject = function (a, b) {
    if ($.type(a) == "string") {
        $.prototype[a] = function (value) {
            if (typeof value == 'undefined')
                return $.map(this, function (node) {
                    return b.get(node);
                });
            else
                $.each(this, function (node, value) {
                    b.set(node, value);
                }, value);
        };
    } else for (var name in a)
        $.inject(name, a[name]);
};

$.inject({
    _default: {
        get: function (node) {
            return node.style.defaultValue;
        },
        set: function (node, value) {
            node.style.defaultValue = value;
        }
    },

    html: {
        get: function (node) {
            return node.innerHTML;
        },
        set: function (node, value) {
            node.innerHTML = value;
        }
    },

    href: {
        get: function (node) {
            return node.href;
        },
        set: function (node, value) {
            node.href = value;
        }
    },

    name: {
        get: function (node) {
            return node.name;
        },
        set: function (node, value) {
            node.name = value;
        }
    },

    parent: {
        get: function (node) {
            return node.parentNode;
        }
    },

    src: {
        get: function (node) {
            return node.src;
        },
        set: function (node, value) {
            node.src = value;
        }
    },

    type: {
        get: function (node) {
            return node.localName;
        }
    },

    value: {
        get: function (node) {
            return node.value;
        },
        set: function (node, value) {
            // XXX: do I really need this?
            if (true || node.localName != "select")
                node.value = value;
            else {
                var options = node.options;
                for (var i = 0, e = options.length; i != e; ++i)
                    if (options[i].value == value) {
                        if (node.selectedIndex != i)
                            node.selectedIndex = i;
                        break;
                    }
            }
        }
    },

    width: {
        get: function (node) {
            return node.offsetWidth;
        }
    }
});

// Cookies {{{
$.cookie = function(name, value, path) {
    document.cookie = name + "=" + escape(value) + ';path=' + path;
};
// }}}
// Query String Parsing {{{
$.query = function (search) {
    if (typeof search == "undefined") {
        search = location.search;
        if (search == '')
            search = null;
        else if (search != null) {
            _assert(search[0] == "?", "query string without ?");
            search = search.substring(1);
        }
    }

    _assert(typeof search != "undefined");

    if (search == null)
        return null;

    var args = {};

    var values = search.split("&");
    for (var index in values) {
        var value = values[index]
        var equal = value.indexOf("=");
        var name;

        if (equal == -1) {
            name = value;
            value = null;
        } else {
            name = value.substring(0, equal);
            value = value.substring(equal + 1);
            value = decodeURIComponent(value);
        }

        name = decodeURIComponent(name);
        if (typeof args[name] == "undefined")
            args[name] = [];
        if (value != null)
            args[name].push(value);
    }

    return args;
};
// }}}
// Event Registration {{{
// XXX: unable to remove registration
$.prototype.event = function (event, _function) {
    _function = $.check(_function);

    $.each(this, function (node) {
        // XXX: smooth over this pointer ugliness
        if (node.addEventListener)
            node.addEventListener(event, _function, false);
        else if (node.attachEvent)
            node.attachEvent("on" + event, _function);
        else
            // XXX: multiple registration SNAFU
            node["on" + event] = _function;
    });
};

$.each([
    "click", "load", "submit"
], function (event) {
    $.prototype[event] = function (_function) {
        if (typeof _function == 'undefined')
            _assert(false, "undefined function to $.[event]");
        else
            this.event(event, _function);
    };
});
// }}}
// Timed Animation {{{
$.interpolate = function (duration, event) {
    var start = new Date();

    var next = function () {
        setTimeout(update, 0);
    };

    var update = function () {
        var time = new Date() - start;

        if (time >= duration)
            event(1);
        else {
            event(time / duration);
            next();
        }
    };

    next();
};
// }}}
// AJAX Requests {{{
// XXX: abstract and implement other cases
$.noop = function() {
};

$.xhr = function (url, method, headers, data, events) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    for (var name in headers)
        xhr.setRequestHeader(name.replace(/_/, "-"), headers[name]);

    if (events == null)
        events = {};

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            var text = xhr.responseText;
            if (events.response != null)
                events.response(status, text);
            if (status == 200) {
                if (events.success != null)
                    $.check(events.success)(text);
            } else {
                if (events.failure != null)
                    events.failure(status);
            }

            xhr.onreadystatechange = $.noop;
            xhr = null;
        }
    };

    xhr.send(data);
};

$.call = function (url, post, onsuccess) {
    var events = {};

    if (onsuccess != null)
        events.complete = function (text) {
            $.check(onsuccess)(eval(text));
        };

    if (post == null)
        $.xhr(url, "POST", null, null, events);
    else
        $.xhr(url, "POST", {
            Content_Type: "application/json"
        }, $.json(post), events);
};
// }}}
// WWW Form URL Encoder {{{
$.form = function (parameters) {
    var data = "";

    var ampersand = false;
    for (var name in parameters) {
        if (!ampersand)
            ampersand = true;
        else
            data += "&";

        var value = parameters[name];

        data += escape(name);
        data += "=";
        data += escape(value);
    }

    return data;
};
// }}}
// JSON Serializer {{{
$.eval = function (value) {
    if (value == null)
        return null;
    // XXX: safety mechanism?
    return eval('(' + value + ')');
};

$.json = function (value) {
    if (value == null)
        return "null";

    var type = $.type(value);

    if (type == "undefined")
        return "undefined";
    else if (type == "number")
        return value;
    else if (type == "string")
        return "\"" + value
            .replace(/\\/, "\\\\")
            .replace(/\t/, "\\t")
            .replace(/\r/, "\\r")
            .replace(/\n/, "\\n")
            .replace(/"/, "\\\"")
        + "\"";
    else if (value.constructor == Array) {
        var json = "[";
        var comma = false;

        for (var i = 0; i != value.length; ++i) {
            if (!comma)
                comma = true;
            else
                json += ",";

            json += $.json(value[i]);
        }

        return json + "]";
    } else if (
        value.constructor == Object &&
        value.toString() == "[object Object]"
    ) {
        var json = "{";
        var comma = false;

        for (var name in value) {
            if (!comma)
                comma = true;
            else
                json += ",";

            json += $.json(name) + ":" + $.json(value[name]);
        }
        return json + "}";
    } else {
        return value;
    }
};
// }}}
