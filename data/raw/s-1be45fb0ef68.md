How to continue a GitHub Copilot app session in VS Code - The GitHub Blog 
Skip to content 
Skip to sidebar 
/ 
Blog 
Changelog 
Docs 
Customer stories 
Try GitHub Copilot app 
See what's new 
AI & ML 
AI & ML Learn about artificial intelligence and machine learning across the GitHub ecosystem and the wider industry.
Generative AI Learn how to build with generative AI.
GitHub Copilot Change how you work with GitHub Copilot.
LLMs Everything developers need to know about LLMs.
Machine learning Machine learning tips, tricks, and best practices.
How AI code generation works Explore the capabilities and benefits of AI code generation and how it can improve your developer experience.
Learn more 
Developer skills 
Developer skills Resources for developers to grow in their skills and careers.
Application development Insights and best practices for building apps.
Career growth Tips & tricks to grow as a professional developer.
GitHub Improve how you use GitHub at work.
GitHub Education Learn how to move into your first professional role.
Programming languages & frameworks Stay current on what’s new (or new again).
Get started with GitHub documentation Learn how to start building, shipping, and maintaining software with GitHub.
Learn more 
Engineering 
Engineering Get an inside look at how we’re building the home for all developers.
Architecture & optimization Discover how we deliver a performant and highly available experience across the GitHub platform.
Engineering principles Explore best practices for building software at scale with a majority remote team.
Infrastructure Get a glimpse at the technology underlying the world’s leading AI-powered developer platform.
Platform security Learn how we build security into everything we do across the developer lifecycle.
User experience Find out what goes into making GitHub the home for all developers.
How we use GitHub to be more productive, collaborative, and secure Our engineering and security teams do some incredible work. Let’s take a look at how we use GitHub to be more productive, build collaboratively, and shift security left.
Learn more 
Enterprise software 
Enterprise software Explore how to write, build, and deploy enterprise software at scale.
Automation Automating your way to faster and more secure ships.
CI/CD Guides on continuous integration and delivery.
Collaboration Tips, tools, and tricks to improve developer collaboration.
DevOps DevOps resources for enterprise engineering teams.
DevSecOps How to integrate security into the SDLC.
Governance & compliance Ensuring your builds stay clean.
GitHub recognized as a Leader in the Gartner® Magic Quadrant™ for AI Code Assistants Learn why Gartner positioned GitHub as a Leader for the second year in a row.
Learn more 
News & insights 
News & insights Keep up with what’s new and notable from inside GitHub.
Company news An inside look at news and product updates from GitHub.
Product The latest on GitHub’s platform, products, and tools.
Octoverse Insights into the state of open source on GitHub.
Policy The latest policy and regulatory changes in software.
Research Data-driven insights around the developer ecosystem.
The library Older news and updates from GitHub.
Unlocking the power of unstructured data with RAG Learn how to use retrieval-augmented generation (RAG) to capture more insights.
Learn more 
Open Source 
Open Source Everything open source on GitHub.
Git The latest Git updates.
Maintainers Spotlighting open source maintainers.
Social impact How open source is driving positive change.
Gaming Explore open source games on GitHub.
An introduction to innersource Organizations worldwide are incorporating open source methodologies into the way they build and ship their own software.
Learn more 
Security 
Security Stay up to date on everything security.
Application security Application security, explained.
Supply chain security Demystifying supply chain security.
Vulnerability research Updates from the GitHub Security Lab.
Web application security Helpful tips on securing web applications.
The enterprise guide to AI-powered DevSecOps Learn about core challenges in DevSecOps, and how you can start addressing them with AI and automation.
Learn more 
Search 
Categories
AI & ML 
Back AI & ML Learn about artificial intelligence and machine learning across the GitHub ecosystem and the wider industry.
Generative AI Learn how to build with generative AI.
GitHub Copilot Change how you work with GitHub Copilot.
LLMs Everything developers need to know about LLMs.
Machine learning Machine learning tips, tricks, and best practices.
How AI code generation works Explore the capabilities and benefits of AI code generation and how it can improve your developer experience.
Learn more 
Developer skills 
Back Developer skills Resources for developers to grow in their skills and careers.
Application development Insights and best practices for building apps.
Career growth Tips & tricks to grow as a professional developer.
GitHub Improve how you use GitHub at work.
GitHub Education Learn how to move into your first professional role.
Programming languages & frameworks Stay current on what’s new (or new again).
Get started with GitHub documentation Learn how to start building, shipping, and maintaining software with GitHub.
Learn more 
Engineering 
Back Engineering Get an inside look at how we’re building the home for all developers.
Architecture & optimization Discover how we deliver a performant and highly available experience across the GitHub platform.
Engineering principles Explore best practices for building software at scale with a majority remote team.
Infrastructure Get a glimpse at the technology underlying the world’s leading AI-powered developer platform.
Platform security Learn how we build security into everything we do across the developer lifecycle.
User experience Find out what goes into making GitHub the home for all developers.
How we use GitHub to be more productive, collaborative, and secure Our engineering and security teams do some incredible work. Let’s take a look at how we use GitHub to be more productive, build collaboratively, and shift security left.
Learn more 
Enterprise software 
Back Enterprise software Explore how to write, build, and deploy enterprise software at scale.
Automation Automating your way to faster and more secure ships.
CI/CD Guides on continuous integration and delivery.
Collaboration Tips, tools, and tricks to improve developer collaboration.
DevOps DevOps resources for enterprise engineering teams.
DevSecOps How to integrate security into the SDLC.
Governance & compliance Ensuring your builds stay clean.
GitHub recognized as a Leader in the Gartner® Magic Quadrant™ for AI Code Assistants Learn why Gartner positioned GitHub as a Leader for the second year in a row.
Learn more 
News & insights 
Back News & insights Keep up with what’s new and notable from inside GitHub.
Company news An inside look at news and product updates from GitHub.
Product The latest on GitHub’s platform, products, and tools.
Octoverse Insights into the state of open source on GitHub.
Policy The latest policy and regulatory changes in software.
Research Data-driven insights around the developer ecosystem.
The library Older news and updates from GitHub.
Unlocking the power of unstructured data with RAG Learn how to use retrieval-augmented generation (RAG) to capture more insights.
Learn more 
Open Source 
Back Open Source Everything open source on GitHub.
Git The latest Git updates.
Maintainers Spotlighting open source maintainers.
Social impact How open source is driving positive change.
Gaming Explore open source games on GitHub.
An introduction to innersource Organizations worldwide are incorporating open source methodologies into the way they build and ship their own software.
Learn more 
Security 
Back Security Stay up to date on everything security.
Application security Application security, explained.
Supply chain security Demystifying supply chain security.
Vulnerability research Updates from the GitHub Security Lab.
Web application security Helpful tips on securing web applications.
The enterprise guide to AI-powered DevSecOps Learn about core challenges in DevSecOps, and how you can start addressing them with AI and automation.
Learn more 
Changelog 
Docs 
Customer stories 
See what's new 
Try GitHub Copilot app 
Home / AI & ML / GitHub Copilot 
How to continue a GitHub Copilot app session in VS Code
Learn how to move an agent session from the GitHub Copilot app into VS Code without losing the conversation, code changes, or working context.
Kayla Cinnamon · @cinnamon-msft 
October 19, 2026 
| 
6 minutes 
Share: 
The agent has finished the bulk of your change. Now you want to inspect one implementation detail, adjust a few lines by hand, and run the project locally before you ship it.
But the work is sitting in the GitHub Copilot app … and your editor is where you review diffs, debug code, and make final adjustments. Do you have to choose between staying in the session and starting over in Visual Studio Code?
You don’t. You can open the Copilot app session directly in VS Code and continue with its conversation, code changes, and working context intact. That means Copilot can handle the repetitive or time-consuming work, then hand control back to you for closer review, hands-on editing, and local testing.
In this tutorial, you’ll learn how to:
Open a Copilot app session in VS Code.
Review the agent’s changes line by line.
Continue the same conversation from your editor.
Modify and test the code locally.
Push your updates to the pull request associated with the session.
Prerequisites 
Before you begin, make sure you have: 
The GitHub Copilot app installed and signed in. 
Visual Studio Code installed and connected to the same GitHub account. 
A Copilot app session with code changes you want to review or continue. 
Permission to work in and push changes to the session’s repository. 
This tutorial assumes you are already comfortable navigating VS Code, running commands in its integrated terminal, and working with Git branches and pull requests.
1. Start with a session in the Copilot app
Open the session you want to continue. Before handing it off, take a moment to review the task and the work Copilot completed.
A session contains more than a collection of modified files. It also records the task, the plan, and the conversation that produced those changes. That context is important when you want to understand why Copilot chose a particular implementation or ask it to revise part of the work.
You do not need to summarize that history or copy it into a new chat before moving to VS Code.
2. Open the session in VS Code
From the session, select Open in VS Code . If the app presents more than one supported editor or VS Code installation, choose the one you want to use.
VS Code opens the project using the worktree associated with the session. It also displays the existing session in the Copilot sidebar.
That gives you three connected pieces of the original work:
The session context: The task, plan, and conversation remain available.
The diff: The files and lines changed by the agent are ready for review.
The worktree: VS Code opens the same isolated working tree the session used.
You are continuing the existing session, not reconstructing it in a new editor window.
3. Review the agent’s changes
Before editing, inspect the diff in VS Code. Open the Source Control view to see the changed files, then select a file to review its changes line by line.
Review the implementation as you would any other proposed change. In particular, check that:
The code solves the requested problem.
The implementation follows the repository’s conventions.
Error states and edge cases are handled appropriately.
Tests cover the behavior that changed.
No unrelated files or behaviors were modified.
The preserved conversation can help explain how Copilot arrived at the implementation. If something is unclear, continue prompting Copilot in the sidebar. For example:
Explain why you changed this function instead of adding a new helper. Identify any behavior this could affect. 
You can also ask Copilot to make another change. Because the session and worktree remain connected, you do not have to describe the task from the beginning.
4. Make a hands-on edit
Once you understand the proposed changes, edit any file directly in VS Code.
This is useful for adjustments that are faster or easier to make by hand, such as:
Refining a label or error message.
Renaming a variable for clarity.
Adjusting layout or styling.
Adding a missing test case.
Applying a repository-specific convention.
You are editing the session’s existing worktree, so your manual changes build directly on the agent’s work. You do not need to copy files between directories or manually re-create the branch.
5. Run and verify the project locally
Use the VS Code integrated terminal to run the project’s normal validation workflow. The exact commands depend on the repository, but some web app examples may include:
npm install 
npm test 
npm run lint 
npm run dev 
Treat agent-generated changes the same way you would treat code written by a person: run the relevant tests, inspect failures, and verify the behavior yourself.
If the development server prints a localhost URL, open it to test the change in a browser. When supported by your VS Code setup, you can open the URL in VS Code’s integrated browser and inspect the result without leaving the editor.
For a user-interface change, verify both the requested behavior and nearby states. For example, check the modified component at different viewport sizes and confirm that loading, empty, and error states still work.
6. Continue with Copilot or keep editing yourself
At any point, you can choose the interaction that best fits the next step:
Prompt Copilot when the change requires repository-wide analysis or repetitive edits.
Edit directly when you know the exact change you want.
Use both approaches iteratively as you test and refine the implementation.
For example, after making a manual UI adjustment, you might ask Copilot:
Add a test for the updated label and run the relevant test file. Do not modify unrelated components.
Because you are still in the original session, Copilot retains the context needed to interpret “the updated label.”
7. Commit and push the finished changes
When the implementation is ready, review the final diff one more time. Then commit and push the changes using the Source Control view or the integrated terminal:
git status 
git add 
git commit -m "Refine session changes" 
git push 
Use your repository’s normal branch, commit, review, and approval practices. Because VS Code opened the worktree and branch associated with the session, pushing the branch updates the pull request already tracking that work.
There is no need to copy the finished files into another checkout or reconnect the work to the pull request manually.
A continuous workflow from agent to editor
Opening a Copilot app session in VS Code gives you a clean division of labor without splitting the work itself. Copilot can take on a larger or repetitive implementation, while you can move into the editor for detailed review, targeted changes, local testing, and final polish.
The session, diff, and worktree move with you. Start by directing the work in the Copilot app, switch to VS Code whenever you want hands-on control, and push the finished result through the same pull request workflow.
Ready to try it? Download the GitHub Copilot app , start a session, and open it in VS Code when you are ready to continue coding.
Tags:
GitHub Copilot 
GitHub Copilot app 
GitHub Copilot app for Beginners 
Written by 
Kayla Cinnamon 
@cinnamon-msft 
Senior AI Developer Tools Advocate
GitHub Copilot 
GitHub Copilot app 
GitHub Copilot app for Beginners 
Table of Contents
Prerequisites 
1. Start with a session in the Copilot app
2. Open the session in VS Code
3. Review the agent’s changes
4. Make a hands-on edit
5. Run and verify the project locally
6. Continue with Copilot or keep editing yourself
7. Commit and push the finished changes
A continuous workflow from agent to editor
More on GitHub Copilot 
Arnis turns any place on Earth into a Minecraft world 
Louis Erbkamm built the first prototype in his free time. Now GitHub Copilot helps him maintain it alone.
Alex Perrault 
GitHub Universe 2026: Evolving every layer of the stack 
Today, we laid out our vision for GitHub as the most comprehensive, end-to-end software delivery system in the world.
Jay Parikh 
Related posts 
AI & ML 
How 3 Java Champions are using GitHub Copilot for increased productivity 
Three Java Champions share how they use GitHub Copilot to solve problems, accelerate development, and keep humans responsible for the results.
Julien Dubois 
AI & ML 
GitHub’s model for secret detection: Finding more secrets with less noise 
GitHub’s context-aware secret classifier improves detection quality, raises weighted acceptance by 11.5%, and reduces median scan execution time by 86%.
Batu Ozturkler & Shengyu Fu 
AI & ML 
GitHub Copilot app for Beginners: How to teach Copilot about your codebase 
Learn how to add custom instructions and skills to your repository, use custom agents, and connect MCP servers like Playwright.
Christopher Harrison 
Explore more from GitHub 
Docs 
Everything you need to master GitHub, all in one place.
Go to Docs 
GitHub 
Build what’s next on GitHub, the place for anyone from anywhere to build anything.
Start building 
Customer stories 
Meet the companies and engineering teams that build with GitHub.
Learn more 
GitHub Universe 2026 
Catch up on the key announcements shaping the future of software development.
See what's new 
We do newsletters, too
Discover tips, technical guides, and best practices in our biweekly newsletter just for devs.
Your email address 
* 
Your email address 
Subscribe 
Yes please, I’d like GitHub and affiliates to use my information for personalized communications, targeted advertising and campaign effectiveness. See the GitHub Privacy Statement for more details. 
Subscribe 
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