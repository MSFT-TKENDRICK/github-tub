GitHub Availability Report: December 2025 - The GitHub Blog 
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
GitHub Availability Report: December 2025
In December, we experienced five incidents that resulted in degraded performance across GitHub services.
Jakub Oleksy · @jakuboleksy 
January 14, 2026 
| 
4 minutes 
Share: 
In December, we experienced five incidents that resulted in degraded performance across GitHub services. 
December 08 19:51 UTC (lasting 1 hour and 15 minutes) 
Between November 26, 2025, at 02:24 UTC and December 8, 2025 at 20:26 UTC, enterprise administrators experienced a disruption when viewing agent session activities in the Enterprise AI Controls page. During this period, users were unable to list agent session activity in the AI Controls view. This did not impact viewing agent session activity in audit logs, directly navigating to individual agent session logs, or otherwise managing AI agents.
The issue was caused by a misconfiguration in a change deployed on November 25 that unintentionally prevented data from being published to an internal Kafka topic responsible for feeding the AI Controls page with agent session activity information.
The problem was identified and mitigated on December 8 by correcting the configuration issue. GitHub is improving monitoring for data pipeline dependencies and enhancing pre-deployment validation to catch configuration issues before they reach production.
December 15 17:43 UTC (lasting 39 minutes) 
On December 15, 2025, between 15:15 UTC and 18:22 UTC, Copilot Code Review experienced a service degradation that caused 46.97% of pull request review requests to fail, requiring users to re-request a review. Impacted users saw the error message: “Copilot encountered an error and was unable to review this pull request. You can try again by re-requesting a review.” The remaining requests completed successfully.
The degradation was caused by elevated response times in an internal, model-backed dependency, which led to request timeouts and backpressure in the review processing pipeline, resulting in sustained queue growth and failed review completion.
We mitigated the issue by temporarily bypassing fix suggestions to reduce latency, increasing worker capacity to drain the backlog, and rolling out a model configuration change that reduced end-to-end latency. Queue depth and request success rates returned to normal and remained stable through peak traffic.
Following the incident, we increased baseline worker capacity, added instrumentation for worker utilization and queue health, and are improving automatic load-shedding, fallback behavior, and alerting to reduce time to detection and mitigation for similar issues.
December 18 16:33 UTC (lasting 1 hour and 8 minutes) 
On December 18, 2025, from 08:15 UTC to 17:11 UTC, some GitHub Actions runners experienced intermittent timeouts for Github API calls, which led to failures during runner setup and workflow execution. This was caused by network packet loss between runners in the West US region and one of GitHub’s edge sites. Approximately 1.5% of jobs on larger and standard hosted runners in the West US region (0.28% of all Actions jobs) were impacted during this period.
By 17:11 UTC, all traffic was routed away from the affected edge site, mitigating the timeouts. We are working to improve early detection of cross-cloud connectivity issues and faster mitigation paths to reduce the impact of similar issues in the future.
December 18 17:36 UTC (lasting 1 hour and 33 minutes) 
On December 18, 2025, between 16:25 UTC and 19:09 UTC, the service underlying Copilot policies was degraded and users, organizations, and enterprises were not able to update any policies related to Copilot. No other GitHub services, including other Copilot services, were impacted. This was due to a database migration causing a schema drift.
We mitigated the incident by synchronizing the schema. We have hardened the service to make sure schema drift does not cause any further incidents, and we will investigate improvements in our deployment pipeline to shorten time to mitigation in the future.
December 22 22:31 UTC (lasting 1 hour and 46 minutes) 
On December 22, 2025, between 22:01 UTC and 22:32 UTC, unauthenticated requests to github.com were degraded, resulting in slow or timed out page loads and API requests. Unauthenticated requests from Actions jobs, such as release downloads, were also impacted. Authenticated traffic was not impacted. This was due to a severe spike in traffic, primarily to search endpoints.
Our immediate response focused on identifying and mitigating the source of the traffic increase, which along with automated traffic management restored full service for our users.
We improved limiters for load to relevant endpoints and are continuing work to more proactively identify these large changes in traffic volume, improve resilience in critical request flows, and improve our time to mitigation.
Follow our status page for real-time updates on status changes and post-incident recaps. To learn more about what we’re working on, check out the engineering section on the GitHub Blog .
Tags:
GitHub Availability Report 
Written by 
Jakub Oleksy 
@jakuboleksy 
GitHub Availability Report 
More on GitHub Availability Report 
GitHub availability report: September 2026 
In September, we experienced two incidents that resulted in degraded performance across GitHub services. 
Jakub Oleksy 
GitHub availability report: August 2026 
In August, we experienced five incidents that resulted in degraded performance across GitHub services.
Jakub Oleksy 
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