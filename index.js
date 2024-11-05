import data from './rawBooks.json' assert { type: 'json' };
// console.log(data[0]['read?']);

let n = 0;
let totalDays = 0;

for (let i = 0; i < data.length; i++) {
    if (data[i]['read?'] == 'Yes' && data[i]['Date Bought'] != "" && data[i]['Date Read'] != "" && data[i]['Time on TBR (days)'] != "N/A" && data[i]['Date Read'] != "N/A") {
        // console.log(data[i]['Time on TBR (days)']);
        totalDays += parseInt(data[i]['Time on TBR (days)']);
        n++;
    }
}

console.log('Average read time: ' + (totalDays / n) + ' days');

let isRead = 0;

for (let i = 0; i < data.length; i++) {
    if (data[i]['read?'] == 'Yes') {
        isRead++;
    }
}
console.log('Percentage of books read: ' + (isRead / data.length) * 100 + '%');

// const genre = [];

let genre = new Array();
let genreCount = new Array();

for (let i = 0; i < data.length; i++) {
    if (data[i]["category"] != undefined) {
        if (!genre.includes(data[i]["category"])) {
            genre.push(data[i]["category"]);
            genreCount.push(0);
        }
        genreCount[genre.indexOf(data[i]["category"])] = genreCount[genre.indexOf(data[i]["category"])] + 1;
    }
}

for (let i = 0; i < genre.length; i++){
    for (let j = 0; j < genre.length; j++){
        if (genreCount[j] < genreCount[i]){
            let temp = genreCount[j];
            genreCount[j] = genreCount[i];
            genreCount[i] = temp;
            temp = genre[j];
            genre[j] = genre[i];
            genre[i] = temp;
        }
    }
}

// for (let i = 0; i < genre.length; i++) {
//     console.log(genre[i] + ': ' + genreCount[i]);
// }

// if I were to only console.log the favorite genre
console.log('Favorite genre: ' + genre[0] + ' with ' + genreCount[0] + ' books');

let author = new Array();
let authorBookCount = new Array();

for (let i = 0; i < data.length; i++) {
    if (data[i]["author"] != undefined) {
        if (!author.includes(data[i]["author"])) {
            author.push(data[i]["author"]);
            authorBookCount.push(0);
        }
        authorBookCount[author.indexOf(data[i]["author"])] = authorBookCount[author.indexOf(data[i]["author"])] + 1;
    }
}

for (let i = 0; i < author.length; i++){
    for (let j = 0; j < author.length; j++){
        if (authorBookCount[j] < authorBookCount[i]){
            let temp = authorBookCount[j];
            authorBookCount[j] = authorBookCount[i];
            authorBookCount[i] = temp;
            temp = author[j];
            author[j] = author[i];
            author[i] = temp;
        }
    }
}

// for (let i = 0; i < author.length; i++) {
//     console.log(author[i] + ': ' + authorBookCount[i]);
// }

// if I were to only console.log the favorite author
console.log('Favorite author: ' + author[0] + ' with ' + authorBookCount[0] + ' books');

let numberOfPagesRead = 0;

for (let i = 0; i < data.length; i++) {
    if (data[i]['read?'] == 'Yes' && data[i]['# Pages'] != "" && data[i]['# Pages'] != "#REF!") {
        numberOfPagesRead += parseInt(data[i]['# Pages']);
    }
}

console.log('Total number of pages read: ' + numberOfPagesRead);

let month = new Array(12);
let monthBoughtCount = new Array(12);

// month[0] = "January";
// month[1] = "February";
// month[2] = "March";
// month[3] = "April";
// month[4] = "May";
// month[5] = "June";
// month[6] = "July";
// month[7] = "August";
// month[8] = "September";
// month[9] = "October";
// month[10] = "November";
// month[11] = "December";

for (let i = 0; i < data.length; i++) {
    if (data[i]["Date Bought"] != "") {
        for (let j = 0; j < month.length; j++) {
            if (data[i]["Date Bought"].includes(month[j])) {
                monthBoughtCount[j] = monthBoughtCount[j] + 1;
            }
        }
    }
}

for (let i = 0; i < month.length; i++){
    for (let j = 0; j < month.length; j++){
        if (monthBoughtCount[j] < monthBoughtCount[i]){
            let temp = monthBoughtCount[j];
            monthBoughtCount[j] = monthBoughtCount[i];
            monthBoughtCount[i] = temp;
            temp = month[j];
            month[j] = month[i];
            month[i] = temp;
        }
    }
}

// for (let i = 0; i < month.length; i++) {
//     console.log(month[i] + ': ' + monthBoughtCount[i]);
// }

// if I were to only console.log the favorite month
console.log('Month with most books bought: ' + month[0] + ' with ' + monthBoughtCount[0] + ' books bought');

const months = 12;
const firstPurchaseYear = 2007;
const currentYear = new Date().getFullYear();
const totalYears = currentYear - firstPurchaseYear + 1;

// Initialize the 2D array
let monthAndYear = Array.from({ length: months }, () => Array(totalYears).fill(0));

// Populate the 2D array with the number of books bought in each month and year
for (let monthIndex = 0; monthIndex < months; monthIndex++) {
    for (let yearIndex = 0; yearIndex < totalYears; yearIndex++) {
        const year = firstPurchaseYear + yearIndex;
        const month = monthIndex + 1; // JavaScript months are 0-based, so add 1
        const monthYearString = `${year}-${month.toString().padStart(2, '0')}`;

        monthAndYear[monthIndex][yearIndex] = data.filter(item => {
            const dateBought = item['Date Bought'];
            return typeof dateBought === 'string' && dateBought.includes(monthYearString);
        }).length;
    }
}

// Debug: Print the monthAndYear array
console.log('monthAndYear array:', monthAndYear);

// Find the month and year with the most books bought
let favoriteMonthIndex = 0;
let favoriteYearIndex = 0;
let maxBooksBought = 0;

for (let monthIndex = 0; monthIndex < months; monthIndex++) {
    for (let yearIndex = 0; yearIndex < totalYears; yearIndex++) {
        if (monthAndYear[monthIndex][yearIndex] > maxBooksBought) {
            maxBooksBought = monthAndYear[monthIndex][yearIndex];
            favoriteMonthIndex = monthIndex;
            favoriteYearIndex = yearIndex;
        }
    }
}

// Debug: Print the favorite month and year indices and maxBooksBought
console.log('favoriteMonthIndex:', favoriteMonthIndex);
console.log('favoriteYearIndex:', favoriteYearIndex);
console.log('maxBooksBought:', maxBooksBought);

// Create an array of month names for better readability
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

console.log('Month with most books bought: ' + monthNames[favoriteMonthIndex] + ' ' + (firstPurchaseYear + favoriteYearIndex) + ' with ' + maxBooksBought + ' books bought');









// fetch('./rawBooks.json')
//     .then((response) => response.json())
//     .then((json) => console.log(json));