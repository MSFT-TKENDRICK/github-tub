From idea to pull request: A practical guide to building with GitHub Copilot CLI - The GitHub Blog 
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
From idea to pull request: A practical guide to building with GitHub Copilot CLI
A hands-on guide to using GitHub Copilot CLI to move from intent to reviewable changes, and how that work flows naturally into your IDE and GitHub.
Ari LiVigni · @arilivigni 
February 27, 2026 
| 
Updated April 14, 2026 
| 
6 minutes 
Share: 
Most developers already do real work in the terminal.
We initialize projects there, run tests there, debug CI failures there, and make fast, mechanical changes there before anything is ready for review. GitHub Copilot CLI fits into that reality by helping you move from intent to reviewable diffs directly in your terminal—and then carry that work into your editor or pull request.
This blog walks through a practical workflow for using Copilot CLI to create and evolve an application, based on a new GitHub Skills exercise . The Skills exercise provides a guided, hands-on walkthrough; this post focuses on why each step works and when to use it in real projects.
🔍 Go deeper with the GitHub Skills exercise
If you want a fully guided version of this workflow, including hands-on practice, check out the GitHub Skills exercise Create applications with the Copilot CLI .
It walks through these patterns step by step in a preconfigured instance of GitHub Codespaces and is a good way to experiment safely before applying them to production code. The exercise covers the following:
Install the Copilot CLI and use the issue template to create an issue
Generate a Node.js CLI calculator app
Expand calculator functionality with additional operations
Write unit tests for calculator functions
Create, review, and merge your pull request
What Copilot CLI is (and is not)
Copilot CLI is a GitHub-aware coding agent in your terminal. You can describe what you want in natural language, use /plan to outline the work before touching code, and then review concrete commands or diffs before anything runs. Copilot may reason internally, but it only executes commands or applies changes after you explicitly approve them. 
In practice, Copilot CLI helps you:
Explore a problem based on your intent
Propose structured plans using /plan (or you can hit Shift + Tab to enter planning mode), or suggest concrete commands and diffs you can review
Generate or modify files
Explain failures where they occur
What it does not do:
Silently run commands or apply changes without your approval
Replace careful design work
Eliminate the need for review
You stay in control of what runs, what changes, and what ships.
Step 1: Start with intent, not scaffolding
Instead of starting by choosing a framework or copying a template, start by stating what you want to build.
From an empty directory, run:
copilot
> Create a small web service with a single JSON endpoint and basic tests 
If you want to generate a proposal in a single prompt instead of entering interactive mode, you can also run:
copilot -p "Create a small web service with a single JSON endpoint and basic tests" 
In the Skills exercise, this pattern is used repeatedly: describe intent first, then decide which suggested commands you actually want to run.
At this stage, Copilot CLI is exploring the problem space. It may:
Suggest a stack
Outline files
Propose setup commands
Nothing runs automatically. You inspect everything before deciding what to execute. This makes the CLI a good place to experiment before committing to a design.
Step 2: Scaffold only what you’re ready to own
Once you see a direction you’re comfortable with, ask Copilot CLI to help scaffold:
> Scaffold this as a minimal Node.js project with a test runner and README 
This is where Copilot CLI is most immediately useful. It can:
Create directories and config,
Wire basic project structure,
Generate boilerplate you would otherwise type or copy by hand.
Copilot CLI does not “own” the project structure. It suggests scaffolding based on common conventions, which you should treat as a starting point, not a prescription.
The important constraint is that you’re always responsible for the result. Treat the output like code from a teammate: review it, edit it, or discard it.
Step 3: Iterate at the point of failure
Run your tests directly inside Copilot CLI:
Run all my tests and make sure they pass 
When something fails, ask Copilot about that exact failure in the same session:
> Why are these tests failing? 
If you want a concrete proposal instead of an explanation, try:
> Fix this test failure and show the diff 
This pattern—run ( !command ), inspect, ask, review diff—keeps the agent grounded in real output instead of abstract prompts.
💡 Pro tip: In practice, explain is useful when you want understanding, while suggest is better when you want a concrete proposal you can review. Learn more about slash commands in Copilot CLI in our guide . 
Step 4: Make mechanical or repo-wide changes
Copilot CLI is also well suited to changes that are easy to describe but tedious to execute:
> Rename all instances of X to Y across the repository and update tests 
Because these changes are mechanical and scoped, they’re easy to review and easy to roll back. The CLI gives you a concrete diff instead of a wall of generated text.
Step 5: Move into your editor when you need to start shaping your code
Eventually, speed matters less than precision.
This is the natural handoff point to your editor or IDE, so it can:
Reason about edge cases
Refine APIs
Make design decisions
Copilot works there too, but the key point is why you switch environments. The CLI helps you quickly get to something real. The IDE is where you can shape your code into exactly what you want. 
A good rule of thumb: 
CLI: use /plan , generate a /diff , and move quickly with low ceremony
IDE: use /IDE when you need to refine logic and make decisions you’ll defend in review
GitHub: commit, open a pull request with the command /delegate , and collaborate asynchronously
Step 6: Ship on GitHub
Once the changes look good, commit and open a pull request which you can do through the Copilot CLI in natural language:
Add and commit all files with a applicable descriptive messages, push the changes. 
Create a pull request and add Copilot as a reviewer 
Now the work becomes durable:
Reviewable by teammates
Testable in CI
Ready for async iteration
This is where Copilot’s value compounds as part of a flow that ends with shipping versus just being a single surface. The Skills exercise intentionally ends here, because this is where Copilot’s value becomes durable: in commits, pull requests, and review (not just suggestions).
One workflow, three moments
A helpful mental model for Copilot looks like this:
CLI : prove value quickly with low ceremony
IDE : shape and refine your code
GitHub : review, collaborate, and ship
Copilot CLI is powerful precisely because it fits into this system instead of trying to replace it.
Building with Copilot? A note on the Copilot SDK
If you’re building a developer tool, internal system, or application where agentic execution itself is part of the product (not just something you run in a terminal), you may want to look at the GitHub Copilot SDK , now in technical preview.
The Copilot SDK gives you programmatic access to the same planning and execution engine that powers Copilot CLI, without requiring you to build or maintain your own orchestration layer. Instead of wiring planners, tools, and recovery logic yourself, you define agent behavior and let Copilot handle execution.
Use Copilot CLI when you want fast, interactive execution in your own workflow. Use the Copilot SDK when you want those same agentic capabilities embedded inside your application. The SDK exposes the execution engine behind Copilot CLI, but not GitHub-specific features like repository-scoped memory or delegated pull request workflows.
Explore Copilot SDK > 
Take this with you
Copilot CLI is most useful when you treat it like a tool for momentum, not a replacement for judgment.
Used well, it helps you move from intent to concrete changes faster: exploring ideas, scaffolding projects, diagnosing failures, and handling mechanical work directly in the terminal. When precision matters, you move into your editor. When the work is ready to share, it lands on GitHub as a pull request—reviewable, testable, and shippable.
That flow matters more than any single command.
If you take one thing away from this guide, it’s this: Copilot works best when it fits naturally into how developers already build software. Start in the CLI to get unstuck or move quickly, slow down in the IDE to make decisions you can stand behind, and rely on GitHub to make the work durable.
Get started with GitHub Copilot CLI or take the Skills course > 
Tags:
GitHub Copilot 
GitHub Copilot CLI 
GitHub Skills 
Written by 
Ari LiVigni 
@arilivigni 
Senior Service Delivery Engineer, GitHub
GitHub Copilot 
GitHub Copilot CLI 
GitHub Skills 
Table of Contents
🔍 Go deeper with the GitHub Skills exercise
What Copilot CLI is (and is not)
Step 1: Start with intent, not scaffolding
Step 2: Scaffold only what you’re ready to own
Step 3: Iterate at the point of failure
Step 4: Make mechanical or repo-wide changes
Step 5: Move into your editor when you need to start shaping your code
Step 6: Ship on GitHub
One workflow, three moments
Building with Copilot? A note on the Copilot SDK
Take this with you
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
How to continue a GitHub Copilot app session in VS Code 
Learn how to move an agent session from the GitHub Copilot app into VS Code without losing the conversation, code changes, or working context.
Kayla Cinnamon 
AI & ML 
GitHub’s model for secret detection: Finding more secrets with less noise 
GitHub’s context-aware secret classifier improves detection quality, raises weighted acceptance by 11.5%, and reduces median scan execution time by 86%.
Batu Ozturkler & Shengyu Fu 
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