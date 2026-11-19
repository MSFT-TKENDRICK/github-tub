Copilot code review: New configurations and controls - GitHub Changelog 
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
June 12, 2026 •
2 minute read 
Copilot code review: New configurations and controls
Table of Contents
⚙️ Organization runner controls 
🛡️ Content exclusion support 
📝 Custom instructions character limits have been removed 
Menu. Currently selected: ⚙️ Organization runner controls 
⚙️ Organization runner controls 
🛡️ Content exclusion support 
📝 Custom instructions character limits have been removed 
With new organization runner controls, Copilot content exclusion support, and the removal of the character limit on repository custom instructions, Copilot code review is now easier to tailor to your needs within your repository and organization.
⚙️ Organization runner controls 
With the release of Copilot code review’s agentic architecture , we announced that Copilot code review is powered by GitHub Actions. By default, Copilot code review runs on the standard GitHub-hosted runner, but teams can configure self-hosted or large runners for more control over the runner type. To support ease of setup of custom runners, Copilot code review’s runner type can now be configured at the organization-level, meaning that one configuration can apply to all repositories within the organization.
Organization admins can now:
Set Copilot code review’s default runner to be automatically used across all repositories, without requiring each repository to be individually configured.
Lock the runner setting so the organization default overrides any individual repository configurations.
To set this up, navigate to your organization, then go to Copilot -> Runner type -> Runner type configuration . Your configuration will apply to both Copilot code review and Copilot cloud agent if both are enabled.
🛡️ Content exclusion support 
Copilot code review now respects repository, organization, and enterprise-level Copilot content exclusion settings, so you can prevent Copilot from utilizing specified files or directories during its review. Repository administrators can configure excluded paths in repository settings using path-based rules.
This gives you control over which repository content is available to Copilot code review, helping you align reviews with your team, organization, or enterprise’s boundaries, or prevent Copilot from utilizing context that isn’t relevant to the review.
For more information, check out our docs about configuring content exclusions for Copilot. 
📝 Custom instructions character limits have been removed 
Previously, Copilot code review would stop reading copilot-instructions.md and *.instructions.md files located under the .github directory once the file reached 4000 characters in size. That limit has now been removed, allowing additional customization and flexibility in your custom instructions.
Join the discussion within GitHub Community .
Table of Contents
⚙️ Organization runner controls 
🛡️ Content exclusion support 
📝 Custom instructions character limits have been removed 
Menu. Currently selected: ⚙️ Organization runner controls 
⚙️ Organization runner controls 
🛡️ Content exclusion support 
📝 Custom instructions character limits have been removed 
copilot 
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
Oct.28 Improvement 
Build shared workflows for your team with Copilot Automations 
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