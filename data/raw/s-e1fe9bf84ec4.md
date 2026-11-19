Bulk migrate branch protections to rulesets for a repository - GitHub Changelog 
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
1 minute read 
Bulk migrate branch protections to rulesets for a repository
Table of Contents
How it works 
Why migrate to rulesets? 
Availability 
Menu. Currently selected: How it works 
How it works 
Why migrate to rulesets? 
Availability 
You can now convert all branch protection rules of a repository to rulesets in a single action. This is an extension of the ability to convert a single branch protection rule to a ruleset that we released previously, now allowing for at-scale conversions.
How it works 
Navigate to Settings → Rulesets in your repository and click Import branch protection rules . In the Review import dialog, you can:
Preview the rulesets that will be created before you confirm the conversion.
See which branch protection rules are already covered by an existing ruleset.
Review cases where one branch protection rule produces multiple rulesets to preserve its original behavior.
Choose an enforcement status (e.g., Active , Evaluate , or Disabled ) and select which rulesets to create.
After you click Create rulesets , choose whether to keep or delete the original branch protection rules.
Why migrate to rulesets? 
Rulesets offer several advantages over classic branch protections:
Apply rules across multiple branches with pattern matching
Layer multiple rulesets for granular policy control
Manage rulesets at the organization or enterprise level
Configure fine-grained bypass permissions for users, teams, and apps
Availability 
This feature is available for all repositories where rulesets are available. Learn more about converting your branch protections to repository rulesets .
Join the discussion within GitHub Community .
Table of Contents
How it works 
Why migrate to rulesets? 
Availability 
Menu. Currently selected: How it works 
How it works 
Why migrate to rulesets? 
Availability 
platform governance 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Oct.13 Improvement 
GitHub App improvements for least privilege and management 
enterprise management tools 
platform governance 
... 
+1 
Oct.13 Improvement 
Audit GitHub Code Quality finding dismissals and reopenings 
application security 
platform governance 
... 
+1 
Oct.12 Release 
Push attribution for commits in limited public preview 
application security 
platform governance 
... 
+1 
Oct.07 Release 
Local sandboxing for GitHub Copilot now generally available 
application security 
copilot 
platform governance 
... 
+2 
Sep.29 Release 
Bring business context with external custom properties 
platform governance 
Sep.15 Release 
GitHub Copilot suggests custom properties definitions 
copilot 
platform governance 
... 
+1 
Sep.09 Improvement 
Block pull requests with exposed secrets from merging 
application security 
platform governance 
... 
+1 
Aug.25 Improvement 
Rule insights dashboard generally available 
platform governance 
Aug.25 Improvement 
Push rules in rulesets now support path exceptions 
platform governance 
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