Improvements to secret scanning and public monitoring - GitHub Changelog 
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
July 15, 2026 •
2 minute read 
Improvements to secret scanning and public monitoring
Table of Contents
GitHub secret scanning partnership program 
Detectors added 
Push protection defaults expanded 
Distinguish secret categories in the webhook payload 
New insights on the public monitoring alert list 
Learn more 
Menu. Currently selected: GitHub secret scanning partnership program 
GitHub secret scanning partnership program 
Detectors added 
Push protection defaults expanded 
Distinguish secret categories in the webhook payload 
New insights on the public monitoring alert list 
Learn more 
This week, we’re rolling out several improvements to secret scanning and public monitoring:
Resend is now a GitHub secret scanning partner. 
Secret scanning now detects new secret types from APIclub and Resend.
Secret scanning now blocks VolcEngine secrets with push protection by default.
The secret_scanning_alert webhook now includes a secret_category field (i.e., default or generic ) so you can distinguish between specific and generic types.
The public monitoring alert list now surfaces insight cards at the top of the page, including a breakdown of associated leaks by attribution, your enterprise member count, and your verified domains.
GitHub secret scanning partnership program 
GitHub secret scanning protects users by searching repositories for known types of secrets such as tokens and private keys. By identifying and flagging these secrets, our scans help prevent data leaks and fraud.
We have partnered with Resend to scan for their tokens to help secure the development community. GitHub will forward any exposed secrets found in public repositories to Resend, who will take appropriate action, including revoking the secret or notifying respect admins.
Learn more about the secret scanning partnership program . If you are a secret issuer interested in partnering with us, you can get started by opening a ticket with GitHub support .
Detectors added 
Secret scanning now automatically detects the following new secret types in your repositories.
Provider 
Secret type 
APIclub 
apiclub_api_key 
Resend 
resend_api_key 
Partner secrets are automatically reported to the secret issuer when found in public repositories through the secret scanning partnership program . User secrets generate secret scanning alerts when found in public or private repositories.
Push protection defaults expanded 
The following detector is now included in push protection by default. Repositories with secret scanning enabled, including free public repositories, will automatically block commits containing this secret.
Provider 
Secret type 
VolcEngine 
volcengine_ark_api_key 
Distinguish secret categories in the webhook payload 
The secret_scanning_alert webhook payload now includes a secret_category field, so you can tell default and generic detections apart without maintaining your own mapping of secret types:
default : provider patterns plus your custom patterns.
generic : generic patterns and AI-detected secrets.
This mirrors the Default and Generic results views in secret scanning, making it easier to filter, route, and report on alerts in your own integrations and automation.
New insights on the public monitoring alert list 
The public monitoring alert list now shows insight cards at the top of the page, giving your security team at-a-glance context before digging into individual alerts:
Associated leaks by attribution : A breakdown of alert counts by how each leak was attributed to your enterprise: member activity (a commit authored by an enterprise member) and verified domain (a committer email on one of your verified domains). 
Enterprise members : The total number of members in your enterprise, matching the count of members in your enterprise People tab.
Verified domains : The verified domains associated with your enterprise, including both enterprise-owned and organization-owned domains.
Together, these cards help you gauge the scope of exposure and understand how leaks are reaching your enterprise, all without leaving the alert list.
Learn more 
Learn more about secret scanning , public monitoring , and the full list of supported secrets in our documentation. Let us know what you think in the community discussion .
Table of Contents
GitHub secret scanning partnership program 
Detectors added 
Push protection defaults expanded 
Distinguish secret categories in the webhook payload 
New insights on the public monitoring alert list 
Learn more 
Menu. Currently selected: GitHub secret scanning partnership program 
GitHub secret scanning partnership program 
Detectors added 
Push protection defaults expanded 
Distinguish secret categories in the webhook payload 
New insights on the public monitoring alert list 
Learn more 
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