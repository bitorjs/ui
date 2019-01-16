module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [
            "last 1 Chrome versions"
          ]
        }
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-syntax-export-namespace-from",
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-proposal-object-rest-spread", {
      "loose": true,
      "useBuiltIns": true
    }],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ]
  ]
}