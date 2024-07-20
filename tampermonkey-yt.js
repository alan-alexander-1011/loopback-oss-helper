// ==UserScript==
// @name         youtube-video-info-to-node
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Send YouTube video info to Node.js server and reload page on change
// @author       alan_alexander1011
// @match        https://www.youtube.com/watch*
// @grant        GM.xmlHttpRequest
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==

(async function() {
    'use strict';
  
    let lastTitle = await GM.getValue('lastTitle', '');
  
    function sendVideoInfo() {
      const player = document.getElementById('movie_player');
      if (!player) return;
  
      const videoData = player.getVideoData();
      const currentTime = player.getCurrentTime();
      const duration = player.getDuration();
  
      // Prepare video info object
      const videoInfo = {
        title: videoData.title || 'un',
        currentTime: formatTime(currentTime) || 'un',
        duration: formatTime(duration) || 'un'
      };
  
      GM.xmlHttpRequest({
        method: 'POST',
        url: 'http://localhost:37373/current_video',
        data: JSON.stringify(videoInfo),
        headers: {
          'Content-Type': 'application/json'
        },
        onload: function(response) {
          const responseText = JSON.parse(response.responseText);
          if (responseText.title !== lastTitle) {
            lastTitle = responseText.title;
            GM.setValue('lastTitle', lastTitle);
  
            GM.xmlHttpRequest({
              method: 'POST',
              url: 'http://localhost:37373/reload',
              headers: {
                'Content-Type': 'application/json'
              }
            });
          }
        }
      });
    }
  
    function formatTime(seconds) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      return `${h > 0 ? h + ':' : ''}${m > 0 ? m + ':' : '0:'}${s < 10 ? '0' + s : s}`;
    }
  
    setInterval(sendVideoInfo, 100);
  })();
  