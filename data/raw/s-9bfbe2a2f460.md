CodeQL 2.25.3 adds Swift 6.3 support - GitHub Changelog 
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
May 8, 2026 •
2 minute read 
CodeQL 2.25.3 adds Swift 6.3 support
Table of Contents
Language and framework support 
Query changes 
Menu. Currently selected: Language and framework support 
Language and framework support 
Query changes 
CodeQL is the static analysis engine behind GitHub code scanning , which finds and remediates security issues in your code. We’ve recently released CodeQL 2.25.3 , which adds support for Swift 6.3, promotes five C/C++ queries to the default code scanning query suite, and includes various accuracy improvements across languages.
Language and framework support 
Swift 
CodeQL now supports analysis of apps built with Swift 6.3.
Python 
The Python extractor now supports the new lazy import ... and lazy from ... import ... syntax defined in PEP-810 , which is part of Python 3.15.
Java/Kotlin 
The java/xxe and java/xxe-local queries now detect sinks in the Woodstox StAX library, including direct uses of com.ctc.wstx.stax.WstxInputFactory and org.codehaus.stax2.XMLInputFactory2 .
C/C++ 
We’ve added AllocationFunction models for aligned_alloc , std::aligned_alloc , and bsl::aligned_alloc .
Query changes 
C/C++ 
We’ve promoted five queries to high precision and added them to the default code scanning query suite:
cpp/comparison-with-wider-type (Comparison of narrow type with wide type in loop condition).
cpp/integer-multiplication-cast-to-long (Multiplication result converted to larger type).
cpp/suspicious-add-sizeof (Suspicious add with sizeof).
cpp/wrong-type-format-argument (Wrong type of arguments to formatting function).
cpp/implicit-function-declaration (Implicit function declaration). For build-mode: none databases, this query no longer produces results, since they were noisy and imprecise.
C# 
We’ve updated the cs/useless-tostring-call query to avoid false positives in calls to StringBuilder.AppendLine and in calls of the form base.ToString() , and we’ve made the alert message more precise.
JavaScript/TypeScript 
The js/missing-rate-limiting query now accounts for Fastify per-route rate limiting.
Python 
The py/bind-socket-all-network-interfaces query now uses the global data-flow library, leading to better precision and more results. The query also recognizes wrappers of socket.socket in the eventlet and gevent libraries as socket binding operations.
GitHub Actions 
We’ve improved the alert messages and source locations for the actions/artifact-poisoning/critical and actions/artifact-poisoning/medium queries, making alerts easier to understand and aligning them with similar queries that report on potentially untrusted artifacts.
The actions/missing-workflow-permissions query no longer produces false positives on reusable workflows where all callers set permissions.
We’ve removed false positive injection sink models for the context input of docker/build-push-action and the allowed-endpoints input of step-security/harden-runner .
For a full list of changes, please refer to the complete changelog for version 2.25.3 . Every new version of CodeQL is automatically deployed to users of GitHub code scanning on github.com. The new functionality in CodeQL 2.25.3 will also be included in GitHub Enterprise Server (GHES) 3.22 release. If you use an older version of GHES, you can manually upgrade your CodeQL version .
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