const axios = require("axios");
const cheerio = require("cheerio");

async function scrape() {
  const result = await axios.get(
    "https://www.youtube.com/playlist?list=PLcy2JYIsD-41ExJ4LdYdwt1w0AUztyp_R"
  );
  const $ = await cheerio.load(result.data);
  $("script").each((i, sc) => {
    if (i === 26) {
      let text = $(sc).contents()[0].data;
      let end = text.indexOf("};");
      let new_text = text.slice(31, end + 1);
      new_text = JSON.parse(new_text);

      const playlistVideoRenderers =
        new_text.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer
          .content.sectionListRenderer.contents[0].itemSectionRenderer
          .contents[0].playlistVideoListRenderer.contents;

      console.log(playlistVideoRenderers);
    }
  });
}

module.exports = {
  scrape: scrape,
};
