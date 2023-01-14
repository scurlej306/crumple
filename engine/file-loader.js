const dataRecords = [];

const getDataRecords = () => dataRecords;

const loadFile = (file) => {
    const rows = file.split(/(?:\r)\n/g);
    const keys = rows.shift().split(",");

    rows.forEach(row => {
        const record = {};
        const data = row.split(",");
        keys.forEach((key, index) => {
            record[key] = data[index];
        });
        dataRecords.push(record);
    });
    return keys;
};

module.exports = {
    getDataRecords,
    loadFile
};