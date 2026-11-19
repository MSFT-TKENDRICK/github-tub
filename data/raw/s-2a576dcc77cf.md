CodeQL 2.25.4 adds Swift 6.3.1 support, improvements to C# and Java, and more - GitHub Changelog 
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
May 12, 2026 •
2 minute read 
CodeQL 2.25.4 adds Swift 6.3.1 support, improvements to C# and Java, and more
Table of Contents
Language and framework support 
Query changes 
New features 
Menu. Currently selected: Language and framework support 
Language and framework support 
Query changes 
New features 
CodeQL is the static analysis engine behind GitHub code scanning , which finds and remediates security issues in your code. We’ve recently released CodeQL 2.25.4 , which adds Swift 6.3.1 support, improves accuracy of C# analysis, extends security analysis to Vercel serverless functions, and introduces data flow barrier extensions across nearly every supported language.
Language and framework support 
Swift 
CodeQL now supports analysis of apps built with Swift 6.3.1.
C# 
We’ve expanded ASP and ASP.NET remote source modeling to cover additional sources, including fields of tainted parameters as well as properties and fields that become tainted transitively. This improves detection coverage for taint flows in ASP.NET applications.
We’ve added support for C# 14 user-defined compound assignment operators.
When resolving dependencies in build-mode: none , dotnet restore now explicitly uses reachable NuGet feeds configured in nuget.config and any private registries directly, improving reliability when default feeds are unavailable or restricted.
JavaScript/TypeScript 
We’ve added support for @vercel/node Vercel serverless functions. Handlers are recognized via VercelRequest / VercelResponse TypeScript parameter types, so standard security queries (e.g., js/reflected-xss , js/request-forgery , js/sql-injection , and js/command-line-injection ) now detect vulnerabilities in Vercel API route files.
Query changes 
Java/Kotlin 
The java/path-injection and java/zipslip queries now recognize Path.toRealPath() as a path normalization sanitizer, consistent with the existing treatment of Path.normalize() and File.getCanonicalPath() . This reduces false positives for code using the NIO.2 API for path canonicalization.
The java/sensitive-log query now excludes additional variable naming patterns that don’t hold sensitive data (e.g., pagination tokens ( nextToken , pageToken , continuationToken ) and secret metadata ( secretName , secretId , secretVersion )) reducing false positives.
The java/sensitive-log query now treats method calls whose names contain “encrypt”, “hash”, or “digest” as sanitizers, reducing false positives when sensitive data is hashed or encrypted before logging.
The java/trust-boundary-violation query now recognizes regular expression checks (e.g., String.matches() guards and @javax.validation.constraints.Pattern annotations) as sanitizers, reducing false positives when input is validated before being stored in a session.
C/C++ 
We’ve added taint flow models for the Strsafe.h header from the Windows SDK.
New features 
You can now add data flow barriers and barrier guards using data extensions across C/C++, C#, Go, Java/Kotlin, JavaScript/TypeScript, Python, Ruby, and Rust. This makes it easier to suppress false positives in your organization’s custom CodeQL configurations without modifying queries directly. See the customizing library models documentation for your language for details.
For a full list of changes, please refer to the complete changelog for version 2.25.4 . Every new version of CodeQL is automatically deployed to users of GitHub code scanning on github.com. The new functionality in CodeQL 2.25.4 will also be included in a future GitHub Enterprise Server (GHES) release. If you use an older version of GHES, you can manually upgrade your CodeQL version .
Table of Contents
Language and framework support 
Query changes 
New features 
Menu. Currently selected: Language and framework support 
Language and framework support 
Query changes 
New features 
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