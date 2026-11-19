Automate SSO authorization for classic PATs and SSH keys - GitHub Changelog 
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
Release 
September 16, 2026 •
1 minute read 
Automate SSO authorization for classic PATs and SSH keys
Enterprise admins can now automate SSO authorization for existing classic personal access tokens (PATs) and SSH keys for organizations in GitHub Enterprise Cloud, replacing manual per-organization authorization by your developers.
If your enterprise has multiple SSO-protected organizations, manually authorizing credentials one organization at a time creates friction and overhead, leading to the use of long-lived tokens to avoid rotation.
With this release, enterprise admins can opt-in to a new enterprise setting to allow credential delegation through enterprise-installed GitHub Apps with the enterprise_credentials:write permission. These GitHub Apps can then call the new API to bulk-authorize a classic PAT or an SSH key for up to 50 organizations in a single request.
The API:
Identifies the credential by its non-secret token ID or SSH key fingerprint, so no credential secrets are passed to the GitHub App.
Confirms that each target organization belongs to the enterprise, the credential owner belongs to each organization, and the enterprise uses enterprise-level SSO. It does this before granting authorization.
Safely skips organizations where an active authorization already exists.
If your enterprise manages SSO authorization for service accounts or automation credentials across many organizations, you can have your GitHub App call this API whenever a token is rotated or a set of new organizations are added. You can do this instead of authorizing each organization by hand. This is available now for GitHub Enterprise Cloud accounts.
Learn more about REST API endpoints for enterprise credential authorizations and installing a GitHub App on your enterprise .
account management 
enterprise management tools 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Nov.03 Improvement 
BYOK and enterprise custom models in the Copilot usage API 
account management 
copilot 
enterprise management tools 
... 
+2 
Nov.03 Release 
Look up a resource’s cost center with the GitHub REST API 
account management 
enterprise management tools 
... 
+1 
Nov.02 Improvement 
GitHub Desktop adds short-lived authentication tokens 
account management 
application security 
client apps 
... 
+2 
Oct.28 Release 
Route and orchestrate models with GitHub Copilot Fusion 
copilot 
enterprise management tools 
universe26 
... 
+2 
Oct.23 Improvement 
Usage metrics API adds usage from tools like OpenCode 
account management 
copilot 
enterprise management tools 
... 
+2 
Oct.23 Improvement 
EMU deletions fix 
account management 
Oct.23 Improvement 
Enterprise installations for GitHub Apps generally available 
ecosystem & accessibility 
enterprise management tools 
... 
+1 
Oct.22 Improvement 
Custom skills, agents, and MCP servers in usage metrics API 
account management 
copilot 
enterprise management tools 
... 
+2 
Oct.22 Improvement 
Global default for Copilot features generally available 
copilot 
enterprise management tools 
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