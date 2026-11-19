Dependabot and code scanning: Org-level private registries - GitHub Changelog 
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
April 14, 2026 •
1 minute read 
Dependabot and code scanning: Org-level private registries
It’s now easier to configure Dependabot and code scanning for organizations that rely on multiple internal package feeds.
Previously, organization-level settings only allowed a single private registry configuration per ecosystem type (e.g., one Maven registry, one npm registry). Now, you can register all of your private feeds for the same ecosystem at the organization level.
Key highlights include the following:
Multiple registries per ecosystem : Add as many private registries as you need for npm, Maven, NuGet, Docker, pip, RubyGems, and all other supported ecosystems directly from your organization’s security settings.
OIDC authentication support : Configure OIDC-based authentication for org-level private registries through both the UI and REST API, with support for Azure DevOps Artifacts, AWS CodeArtifact, and JFrog Artifactory.
This feature is available now on github.com and GitHub Enterprise Cloud. It’ll also be available on GitHub Enterprise Server starting with GHES 3.24.
Learn more about configuring Dependabot access to private registries configuring code scanning access to private registries. You can also join the discussion in GitHub Community .
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