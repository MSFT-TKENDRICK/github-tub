GitHub availability report: September 2026 - The GitHub Blog 
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
GitHub availability report: September 2026
In September, we experienced two incidents that resulted in degraded performance across GitHub services. 
Jakub Oleksy · @jakuboleksy 
October 14, 2026 
| 
7 minutes 
Share: 
Our last update covered content through August. We did not publish another in September while other public content addressed the August 17 outage. This edition covers progress over the past two months.
The short version of August and September : we reduced shared-database pressure, added overload controls, created headroom for GitHub Actions, expanded failure containment for pull requests, and moved more production workloads to Azure. Significant incidents, a capacity pause, and a missed migration target show that the work is not complete.
By October 7, 120 of 160 production services were deployed in Central US, and 13 of 51 primary MySQL databases had moved. Azure also handled 65.4% of read traffic for GitHub’s core application, 48.3% of Git read traffic, and 80.2% of stream-processing traffic. These percentages measure different workloads and should not be added.
We paused Central US deployments and traffic increases on September 11 because capacity was uneven across availability zones. Permanent ramps resumed September 18 after temporary relief, but durable capacity work continues, with a goal of unlocking all available capacity by the end of October. We missed our aggressive September 30 goal to deploy every production service there. During a planned database failover, an automated emergency process disconnected Central US database copies and disrupted customers in that region. We disabled that process during planned handoffs while improving recovery.
Outside the regional migration, 24 authentication-core tables moved off GitHub’s oldest shared database, removing approximately one million queries per second from its replicas. The database cluster supporting issues and pull requests removed approximately 980 million unnecessary edit-history rows, creating an estimated 1.8 terabytes of recoverable storage. Weekly deadlocks fell approximately 77% from their June peak, and continuous cleanup now prevents the same unbounded growth from returning.
Half of sampled pull request traffic can now continue with limited functionality when a shared dependency fails. Production results showed several read operations remained available during a shared-database incident. Database traffic routing can also add capacity automatically during spikes; one group expanded from 14 to 19 instances during a September 23 increase in pull request activity. A production overload control now lets responders protect higher-priority API and web workflows by rejecting lower-priority requests before broader saturation. Operator documentation and training are complete.
GitHub Actions also gained operating headroom. Production changes reduced measured Redis operations by approximately 28% and relative CPU by approximately 30%. A separate infrastructure cache reduced Redis bandwidth by 84%, average response time by 66%, median response time for the primary inventory request by 96%, and queued requests by 95%.
The August 6 actions outage, August 17 github.com outage, September failover disruption, and controlled capacity pause are reminders that measured improvements matter only when they reduce customer risk under real conditions. The principle remains the same: availability, then capacity, then features. 
September 13 09:16 UTC (lasting 1 hour and 28 minutes)
What happened?
Impact summary
Duration: approximately 2 hours
Customers may have seen requests fail, run slowly, or remain pending when opening or updating issues and pull requests, calling APIs, creating access tokens, starting GitHub Actions workflows, or signing up.
~96% of the customer requests creating issues through the web interface were impacted during the incident window. In addition, 90% of new customer signup and ~4% of actions workflows also experienced intermittent failures.
What went wrong and why?
A background data-cleanup job increased load on a shared database. The job had a safeguard designed to slow its writes when database replicas fell behind, but the safeguard did not account for incoming load on the primary database server. As a result, the job continued running until the primary reached its connections limit. When the primary ran out of available connections, requests that depended on it could not complete reliably.
Two other factors increased the impact and delayed recovery. First, there was no quick timeout on these database calls, so request handlers waited on the stalled database instead of failing fast. Second, a retry loop around token creation kept resending writes that were already failing, which held the database saturated rather than letting it recover.
How did we respond?
A background data-cleanup job began writing to a shared database.
The job’s safeguard monitored replica lag but did not account for load building on the database’s primary server.
The primary ran out of available connections, causing requests across dependent services to fail or run slowly.
Automated monitoring detected the incident, and we traced the failures to load on the shared database.
We reduced internal load and paused the background job.
The database recovered, and error rates across the affected services returned to normal.
How are we making incidents like this less likely or less impactful?
We are implementing additional safeguards to improve database resilience and service availability. These measures will better control background processing based on available database capacity, reduce unnecessary retries during failures, and limit the impact of slow database requests.
We are also improving service startup behavior to ensure that temporary database connectivity issues do not unnecessarily affect service recovery.
September 28 21:16 UTC (lasting 52 minutes) 
What happened?
Impact summary 
Duration: approximately 2 hours and 45 minutes 
This incident impacted Copilot code review across github.com and GHEC data-residency regions. Affected customers saw Copilot remain in a reviewing state without a review appearing, with delays ranging from ~30 minutes to a max of 2 hours. 
Some reviews on github.com continued to complete normally during the incident, while reviews in data-residency regions did not. Some customers still received delayed error messages for requests made during the incident. 
What went wrong and why?
Copilot code review uses a separate service to run reviews and 2 versions of the results are returned: a limited copy that excludes the review comments and a full copy that includes the completed review. Copilot code review posts reviews only from the full copy. A change to that service began sending the full copy only for some customers. For other customers, only the limited copy was sent.
As a result, Copilot code review could not build a review, but reported that the job had completed successfully. The missing review results were not detected due to lack of monitoring. The incident was detected as some of the reviews remained incomplete for more than 30 minutes, triggering an alert to first responders.
We mitigated the incident by reverting the change.
How did we respond?
A change to the service that runs Copilot code reviews began rolling out, and review results stopped appearing on pull requests. The change reached every environment.
Reviews began timing out, triggering an alert to the Copilot code review team. We declared an incident.
We traced the failures to the change and began reverting it.
While the revert completed its required checks, we posted the incident on the GitHub Status page.
The revert then reached all the affected regions. We resolved the incident and advised customers to request affected reviews again.
How are we making incidents like this less likely or less impactful?
We are strengthening the reliability of Copilot code reviews by adding safeguards throughout the review and delivery process. These improvements will help ensure that completed reviews are delivered successfully, allow failed reviews to recover automatically, and provide earlier notification when issues occur.
We are also improving our monitoring and deployment processes so that problems can be identified and addressed more quickly.
Follow our status page for real-time updates on status changes and post-incident recaps. To learn more about what we’re working on, check out the engineering section on the GitHub Blog .
Tags:
GitHub Availability Report 
Written by 
Jakub Oleksy 
@jakuboleksy 
GitHub Availability Report 
Table of Contents
September 13 09:16 UTC (lasting 1 hour and 28 minutes)
September 28 21:16 UTC (lasting 52 minutes) 
More on GitHub Availability Report 
GitHub availability report: August 2026 
In August, we experienced five incidents that resulted in degraded performance across GitHub services.
Jakub Oleksy 
GitHub availability report: July 2026 
In July, we experienced eight incidents that resulted in degraded performance across GitHub services.
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