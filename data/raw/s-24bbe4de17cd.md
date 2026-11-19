Add review cycles and time to adoption phases in the usage API - GitHub Changelog 
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
July 7, 2026 •
1 minute read 
Add review cycles and time to adoption phases in the usage API
Table of Contents
What's new 
Why this matters 
Important notes 
Menu. Currently selected: What's new 
What's new 
Why this matters 
Important notes 
The Copilot usage metrics API now reports two additional code-review velocity metrics for each AI adoption phase, extending the adoption phase cohorts fields available in the enterprise and organization reports. Alongside the existing per-phase merge time and merge counts, you can now compare how quickly pull requests are reviewed and how many review cycles they take across your adoption cohorts.
What’s new 
Each phase entry in the totals_by_ai_adoption_phase breakdown now includes two new fields:
avg_pull_requests_minutes_to_review : The median time, in minutes, from when a pull request is created to its first review.
avg_pull_requests_review_cycles : The median number of review submissions a pull request receives before it merges.
Both metrics are scoped to merged pull requests and attributed to each pull request’s merge day, so every pull request is counted exactly once. Pull requests that are reviewed but never merged do not contribute to either metric.
Why this matters 
Review latency and review-cycle counts are leading indicators of engineering throughput. By breaking them out by AI adoption phase, you can see whether teams with deeper Copilot adoption get their pull requests reviewed faster and iterate through fewer review cycles. This helps quantify the downstream impact of Copilot on your review process and helps you target enablement where it moves the needle most.
Important notes 
These metrics appear in both the enterprise and organization 1-day and 28-day reports.
Because they are scoped to merged pull requests, review latency and cycle counts reflect work that actually landed.
Phase definitions and cohort assignment are unchanged. For details, see the adoption phase cohorts announcement .
Visit the Copilot usage metrics API documentation to get started.
Table of Contents
What's new 
Why this matters 
Important notes 
Menu. Currently selected: What's new 
What's new 
Why this matters 
Important notes 
account management 
copilot 
enterprise management tools 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Nov.04 Release 
GitHub Copilot is now available in Xcode’s coding assistant 
copilot 
Nov.03 Improvement 
BYOK and enterprise custom models in the Copilot usage API 
account management 
copilot 
enterprise management tools 
... 
+2 
Nov.03 Release 
Look up a resource’s cost center with the GitHub REST API 
account management 
enterprise management tools 
... 
+1 
Nov.03 Release 
GitHub Copilot is now available in JetBrains Air 
copilot 
Nov.02 Improvement 
GitHub Desktop adds short-lived authentication tokens 
account management 
application security 
client apps 
... 
+2 
Oct.28 Release 
Route and orchestrate models with GitHub Copilot Fusion 
copilot 
enterprise management tools 
universe26 
... 
+2 
Oct.28 Release 
GitHub Copilot app, Universe releases 
copilot 
universe26 
... 
+1 
Oct.28 Release 
GitHub Enterprise now includes access to GitHub Copilot 
copilot 
universe26 
... 
+1 
Oct.28 Release 
Security extension for the GitHub Copilot app 
application security 
copilot 
universe26 
... 
+2 
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