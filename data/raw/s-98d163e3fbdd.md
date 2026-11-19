Copilot CLI: Improved UI, rubber duck, prompt scheduling, and voice input - GitHub Changelog 
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
Copilot CLI: Improved UI, rubber duck, prompt scheduling, and voice input
Table of Contents
A new terminal experience (experimental) 
Get a second opinion with rubber duck 
Schedule prompts with /every and /after 
Talk to Copilot 
Update and share feedback 
Menu. Currently selected: A new terminal experience (experimental) 
A new terminal experience (experimental) 
Get a second opinion with rubber duck 
Schedule prompts with /every and /after 
Talk to Copilot 
Update and share feedback 
GitHub Copilot CLI is getting a major refresh at Microsoft Build 2026. Rubber duck and voice input are generally available today, and both prompt scheduling and a new experimental terminal interface —including tabs for working with issues, pull requests, and gists—are available to try via /experimental .
Editor’s note (June 3, 2026): Updated prompt scheduling to indicate it is part of /experimental , not generally available. 
A new terminal experience (experimental) 
We’re previewing a redesigned terminal interface for Copilot CLI. You get a cleaner layout, theme-aware semantic colors, and responsive components that adapt to narrow terminals without truncating the things you need to read.
The biggest visible change is the introduction of tabs. When you use the CLI in a GitHub repository, you can press Tab to switch between the default Session view, tabs for the repository’s Issues and Pull requests , and a tab for your personal Gists . This lets you view issues, pull requests, and gists without leaving Copilot CLI.
The redesign also makes Copilot CLI more accessible:
Pick from new color modes (e.g., default , github , dim , high-contrast , and colorblind ) to match your terminal and your eyes.
Screen reader support is on by default when a screen reader is detected, with labeled icons and animations that automatically disable.
Dialogs, tables, lists, and headings render consistently across every screen in the CLI.
The new terminal experience is available in /experimental mode. Run /experimental on to opt in. The new experience is still evolving, and we’d love your feedback as we move toward general availability.
Get a second opinion with rubber duck 
Rubber duck is a built-in CLI agent that acts as a constructive critic. While working on a task, the main CLI agent for a session can pass its current plan, design, implementation, or tests over to the rubber duck agent for review. The rubber duck agent looks for blind spots, design flaws, and substantive issues, and reports back with concrete, actionable feedback. Copilot then takes that critique into account before continuing.
For some tasks, two heads are better than one, and the CLI decides when getting a second opinion may be beneficial.
You can also invoke rubber duck with /rubber-duck . Read more about rubber duck .
Schedule prompts with /every and /after 
The new /every and /after slash commands let you schedule a prompt or skill within the current CLI session.
Use /every to schedule a prompt to run repeatedly at the specified interval:
/every 30m run the frontend tests 
/every 1h how many tokens have I used during the past hour 
Use /after to schedule a prompt to run just once, after the specified interval:
/after 2h /example-skills:docx create a new file summarizing recent changes to this repo 
Run /every or /after with no arguments to open the schedule manager, where you can see active schedules and delete any you no longer want to run.
Talk to Copilot 
Copilot CLI now includes hands-free dictation. Hold the space bar on your keyboard and talk to input a prompt. Alternatively, press Ctrl + X followed by V to start recording, speak your prompt, then press any key to stop recording and insert the transcription.
Voice input runs locally, so all audio you record stays on your machine. The first time you enable voice input, the CLI guides you through downloading the runtime and picking a speech-to-text model.
Update and share feedback 
Update GitHub Copilot CLI by running copilot update in your terminal. We’d love to hear what you think—share feedback with the /feedback command in a CLI session or open an issue in our public repository .
Table of Contents
A new terminal experience (experimental) 
Get a second opinion with rubber duck 
Schedule prompts with /every and /after 
Talk to Copilot 
Update and share feedback 
Menu. Currently selected: A new terminal experience (experimental) 
A new terminal experience (experimental) 
Get a second opinion with rubber duck 
Schedule prompts with /every and /after 
Talk to Copilot 
Update and share feedback 
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