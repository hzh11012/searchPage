module.exports = {
    chainWebpack: config => {
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main.js')

            config.set('externals', {
                vue: 'Vue',
                vuex: 'Vuex',
                'vue-router': 'VueRouter',
                axios: 'axios'
            })
        })

        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main.js')
        })
    },
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }
}