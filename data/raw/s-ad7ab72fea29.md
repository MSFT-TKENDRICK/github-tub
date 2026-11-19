Copilot impact dashboard adds a return on investment section - GitHub Changelog 
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
August 7, 2026 •
2 minute read 
Copilot impact dashboard adds a return on investment section
The Copilot impact dashboard now includes a “Potential return on investment” section that connects what you spend on Copilot to the pull request output you get back.
What’s new 
Two cards compare developers by how deeply they have adopted Copilot: those working primarily in chat and code completions (i.e., “Passive users” and “Phase 1”) against agent-first developers (i.e., “Phase 2” and “Phase 3”). Each card shows:
Cost/dev/month : The average monthly Copilot cost per developer in that group, derived from actual AI credit consumption.
% Payroll/month : The above cost expressed as a share of developer compensation.
Pull requests/month : Average pull requests per developer per month.
A salary selector lets you pick a compensation band, and the cost-derived metrics recalculate instantly. This lets you model a potential return on investment against your own payroll assumptions.
Why this matters 
Administrators could already see that Copilot adoption was deepening, but not what that deeper adoption costs or what it returns. This section puts spend and output side by side for early-phase and agent-first developers, so you can justify continued investment and target enablement programs at the adoption phases with the most headroom left.
Also in this release 
More accurate adoption cohort user counts. Cohort user counts now reflect every user active during the full 28-day reporting window, rather than only users active on the window’s final day. Previously, a report ending on a weekend or holiday could show sharply lower counts in each phase. Expect cohort counts to be noticeably higher going forward. This only affects the impact dashboard — the Copilot usage metrics API and NDJSON exports are unchanged.
Important notes 
The return on investment section is available in the Copilot impact dashboard at both the enterprise and organization level.
It is available to enterprise owners and billing managers, organization owners, and anyone with a custom organization or enterprise role that grants the View Copilot Metrics permission. The Copilot usage metrics policy must be enabled.
Cost figures are estimates based on AI credit consumption, and the salary selector is a modeling input rather than actual payroll data. Treat these metrics as directional.
Visit the Copilot impact dashboard documentation to get started.
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