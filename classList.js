/*
 * polyfill for Element.classList
 * 1.0.0
 * By Max Ulyanov
 */

'use strict';

(function () {

    var classList = 'classList';
    if (classList in document.documentElement) {
        return;
    }


    /**
     *
     * @param DOMElement
     * @constructor
     */
    function DOMTokenList(DOMElement) {
        this.length = 0;
        this.value = DOMElement.className;
        this.DOMElement = DOMElement;
        var classesArray = this.value.replace(/^\s+|\s+$/g,'').split(' ');
        for (var i = 0; i < classesArray.length; i++) {
            var cl = classesArray[i];
            Array.prototype.push.call(this, cl);
        }

        this.length = classesArray.length;

    }


    /**
     *
     * @param token
     */
    DOMTokenList.prototype.add = function(token) {
        if(this.contains(token)) {
            return;
        }
        Array.prototype.push.call(this, token);
        this.DOMElement.className = this.toString();
    };


    /**
     *
     * @param token
     */
    DOMTokenList.prototype.remove = function(token) {
        if(!this.contains(token)) {
            return;
        }
        for (var i = 0; i < this.length; i++) {
            var cl = this[i];
            if(cl === token) {
                Array.prototype.splice.call(this, i, 1);
                break;
            }
        }
        this.DOMElement.className = this.toString();

    };


    /**
     *
     * @param index
     * @returns {*}
     */
    DOMTokenList.prototype.item = function(index) {
        return this[index];
    };


    /**
     *
     * @param token
     * @returns {boolean}
     */
    DOMTokenList.prototype.toggle = function(token) {
        var isContains = this.contains(token);
        if(isContains) {
           this.remove(token);
        }
        else {
            this.add(token);
        }

        return isContains;
    };


    /**
     *
     * @param token
     * @returns {boolean}
     */
    DOMTokenList.prototype.contains = function(token) {
        return this.DOMElement.className.indexOf(token) >= 0;
    };


    /**
     *
     * @returns {string}
     */
    DOMTokenList.prototype.toString = function() {
        return Array.prototype.join.call(this, ' ');
    };


    window.DOMTokenList = DOMTokenList;


    Object.defineProperty(Element.prototype, classList, {
        get: function() {
            return new DOMTokenList(this);
        }
    });


})();