Visual Studio Code 1.126 
Skip to content 
Features
AI development 
Agents 
Models 
Customizations 
Continuity 
Editor 
Write code 
Enterprise 
Extensibility 
Release notes 
Blog 
Resources
Help 
Documentation 
Learn 
API 
FAQ 
Extensibility 
Extension Marketplace 
(opens in new tab) 
MCP registry 
(opens in new tab) 
Connect 
Events 
(opens in new tab) 
GitHub repository 
(opens in new tab) 
Download 
Search 
⌘ ⇧ P 
Download 
VS Code Insiders 
Other platforms 
Command line interface 
CLI for Apple silicon 
CLI for Intel 
Command line interface 
CLI for x64 
CLI for Arm64 
Command line interface 
CLI for x64 
CLI for Arm64 
CLI for Arm32 
By using VS Code, you agree to its
license 
and
privacy statement .
By using VS Code, you agree to
License 
&
Privacy .
GitHub Universe, on demand. Watch the VS Code session recordings. 
A year of VS Code, wrapped. Explore the highlights. 
Dismiss this update 
Updates
Insiders 
1.145 
1.144 
1.143 
1.142 
1.141 
1.140 
1.139 
1.138 
1.137 
1.136 
1.135 
1.134 
1.133 
1.132 
1.131 
View All Releases 
Updates 
Insiders 
1.145 
1.144 
1.143 
1.142 
1.141 
1.140 
1.139 
1.138 
1.137 
1.136 
1.135 
1.134 
1.133 
1.132 
1.131 
View All Releases 
Visual Studio Code 1.126
Follow us on LinkedIn , X , Bluesky 
Release date: June 24, 2026 
Downloads for 1.126.0
Windows x64 Arm64 
macOS Universal Intel Apple silicon 
Linux .deb .rpm .tar.gz Arm instructions Snap 
Welcome to the 1.126 release of Visual Studio Code. This release brings clearer cost transparency, simpler model tuning, and safer browsing of unfamiliar code.
Session-level cost : See the total cost of a chat session to spot expensive conversations.
Multiple chats per session : Run several chats side by side in one agent host Copilot session.
Workspace trust : Browse new folders safely in restricted mode.
Happy Coding!
VS Code is rolling out gradually to all users. Use Check for Updates in VS Code to get the latest version immediately.
To try new features as soon as possible, download the nightly Insiders build , which includes the latest updates as soon as they are available.
In this update
Cost management 
Language models 
Agents window 
Editor experience 
Engineering 
Website 
Deprecated features and settings 
Thank you 
Navigation End -->
Cost management
Session-level cost information
You can now see the cost for an entire chat session, not just for individual turns. This gives you better transparency into which sessions consume the most credits, making it easier to spot expensive conversations and manage your usage over time.
Language models
Unified model customization picker
To simplify language model configuration, we have combined the context size and reasoning (thinking) effort controls into a single model customization picker. From one place, you can adjust both settings when tuning a model, instead of working with two separate dropdowns.
Simplified model hover
We cleaned up the model hover to make it easier to scan. It now shows a concise one-word descriptor of the model's capabilities and includes deep link buttons that take you directly to the relevant configuration.
Agents window (Preview)
The Agents window is a dedicated companion window optimized for exploring, iterating on, and reviewing agent sessions across projects and machines.
Multiple chats in an agent host Copilot session
Applies to : Copilot sessions running on an agent host .
The Agents window lets you run and manage multiple agent sessions side by side. In this release, a Copilot session started from an agent host can hold several chats at once. Because the chats share the same session and working context, you can keep more than one conversation going in the same workspace at the same time.
Say your primary chat is busy implementing a feature. Instead of waiting or interrupting it, select New Chat ( + ) in the session toolbar to open a second chat in the same session, then use it to review the changes so far, draft tests, or write the documentation. Both run at once, and each chat keeps its own conversation. You can switch between tabs and pick up right where you left off.
Chats are persisted and restored across a window reload. Step away and come back to every conversation in the session, not just the first one.
You can rename a chat directly in its tab to keep track of what each one is for, just like renaming a session from the session header:
Double-click a tab, or select Rename from its context menu, to edit the title in place.
Press Enter to commit the rename, or Escape to cancel. Selecting another tab while editing also cancels the edit and switches to that tab.
A chat's title is independent of the session title, so renaming the session does not overwrite a chat you renamed.
Agentic code feedback with agent host harnesses
In the Agents window, comments you leave on generated code are now stored on the agent host, so the agent can interact with your feedback by using server-side tools such as listComments and resolveComments . This works even when you disconnect the client, since the comments live on the server rather than in your local session.
The agent can also create the comments for you by using the addComment tool. When you run a review skill such as /code-review , it reviews your code and adds comments inline, which you can then accept or delete before submitting them to an agent to address.
Pull request review comments work the same way. You can accept the PR review comments and submit them to the agent, or ask the agent to resolve all PR comments. When you ask the agent to resolve PR comments that you haven't accepted yet, it first requests your permission to view them, and once you grant access, it addresses the PR review items.
Editor experience
Open new folders in Restricted Mode
Setting : 
security.workspace.trust.startupPrompt
Open in VS Code 
Open in VS Code Insiders 
Workspace Trust lets you decide whether your project folders can automatically run code, which adds a layer of security when you work with unfamiliar code.
Previously, opening a new folder immediately interrupted you with a dialog asking whether to trust the folder before you could look at its contents. Now, new folders open in Restricted Mode and only show the trust banner. This lets you browse the code safely first and trust the folder when you're ready.
This changes the default value of the 
security.workspace.trust.startupPrompt
Open in VS Code 
Open in VS Code Insiders 
setting from once to never . To restore the previous behavior and be prompted the first time you open a folder, set the value back to once .
Removed trust parent from the Workspace Trust editor
The Workspace Trust editor previously showed a Trust Parent button next to the Trust button. Because it looked just like Trust but trusted the entire parent folder, it was easy to select by mistake and trust more folders than you intended.
To reduce that risk, the Trust Parent button is removed. You can still trust a parent folder by adding its path to the Trusted Folders & Workspaces list in the Workspace Trust editor.
Engineering
Agent Host Protocol (AHP)
As part of rearchitecting how agent sessions work in VS Code, we are adopting the Agent Host Protocol (AHP). AHP lets us connect and render the same agent session from multiple clients and VS Code windows at the same time.
This unlocks scenarios like seeing the same session in both a regular VS Code window and the Agents window. The work is ongoing, but you can already try it out in VS Code Insiders and we would welcome your feedback .
Website
VS Code blog
As the team has been writing more and more blog posts, in quick succession, we realized that our blogs section could use some love. Previously, when you open the blog section, you were directly taken to the last blog post, leaving previous posts often overlooked. We have now added a blog landing page that highlights the several recent posts.
And if you are looking for the full list of all blog posts, you can now find it in the blog archive .
VS Code documentation
We've restructured our documentation table of contents to make it more scannable and easier to navigate. All our agentic documentation is now grouped under a single "Agents" section, and anything related to editing code and configuring VS Code is grouped under "Editor".
Previously, the documentation for supported languages and specific extensions was individually listed in the table of contents. We have now moved them under "Languages and Runtimes" and "Extension Docs" respectively, so you can find all the information you need in one place.
Let us know what you think of the new structure by submitting feedback in the microsoft/vscode-docs repository.
Deprecated features and settings
Edit mode
We have deprecated the built-in Edit mode, and removed the chat.editMode.hidden setting. We recommend using Agent mode instead, which covers the same editing scenarios while also being able to run tasks and tools on your behalf. Alternatively, you can create a custom agent to mimic the Edit mode experience.
Users who have Agent mode disabled ( chat.agent.enabled ) by policy will still see the legacy Edit mode.
Thank you
Contributions to vscode :
@bikeshgyawali (Bikesh) : Add missing unit test coverage for prefixedUuid in uuid.ts PR #322146 
@Bryan2333 (BryanLiang) : fix issue 300307 PR #322104 
@carlbrochu (Carl Brochu) : Add SKU to enhance GH telemetry events PR #321046 
@cavalloJustinEmery (Justin Emery) : fix: plugin skill files not accessible when connected to remote PR #309465 
@guomaggie : select correct subagent model PR #321061 
@mjbvz (Matt Bierner) 
Update contribution names PR #321503 
Fully switch normal npm run compile to use tsgo too PR #321646 
Kill and restart esbuild instances during watch mode PR #321219 
@rfeltis (Ralph Feltis) : Add telemetry for chat quota notification banners PR #321793 
@romalpani (Rohan Malpani) : Update new chat in session tip text PR #321965 
@wszgrcy (chen) : fix: registerToolDefinition loss tags PR #319922 
Issue tracking
Contributions to our issue tracking:
@gjsjohnmurray (John Murray) 
@RedCMD (RedCMD) 
@IllusionMH (Andrii Dieiev) 
@albertosantini (Alberto Santini) 
We really appreciate people trying our new features as soon as they are ready, so check back here often and learn what's new.
If you'd like to read release notes for previous VS Code versions, go to Updates on code.visualstudio.com .
On this page there are 8 sections On this page 
Cost management 
Language models 
Agents window (Preview) 
Editor experience 
Engineering 
Website 
Deprecated features and settings 
Thank you 
Microsoft 
Community
GitHub 
Reddit 
X 
Bluesky 
LinkedIn 
Watch & listen
YouTube 
Podcast 
TikTok 
Instagram 
Legal
Privacy 
Terms of Use 
Help
Support 
License 
Community 
GitHub 
Reddit 
X 
Bluesky 
LinkedIn 
Watch & listen 
YouTube 
Podcast 
TikTok 
Instagram 
Legal 
Privacy 
Terms of Use 
Help 
Support 
License 
Consumer Health Privacy 
Manage Cookies 
By using VS Code, you agree to its license and privacy statement .
Your Privacy Choices