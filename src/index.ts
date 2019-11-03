import * as carlo from 'carlo'
import * as path from 'path'


import * as Bundler from 'parcel-bundler'

export type CarpenDevOptions = {
  dev?: boolean,
  port?: number,
  entryFile?: string,
  exposed?: {[functionName: string]: any},
}

export async function dev (appDir: string, options: CarpenDevOptions = {}) {

  const IS_DEV = options.dev !== false || process.env.NODE_ENV !== 'production'
  const PORT = options.port || 2342
  const EXPOSED = options.exposed || {}
  const HOST = `http://localhost`
  const ENTRY_FILE = options.entryFile || './index.html'

  const entry = path.resolve(appDir, ENTRY_FILE)

  const bundler = new Bundler(entry, {
    outDir: path.resolve(appDir, './.carpen'),
    cacheDir: path.resolve(appDir, './.carpen_cache'),
    minify: !IS_DEV
  })

  await bundler.serve(PORT)

  const app = await carlo.launch({
  })
  Object.keys(EXPOSED).map(fnName => {
    const fn = EXPOSED[fnName]
    app.exposeFunction(fnName, fn)
  })

  if (IS_DEV) {
    app.serveOrigin(`http://${HOST}:${PORT}`)
  }

  app.on('exit', () => process.exit())

  await app.load(`${HOST}:${PORT}`)
}

export type CarpenBuildOptions = {
  entryFile?: string,
}

export async function build (appDir: string, options: CarpenBuildOptions = {}) {
  const ENTRY_FILE = options.entryFile || './index.html'

  const entry = path.resolve(appDir, ENTRY_FILE)

  const bundler = new Bundler(entry, {
    outDir: path.resolve(appDir, './.carpen'),
    cacheDir: path.resolve(appDir, './.carpen_cache'),
    minify: true,
    sourceMaps: false,
    watch: false,
  })

  await bundler.bundle()
}
