module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        runtime: "automatic",
        importSource: "@dynatrace/react-native-plugin",
      },
    ],
  ],
};
// module.exports = {
//   plugins: [
//     [
//       "@babel/plugin-transform-react-jsx",
//       {
//         runtime: "automatic",
//         importSource: "@dynatrace/react-native-plugin",
//       },
//     ],
//   ],
// };