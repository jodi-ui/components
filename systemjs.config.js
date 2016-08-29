System.config({
    defaultJSExtensions: true,
    transpiler: null,

    map: {
        'systemjs': 'node_modules/systemjs/dist/system.js',
        'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js',
        'jodi-ui-dom': 'node_modules/jodi-ui-dom/dist/dom.umd.js',
        'incremental-dom': 'node_modules/incremental-dom/dist/incremental-dom.js'
    }
});
