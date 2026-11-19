Enterprise teams model policy targeting in public preview - GitHub Changelog 
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
July 31, 2026 •
2 minute read 
Enterprise teams model policy targeting in public preview
Table of Contents
How it works 
Migrating to enterprise teams mode 
Behavior for users in multiple enterprises 
Menu. Currently selected: How it works 
How it works 
Migrating to enterprise teams mode 
Behavior for users in multiple enterprises 
You can now take advantage of user-based model policy targeting for GitHub Enterprise customers with Copilot Business or Copilot Enterprise licenses. This feature empowers AI administrators to set a baseline of models for the entire enterprise and then grant additional models to specific enterprise teams. This enables admins to tailor access by job role or early experimentation by frontier teams, without deferring entirely to organization-level decisions.
This public preview is the first step in a broader shift toward team-level governance. Historically, model access has been managed at the organization (i.e., resource) level, but enterprise teams give you finer grained, user-based control that better maps to how people actually work: by role, training level, or function. Over time, we’ll continue adding controls to the team level, giving admins better granularity and precision than org-level settings can offer.
We are rolling this feature out gradually, with most enterprise customers gaining access to the preview opt-in on August 3rd.
How it works 
At the enterprise level, you can now set models to:
Enabled : Available to all members of the enterprise.
Disabled : Not available to any member of the enterprise.
Optional : Available to assign to enterprise teams.
Enterprise teams model access evaluates with a least-restrictive strategy. If a user gets a model from any one enterprise team, that user has access to the model everywhere. In order to opt into this preview, turn on the Enterprise teams mode toggle found in the Copilot page under “Models”.
When enabled, model access is managed at the enterprise level and through enterprise teams, and organization-level model settings no longer apply. During the preview, you may roll back to reset your policy to its previous configuration. To learn more, see our docs about managing model availability for your enterprise. 
Migrating to enterprise teams mode 
As part of the preview, you can start creating enterprise teams and assigning Optional models to those teams before enabling enterprise teams mode. This allows you to prepare model-to-user assignments similar to those you may have used with organization delegation. Review your enterprise model policy and create enterprise teams to grant additional model access before opting into the preview.
Behavior for users in multiple enterprises 
If your enterprise does not use Enterprise Managed Users, you may have enterprise members who have been granted a Copilot license from additional enterprises. In enterprise teams mode, only the model policies from your enterprise apply to users if they are using a Copilot license assigned from your enterprise. Restrictions from any other enterprise will not apply.
Join the discussion within GitHub Community .
Table of Contents
How it works 
Migrating to enterprise teams mode 
Behavior for users in multiple enterprises 
Menu. Currently selected: How it works 
How it works 
Migrating to enterprise teams mode 
Behavior for users in multiple enterprises 
copilot 
enterprise management tools 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Nov.04 Release 
GitHub Copilot is now available in Xcode’s coding assistant 
copilot 
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
Nov.03 Release 
GitHub Copilot is now available in JetBrains Air 
copilot 
Oct.28 Release 
Route and orchestrate models with GitHub Copilot Fusion 
copilot 
enterprise management tools 
universe26 
... 
+2 
Oct.28 Release 
GitHub Copilot app, Universe releases 
copilot 
universe26 
... 
+1 
Oct.28 Release 
GitHub Enterprise now includes access to GitHub Copilot 
copilot 
universe26 
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
GitHub intelligence puts your code, context, and history to work 
copilot 
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