CodeQL 2.27.2 improves C++, Go, Rust, and JavaScript analysis - GitHub Changelog 
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
October 9, 2026 •
2 minute read 
CodeQL 2.27.2 improves C++, Go, Rust, and JavaScript analysis
Table of Contents
Language and framework support 
macOS 27 compatibility 
Query changes 
CodeQL CLI 
Go library breaking change 
Menu. Currently selected: Language and framework support 
Language and framework support 
macOS 27 compatibility 
Query changes 
CodeQL CLI 
Go library breaking change 
CodeQL 2.27.2 is now available, adding a C++ regular-expression parser and analysis improvements across several languages. CodeQL is the static analysis engine behind GitHub code scanning, which helps you find and remediate security issues in your code. The Default suite runs 498 security queries covering 170 CWEs. The Extended suite adds 131 queries covering 32 more CWEs.
Language and framework support 
C/C++ 
CodeQL now parses regular expressions that use the ECMAScript grammar in std::regex .
We’ve added SQL-injection sink models for the Comdb2 C API as well as flow summaries for Bloomberg BDE codecs and byte-stream deserializers.
Go 
CodeQL now models the github.com/coder/websocket import path, in addition to nhooyr.io/websocket .
Rust 
The Rust extractor now supports the AnyAttr and DocComment classes.
We’ve improved data flow for async blocks used with await as well as added flow summaries for native-tls , async-native-tls , and tokio-native-tls .
JavaScript/TypeScript 
CodeQL now recognizes the Workflow SDK’s "use workflow" and "use step" directives.
We’ve improved Hapi route-handler and request-input tracking through custom route-registration helpers and higher-order functions.
macOS 27 compatibility 
With the release of macOS 27 and Xcode 27, Apple stopped shipping multi-architecture x86-64/arm64 binaries. These binaries are required by CodeQL to perform traced analysis. For this reason, CodeQL’s autobuild and manual build modes will not be supported for compiled languages on macOS 27 with any Xcode version, and on macOS 26 when Xcode 27 is selected. When using these build modes, please use at most macOS 26 and Xcode 26. We are also working on improving support for build mode none on macOS to help mitigate this limitation.
Query changes 
C# 
The cs/web/missing-x-frame-options query now recognizes ASP.NET Core response headers and Content Security Policy frame-ancestors directives as clickjacking protections.
The cs/web/xss query no longer treats Razor tag-helper attribute values written with WriteLiteral as XSS sinks.
GitHub Actions 
You can now remove owners from the trusted set used by the actions/unpinned-tag query by adding an entry prefixed with ! , such as !github . This lets you report unpinned tags for first-party owners.
CodeQL CLI 
The CLI now reports invalid qlpack: and from: values in query suites as clear errors instead of crashing.
CodeQL now rejects YAML data-extension integers outside the signed 32-bit range instead of silently truncating some values.
Error and warning messages on standard error now include ERROR: and WARNING: prefixes. Structured output, including logs and SARIF, remains unchanged.
codeql query compile now accepts --dil-constants with --dump-dil to include optimized constant tuple sets in emitted DIL.
Commands that load data extensions now only warn when none of the patterns in a pack’s dataExtensions list match any files.
Go library breaking change 
The Go control-flow graph (CFG) now uses the shared CFG library. It includes additional nodes for constructs such as assignments, parameters and results, range statements, and deferred calls, and excludes nodes that aren’t reachable from the entry point. This changes CFG nodes, edges, locations, textual representations, and basic-block boundaries, so you may need to update queries that rely on the previous representation.
The update:
Removes BasicBlocks::Cfg .
Adds ControlFlow::EntryNode , ControlFlow::ExitNode , and SwitchStmt.getExpr .
Deprecates IfStmt.getCond in favor of IfStmt.getCondition .
Changes the return types of IfStmt.getThen and LoopStmt.getBody to Stmt .
Consolidates several IR instruction classes. 
For full details, see the CodeQL 2.27.2 changelog . GitHub automatically deploys every new CodeQL version to users of GitHub code scanning on github.com. A future GitHub Enterprise Server (GHES) release will also include the new functionality in CodeQL 2.27.2. If you use an older version of GHES, you can manually upgrade your CodeQL version .
Table of Contents
Language and framework support 
macOS 27 compatibility 
Query changes 
CodeQL CLI 
Go library breaking change 
Menu. Currently selected: Language and framework support 
Language and framework support 
macOS 27 compatibility 
Query changes 
CodeQL CLI 
Go library breaking change 
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