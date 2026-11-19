Rate limits for private vulnerability reports - GitHub Changelog 
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
October 1, 2026 •
1 minute read 
Rate limits for private vulnerability reports
Open source maintainers are receiving more low-quality and automated vulnerability reports, which can bury the reports that matter. Rate limits cap how many new reports a single account can submit in a day, both to your repository and across GitHub. This helps protect you from bulk and automated submissions, while legitimate researchers can still reach you.
With this update:
Private vulnerability reporting now applies daily per-user rate limits to new reports. 
Reporters who reach a limit see a message asking them to try again later.
Limits apply only to new reports. Comments on existing advisories aren’t affected.
Repository administrators can set a custom daily overall reporting limit for their repository.
Repository administrators can add trusted reporters to an allow list so they’re never rate limited.
To configure these settings, go to your repository’s settings, select Advanced Security , and click Settings next to “Private vulnerability reporting.”
This is available for public repositories with private vulnerability reporting enabled on GitHub Free, GitHub Pro, GitHub Team, and GitHub Enterprise Cloud.
Learn more in our docs about configuring private vulnerability reporting .
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