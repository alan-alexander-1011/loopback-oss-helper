+++ 
draft = false
date = 2024-07-21T12:52:15+07:00
title = "how to usee, read all plsplsplsplsplsplspls"
description = "do i need a description???? self-explanatory, read the title."
slug = ""
authors = []
tags = []
categories = []
externalLink = ""
series = []
+++

# dependencies... or just requirements

1. install npm and Tampermonkey.
2. clone the repo into your desired directory:\
`git clone https://github.com/alan-alexander-1011/loopback-oss-helper.git /path/to/dir`\
Replace `/path/to/dir` with your chosen path.
3. navigate into your directory.
4. run `npm install express node-fetch@2`.

that's it for dependencies.

# setup Tampermonkey

**Setup for YouTube Music Widget**

1. copy the code in `tampermonkey-ytmusic.js`.
2. go to YouTube Music, click on Tampermonkey, and create a new script.
3. paste the code inside the code area, press `Ctrl + S`, and reload the YouTube Music tab.

**Setup for YouTube Widget**

1. copy the code in `tampermonkey-yt.js`.
2. go to YouTube, click on Tampermonkey, and create a new script.
3. paste the code inside the code area, press `Ctrl + S`, and reload the YouTube tab.

# setup YouTube stats

1. if you don't want live YouTube stats, run `node server.js`.
2. if you want live stats:
1. open a web browser and go to [Google Console Developer](https://console.cloud.google.com/cloud-resource-manager).
2. select or create a project.
3. click the hamburger menu, then "API & Services", then "Credentials".
4. click "Create Credentials" -> "API key". Save the key somewhere secure.
5. click "Library", search "YouTube Data API v3", and click "Install".
6. optional: restrict your API key to YouTube API data.
7. open `server.js`, replace `'google_api_key'` with your API key, and replace the default `channelId` with your YouTube channel ID.
8. run `node server.js`.

**NOTICE**: To use a channel ID that starts with @, use another link as described below.

# how to use

## YouTube Music Widget

Run `localhost:37373/music.html` on a browser or Browser Source on OBS/Streamlabs.

## YouTube Widget

Run `localhost:37373/youtube.html` on a browser or Browser Source on OBS/Streamlabs.

## YouTube Stats Widget

### For default channel ID

Run `localhost:37373/yt_stats.html` on a browser or Browser Source on OBS/Streamlabs.

### For channel ID starting with @ or custom ID

Run `localhost:37373/custom_yt_stats.html?channel="@your-moms-channel"` on a browser or Browser Source on OBS/Streamlabs. Replace `"@your-moms-channel"` with your desired channel ID.
