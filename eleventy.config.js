module.exports = (eleventyConfig) => {
  eleventyConfig.addWatchTarget("./src/scss/");
  eleventyConfig.addWatchTarget("./src/js/");
  return {
    dir: {
      input: "src/pages",
      output: "dist",
    },
  };
};
