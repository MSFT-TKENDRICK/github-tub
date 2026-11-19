GitHub availability report: May 2026 - The GitHub Blog 
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
GitHub availability report: May 2026
In May, we experienced nine incidents that resulted in degraded performance across GitHub services.
Jakub Oleksy · @jakuboleksy 
June 11, 2026 
| 
10 minutes 
Share: 
In March and April we shared updates on GitHub’s availability and infrastructure investments. As that work continues and we approach some major milestones, we wanted to start sharing more regular updates in our monthly availability reports. So before we dive into incidents from May, here’s how we’re tracking with our ongoing work to make GitHub more reliable. 
Our progress in making GitHub more resilient 
The short version:  GitHub’s traffic is growing rapidly, driven in large part by AI-assisted and agentic development workflows, and we’ve been transforming our infrastructure to keep up with it. That means moving to Azure for elastic capacity, breaking our monolith apart into isolated services, and eliminating the shared failure points that have driven past incidents. 
Here’s where we stand. We’re now serving  40% of monolith traffic from Azure  (up from 8% in February), with Git traffic at 30% and repository replication at 99%. We’ve more than doubled our effective capacity in four months. At the same time, we’re completing the isolation of our primary database cluster: splitting users, authentication, and authorization into independent domains so that a problem in one can no longer cascade across the platform. Our new users service is fully cut over, and handling double the traffic at substantially lower database cost. Stateless authentication tokens are also rolling out, eliminating per-request database lookups that amplified pressure during traffic spikes. 
We are making structural changes that permanently remove failure modes. We acknowledge that we have work to do, but we’re committed to getting it done and making GitHub reliable when and where you need it. The principle guiding our decision is simple: availability, then capacity, then features. 
Thanks for your partnership as we keep building GitHub’s reliability and resilience. 
In May, we experienced nine incidents that resulted in degraded performance across GitHub services.
May 04 15:45 UTC (lasting 55 minutes) 
On May 4, 2026, between 15:34 and 16:40 UTC, github.com experienced a service disruption that produced elevated latency and an increased rate of request failures across a broad set of customer-facing services. Total customer impact lasted approximately one hour and six minutes. 
The most significantly impacted service was pull requests, which was statused  Red for the duration of peak impact. Issues, actions, webhooks, and Git operations experienced elevated latency and intermittent errors. A number of dependent services—including Codespaces, Pages, Packages, OAuth and GitHub Apps, Marketplace, and Copilot—also saw varying degrees of degraded performance due to shared data dependencies. At peak, approximately 1.3% of requests returned a 5xx response, averaging around 0.46% across the duration of the incident. 
The disruption was triggered by a routine online schema migration running against a large, heavily-accessed database table. The migration had been progressing without issue for several hours, but as traffic ramped up toward the weekly peak, the combined load from the migration and normal production traffic saturated database connection capacity. This produced query contention on a primary database and cascading timeouts across services that depend on it. 
The incident was detected within approximately three minutes of the first signs of impact through a combination of automated monitoring and on-call observation. Once the contributing migration was identified, it was paused, and dependent services recovered shortly thereafter. Time to mitigation was approximately 33 minutes, and full resolution followed approximately 30 minutes later 
As follow-up, we are implementing several improvements to reduce the likelihood and blast radius of a similar event. Migrations against large, high-traffic tables will be more tightly aligned with low-traffic windows and will use dynamic throttling that adapts to live cluster load. We are adding automated circuit breakers that will pause in-flight migrations when latency or connection utilization on the underlying database crosses safe thresholds, and we are extending our monitoring so that migration-induced pressure (i.e., write rate, lock time, and connection saturation) triggers alerts before customer impact occurs. In parallel, we are reviewing connection-pool capacity to ensure adequate headroom is maintained while migrations are running.  
May 05 13:37 UTC (lasting 3 hours and 49 minutes) 
May 06 07:19 UTC (lasting 2 hours and 25 minutes) 
On May 5 and May 6, GitHub Actions was degraded across two related incidents affecting hosted runners. The two events were connected: remediation work performed after the May 5 incident introduced the configuration issue that triggered the May 6 incident. 
On May 5, 2026, from 13:22 to 17:05 UTC, GitHub Actions hosted runners in the East US region were degraded. Approximately 13.5% of jobs requesting a standard runner failed and ~16% of requested larger runners with private networking pinned to East US failed or were delayed by more than five minutes. Copilot code review requests were also impacted. Approximately 8,500 code review requests timed out during this window. Affected users saw an error comment on their pull requests and were able to retry by rerequesting a review. Most runner requests were picked up by other regions automatically, but a portion of requests still routing to East US were impacted. 
This was triggered by a scale-up operation for hosted runner VMs in the East US region. This is a regular operation, but the VM create load hit an internal rate limit when VM creates pull images from storage. Existing backoff logic was not triggered because of the response code returned in this case. The rate limiting and VM creation failures were mitigated by reducing load to allow for recovery and allowing queued work to be processed. By 15:34 UTC, queued and failed job assignments were mostly mitigated, with less than 0.5% of runner assignments impacted between 15:34 and full recovery at 17:05. 
On May 6, 2026, from 06:45 to 09:15 UTC, GitHub Actions Standard Ubuntu hosted runners were again degraded, and approximately 17.1% of jobs requesting a standard runner failed. The issue was caused by unexpected configuration data introduced during remediation work for the previous day’s incident, which blocked new allocations as daily load ramped up. We removed the problematic data at 08:51 UTC, allowing allocations to resume and runner pools to scale back up and recover. 
We are improving our system’s throttling behavior when limits occur, improving our controls to more quickly mitigate similar situations in the future, and reviewing all limits end-to-end for similar operations. In addition, we are updating the filter logic for this allocation data to be resilient to abnormal data shapes and improving monitoring to alert when allocations are blocked, allowing the team to respond before customer impact starts. 
May 06 11:21 UTC (lasting 38 minutes) 
On May 6, 2026, between 11:02 and 11:13 UTC, users were unable to start or view Copilot cloud agent or remote sessions. During this time, all requests to the session API returned errors, preventing users from creating new sessions or viewing existing ones. The issue was caused by a configuration change to the service’s network routing that inadvertently removed the ingress path for the service. The team reverted the change at 11:13 UTC which restored service. The incident remained open until 11:59 UTC while the team verified full recovery. We are taking steps to improve our deployment validation process to prevent similar configuration changes from impacting production traffic in the future. 
May 06 15:25 UTC (lasting 3 hours and 39 minutes) 
On May 6, 2026, between 15:12 and 19:02 UTC, creation of new pull request review threads on github.com failed. This included new line comments and file comments on pull requests. Existing pull requests and previously created comments were unaffected. 
This incident was caused by a 32-bit integer key reaching its maximum value in a Vitess lookup table used during pull request thread creation. The primary table was migrated to a 64-bit integer key, but the Vitess lookup table remained 32-bit. Once the values in the primary table passed the available 32-bit ID space attempts to create new review threads began failing, resulting in a near 100% failure rate for new thread creation requests. We mitigated the issue by updating the impacted lookup table definitions across all shards to use 64-bit integer column types, increasing the available ID range, and restoring normal operation. Service was fully restored once the schema changes competed globally. 
To help prevent similar incidents, we are expanding existing monitoring of database columns to include Vitess lookup tables and enabling earlier detection of any tables approaching a column size limit. 
May 07 05:02 UTC (lasting 1 hour and 54 minutes) 
On May 7, 2026, between 04:12 and 06:13 UTC, Copilot cloud agent and Copilot code review agent sessions for pull requests were delayed or failed to start.   
During the impact window, new Copilot coding agent sessions triggered by pull requests were not created, while review agent sessions dropped by ~50% from the baseline.   
The issue was caused by follow-up recovery work from a separate  pull request incident . As part of that recovery, we ran a large database migration, which caused replication delays on several replica hosts. 
Although those replicas were not serving user traffic, our safeguards correctly treated the elevated replication lag as a signal to slow down writes to the affected database cluster. As a result, some pull request background processing was temporarily delayed. That processing is responsible for sending the internal events that Copilot agents use to begin work, so affected agents did not start until the database replicas caught up. 
The system recovered once replication lag returned to normal and pull request processing resumed. We are making critical background processing more resilient to replication lag so it degrades gracefully and keeps essential events flowing under strain, reducing the chance of similar secondary impact during future recovery work. 
May 15 08:13 UTC (lasting 35 minutes) 
On May 15, 2026, from 07:43 to 08:48 UTC, GitHub Actions experienced a degradation that caused workflow runs to fail or experience delayed starts for a subset of customers. The incident was triggered by a planned failover of supporting infrastructure used by GitHub Actions. During that operation, an automated service discovery update did not propagate correctly, which caused traffic to be routed incorrectly and increased request timeouts in a core dependency for workflow orchestration. 
At peak impact, 42% of Actions runs failed. Downstream services that depend on Actions workflow execution were also impacted, including GitHub Pages and Copilot cloud services. At 08:12 UTC, responders manually corrected the service discovery routing issue. Timeout and failure rates recovered shortly after, and we continued monitoring until full stabilization was confirmed across all affected services. The incident was marked resolved at 08:48 UTC. 
To prevent recurrence, we are taking several steps. First, we are implementing failover guardrails that validate service discovery state before completing failover operations. Second, we are strengthening verification checks. Finally, we are improving dependency resilience to reduce timeout cascades during infrastructure events. 
May 26 10:57 UTC (lasting 2 hours and 21 minutes) 
On May 26, 2026, between 10:40 and 12:56 UTC, GitHub Actions jobs were degraded. From 10:40 to 12:16 UTC, all newly queued runs failed to start. From 12:16 to 12:56 UTC, runs that required downloading actions for their workflows continued to fail. GitHub Pages, Copilot code review, Copilot coding agent, Octoshift, and GitHub Enterprise Importer were also impacted due to their dependency on GitHub Actions. 
This was caused by our automated account review system incorrectly suspending the service account used by GitHub Actions to authenticate workflow runs and download actions. 
We mitigated by restoring the account at 12:16 UTC, marking it exempt from further automated review at 12:20 UTC, and redeploying a related service at 12:48 UTC to flush cached account state. Full recovery was confirmed at 12:56 UTC. 
During this incident, a small number of issues, pull requests, comments, and discussions were marked as hidden when the service account was disabled. No data was lost. All content hidden because of this incident has been restored and full search index restoration was completed. 
To prevent a recurrence, we have added an allowlist of all service accounts that cannot be suspended by automated systems, and ensuring these protections are enforced consistently across all account management tooling. We are also improving diagnostic tooling for accounts and reducing cache propagation delays to shorten time to mitigate similar incidents in the future. 
May 28 19:01 UTC (lasting 1 hour and 40 minutes) 
On May 28, 2026, between 18:27 and 20:41 UTC, the GitHub Copilot service was degraded due to an issue with the Responses API of an upstream provider affecting the GPT-5.2, GPT-5.3-Codex, GPT-5.4, and GPT-5.5 models. Requests routed to these models via the Responses API returned elevated error rates, which also affected Copilot coding agent and Copilot code review. No other models were impacted. 
We mitigated the incident by shifting traffic away from the affected models while the upstream provider deployed a fix. 
GitHub is working to improve automated failover for the affected models and strengthen monitoring to prevent similar incidents in the future. 
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