npm adds preventive account protection for high-impact accounts - GitHub Changelog 
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
June 25, 2026 •
1 minute read 
npm adds preventive account protection for high-impact accounts
npm now adds a temporary, preventive safeguard for high-impact accounts —those responsible for the registry’s most widely used packages—whenever it detects a sensitive account change, strengthening protection against account-takeover attacks.
When a high-impact account changes its email or uses a 2FA recovery code, the account is placed into a 72-hour read-only state and an alert is sent to the account’s previous email address. This closes an attack vector that recent supply chain attacks have exploited: a compromised account changes its email, mints a new token, and publishes malicious versions.
During the read-only period, you can still install and download packages, view your organizations and teams, and browse account and package settings.
Actions that could affect the registry or the account’s security—such as publishing, managing tokens, changing package visibility, or modifying org and team membership—are paused until the safeguard lifts.
No action is needed to restore full access: the account returns to normal automatically after 72 hours, with no re-confirmation step. Packages stay fully available to everyone who depends on them throughout.
If you believe your account was affected unexpectedly or you need assistance during a read-only period, contact npm Support .
supply chain security 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Nov.03 Improvement 
Dependabot version updates support Agent Package Manager 
supply chain security 
Nov.03 Improvement 
Dependabot now supports Python 3.15 
supply chain security 
Oct.28 Release 
Prioritize Dependabot alerts with reachability analysis 
supply chain security 
universe26 
... 
+1 
Oct.20 Improvement 
Dependabot alerts REST API now includes dependency versions 
supply chain security 
Oct.20 Release 
GitHub package firewall in public preview 
supply chain security 
universe26 
... 
+1 
Oct.20 Improvement 
Dependabot now supports npm 12, pnpm 11 and 12, and Bun 1.4 
supply chain security 
Oct.16 Release 
Open source license compliance generally available 
supply chain security 
universe26 
... 
+1 
Oct.13 Improvement 
Improved detection for withdrawn Dependabot alerts 
supply chain security 
Oct.12 Improvement 
Anonymous organization-level registries for Dependabot 
supply chain security 
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