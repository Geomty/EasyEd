const fetch = require("node-fetch-commonjs");
require("dotenv").config();

async function getVideos(keywords, page = "") {
    //const res = { next: "", ids: ["uliXB6X8WJI", "8rDpApFgukc", "jST1BNAzMnE", "7N4APOEr0GI", "f7BCRC3UEmk", "BpLDg9gs0Qw", "z7gitjyO5fY", "SNOM4V_Xfes", "9LuA4Wt4RQE", "PinQ_uU3pKM", "dmrHCucwSq0", "gq3zFd6WEDo", "pvdAfpoLq7U", "YzjY9FZByko", "e68-XmjEGvk", "aJpxYp-yNtE", "bXTDrCjufoY", "Db26nmr_95c", "c8_t_E5cG38", "VyjpX0m8Cy0", "q1VRIHhGOzc", "V7kWXeDTkyY", "pefx0FPuLls", "59A8eHkLoKs", "4jk_alBbbFw", "AoUnw7jcHhg", "tVHOBVAFjUw", "3Eh34zhrxMA", "oPy2z7YZ8A0", "RjrcoitbdTU", "48pZWbXx-Hw", "yTLMUBpN9EY", "nmsrfqVcidQ", "EysVhq62624", "IuOLMNX9zaU", "v9qkxNDL00o", "rWRfn-j5nvY", "bvD0uB2_K1w", "utXyHKcb9GM", "Z7rpGIgqiRo", "iLXNBiGJAGs", "9S3FRENg43I", "1v-wLVskEiQ", "vWcy0LHmuZg", "_lfYn_p0Oho", "sZGBRxYvOS8", "85WsCSmW3Xc", "b-l_3EnvJhw", "bc-OoJrrMuk", "AGKPeStDipE", "hxuSyh3WQkg"] };
    //return res;

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
        const d = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);

        if (d.status != 200) {
            return { error: "API Error" };
        }

        const json = await d.json();
        res.next = d.nextPageToken;
        json.items.forEach(item => {
            res.ids.push(item.id.videoId);
        });

        return res;
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}

module.exports = getVideos;