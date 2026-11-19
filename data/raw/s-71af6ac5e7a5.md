Copilot CLI activity now included in usage metrics totals and feature breakdowns - GitHub Changelog 
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
April 10, 2026 •
1 minute read 
Copilot CLI activity now included in usage metrics totals and feature breakdowns
Table of Contents
What's new 
Why this matters 
Important notes 
Menu. Currently selected: What's new 
What's new 
Why this matters 
Important notes 
Previous CLI metrics releases added a standalone totals_by_cli section to the Copilot usage metrics API with session counts, request counts, and token usage. That section reported CLI activity separately from the rest of the report—top-level totals and dimensional breakdowns reflected IDE activity only.
With this update, CLI activity is now integrated into the metrics you already use.
What’s new 
Top-level totals now include CLI contributions. The following fields now represent IDE + CLI combined:
code_generation_activity_count 
code_acceptance_activity_count 
user_initiated_interaction_count 
loc_added_sum / loc_deleted_sum 
CLI appears in dimensional breakdowns as feature=copilot_cli in:
totals_by_feature 
totals_by_model_feature 
totals_by_language_feature 
totals_by_language_model 
CLI is excluded from totals_by_ide . The existing totals_by_cli section and per-user CLI fields added in recent releases remain unchanged.
This impacts our single-day and 28-day enterprise, organization, and per-user reports.
Why this matters 
Unified view of Copilot usage. Top-level totals now reflect all Copilot activity across surfaces, so dashboards and reports no longer undercount usage for organizations with CLI adoption.
Compare CLI alongside other features. CLI activity appears in the same totals_by_feature breakdowns as code completions, letting admins see how usage distributes across Copilot capabilities.
No more manual stitching. Previously, building a holistic view of Copilot output required combining totals_by_cli with IDE-only totals. That’s now handled by the API itself.
Important notes 
Top-level totals have changed meaning. If your dashboards or reporting assumed these fields represented IDE-only activity, the numbers will increase to reflect the addition of CLI contributions. Review any thresholds or comparisons that depend on these values.
Visit our API documentation to learn more. Join the discussion within GitHub Community .
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