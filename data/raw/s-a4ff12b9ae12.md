Separate GitHub Actions path for GitHub Code Quality - GitHub Changelog 
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
August 20, 2026 •
1 minute read 
Separate GitHub Actions path for GitHub Code Quality
A dedicated workflow path for code quality CodeQL actions workflows is now generally available. Your workflow run history and your Actions usage reports now tell GitHub Code Quality runs apart from GitHub code scanning runs. Code Quality analysis runs on dynamic/github-code-quality/codeql and shows github-code-quality as the actor, instead of sharing the dynamic/github-code-scanning/codeql path and the github-advanced-security actor with code scanning.
What you need to do 
Code Quality itself doesn’t need reconfiguration, and your enabled repositories keep scanning as they are. If you’ve built anything on the old path or actor, you need to update it:
Change Actions usage and billing reports that filter on dynamic/github-code-scanning/codeql so they also account for dynamic/github-code-quality/codeql .
Update scripts, dashboards, or workflow run filters that identify Code Quality runs by the github-advanced-security actor.
GitHub Code Quality is available on GitHub Enterprise Cloud and GitHub Team, as well as on GitHub Enterprise Cloud with data residency. To learn more, see GitHub Code Quality billing .
Join the discussion within GitHub Community .
actions 
application security 
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
GitHub Agentic Workflows generally available 
actions 
copilot 
universe26 
... 
+2 
Oct.28 Improvement 
GitHub Actions adds multi-cloud compute to improve reliability 
actions 
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