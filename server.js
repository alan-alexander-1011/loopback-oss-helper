/*
MIT/GU-NNoA-LF License

Copyright (c) 2023-now alan-alexander-1011

(Copyright was added by the owner too :) not too much force but pls give creds 
when showing this to the public or distribute it)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

After the MIT License, the name of the owner("alan-alexander-1011") *Shall Not* be used to
make money or in advertisement or to make any deals that is related to this software because
the software is *100%* free.

The program IS NOT for sale, but for normal and commercial uses.

The Distributor of this software is not needed to show the code of the program to the public. 
But the Distributor of this software may needed to give an simple explanation of what the 
Distributor added/modified to the program.
And the distributor may give the owner credits.

-----------------------------------------
Notes after the terms:
-----------------------------------------
*/
const express = require('express');
const http = require('http');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const server = http.createServer(app);

app.use(express.json());

// Serve static files (e.g., index.html)
app.use(express.static(path.join(__dirname, 'public')));

//VARIABLES//

let currentSong = { artist: 'Unknown Artist', title: 'Unknown Title', time: "unknown time" };
let videoInfo = {
  title: 'un',
  currentTime: 'un',
  duration: 'un'
};

const channelId_default = "UCxHgeEE53xCTT1z604Gd42A";
const apiKey = 'google_api_key'; // Replace with your API key

//FUNCTIONS//
app.post('/current_subs', async (req, res) => {
  try {
    const { count } = req.body;

    // Validate the data
    if (typeof count !== 'number') {
      return res.status(400).json({ error: 'Invalid count value' });
    }

    // Update the currentSubs object
    currentSubs = { count };

    // Respond with the updated subscriber count
    res.status(200).json(currentSubs);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to fetch subscriber count from YouTube
async function getChannelId(handleOrId) {
  const link = `https://www.googleapis.com/youtube/v3/search?part=id&type=channel&q=${handleOrId}&key=${apiKey}`;
  const response = await fetch(link);
  const data = await response.json();
  if (data.items.length > 0) {
    return data.items[0].id.channelId;
  } else {
    throw new Error('Channel not found');
  }
}

async function getSubscriberCount(handleOrId) {
  try {
    let channelId = handleOrId;

    // Check if the input is a handle (starts with @) or custom URL (contains /c/)
    if (handleOrId.startsWith('@') || handleOrId.includes('/c/')) {
      channelId = await getChannelId(handleOrId);
    }

    const link = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
    const response = await fetch(link);
    const data = await response.json();
    return [
      data.items[0].statistics.subscriberCount,
      data.items[0].statistics.viewCount,
      data.items[0].statistics.videoCount
    ];
  } catch (error) {
    console.error('Error fetching subscriber count:', error);
    return ['unknown', 'unknown', 'unknown'];
  }
}


async function getSubscriberCount_default() {
  try {
    const link = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId_default}&key=${apiKey}`;
    const response = await fetch(link);
    const data = await response.json();
    return [data.items[0].statistics.subscriberCount , data.items[0].statistics.viewCount, data.items[0].statistics.videoCount];
  } catch (error) {
    console.error('Error fetching subscriber count:', error);
    return 'unknown';
  }
}

if (apiKey !== "google_api_key") {
  //HANDLE GETS AND POSTS REQUESTS//
  app.get('/current_subs_c', async (req, res) => {
    const handleOrId = req.query.channel; // Pass the channel handle or ID as a query parameter
    if (!handleOrId) {
      return res.status(400).json({ error: 'Channel handle or ID is required' });
    }

    try {
      const data = await getSubscriberCount(handleOrId);
      res.status(200).json({ count: data[0], viewCount: data[1], videoCount: data[2] });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/current_subs', async (req, res) => {
    try {
      const data = await getSubscriberCount_default();
      res.status(200).json({ count: data[0], viewCount: data[1], videoCount:data[2] });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}

app.get('/current_song', async (req, res) => {
  res.json(currentSong);
});

app.get('/current_video', async (req, res) => {
  res.json(videoInfo);
});

// Handle song updates
app.post('/current_song', async (req, res) => {
  currentSong = req.body;
  res.json(currentSong);
});

app.post('/current_video', async (req, res) => {
  videoInfo = req.body;
  res.json(videoInfo);
});


const PORT = 37373;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Current music widget is: http://localhost:${PORT}/music.html`);
});
