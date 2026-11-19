What are git worktrees, and why should I use them? - The GitHub Blog 
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
What are git worktrees, and why should I use them?
Git worktrees have been around since 2015, but it wasn’t until recently they became popular. Learn what they are, how to use them, and why you might.
Cassidy Williams · @cassidoo 
June 16, 2026 
| 
Updated July 13, 2026 
| 
5 minutes 
Share: 
It seems like the latest hotness in git these days is the concept of worktrees. Which… is kind of funny because they’ve been around since 2015.
But, nevertheless, they are cool, and you might be wondering why you’d use them, how they differ from branches, and why they are suddenly so popular.
Let’s talk about it!
Context switching with branches and stashing
Let’s say you lived in a worktree-less world, and were working on a ticket, and suddenly an urgent bug came to you and you had to switch contexts.
First, you might stash your work:
git stash "wip feature login" 
Then you’d switch to your main branch and update:
git checkout main 
git pull origin main 
Then make a bugfix branch:
git checkout -b hotfix-bug 
Then you’d fix everything, commit, and push the branch:
git add . 
git commit -m "fix broken submit button" 
git push origin hotfix-bug 
Then after merging a pull request, you might return back to your computer and pull main and remove the bug branch:
git checkout main 
git pull origin main 
git branch -d hotfix-bug 
And then you could go back to the feature you were working on:
git checkout feature-login 
git stash pop 
Phew. Where were we?
The mental overhead of switching around, reloading files, reinstalling node_modules based on whatever changed, and so on, is a lot. The context switching burden is heavy.
Now, this is a basic example, but sometimes developers would work around this kind of chaos with doing some more complicated git stash commands, or even multiple clones of the same repo (I’m guilty of that one).
Until… worktrees!
Context switching with worktrees
With worktrees, you never leave your branch and you never stash, and your editor context for your original feature stays untouched.
git worktree add ../hotfix-workspace -b hotfix-bug main 
This instantly creates a sibling folder called hotfix-workspace , and bases it on main, and checks out a new branch called hotfix-bug .
Now you can open that folder in a new editor window (or cd into it) and fix the bug. Your original editor window stays exactly as you left it.
cd ../hotfix-workspace 
# ...fix fix fix... 
git add . 
git commit -m "fix broken submit button" 
git push origin hotfix-bug 
You merge the pull request online just like before, and once it’s merged, you can simply delete the temporary folder.
cd ../main-project 
git worktree remove ../hotfix-workspace 
This is so much smoother! Worktrees can go beyond the git command line, too. For example, VS Code has full worktree support built in . You have options! And no matter where you work, worktrees give you zero risk of stash conflicts, there’s no editor disruption, and you can truly work in parallel.
So… why now?
For a really long time, worktrees were relatively unknown. Most developers had never heard of them, because either Git GUIs didn’t support them (or treated them as second-class citizens), or because they just usually followed the known pattern of feature branch, then work, then pull request, then merge, then repeat.
Now, our work as developers has changed. AI has made us work in parallel more than we ever have before in the history of software development. Developers run so many sessions in parallel, and “code review culture” is growing beyond “code writing culture.”
Agents and humans can do more in parallel with worktrees. It’s the default mode for the GitHub Copilot app , and for many other modern tools.
What’s the catch?
Worktrees do solve a whole lot of issues, but there’s definitely some things to watch out for.
Dependency bloat: each worktree folder requires its own copy of your project dependencies. If you’re running npm install or pip install across multiple of them, your computer might get very full, very quickly.
Folder management: you have to delete the worktree folders, to avoid cluttering your parent directory over time. Apps like the GitHub Copilot app do often handle this for you, but it’s still something you might have to do yourself if you’re operating in the terminal yourself.
Global .gitignore requirements: if you create worktree folders inside your main repo directory, you have to manually add them to .gitignore to not accidentally track them. You can make these worktrees outside of your main repo (and many apps do that by default), but it’s worth noting.
One branch limits: Git prevents you from checking out the exact same branch in two different worktrees at the same time to prevent data corruption.
How do I use worktrees in the GitHub Copilot app?
Great question! What’s awesome is they “just work” out of the box. When you open the app, there’s a dropdown that asks you where you want to run your new session on the home screen. The default is a new worktree.
Then, once you kick off a new session, you can click the session name at the top of the app, and you’ll see the (fun!) generated name of your worktree, as well as the path where it’s located, the project that worktree is for, and details about the changes that you’ve made.
Easy peasy lemon squeezy!
Should I use worktrees?
I will give you the most senior developer answer I can: It depends! You might prefer working in one way or another. You might not do as much work in parallel and like the mental model of branches and stashing. You might only do worktrees from now on. You might want to do both!
The world’s your oyster, and you can try them all in the GitHub Copilot app today.
Tags:
Git 
git worktrees 
GitHub Copilot 
GitHub Copilot app 
Written by 
Cassidy Williams 
@cassidoo 
Cassidy is senior director for developer advocacy here at GitHub. She enjoys building software, advising startups, and teaching developers how to build better. She has a weekly newsletter at cassidoo.co/newsletter where you can get her updates, practice coding problems, and a joke in your inbox!
Git 
git worktrees 
GitHub Copilot 
GitHub Copilot app 
Table of Contents
Context switching with branches and stashing
Context switching with worktrees
So... why now?
What's the catch?
How do I use worktrees in the GitHub Copilot app?
Should I use worktrees?
More on Git 
The bridge to agent-scale Git infrastructure 
We moved a copy of 99.99999% of GitHub’s repositories to Azure. Here’s how per-reference quorums will bring over the rest, and how object storage lets reads scale independently.
Eleanor White & Victoria Dye 
Building Git infrastructure for agent-scale development 
We’re rebuilding GitHub’s Git infrastructure while GitHub keeps running, creating a foundation for agent-scale software development.
Brian Celenza 
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