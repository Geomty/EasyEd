const fetch = require("node-fetch-commonjs");
require("dotenv").config();

function getVideos(keywords, page = "") {
    const res = { next: "", ids: [] };

    const params = new URLSearchParams(Object.entries({
        key: process.env.YOUTUBE_API_KEY,
        part: "snippet",
        maxResults: 50,
        pageToken: page,
        q: keywords.join("|"),
        relevanceLanguage: "en",
        type: "video",
        videoDuration: "short",
        videoEmbeddable: true
    })).toString();

    try {
        fetch(`https://www.googleapis.com/youtube/v3?${params}`).then(d => d.json()).then(d => {
            res.next = d.nextPageToken;

            d.items.forEach(item => {
                res.ids.append(item.id);
            });
        });
        return res;
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}

module.exports = getVideos;