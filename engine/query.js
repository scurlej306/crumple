const execute = (queryParams, dataRecords) => {
    let results = dataRecords.slice();
    for (let [key, value] of queryParams) {
        results = results.filter(record => record[key].toLowerCase() === value.toLowerCase());
    }
    return results;
};

module.exports = {
    execute
};