Upcoming access restrictions to public API endpoints and UI views - GitHub Changelog 
Skip to content 
Skip to sidebar 
/ 
Blog 
Changelog 
Docs 
Customer stories 
Try GitHub Copilot app 
See what's new 
Search 
Changelog 
Docs 
Customer stories 
See what's new 
Try GitHub Copilot app 
Back to changelog 
Retired 
June 30, 2026 •
1 minute read 
Upcoming access restrictions to public API endpoints and UI views
Table of Contents
What’s changing 
Why we are making this change 
Menu. Currently selected: What’s changing 
What’s changing 
Why we are making this change 
As part of our ongoing commitment to protect our users and ensure responsible use of our platform, the Notifications team will soon introduce access restrictions to several public API endpoints and related UI views.
What’s changing 
Access to the following public API endpoints will be limited to admins and collaborators:
List stargazers endpoint : /repos/{owner}/{repo}/stargazers 
List watchers endpoint : /repos/{owner}/{repo}/subscribers 
We will deprecate the endpoint and remove access to the underlying information:
List repositories watched by a user endpoint : /users/{username}/subscriptions 
During the deprecation period, the endpoint will remain accessible but will return empty responses. Full removal will occur in a subsequent phase.
The following UI views will also be affected:
Repository stargazers view: /stargazers 
Repository “You Know” stargazers view: /stargazers/you_know 
Repository watchers view: /watchers 
Some users may begin receiving empty responses or a 403 Forbidden status when accessing the endpoints or views listed above.
Why we are making this change 
These endpoints and views currently expose public lists of stargazers and watchers, and this information has increasingly been misused to collect user data for spam activities which negatively impacts user experience and platform trust.
By restricting access, we aim to reduce misuse of public data, prevent user data from being leveraged for spam, and strengthen overall platform security.
We will continue monitoring usage patterns and evaluating additional safeguards to ensure a safe and reliable environment for all users.
Table of Contents
What’s changing 
Why we are making this change 
Menu. Currently selected: What’s changing 
What’s changing 
Why we are making this change 
application security 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Nov.05 Improvement 
Secret scanning upgrades detectors, adds SpaceX as partner 
application security 
Nov.04 Improvement 
CodeQL 2.27.4 improves accuracy and query metadata 
application security 
Nov.03 Improvement 
CodeQL 2.27.3 adds Python 3.15 features and JSON data extensions 
application security 
Nov.02 Improvement 
GitHub Desktop adds short-lived authentication tokens 
account management 
application security 
client apps 
... 
+2 
Nov.02 Improvement 
Security risk assessments include repository protection status 
application security 
Nov.02 Retired 
pull_request_target blocked by default December 2 
actions 
application security 
... 
+1 
Oct.28 Release 
Security extension for the GitHub Copilot app 
application security 
copilot 
universe26 
... 
+2 
Oct.28 Release 
AI Scan for repositories in public preview 
application security 
universe26 
... 
+1 
Oct.28 Release 
Code scanning for AI applications in public preview 
application security 
universe26 
... 
+1 
Subscribe to our developer newsletter
Discover tips, technical guides, and best practices in our biweekly newsletter just for devs. 
Enter your email * 
Subscribe 
By submitting, I agree to let GitHub and its affiliates use my information for personalized communications, targeted advertising, and campaign effectiveness. See the GitHub Privacy Statement for more details. 
Back to top 
Site-wide Links
Product
Features 
Security 
Enterprise 
Customer Stories 
Pricing 
Resources 
Platform
Developer API 
Partners 
Atom 
Electron 
GitHub Desktop 
Support
Docs 
Community Forum 
Training 
Status 
Contact 
Company
About 
Blog 
Careers 
Press 
Shop 
© 2026 GitHub, Inc.
Terms 
Privacy 
Manage Cookies 
Do not share my personal information 
GitHub on LinkedIn 
GitHub on Instagram 
GitHub on YouTube 
GitHub on X 
GitHub on TikTok 
GitHub on Twitch 
GitHub’s organization on GitHub