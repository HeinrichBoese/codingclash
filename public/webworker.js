var runHidden = function(code) {
    var indexedDB = null;
    var location = null;
    var navigator = null;
    var onerror = null;
    var onmessage = null;
    var performance = null;
    var self = null;
    var webkitIndexedDB = null;
    var postMessage = null;
    var close = null;
    var openDatabase = null;
    var openDatabaseSync = null;
    var webkitRequestFileSystem = null;
    var webkitRequestFileSystemSync = null;
    var webkitResolveLocalFileSystemSyncURL = null;
    var webkitResolveLocalFileSystemURL = null;
    var addEventListener = null;
    var dispatchEvent = null;
    var removeEventListener = null;
    var dump = null;
    var onoffline = null;
    var ononline = null;
    var importScripts = null;
    var console = null;
    var application = null;
    
    return eval(code);
}

onmessage = function(e) {
    try {
        var workerResult = runHidden(decodeURIComponent(e.data));
    }
    catch {
        console.log('syntax error');
    }
    postMessage({source: 'iframe', payload: workerResult});
  }