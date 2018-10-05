var proyecto = 'off-canvas', // nombre proyecto ¡Cambia esto por lo menos!
    homePATH = 'C:/www/off-canvas', // path proyecto
    orig = homePATH + '/src/', // materia prima proyecto 
    dest = homePATH + '/dist/', // destino final 
    proxySERVER = 'http://127.0.0.1/off-canvas/dist', // server proxy url
    archivo_js = 'main.js',
    // archivo_css = 'main.css',
    node_modules = homePATH + '/node_modules/'; // Archivos y paquetes , npm packages

module.exports = {
    // ### path
    origen: orig,
    destino: dest,
    // ### styles
    styles: {
        origen: orig + 'scss/**/*.scss',
        destino: dest,
        // concat: {
        //     path: archivo_css,
        // },
        cssnano: {
            autoprefixer: {
                add: true,
                browsers: ['> 3%', 'last 2 versions', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'] // This tool is magic and you should use it in all your projects :)
            },
            options: {
                sourcemap: true
            }

        },
        libsass: { // Requires the libsass implementation of Sass (included in this package)
            includePaths: [ // Adds Bower and npm directories to the load path so you can @import directly
                // node_modules + 'compass/',
                node_modules,
            ],
            precision: 6,
            // onError: function (err) {
            //     return console.log(err);
            // }
        }

    },

    // ### htmls
    htmls: {
        origen: orig + 'html/**/*(*.php|*.html)',
        destino: dest,
    },
    // ### scriptsjs
    scriptsjs: {
        origen: orig + 'js/**/*.js',
        destino: dest,
        concat: {
            path: archivo_js,
            newLine: ';',
        },
        uglify: {
            compress: false,
            warnings: false,
            mangle: false,
        },
    },
    /// ### browsersync
    browsersync: {
        files: [dest + '**/*'], //  files
        online: true, // online ( true o false )
        notify: false, // In-line notifications (the blocks of text saying whether you are connected to the BrowserSync server or not)
        open: true, // Set to false if you don't like the browser window opening automatically
        reloadOnRestart: true, ///   Recargue cada navegador cuando se reinicie Browsersync.
        injectChanges: true, // Commnet it to reload browser for every CSS change.
        port: 3030, // Port number for the live version of the site; default: 3000
        reloadDelay: 2000, // delay in milliseconds
        browser: ["firefox", "chrome"], // browser
        proxy: proxySERVER, // We need to use a proxy instead of the built-in server because WordPress has to do some server-side rendering for the theme to work
    },
}