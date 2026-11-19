Team-level Copilot usage metrics now available via API - GitHub Changelog 
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
Release 
May 14, 2026 •
2 minute read 
Team-level Copilot usage metrics now available via API
Table of Contents
How it works 
Who can use this feature 
Key benefits 
Important notes 
Menu. Currently selected: How it works 
How it works 
Who can use this feature 
Key benefits 
Important notes 
The Copilot usage metrics API now exposes a new user-teams report that maps each Copilot-licensed user to the teams they belong to. By joining the user-teams report with the existing per-user usage report, enterprise administrators and organization owners can produce team-level Copilot usage metrics for any team in their organization or enterprise. This includes elements such as active users, completions, chats, as well as breakdowns by language, IDE, feature, and model.
How it works 
Two new endpoints return signed download URLs to NDJSON reports:
GET /enterprises/{enterprise}/copilot/metrics/reports/user-teams-1-day 
GET /orgs/{org}/copilot/metrics/reports/user-teams-1-day 
Each row in the user-teams report represents a team membership for a given day, including the team’s enterprise or organization id, team slug, and the user’s ID and login. To produce team-level metrics, join the user-teams report to the per-user usage report on user_id and day , then aggregate.
This release also introduces step-by-step guidance in the docs covering the join, day-level aggregation, and a rolling-window pattern for multi-day reporting.
Who can use this feature 
These metrics are available through the REST API to enterprise administrators, organization owners, billing managers, and people with an enterprise custom role with the View Enterprise Copilot Metrics permission.
Key benefits 
Slice metrics by team : Pivot Copilot adoption, active users, and code generation activity from org/enterprise totals down to any organization or enterprise team without building external team attribution.
Identify champions and gaps : See which teams are driving adoption and which need enablement, so you can target campaigns and rollout investments.
Full feature coverage : Team-level breakdowns are available across IDE completions, chat, Copilot CLI, code review, and Copilot cloud agent activity. They can be cut by language, IDE, feature, or model.
Important notes 
User-teams reports are available through the REST API only. There is no dashboard surface for team-level metrics in this release.
Teams with fewer than five Copilot-seated users are excluded from the user-teams report, though their members’ individual activity remains visible in the per-user usage report.
Users who belong to multiple teams will have their activity counted in each team’s aggregate, so team totals cannot be summed to reproduce an organization or enterprise total.
For step-by-step guidance, including the join recipe and rolling-window aggregation, see Team-level Copilot usage metrics .
Join the discussion within GitHub Community .
Table of Contents
How it works 
Who can use this feature 
Key benefits 
Important notes 
Menu. Currently selected: How it works 
How it works 
Who can use this feature 
Key benefits 
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