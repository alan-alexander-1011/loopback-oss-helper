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
