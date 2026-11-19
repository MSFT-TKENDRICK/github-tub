An update on GitHub availability - The GitHub Blog 
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
Home / News & insights / Company news 
An update on GitHub availability
Here’s what we’ve done—and what we’re still doing—to improve our availability and reliability.
Vlad Fedorov · @v-fedorov-gh 
April 28, 2026 
| 
6 minutes 
Share: 
I wanted to give an update on GitHub’s availability in light of two recent incidents . Both of those incidents are not acceptable, and we are sorry for the impact they had on you. I wanted to share some details on them, as well as explain what we’ve done and what we’re doing to improve our reliability.
We started executing our plan to increase GitHub’s capacity by 10X in October 2025 with a goal of substantially improving reliability and failover. By February 2026, it was clear that we needed to design for a future that requires 30X today’s scale.
The main driver is a rapid change in how software is being built. Since the second half of December 2025, agentic development workflows have accelerated sharply. By nearly every measure, the direction is already clear: repository creation, pull request activity, API usage, automation, and large-repository workloads are all growing quickly.
This exponential growth does not stress one system at a time. A pull request can touch Git storage, mergeability checks, branch protection, GitHub Actions, search, notifications, permissions, webhooks, APIs, background jobs, caches, and databases. At high scale, small inefficiencies compound: queues deepen, cache misses become database load, indexes fall behind, retries amplify traffic, and one slow dependency can affect several product experiences.
Our priorities are clear: availability first, then capacity, then new features. We are reducing unnecessary work, improving caching, isolating critical services, removing single points of failure, and moving performance-sensitive paths into systems designed for these workloads. This is distributed systems work: reducing hidden coupling, limiting blast radius, and making GitHub degrade gracefully when one subsystem is under pressure. We’re making progress quickly, but these incidents are examples of where there’s still work to do.
What we’re doing
Short term, we had to resolve a variety of bottlenecks that appeared faster than expected from moving webhooks to a different backend (out of MySQL), redesigning user session cache to redoing authentication and authorization flows to substantially reduce database load. We also leveraged our migration to Azure to stand up a lot more compute.
Next we focused on isolating critical services like git and GitHub Actions from other workloads and minimizing the blast radius by minimizing single points of failure. This work started with careful analysis of dependencies and different tiers of traffic to understand what needs to be pulled apart and how we can minimize impact on legitimate traffic from various attacks. Then we addressed those in order of risk. Similarly, we accelerated parts of migrating performance or scale sensitive code out of Ruby monolith into Go.
While we were already in progress of migrating out of our smaller custom data centers into public cloud, we started working on path to multi cloud. This longer-term measure is necessary to achieve the level of resilience, low latency, and flexibility that will be needed in the future.
The number of repositories on GitHub is growing faster than ever, but a much harder scaling challenge is the rise of large monorepos. For the last three months, we’ve been investing heavily in response to this trend both within git system and in the pull request experience.
We will have a separate blog post soon describing extensive work we’ve done and the new upcoming API design for greater efficiency and scale. As part of this work, we have invested in optimizing merge queue operations, since that is key for repos that have many thousands of pull requests a day.
Recent incidents
The two recent incidents were different in cause and impact, but both reflect why we are increasing our focus on availability, isolation, and blast-radius reduction.
April 23 merge queue incident
On April 23, pull requests experienced a regression affecting merge queue operations.
Pull requests merged through merge queue using the squash merge method produced incorrect merge commits when a merge group contained more than one pull request. In affected cases, changes from previously merged pull requests and prior commits were inadvertently reverted by subsequent merges.
During the impact window, 658 repositories and 2,092 pull requests were affected. We initially shared slightly higher numbers because our first assessment was intentionally conservative. The issue did not affect pull requests merged outside merge queue, nor did it affect merge queue groups using merge or rebase methods.
There was no data loss: all commits remained stored in Git. However, the state of affected default branches was incorrect, and we could not safely repair every repository automatically. More details are available in the incident root cause analysis.
This incident exposed multiple process failures, and we are changing those processes to prevent this class of issue from recurring.
April 27 search-related incident
On April 27, an incident affected our Elasticsearch subsystem, which powers several search-backed experiences across GitHub, including parts of pull requests, issues, and projects.
We are still completing the root cause analysis and will publish it shortly. What we know now is that the cluster became overloaded (likely due to a botnet attack) and stopped returning search results. There was no data loss, and Git operations and APIs were not impacted. However, parts of the UI that depended on search showed no results, which caused a significant disruption.
This is one of the systems we had not yet fully isolated to eliminate as a single point of failure, because other areas had been higher in our risk-prioritized reliability work. That impact is unacceptable, and we are using the same dependency and blast-radius analysis described above to reduce the likelihood and impact of this type of failure in the future.
Increasing transparency
We have also heard clear feedback that customers need greater transparency during incidents.
We recently updated the GitHub status page to include availability numbers. We have also committed to statusing incidents both large and small, so you do not have to guess whether an issue is on your side or ours.
We are continuing to improve how we categorize incidents so that the scale and scope are easier to understand. We are also working on better ways for customers to report incidents and share signals with us during disruptions.
Our commitment
GitHub’s role has always been to support developers on an open and extensible platform.
The team at GitHub is incredibly passionate about our work. We hear the pain you’re experiencing. We read every email, social post, support ticket, and we take it all to heart. We’re sorry.
We are committed to improving availability, increasing resilience, scaling for the future of software development, and communicating more transparently along the way.
Editor’s note: This post was updated on April 28, 2026, to update the number of repos affected during the April 23 incident. 
Written by 
Vlad Fedorov 
@v-fedorov-gh 
Vladimir Fedorov is GitHub's Chief Technology Officer, bringing decades of experience in engineering leadership and innovation. A passionate advocate for developer productivity, Vlad is leading GitHub’s engineering team to shape the future of developer tools and innovation with a developer-first mindset.
Before joining GitHub, Vlad co-founded UserClouds, a startup specializing in data governance and privacy. He spent 12 years at Facebook, now Meta, as Senior Vice President, leading engineering teams of over 2,000 across Privacy, Ads, and Platform. Earlier in his career, Vlad worked at Microsoft and earned both his BS and MS in Computer Science from Caltech. He currently serves on the board of Codepath.org, an organization dedicated to reprogramming higher education to create the first AI-native generation of engineers, CTOs, and founders.
Vlad lives in the Bay Area and when not working enjoys spending time outside and on the water with his family.
Table of Contents
What we’re doing
Recent incidents
Increasing transparency
Our commitment
Related posts 
Company news 
GitHub Universe 2026: Evolving every layer of the stack 
Today, we laid out our vision for GitHub as the most comprehensive, end-to-end software delivery system in the world.
Jay Parikh 
News & insights 
Octoverse: Commits, pushes, reach new highs in 2026 as developers build with agents 
See how a record year of growth reached every industry, every field, and every kind of builder in the 2026 Octoverse report.
GitHub Staff 
Company news 
The next developer interface is ambient intelligence 
AI, agents, voice, and physical controls are shifting software development from operating tools to expressing intent—and helping developers stay focused on building.
Martin Woodward 
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