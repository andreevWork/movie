module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],

        files: [
            './_build/**/*.js'
        ],
        browsers : ['Chrome']
    })
};