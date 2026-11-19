GitHub package firewall in public preview - GitHub Changelog 
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
October 20, 2026 •
2 minute read 
GitHub package firewall in public preview
Table of Contents
How it works 
Availability and limitations 
How to use it 
Menu. Currently selected: How it works 
How it works 
Availability and limitations 
How to use it 
Editor’s note (October 21, 2026): Rewrote the changelog for clarity and added imagery. 
There’s been a recent flood of malware attacks that exploit systems at package installation time. Agents and CI runners are particularly vulnerable to these attacks because they install dependencies to accomplish a task or complete a build without a human in the loop. To stem this tide, GitHub is introducing a new package firewall, which sits between endpoints or internal registries and the upstream package repositories. The firewall inspects both metadata requests and package downloads for signs of malicious activity, acting as an install-time policy gate. The package firewall is available today in public preview for all GitHub Enterprise Cloud customers, including data-resident GitHub Enterprise Cloud.
How it works 
First, administrators set policy controls for their enterprise. The controls available today include a configurable cooldown period, checking the GitHub Advisory Database for malware or vulnerability advisories, and supply-chain checks like attestation downgrades.
Then, endpoints like coding agents and CI/CD hosts use the firewall for their requests instead of pointing directly at the upstream package registries. Metadata requests for package lists as well as the actual package downloads flow through the firewall, which evaluates them against the policy. If a package is blocked erroneously, the user can request an exception with a workflow similar to other GitHub Advanced Security features.
Availability and limitations 
The package firewall is available in public preview as we scale up the infrastructure behind it and continue to add features based on customer demand. It is available to GitHub Enterprise Cloud customers, including GitHub Enterprise Cloud with data residency. The service is free while in the preview period. When it reaches general availability, it will be charged based on metered usage, similar to Actions billing.
Currently the package firewall only supports npm packages.
How to use it 
For detailed setup instructions, see Protecting endpoints with package firewall . Join the discussion in GitHub Community .
Table of Contents
How it works 
Availability and limitations 
How to use it 
Menu. Currently selected: How it works 
How it works 
Availability and limitations 
How to use it 
supply chain security 
universe26 
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
Oct.28 Release 
GitHub Copilot in VS Code, Universe releases 
copilot 
universe26 
vs code 
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