import {defineVitestConfig} from "@nuxt/test-utils/config";

export default defineVitestConfig({
    test: {
        environment: 'nuxt',
        server: {
            deps: {
                inline: ['vuetify'],
            },
        },
        // environmentOptions: {
        //   nuxt: {
        //     rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
        //     domEnvironment: 'happy-dom', // 'happy-dom' (default) or 'jsdom'
        //     overrides: {
        //       // other Nuxt config you want to pass
        //     }
        //   }
        // }
    },
});
