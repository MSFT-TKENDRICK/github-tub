How GitHub used secret scanning to reach inbox zero - The GitHub Blog 
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
Home / Security / Application security 
How GitHub used secret scanning to reach inbox zero
GitHub had 20,000+ secret scanning alerts across 15,000 repositories. Here’s how we separated signal from noise, built remediation workflows, and reached inbox zero in nine months.
Michael Recachinas · @mrecachinas 
July 2, 2026 
| 
Updated July 9, 2026 
| 
9 minutes 
Share: 
Several years ago, GitHub Security launched an initiative to assess and improve our overall secrets hygiene. As part of that effort, we piloted the Secret Scanning capability that was under development at the time. That’s when we found more than 20,000 secrets spread across our 15,000+ repositories.
The number was significantly higher than we anticipated, but it quickly became clear that success would depend on identifying which alerts represented real risk, assigning ownership, and remediating them safely. Nine months later, we reached zero open alerts.
New secret scanning customers often ask us: “How do you manage this internally? How did you actually clean up your existing secrets?”
Like many long-running software companies, GitHub’s approach to secrets management evolved over time. GitHub was founded in 2008, before today’s centralized vaults, automated secret scanning, and dedicated secrets-management platforms were common across the industry. As engineering practices matured and GitHub grew, we continued investing in stronger controls, better tooling, and systematic risk reduction for legacy patterns. This work reflects our ongoing commitment to improving security, reducing exposure, and ensuring our internal practices meet the same high standards we expect across the industry.
This blog post shares what worked for us during this effort, and highlights strategies you can apply to better protect your own secrets.
Cutting out the noise
The first thing we discovered was that the alert count was a bit misleading—i.e., 20,000 alerts did not mean 20,000 equally risky problems.
When we dug into the data, we discovered that just five repositories accounted for roughly 18,000 of those alerts, and every one of those secrets was inactive: test fixtures, deactivated credentials, and fake-but-valid-looking secrets used for testing. (We build secret scanning, so naturally we have repositories full of legitimate-looking secrets in tests.)
That left over 2,000 alerts that needed attention: potential live credentials and thousands of decisions about risk, rotation, and remediation.
Secrets don’t just live in code
Secret remediation touched more than source code. We found secrets in support tickets (customers occasionally include tokens), bug bounty reports (researchers disclose what they found with complete reproductions, including API requests with tokens used), incident notes, and wiki pages.
We partnered with customer support, security incident response, and our bug bounty program to develop shared playbooks. Across all these workflows, we had to ensure we weren’t creating new problems, like opening issues or pushing commits containing the very secrets we were trying to remediate.
Our phased approach
We were not going to close 20,000 alerts by asking a few security engineers to grind through them one by one. We treated it like any other operational backlog: stop new debt, then work down what already exists with a workflow that’s repeatable, measurable, and not dependent on one person’s institutional knowledge.
Phase 1: Enable everywhere, stop the accumulation
Before cleaning up existing secrets, we had to stop new ones from piling up.
We enabled secret scanning and push protection across all of our enterprises and organizations. Thanks to GitHub Advanced Security’s organization-level settings, this wasn’t a repository-by-repository slog across 15,000 repositories. We enforced the setting so individual repositories and teams could not quietly opt out.
Push protection blocked new secrets at the source. That kept the backlog from growing faster than we could burn it down.
Phase 2: Understand and triage
We broke down the 20,000+ alerts by repository, secret type, and age so we could separate noise from work.
When we dug in, we discovered that just five repositories accounted for roughly 18,000 of those alerts, and every one of those secrets was inactive: test fixtures, deactivated credentials, and fake-but-valid-looking secrets used for testing. (We build secret scanning, so naturally we have repositories full of legitimate-looking secrets in tests.)
For high-volume, low-risk alerts, we developed criteria for bulk closure. If a secret was in a dedicated test repository, had never been active, and matched a known test pattern, we could confidently mark it resolved. In a matter of days, we closed out roughly 18,000 alerts.
The hard questions
We had to make strategic decisions about how to remediate secrets. When a secret lives in an issue, do you edit the body (and potentially remove revision history), or preserve the audit trail? When a secret is committed to a repository, do you rewrite git history? Anyone who’s tried rewriting git history at scale knows what happens next: force-pushes break open pull requests, invalidate commit SHAs, and generally interrupt developers.
A common question was: “Can we just delete the repository if it’s no longer in use?” Our answer was generally no. A deleted repository takes its audit trail with it. If a secret in that repository was ever leaked or the repository was ever compromised, you lose the forensic record you’d need during incident response. Rotate the secret, archive the repository if appropriate, but keep the history.
Whenever possible, we rotate or revoke the exposed secret first. The harder question is whether the residual risk warrants rewriting git history, or whether a revoked secret in history can safely be left in place. These are the types of questions and decisions present with each alert that product security teams wrestle with.
Phase 3: Validate what’s actually live
A credential sitting in a repository might have been rotated years ago, or it might still unlock production systems. You can’t prioritize without knowing the difference.
At the time, secret scanning didn’t have native validity checking, so we built our own approach. The goal was narrow: determine whether a credential still worked and, when appropriate, collect enough metadata to route the alert or notify the right owner.
For example, for a GitHub token, a representative check could make a single authenticated request to a low-impact endpoint like GET /user:
response="$( 
curl -sS -w '\n%{http_code}' \ 
-H "Authorization: Bearer $TOKEN" \ 
-H "Accept: application/vnd.github+json" \ 
-H "X-GitHub-Api-Version: 2022-11-28" \ 
https://api.github.com/user 
)" 
status="${response##*$'\n'}" 
body="${response%$'\n'*}" 
case "$status" in 
200) 
login="$(jq -r '.login // empty' <<< "$body")" 
echo "token appears active for GitHub user: $login" 
;; 
401) 
echo "token appears invalid or revoked" 
;; 
403|429) 
echo "unable to determine validity; rate-limited or blocked" 
;; 
*) 
echo "unable to determine validity: HTTP $status" 
;; 
esac 
Remember, our goal was to answer the smallest useful set of questions: does this credential still work, and who needs to know about it? We treated ambiguous responses as inconclusive, and we avoided follow-on requests to repositories, organizations, or other private resources.
This required close partnership with our privacy and legal teams. Even a “read-only” validity check can have implications when you’re touching a credential you may not own.
As we worked through this manually, our product team built the solution natively, which made the remaining work much faster. Validity checking is now built into GitHub secret scanning.
Phase 4: Figure out who owns what
That cross-functional work also exposed an ownership problem: even after we knew a credential was active, we still had to figure out who could rotate it.
We partnered with customer support, security incident response, and our bug bounty program to develop shared playbooks for secrets reported outside of code. That included redacting secret values before routing work to teams, determining whether a credential belonged to GitHub or a customer, and notifying affected customers or researchers so they could rotate tokens under their control. Across all these workflows, we had to ensure we weren’t creating new problems, like opening issues or pushing commits containing the very secrets we were trying to remediate.
For GitHub-issued credentials like personal access tokens, we worked with our product team to surface secret metadata directly in the alert: who created the token, when, and what scopes it had. That meant we didn’t need to use the token itself to figure out who it belonged to.
For everything else, ownership was harder, and this exposed a deeper problem: not all repositories had clear owners.
Our internal engineering standards (the Engineering Fundamentals program) enforce durable ownership on services, and we maintain a mapping between services and repositories, but not all repositories map cleanly to a service. The pain we experienced led to a broader repository ownership initiative (using GitHub’s Custom Properties), plus a parallel effort to ensure all secrets in our credential manager have durable owners. You can’t rotate a secret if you can’t find the owner.
Phase 5: Manual triage for the long tail
Even with validation and metadata, a long tail of alerts required human judgment. For each one: what does this grant access to, has it been rotated, who owns the connected system, and what’s the remediation path?
For every alert we dismissed, we ensured an accurate disposition (e.g., revoked, used in test, false positive) was recorded, along with a comment containing relevant context, such as a link to a remediation issue or an approved security exception.
This phase required close collaboration across teams to identify system owners, validate remediation status, and assess residual risk where automated signals alone were insufficient.
Phase 6: Systematize and drive accountability
As patterns emerged, we made the work scalable:
We routed alerts into our internal vulnerability management platform for centralized tracking and reporting.
Different credentials need different remediation steps. We documented playbooks by secret type so teams could self-serve.
We automated notifications, routing alerts to the right teams based on repository ownership.
The final piece was accountability. We tied secret remediation to GitHub’s Engineering Fundamentals program, making it a security fundamental that teams were measured against. We set clear expectations and gave teams visibility into status. When secret hygiene is part of how engineering health is measured, it becomes a shared responsibility across the organization.
Nine months after we started, we hit inbox zero.
Lessons learned
Don’t panic at the number. Our initial count was 20,000+ alerts, but 90% were not valid. The raw count is almost never the real scope of work.
Enable and enforce everywhere, no exceptions. Partial rollouts create blind spots. We enabled and enforced secret scanning and push protection at the enterprise level, without allowing anyone to opt out.
Validate before you escalate. Not every detected secret is live. Validation helps you create a prioritized to-do list.
Metadata saves hours. For GitHub credentials, secret metadata cut down the necessary detective work. If you’re working with third-party providers, push them to surface similar metadata, or build your own enrichment layer.
You can’t remediate without ownership. Invest in durable ownership infrastructure early.
Automate the workflow after detection. Detection gets you started, but the operational challenge was routing alerts, tracking owners, and closing the loop. Invest in the workflow layer.
Make it everyone’s problem. Security teams can’t remediate thousands of alerts alone. We tied secret hygiene to our Engineering Fundamentals program. When leadership watches the dashboards, teams find time to fix things.
Document your decision framework. You’ll encounter secrets without clean remediation paths. Document how you decide: When is rotation sufficient? When do you rewrite history? When do you accept residual risk?
What this means for you
You don’t need to reinvent most of what we built. Many of our manual workarounds, including validity checking, ownership identification, and bulk triage, are now native features in secret scanning.
If you’re starting today:
Enable and enforce secret scanning and push protection everywhere.
Triage the backlog by repository and secret type; bulk-close what you can prove is noise.
Validate what’s live before you escalate.
Route alerts to owners, and track remediation like any other engineering work.
Ready to get started? Learn how to enable secret scanning and push protection with GitHub Advanced Security .
Read next: How we tackled repository ownership at scale , and why durable ownership of repositories and secrets is the foundation everything else depends on. 
Tags:
GHAS 
push protection 
Secret Scanning 
Written by 
Michael Recachinas 
@mrecachinas 
Michael Recachinas is a Staff Security Engineer at GitHub, where he leads large-scale security programs focused on vulnerability management, secure development lifecycle tooling, and developer-first security automation. He has spent his career building systems that operate at scale and help teams make the secure choice the easy choice.
GHAS 
push protection 
Secret Scanning 
Table of Contents
Cutting out the noise
Secrets don't just live in code
Our phased approach
Phase 1: Enable everywhere, stop the accumulation
Phase 2: Understand and triage
Phase 3: Validate what's actually live
Phase 4: Figure out who owns what
Phase 5: Manual triage for the long tail
Phase 6: Systematize and drive accountability
Lessons learned
What this means for you
More on GHAS 
6 security settings every GitHub maintainer should enable this week 
These six free settings will not make your project unhackable. Nothing will. What they will do is close the easy doors. Turn these on, and your project will be meaningfully harder to attack than it was before.
Joseph Katsioloudes 
Investing in the people shaping open source and securing the future together 
See how GitHub is investing in open source security funding maintainers, partnering with Alpha-Omega, and expanding access to help reduce burden and strengthen software supply chains.
Kevin Crosby 
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