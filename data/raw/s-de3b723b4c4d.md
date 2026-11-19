Clearer names for secret scanning detector types - GitHub Changelog 
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
July 10, 2026 •
1 minute read 
Clearer names for secret scanning detector types
To make secret scanning easier to understand, we’re updating the names we use for our detector types to better reflect how each one finds secrets. This is a naming change only; detection behavior is exactly the same.
Before 
Now 
Non-provider patterns 
Generic patterns 
Copilot secret scanning 
AI-detected secrets 
All existing product documentation links continue to work. We’ve added redirects and updated the terminology across our documentation. There are no changes to webhook events, audit log events, or the REST API.
There are two kinds of secrets we detect:
Provider secrets are issued by a specific service (e.g., an AWS key, a Stripe token).
Generic secrets aren’t tied to any provider (e.g., private keys, connection strings, passwords).
There are two ways we detect them:
Patterns use deterministic detection (i.e., regular expressions combined with additional checks like entropy analysis). Patterns reliably catch secrets with a recognizable structure and include both provider patterns for provider secrets, as well as generic patterns like private keys and connection strings.
AI-detected secrets use AI to catch generic secrets that don’t follow a predictable format (e.g., passwords). The model reads the surrounding code to find harder-to-detect unstructured secrets.
Learn more 
Learn more about secret scanning and see the full list of supported secrets in our documentation. Let us know what you think in the community discussion .
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