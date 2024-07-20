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
const textbox = document.getElementById('video-info');
const progbar = document.getElementById('progress-bar');
async function fetchSongInfo() {
  try {
    const response = await fetch('http://localhost:37373/current_video', {
      cache: "no-cache" // Prevent caching issues
    });
    const videoInfo = await response.json();
    const unknown = { title: 'un', currentTime: 'un' , duration: "un" , uploader: "un"};

    if (videoInfo.title === unknown.title && videoInfo.currentTime === unknown.currentTime && videoInfo.duration === unknown.duration){
      document.getElementById('video-info').textContent = `No video playing.`;

      progbar.style.width = "100%";
      progbar.style.backgroundColor= "#b81b1b";
    } else {
      // Display video info
      textbox.textContent = `Currently playing: ${videoInfo.title} (by ${videoInfo.uploader}) (${videoInfo.currentTime}/${videoInfo.duration})`;

      // Progress bar calculation
      var elapsed = videoInfo.currentTime.split(":");
      var duration = videoInfo.duration.split(":");

      var elapsed_seconds = elapsed.length === 3
        ? parseInt(elapsed[0]) * 3600 + parseInt(elapsed[1]) * 60 + parseInt(elapsed[2])
        : elapsed.length === 2
        ? parseInt(elapsed[0]) * 60 + parseInt(elapsed[1])
        : parseInt(elapsed[0]);

      var duration_seconds = duration.length === 3
        ? parseInt(duration[0]) * 3600 + parseInt(duration[1]) * 60 + parseInt(duration[2])
        : duration.length === 2
        ? parseInt(duration[0]) * 60 + parseInt(duration[1])
        : parseInt(duration[0]);

      progbar.style.backgroundColor = "#51bd54";
      progbar.style.width = (elapsed_seconds / duration_seconds * 100).toFixed(2) + "%";
    }


    setTimeout(fetchSongInfo, 100); // Check every second

  } catch (error) {

    console.error('Failed to fetch song info:', error);
    setTimeout(fetchSongInfo, 100); // Retry after error

  }
}

document.addEventListener('DOMContentLoaded', fetchSongInfo);