# JobSearch
---

For all you Cohort 5 TIY Grads, this app should make applying for jobs and keeping your drive alive for proper career support top of mind! For now, you can simply clone this repo and run `npm install` and `npm start` to pull up a list of careers in the local area from Dice.com that match your current search criteria. I have added authentication for Trello integration. To make it specific to your needs when/if you clone this repo, you will need to go to the Trello API site and obtain and application key of your very own, which will allow this to function for you and your specific Trello board. The link is [here](https://developers.trello.com/get-started/start-building#connect). Once you input your specific key in the index.html Trello script and get the id for your 'Doing' list card,

```
    <script
      src="https://trello.com/1/client.js?key=YOUR_KEY_HERE>
   </script>
   
   Trello.post('cards', { name: `${job.company}`, desc: job.jobTitle, idList: YOUR_DOING_LIST_ID_HERE, urlSource: thisUrl })
 ```
 you will be all set to start adding items to your Trello board and letting the campus director know of your interest!
 Reach out to me on Slack if you have any questions!
 
---

I am working on adding a database so you can track which/how many jobs you have already applied to. In the meantime, feel free to clone/fork the repo and make changes to the code to meet your specific needs until I make it more user friendly (this is a WAAAYYYYY rough draft). 
