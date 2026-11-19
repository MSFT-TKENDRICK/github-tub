Audit GitHub Code Quality finding dismissals and reopenings - GitHub Changelog 
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
October 13, 2026 •
1 minute read 
Audit GitHub Code Quality finding dismissals and reopenings
You can now review manual dismissals and reopenings of GitHub Code Quality findings in your organization or enterprise audit log. Findings may appear in either your repository’s default-branch backlog or pull requests. Two new events record these actions:
repo.code_quality_findings_dismissed records a dismissal of one or more backlog findings.
repo.code_quality_findings_reopened records a reopening of one or more backlog findings.
Each event includes who made the request, when it happened, the repository and rule, and the identifiers and count of the affected findings.
For repositories with Code Quality enabled, you don’t need additional setup. If you have access to your organization audit log or enterprise audit log , filter by these action names to review activity. On GitHub Enterprise Cloud, you can also retrieve these events through the audit log API.
This improvement is generally available on GitHub Team and GitHub Enterprise Cloud, including enterprises with data residency. It isn’t available on GitHub Enterprise Server. For more on managing findings, see Fixing code quality findings in your repository backlog .
Join the GitHub Community discussion .
application security 
platform governance 
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
CodeQL 2.27.3 adds Python 3.15 features and JSON data extensions 
application security 
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
Oct.28 Release 
AI Scan for repositories in public preview 
application security 
universe26 
... 
+1 
Oct.28 Release 
Code scanning for AI applications in public preview 
application security 
universe26 
... 
+1 
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