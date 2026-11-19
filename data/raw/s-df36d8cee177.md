Securing the git push pipeline: Responding to a critical remote code execution vulnerability - The GitHub Blog 
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
Home / Security 
Securing the git push pipeline: Responding to a critical remote code execution vulnerability
How we validated, fixed, and investigated a critical vulnerability in under two hours, and confirmed no exploitation.
Alexis Wales · @alexiswales 
April 28, 2026 
| 
Updated April 29, 2026 
| 
5 minutes 
Share: 
On March 4, 2026, we received a vulnerability report through our Bug Bounty program from researchers at Wiz describing a critical remote code execution vulnerability affecting github.com, GitHub Enterprise Cloud, GitHub Enterprise Cloud with Data Residency, GitHub Enterprise Cloud with Enterprise Managed Users, and GitHub Enterprise Server.
In less than two hours we had validated the finding, deployed a fix to github.com, and begun a forensic investigation that concluded there was no exploitation .
In this post, we want to share what happened, how we responded, and what we are doing to prevent similar issues in the future.
Receiving the bug bounty report
The bug bounty report described a way for any user with push access to a repository, including a repository they created themselves, to achieve arbitrary command execution on the GitHub server handling their git push operation. The attack required only a single command: git push with a crafted push option that leveraged an unsanitized character.
Our security team immediately began validating the bug bounty report. Within 40 minutes, we had reproduced the vulnerability internally and confirmed the severity. This was a critical issue that required immediate action.
Understanding the vulnerability
When a user pushes code to GitHub, the operation passes through multiple internal services. As part of this process, metadata about the push, such as the repository type and the environment it should be processed in, is passed between services using an internal protocol.
The vulnerability leveraged how user-supplied git push options were handled within this metadata. Push options are an intentional feature of git that allow clients to send key-value strings to the server during a push. However, the values provided by the user were incorporated into the internal metadata without sufficient sanitization. Because the internal metadata format used a delimiter character that could also appear in user input, an attacker could inject additional fields that the downstream service would interpret as trusted internal values.
By chaining several injected values together, the researchers demonstrated that an attacker could override the environment the push was processed in, bypass sandboxing protections that normally constrain hook execution, and ultimately execute arbitrary commands on the server.
Responding to the vulnerability
With the root cause identified on March, 4, 2026, at 5:45 p.m. UTC, our engineering team developed and deployed a fix to github.com at 7:00 p.m. UTC that same day. The fix ensures that user-supplied push option values are properly sanitized and can no longer influence internal metadata fields.
For GitHub Enterprise Server, we prepared patches across all supported releases (3.14.25, 3.15.20, 3.16.16, 3.17.13, 3.18.7, 3.19.4, 3.20.0, or later) and published CVE-2026-3854 . These are available today and we strongly recommend that all GHES customers upgrade immediately.
Investigating for exploitation
With the immediate fix in place on github.com, we moved to the pressing question of whether anyone else found and exploited this vulnerability before the researchers reported it.
A key property of this vulnerability gave us confidence in our ability to answer that question. The exploit forces the server to take a code path that is never used during normal operations on github.com. This is not something an attacker can avoid or suppress, as it is an inherent consequence of how the injection works.
We logged this path and queried our telemetry for any instance of this anomalous code path being executed. The results were clear:
Every occurrence mapped to the Wiz researchers’ own testing activity.
No other users or accounts triggered this code path.
No customer data was accessed, modified, or exfiltrated as a result of this vulnerability.
For GHES customers, exploitation would require an authenticated user with push access on your instance. We recommend reviewing your access logs out of an abundance of caution.
Defense in depth
Beyond fixing the immediate input sanitization issue, our investigation surfaced an additional finding worth sharing.
The exploit worked in part because the server had access to a code path that was not intended for the environment it was running in. This code path existed on disk as part of the server’s container image, even though it was only meant to be used in a different product configuration. An older deployment method had correctly excluded this code, but when the deployment model changed, the exclusion was not carried forward.
This is a useful reminder that defense in depth matters. The input sanitization fix is the primary remediation, but we have also removed the unnecessary code path from environments where it should not exist. Even if a similar injection vulnerability were discovered in the future, this additional hardening would limit what an attacker could do with it.
What you should do
GitHub Enterprise Cloud , GitHub Enterprise Cloud with Enterprise Managed Users , GitHub Enterprise Cloud with Data Residency , and github.com were patched on March 4, 2026. No action is required from users of any of these.
As mentioned previously, exploitation on GitHub Enterprise Server requires an authenticated user with push access on your instance. We recommend that you review /var/log/github-audit.log for push operations containing ; in push options. Updates are available in the following releases:
GitHub Enterprise Server 3.14.25 or later
GitHub Enterprise Server 3.15.20 or later
GitHub Enterprise Server 3.16.16 or later
GitHub Enterprise Server 3.17.13 or later
GitHub Enterprise Server 3.18.7 or later
GitHub Enterprise Server 3.19.4 or later
GitHub Enterprise Server 3.20.0 or later
We strongly recommend upgrading to the latest patch release as soon as possible. See the GHES release notes for details.
This vulnerability has been assigned CVE-2026-3854 .
Acknowledgments
This vulnerability was discovered and responsibly disclosed by researchers at Wiz . Their report was thorough, clearly demonstrated the impact, and enabled us to move quickly from validation to remediation. This finding will receive one of the highest rewards in the history of our Bug Bounty program , which has been a cornerstone of our security program for over a decade.
Tags:
CVE 
GHES 
Written by 
Alexis Wales 
@alexiswales 
Alexis Wales is the Chief Information Security Officer of GitHub. She leads a team of security experts focused on safeguarding the GitHub platform, products and the open source community, empowering more than 150 million developers worldwide to build and deploy software securely on GitHub.
Alexis has 20 years of experience defending critical national and private sector networks, spanning positions with the Department of Defense and the Department of Homeland Security’s Cybersecurity and Infrastructure Security Agency (CISA). This experience sparked her passion for collaboration between the public and private sectors to solve the hardest security challenges that threaten the technology we use every day.
CVE 
GHES 
Table of Contents
Receiving the bug bounty report
Understanding the vulnerability
Responding to the vulnerability
Investigating for exploitation
Defense in depth
What you should do
Acknowledgments
More on CVE 
A year of open source vulnerability trends: CVEs, advisories, and malware 
Reviewed advisories hit a four-year low, malware advisories surged, and CNA publishing grew—here’s what changed and what it means for your triage and response. 
Jonathan Evans 
How to scan for vulnerabilities with GitHub Security Lab’s open source AI-powered framework 
GitHub Security Lab Taskflow Agent is very effective at finding Auth Bypasses, IDORs, Token Leaks, and other high-impact vulnerabilities.
Man Yue Mo & Peter Stöckli 
Related posts 
Security 
How bug bounty sharpens one researcher’s security skills 
As Cybersecurity Awareness Month continues, the GitHub Bug Bounty team spotlights @r31n, diving into their research approach, favorite bug classes, and advice for aspiring hackers.
Shilpa Kumari 
AI & ML 
GitHub’s model for secret detection: Finding more secrets with less noise 
GitHub’s context-aware secret classifier improves detection quality, raises weighted acceptance by 11.5%, and reduces median scan execution time by 86%.
Batu Ozturkler & Shengyu Fu 
Security 
How one bug bounty researcher chooses the features they investigate 
As we kick off Cybersecurity Awareness Month, the GitHub Bug Bounty team spotlights @vaib25vicky, exploring their methodology, techniques, and experiences hacking on GitHub.
Shilpa Kumari 
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