Org-level metrics API now includes pull request throughput metric parity - GitHub Changelog 
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
February 25, 2026 •
2 minute read 
Org-level metrics API now includes pull request throughput metric parity
Table of Contents
What’s new 
Why this matters 
Important notes 
Menu. Currently selected: What’s new 
What’s new 
Why this matters 
Important notes 
We’re expanding the organization-level Copilot Usage Metrics API to include a broader set of pull request activity, including creation volume, throughput and cycle time. This brings the org-level endpoints to parity with what was previously available only at the enterprise level.
What’s new 
Organizations can now retrieve daily aggregated pull request activity and Copilot participation metrics directly from the org-level API, including:
Baseline pull request activity
Total pull requests created
Total pull requests reviewed
Total pull requests merged
Median time to merge (minutes)
Copilot participation on pull request throughput + review quality
Pull requests created by Copilot (Copilot coding agent)
Pull requests reviewed by Copilot (Copilot code review)
Total review suggestions and total applied suggestions
Copilot suggestions and Copilot applied suggestions
Copilot-created pull requests that were merged
Median time to merge for Copilot-created pull requests
Why this matters 
With this update, teams can:
Standardize reporting at the org level.
Quantify Copilot’s impact on the pull request lifecycle, from pull request creation to merge.
Track not just suggestion volume but also applied suggestions as a signal of actionable feedback.
Improve visibility into non-IDE Copilot usage, including agent-created pull requests and Copilot-authored review activity.
Important notes 
If your organization belongs to an enterprise, organization-level totals may not match enterprise totals. Users can belong to multiple organizations, so their usage can appear in more than one organization report, while enterprise reporting deduplicates users.
If you see the API report is empty for everything but pull request data, it likely means they don’t have any IDE usage, so only pull request data is available.
Repo/org transfers can split attribution. If a repository is transferred after a pull request is created (or reviewed) but before it’s merged, events can be attributed to different orgs (e.g., pull request created/reviewed may count under the original org, while pull request merged counts under the new org). If an organization is transferred to a new enterprise, events may be split at the enterprise level, but at the org level, attribution stays with the same org.
For more information on the new data field definitions, visit our documentation about Copilot usage metrics . Join the discussion within GitHub Community .
Table of Contents
What’s new 
Why this matters 
Important notes 
Menu. Currently selected: What’s new 
What’s new 
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