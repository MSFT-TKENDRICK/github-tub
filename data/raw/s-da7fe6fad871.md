Copilot metrics in GitHub Enterprise Cloud with data residency in public preview - GitHub Changelog 
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
January 29, 2026 •
2 minute read 
Copilot metrics in GitHub Enterprise Cloud with data residency in public preview
Table of Contents
What’s included? 
Availability 
Menu. Currently selected: What’s included? 
What’s included? 
Availability 
We know how important data residency is for compliance and regional requirements. To that point, the Copilot usage, code generation dashboards, and corresponding API are now available to customers on GitHub Enterprise Cloud with data residency.
What’s included? 
Customers on GitHub Enterprise Cloud with data residency can now see the following information:
Copilot usage dashboard : Get clear, actionable insights into how your teams are using GitHub Copilot. The dashboard provides visibility into code completion activity, IDE usage, lines of code generated, and more.
Code generation dashboard : Observe Copilot’s output by quantifying the lines it suggested, added, or deleted across completions, chat, and agent features.
Fine-grain permissions : Access the APIs and dashboard if you are assigned the View enterprise Copilot metrics enterprise role. This means that all users assigned this role, not just enterprise admins or billing managers, are empowered to view granular Copilot usage metrics for the enterprise.
Organization usage : Programmatically access your organization’s own Copilot adoption and usage metrics, including usage statistics for various Copilot features, user engagement data, and feature adoption metrics. For more information, see our API documentation .
API access : Programmatically access Copilot usage data across your organization for custom reporting, monitoring, compliance, and advanced analytics.
Availability 
For existing GitHub Enterprise Cloud customers migrating to GitHub Enterprise Cloud with data residency, note that usage data will be split across enterprises. Historical usage will remain associated with your existing enterprise, while usage after migration will be attributed to the new data residency enterprise due to account changes.
If users are logged into multiple GitHub accounts within the IDE, usage generated will all be attributed to the GitHub Enterprise Cloud with data residency account and not shared across other accounts.
To access the dashboard, navigate to your enterprise account → “AI Controls” → “Copilot” → “Metrics” → “Copilot usage metrics”. You should then see the dashboard under “Insights” → “Copilot usage” or “Code generation”. Please also ensure you are either an enterprise administrator, billing manager, or have the proper fine-grained permissions that grant you access to Copilot metrics.
For API access, visit our Copilot usage metrics API documentation .
Join the discussion within GitHub Community .
Table of Contents
What’s included? 
Availability 
Menu. Currently selected: What’s included? 
What’s included? 
Availability 
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
Oct.28 Release 
GitHub intelligence puts your code, context, and history to work 
copilot 
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