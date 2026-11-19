Anonymous organization-level registries for Dependabot - GitHub Changelog 
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
October 12, 2026 •
1 minute read 
Anonymous organization-level registries for Dependabot
You can now select Anonymous as the authentication method for an organization-level private registry. Use it for registries that Dependabot can reach without credentials, such as an internal package mirror that allows anonymous reads.
On github.com, Dependabot update jobs can only reach hosts on the egress allowlist and the private registries you configure. A private registry that’s only defined in a file such as .npmrc or nuget.config is blocked. Organization-level registries apply to every repository you grant access to, including repositories that only use Dependabot security updates and don’t have a dependabot.yml file.
To add a registry, go to your organization’s Settings , select Secrets and variables , then Private registries , and choose New private registry . If you used a placeholder token as a workaround, delete that registry and add it again with Anonymous authentication. This is necessary because you can’t change the authentication method of an existing registry.
The Anonymous option is now generally available on github.com and will be available in GitHub Enterprise Server 3.24.
Learn more about giving security features access to private registries and resolving a blocked host in a Dependabot update job .
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