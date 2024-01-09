const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

 async function main(){

if (argv.length === 2){
    console.log('Not enough commend-line arguments');
    return 1
}else if (argv.length > 3){
    console.log('Too many commend-line arguments');   
}else {
    console.log('Web Crawler starting up');
    const pages = await crawlPage(argv[2], argv[2], {});
    printReport(pages);    
 }
}

main()