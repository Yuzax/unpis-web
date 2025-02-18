import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

export default merge(common, {
  mode: 'production',
  devtool: false,
  optimization: {
      minimize: true,
      minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin({
              terserOptions: {
                  compress: {
                      drop_console: true,
                  },
              },
          }),
      ],
  },
})