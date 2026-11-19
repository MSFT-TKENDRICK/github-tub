Disrupting supply chain attacks on npm and GitHub Actions - The GitHub Blog 
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
Home / Security / Supply chain security 
Disrupting supply chain attacks on npm and GitHub Actions
Explore the changes we’ve shipped across npm and GitHub Actions over the past few months to disrupt supply chain attack techniques and limit their impact.
Greg Ose & Zachary Steindler 
July 28, 2026 
| 
7 minutes 
Share: 
In the past year, there’s been a pattern of supply chain attacks that target weaknesses in package repositories and CI/CD systems to quickly spread malware to hundreds of open source projects. This malware seeks to exfiltrate credentials both to broadly spread the attack, as well as for later exploitation.
We’ve written a few times about our plans for hardening the supply chain: Our plan for a more secure npm supply chain in September 2025, Strengthening supply chain security: Preparing for the next malware campaign in December 2025, and What’s coming to our GitHub Actions 2026 security roadmap in March 2026. In this post, we’re updating you on changes we’ve implemented that directly disrupt some of the most common and impactful supply chain attack techniques.
Anatomy of supply chain attacks
Supply chain attacks chain together several weaknesses, and there is no single security capability that can stop them. Addressing them takes a holistic approach, prioritizing the mitigations that break the most impactful links in the attack chain. Our teams have been studying these attacks to deploy several improvements that disrupt them and limit their impact. This is possible thanks to collaboration with the security research and developer communities.
The attacks vary in how they spread across the software ecosystem. However, most of these attacks follow similar techniques to gain initial access to a project, escalate privileges, and distribute across users and software. Improvements made to npm and GitHub Actions in the past few months have been focused on cutting off specific, common techniques and providing ways for customers to identify and respond to these attacks.
Initial compromise
Attacks start by compromising a single project, often by directly compromising a maintainer’s account or by targeting the project’s actions workflows.
npm adds preventive account protection for high-impact accounts (June 2026) : Frequently, attacks start with a phishing campaign targeting maintainers. With this change, high-impact npm accounts are now put into a read-only mode for 72 hours when they change their email or use a 2FA recovery code. This delay allows maintainers time to respond and recover the account before their account can be used to start an attack.
Safer pull_request_target defaults for GitHub Actions checkout (June 2026) : A common vulnerability in a project’s CI/CD pipelines are “pwn requests,” where a workflow triggers on pull requests from forks and then executes user-submitted and untrusted code from that fork. We changed the default behavior of actions/checkout to prevent the checkout of untrusted code from forks in commonly exploited triggers unless you explicitly opt-out (after reviewing your risk). This change and its backport to older versions cut off one of the most common vulnerable code patterns leading to code execution in GitHub Actions CI/CD workflows and initial project compromise.
Control who and what triggers GitHub Actions workflows (June 2026) : Maybe you’d prefer to opt-out of these risky action triggers altogether or limit who can trigger them. This new control lets you set enterprise, organization, or repository level policies on who is allowed to trigger workflows and what trigger types are allowed. These workflow execution policies provide a governable and customizable layer of least-privilege around Action workflows that reduce the attack surface of your CI/CD infrastructure.
Read-only Actions cache for untrusted triggers (June 2026) : After an attacker has achieved code execution in an Actions workflow, they then look to escalate to more privileged workflows (and therefore credentials) through poisoning the cache entries shared across workflows. With this change, we restrict the ability for less trusted workflows to modify the cache shared with other workflows. This directly closes a common path attackers have used to turn a vulnerability with limited impact into one that compromises highly privileged credentials used by release and publishing workflows.
Exfiltrate credentials
Once an attacker has access to a single package, they then focus on detecting and exfiltrating credentials to gain further access and use in later exploitation across ecosystems.
npm trusted publishing now supports CircleCI (April 2026) : The number one thing you can do to disrupt these attacks is to remove long-lived credentials from your CI/CD pipeline. Trusted publishing is a great way to authorize publishes to your package repository without a long-lived credential. By adding CircleCI as a trusted publishing provider, we’ve made it possible for more people to remove the credentials these attacks attempt to exfiltrate.
Actions network firewall (In technical preview) : This technical preview logs all outbound network traffic from your Action workflow runs so you can detect unusual behavior like pulling down malicious code or exfiltrating credentials to a new domain. Future work will enable network egress restrictions and policies to block these attacks before they lead to further escalation and exfiltration.
Propagating the attack
With the credentials harvested from the previous step, attackers attempt to use those credentials to distribute their malware and compromise more projects and maintainers as quickly as possible.
Staged publishing for npm (May 2026) : With staged publishing, it’s not enough to have credentials to publish a new package on npm; those packages are staged until additional approval and 2FA authentication is provided in the npm cli or on npmjs.com. This opt-in security control allows maintainers to ensure that any version of their package published has gone through this additional authorization. By decoupling the credentials used in CI/CD pipelines and automation from those that can publish to the registry, the attack chain from a CI/CD pipeline to malware distribution is cut off.
Upcoming breaking changes for npm v12 (June 2026) : To spread their malware as quickly as possible, attackers use npm install-time scripts to exfiltrate credentials instead of waiting for code to be executed by the package at runtime. With npm v12, we are rolling out a breaking change that disables these install scripts by default. Since install scripts have legitimate use within the package installation processes that several popular packages rely on, you can reenable them by approving specific scripts. Additional vectors for install-time code execution have also been blocked by disabling dependencies via git or remote URLs by default.
Dependabot version updates introduce default package cooldown (July 2026) : Attackers rely on speed, hoping a malicious release gets pulled into as many downstream projects as possible before anyone notices. Version updates through Dependabot now wait until a release has been available for at least three days before opening a pull request, giving detection signals time to surface before a malicious release reaches your project. This cooldown is on by default, and security updates still open immediately, so critical fixes are never delayed.
Identifying and responding to supply chain attacks
In parallel to hardening npm and GitHub Actions to disrupt and limit the impact of supply chain attacks, we have also been working on making features and tools available to users to identify and respond to supply chain incidents that have impacted their projects and accounts.
Self-service credential revocation for incident response (June 2026) : GitHub credentials remain an ongoing target of attackers in supply chain attacks. This feature provides self-service tooling to instantly revoke all credentials for a given user in an enterprise. This builds on the enterprise-wide credential management tools for incident response released in February and allows enterprise admins and members to quickly respond if credentials have been compromised in a supply chain attack.
Expanded credential revocation API support (March 2026) : Recent attacks have included exfiltrating credentials within publicly accessible content. To help the community respond to these attacks, we have expanded support of our credential revocation API ( first introduced in April 2025 for personal access tokens ) to support the revocation of GitHub OAuth and App tokens. This allows the quick and self-service revocation of these leaked credentials, regardless of where they are found, and limits the lifetime during which they can be abused.
What’s Next?
Making our products more secure by default is a priority across npm and GitHub and we are prioritizing this work to target and disrupt supply chain attacks across the open source ecosystem. We’re proud of the work we’ve shipped towards this goal over the past months. There’s more to come, but we wanted to provide an update on the progress we’ve made and make folks aware of the new capabilities available to them. Be sure to follow our changelog and blog posts as we continue to roll out improvements.
Open source software is an incredible public good that we all benefit from, and this is one of several ways GitHub is working to continue to support the security, sustainability, and continued success of open source communities and the enterprises that depend on them.
Tags:
GitHub Actions 
npm 
Security 
supply chain security 
Written by 
Greg Ose 
@gregose 
Principal Product Security Engineer
Zachary Steindler 
@steiza 
Principal Software Engineer, GitHub
GitHub Actions 
npm 
Security 
supply chain security 
Table of Contents
Anatomy of supply chain attacks
Initial compromise
Exfiltrate credentials
Propagating the attack
Identifying and responding to supply chain attacks
What’s Next?
More on GitHub Actions 
Marketing ops as code: Automating events from planning to follow-up on GitHub 
If you can write down how you do your work, you can automate it. Here’s what I did to support GitHub’s APAC marketing team.
Tomoko Tanaka 
Your alt text passes automated checks. That doesn't mean it's any good. 
We built a plugin for the GitHub Accessibility Scanner to make sure your alt text is actually accessible. Here’s how it works.
Taarik Ashenafi & Keenan Zhou 
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