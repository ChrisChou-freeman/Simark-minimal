import type { ForgeConfig } from '@electron-forge/shared-types'
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives'
import { WebpackPlugin } from '@electron-forge/plugin-webpack'
import { MakerPKG } from '@electron-forge/maker-pkg'

import { mainConfig } from './webpack.main.config'
import { rendererConfig } from './webpack.renderer.config'

const appName = 'Simark'

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    appBundleId: `ChrisFreeManDev-hotmail.com.${appName}`,
    appCopyright: `© ${(new Date()).getFullYear()} ${appName}`,
    buildVersion: '1',
    executableName: appName,
    appCategoryType: 'public.app-category.productivity',
    osxSign: {
      type: 'distribution',
      identity: 'Apple Distribution',
      provisioningProfile: './simark-production.provisionprofile',
      optionsForFile: () => {
        return {
          hardenedRuntime: true,
          entitlements: './entitlements',
        }
      }
    },
    extraResource: [
      './src/resource/icon'
    ],
    icon: './src/resource/icon/AppIcon'
  },
  rebuildConfig: {},
  makers: [new MakerPKG({
    identity: '3rd Party Mac Developer Installer',
    install: './out',
    name: appName
  })],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/resource/index.html',
            js: './src/render',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),
  ],
}

export default config
