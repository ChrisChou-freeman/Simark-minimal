import type { ForgeConfig } from '@electron-forge/shared-types'
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives'
import { WebpackPlugin } from '@electron-forge/plugin-webpack'
import { MakerPKG } from '@electron-forge/maker-pkg'

import { mainConfig } from './webpack.main.config'
import { rendererConfig } from './webpack.renderer.config'

const appName = 'Simark'

const config: ForgeConfig = {
  packagerConfig: {
    appVersion: '1.0.0',
    appBundleId: `ChrisFreeManDev-hotmail.com.${appName}`,
    appCopyright: `Copyright © ${(new Date()).getFullYear()} ${appName}`,
    buildVersion: '2',
    name: 'Simark',
    executableName: appName,
    appCategoryType: 'public.app-category.productivity',
    asar: true,
    osxSign: {
      type: 'development',
      identity: 'Apple Development: Chris Chou (3V37VL44W8)',
      provisioningProfile: './build/embedded.provisionprofile',
      
      //no matter set or not to set optionsForFile option is the same result 
      optionsForFile: (filePath) => {
        if (filePath.endsWith('Simark.app')) {
          return {
            entitlements: './build/default.mas.plist',
          }
        } else if (filePath.includes('Library/LoginItems')) {
          return {
            entitlements: './build/default.mas.loginhelper.plist',
          }
        } else {
          return {
            entitlements: './build/default.mas.child.plist',
          }
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
