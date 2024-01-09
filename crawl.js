const { JSDOM } = require('jsdom');
const { argv } = require('node:process');
const { readline } = require('node:readline');

async function crawlPage(baseUrl, currentUrl, pages){
// base cases
 const baseUrlObj = new URL(baseUrl)
 const currentUrlObj = new URL(currentUrl)
if ( baseUrlObj.host !== currentUrlObj.host){
    return pages
}

const normalizedCurrent = normalizeUrl(currentUrl);

if (pages[normalizedCurrent] > 0){
    pages[normalizedCurrent] ++;
    return pages;
}
 
if (currentUrl === baseUrl){
    pages[normalizedCurrent] = 0;
    }else {
    pages[normalizedCurrent] = 1;
}


//console.log(`Crawling ${currentUrl}`)   
let htmlBody = '';
try{
 const response = await fetch(currentUrl)
 if (response.status >= 400){
    console.log(`${response.statusText}`)
    return pages;
 }
 if (! response.headers.get('Content-type').includes('text/html')){
    console.log('Error - not given html');
    return pages;
 }
htmlBody = await response.text()
}catch (err){
    console.log(err.message);
}
const nextURLs = getURLsFromHTML(htmlBody,baseUrl)
for (const nextUrl of nextURLs) {
    pages = await crawlPage(baseUrl, nextUrl, pages)
}
return pages
}

function getURLsFromHTML(htmlBody, baseUrl) {
    const jsdom = new JSDOM(htmlBody);
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const aElements = dom.window.document.querySelectorAll('a');
    for (const aElement of aElements){
        if (aElement.href.slice(0,1) === '/'){
            try {
                urls.push(new URL (aElement.href, baseUrl).href)
            }catch (err){
               console.log(`${err.message}: ${aElement.href}`)
            }
        }else {
            try{
                urls.push(new URL(aElement.href).href)
            }catch (err){
               console.log(`${err.message}: ${aElement.href}`)
            }
        }
    } 
    return urls

}

function normalizeUrl(url){
   let oldUrl = new URL(url);
   oldUrl = `${oldUrl.host}${oldUrl.pathname}`;
   let normalizedUrl;

   if (oldUrl[oldUrl.length - 1] == '/'){
    normalizedUrl = oldUrl.slice(0,-1);
    return normalizedUrl
   }
   return oldUrl;
}


module.exports = {
    normalizeUrl, getURLsFromHTML, crawlPage
}