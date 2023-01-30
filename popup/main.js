'use strict';

function log(data) {
    console.log(data);
}

function showRobotsTxt(text) {
    log(text);
    const contentHolder = document.getElementById('content');
    contentHolder.innerText = text;
    contentHolder.style.display = 'block';
}

function getHost(url) {
    //  doesn't work with file-url
    if(url.indexOf('file://') == 0)
        return;
    
    const parts = url.split('/');

    for(const i in parts) {
        const item = parts[i];
        if(item != '' &&
          (item.indexOf('.') != -1 || item.indexOf(':') != -1) &&
          item.indexOf(':') != item.length - 1)
            return parts[0] + '//' + item;     // return host with protocol
    }
    return;
}

function fetchRobotsTxt(url) {
    const host = getHost(url); 
    if(host != undefined)
        fetch(host + '/robots.txt').then((res) => {
            log(res);
            if(res.status == 200)
                res.text().then(showRobotsTxt);
            else "We load 'robots.txt' failed,statusCode is " + res.status
        });
}

browser.tabs.query({
    active: true
}).then((activeTabs) => {
    for(const i in activeTabs)
        if(activeTabs[i].url != undefined)
            fetchRobotsTxt(activeTabs[i].url);
});
