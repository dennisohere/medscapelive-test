import consola from 'consola'

const level = parseInt(process.env.CONSOLA_LEVEL || '-1')
export const logger = consola.create({
  level
})
