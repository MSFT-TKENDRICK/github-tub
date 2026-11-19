Expired GitHub Actions artifacts no longer shown in UI and API - GitHub Changelog 
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
September 24, 2026 •
1 minute read 
Expired GitHub Actions artifacts no longer shown in UI and API
Expired artifacts are no longer displayed in the GitHub Actions run summary or returned by the REST API. Previously, an expired artifact remained visible with an “Expired” pill, even though the underlying files had already been deleted from storage.
That leftover pill left some users unsure whether they were still being billed for storing artifacts that no longer existed. To remove that ambiguity, expired artifacts will not be shown when viewing run data, including:
The list of artifacts on a workflow run summary page.
The list artifacts for a repository and get an artifact REST API endpoints.
If you need to know which artifacts a workflow run produced after they’ve expired, you can still find that information in the run’s logs. This change doesn’t affect artifact retention settings or billing—it only changes how expired artifacts are displayed.
actions 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Nov.02 Retired 
pull_request_target blocked by default December 2 
actions 
application security 
... 
+1 
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
Oct.22 Improvement 
Meta API endpoints updated for Actions blob storage 
actions 
Oct.15 Release 
Xcode 27 runner image generally available 
actions 
Oct.14 Release 
GitHub Actions workflow lockfiles in public preview 
actions 
Oct.02 Improvement 
Stateless GitHub App installation tokens rolled out 
actions 
ecosystem & accessibility 
... 
+1 
Oct.01 Retired 
GitHub Actions: macOS 14 runner image retirement 
actions 
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