module.exports = (function () {
    var regex = /{[^%]+}/;

    return function (ouput) {
        var match = ouput.match(regex);

        if (match) {
            return JSON.parse(match[0]);
        }

        return {};
    };
}());
