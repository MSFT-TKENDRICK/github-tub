Dependabot alerts REST API now includes dependency versions - GitHub Changelog 
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
October 20, 2026 •
1 minute read 
Dependabot alerts REST API now includes dependency versions
You can now get the version of a vulnerable dependency directly from Dependabot alert responses in the REST API. Each alert’s dependency object includes a new version_requirement field with the version or version constraint that Dependabot last recorded for the alert.
Alert responses already included the advisory’s vulnerable version range, but not the version in your repository. If you sync alerts to other security tools, you no longer need to parse lockfiles or make a separate GraphQL request for vulnerableRequirements to get that version.
The value depends on how Dependabot detected the dependency:
Lockfiles: The resolved version.
Manifests without a lockfile: The version or version constraint declared in the manifest.
Dependency submission API: The resolved version submitted by your build tooling.
The field is null when no value is available. If an alert covers more than one vulnerable version of a dependency, the field holds one recorded value and may not represent all of them. Long version constraints may also be truncated.
You’ll find version_requirement in responses for individual alerts, in repository, organization, and enterprise alert lists, and in dependabot_alert webhook payloads.
This field is available now on github.com and GitHub Enterprise Cloud with data residency, and will be included in GitHub Enterprise Server 3.24.
Learn more about the REST API endpoints for Dependabot alerts and the dependabot_alert webhook event .
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
Oct.02 Retired 
Unvalidated npm trusted publishing configurations now expire 
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