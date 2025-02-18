import path from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __devMode = (process.env.NODE_ENV || 'development')

export default {
  entry: {
    'app': path.resolve(__dirname, `src/js/`, 'app.js')
  },
  output: {
    'path': path.resolve(__dirname, './'),
    'filename': `./assets/js/[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader : 'css-loader',
            options: { url: false }
          },
          {
            loader : 'sass-loader',
            options: {
              additionalData: `$env: ${__devMode}`,
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use: ['css-loader']
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.sass', '.pug', '.css'],
    alias: {
      'AppJs': path.resolve(__dirname, 'src', 'js'),
      'AppImg': path.resolve(__dirname, 'src', 'img'),
      'AppSass': path.resolve(__dirname, 'src', 'sass'),
      'AppCss': path.resolve(__dirname, 'src', 'css')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `./assets/css/style.css`,
    }),
  ]
}
