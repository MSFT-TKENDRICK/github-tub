Schedule and automate tasks with Copilot cloud agent - GitHub Changelog 
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
June 2, 2026 •
2 minute read 
Schedule and automate tasks with Copilot cloud agent
With the new automations feature, Copilot cloud agent can now run automatically, on a schedule or in response to repository events.
Automations let you hand off repetitive tasks to the agent without any manual input. For example:
Triage incoming issues : Automatically label new issues as bug , enhancement , or other based on their content.
Fix failing tests nightly : Each night, check for failing tests on the main branch, attempt a fix, and open a draft pull request.
Prepare weekly release notes : Draft release notes and open a pull request on a schedule.
Automations are supported in private and internal repositories, with support for public repositories coming soon.
Each automation is scoped to a single repository where the agent can read and write code, open pull requests, and update issues.
Getting started with automations 
Automations are available for existing Copilot Pro, Pro+, Max, Business, and Enterprise users. Copilot Business and Copilot Enterprise users need the Copilot cloud agent policy enabled by an administrator.
You can create automations on github.com or in the GitHub Copilot app :
On github.com : Navigate to the Agents tab in your repository, select Automations , and click Create new .
In the GitHub Copilot app : Select Automations in the sidebar, click New automation , and enable the Run as cloud automation option.
Wherever you choose to create your automation, you can configure:
A name for your automation.
A prompt describing what the agent should do.
A trigger : run on an interval (hourly, daily, or weekly), when a new issue is created or when a pull request is created or updated.
The tools available to the agent, such as “create pull request” or “update issue labels”, so you have full control over what your automation can do.
The model the agent uses. Token usage is billed to the user who created the automation at standard usage-based rates.
To learn more, see our docs about Copilot automations .
Join the discussion within GitHub Community .
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