Major agentic capabilities improvements in GitHub Copilot for JetBrains IDEs - GitHub Changelog 
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
March 11, 2026 •
3 minute read 
Major agentic capabilities improvements in GitHub Copilot for JetBrains IDEs
Table of Contents
New features 
User experience 
Quality improvements 
Deprecation 
Try it out 
Share your feedback 
Menu. Currently selected: New features 
New features 
User experience 
Quality improvements 
Deprecation 
Try it out 
Share your feedback 
This update brings several new features and improvements to GitHub Copilot in JetBrains IDEs. Core agentic capabilities, including custom agents, sub-agents, and plan agent, are now generally available, with agent hooks in preview and auto-approve support for MCP.
It also expands support for agent instruction files, makes auto model selection generally available, enhances the model and reasoning experience, and includes additional user experience and quality improvements.
New features 
Agentic capabilities 
Custom agents, sub-agents, and plan agent now generally available 
Custom agents, sub-agents, and plan agent are now generally available in GitHub Copilot for JetBrains IDEs. These capabilities make it easier to tailor Copilot to your workflows and collaborate with specialized agents directly within your IDE. Learn more about creating a custom agent in JetBrains IDEs .
Agent hooks support in public preview 
Agent hooks are available in public preview. Agent hooks let you run custom commands at key points during agent sessions, making it easier to automate workflows, enforce policies, and integrate with external tools while maintaining control over agent behavior.
You can define your hooks.json file with the name of your choice in the .github/hooks/ folder of your repository. Supported events include userPromptSubmitted , preToolUse , postToolUse , and errorOccurred hooks. Check out our documentation on agent hooks for more details.
If you are a Copilot Business or Copilot Enterprise subscriber, an administrator will have to enable the Editor preview features policy before you can use it.
Auto-approve support for MCP 
You can configure auto-approve for MCP at both the server and tool level, reducing manual approvals in chat and keeping your workflow uninterrupted during agent sessions. To configure this, go to Settings > GitHub Copilot > Chat > MCP Server and Tool Auto-approve Configuration in your JetBrains IDE.
Customization and instructions 
Agent instruction file support 
We have added support for AGENTS.md and CLAUDE.md instruction files, including the ability to generate an initial AGENTS.md file. This makes it easier to tailor Copilot’s behavior to your project’s conventions and workflows.
Copilot automatically discovers and loads agent instruction files that you’ve defined into context during agent workflows, from the current workspace or globally across all workspaces. This includes Copilot custom instruction files, file-based instructions, AGENTS.md , and CLAUDE.md .
Go to Settings > GitHub Copilot > Customizations to view and manage your instruction files, where you can also enable support for nested AGENTS.md and CLAUDE.md files. You can also create an initial AGENTS.md using the Generate Agent Instructions action in a new chat session.
/memory slash command 
You can use the /memory slash command to quickly open settings for agent instruction files, giving you faster access to manage your preferences.
Model selection and reasoning visibility 
Auto model selection now generally available 
GitHub Copilot auto model selection is now generally available in JetBrains IDEs for all Copilot plans. With auto, Copilot can choose a model on your behalf based on real-time model availability and performance without manual switching.
Thinking panel for extended-reasoning models 
A dedicated thinking panel is now available for extended-reasoning models, such as Codex, with configurable Anthropic thinking budgets. This gives you visibility into the model’s reasoning process.
Context window usage indicator 
A new context window usage indicator in the chat panel lets you see how much context is being used during a conversation.
User experience 
We have improved the sign-in experience to reduce friction and make Copilot more immediately accessible. The chat panel opens automatically after signing in for faster access to Copilot. And GitHub Enterprise users can benefit from a smoother login flow with device code prioritization.
Additional UX and workflow improvements include:
More responsive chat panel layout and cleaner context/file attachment handling.
Cleaner auto-approve UI for a more intuitive approval workflow.
Refined NES trigger timing and dismissal behavior.
Improved support for Windows ARM platforms.
Quality improvements 
We’ve made a set of quality improvements to enhance stability and reduce interruptions during day-to-day development:
Improved stability when reading terminal output.
Resolved issues where file updates were not applied correctly by the replace_string_in_file tool.
Addressed UI inconsistencies, including lingering action buttons, blank chat panels, and MCP code vision appearing when signed out.
Reduced visual glitches such as file icon flicker when changing the selected code range.
Deprecation 
Edit mode has been marked as deprecated in the chat mode dropdown.
Try it out 
We encourage you to try out the latest version of the GitHub Copilot plugin and share your feedback. Your input is invaluable in helping us refine and improve the product.
Share your feedback 
Your feedback drives improvements. We’d love to hear about your experience in the following channels:
In-product feedback: Use the feedback options within your IDE.
Feedback repository: Share your thoughts in the GitHub Copilot for JetBrains IDEs issues .
Table of Contents
New features 
User experience 
Quality improvements 
Deprecation 
Try it out 
Share your feedback 
Menu. Currently selected: New features 
New features 
User experience 
Quality improvements 
Deprecation 
Try it out 
Share your feedback 
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