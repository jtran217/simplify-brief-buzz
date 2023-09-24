
# Brief Buzz

A simple web app that uses news api and open ai to return an article summary of a random relavent news to the user. Initially made to solidify my use of react frame work and Api fetching.


## Demo

Live Website: https://simplify-brief-buzz.vercel.app/


## 🛠 Skills
Javascript, HTML, CSS


## Future Plans

Currently there is some limitation to the web app:
- First being that some article are too long to parse int openai API, thus causing nothing to load on the website. Will need to implment error handling for this. 

- Second that depending on the time of the day the news will always be the same due to the code loading from the first item in the array.Plan to select a random item in the array to present, which should load a random news aritcle on press of the button.
