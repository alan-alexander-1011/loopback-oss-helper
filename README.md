# oss-helper
## (or just open-source stream helper)
is a program designed to be used on streams.\
and this program is a little bit (or a lot) complicated for normal streamers because this requires you know a little bit about the command line.

this project, i made it with AI, specifically ChatJippity..ahem..ahem...ChatGPT.

## how to use (REMEMBER TO READ ALL)
>install npm.\
>run command: "npm install express"\
>last: run "node server.js"

okokok its not done yet.

### make the music widget work
___

if you want to use the music widgets, you __**must**__ use Youtube Music. Because the TOS of Twitch said that you can't use songs on Spotify because DMCA. And the TOS of Spotify also said that you can't use songs on streaming services. So why bother to make that? (ofc i took this info from reddit.)

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

now click on your favourite music, open another tab and type in "localhost:37373/music.html" and enjoy.......the simplicity of the widget

### wait, you want to style/or make your own widget?

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
