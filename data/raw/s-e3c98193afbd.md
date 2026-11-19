Agent Functions 
GitHub Next Home Home Projects Posts Talks People 
Home Projects Posts Talks People 
GitHub Next on Mastodon GitHub Next on Bluesky GitHub Next on X GitHub Next Discord GitHub Next RSS feed 
p:first-of-type::first-letter]:float-left [&>p:first-of-type::first-letter]:ml-[0.03em] [&>p:first-of-type::first-letter]:mr-3 [&>p:first-of-type::first-letter]:mt-[0.1em] [&>p:first-of-type::first-letter]:text-[3.5em] [&>p:first-of-type::first-letter]:leading-[0.76] [&>p:first-of-type::first-letter]:font-bold [&>p:first-of-type::first-letter]:text-gray-900"> Back to Posts 
Agent Functions 
Prompts are programs. You wouldn’t write a complex program completely from scratch, in a big, soupy loop without subroutines, and then write it again the next time you wanted to run it. Why let your agent work that way? 
Russell Horton May 22, 2026 
We’re asking agents to be engineers, but we haven’t given them the basic building blocks of modern software development. They code like they’re trapped in a REPL; they’re skipping the part where they actually write programs.
Agent Functions is a proposal to structure agentic work around simple, reusable functions that encapsulate task execution, using four core primitives: functions, types, registries and microVMs. 1 
Generalizable tasks are structured as typed functions.
Tasks, types and implementations are shared, tested, evaluated and benchmarked in the registry.
Implementations are inherently executable, in locked-down microVMs with minimal capabilities tailored to the task.
Planning agents describe work they need to perform and look up relevant tools in the registry, writing new ones as necessary.
Execution agents receive only the precise tools they need. Implementation details and execution traces stay out of agent context.
Encapsulation
A good program only imports the tools it actually uses. The caller of a tool is unconcerned with how the tool works, and the tool runs in its own scope.
With agents, we often give them as many tools as we imagine they could possibly need, and force them to read details about each tool’s usage and implementation. When they use the tool, they often see everything that happens during the tool’s execution.
This is bad. Every token in the outer agent context is precious, and ought to be aggressively minimized, for several reasons:
excess tokens diffuse attention and lead to compaction, lowering performance
every token costs money, and the outer agent probably uses your most expensive model
every token adds latency
every token increases the risk of prompt injection, or just poor decision making
The agent’s work gets better, cheaper, faster and safer with every token we can shift from the outer agent into a cheaper, more constrained agent, or ideally, into deterministic code.
Reuse
Agents mostly write and discard nonce code and reactively orchestrate work each time they perform a task, even a task they’ve performed thousands of times before. They lack the ability to query for existing implementations for their task, and to save code and workflows they’ve built for future reuse.
It’s just as wasteful for LLMs to work in this manner as it would be for human programmers. But agents lack the taste, dignity and agency to demand something better, so we must force it upon them.
The benefits of vetted, trusted and validated code do not evaporate in the agentic era. A function that has been heavily evaluated and iterated on for a given task is likely much better than one the agent creates in the moment. It can be executed with precisely the minimal privileges it requires, and if agentic, with the smallest model for which evals show acceptable performance. And of course, it’s much cheaper and faster to retrieve a quality implementation for a task than to write one from scratch.
But [skills, MCP, progressive disclosure, subagents, …] handle this
Skills and MCPs encourage reuse, but they are typically overweight and overprivileged, consuming excessive context and introducing unnecessary risk. And agents are still distressingly bad at choosing the best tools to use. 2 
Progressive disclosure, sub-agents, workflow orchestration frameworks, skill distillation, skill libraries, etc, partially address some of these issues, but adoption of these techniques varies widely, and leveraging them requires substantial work from developers.
Make Agents Write Programs
Rendering diagram...
Agent Functions planning and execution flow 
In the Agent Functions paradigm, the agent is forced to write a program to perform the work, the way a human programmer would.
First, the planning agent elaborates the user request in natural language, framing the major steps as abstract functions: processes that take some inputs and produce some output or effect.
This high-level formulation gets mapped to specific task definitions, which are formalized abstract functions with concrete input and output schemas, but no implementation. If no suitable schema or task definitions exist in the registry, an agent is deployed to create and add them.
Crucially, task definitions include declarative capabilities that restrict privileges to the bare minimum required to perform the work. Task definitions also include tests that every implementation must satisfy, and evals and benchmarks to show the implementation’s accuracy and performance.
The registry is queried to find the most suitable implementations for the tasks, according to user preferences around cost, accuracy, latency, etc. If no implementations are available for a given task, an agent is dispatched to write one. Implementations can be pure code, or may involve the use of models and agents.
Once we have concrete implementations for all tasks, we wrap these implementations in simple CLI commands that execute them in microVMs that enforce the task’s declared capabilities. The execution agent receives the elaborated request with details about which tools to use for which steps. The plan explicitly tells the agent which tools to use for each task. These are the only tools available to the execution agent.
To complete the requested work, the agent may still need to reason reactively to tie together outputs from different functions. Failures may necessitate deeper reasoning or a return to the planning stage. But for those aspects of the work covered by common tasks with existing implementations, the orchestrating agent will only need to orchestrate the CLI commands, based on its knowledge of the types they consume and produce.
An example
Consider the example of an agent tasked with responding to public issues raised by users. A typical workflow for this kind of task might run with a token with broad permissions on the repository in question, or might even run commands as a user with access to thousands of repositories. That agent would read into context all of the untrusted, user-generated content (UGC) in the issue, and could be tricked into performing dangerous actions.
By contrast, an orchestrator of agent functions never sees the UGC, and needs no direct access to secrets. The majority of the agent’s work is done via a series of CLI calls to its generated toolset:
read-issue myorg/myrepo 75 > 00-issue.json 
sanitize-issue < 00-issue.json > 01-sanitized-issue.json 
issue-intent-classify < 01-sanitized-issue.json > 02-triage-context.json 
write-issue-response < 02-triage-context.json > 03-response.json 
comment-issue myorg/myrepo 75 < 03-response.json > 04-receipt.json 
Only the final comment-issue function has any write permissions at all, and each function is firewalled to permit communication only with the expected APIs. Even if a powerful token is supplied to a function, the execution microVM mechanically restricts access to only the expected API calls necessary to perform the task.
A new form of code sharing
Function-level code sharing in the registry will introduce new forms of collaboration and organization that differ from repository-level sharing in several important ways:
Code is organized around typed tasks. Many different implementations of the same task can exist and be selected by users according to their preferences for speed, cost, accuracy, etc.
All implementations for a given task are tested, evaluated, and benchmarked, according to the criteria for that task.
Implementations must adhere to a unified, functional interface, with typed inputs and outputs.
All implementations are directly executable in microVMs, via cloud API or locally. Implementations can use any programming language, model or agent harness. Pre-built cloud microVMs per function enable single-digit millisecond startup.
Implementations must exhaustively declare the capabilities they require, and these are strictly enforced by their microVMs.
Functions are loosely related via shared types in the registry, not strongly coupled in packages and modules. Runtimes can naturally be highly heterogeneous; implementations can use any language, model or harness.
Agents can provisionally save their generated functions to the registry for further review.
Larger scopes of functionality can be created from agentic or deterministic workflows composed of multiple functions. These can be distilled from agent sessions, and themselves saved as new functions in the registry.
Task implementations are much narrower in scope, and therefore much easier to review, than traditional libraries. Because they execute in microVMs that are constrained by the capabilities defined at the task level, a rogue implementation is limited in the damage it can cause.
It’s easier to contribute a task definition, schema or implementation than it is to create a new repository or contribute to an existing project. Improving implementations is easier as well, since every task has comprehensive tests, evaluation and benchmark suites. Efficiency agents can easily find the most used tasks in a registry and concentrate on making their implementations more performant and accurate, and workflows can confidently adopt new implementations that show better metrics. It’s also easy for planning agents or humans to discover high-quality task implementations using semantic search.
Conclusion
Encapsulating and reusing code is fundamental to software engineering, and the benefits of doing so are even greater for inference-based programming. Agent Functions proposes a system that allows (better yet, forces) agents to write cohesive programs using shared and tested functions, executed in secure, efficient, and isolated environments.
Footnotes
Any encapsulated execution environment that can enforce the task’s declared capabilities is fine; microVMs seem like the best choice right now. ↩ 
How often have you seen an agent spiral deliriously through tool choices like this?
I need to fetch a GitHub issue.
Let me curl the GitHub API... Hmm, I’m not allowed to use curl.
Actually, let me try an MCP call... it seems like I don't have the correct token.
Actually, let me see whether the gh CLI works... it seems like gh is not authenticated.
Actually, let me try to use a skill... 
This goes away when the execution plan plainly states: “Use the read-issue command to…” ↩ 
© 2026 GitHub Next · All rights reserved GitHub Next on Mastodon GitHub Next on Bluesky GitHub Next on X GitHub Next Discord 
Subscribe via RSS