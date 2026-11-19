How we make AI coding more cost efficient without sacrificing task quality - The GitHub Blog 
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
How we make AI coding more cost efficient without sacrificing task quality
Why shorter outputs can cost more, and how GitHub Copilot reduces wasted work across the complete coding task.
Erik Kristensen & Napalys Klicius 
September 2, 2026 
| 
11 minutes 
Share: 
Output quality is important when working with AI coding agents, but true efficiency comes from getting work done quickly, efficiently, and with the right context.
That’s why token count of individual interactions alone isn’t a meaningful measure of efficiency. The goal shouldn’t be to use fewer tokens, but to tap into the right amount of context to move a task forward. A concise tool response can sometimes require additional calls or work if it leaves out information the agent needs, ultimately making the task slower and more expensive.
That’s why we want to optimize for the outcome rather than the tool call. This post examines four changes in GitHub Copilot that put that principle into practice:
Preserve useful context while reducing repetitive output.
Remove formatting that adds no value to the task.
Shorten instructions without changing useful behavior.
Deliver completed background work without an extra retrieval step.
Possible changes were evaluated offline using agentic coding benchmarks. The most promising changes were then validated through controlled online experiments before shipping. The examples in this post come from GitHub Copilot CLI. Multiple other Copilot products, such as the GitHub Copilot app and Copilot code review, use the same underlying harness and also become more efficient through these improvements.
Figure 1: Four independent A/B experiments using the same AI-credit metric. The segments are shown together for comparison; their effects are not necessarily strictly additive. 
The local metric trap
It’s common to shorten the output from each tool call as a way to reduce agent costs. RTK (Rust Token Killer) is a utility that shortens shell output before an agent reads it. We evaluated its effect on GitHub Copilot using our agentic coding benchmarks.
In our harness and benchmark configuration, RTK shortened some responses, but when the omitted text mattered, the model sometimes reopened the original output or reran the command to recover what it needed.
Those recovery steps added turns and carried more context forward. The individual tool response was shorter, but on average, the task used more tokens and took longer. We saved tokens locally and spent more globally.
Figure 2: A shorter tool response can make the completed task more expensive when missing details force the agent to reread output, rerun commands, and carry more context forward. 
This result applies to the integration and workloads we tested, not to every RTK configuration or to output compression in general. This meant that tokens per tool call is the wrong objective. An efficiency change has to be evaluated across the complete task, from the user’s request through the final result.
More useful was to look at what can we remove without making the model repeat work.
Compress noise, preserve useful information
The goal was to shorten repetitive output while preserving the context an agent needs to complete its task without retracing steps.
Analysis of benchmark runs showed that install, build, test, and lint output often contains repetitive noise, while source-like output and arbitrary command results are more likely to contain the information an agent needs. That analysis informed a selective output compressor, informed in part by RTK and similar approaches.
The prototype was evaluated on agentic coding benchmarks and a range of open source repositories, exercising their build, test, and lint systems.
Early versions were too aggressive. They made the model repeat work or read the full saved output, increasing end-to-end cost and reducing task success. For example, we initially compressed git diff but removed that filter after benchmark tasks showed agents reopening the original output to recover missing information.
Those early failures led to a three-part policy:
Preserve source-like and arbitrary output. Commands such as cat , git diff , git show , and arbitrary scripts are returned unchanged.
Reorganize search results without dropping content. Matches and file lists from tools such as grep can be grouped more efficiently while retaining every result.
Compress repetitive noise selectively. Install, build, test, and progress output is compressed only when the savings are substantial.
The shipped version emerged through repeated evaluation and refinement. It is conservative not because the goal was to build a conservative compressor, but because that is what the evaluations supported.
When output is compressed, the agent can still retrieve the complete original through a direct recovery path.
Figure 3: The shipped compressor preserves source-like output, reorganizes search results without loss, and compresses only predictable repetitive noise while retaining the full original. 
That recovery path is both a safety mechanism and an evaluation signal. We tracked whether the agent opened the saved original, reran commands, repeated exploration, narrowed its searches, or took additional turns. Frequent recovery would indicate that the compressor had removed something valuable.
On offline tasks where output compression triggered, no statistically significant task-success regression was detected, and agents extremely rarely opened the saved originals. In the online experiment, average cost decreased slightly with no material regression detected in the tracked quality metrics.
Remove formatting before removing information
One clean token optimization came from the view tool, which agents use to read file contents into context.
Previously, view prefixed every line with a number before showing the contents to the model. Earlier file-editing tools used those numbers to target changes, but current tools instead match surrounding code and do not use line numbers. The line-number prefixes remained even though the normal workflow no longer used them.
Each prefix was small. Repeated across every line and every file read, however, that unused formatting accumulated throughout a session. So, we removed it.
Figure 4: Removing line-number prefixes preserves the source exactly while eliminating formatting that was repeated across every file read. 
Line numbers remain useful in diffs and short snippets. They were wasteful here because they were attached to every file read without serving the current editing workflow.
Removing them caused model-inference cost to fall by roughly 5% in offline agentic coding benchmarks. Success rates stayed within the expected run-to-run variance, and edit failures did not increase.
We then tested the change with Copilot CLI users. The online experiment reduced average daily model-inference cost per user by about 3%, with no material regression detected in the quality or satisfaction metrics we tracked.
For developers, that means more of the context window is available for the work itself rather than formatting the agent does not use.
This was the ideal change: no new instructions for the model, no source of information to recover, and no additional decision to make. The file contents reached the model unchanged.
Compress prompts without compressing intent
Prompts carry instructions that shape how an agent works, and they are sent to the model on every turn. Shortening them only improves efficiency if the agent keeps the behaviors developers depend on.
In GitHub Copilot, the task tool launches specialized agents for parallel work. Its guidance had accumulated across tool descriptions, schemas, agent definitions, system instructions, and companion tools.
A meta-prompting loop, in which Copilot iteratively wrote its own prompt, reduced that prompt by roughly half. Copilot produced and refined smaller candidates, and targeted behavioral tests checked the requirements we wanted to preserve.
The first online experiment found a regression that the initial offline evaluations had missed. The meta-prompting loop had rewritten cautious parallelism guidance into a hard scheduling policy, causing independent custom agents to run sequentially.
We stopped the experiment. Before changing the prompt again, we wrote a regression evaluation for the behavior users had exposed. The eventual fix replaced an explicit allowlist and denylist with one sentence:
Independent agents can run in parallel; consider side effects. 
That sentence was shorter and less restrictive; it deferred the choice of whether to run sub-agents in parallel to the model instead of the previous explicit guidance. With it, our new behavior test passed without causing any existing behavioral tests to fail.
Prompt behavior needs tests. If a behavior is not tested, a shorter prompt can remove it without anyone noticing. 
Figure 5 Prompt compression became safe only after a regression test exposed serialized agents and a one-sentence fix restored parallelism; the resulting token savings recur on every model turn. 
The shipped prompt removes about 1,300 task -tool prompt tokens per turn, corresponding to approximately 1.8% fewer total prompt tokens per session and 2.9% lower normalized cost per active hour, with no quality regression detected in the measured evaluations.
Deliver completed background work without an extra retrieval turn
Agents often run independent work in the background, such as a long-running shell command alongside a sub-agent investigation. Notifications let the agent continue until that work is ready without spending a tool call waiting.
If the agent does not explicitly wait for either task, the harness wakes the model and notifies it when the shell command or sub-agent finishes.
Previously, that notification did not include the completed result, so the agent had to spend another turn retrieving output Copilot had already received. When several tasks finished close together, that detour could repeat. Copilot now batches eligible completion notifications and delivers completed results directly in the existing tool-result format. The agent can continue with the information it needs, without spending an extra turn asking for it again. Explicit reads for work that is still running behave as before.
Figure 6 Before, each background completion could wake a retrieval-only model turn. After, the harness batches eligible completions and delivers completed results in the existing tool-result format. 
Before this change, each completed task required one model call to request its result and another to process it. For the shell command and sub-agent shown above, that meant four model calls before work could continue.
Now, the harness batches both completions and supplies their results together, so a single model call can process both. Removing those retrieval detours also avoids carrying the full session context through unnecessary calls.
By delivering completed results directly, without compressing, summarizing, or withholding anything, the harness reduced average token-related usage, as measured in AI Credits, by about 2.3%.
Measure changes in context
A change that saves tokens in one Copilot workflow can increase costs in another.
For example, a tighter set of file-tool instructions was inspired by positive results in Copilot code review. In a Copilot CLI online experiment, it increased cost, so we did not ship it.
By contrast, removing line-number prefixes and selectively compressing output each reduced average prompt tokens per review by roughly 5% in independent evaluations across a large set of Copilot code review tasks using the production model. We detected no material change in the tracked review-quality metrics.
These findings are separate from the earlier migration of Copilot code review to the shared file tools , which, together with review-instruction tuning, reduced code review cost by about 20%.
Each change needs to be measured in the workflow where it runs.
Five lessons for building efficient AI coding agents
Optimize the completed task, not the tool call. Shorter output is not cheaper if the agent spends more turns recovering what was removed.
Optimize orchestration, not just model output. Eliminate model turns that perform work the harness can complete deterministically.
Compress by what the output represents. Preserve exact content, prefer lossless transformations, and measure how often agents use the recovery path.
Prompt rewrites sometimes have unintended consequences. Validate that intended behavior is preserved.
Evidence is local to the workload. Re-evaluate changes in offline benchmarks, online experiments, and every product surface where they ship.
None of these changes made the model smarter. They removed work the model never needed to do.
The changes described in this post are shipping across GitHub Copilot experiences that use the same underlying harness.
Bring agentic workflows to your terminal
with GitHub Copilot CLI > 
Tags:
agentic AI 
GitHub Copilot 
GitHub Copilot CLI 
GitHub Copilot code review 
LLMs 
prompt engineering 
Written by 
Erik Kristensen 
@erik-krogh 
Erik Krogh Kristensen is a Staff Software Engineer at GitHub building at the intersection of AI, coding, and security. In the last few years at GitHub he's worked on an assortment of AI products such as Copilot Autofix, Copilot Code Review, and most recently Copilot CLI. He's a trusted source of how to make AI coding products better and more efficient.
Napalys Klicius 
@Napalys 
Napalys Klicius is a Software Engineer at GitHub building agentic systems. His career has taken him from model checking to low-level C++ drone systems and static analysis, and more recently to teaching agents how to inspect code without getting lost.
agentic AI 
GitHub Copilot 
GitHub Copilot CLI 
GitHub Copilot code review 
LLMs 
prompt engineering 
Table of Contents
The local metric trap
Compress noise, preserve useful information
Remove formatting before removing information
Compress prompts without compressing intent
Deliver completed background work without an extra retrieval turn
Measure changes in context
Five lessons for building efficient AI coding agents
More on agentic AI 
AI-powered fuzzing with the GitHub Security Lab Taskflow Agent 
In this blog post, I explain how to use the new fuzzing taskflow based on the GitHub Security Lab Taskflow Agent AI framework. 
Antonio Morales 
Decoding the new AI lingo: Loops, harnesses, squads, hill climbing... oh my! 
From loop engineering to harnesses, squads, and open weights, the GitHub Podcast breaks down the AI terms showing up in developer conversations.
Cassidy Williams 
Related posts 
Architecture & optimization 
Inside GitHub’s new Git storage architecture 
GitHub’s new Git storage architecture is built so thousands of agents can push to a single repository at once. Here’s how it works.
Karthik Raman & Brian Celenza 
Architecture & optimization 
The bridge to agent-scale Git infrastructure 
We moved a copy of 99.99999% of GitHub’s repositories to Azure. Here’s how per-reference quorums will bring over the rest, and how object storage lets reads scale independently.
Eleanor White & Victoria Dye 
AI & ML 
How 3 Java Champions are using GitHub Copilot for increased productivity 
Three Java Champions share how they use GitHub Copilot to solve problems, accelerate development, and keep humans responsible for the results.
Julien Dubois 
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