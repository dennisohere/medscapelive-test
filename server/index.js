import {createServer} from 'node:http'
import { handler } from '../.output/server/index.mjs'
import consola from 'consola'
import dotenv from 'dotenv'

dotenv.config({ silent: true })

const { PORT, NODE_ENV } = process.env;
// const isDev = NODE_ENV === 'development'

const server = createServer(handler)

const port = PORT || 80;

const listener = server.listen(port, '0.0.0.0', () => {
    const {port, address} = listener.address();

    consola.ready({
        message: `Server listening on http://${address}:${port}`,
        badge: true
    })
})
