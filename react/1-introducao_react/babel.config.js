module.export = {
  // utilizamos a sintaxe antiga para a exportação
  presets: [
    // altera as funcionalidades que o navegador ainda nao entende no JS
    // (Ex.: import, export, classes, arrow functions, etc )
    '@babel/preset-env',
    // altera as funcionalidades que o navegador ainda nao entende no React
    // (Ex.: JSX)
    '@babel/preset-react' //
  ]
};
