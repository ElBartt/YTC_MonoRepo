## Table of Contents

- [Various documentation](#various-documentation)
- [Project Objective [1st milestone]](#project-objective-1st-milestone)
- [Backlog & Ideas](#backlog--ideas)
- [Recommended folder Structure](#recommended-folder-structure)
- [ApiKeyAnalytic Ideas](#apikeyanalytic-ideas)

---

## <span style="color:lightblue">**Various documentation**</span>

URL thumbnail video : 
> https://i.ytimg.com/vi/ID/hqdefault.jpg <br>
> https://i.ytimg.com/vi/ID/maxresdefault.jpg

URL profil picture : 
> https://www.reddit.com/r/youtube/comments/kqk9ay/is_it_possible_to_get_the_original_size_of_a/

MySql export : 
> mysqldump -u USER_NAME -p --order-by-primary DATABASE_NAME > YTC.sql

## <span style="color:lightblue">**Project Objective [1st milestone]**</span>

- **Target:** Twitch streamers who regularly post replays on YouTube
- **Why:** Every day, Dupont posts the replay on youtube. He doesn't have time to look at the comments on the video he posted, which neglects the YouTube community. Therefore, the application would allow him to quickly see relevant comments to respond to and what to do.
- **How:** He opens the application and clicks on his latest video. A list of 100 items appears with different flags (<span style="color:red">**spam**</span>, <span style="color:green">**simple opinion**</span>, <span style="color:orange">**waiting for a response**</span>).

### <span style="color:lightblue">**Example**</span>

**Context:** I am a streamer and I posted a replay two days ago on YouTube. I would like to make the effort to see if my community has responded and if comments are relevant in some way.

**Sequence and what this implies in the code:**

1. I open YTC.
    - <span style="color:green">✔️ Backend have a server running</span>
    - <span style="color:green">✔️ Frontend have a server running</span>
2. I enter my API-KEY that YTC gave me (beta version)
    - <span style="color:green">✔️ Backend ApiKey validation</span>
    - <span style="color:green">✔️ Backend Database ApiKey/User</span>
    - <span style="color:#ff9999"> ❌ Frontend little user session management (for apikey) </span>
    - <span style="color:#ff9999">❌ Frontend ApiKey input</span>
3. I click on the channel that interests me.
    - <span style="color:green">✔️ Backend Fetch channels of my user</span>
    - <span style="color:#ff9999">❌ Frontend channels display</span>
2. I click on the video that interests me.
    - <span style="color:green">✔️ Backend Fetch videos of my channel</span>
    - <span style="color:#ff9999">❌ Frontend videos display</span>
3. I see a list of comments.
    - <span style="color:green">✔️ Backend Fetch comments of the video.</span>
    - <span style="color:#ff9999">❌ Backend pass through OpenAI if not already done.</span>
    - <span style="color:#ff9999">❌ Frontend comments display</span>

## <span style="color:lightblue">**Backlog & Ideas:**</span>

- Hard refresh videos on demand.
- Hard refresh comments on demand.
- Automatic refresh (watchdog).
- Live response to comments.
- Dashboard of selected comments statistics.
- When refreshing comments, smart update DB
    - if comments already exists keep them
    - else add and do openAI pass
    - truncate table on limit
- Front end harmonization/design.

## <span style="color:lightblue">**Recommended folder Structure**</span>

```
src/
├── controllers/
│   ├── commentController.ts
│   ├── videoController.ts
│   └── ...
├── models/
│   ├── comment.ts
│   ├── video.ts
│   └── ...
├── routes/
│   ├── commentRoutes.ts
│   ├── videoRoutes.ts
│   └── ...
├── services/
│   ├── commentService.ts
│   ├── videoService.ts
│   └── ...
├── app.ts
├── server.ts
└── ...
```

Here's a brief description of each folder:

- `controllers/`: Contains the controller files that handle incoming requests and outgoing responses. Each controller should correspond to a specific resource (e.g. comments, videos).
- `models/`: Contains the model files that define the data structures used in the application. Each model should correspond to a specific resource (e.g. comments, videos).
- `routes/`: Contains the route files that define the endpoints for the API. Each route should correspond to a specific resource (e.g. comments, videos).
- `services/`: Contains the service files that handle the business logic of the application. Each service should correspond to a specific resource (e.g. comments, videos).
- `app.ts`: The main application file that sets up the middleware and routes.
- `server.ts`: The file that starts the server and listens for incoming requests.

## <span style="color:lightblue">**ApiKeyAnalytic Ideas :**</span>

- Monitor API usage: You can use the timestamp, route, parameters, method, and status_code properties to monitor how your API is being used. For example, you can track which routes are being accessed the most, which parameters are being used the most, and which HTTP methods are being used the most. This information can help you identify areas where your API is being used heavily and areas where it is not being used enough.

- Identify errors: You can use the status_code property to identify errors in your API. For example, if you see a high number of requests with a 404 status code, you may have broken links or missing resources. If you see a high number of requests with a 500 status code, you may have server-side errors that need to be addressed.

- Measure performance: You can use the response_time property to measure the performance of your API. For example, you can track the average response time for each route and identify routes that are taking too long to respond. This information can help you optimize your API for better performance.

- Monitor API key usage: You can use the api_key property to monitor how your API keys are being used. For example, you can track which API keys are being used the most and which routes are being accessed with each API key. This information can help you identify potential security issues and optimize your API key usage.
