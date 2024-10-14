import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VDateInput } from 'vuetify/labs/VDateInput'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        // ... your configuration
        components: {
            VDateInput,
        },
        theme: {
            themes: {
                light: {
                    variables: {
                        primary: '#4b4b4b',
                        secondary: '#777777',
                        accent: '#82B1FF',
                        error: '#FF5252',
                        info: '#2196F3',
                        success: '#4CAF50',
                        warning: '#FFC107'
                    }
                }
            }
        },
    })
    app.vueApp.use(vuetify)
})
