Closing down notice of legacy Copilot metrics APIs - GitHub Changelog 
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
January 29, 2026 •
1 minute read 
Closing down notice of legacy Copilot metrics APIs
Table of Contents
What do these APIs do? 
Why? 
What’s recommended moving forward? 
Menu. Currently selected: What do these APIs do? 
What do these APIs do? 
Why? 
What’s recommended moving forward? 
We are closing down three legacy Copilot metrics APIs as part of our transition to newer, more comprehensive usage metrics endpoints. Support for these APIs will be limited, and no new features will be developed.
The User-level Feature Engagement Metrics API and Direct Data Access API will sunset on March 2nd, 2026. 
The Copilot Metrics API will sunset on April 2nd, 2026. 
We strongly recommend transitioning any existing workflows to the latest Copilot usage metrics endpoints to avoid disruption.
What do these APIs do? 
These APIs provide visibility into adoption and usage of GitHub Copilot features:
User-level Feature Engagement Metrics API offers a simplified view of user adoption of specific Copilot features through binary indicators.
Direct Data Access API provides user-level event data for Copilot code completion activity within supported IDEs.
Copilot Metrics API provides aggregated usage metrics, primarily focused on IDE usage.
Why? 
We have released a new set of Copilot usage metrics APIs that provide significantly more depth and flexibility. By consolidating to our latest APIs, we are able to:
Provide a single, unified source of truth for Copilot metrics.
Deliver more granular and valuable insights, including IDE agents, models, languages, lines of code, and fine-grained permissions.
Reduce support overhead and streamline the product experience.
What’s recommended moving forward? 
We recommend transitioning to the latest Copilot usage metrics APIs , which provide comprehensive usage data at the enterprise, organization, and user levels.
These endpoints return aggregated metrics with expanded IDE telemetry, including:
Edit modes and agent usage.
Suggested versus accepted lines of code.
Language and model breakdowns.
Additional usage dimensions not available in the legacy APIs.
The new APIs are currently in public preview and will be generally available in the near future.
Table of Contents
What do these APIs do? 
Why? 
What’s recommended moving forward? 
Menu. Currently selected: What do these APIs do? 
What do these APIs do? 
Why? 
What’s recommended moving forward? 
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