//Babel transcompile files so browser understand

module.exports = {
  presets:[
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties'
  ]
};