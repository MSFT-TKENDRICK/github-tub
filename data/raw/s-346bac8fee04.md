EMU deletions fix - GitHub Changelog 
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
October 23, 2026 •
1 minute read 
EMU deletions fix
Table of Contents
Who was affected 
How to tell if you were affected 
What caused the issue 
What we’re doing to fix it 
Menu. Currently selected: Who was affected 
Who was affected 
How to tell if you were affected 
What caused the issue 
What we’re doing to fix it 
Between June 1 and June 13, 2026, some Enterprise Managed User accounts that were deprovisioned through SCIM were incorrectly deleted instead of being suspended and obfuscated as expected.
As a result, affected users appeared as ghost users in issues, pull requests, and audit logs, rather than retaining their expected suspended and obfuscated user records within the enterprise.
Who was affected 
This affected approximately 12,285 Enterprise Managed User accounts across multiple enterprises.
Most affected accounts had already been suspended and hard-deprovisioned, which means they couldn’t be reprovisioned by design. A smaller group of 76 accounts were active at the time of deletion.
How to tell if you were affected 
You were affected if your enterprise audit logs contain a user.delete event for an Enterprise Managed User account during the June 1 to June 13, 2026 window. If you do not see any such events in that window, your enterprise was not impacted.
If you do see these events, no action is required from you. GitHub is restoring the affected accounts.
What caused the issue 
On June 1, 2026, GitHub enabled a change that routed deprovisioning requests through a new path. That path didn’t correctly check whether the account was an Enterprise Managed User account, which caused the affected accounts to be deleted instead of following the expected suspend-and-obfuscate flow.
GitHub contained the issue by disabling the affected path on June 13, 2026.
What we’re doing to fix it 
We’ve made code changes to prevent this from happening again. We’ve also restored affected user records in October 2026.
The restoration process returned affected accounts to their expected suspended and obfuscated state, preserving traceability and audit history within the enterprise. Enterprise owners don’t need to take any action.
Hard-deprovisioned Enterprise Managed User accounts can’t be reprovisioned by design, so this issue doesn’t affect the reprovisioning workflow.
Table of Contents
Who was affected 
How to tell if you were affected 
What caused the issue 
What we’re doing to fix it 
Menu. Currently selected: Who was affected 
Who was affected 
How to tell if you were affected 
What caused the issue 
What we’re doing to fix it 
account management 
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
Oct.23 Improvement 
Usage metrics API adds usage from tools like OpenCode 
account management 
copilot 
enterprise management tools 
... 
+2 
Oct.22 Improvement 
Custom skills, agents, and MCP servers in usage metrics API 
account management 
copilot 
enterprise management tools 
... 
+2 
Oct.22 Improvement 
Industry comparisons in the Copilot impact dashboard 
account management 
copilot 
enterprise management tools 
... 
+2 
Oct.19 Improvement 
Some Git over HTTPS may temporarily require authentication 
account management 
Oct.15 Improvement 
Download GitHub Code Quality license usage as a CSV 
account management 
application security 
... 
+1 
Oct.13 Improvement 
Search and filter for budgets now available 
account management 
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