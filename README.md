# league-of-legends
app for searching summoners by their name and looking up their info (work in progress)

This is a simple tool I made and I'm still working on, to learn how to work with apis. In the future it might evolve into something attractive for the user (currently there are many similar, much more advanced apps).

Quick breakdown how it works:

The only input from the user is currently summoner name and their region.
Application then calls rest-api located on Amazon Web Services, where code with personal Riot api key is stored.
AWS api then calls Riot servers and returns the data (code for AWS lambda functions is not provided here).
Data is then presented to the user.

The api also works when calling Riot servers directly (you can obtain your own free personal api key on their website), but for security reasons Riot demands the api key to be hidden from the user if you ever intend to go public with your app.
