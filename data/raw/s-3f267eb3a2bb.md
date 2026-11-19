Inline agent mode in preview and more in GitHub Copilot for JetBrains IDEs - GitHub Changelog 
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
April 24, 2026 •
3 minute read 
Inline agent mode in preview and more in GitHub Copilot for JetBrains IDEs
Table of Contents
New features 
User experience 
Quality improvements 
Try it out 
Share your feedback 
Menu. Currently selected: New features 
New features 
User experience 
Quality improvements 
Try it out 
Share your feedback 
This update introduces inline agent mode in preview, enhancements to Next Edit Suggestions, global auto approve, and more flexible controls for terminal commands and file edits. It also includes several user experience refinements and quality improvements across GitHub Copilot for JetBrains IDEs.
New features 
Inline agent mode in public preview 
Inline agent mode is now available in public preview. This brings agent mode capabilities into the existing inline chat experience, making it possible to invoke more powerful, in-context assistance directly from the editor without switching over to the chat panel.
To access inline agent mode, first open Inline Chat. You can use the default shortcuts Shift+Ctrl+I (Windows) or Shift+Cmd+I (Mac). Alternatively, right-click in the editor and select Open Inline Chat , or click the gutter icon and choose Inline Chat . Then switch to agent mode in the Inline Chat panel.
Note: If you are a Copilot Business or Copilot Enterprise subscriber, an administrator will have to enable the Editor preview features policy before you can use this feature.
Next Edit Suggestions enhancements 
Next Edit Suggestions now includes inline edit previews and support for far-away edits.
Inline edit previews: Next Edit Suggestions can now appear as inlay previews, so you can review proposed changes directly in the editor before accepting them.
Far-away edits: We enhanced the far-away edit experience with a quick direction indicator in the gutter, so when the next suggested edit is several screens away, you can jump directly to it.
To use Next Edit Suggestions, go to Settings > GitHub Copilot > Completions and select Enable Next Edit Suggestions (NES) in your JetBrains IDE.
Note: If you are a Copilot Business or Copilot Enterprise subscriber, an administrator will have to enable the Editor preview features policy before you can use this feature.
Global auto-approve and granular controls for terminal commands and file edits 
Global auto approve is now available. When enabled, it automatically approves all tool calls across all workspaces and overrides per category auto approve settings, including for potentially destructive actions such as file edits, terminal commands, and external tool calls. Only enable this if you understand and accept the security risks. To configure it, go to Settings > GitHub Copilot > Chat > Auto Approve > Global Auto Approve in your JetBrains IDE.
We also added two granular controls in auto approve settings: Auto-approve commands not covered by rules and Auto-approve file edits not covered by rules . These let you set default auto approve behavior for unmatched terminal commands and file edits without creating every rule manually. To enable them, go to Settings > GitHub Copilot > Chat > Auto Approve in your JetBrains IDE.
User experience 
We have improved the overall user experience across JetBrains IDEs, making chat workflows more responsive and stable, including:
Chat context now resets automatically after sending messages.
Improved chat history rendering performance for large conversations.
The inline code review panel now supports automatic resizing.
Refined login experience with a smoother device code flow.
UX enhancements across sign-in, tooltips, and focus behavior.
Quality improvements 
Quality remains one of our key priorities, and this release includes additional reliability improvements:
Improved chat spinner behavior during responses.
Improved Esc key behavior for dismissing selections and IDE popups.
Improved state handling in the Configure Tools window.
Improved overall UI freeze handling and stability.
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
Try it out 
Share your feedback 
Menu. Currently selected: New features 
New features 
User experience 
Quality improvements 
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