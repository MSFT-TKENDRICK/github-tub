Route and orchestrate models with GitHub Copilot Fusion - GitHub Changelog 
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
October 28, 2026 •
2 minute read 
Route and orchestrate models with GitHub Copilot Fusion
Table of Contents
Smarter choices for developers 
More control for administrators 
Billing 
Get started 
Menu. Currently selected: Smarter choices for developers 
Smarter choices for developers 
More control for administrators 
Billing 
Get started 
GitHub Copilot Fusion is generally available. Instead of picking a model for each task, choose Copilot Fusion and let Copilot intelligently route and orchestrate which models it uses for you.
Copilot Fusion brings together Project HydraFusion’s multi-model orchestration and Copilot auto model selection’s fine-tuned model selection, leveraging the benefits of both to balance performance and cost efficiency.
Since Project HydraFusion launched, we’ve improved its performance. In the Artificial Analysis Coding Agent Index, Copilot Fusion Max scored 60, within two points of Claude Code with Opus 5.5 Max. It delivered that result at about half the average API cost per task, using about half as many tokens and taking about 40% less time per task.
Smarter choices for developers 
When you select Copilot Fusion in the model picker, you aren’t selecting a specific model. You’re choosing a system that routes and orchestrates models for each task. There’s no need to switch models during a task or decide which model suits each step. For each prompt, Copilot Fusion determines which models to use and how they work together, while you choose the right level of effort.
To use it, select Copilot Fusion in the model picker, then choose the effort level.
Fusion Standard: Prioritizes versatile models for everyday coding.
Fusion High: Prioritizes capable models for challenging tasks and deeper reasoning. 
Fusion Max: Prioritizes the most capable models for the most demanding tasks and complex reasoning.
Watch as Copilot Fusion analyzes each task and selects a model to complete it, orchestrating multiple models through the following workflows when needed.
Single: One model solves the task directly. 
Cascade: An efficient model drafts a response. A quality check determines whether to accept it or escalate to a stronger model. 
Critique: One model drafts an initial response, another model reviews it, and the original model revises.
More control for administrators 
Administrators control which models Copilot Fusion can use and whether Copilot Fusion is the default.
Copilot Fusion only uses the models that are enabled in your enterprise and organization model policies . Enterprise administrators can view what models Copilot Fusion picks from, independently set each model’s effective policy state, and disable models for Copilot Fusion without disabling the model for everyone. See Manage availability of default models .
Administrators can set Copilot Fusion, at any effort level, as the default model for Copilot users with Enterprise managed settings. To configure settings, see Enterprise managed settings .
“GitHub Copilot Fusion Standard has improved token efficiency across AT&T by automatically selecting the right model for the task, reducing unnecessary spend and preserving capacity for higher-value work. Previously, developers would often choose a more powerful model for a complex task and forget to switch back for everyday activities. Copilot Fusion eliminates that friction, optimizing model selection without requiring developers to manage it themselves. We’ve also seen its decision-making improve over time, giving developers greater confidence to focus on their work while Copilot handles model selection.”
Hari Pokhrel, Principal Software Engineer, AT&T 
Billing 
When you use Copilot Fusion you’re billed for each model it uses, at each model’s standard rate. For a limited time, users on paid Copilot plans will receive a 30% discount on model costs when using Copilot Fusion.
Get started 
Copilot Fusion is available on all Copilot plans in Visual Studio Code, the GitHub Copilot app, GitHub Copilot CLI, and JetBrains IDEs. Support for additional clients is coming soon.
Update your client to try it out. Open the model picker, select Copilot Fusion , and choose an effort level.
Note for research preview participants: if you previously enabled auto, HydraFusion, or HydraFusion Max, your selections will automatically transition to the corresponding Copilot Fusion effort levels.
To learn more, see our documentation on GitHub Copilot Fusion and share your feedback in the GitHub Community .
Table of Contents
Smarter choices for developers 
More control for administrators 
Billing 
Get started 
Menu. Currently selected: Smarter choices for developers 
Smarter choices for developers 
More control for administrators 
Billing 
Get started 
copilot 
enterprise management tools 
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
Look up a resource’s cost center with the GitHub REST API 
account management 
enterprise management tools 
... 
+1 
Nov.03 Release 
GitHub Copilot is now available in JetBrains Air 
copilot 
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