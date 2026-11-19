Agentic workflows no longer need a personal access token - GitHub Changelog 
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
June 11, 2026 •
1 minute read 
Agentic workflows no longer need a personal access token
Table of Contents
Configuring organization billing for Copilot CLI in GitHub Agentic Workflows 
Controlling cost while billing to your organization 
Menu. Currently selected: Configuring organization billing for Copilot CLI in GitHub Agentic Workflows 
Configuring organization billing for Copilot CLI in GitHub Agentic Workflows 
Controlling cost while billing to your organization 
You can now use GitHub Agentic Workflows with GitHub Actions’s built-in GITHUB_TOKEN .
This means that you no longer need to create and store a personal access token (PAT), eliminating the operational and security risks of managing long-lived PATs for automations at scale.
When you use the Actions token in an agentic workflow running in an organization-owned repository, AI credits consumed by your agentic workflow are billed directly to the organization.
Configuring organization billing for Copilot CLI in GitHub Agentic Workflows 
In order to use this feature, you must enable the “Allow use of Copilot CLI billed to the organization” Copilot policy. This is enabled by default if you have the existing “Copilot CLI” policy enabled.
Once enabled, you can configure agentic workflows to bill directly to the organization by adding copilot-requests: write to the permissions section in the frontmatter of your agentic workflow markdown file, then compiling and pushing your updated lockfile.
Note: You must be on the latest version of the Agentic Workflows CLI. Use $ gh extension upgrade aw to upgrade.
Controlling cost while billing to your organization 
User-level inference budgets are not considered when billing directly to the organization, because the cost is not attributed to a user. There are multiple ways to manage spend when using this billing method:
Configure cost centers for the relevant organizations. Cost centers allow cost attribution to groups of organizations, and budgets can be applied to cost centers.
Use the cost management tools in GitHub Agentic Workflows to monitor, manage, and cap token usage per agentic workflow run.
To learn more, see the GitHub Agentic Workflows documentation about authentication .
This feature is available for all Copilot plans: Copilot Free, Copilot Pro, Copilot Pro+, Copilot Business, and Copilot Enterprise.
Table of Contents
Configuring organization billing for Copilot CLI in GitHub Agentic Workflows 
Controlling cost while billing to your organization 
Menu. Currently selected: Configuring organization billing for Copilot CLI in GitHub Agentic Workflows 
Configuring organization billing for Copilot CLI in GitHub Agentic Workflows 
Controlling cost while billing to your organization 
copilot 
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
Oct.28 Improvement 
Build shared workflows for your team with Copilot Automations 
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