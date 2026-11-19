Open source license compliance is in public preview - GitHub Changelog 
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
June 30, 2026 •
1 minute read 
Open source license compliance is in public preview
Table of Contents
How it works 
How to try it 
Menu. Currently selected: How it works 
How it works 
How to try it 
Enterprises can now manage their dependencies’ licenses at scale with sophisticated, ruleset-based checks that enforce a centralized policy. Open source license compliance is in public preview, letting you block noncompliant dependencies before they reach production.
How it works 
Open source license compliance expands on the capabilities of the dependency review action by introducing an enterprise-wide license policy. The policy is activated by targeting repositories with a ruleset that uses a new “Require license compliance check results before merging” condition, similar to the existing code scanning conditions. When developers open pull requests that add or modify dependencies, license checks automatically run against your policy to ensure each new or changed dependency has an acceptable license. The feature will annotate the pull request for any noncompliant dependencies. These annotations must be addressed by either removing or replacing the dependency, amending the license policy, or creating package exceptions.
Open source license compliance introduces a new predefined enterprise role, Enterprise Open Source License Policy Manager . Assign this role to individuals or teams who should review and approve closure requests. Policy managers receive email notifications about pending requests and can review them from the enterprise console.
How to try it 
License compliance is available today in public preview for all GitHub Enterprise Cloud customers with GitHub Advanced Security Code Security licenses. For detailed setup instructions, see About open source license compliance .
Join the discussion within GitHub Community .
Table of Contents
How it works 
How to try it 
Menu. Currently selected: How it works 
How it works 
How to try it 
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