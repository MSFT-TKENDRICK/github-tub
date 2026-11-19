Code-to-cloud risk visibility with Microsoft Defender for Cloud is now generally available - GitHub Changelog 
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
May 5, 2026 •
2 minute read 
Code-to-cloud risk visibility with Microsoft Defender for Cloud is now generally available
Table of Contents
Code-to-cloud correlation with Microsoft Defender for Cloud 
Runtime risk context from Microsoft Defender for Cloud 
Runtime-aware filtering and campaign targeting 
Getting started 
Menu. Currently selected: Code-to-cloud correlation with Microsoft Defender for Cloud 
Code-to-cloud correlation with Microsoft Defender for Cloud 
Runtime risk context from Microsoft Defender for Cloud 
Runtime-aware filtering and campaign targeting 
Getting started 
This integration is now generally available. Since entering public preview , we’ve heard valuable feedback from customers, and we’ve shipped follow-up improvements that bring artifact and runtime context closer to the GitHub Advanced Security alert experience .
This integration connects code, build artifacts, and runtime context so you can track, prioritize, and remediate the security risks most relevant to your environment.
Code-to-cloud correlation with Microsoft Defender for Cloud 
Defender for Cloud correlates what’s running in your cloud environments back to the source code that produced it. Defender maps container images deployed in your environments to the GitHub repositories that built them, using signals like GitHub artifact attestations alongside its own runtime intelligence.
Once Defender for Cloud links an artifact to its source, you can evaluate security findings in the context of where and how the code runs.
Runtime risk context from Microsoft Defender for Cloud 
Defender for Cloud also brings workload details into GitHub through the Deployment Record API , populating the linked artifacts view with runtime context for each deployed artifact—such as whether it’s internet-exposed or processes sensitive data. With this context on GitHub, your security and development teams share a single source of truth for how build artifacts run and the risks they pose.
Runtime-aware filtering and campaign targeting 
GitHub Advanced Security supports runtime context filters across GitHub code scanning, Dependabot, and security campaigns. You’ll find these filter options in organization-level alert lists and campaign creation flows:
Filter by deployment status using has:deployment .
Focus on runtime risks with runtime-risk: (for example, runtime-risk:internet-exposed or runtime-risk:sensitive-data ).
Getting started 
To enable the integration, follow the setup steps in the Microsoft Defender for Cloud documentation for GitHub Advanced Security . Once connected, Defender handles container deployments and runtime risk context automatically.
Use the new filter options in security views to focus triage and campaigns on what’s deployed and exposed.
Assign critical security issues or campaigns to the GitHub Copilot coding agent directly from the issue or campaign view.
Join the discussion in the GitHub Community .
Table of Contents
Code-to-cloud correlation with Microsoft Defender for Cloud 
Runtime risk context from Microsoft Defender for Cloud 
Runtime-aware filtering and campaign targeting 
Getting started 
Menu. Currently selected: Code-to-cloud correlation with Microsoft Defender for Cloud 
Code-to-cloud correlation with Microsoft Defender for Cloud 
Runtime risk context from Microsoft Defender for Cloud 
Runtime-aware filtering and campaign targeting 
Getting started 
application security 
supply chain security 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Nov.05 Improvement 
Secret scanning upgrades detectors, adds SpaceX as partner 
application security 
Nov.04 Improvement 
CodeQL 2.27.4 improves accuracy and query metadata 
application security 
Nov.03 Improvement 
Dependabot version updates support Agent Package Manager 
supply chain security 
Nov.03 Improvement 
CodeQL 2.27.3 adds Python 3.15 features and JSON data extensions 
application security 
Nov.03 Improvement 
Dependabot now supports Python 3.15 
supply chain security 
Nov.02 Improvement 
GitHub Desktop adds short-lived authentication tokens 
account management 
application security 
client apps 
... 
+2 
Nov.02 Improvement 
Security risk assessments include repository protection status 
application security 
Nov.02 Retired 
pull_request_target blocked by default December 2 
actions 
application security 
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