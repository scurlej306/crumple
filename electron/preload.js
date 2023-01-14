const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('query', {
    submitQuery: (queryParams) => ipcRenderer.invoke('submitQuery', queryParams)
});

contextBridge.exposeInMainWorld('loader', {
    loadFile: (file) => ipcRenderer.invoke('loadFile', file)
});