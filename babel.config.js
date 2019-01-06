module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {},
        'transform-runtime': {},
        'styled-jsx': {},
        'class-properties': {},
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-react-jsx',
  ],
};
