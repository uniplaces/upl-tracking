module.exports = {
  tags: {
    allowUnknownTags: false
  },
  source: {
    include: "src",
    includePattern: ".js$",
    excludePattern: "(node_modules/|dist/|docs)"
  },
  plugins: [
    "plugins/markdown"
  ],
  recurseDepth: 3,
  opts: {
    template: "node_modules/docdash",
    encoding: "utf8",
    destination: "docs/",
    recurse: true,
    verbose: true
  },
  templates: {
    cleverLinks: true,
    monospaceLinks: false
  }
}
