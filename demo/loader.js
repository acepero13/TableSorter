function init() {
    System.import('../out/src/sorter/Bootstrap.js').then(function (main) {

    });
}

function loadLibraries() {
    System.defaultJSExtensions = true;
    System.config({
        packages: {
            '../out/src/sorter': {
                defaultExtension: 'js',
                format: 'cjs'
            }
        }
    });
}