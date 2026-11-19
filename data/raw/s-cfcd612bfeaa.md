Copilot metrics now includes plan mode - GitHub Changelog 
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
March 2, 2026 •
1 minute read 
Copilot metrics now includes plan mode
Table of Contents
Availability 
Important note 
Menu. Currently selected: Availability 
Availability 
Important note 
Copilot usage metrics now includes plan mode telemetry. Enterprises can track adoption and engagement trends for plan mode alongside existing Copilot metrics, enabling a more complete view of how teams are implementing plans directly in their IDE.
Availability 
Plan mode telemetry is included as part of the broader Copilot usage metrics experience. Please ensure Copilot usage metrics is enabled for the enterprise or organization.
Telemetry is supported for JetBrains, Eclipse, Xcode, and VS Code Insiders at the enterprise, organization, and user-level. General release for VS Code is expected soon.
Within the API response , usage will be denoted by chat_panel_plan_mode under the keys totals_by_feature , totals_by_language_feature , and totals_by_model_feature .
Within the dashboard UI, view plan mode breakdowns for request and model usage under Insights > Copilot usage.
Important note 
Telemetry for plan mode used to be mixed in with “Custom”. Now that it’s properly broken out, you may see a dip in “Custom” usage. This may affect dashboard charts like “Requests per chat mode” and “Model usage per chat mode”.
Join the discussion within GitHub Community .
Table of Contents
Availability 
Important note 
Menu. Currently selected: Availability 
Availability 
Important note 
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