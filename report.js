function printReport(pages){
console.log('Report starting');
const sortedPages = sortObject(pages)
for (const [url,visits] of Object.entries(sortedPages)){
    console.log(`Found ${visits} internal link to ${url}`);

}

}


function sortObject(object){
    const objectArray = Object.entries(object);

    objectArray.sort((a, b) => b[1] - a[1]);

    const descendingObject = Object.fromEntries(objectArray)

    return descendingObject
}
module.exports = {
printReport,
}