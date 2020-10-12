const path = require('path')
// const path = require('path')

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        publicPath: '/dist/',
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    
    // devServer: {
    //     // writeToDisk: true,
    //     contentBase: "./dist",
    //     hot: true,
    //     proxy: {
    //         "/": "http://localhost:3000"
    //     }
    // }

    //     devServer: {
    //     historyApiFallback: true,
    //     hot: true,
    //     inline: true,
      
    //     host: 'localhost', // Defaults to `localhost`
    //     port: 3000, // Defaults to 8080
    //     proxy: {
    //     //   '^/api/*': {
    //         target: 'http://localhost:8080/',
    //         secure: false
    //     //   }
    //     }
    //   },
}
// module.exports = {
//     entry: './src/index.ts',
//     module: {
//         rules: [
//             {
//                 test: /\.ts$/,
//                 use: 'ts-loader',
//                 include: [path.resolve(__dirname, 'src')]
//             }
//         ]
//     },
//     resolve: {
//         extensions: ['.ts', '.js']
//     },
//     output: {
//         publicPath: '/dist',
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'dist')
//     },
//     // devServer: {
//     //     contentBase: "./dist",
//     //     hot: true,
//     // }

//     devServer: {
//         historyApiFallback: true,
//         hot: true,
//         inline: true,
      
//         host: 'localhost', // Defaults to `localhost`
//         port: 3000, // Defaults to 8080
//         proxy: {
//           '^/api/*': {
//             target: 'http://localhost:8080/',
//             secure: false
//           }
//         }
//       },
// 