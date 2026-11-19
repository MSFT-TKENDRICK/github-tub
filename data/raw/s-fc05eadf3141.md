Copilot Automations now learn from outcomes and self-improve - GitHub Changelog 
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
October 28, 2026 •
1 minute read 
Copilot Automations now learn from outcomes and self-improve
Copilot Automations can now learn from their outcomes and propose improvements to themselves, helping them produce better results over time.
It’s easy to create an automation, but harder to build one you can trust to consistently produce high-quality results. Reviewing its output and improving its prompt by hand takes time. Self-improvement uses feedback from real outcomes on GitHub to make that process easier.
How it works 
Your automations leave a trail of signals on GitHub that show how well they’re working. For example:
An issue triage automation can learn from whether people change the labels it applied.
A code review automation can learn from whether developers accept its comments.
A performance optimization automation can learn from whether maintainers merge the pull requests it opens.
Self-improving automations use these signals to propose improvements to their prompts. You stay in control: each proposed change comes to you for review before it’s applied.
How Copilot creates a self-improvement loop 
When you ask Copilot to set up a self-improving automation, it can create a group of automations that work together. For example, for a custom code reviewer, Copilot might create:
A review automation that runs when a pull request is opened, reviews the changes, and posts comments.
A weekly improvement automation that analyzes how developers responded to those comments and proposes refinements to the review automation.
When the improvement automation proposes a change to the original automation’s prompt, tools, or triggers, GitHub notifies you. You can review and accept or reject the proposed change before it is applied.
To learn more, see about Copilot Automations .
Copilot Automations is available with Copilot Pro, Pro+, Max, Business, and Enterprise plans.
Join the discussion within GitHub Community .
copilot 
universe26 
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