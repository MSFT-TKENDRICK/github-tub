CodeQL 2.27.3 adds Python 3.15 features and JSON data extensions - GitHub Changelog 
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
November 3, 2026 •
2 minute read 
CodeQL 2.27.3 adds Python 3.15 features and JSON data extensions
Table of Contents
Language and framework support 
Query changes 
Breaking changes 
Menu. Currently selected: Language and framework support 
Language and framework support 
Query changes 
Breaking changes 
CodeQL is the static analysis engine behind GitHub code scanning, which finds and remediates security issues in your code. We’ve recently released CodeQL 2.27.3 . It supports new Python 3.15 language features, adds JSON syntax for data extensions, adds C23 bit-precise integers, and includes accuracy improvements across languages.
Language and framework support 
CodeQL CLI 
Data extension files now support JSON syntax, using the same structure as YAML data extensions. Java-style comments ( // ... and /* ... */ ) also work. CodeQL parses files with the .json extension as JSON and continues to parse all other files as YAML.
We’ve added an opt-in ai threat model for LLM-generated data. It doesn’t include any built-in source models, so you can define your own sources with data extensions.
Python 
The Python extractor now supports Python 3.15 syntax, including unary plus in match literal patterns and Unicode 17 identifiers.
We’ve added support for the new frozendict and sentinel builtins introduced in Python 3.15, including data flow modeling for frozendict construction.
C/C++ 
We’ve added support for C23 bit-precise integers ( _BitInt(N) ).
We’ve added flow summaries for the BlazingMQ BloombergLP::bmqa::Message and MessageProperties classes and their iterators.
C# 
We’ve added support for data flow through positional patterns in is expressions and switch cases.
When you configure private registries, CodeQL now passes the required proxy and certificate environment variables to the NuGet CLI.
Ruby 
CodeQL now treats Grape::API request sub-accessors as remote flow sources. These include body.read , body.string , params , GET , POST , cookies , env , query_string , and path_info .
Query changes 
C/C++ 
The cpp/resource-not-released-in-destructor query now recognizes resources released through local aliases, reducing false positives.
C# 
The cs/simplifiable-boolean-expression query now produces fewer false positives when type information is incomplete.
Java/Kotlin 
The java/ssrf and java/unvalidated-url-redirection queries now recognize case-insensitive comparisons of URI.getHost() with fixed allowlist entries. They also recognize these checks when code stores the host in a local variable, which reduces false positives.
Python 
The py/xxe , py/xml-bomb , and py/nosql-injection queries now respect your configured threat model when selecting untrusted data sources. By default, they still use remote flow sources. These queries now also include sources you model with data extensions.
Breaking changes 
GitHub Actions: The GitHub Actions control flow graph (CFG) now uses the shared CFG library. If your custom queries rely on specific CFG nodes, edges, or basic block boundaries, you may need to update them. We’ve removed the legacy Completion classes, so use CFG edge labels such as DirectSuccessor , BooleanSuccessor , and ReturnSuccessor instead.
For a full list of changes, please refer to the complete changelog for version 2.27.3 . Every new version of CodeQL is automatically deployed to users of GitHub code scanning on github.com. The new functionality in CodeQL 2.27.3 will also be included in GitHub Enterprise Server (GHES) 3.24 release. If you use an older version of GHES, you can manually upgrade your CodeQL version .
Table of Contents
Language and framework support 
Query changes 
Breaking changes 
Menu. Currently selected: Language and framework support 
Language and framework support 
Query changes 
Breaking changes 
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
Oct.28 Release 
Push protection beyond predefined secret patterns 
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