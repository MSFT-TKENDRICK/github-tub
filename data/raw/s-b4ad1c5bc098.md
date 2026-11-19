GitHub Copilot code review will start consuming GitHub Actions minutes on June 1, 2026 - GitHub Changelog 
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
April 27, 2026 •
2 minute read 
GitHub Copilot code review will start consuming GitHub Actions minutes on June 1, 2026
Table of Contents
What’s changing 
When it takes effect 
What you need to do 
Menu. Currently selected: What’s changing 
What’s changing 
When it takes effect 
What you need to do 
Developers and engineering teams worldwide use GitHub Copilot for high-quality, agent-powered code reviews on every pull request. We understand that any change is significant to our customers, especially when it relates to billing, so we are sharing this update early to help you plan and prepare. The sections below outline what is changing, why, and how to plan accordingly.
What’s changing 
Last month, we shared how GitHub Copilot code review runs on agentic tool-calling architecture, allowing the code review agent to pull in broader repository context and produce more relevant feedback on each pull request. That agentic architecture runs on GitHub Actions using GitHub-hosted runners ( Note: GitHub Copilot code review also supports self-hosted runners and GitHub-hosted larger runners which are billed at different rates than standard GitHub-hosted runners. )
Starting June 1, 2026, each Copilot code review will be billed in two ways:
All Copilot usage (including code reviews) will be billed as AI Credits under the new usage-based billing model (see the usage-based billing announcement for additional details). 
GitHub Actions minutes will be consumed from your existing plan entitlement for each review that is run on private repositories, with any usage beyond your included minutes billed at standard GitHub Actions rates. You or your organization administrator (for GitHub Teams and Enterprise) can use budgets to manage spending on GitHub Actions. There are no changes to public repositories, where Actions minutes remain free.
This change applies to the following plans:
GitHub Copilot Pro 
GitHub Copilot Pro+ 
GitHub Copilot Business 
GitHub Copilot Enterprise
This includes Copilot code reviews from non-licensed users and billed via direct org billing . 
When it takes effect 
This change takes effect on June 1, 2026 . Until that day, Copilot code review usage will continue to draw only from your existing Copilot premium request unit (PRU) allowance and will not consume GitHub Actions minutes.
What you need to do 
To prepare for the billing change, we recommend the following.
Review billing and usage 
Review your current GitHub Actions usage. Billing managers can view minute consumption and entitlements in your account or organization billing settings.
Check your budget on spending limits. Confirm that your personal or organizational budget for Actions aligns with your expected usage. You or your organization administrators (for GitHub Teams and Enterprise) can adjust spending limits for GitHub Actions at any time.
Monitor your Copilot and Actions usage over time via GitHub Copilot usage metrics , GitHub Actions metrics , and Billing Usage Report .
Review the usage-based billing announcement to understand how Copilot usage itself is being measured going forward. 
Share this update with your billing administrators and engineering leads so they are aware of the new usage pattern before June 1, 2026. 
Review runner settings 
No additional setup is required if you already have GitHub-hosted Runners enabled on your repository .
If you would like to customize your GitHub Hosted Runner environment, see Upgrade to larger GitHub-hosted Runners .
Self-hosted Runners setup is available.
Learn more about these changes in our documentation .
And join the discussion within GitHub Community .
Table of Contents
What’s changing 
When it takes effect 
What you need to do 
Menu. Currently selected: What’s changing 
What’s changing 
When it takes effect 
What you need to do 
actions 
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
Nov.02 Retired 
pull_request_target blocked by default December 2 
actions 
application security 
... 
+1 
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