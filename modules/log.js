const fs = require('fs');

exports.log = function(log) {
    datum = new Date;
    sekunde = datum.getSeconds();
    minute = datum.getMinutes();
    stunde = datum.getHours();
    tag = datum.getDate();
    monat = datum.getMonth() + 1;
    jahr = datum.getFullYear();
    dateiname = "log" + "." + tag + "." + monat + "." + jahr + ".txt";
    zeilenbeginn = "[" + stunde + ":" + minute + ":" + sekunde + "] "
    fs.appendFile('../logs/' + dateiname, zeilenbeginn + log + "\n", (err) => {
        if (err) throw err;
    });
    console.log(log);
}
exports.systemlog = function(log) {
    datum = new Date;
    sekunde = datum.getSeconds();
    minute = datum.getMinutes();
    stunde = datum.getHours();
    tag = datum.getDate();
    monat = datum.getMonth() + 1;
    jahr = datum.getFullYear();
    zeilenbeginn = "[" + tag + ":" + monat + ":" + jahr + ":" + stunde + ":" + minute + ":" + sekunde + "] "
    fs.appendFile('../logs/systemlog.txt', zeilenbeginn + log + "\n", (err) => {
        if (err) throw err;
    });
    console.log(log);
}