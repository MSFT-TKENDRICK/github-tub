GitHub Copilot CLI: Plan before you build, steer as you go - GitHub Changelog 
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
January 21, 2026 •
3 minute read 
GitHub Copilot CLI: Plan before you build, steer as you go
Table of Contents
Plan mode 
Advanced reasoning models 
Steer the conversation 
Background delegation 
Automatic context management 
Enhanced permissions experience 
Code review 
Repository memory 
Shell mode improvements 
Developer quality-of-life 
New ways to access Copilot CLI 
Share your feedback 
Menu. Currently selected: Plan mode 
Plan mode 
Advanced reasoning models 
Steer the conversation 
Background delegation 
Automatic context management 
Enhanced permissions experience 
Code review 
Repository memory 
Shell mode improvements 
Developer quality-of-life 
New ways to access Copilot CLI 
Share your feedback 
GitHub Copilot CLI continues to push the boundaries of agentic AI assistance in your terminal. This week brings powerful new reasoning models, intelligent workflow features that let you steer conversations in real-time, and tighter integration with the GitHub CLI. Here’s what’s new.
Plan mode 
One of your most requested features is here: plan mode gives you a collaborative planning experience before Copilot starts implementing.
Press Shift + Tab to cycle in and out of plan mode. In plan mode, Copilot analyzes your request, asks clarifying questions to understand scope and requirements, and builds a structured implementation plan before writing any code.
The experience is conversational. Copilot uses the new ask_user tool to prompt you with follow-up questions, confirm assumptions about feature scope, and get your input on design decisions. Once you’re aligned on the approach, you can review the plan in a dedicated panel and tell Copilot to start implementing.
This helps you:
Catch misunderstandings early before code is written.
Make informed decisions about implementation approach.
Stay in control of complex multistep tasks.
Advanced reasoning models 
GPT-5.2-Codex: The latest Codex model optimized for code generation and understanding is now available. Select it with /model or --model gpt-5.2-codex .
Configurable reasoning effort: For GPT models that support extended thinking, you can now configure how much reasoning effort the model applies to your prompts. This lets you balance response speed with reasoning depth depending on your task.
Toggle reasoning visibility: Press Ctrl + T to show or hide the model’s reasoning steps during generation. This setting persists across sessions, so you can always see how Copilot approaches complex problems.
Steer the conversation 
Enqueue additional messages: You can now interact with Copilot while it’s thinking. Send follow-up messages to steer the conversation in a different direction, or queue additional instructions for Copilot to process after it finishes its current response. This makes conversations feel more natural and keeps you in control. 
Inline feedback on rejection: When you reject a tool permission request, you can give Copilot inline feedback about the rejection so it can adapt its approach without stopping entirely. This makes the conversation flow more naturally when you want to guide Copilot away from certain actions.
Background delegation 
Prefix any prompt with & to delegate it to the GitHub Copilot coding agent in the cloud (equivalent to the /delegate command). This frees up your terminal for other work while Copilot handles longer tasks asynchronously.
Automatic context management 
Auto-compaction: When your conversation approaches 95% of the token limit, Copilot now automatically compresses your history in the background without interrupting your workflow. This enables virtually infinite sessions. 
Manual control: Use /compact to manually compress context anytime. Press Escape to cancel if you change your mind.
Visualize usage: The /context command shows detailed token usage breakdown so you can understand how your context window is being used.
Enhanced permissions experience 
Approve parallel requests: Selecting approve for session now auto-approves any pending parallel permission requests of the same type, reducing interruptions during complex multistep operations.
Convenience flags: New --allow-all and --yolo flags enable all permissions at once for when you trust Copilot to run freely. 
Code review 
The new /review command analyzes code changes directly in the CLI. Get feedback on your staged or unstaged changes without leaving the terminal—perfect for a quick sanity check before committing.
Repository memory 
Copilot can now remember important facts about your codebase across sessions. As you work, Copilot stores conventions, patterns, and preferences it learns, making future sessions more productive. The memory storage tool captures context like coding standards, project structure insights, and your preferred approaches. For more information on Copilot’s agentic memory capabilities, check out our engineering blog post on Copilot memory .
Shell mode improvements 
History filtering: Shell mode history navigation ( ! prefix) now filters by prefix. Typing !git and pressing the up arrow cycles only through previous git commands, making it faster to find and rerun specific commands.
Cleaner environment: Copilot excludes shell commands from your Bash and PowerShell history files, keeping your shell history clean.
Developer quality-of-life 
/resume command: Switch between local and remote GitHub Copilot coding agent sessions easily.
/cd alias: Shorthand for /cwd to change the working directory.
Improved session events: More concise and visually clean session messages.
Tab title: Current intent now displays in your terminal tab title.
Custom instructions: All custom instruction files now combine instead of using priority-based fallbacks.
Redesigned header: Fresh CLI header with branded mascot and streamlined welcome message.
New ways to access Copilot CLI 
GitHub CLI users can more easily get started using GitHub Copilot CLI by running gh copilot . Running the command for the first time prompts you to install Copilot CLI, and from then on you can use gh copilot as a convenient entry point. This works seamlessly in GitHub Actions too—installation happens automatically without confirmation prompts.
Share your feedback 
Update with your package manager ( brew upgrade copilot-cli , winget upgrade GitHub.Copilot ), run npm install -g @github/copilot@latest , or let auto-update handle it.
Join the discussion in Copilot CLI’s public repository .
Table of Contents
Plan mode 
Advanced reasoning models 
Steer the conversation 
Background delegation 
Automatic context management 
Enhanced permissions experience 
Code review 
Repository memory 
Shell mode improvements 
Developer quality-of-life 
New ways to access Copilot CLI 
Share your feedback 
Menu. Currently selected: Plan mode 
Plan mode 
Advanced reasoning models 
Steer the conversation 
Background delegation 
Automatic context management 
Enhanced permissions experience 
Code review 
Repository memory 
Shell mode improvements 
Developer quality-of-life 
New ways to access Copilot CLI 
Share your feedback 
client apps 
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