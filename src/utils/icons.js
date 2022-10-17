const context = require.context("./png", true, /\.svg$/)

context.keys().map(context)