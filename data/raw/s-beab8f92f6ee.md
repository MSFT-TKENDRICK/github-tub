Enterprise managed settings in the GitHub Copilot app and Copilot cloud agent - GitHub Changelog 
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
July 27, 2026 •
2 minute read 
Enterprise managed settings in the GitHub Copilot app and Copilot cloud agent
Table of Contents
Bring every client under the same guardrails 
Getting started 
Menu. Currently selected: Bring every client under the same guardrails 
Bring every client under the same guardrails 
Getting started 
You can now govern the GitHub Copilot app and Copilot cloud agent with enterprise managed settings, the same centrally managed policies you use to control Copilot across your enterprise. With a managed-settings.json file, enterprise owners define one set of guardrails, such as which plugins and marketplaces developers can use and whether they can bypass approval prompts. Copilot clients automatically enforce these settings for everyone on your enterprise’s Copilot plan.
As your developers adopt Copilot across more surfaces, you’re accountable for applying the same governance everywhere they work. Any client that sits outside your policy is a gap, a place where someone could install a plugin you haven’t vetted or run a command you’d normally gate. Your governance is only as strong as its least-covered surface.
The Copilot app and cloud agent now join Copilot CLI and VS Code as supported clients for enterprise managed settings, so your guardrails follow your developers into the app and cloud agent tasks. You define your policy once, and it’s enforced consistently wherever your teams build. That’s the cross-client consistency and high-trust teams need to adopt Copilot with confidence.
Bring every client under the same guardrails 
The Copilot app reads the same managed-settings.json you already use for your other clients. You can govern things like:
Which plugins are available.
Which plugin marketplaces developers can install from.
Whether developers can bypass approval prompts before Copilot runs commands, accesses files, or fetches URLs.
Setting auto model selection as the default for new conversations.
The Copilot cloud agent reads the applicable managed settings, including those for plugins and marketplace controls. It only uses the plugins and marketplaces you’ve approved. Bypass-prompt controls only apply to the interactive clients (i.e., the app, Copilot CLI, and VS Code).
For each supported key, your managed value takes precedence over anything a developer sets locally. See the full list of options in the enterprise managed settings reference .
If you already deploy managed-settings.json for Copilot CLI and VS Code, there’s nothing new to set up. The Copilot app automatically picks up your existing configuration the next time a developer signs in or restarts the app, and the cloud agent observes changes on the next task assignment.
Getting started 
If you’re setting up enterprise managed settings for the first time, the default approach is server-managed deployment:
Create and configure a .github-private repository in your enterprise. For more information, see our guide .
In that repository, create or update copilot/managed-settings.json .
Add your enterprise policy keys and values in JSON, then commit and push to the default branch.
Supported clients apply updated settings within about an hour, immediately after a developer restarts the client, or when a developer signs back in. You can also deploy through MDM or a distributed file.
To learn more, see configuring enterprise managed settings .
Join the discussion within GitHub Community .
Table of Contents
Bring every client under the same guardrails 
Getting started 
Menu. Currently selected: Bring every client under the same guardrails 
Bring every client under the same guardrails 
Getting started 
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