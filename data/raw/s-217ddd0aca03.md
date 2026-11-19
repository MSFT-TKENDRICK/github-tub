Browser tools for GitHub Copilot in VS Code are generally available - GitHub Changelog 
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
July 1, 2026 •
2 minute read 
Browser tools for GitHub Copilot in VS Code are generally available
Table of Contents
What agents do in the browser 
You stay in control 
Enterprise controls 
Get started 
Menu. Currently selected: What agents do in the browser 
What agents do in the browser 
You stay in control 
Enterprise controls 
Get started 
Editor’s note (July 1, 2026): Added more detail about which permissions stay under your control and the existing network domain controls. 
Browser tools for GitHub Copilot in VS Code are now generally available. Agents can now drive a real browser, navigate live web apps, and feed what they find back into the chat. Browser tools are on by default with general availability, shaped by feedback from preview users.
What agents do in the browser 
Under the hood, agents get the same browser actions a developer would use. They can:
Open pages and navigate, click, type, hover, drag, and handle dialogs.
Read page content, capture console errors, and take screenshots.
Run scripted flows when a sequence of steps is more efficient than tool calls.
DevTools are also right in the browser toolbar so you can inspect elements, view console output, and debug pages yourself.
You stay in control 
Your tabs are private by default: The agent can’t read or interact with a page you opened until you select Share with Agent , and you can revoke that access at any time.
The agent’s tabs are isolated: Pages the agent opens itself run in fresh sessions with no access to the cookies or storage from your everyday browsing. Agents running in parallel in the Agents window each keep their browser tabs private from one another.
Sensitive permissions stay under your control: Capabilities like the camera, microphone, location, notifications, and clipboard reads are never granted automatically. Each one needs your explicit approval for a site, and agents can’t approve them on your behalf. Only low-risk actions, such as sanitized clipboard writes, are allowed by default.
Enterprise controls 
Admins can centrally manage browser tools:
A new dedicated on/off switch ( workbench.browser.enableChatTools )
Existing agent network domain controls ( chat.agent.allowedNetworkDomains and chat.agent.deniedNetworkDomains , enabled with chat.agent.networkFilter ) that restrict which sites agents and the integrated browser can reach. Denied domains take precedence, and both lists support wildcards (e.g., *.example.com ).
Workspace trust and approval prompts still apply
Get started 
Browser tools are available in both the editor window and the Agents window . Update VS Code and ask the agent to open or test a page.
For details, see the browser tools for agents docs and the browser agent testing guide , and share feedback in the microsoft/vscode repository.
Table of Contents
What agents do in the browser 
You stay in control 
Enterprise controls 
Get started 
Menu. Currently selected: What agents do in the browser 
What agents do in the browser 
You stay in control 
Enterprise controls 
Get started 
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