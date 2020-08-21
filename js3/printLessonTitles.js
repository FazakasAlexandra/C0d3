const request = require('request');

module.exports = {
    printLessons: () => {
        request("https://c0d3.com/api/lessons", (err, res, data) => {
            JSON.parse(data).forEach(lesson => {
                console.log(lesson.title)
            });
        })
    }
}