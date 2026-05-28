import type { Configuration } from 'webpack';
import webpack from 'webpack';
import 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { createWebpackConfig, defaultShared } from '@bka-stuff/pe-mfe-utils';
import { fileURLToPath } from "url";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  ...createWebpackConfig({
    appName: 'shell',
    resolve: path.resolve,
    _dirname: __dirname,
    port: 3000,
    publicPath: '/',
  }),

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/mandala.ico',
    }),

    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),

    new webpack.container.ModuleFederationPlugin({
      name: 'shell',

      remotes: {
        'pe-mfe-budget': `pe_mfe_budget@${process.env.MFE_BUDGET_URL}/remoteEntry.js`,
        'pe-mfe-dashboard': `pe_mfe_dashboard@${process.env.MFE_DASHBOARD_URL}/remoteEntry.js`,
        'pe-mfe-job-search': `pe_mfe_job_search@${process.env.MFE_JOB_SEARCH_URL}/remoteEntry.js`,
        'pe-mfe-home-maintenance': `pe_mfe_home_maintenance@${process.env.MFE_HOME_MAINTENANCE}/remoteEntry.js`,
        'pe-mfe-project-mgr': `pe_mfe_project_mgr@${process.env.MFE_PROJECT_MGR}/remoteEntry.js`,
        'pe-mfe-recipes': `pe_mfe_recipes@${process.env.MFE_RECIPES}/remoteEntry.js`,
      },

      shared: defaultShared,
    }),
  ]
} as Configuration;

export default config;
