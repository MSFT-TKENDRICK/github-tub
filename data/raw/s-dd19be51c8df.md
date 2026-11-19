Deprecation of security-related organization API fields - GitHub Changelog 
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
Retired 
April 21, 2026 •
1 minute read 
Deprecation of security-related organization API fields
We have deprecated the following fields from the get an organization and update an organization REST API endpoints:
advanced_security_enabled_for_new_repositories 
dependabot_alerts_enabled_for_new_repositories 
dependabot_security_updates_enabled_for_new_repositories 
dependency_graph_enabled_for_new_repositories 
secret_scanning_enabled_for_new_repositories 
secret_scanning_push_protection_enabled_for_new_repositories 
secret_scanning_validity_checks_enabled 
GitHub Code Security configurations now replace this functionality, providing a more comprehensive and flexible way to manage security product enablement across your organization.
If you currently rely on these fields in API integrations or automation, you should:
Migrate to GitHub Code Security configurations. You can create and manage configurations via the Code Security Configurations REST API or through your organization’s Settings → Code Security page.
Update any scripts or integrations that read or write these fields, as they are no longer available.
Set a default configuration for new repositories to replicate the behavior these fields previously controlled.
For more information, see our documentation on managing code security configurations for your organization .
Join the discussion in GitHub Community .
application security 
supply chain security 
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
Dependabot version updates support Agent Package Manager 
supply chain security 
Nov.03 Improvement 
CodeQL 2.27.3 adds Python 3.15 features and JSON data extensions 
application security 
Nov.03 Improvement 
Dependabot now supports Python 3.15 
supply chain security 
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