Dependabot now supports pre-commit hooks - GitHub Changelog 
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
March 10, 2026 •
1 minute read 
Dependabot now supports pre-commit hooks
GitHub Dependabot now natively supports automatic dependency updates for pre-commit hooks. By adding pre-commit as a package ecosystem in your dependabot.yml configuration, Dependabot will parse your .pre-commit-config.yaml , check each hook’s repository for new tags or releases, and open pull requests to update the rev field. This is all fully integrated into your existing Dependabot workflow.
Supported features include:
Tag and SHA-based revisions : Works with hooks pinned to Git tags (e.g., v4.5.0 ) or commit SHAs.
Grouped updates : Combine multiple hook updates into a single pull request using Dependabot’s existing grouped updates configuration.
Changelog and release notes : Pull requests include changelogs and release notes from hook repositories so you can review what’s changed before merging.
YAML formatting preservation : Updates modify the rev value and any inline version comments (e.g., # frozen: ) to reflect the new version, all while keeping your existing structure intact.
Graceful handling of local and meta repos : Dependabot automatically skips local and meta hook definitions that don’t require version updates.
Multi-host support : Works with hooks hosted on GitHub, GitLab, Bitbucket, and other Git hosting providers.
To get started, configure pre-commit support in Dependabot version updates and join the conversation in dependabot-core .
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