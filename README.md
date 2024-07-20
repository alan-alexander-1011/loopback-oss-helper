# loopback-oss-helper
## (or just loopback open-source stream helper)

yeah its loopback, means communicate with the computer itself. (specifically localhost:37373 (default))

is a program designed to be used on streams.\
and this program is a little bit (or a lot) complicated for normal streamers because this requires you know a little bit about the command line.

and this isn't really a helper nor a bot. this is a widget for streaming that is based on npm/node.js and tampermonkey ofc.

this project, i made it with AI, specifically ChatJippity..ahem..ahem...ChatGPT.

## how to use (REMEMBER TO READ ALL)
>install npm.\
>run command: "npm install express node-fetch@2"\
>last: run "node server.js"

okokok its not done yet.

### make the music widget work
___

if you want to use the music widgets, you __**must**__ use Youtube Music. Because the TOS of Twitch said that you can't use songs on Spotify because DMCA. And the TOS of Spotify also said that you can't use songs on streaming services. So why bother to make that? (ofc i took this info from reddit.) (or just make a tampermonkey script that sends the music data to localhost:37373/current_song [default])

okok now go into the main thing, how can you make the music widget work?

>**first**: install tampermonkey.\
>**second**: go on music.youtube.com\
>**third**: click on the Tampermonkey extension.\
>(if you cant see the extension, maybe its in a button that shows all extensions.)\
>**fourth**: click "Create a new script"\
>there will be a tab pop up.\
>**fifth**: open the tampermonkey-ytmusic.js file on your favourite text editor.\
>**sixth**: copy and paste it all in the tab and press ctrl+s to save.\
>**finally**: close the youtube music tab and reopen it (to reload the script)

and its the same for everything that uses a Tampermonkey script.

now click on your favourite music, open another tab and type in "localhost:37373/music.html" and enjoy.......the simplicity of the widget

___
### now its for the statistic (youtube)

heres how you can use the youtube stat widget.

>**first**: create a google api key.\
>1 - go to the api console.\
>2 - from the projects list, select a project or create a new one.\
>3 - if the **apis & services** page isn't already open, open the left side menu and select **apis & services**.\
>4 - choose "**Credentials**" on the left\
>5 - now just press on the little button that says "**Create credentials**" and then select api key.\
>
>**setup the api**\
>1 - after that, at the left, select "**Library**", and type in "YouTube Data API v3"\
>2 - **Now,** click on the Youtube data API one, and click Install. wait for a little bit, (and maybe minutes to update depending on Google.)\
>3 - okok, now click on the "**Credentials**" button again.\
>4 - click on "**Show key**" on your api. it will show your api key.\
>
>**Change the server config.**\
>1 - copy that, and now, go in **server.js** file.\
>2 - find the `const apiKey = 'google_api_key'` (it should be at the top),\
>3 - replace '**google_api_key**' with your api key inside the quotes\
>4 - And after that, find the `const channelId_default = "UCxHgeEE53xCTT1z604Gd42A";`, (it should be at the top) and replace with your youtube channel id. (not something that starts with an @)\
>
>**NOTICE**\
>!! - if you want to use id that starts with an @ instead of an ytb channel id, you will need to use `localhost:37373/custom_yt_stats.html? channel=@your_channel_id` (change @your_channel_id with your channel id) instead of `localhost:37373/yt_stats.html`\

FINALLY, run `node server.js`\

and go on `localhost:37373/custom_yt_stats.html? channel=@your_channel_id`\
 or `localhost:37373/yt_stats.html`
___
### wait, you want to style/or make your own widget?
___
ok, for this, you will need to have basics of HTML/JS(for making widgets) and CSS(for styling).

now, make a html file, and a js file.\
for the html file:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title> widgets</title>

  <!-- this is the global css file -->
  <link rel="stylesheet" href="styles.css">

  <script src="your js file.js" defer></script>

</head>
<body>
  <div class="site">
    <h1>title of widget</h1>
    <h4 id="whatever-the-fuck-id-you-like">om nom nom</h4>
    <div class="progress-container">
      <div class="progress-bar" id="progress-bar"></div>
    </div>
  </div>
</body>
</html>
```

you would need something like this

and for the js file, you do whatever the fuck you like and implement it in your html file, at the 
```html
<script src="your js file.js" defer></script>
```
part, by changing the "your js file.js" part to your file, you can do it.

and now styling.... you can go into the styles.css file and code whatever the fuck you want. just make sure it works and look fine for you.

and heres the thing, if you code css to your specific element id and saves it in the global file, next time, you implement the the global css file, when you make a element with that id again, it will use your styling.

AND THAT'S IT !! so heres how to implement this into OBS or Streamlabs.
___

to use it on OBS or Streamlabs OBS, you need to create a browser source, and then insert the link (e.g "localhost:37373/music.html" for current music [on ytmusic])
