CodeQL adds Go 1.26 and Kotlin 2.3.10 support and improves query accuracy - GitHub Changelog 
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
February 24, 2026 •
1 minute read 
CodeQL adds Go 1.26 and Kotlin 2.3.10 support and improves query accuracy
Table of Contents
Language and framework support 
Query changes 
Menu. Currently selected: Language and framework support 
Language and framework support 
Query changes 
CodeQL is the static analysis engine behind GitHub code scanning , which finds and remediates security issues in your code. We’ve released CodeQL 2.24.2 , which adds support for Go 1.26 and Kotlin 2.3.10 and includes improvements that enhance the accuracy of your code scanning results.
Language and framework support 
Go 
Go 1.26 is now supported for analysis.
Kotlin 
Kotlin versions up to 2.3.10 are now supported for analysis.
Python 
We’ve added request forgery sink models for the Azure SDK.
Query changes 
C# 
The cs/web/missing-token-validation (“Missing cross-site request forgery token validation”) query now recognizes antiforgery attributes on base controller classes, fixing false positives when [ValidateAntiForgeryToken] or [AutoValidateAntiforgeryToken] is applied to a parent class.
Java/Kotlin 
We now consider more ways of checking that a string matches a regular expression as sanitizers for various queries, including java/ssrf , java/path-injection , and java/log-injection . In particular, being annotated with @javax.validation.constraints.Pattern is now recognized as a sanitizer for those queries.
Check out the complete changelog for version 2.24.2 for a full list of changes. Every new version of CodeQL is automatically deployed to users of GitHub code scanning on github.com. The new functionality in CodeQL 2.24.2 will also be included in a future GitHub Enterprise Server (GHES) release. If you use an older version of GHES, you can manually upgrade your CodeQL version .
Table of Contents
Language and framework support 
Query changes 
Menu. Currently selected: Language and framework support 
Language and framework support 
Query changes 
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