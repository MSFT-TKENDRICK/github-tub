Improving site performance by shipping more CSS - The GitHub Blog 
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
Home / Engineering / Architecture & optimization 
Improving site performance by shipping more CSS
How we fully migrated github.com away from CSS-in-JS.
Josh Black & Marie Lucca 
September 25, 2026 
| 
8 minutes 
Share: 
The Primer Design System powers many of the experiences you see on GitHub today. From buttons to banners to breadcrumbs, these foundational components are required to be accessible, flexible, and performant across a wide variety of scenarios.
Back in 2023, the number of components on certain pages began to explode. This led to several performance-related challenges with our existing CSS-in-JS solution:
Initial page loads took longer due to styles being initialized on the client
Server-side rendering performance declined as style collection shifted from the client
Updates to styles grew out of control as component count grew on a page
It became clear that the Primer team needed to address the issue at the source. We needed to find an alternative that would completely avoid the client and server costs that we were seeing with our current solution. Most importantly, any alternative we pick would need to work in a way that would avoid any breakage to GitHub during the migration.
Introducing CSS (Modules)
The Primer team found a solution that met all of our criteria: CSS Modules . This format would allow us to do one of our favorite things: write and use native CSS features, while still allowing some amount of the colocation and encapsulation that we had come to expect from CSS-in-JS.
With CSS Modules, styles would be authored in a CSS file alongside the JavaScript source for the component. It would also allow us to treat all class names as local by default, preventing some of the collisions and challenges that can come from global selectors. This format also removes the need for any client or server runtime behavior. Instead, styles would roll up into CSS stylesheets that were sent as part of the HTML for a page.
However, this solution was radically different from the CSS-in-JS solution we had at the time. This change would require an update to every Primer component and every component at GitHub authored using this technique. Thankfully, design systems are a perfect vehicle to deliver this kind of change at scale.
A gradual march towards CSS Modules
The situation for moving towards CSS Modules was clear. The Primer team would need to deliver updates to each of its components, moving them from CSS-in-JS to CSS Modules. At the same time, updates we made to these components could not break any usage in GitHub. Finally, the underlying technique we used for CSS-in-JS also had to continue working for any components in GitHub that were currently using it.
With all these constraints in place, we decided on an incremental migration strategy that would allow us to safely ship component updates without breaking the world. For each component, our plan was to:
Add a new file that translated existing styles to CSS Modules
Add the component to a feature flag that would toggle between the new and old styles
Use existing visual regression tests to verify snapshots were identical between our CSS-in-JS solution and CSS Modules
Gradually roll out the feature flag to our team, then to GitHub staff, and finally to all GitHub users to catch any issues along the way
This process created a strong feedback loop where issues were flagged early in the process as Primer continuously delivered these changes to GitHub. The use of feature flags allowed us to do this migration safely while giving us clear signals on the performance benefits of CSS Modules.
By December 2024, all components in Primer were migrated over to CSS Modules using this process. We saw performance wins across the board, in particular:
55% less time to server-side render a page
25% less time for components on a page to initialize
With clear performance wins from doing this work in Primer, we began to wonder if we could see similar performance wins by doing these conversions in other parts of GitHub. Similarly, how long until we could ultimately drop support for CSS-in-JS across the company?
Moving away from CSS-in-JS at GitHub
One of the trickiest parts about removing our CSS-in-JS solution from Primer was due to the usage of the sx prop. This prop was the way to style and customize components from Primer. Teams could provide an inline object to customize everything about the component. It represented the best and worst parts of CSS-in-JS:
Excellent TypeScript support with integration with our Design Tokens
Co-located with the component so that everything was in one place
High runtime cost due to the dynamic nature of inline objects used for sx 
Difficulties scaling as the number of components using sx on a page grew
As a result, the first part of our journey to move away from CSS-in-JS was to reduce sx usage across GitHub. This would allow us to immediately improve performance similar to the wins we saw when migrating Primer components. It also set us up perfectly for removing CSS-in-JS entirely from the product.
The Duality of Primer
It’s important to note that, while the design system itself was officially off styled-components , a large part of the GitHub codebase itself wasn’t. With sx props having been the de facto styling standard at GitHub for years, we were looking at thousands of sx props that needed migration before we could even think of getting GitHub onto the sleek new @primer/react version which didn’t rely on styled-components .
So… how did we do this immense amount of work while increasing confidence and reducing risk? The answer: not all at once.
The original CSS migration was a little bit more nuanced than we led on: in addition to migrating the components to CSS modules, feature flagging to test in production and slowly rolling them out, we also created “wrapper” components in a transitive library we called @primer/styled-react . The whole purpose of this package was to allow sx usage into the newly migrated components. This way, the instances of the GitHub UI codebase that were using this prop could continue to consume them by importing the same component through @primer/styled-react , while we realized the performance gains of importing straight from @primer/react for the cases that didn’t.
Styled Box Zero
The next phase of the migration process was as follows:
On a package-by-package basis:
Translate all sx usage into equivalent CSS modules files. This included cross referencing (See migrating to CSS variables )
Replace @primer/styled-react imports with @primer/react imports
Test in pre-production
Deploy
Curiously enough, while we were getting ready to undertake this massive effort, styled-components maintenance mode was announced, offering further confirmation that we were taking steps in the right direction.
The work kicked off April 2025 with a peak of ~7,760 sx props to be migrated; we wouldn’t see it realized until May 2026. Initially, one of our great in-house developers, Ian Sanders, created a VS Code plugin that would assist with per-prop migration. A similar codemod was developed internally and utilized to migrate entire files in the GitHub codebase. The work, while requiring a bit of manual oversight and careful validation, was mostly automated. A rotation of 8 engineers migrated 6,419 props over the course of 6 months, observing Server-Side Rendering time performance gains ranging from 1% up to 22% in some pages.
In a different side of GitHub, Copilot’s capabilities were increasing exponentially. AI was getting smarter, more capable; we released Copilot coding agent and Copilot code review while this work was still underway.
By the time we picked this work back up, now April of 2026, the panorama was different; we were able to get down from 895 to 0 sx props in the span of three weeks with a team of two engineers, relentless determination, and a whole lot of Copilot coding agents.
Battle of the themes
It was a big day: we had finally completed the sx migrations that were standing between us and full styled-components removal, years in the making… we can finally clean up these dependencies and move on to different, more exciting work, right? Wrong!
GitHub supports seven different themes , all of which offer a high contrast mode variation. All of it enabled through, you guessed it, styled-components . Before we can even think of removing these dependencies, we need to decouple our theming.
Now, this isn’t as huge a deal as it sounds. Our theming variables have always been defined in CSS through our @primer/css package, and we already planned forward for non-styled Theming when we migrated @primer/react in late 2025. It’s the JavaScript usage and utilities that are enabled by styled-components that we needed to remove. Once again, we got to work.
You know the drill by now: perform the migrations, roll it out slowly, feature flag everything. Two months and a few hiccups along the way later, we were all-systems go for dependency removal; we even feature flagged that. Better safe than sorry.
All’s well that ends well
GitHub has been running on 100% CSS modules as of June 2026. The safeguards we put in place enabled us to roll out significant architectural changes safely, stress test in production, catch errors, pivot and repair efficiently, ultimately allowing us to succeed in our goals and realize great performance gains along the way.
What looked at first like a CSS migration turned out to be a gradual re-platforming of how GitHub styles, themes, and ships UI at scale. By the end, we had not only removed sx , styled-components , and styled-system from dotcom, but completed it without breaking GitHub along the way. Enhancing the performance, user experience and delight of our products continues to be top of mind for all of us here at GitHub.
Tags:
automation 
CSS 
design systems 
performance engineering 
Primer 
scripting 
Written by 
Josh Black 
@joshblack 
Josh Black is a Software Engineer based in Austin, Texas. He loves working on Design Systems, creating accessible experiences, and eating chilaquiles.
Marie Lucca 
@francinelucca 
Marie is an Atlanta-based Software Engineer on GitHub Primer. If she's not pushing pixels, she's probably pushing a carry-on into an overhead bin somewhere over the Atlantic.
automation 
CSS 
design systems 
performance engineering 
Primer 
scripting 
Table of Contents
Introducing CSS (Modules)
A gradual march towards CSS Modules
Moving away from CSS-in-JS at GitHub
The Duality of Primer
Styled Box Zero
Battle of the themes
All’s well that ends well
More on automation 
Staying Evergreen: How we automated secure access and repo hygiene in a shared org 
Put native GitHub features to work to review outside collaborator access and archive stale repositories.
Greg Mohler 
Marketing ops as code: Automating events from planning to follow-up on GitHub 
If you can write down how you do your work, you can automate it. Here’s what I did to support GitHub’s APAC marketing team.
Tomoko Tanaka 
Related posts 
Architecture & optimization 
The bridge to agent-scale Git infrastructure 
We moved a copy of 99.99999% of GitHub’s repositories to Azure. Here’s how per-reference quorums will bring over the rest, and how object storage lets reads scale independently.
Eleanor White & Victoria Dye 
Engineering 
Staying Evergreen: How we automated secure access and repo hygiene in a shared org 
Put native GitHub features to work to review outside collaborator access and archive stale repositories.
Greg Mohler 
Architecture & optimization 
From 2,500 requests to 24: Rebuilding star history without the stargazers 
Our new repo star history API now provides trends without returning individual identities or requiring unbounded database work. These are the engineering tradeoffs we made.
Taylor Cuilty & Sarita Iyer 
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