var fs = require('fs'),
    webpack = require('webpack'),
    path = require('path'),
    _ = require('underscore'),
    minimatch = require('minimatch');
var CleanWebpackPlugin = require('clean-webpack-plugin');

function getTestEntries() {
    var test_dir_initial = './',
        current_dir = test_dir_initial,
        multiply_entries = {},
        test_name_reg = /\/(\w+Test)/i,
        entries = fs.readdirSync(test_dir_initial),
        prev_dir = [], test_name;

    _.flatten(entries.map(getFilesRecursive))
        .filter(minimatch.filter('**/*Test.js'))
        .forEach(path => {
            test_name = path.match(test_name_reg);
            test_name = test_name[test_name.length - 1];

            // Записываем в объект с точками входа по имени тестового файла, его относительный путь
            multiply_entries[test_name] = ['babel-polyfill', './' + path];
    });

    // console.log(multiply_entries);

    return multiply_entries;

    function getFilesRecursive(dir) {
        if(dir === '_build') return [''];
        var stat =  fs.statSync(path.join(current_dir, dir)),
            entries1;

        // Если не директория, значит файл, просто возвращаем
        if(!stat.isDirectory()) return path.join(current_dir, dir);

        // Запоминаем текущую директорию
        prev_dir.push(current_dir);
        // Текущую директорию соединяем с переданной для того, чтобы использовать дальше в рекурсии
        current_dir = path.join(current_dir, dir);

        entries1 = fs.readdirSync(current_dir).map(getFilesRecursive);

        // Восстанавливаем текущую директорию, после возвращения из рекурсии
        current_dir = prev_dir.pop();

        return entries1;

    }
}

module.exports = {
    entry: getTestEntries(),
    output: {
        path: __dirname + '/_build',
        filename: "[name].js"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: /node_modules/
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ["transform-object-rest-spread"]
    },
    plugins: [
        new CleanWebpackPlugin(['_build'], {
            root: __dirname,
            verbose: true
        })
    ]
};