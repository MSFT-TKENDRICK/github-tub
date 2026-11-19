Enterprise team specialization for managed settings - GitHub Changelog 
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
August 3, 2026 •
2 minute read 
Enterprise team specialization for managed settings
Enterprise administrators can now customize managed settings by targeting enterprise teams with itemized configuration files. Large enterprises can scale governance without bottlenecking every configuration change through central administrators or one-size-fits-all policies. Teams gain the flexibility to adapt Copilot to their workflows while staying within the boundaries you’ve defined.
The AI ecosystem evolves frequently and maintaining effective guardrails is a shared responsibility. Set your AI standards source .github-private repository to internal visibility and let your users open pull requests to suggest changes that keep their specialized governance configuration up to date.
What you can do 
After you’ve configured your managed-settings.json file, you can make individual keys eligible for team-specific values.
Mark keys as overridable: In your copilot/managed-settings.json file, use the { "overridable": } syntax to specialize the key’s configuration on a per-team basis. An overridable key uses the team’s value when set or falls back to your enterprise default when the team leaves it unset. Keys you don’t mark overridable remain an enterprise-level decision that teams can’t modify. In practice, you can set "disableBypassPermissionsMode": "unmanaged" and "model": "unmanaged" in a team settings file, providing a specialization that takes precedence over managed-settings.json for members of that team.
For example, let your AI Pioneers team pick their own default model and bypass permissions, while every other team inherits your enterprise defaults.
Team-based plugin extensibility: Let plugins and marketplaces grow team-by-team, not shrink. enabledPlugins and extraKnownMarketplaces are additive (i.e, your enterprise baseline is guaranteed everywhere, and individual teams can layer on the extras they need for specific job roles without weakening the floor).
Map settings files to teams: Ship different policies to different teams from one place. Map each team settings file to one or more team slugs in team-mappings.json . Each entry pairs a settings file with the teams that use it, so you can apply one file across multiple teams.
For example, a single ai-users.json file can be applied to all teams that have completed training. Additional specializations can be applied for other job roles like devs.json .
Create the team settings file: Add the team’s configuration under copilot/teams/ . Only include the keys you marked as overridable. Anything else falls back to your enterprise platform decision.
Trust that enterprise decisions always win: Keys you don’t mark overridable set a ceiling, so compliance-critical settings stay locked down by default. Unmanaged or overridable keys set a floor. If a user belongs to multiple teams, the team-level settings are combined using the least restrictive value for each key, then applied beneath the enterprise file.
Supported clients 
Today the configuration defined in managed-settings.json is enforced in VS Code, Copilot CLI, the Copilot App, and Copilot cloud agent whenever a user has a Copilot Business or Copilot Enterprise license issued from the enterprise or one of its organizations. We are working to extend this support across all Copilot clients through the Copilot SDK.
To learn more, see configuring enterprise managed settings .
Join the discussion within GitHub Community .
client apps 
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