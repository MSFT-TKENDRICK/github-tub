Updates to GitHub secret scanning - GitHub Changelog 
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
October 20, 2026 •
2 minute read 
Updates to GitHub secret scanning
Table of Contents
Update to audit log events 
Recent improvements and bug fixes 
Learn more 
Menu. Currently selected: Update to audit log events 
Update to audit log events 
Recent improvements and bug fixes 
Learn more 
This update covers improvements and bug fixes for GitHub secret scanning.
Update to audit log events 
On November 12, 2026 , the business field in affected secret_scanning_alert.* and secret_scanning_push_protection.bypass audit log events will change from the enterprise display name to the enterprise slug .
To avoid disruption to any automated workflows, you should update integrations that filter by display name before rollout to accept both formats or use business_id instead. The business field remains a string. Event names and numeric business_id values are unchanged.
Recent improvements and bug fixes 
Custom pattern alerts: Existing open alerts stay open when a rescan finds that they still match an edited custom pattern, rather than being closed and reopened.
Base64-encoded GitHub tokens: In private and internal repositories on github.com with secret scanning enabled, the existing revocation action (public preview) now supports encoded personal access tokens (classic), fine-grained personal access tokens, OAuth access tokens, and GitHub App user access tokens. GitHub automatically decodes the value.
Dismissal-request webhooks: Payloads now include exemption_request.number , the repository-scoped request number also available in the REST API. Use the repository and request number together to correlate requests across integrations.
Accessibility: The Request pending status on an alert is now keyboard-focusable without activating an action. The revocation flow announces progress to screen readers and moves focus to its completion panel when that panel appears.
Bypass-request metadata: Fixed empty secret-type and location details in bypass-request API responses and webhook payloads for command-line pushes when another repository rule ran after secret scanning.
Delegated bypass: Fixed push failures caused by existing organization-role entries in reviewer lists, and 500 errors when setting valid reviewer configurations for organization-owned repositories through the REST API.
Custom pattern API: Requests rejected by the scanning service for invalid arguments now return 422 instead of 500 , so your integration can distinguish these input errors from server failures.
Learn more 
Learn more about enterprise audit log events and the secret scanning REST API . Share your feedback in GitHub Community .
Table of Contents
Update to audit log events 
Recent improvements and bug fixes 
Learn more 
Menu. Currently selected: Update to audit log events 
Update to audit log events 
Recent improvements and bug fixes 
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