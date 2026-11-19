Manage GitHub Copilot app access with a dedicated policy - GitHub Changelog 
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
Manage GitHub Copilot app access with a dedicated policy
The GitHub Copilot app now has its own policy, so you can control who has access to it at the enterprise and organization levels.
Until now, access to the Copilot app depended on your GitHub Copilot CLI policy being enabled. From several conversations with customers, we understand that many of you want to manage each client independently. Now the Copilot app and the Copilot CLI each have their own policy, giving you the flexibility and control to enable the right clients for your teams.
This new policy keeps your developers’ work within the guardrails you already rely on. When using this app, developers drive agent sessions in isolated workspaces and land changes through pull requests. This means the same reviews, checks, and audit history apply as they would to any other contribution. The Copilot app also joins Copilot CLI and VS Code as a supported client for enterprise-managed settings , so the guardrails you define once (e.g., which plugins developers can use) are consistently enforced in the Copilot app as well.
You’ll find this policy alongside your other Copilot policies. It’s set to Enabled everywhere by default, so your developers can start using the app right away with no action needed from you. You have three options:
Enabled everywhere gives your developers access to the app.
Disabled everywhere turns the app off across your enterprise.
Let organizations decide passes the choice to each organization’s admin.
If the Copilot app isn’t the right fit for your teams, set it to Disabled everywhere . Developers who open the Copilot app will see a notice that their admin hasn’t enabled it.
To review or change the policy:
From your enterprise or organization settings, open the AI Controls tab.
Go to the “Copilot Clients” section.
Select the Copilot app policy.
Choose Enabled everywhere , Disabled everywhere , or Let organizations decide .
To learn more about the Copilot app, including how to get started and manage policies, explore our Copilot app documentation .
To download the Copilot app, visit our landing page 
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