import * as carlo from 'carlo'
import * as path from 'path'


import * as Bundler from 'parcel-bundler'

export type CarpenStartOptions = {
  dev?: boolean,
  port?: number,
  exposed?: {[functionName: string]: any},
}

export async function start (appDir: string, options: CarpenStartOptions = {}) {

  const IS_DEV = options.dev === true || process.env.NODE_ENV !== 'production'
  const PORT = options.port || 2342
  const EXPOSED = options.exposed || {}
  const HOST = `http://localhost`

  const entry = path.resolve(appDir, './index.html')

  const bundler = new Bundler(entry, {
    outDir: path.resolve(appDir, './.carpen'),
    cacheDir: path.resolve(appDir, './.carpen_cache'),
    minify: IS_DEV
  })

  await bundler.serve(PORT)

  const app = await carlo.launch({
  })
  Object.keys(EXPOSED).map(fnName => {
    const fn = EXPOSED[fnName]
    app.exposeFunction(fnName, fn)
    console.log('exposed', fnName)
  })

  if (IS_DEV) {
    app.serveOrigin(`http://${HOST}:${PORT}`)
  }

  app.on('exit', () => process.exit())

  await app.load(`${HOST}:${PORT}`)
}
