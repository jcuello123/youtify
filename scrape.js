const axios = require("axios");
const cheerio = require("cheerio");

async function scrape(link) {
  let video_titles_arr = [];

  const result = await axios.get(link);

  const $ = await cheerio.load(result.data);

  //script 26 contains all video information
  $("script").each((i, sc) => {
    if (i === 26) {
      let text = $(sc).contents()[0].data;
      let end = text.indexOf("};");
      let new_text = text.slice(31, end + 1);
      new_text = JSON.parse(new_text);

      //get videos in nested object
      const playlistVideoRenderers =
        new_text.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer
          .content.sectionListRenderer.contents[0].itemSectionRenderer
          .contents[0].playlistVideoListRenderer.contents;

      for (vid in playlistVideoRenderers) {
        let video_title =
          playlistVideoRenderers[vid].playlistVideoRenderer.title.runs[0].text;

        let artist;
        let song_name;

        //separate artist and song name for parsing invalid words ("ft.", "(Offical video)", etc)
        if (video_title.includes(" - ")) {
          artist = video_title.split(" - ")[0].toLowerCase();
          song_name = video_title.split(" - ")[1].toLowerCase();
        } else if (video_title.includes('"')) {
          artist = video_title.split('"')[0].toLowerCase();
          song_name = video_title.split('"')[1].toLowerCase();
        } else {
          continue;
        }

        //split artists incase there are multiple ("Rihanna & Drake" or "Rihanna, Drake")
        if (artist.includes(" & ")) {
          artist = artist.split(" & ")[0];
        } else if (artist.includes(",")) {
          artist = artist.split(",")[0];
        }

        //get lowest index and slice the string from 0 to index. sometimes "ft." becomes before "(Official video)" etc
        let index_of_paranthesis = song_name.indexOf("(");
        let index_of_bracket = song_name.indexOf("[");
        let index_of_ft = song_name.indexOf("ft.");
        let end_index;

        const title_has_all_delimiters =
          index_of_paranthesis >= 0 &&
          index_of_bracket >= 0 &&
          index_of_ft >= 0;

        const title_has_paran_and_brack_delimiters =
          index_of_paranthesis >= 0 && index_of_bracket >= 0;

        const title_has_paran_and_ft_delimiters =
          index_of_paranthesis >= 0 && index_of_ft >= 0;

        const title_has_brack_and_ft_delimiters =
          index_of_bracket >= 0 && index_of_ft >= 0;

        const title_has_just_paran_delimiter = index_of_paranthesis >= 0;

        const title_just_has_brack_delimiter = index_of_bracket >= 0;

        const title_just_has_ft_delimiter = index_of_ft >= 0;

        if (title_has_all_delimiters) {
          end_index = Math.min(
            Math.min(index_of_paranthesis, index_of_bracket),
            index_of_ft
          );
        } else if (title_has_paran_and_brack_delimiters) {
          end_index = Math.min(index_of_paranthesis, index_of_bracket);
        } else if (title_has_paran_and_ft_delimiters) {
          end_index = Math.min(index_of_paranthesis, index_of_ft);
        } else if (title_has_brack_and_ft_delimiters) {
          end_index = Math.min(index_of_bracket, index_of_ft);
        } else if (title_has_just_paran_delimiter) {
          end_index = index_of_paranthesis;
        } else if (title_just_has_brack_delimiter) {
          end_index = index_of_bracket;
        } else if (title_just_has_ft_delimiter) {
          end_index = index_of_ft;
        }

        const title_is_sliceable = end_index != undefined;

        if (title_is_sliceable) {
          end_index--;
          song_name = song_name.slice(0, end_index);
        }

        video_titles_arr.push({ artist, song_name });
      }
    }
  });

  return video_titles_arr;
}

module.exports = {
  scrape: scrape,
};
