### About
Netflix GS (global searcher) is a fun side project where I'm, using a custom made puppeteer script, create my own global netflix database and gather information about in which countries all titles are available. Netflix GS is a search engine for this database.

### Why?
Because I love developing web applications using javascript.
To improve my coding skills.
Who doesnt like a fun side project?

### How does it work?

- The puppeteer script fetches the title, production year and the countries the movie/show is available in. The information then gets formatted correctly and saved in a .json.
- The .json gets imported to the mongodb database
- When you do a search Netflix GS looks through the database for the specific title and returns the matches.
- Before being displayed the matches are checked against an external API to collect metadata. The updated item is being saved in the database and sent to the frontend.
- If an item already has all the metadata, it will be returned immediately, skipping the previous step.

### What technologies are being used?
Frontend: HTML/SASS/CSS Grid/ES6/React

Backend: Node.js/Express/MongoDb/Mongoose

Other tools: Puppeteer, OMDb Rest API

### Whats next?
- To finish the project with basic functionality.
- Refactor the existing code.
- Styling.
- Deploy.

### Nice to haves in the future:
- Personal recommendations section
- More filters
- Ability to vote (thumb up or down) a movie

### Demo
Search

![search](https://user-images.githubusercontent.com/34421443/66835710-51377a80-ef60-11e9-878c-6790787d6db6.gif)

Choose country database

![countries](https://user-images.githubusercontent.com/34421443/66835899-a4113200-ef60-11e9-886e-2faf0ad528be.gif)


