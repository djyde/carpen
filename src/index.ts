import * as carlo from 'carlo'
import * as path from 'path'


import * as Bundler from 'parcel-bundler'

export type BeibyStartOptions = {
  dev?: boolean,
  port?: number,
}

export async function start (appDir: string, options: BeibyStartOptions = {}) {

  const IS_DEV = options.dev === true || process.env.NODE_ENV !== 'production'
  const PORT = options.port || 2342
  const HOST = `http://localhost`

  const entry = path.resolve(appDir, './index.html')

  const bundler = new Bundler(entry, {
    outDir: path.resolve(appDir, './.beiby'),
    cacheDir: path.resolve(appDir, './.beiby_cache'),
    minify: IS_DEV
  })

  await bundler.serve(PORT)

  console.log('launching app...')
  const app = await carlo.launch({
    args: [
      `--allow-running-insecure-content`
    ]
  })

  if (IS_DEV) {
    app.serveOrigin(`http://${HOST}:${PORT}`)
  }

  app.on('exit', () => process.exit())

  await app.load(`${HOST}:${PORT}`)
}
