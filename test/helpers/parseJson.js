const regex = /{[^%]+}/;

module.exports = output => {
    const match = output.match(regex);

    if (match) {
        return JSON.parse(match[0]);
    }

    return {};
};
