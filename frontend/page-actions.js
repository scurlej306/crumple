const keys = new Set();

const addQueryParam = () => {
    const queryTable = document.getElementById('param-table');
    const newRow = queryTable.insertRow(-1);
    const attributeCell = newRow.insertCell(-1);
    const attrSelector = document.createElement('select');
    attributeCell.appendChild(attrSelector);
    setSelectorValues(attrSelector);

    const valueCell = newRow.insertCell(-1);
    const queryValue = document.createElement('input');
    queryValue.setAttribute('type', 'text');
    valueCell.appendChild(queryValue);

    const deleteCell = newRow.insertCell(-1);
    const deleteButton = document.createElement('input');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('value', 'Delete');
    deleteButton.onclick = deleteRow;
    deleteCell.appendChild(deleteButton);
};

const deleteRow = (event) => {
    const clickedButton = event.target;
    const cell = clickedButton.parentElement;
    const rowToDelete = cell.parentElement;
    rowToDelete.remove();
}

const submitQuery = async () => {
    document.body.style.cursor = 'wait';
    const queryTable = document.getElementById('param-table');
    const queryParams = new Map();
    for (let i = 1; i < queryTable.rows.length; i++) {
        const row = queryTable.rows[i];
        const attr = row.cells[0].children[0].value;
        const val = row.cells[1].children[0].value;
        queryParams.set(attr, val);
    }
    const response = await window.query.submitQuery(queryParams);
    const localKeys = new Set();
    for (let record of response) {
        for (let key in record) {
            localKeys.add(key);
        }
    }

    const resultsTable = document.createElement('table');
    const headers = resultsTable.insertRow(-1);
    for (let key of localKeys) {
        const header = document.createElement('th');
        const text = document.createTextNode(key);
        header.appendChild(text);
        headers.appendChild(header);
    }
    for (let record of response) {
        const row = resultsTable.insertRow(-1);
        localKeys.forEach(key => {
            const cell = row.insertCell(-1);
            const text = document.createTextNode(record[key]);
            cell.appendChild(text);
        });
    }
    const results = document.getElementById('output');
    const oldTable = results.children[0];
    oldTable.replaceWith(resultsTable);
    document.body.style.cursor = 'default';
};

const loadFile = async (event) => {
    document.body.style.cursor = 'wait';
    const files = event.target.files;
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = async function() {
            const fileText = reader.result;
            const fileKeys = await window.loader.loadFile(fileText);
            for (let key of fileKeys) {
                keys.add(key);
            }
            const params = document.getElementById('param-table');
            for (let i = 1; i < params.rows.length; i++) {
                const attrCell = params.rows[i].cells[0];
                const selector = attrCell.children[0];
                setSelectorValues(selector);
            }
        };
        reader.readAsText(file);
    });
    document.body.style.cursor = 'default';
};

function setSelectorValues(selector) {
    for (let key of keys) {
        let needsKey = true;
        for (let option of selector.options) {
            if (option.text === key) {
                needsKey = false;
                break;
            }
        }
        if (needsKey) {
            const option = document.createElement('option');
            option.text = key;
            selector.add(option);
        }
    }
}