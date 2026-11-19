Securing the open source supply chain across GitHub - The GitHub Blog 
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
Securing the open source supply chain across GitHub
Recent attacks on open source focus on exfiltrating secrets; here are the prevention steps you can take today, plus a look at the security capabilities GitHub is working on.
Zachary Steindler · @steiza 
April 1, 2026 
| 
4 minutes 
Share: 
Over the past year, a new pattern has emerged in attacks on the open source supply chain. Attackers are focusing on exfiltrating secrets (like API keys) in order to both publish malicious packages from an attacker-controlled machine as well as gain access to more projects in order to propagate the attack.
These attacks often start by compromising a workflow on GitHub Actions.
Let’s talk through what you can do today to secure your GitHub Actions workflows, what work GitHub has been doing to secure open source, and what to expect in the coming months for further security enhancements.
What you can do today
Many of these attacks start by looking for exploitable GitHub Actions workflows.
The most critical action you can take is to enable CodeQL to review your GitHub Actions workflow implementation (available for free on public repositories) to inspect your workflows for security best practices.
Next, review our detailed actions security guidance . In particular:
Don’t trigger workflows on pull_request_target .
Pin third-party Actions to full-length commit SHAs .
This pinning should be done by you or Dependabot; be suspicious of external pull requests that update this content.
Look out for script injection when referencing user-submitted content .
When an attack happens, we publish information about compromised dependencies in our Advisory Database . You can get up-to-date information directly from the Advisory Database or use tools like Dependabot (also free for public repositories) to notify you when you have malicious or vulnerable dependencies.
What we’ve done
These attacks follow the same pattern: they focus on exfiltrating secrets to publish malicious packages from an attacker-controlled machine, as well as using those malicious packages to gain access to more projects to propagate the attack.
Instead of using secrets in your workflows, you can use an OpenID Connect token that contains the workload identity of the workflow to authorize activities. We’ve worked with many systems to integrate with Actions this way, including cloud providers, package repositories, and other hosted services.
Specifically, GitHub partners with the OpenSSF to support this security capability, called trusted publishing, in package repositories, which is now supported across npm, PyPI, NuGet, RubyGems, Crates, and other package repositories. Not only does trusted publishing remove secrets from build pipelines, it also provides a valuable signal when a newly published package stops using trusted publishing: the community uses this signal to investigate if the package came from an attacker using exfiltrated credentials.
npm is the largest package repository in the world, with over 30,000 packages published each day. We scan every npm package version for malware, and our detections are constantly updated and improved as attacks evolve. Hundreds of newly published packages contain malicious code daily, so when detected, a human reviews to confirm it’s a true positive before we take action. At this scale, even a 1% false-positive rate would disrupt hundreds of legitimate publishes daily.
What to expect in the coming months
In late 2025 the Shai-Hulud attacks motivated a revamped security roadmap for npm, which we talked about in Our plan for a more secure npm supply chain and Strengthening supply chain security: Preparing for the next malware campaign . In response to Shai-Hulud we accelerated the roll-out of capabilities like npm trusted publishing, continued work on malware detection and removal, and engaged with open source maintainers on what npm security capabilities would have the biggest positive impact. Even when the community agrees a change must be made, those changes can mean that people need to change their workflow, or worse, cause backwards incompatibility. We’re working to provide as smooth a transition as possible.
Similarly, with the most recent round of attacks we are revisiting our security roadmap for GitHub Actions and accelerating actions security capabilities where work was already underway. You can give us feedback on the GitHub Actions security roadmap in the community discussion post .
Where do we go from here?
Open source is a global public good and one of humanity’s greatest collaborative projects. We have not seen the end of attacks on open source, but GitHub is committed to defending it across npm, actions, or whatever comes next. As we work on rolling out these security capabilities, we look forward to your feedback on what’s most impactful and how we manage the transition to a more secure future.
Tags:
CI/CD 
GitHub Actions 
GitHub Security Lab 
supply chain security 
Written by 
Zachary Steindler 
@steiza 
Principal Software Engineer, GitHub
CI/CD 
GitHub Actions 
GitHub Security Lab 
supply chain security 
Table of Contents
What you can do today
What we’ve done
What to expect in the coming months
Where do we go from here?
More on CI/CD 
What's coming to our GitHub Actions 2026 security roadmap 
A look at GitHub Actions’ 2026 roadmap, outlining how secure defaults, policy controls, and CI/CD observability harden the software supply chain end to end.
Greg Ose & Stephen Glass 
Let’s talk about GitHub Actions 
A look at how we rebuilt GitHub Actions’ core architecture and shipped long-requested upgrades to improve performance, workflow flexibility, reliability, and everyday developer experience.
Ben De St Paer-Gotch 
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