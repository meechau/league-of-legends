# league-of-legends
app for searching summoners by their name and looking up their info 

This is a simple tool I made to learn how to work with apis. 

Quick breakdown how it works:

The only input from the user is summoner name and their region.
Application then calls rest-api located on Amazon Web Services, where code with personal Riot api key is stored.
AWS api then calls Riot servers and returns the data (code for AWS lambda functions is not provided here).
Data is then presented to the user.

The api also works when calling Riot servers directly (you can obtain your own free personal api key on their website), but for security reasons Riot demands the api key to be hidden from the user if you ever intend to go public with your app.
