CodeQL 2.26.4 improves GitHub actions security detections - GitHub Changelog 
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
September 3, 2026 •
2 minute read 
CodeQL 2.26.4 improves GitHub actions security detections
Table of Contents
Language and framework support 
Query changes 
Menu. Currently selected: Language and framework support 
Language and framework support 
Query changes 
CodeQL is the static analysis engine behind GitHub code scanning, which finds and remediates security issues in your code. We’ve recently released CodeQL 2.26.4 , which adds support for Go 1.27, improves alert locations for Rust data flow queries, and includes accuracy improvements across C#, Java/Kotlin, and GitHub Actions.
Language and framework support 
Go 
CodeQL now supports Go 1.27.
Rust 
Alert locations for data flow queries are now more precise and are based on the actual source and sink nodes. Some alerts will change location, so they’ll appear as new alerts while the previous alerts close.
Java/Kotlin 
We’ve added SQL injection sink models for Spring R2DBC DatabaseClient and the R2DBC SPI.
Taint now propagates through calls to String.valueOf(Object) when the argument is a CharSequence (e.g., a String or a StringBuilder ).
JavaScript/TypeScript 
We’ve added support for regular expressions using the d flag and for the React Native Worklets 'worklet' directive.
Python 
We’ve added taint flow through list.extend and list.insert , matching the existing taint flow through list.append .
Query changes 
C# 
The cs/web/missing-token-validation query now recognizes enabled ASP.NET Core RequireAntiforgeryToken attributes when antiforgery middleware is used.
The cs/virtual-call-in-constructor query no longer reports uses of virtual members in nameof expressions, since they aren’t calls.
The cs/useless-cast-to-self and cs/simplifiable-boolean-expression queries produce fewer false positives in build-mode: none databases.
GitHub Actions 
Checks on actor fields read from the event payload (e.g., github.event.pull_request.user.login ) now only count as protection for events that actually populate that field. This may produce more alerts for queries that use the ControlCheck class.
The actions/unpinned-tag query now detects mutable references to reusable workflows.
You can now specify EnvironmentCheck through a models-as-data model. Queries using ControlCheck may find more results when an environment is no longer a sufficient sanitizer.
For a full list of changes, please refer to the complete changelog for version 2.26.4 . Every new version of CodeQL is automatically deployed to users of GitHub code scanning on github.com. The new functionality in CodeQL 2.26.4 will also be included in a future GitHub Enterprise Server (GHES) release. If you use an older version of GHES, you can manually upgrade your CodeQL version .
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