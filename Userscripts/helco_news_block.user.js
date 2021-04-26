// ==UserScript==
// @name         Block News
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Block news while playing to allow more data into the API bot
// @author       Helcostr [1934501]
// @run-at       document-start
// @match        https://www.torn.com/*
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    const random = length =>{
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let str = '';
        for (let i = 0; i < length; i++)
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        return str;
    };
    const original_fetch = unsafeWindow.fetch;
    unsafeWindow.fetch = async (input, init) => {
        const payload = () => ({
            "ID":random(20),
            "date":"24\/04\/21",
            "time":"19:31:06",
            "message":"This is a frozen message. Disable the userscript to view the results."
        });
        const genList = [];
        for (let i = 0; i < 30; i++)
            genList.push(payload());
        if (/page\.php\?sid=factionsNews&step=list/.test(input));
            return new Response(JSON.stringify({"success":true,"list":genList,"startFrom":"1614973672631832166"}))
        return original_fetch(input, init);
    };
})();