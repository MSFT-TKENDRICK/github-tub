Autoloop 
GitHub Next Home Home Projects Posts Talks People 
Home Projects Posts Talks People 
GitHub Next on Mastodon GitHub Next on Bluesky GitHub Next on X GitHub Next Discord GitHub Next RSS feed 
Autoloop 
Automate research, development and anything else with a simple, goal-driven loop
What's it for?
Automate any task in your repo by defining a goal and a way to evaluate progress toward that goal, and letting an agent iteratively improve against it
Share
Stage
Research Prototype 
Published
Apr 2026 
Who made it?
Russell Horton 
p:first-of-type::first-letter]:float-left [&>p:first-of-type::first-letter]:ml-[0.03em] [&>p:first-of-type::first-letter]:mr-3 [&>p:first-of-type::first-letter]:mt-[0.1em] [&>p:first-of-type::first-letter]:text-[3.5em] [&>p:first-of-type::first-letter]:leading-[0.76] [&>p:first-of-type::first-letter]:font-bold [&>p:first-of-type::first-letter]:text-gh-text" style="--prose-accent: var(--color-gn-green-text); --prose-accent-bg: var(--color-gn-green-light);"> The humble for loop was probably one of the first programming constructs you learned, and it’s still one of the most powerful. Combined with agentic intelligence, a simple loop can work tirelessly to achieve any goal you can articulate and measure.
Autoloop , an Agentic Workflow, lets you launch an autonomous research or development project right in your repo. You define what you want done and how success is measured — in a GitHub issue or a markdown file with optional supporting resources — and Autoloop runs it on a schedule, proposing changes, evaluating them against your metric, and keeping only the improvements.
You can migrate a codebase to a new language, optimize your core algorithms for efficiency, or reach 100% test coverage, just by writing a simple issue that describes your end-state goal. Better yet, just briefly describe what you want to get done to an agent and the issue will be written for you. You simply review and merge new work whenever you like. You determine when and how often Autoloop runs, so resource use is controlled and predictable.
Ready to loop? Paste this into your agent to get started:
Install Autoloop using https://github.com/githubnext/autoloop/blob/main/install.md 
Explore the repo at github.com/githubnext/autoloop .
How it works
You (or more likely, your agent) creates a program — an issue or a markdown file in your repo that defines three things:
Goal — what to optimize, in plain English
Target — which files the agent may modify
Evaluation — a command that outputs a numeric metric
On whatever schedule you establish, Autoloop picks a program to run, proposes a change, evaluates it, and keeps the result only if the metric improves. All state — iteration history, lessons learned, priorities — lives in human-readable markdown on a dedicated memory branch, so you can inspect or edit everything the agent knows.
Each program gets its own long-running branch. Merge whenever you’re ready, or steer the direction at any time by commenting on the program’s issue.
Strategies
A program can optionally declare a strategy — a playbook that shapes how the agent reasons across iterations, and how it decides what technique to try next. Two strategies ship with Autoloop today, with more planned.
OpenEvolve turns a program into an evolutionary search. Inspired by OpenEvolve and DeepMind’s AlphaEvolve, the agent maintains a population of solution variants using MAP-Elites niching and four operators — exploitation, exploration, crossover, and migration. It tracks candidates across feature dimensions to maintain diversity, detects plateaus, and shifts strategy when progress stalls. This makes Autoloop more than a hill-climber: it’s an evolutionary programming system where the agent acts as both mutation operator and selection mechanism. This strategy is great for optimization, algorithmic improvements, and similar technical tasks.
Test-driven follows a strict red-green-refactor cycle. Each iteration picks one behaviour to pin, writes a failing test against a source of truth (a spec, a reference implementation, a bug reproducer), then implements the minimum code to make it pass. The strategy tracks a persistent test harness across iterations and enforces that no existing test ever regresses. This is a development strategy, designed to burn down your todo list.
Example: Tsessebe
Tsessebe is a TypeScript port of pandas being built almost entirely by Autoloop. It runs multiple programs simultaneously:
build-tsb-pandas-typescript-migration is the core migration loop, implementing each pandas feature in tsessebe, one by one.
tsb-perf-evolve uses the OpenEvolve strategy to tackle performance issues. Currently, it’s evolving Series.sortValues toward the performance of pandas’ Series.sort_values . The fitness metric is the runtime ratio tsb / pandas — below 1.0 means tsb is faster. The agent explores algorithmic families (comparison sort, typed-array indirect sort, dtype-dispatched non-comparison sort) while maintaining population diversity across islands.
perf-comparison systematically benchmarks every tsb function against its pandas equivalent, one function per iteration, publishing results to the documentation Pages site.
Join us
Have questions or want to share what you’re building? Join us in the #agentic-workflows channel on Discord.
Related Posts
Post May 4 
Autoloop is porting pandas to TypeScript 
tsb is a from-scratch TypeScript port of pandas, being built almost entirely by Autoloop — one iterative improvement at a time. 
© 2026 GitHub Next · All rights reserved GitHub Next on Mastodon GitHub Next on Bluesky GitHub Next on X GitHub Next Discord 
Subscribe via RSS