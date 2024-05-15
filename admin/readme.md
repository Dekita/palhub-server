# iKON

Website that uses serverless comfyui powered by runpod, to allow users to create icons using AI.


## TODO:
blurhash for prompt style options
+ smaller proimpt style images


gallery search / filter?

save-as-favicon
edit studio

display error if error when generating (atm it keeps spinning and blocks generate button until refresh)

typewriter wordings

+ mask image (options + upload)
+ input source (image/video) (image2image/gif2gif/video2video)

## Possible Extra TODO:

finalize faq's
re-proritize 'about' points
daily challenge?


## TODO-DONE:
theme colors
dashboard animation
amazon upload
save-as-ico
save-as-png
styles 'gallery'/button
fix gallery hover overlay sizing
fix remove runtime display when job complete.  
dont display watermarked icons for dashboard gallery/history








2024-01-09T22:29:19.307325866Z [runpod-worker-comfy] ---- RAW OUTPUTS ----
2024-01-09T22:29:19.307346996Z [runpod-worker-comfy] {'4': {'images': []}, '5': {'images': [{'filename': 'dek_00012_.png', 'subfolder': '', 'type': 'output'}]}, '6': {'tags': ['sky, signature, no_humans, night, moon, robot, star_\\(sky\\), starry_sky, machinery, science_fiction, realistic, space, planet, spacecraft, desert, thrusters']}}
2024-01-09T22:29:19.307351846Z [runpod-worker-comfy] 
2024-01-09T22:29:19.307355106Z [runpod-worker-comfy] #files generated: 1
2024-01-09T22:29:19.307357336Z [runpod-worker-comfy] ---- OUTPUT DATAS ----
2024-01-09T22:29:19.307359766Z [runpod-worker-comfy] {'6': {'tags': ['sky, signature, no_humans, night, moon, robot, star_\\(sky\\), starry_sky, machinery, science_fiction, realistic, space, planet, spacecraft, desert, thrusters']}}
2024-01-09T22:29:19.307363286Z [runpod-worker-comfy] 
2024-01-09T22:29:19.307655299Z [runpod-worker-comfy] attempting aws file upload...
2024-01-09T22:29:19.424727758Z [runpod-worker-comfy] uploading: 70f44f45.png
2024-01-09T22:29:19.470369958Z tqdm_logging.py     :142  2024-01-09 22:29:19,470 Progress on:70f44f45.png -/1288018 rate:- remaining:? elapsed:00:00 postfix:-
2024-01-09T22:29:19.931311524Z tqdm_logging.py     :142  2024-01-09 22:29:19,930 Progress on:70f44f45.png 1.29MB/1.29MB rate:- remaining:? elapsed:00:00 postfix:-
2024-01-09T22:29:19.931335354Z 
2024-01-09T22:29:19.932134862Z [runpod-worker-comfy] aws upload success! returning presigned urls
2024-01-09T22:29:20.227965446Z {"requestId": null, "message": "eb576274-d719-4811-9f20-a0f8612e03b5-e1 | Finished", "level": "INFO"}
2024-01-09T22:35:04.599081764Z {"requestId": null, "message": "Error while getting job: ", "level": "ERROR"}






























# required folders: 
dhparam (for ssls etc)
nginx-conf
netdata-conf
mongo-data
ikon-media

# ideal server configuration:
portainer?
dockerhub?
netdata
certbot
mongodb
nginx

# services:
bot.arkade
bot.druglord

com.dekitarpg
com.conftron
com.dekgames
com.ikon

# ideal server features:
auto pull from github upon update



# folders
cfg.nginx
cfg.netdata
ssl.dhparam
kore.portainer
kore.dockerhub
kore.netdata
kore.certbot
kore.mongodb
kore.nginx
bot.arkade
bot.druglord
com.dekitarpg
com.conftron
com.dekgames
com.ikon

# containers

stablerender.com / .onlilne
top-gpt.online


stableimage.com / .onlilne

liked: (in order of preference)
stable render
stable image
canvas forge
render realm

possible tlds: .com, .online, .ai

unliked: 
diffusion.com - taken
diffusion.online - lots of similar sites, searching 'diffusion online' shows fashion sites?
stable canvas.com - taken
stable canvas.online  - dont want to use since above is similar and taken


https://chat.openai.com/g/g-bNCJO6o9I-rpgmakergpt


Task: Manage a YouTube channel from concept to creation.


Instructions:
1. Ensure user has chosen a unique content niche for the channel, suggest some based on discussion if they haven't.
2. Ensure user has confirmed a channel description that summarizes the channel's mission and the type of content that will be provided, give help with this.
3. Ensure user has confirmed a channel name that is catchy, relevant to the content niche, and easy to remember.
4. Generate Image suggestions based on the selected content niche unless the user intends to use one of their own, ask if this is the case if they do not like the suggested images after 3 generations.
5. Plan a video content schedule with the user, for example aiming to release new videos every Tuesday and Thursday at 3 PM EST.
6. Create video ideas and gather helpful video links from websites containing free to use stock footage.

Additional Guidance:
- Channel Branding: Create a consistent and recognizable theme for all channel art and video thumbnails, incorporating colors to represent the content niche.
- Video Creation: Each video should be informative and engaging, with clear, high-quality visuals and concise, articulate narration.
- Audience Engagement: Regularly interact with viewers through comments, polls, and community posts to gather feedback and suggestions for future videos.
- Analytics Review: Monitor channel analytics weekly to understand viewer behavior and preferences, which will inform future content creation.
- Content Ideas: Remember previous videos that have high engagement rates and consider producing related follow-up content or series.
- Promotion: Share video links on related online forums and social media platforms to increase visibility and grow the subscriber base.
- Collaboration: Seek out opportunities for collaboration with other YouTubers in the same niche to cross-promote content.
- Compliance: Ensure all content adheres to YouTube's community guidelines and copyright laws.

Priority Levels:
- Channel and video setup is the first priority, followed by content creation.
- Audience engagement and analytics review are ongoing tasks that should be woven into weekly activities.
- Promotion and collaboration are lower priorities but should not be neglected.

Format Specifications:
- Use bullet points for video scripts where possible to ensure clarity of information.
- Title and describe each video in a way that includes relevant keywords for search engine optimization (SEO).

Confidentiality Notes:
- Maintain confidentiality regarding viewer data and any sensitive information discussed in sustainability topics.

Deadline:
- Complete channel setup and first video upload within two weeks of receiving these instructions.

Revision Policies:
- Revisit and refine the channel's description and tags monthly to keep in line with SEO best practices.

Error Handling:
- If uncertain about any content's compliance with guidelines, seek clarification before proceeding with production.

Feedback Mechanisms:
- Implement a system to track user feedback and content suggestions, categorizing them for easy reference in future content planning.

Success Criteria:
- A successful channel will have a clear, defined niche with consistent branding, regular content uploads, and growing viewer engagement metrics.

Restrictions or Limitations:
- Avoid controversial or divisive topics not directly related to sustainability.
- Stick to the outlined video schedule unless changes are communicated in advance.

Follow-up Actions:
- After video uploads, review and respond to comments within the first 24 hours to boost engagement.

Tools and Resources:
- Use keyword research tools for SEO, and graphic design software for creating channel art and thumbnails.

Contact Points:
- For technical issues or strategic advice, contact the channel advisor via the provided email address.
- For creative input or content brainstorming, set up a bi-weekly meeting with the content creation team.

Alternative Outcomes:
- If a suggested video topic does not align with the channel's mission, provide alternative content that fits within the sustainability niche.





