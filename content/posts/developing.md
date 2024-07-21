+++ 
draft = false
date = 2024-07-21T14:06:56+07:00
title = "developing?"
description = "ok"
slug = ""
authors = []
tags = []
categories = []
externalLink = ""
series = []
+++

# developing?
now you need html/css/js knowledge to do this.

1. make a html and js
for html:
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
you would need something like this.

and for the js file, you do whatever the fuck you like and implement it in your html file, at the

`<script src="your js file.js" defer></script>`

part, by changing the "your js file.js" part to your file, you can do it.

and now styling.... you can go into the styles.css file and code whatever the fuck you want. just make sure it works and look fine for you.

and heres the thing, if you code css to your specific element id and saves it in the global file, next time, you implement the the global css file, when you make a element with that id again, it will use your styling.