Workflow dispatch API now returns run IDs - GitHub Changelog 
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
Improvement 
February 19, 2026 •
1 minute read 
Workflow dispatch API now returns run IDs
When you trigger a workflow using the GitHub Actions workflow dispatch API endpoint , you’ll now have the option to receive metadata in the response that helps you map your request to the corresponding workflow run. Previously, this endpoint returned only a 204 No Content status code. Now, you can pass in a new optional boolean parameter, return_run_details , which will return a 200 OK response containing the workflow ID, API URL, and workflow URL. If you do not pass in this parameter, it will continue to return the current 204 No Content status code.
This capability is also supported within the GitHub CLI, as of v2.87.0 . If you trigger a workflow dispatch via gh workflow run , GitHub CLI will now return the URL for the created run along with the gh run view command for viewing that run.
With this update, developers can easily identify which workflow runs originated from their API calls—no more extensive polling or building custom tracking solutions. This new parameter is currently available in the API, and the newest version of the GitHub CLI will also default return_run_details to true .
Learn more about the workflow dispatch API in the GitHub Actions documentation .
actions 
client apps 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Nov.02 Improvement 
GitHub Desktop adds short-lived authentication tokens 
account management 
application security 
client apps 
... 
+2 
Nov.02 Retired 
pull_request_target blocked by default December 2 
actions 
application security 
... 
+1 
Oct.28 Release 
GitHub Copilot Fusion now supports selection of local models 
client apps 
copilot 
universe26 
... 
+2 
Oct.28 Release 
GitHub Agentic Workflows generally available 
actions 
copilot 
universe26 
... 
+2 
Oct.28 Improvement 
GitHub Actions adds multi-cloud compute to improve reliability 
actions 
universe26 
... 
+1 
Oct.28 Release 
GitHub Actions workflow lockfiles are generally available 
actions 
universe26 
... 
+1 
Oct.23 Improvement 
Turn notifications into code with GitHub Copilot in Teams 
client apps 
copilot 
... 
+1 
Oct.22 Improvement 
Meta API endpoints updated for Actions blob storage 
actions 
Oct.21 Release 
GitHub CLI: Opt in to expiring, auto-refreshing OAuth tokens 
application security 
client apps 
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