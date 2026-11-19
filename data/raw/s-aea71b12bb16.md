Copilot cloud agent fields added to usage metrics - GitHub Changelog 
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
April 23, 2026 •
1 minute read 
Copilot cloud agent fields added to usage metrics
Table of Contents
What's new 
Why this matters 
Important notes 
Menu. Currently selected: What's new 
What's new 
Why this matters 
Important notes 
Following the Copilot coding agent to Copilot cloud agent rename , the Copilot usage metrics API now includes a new used_copilot_cloud_agent field in user-level reports. This boolean field mirrors the existing used_copilot_coding_agent flag under the updated product name.
What’s new 
Field 
Description 
used_copilot_cloud_agent 
Whether the user had Copilot cloud agent activity during the reporting period (boolean, nullable) 
The field is available in single-day and 28-day rolling window reports at both the enterprise and organization user levels. It returns the same value as the existing used_copilot_coding_agent field, which will be preserved for backward compatibility until August 1, 2026.
Why this matters 
Integrations and dashboards can adopt the new field name to match the Copilot cloud agent branding without waiting for the legacy field to be removed.
Both fields coexist and return the same value, so you can transition at your own pace.
The new field appears in enterprise user and organization user reports for both 1-day and 28-day windows.
Important notes 
These metrics are available to enterprise administrators and organization owners who have access to Copilot usage metrics through the REST API.
The existing used_copilot_coding_agent field continues to work and will not be deprecated until August 1, 2026.
Join the discussion within GitHub Community .
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