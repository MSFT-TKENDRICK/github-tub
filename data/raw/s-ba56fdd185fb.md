Agent automation controls in GitHub Issues in public preview - GitHub Changelog 
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
July 23, 2026 •
2 minute read 
Agent automation controls in GitHub Issues in public preview
Table of Contents
What's new 
Supported platforms and actions 
Try it with GitHub Agentic Workflows 
Try it with Copilot cloud agent 
What you can build 
Menu. Currently selected: What's new 
What's new 
Supported platforms and actions 
Try it with GitHub Agentic Workflows 
Try it with Copilot cloud agent 
What you can build 
Agent automations increasingly label, type, assign, and close issues for you. GitHub Issues now shows the reason behind each change and lets you review them before they’re applied, so you decide how much to automate and when to stay in the loop.
What’s new 
We’ve released three new capabilities:
Approvals: Prompt your automation to suggest instead of applying, and the changes wait in a panel on the issue instead of taking effect. Accept or decline each one, or accept or decline all at once.
Confidence: Agents rate each supported action high, medium, or low confidence. High-confidence changes apply automatically. GitHub Issues holds medium and low ones as suggestions for you to review.
Rationale: Every supported action records the reason behind it, whether it applies automatically or waits for review. You get an audit trail of what changed and why, and can see the reasoning on each suggestion before making a decision.
Use has:suggestions in issue search to find issues with changes waiting for review. Repository admins can also configure the automation level to set the confidence threshold, controlling which changes apply automatically and which are held for review.
Reviewing changes is optional. If you tell your automation to apply directly, it will. If you tell it to suggest, you get a review step. A small team moving fast might let the agent run on its own, while a busy public repository can hold changes for review. Because GitHub Issues hold back low-confidence actions, you only spend time on the changes most likely to need a second look.
Approvals are a workflow convenience, not a security control. They don’t enforce a server-side boundary, and an agent with permission to change issues can directly apply changes rather than suggest them.
Supported platforms and actions 
Rationale, confidence, and approvals work with GitHub Agentic Workflows and Copilot cloud agent automations, and are also available through the REST and GraphQL APIs. At launch, they cover changes to labels, fields, type, close, and assignees.
Try it with GitHub Agentic Workflows 
If you already use GitHub Agentic Workflows, upgrade your workflows to add issue intent support. After upgrading, supported safe outputs include intent information automatically while remaining backward compatible. To require intents for a specific safe output, set issue-intents: true in your workflow frontmatter.
Set issue-intents: false to explicitly opt out. Issue intents are supported for the set-issue-type , set-issue-field , add-labels , close-issue , assign-to-agent , and assign-to-user safe outputs.
Try it with Copilot cloud agent 
No update is needed. Create an automation from the Automations pane in your repository’s Agents tab and use supported tools to see confidence and rationale in action.
What you can build 
Triage: Label, type, and prioritize incoming issues automatically. Each action carries its reasoning without adding a triage comment, and you can review the ones you want before they apply.
Metadata enrichment: Backfill missing labels, types, or field values on issues that were filed without them, with the reasoning attached and an optional review step.
Spam detection: Flag suspected spam with a reason and hold uncertain cases for you to review.
Rationale, confidence, and approvals are available now in public preview. Create an automation today using the supported tools to see suggestions and rationale in action, or join the discussion within GitHub Community .
Editor’s note (July 24, 2026): Updated the community link. 
Table of Contents
What's new 
Supported platforms and actions 
Try it with GitHub Agentic Workflows 
Try it with Copilot cloud agent 
What you can build 
Menu. Currently selected: What's new 
What's new 
Supported platforms and actions 
Try it with GitHub Agentic Workflows 
Try it with Copilot cloud agent 
What you can build 
collaboration tools 
copilot 
projects & issues 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Nov.05 Release 
New pull request overview page in public preview 
collaboration tools 
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