## Flashcard

This is the Backend of my project Flashcard for 3wa Academy.

## Initialize

Once you've get the project locally, run:

```bash
npm install
```
To install all the dependencies.

You can also use the dump of the database to have a populated database although all the data on the app is user generated, the app shoulb be working just by building the database's tables by changing l37 of server.js file to:

```javascript
{force: true}
```

In case you use the dump, users are :
- username: "Benjamin", password: 3wacademy
- username: "Marie", password: 4wacademy
