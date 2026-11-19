Highlights from Git 2.54 - The GitHub Blog 
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
Home / Open Source / Git 
Highlights from Git 2.54
The open source Git project just released Git 2.54. Here is GitHub’s look at some of the most interesting features and changes introduced since last time.
Taylor Blau · @ttaylorr 
April 20, 2026 
| 
Updated April 27, 2026 
| 
10 minutes 
Share: 
The open-source Git project just released Git 2.54 with features and bug fixes from over 137 contributors, 66 of them new. We last caught up with you on the latest in Git back when 2.52 was released .
To celebrate this most recent release, here is GitHub’s look at some of the most interesting features and changes introduced since last time.
💡 Since the last Git release we wrote about was Git 2.52, this blog post covers the highlights from both the 2.53 and 2.54 releases.
Rewrite history with git history 
The Git project has a long history of providing tools to rewrite your repository’s history. git rebase –i is the most well-known, and it’s remarkably flexible: you can reorder, squash, edit, and drop commits. But that flexibility comes with complexity: an interactive rebase operates on a range of commits, updates your working tree and index as it goes, and can leave you in a conflicted state that you need to resolve before proceeding.
For simpler cases, all of that machinery can feel like overkill. If all you want to do is fix a typo in a commit message three commits back, or split one commit into two, an interactive rebase works, but requires you to set up a to-do list, mark the right commit for editing, and then drive the rebase to completion.
Git 2.54 introduces a new experimental command that is designed for exactly these simpler cases: git history . The history command currently supports two operations: reword and split .
git history reword <commit> opens your editor with the specified commit’s message and rewrites it in place, updating any branches that descend from that commit. Unlike git rebase , it doesn’t touch your working tree or index, and it can even operate in a bare repository .
git history split <commit> lets you interactively split a commit into two by selecting which hunks should be carved out into a new parent commit. The interface will look familiar if you’ve ever used add in interactive mode via git add –p :
$ git history split HEAD
diff --git a/bar b/bar
new file mode 100644
index 0000000..50810a5
--- /dev/null
+++ b/bar
@@ -0,0 +1 @@
+bar
(1/1) Stage addition [y,n,q,a,d,p,?]? y 
After selecting hunks, Git creates a new commit with those changes as the parent of the original commit (which retains whatever hunks you didn’t select) and rewrites any descendent branches to point at the updated history.
There are a couple of intentional limitations worth noting. The history command does not support histories that contain merge commits, and it will refuse to perform any operation that would result in a merge conflict. By design, git history is meant for targeted, non-interactive rewrites, not the kind of open-ended history rewriting typically relegated to git rebase –i .
The history command is built on top of git replay ‘s core machinery, which was itself extracted into a library as part of this work. That foundation means that git history benefits from replay ‘s ability to operate without touching the working tree, making it a natural fit for scripting and automation in addition to interactive use.
This command is still marked as experimental, so its interface may evolve. Give it a try with git history reword and git history split , available in Git 2.54.
[ source , source , source , source , source ]
Config-based hooks
If you’ve ever wanted to share a Git hook across multiple repositories, you’ve probably had to reach for a third-party hook manager, or manually symlink scripts into each repository’s $GIT_DIR/hooks directory. That’s because, historically, Git hooks could only be defined as executable scripts living in one place: the hooks subdirectory of your .git directory (or whatever core.hooksPath points to).
That meant that if you wanted to run a linter before every commit across all of your repositories, you had to copy the script into each repository, which can be tedious and error-prone. Alternatively, you could set core.hooksPath to point to a shared directory, but that causes all of your repositories to share the exact same set of hooks, with no way to mix and match.
Git 2.54 introduces a new way to define hooks: in your configuration files. Instead of placing a script at .git/hooks/pre-commit , you can now write:
[hook "linter"]
event = pre-commit
command = ~/bin/linter --cpp20 
The hook.<name>.command key specifies the command to run, and hook.<name>.event specifies which hook event should trigger it. Since this is just configuration, it can live in your per-user ~/.gitconfig , a system-wide /etc/gitconfig , or in a repository’s local config. That makes it straightforward to define a set of hooks centrally and have them apply everywhere.
Even better, you can now run multiple hooks for the same event. If you want both a linter and a secrets scanner to run before every commit, you can configure them independently:
[hook "linter"]
event = pre-commit
command = ~/bin/linter --cpp20
[hook "no-leaks"]
event = pre-commit
command = ~/bin/leak-detector 
Git will run them in the order it encounters their configuration. The traditional hook script in $GIT_DIR/hooks still works, and runs last, so existing hooks are unaffected. You can see which hooks are configured (and where they come from) with git hook list :
$ git hook list pre-commit
global linter ~/bin/linter --cpp20
local no-leaks ~/bin/leak-detector 
Individual hooks can be disabled without removing their configuration by setting hook.<name>.enabled = false , which is particularly handy when a hook is defined in a system-level config but you need to opt a specific repository out.
Along the way, Git’s internal handling of hooks has been modernized. Many built-in hooks that were previously invoked through ad-hoc code paths (like pre-push , post-rewrite , and the various receive-pack hooks) have been migrated to use the new hook API, meaning they all benefit from the new configuration-based hook machinery.
[ source , source , source ]
Geometric repacking during maintenance by default
Returning readers of this series may recall our coverage of the new geometric strategy within git maintenance , which was introduced in Git 2.52. That strategy works by inspecting the contents of your repository to determine if some number of packfiles can be combined to form a geometric progression by object count. If they can, Git performs a geometric repack, condensing the contents of your repository without needing to perform a full garbage collection.
In 2.52, the geometric strategy was available as an opt-in choice via the maintenance.strategy configuration. In 2.54, it becomes the default strategy for manual maintenance. That means when you run git maintenance run without specifying a strategy, Git will now use the geometric approach instead of the traditional gc task.
In practice, this means that your repositories will be maintained more efficiently out of the box. The geometric strategy avoids the expensive all-into-one repacks that gc performs, instead combining packs incrementally when possible and falling back to a full gc only when it would consolidate the entire repository into a single pack. Along the way, it keeps your commit-graph , reflogs , and other auxiliary data structures up to date.
If you were already using maintenance.strategy = geometric in your configuration, nothing changes. If you hadn’t set a strategy (or were relying on the old gc default), you’ll start seeing the benefits of geometric repacking automatically. The gc strategy is still available if you prefer it and can be selected with maintenance.strategy = gc .
[ source ]
The tip of the iceberg…
Now that we’ve covered some of the larger changes in more detail, let’s take a closer look at a selection of some other new features and updates in this release.
The git add –p command, Git’s tool for interactively staging individual hunks, received a handful of usability improvements in this release. When navigating between hunks with the J and K keys, Git now shows whether you’ve previously accepted or skipped each hunk, so you don’t have to remember your earlier decisions.
Separately, a new --no-auto-advance flag changes how git add –p handles the transition between files. Normally, once you’ve made a decision on every hunk in a file, the session automatically moves on to the next one. With --no-auto-advance , the session stays put after you’ve decided on the last hunk, letting you use < and > to move between files at your own pace. This can be useful when you want to review your decisions holistically before committing to them.
[ source , source ]
git replay , the experimental command for replaying commits onto a new base without touching the working tree, continues to mature. This release brings several improvements: replay now performs atomic reference updates by default (instead of printing update-ref commands to stdout ), has learned a new --revert mode that reverses the changes from a range of commits, can now drop commits that become empty during replay, and supports replaying all the way down to the root commit.
[ source , source , source , source ]
Git’s HTTP transport now handles HTTP 429 “Too Many Requests” responses. Previously, a 429 from the server would be treated as a fatal error. Git can now retry the request, honoring the server’s Retry-After header when present, or fall back to a configurable delay via the new http.retryAfter setting. The new http.maxRetries and http.maxRetryTime configuration options provide control over how many times to retry and how long to wait, respectively.
[ source ]
git log –L , which traces the history of a range of lines within a file, has historically used its own custom output path that bypassed much of Git’s standard diff machinery. As a result, it was incompatible with several useful options, including the -S and -G “pickaxe” options for searching by content changes.
This release reworks git log –L to route its output through the standard diff pipeline, making it compatible with patch formatting options and pickaxe searches for the first time.
Say you want to trace the history of strbuf_addstr() in strbuf.c , but only see commits where len was added or removed within that function: 
$ git log -L :strbuf_addstr:strbuf.c -S len --oneline -1
a70f8f19ad2 strbuf: introduce strbuf_addstrings() to repeatedly add a string
diff --git a/strbuf.c b/strbuf.c
--- a/strbuf.c
+++ b/strbuf.c
@@ -316,0 +316,9 @@
+void strbuf_addstrings(struct strbuf *sb, const char *s, size_t n)
+{
+ size_t len = strlen(s);
+
+ strbuf_grow(sb, st_mult(len, n));
+ for (size_t i = 0; i < n; i++)
+ strbuf_add(sb, s, len);
+} 
Prior to this release, options like -S , (and -G , --word-diff , along with --color-moved ) were silently ignored when used with -L . Now they work together naturally: -L scopes the output to the function you care about, and -S filters down to just the commits that touched the symbol you’re searching for within it. 
[ source ]
Incremental multi-pack indexes, which we first covered in our discussion of Git 2.47 and followed up on in Git 2.50 , received further work in this release. The MIDX machinery now supports compaction , which merges smaller MIDX layers together (along with their associated reachability bitmaps) to keep the number of layers in the chain manageable. This is an important step toward making incremental MIDXs practical for long-lived repositories that accumulate many layers over time.
[ source ]
git status learned a new status.compareBranches configuration option. By default, git status shows how your current branch compares to its configured upstream (e.g., “Your branch is ahead of ‘origin/main’ by 3 commits”). With status.compareBranches , you can ask it to also compare against your push remote, or both: 
[status]
compareBranches = @{upstream} @{push} This is useful if your push destination differs from your upstream, as is common in triangular workflows where you fetch from one remote and push to another (like a fork).
[ source ]
Say you have a series of commits, and want to add a trailer to each one of them. You could do this manually, or automate it with something like: git rebase -x ‘git commit --amend --no-edit --trailer=”Reviewed-by: A U Thor <a href="mailto:<author@example.com>”’ , but that’s kind of a mouthful.
In Git 2.54, git rebase learned a new --trailer option, which appends a trailer to every rebased commit via the interpret-trailers machinery. Instead of the monstrosity above, we can now write git rebase --trailer "Reviewed-by: A <a href="mailto: <a@example.com >" and achieve the same effect.
[ source ]
When signing commits, a signature remains valid even when it was signed with a GPG key that has since expired. Previously, Git displayed these signatures with a scary red color, which could be misleading and lead you to interpret the signature itself as invalid. Git now correctly treats a valid signature made with a since-expired key as a good signature.
[ source ]
git blame learned a new --diff-algorithm option, allowing you to select which diff algorithm (e.g., histogram , patience , or minimal ) is used when computing blame. This can sometimes produce meaningfully different (and more useful) blame output, depending on the nature of the changes in your repository’s history.
[ source ]
Under the hood, a significant amount of work went into restructuring Git’s object database (ODB) internals. The ODB source API has been refactored to use a pluggable backend design, with individual functions like read_object() , write_object() , and for_each_object() now dispatched through function pointers on a per-source basis. While none of this is user-visible today, it lays the groundwork for future features like alternative storage backends or more flexible object database configurations.
[ source , source , source , source ]
git backfill , the experimental command for downloading missing blobs in a partial clone , learned to accept revision and pathspec arguments. Previously, backfill would always download blobs reachable from HEAD across the entire tree. You can now scope it to a particular range of history (e.g., git backfill main~100..main ) or a subset of paths (e.g., git backfill -- '*.c' ), including pathspecs with wildcards.
This makes backfill much more practical for large partial clones where you only need historical blobs for a specific area of the repository.
[ source ]
Git’s alias configuration has historically been limited to ASCII alphanumeric characters and hyphens. That meant alias names like “h&auml;mta” (Swedish for “fetch”) or “状態” (Japanese for “status”) were off-limits. Git 2.54 lifts that restriction with a new subsection-based syntax:
[alias "h&auml;mta"]
command = fetch
The traditional [alias] co = checkout syntax continues to work for ASCII names. The new subsection form supports any characters (except newlines and NUL bytes), is matched case-sensitively as raw bytes, and uses a command key for the alias definition. Shell completion has been updated to handle these aliases as well.
[ source , source ]
The histogram diff algorithm received a fix for a subtle output quality issue. After any diff algorithm runs, Git performs a “compaction” phase that shifts and merges change groups to produce cleaner output. In some cases, this shifting could move a change group across the anchor lines that the histogram algorithm had chosen, producing a diff that was technically correct but visually redundant. Git now detects when this happens and re-diffs the affected region, resulting in tighter output that better matches what you would expect.
[ source ]
…the rest of the iceberg
That’s just a sample of changes from the latest release. For more, check out the release notes for 2.53 and 2.54 , or any previous version in the Git repository .
Tags:
Git 
Written by 
Taylor Blau 
@ttaylorr 
Taylor Blau is a Principal Software Engineer at GitHub where he works on Git.
Git 
Table of Contents
Rewrite history with git history
Config-based hooks
Geometric repacking during maintenance by default
The tip of the iceberg…
...the rest of the iceberg
More on Git 
The bridge to agent-scale Git infrastructure 
We moved a copy of 99.99999% of GitHub’s repositories to Azure. Here’s how per-reference quorums will bring over the rest, and how object storage lets reads scale independently.
Eleanor White & Victoria Dye 
Building Git infrastructure for agent-scale development 
We’re rebuilding GitHub’s Git infrastructure while GitHub keeps running, creating a foundation for agent-scale software development.
Brian Celenza 
Related posts 
Maintainers 
Accessibility statements now have a home on GitHub 
GitHub now highlights ACCESSIBILITY.md files and helps maintainers document accessibility goals, known barriers, supported environments, contributor expectations, and reporting processes.
Jan Maarten 
Maintainers 
Arnis turns any place on Earth into a Minecraft world 
Louis Erbkamm built the first prototype in his free time. Now GitHub Copilot helps him maintain it alone.
Alex Perrault 
Gaming 
Game Off 2026: The theme is SHIFT 
GitHub’s annual month-long game jam is back for its 14th year! This November, make a game inspired by the theme SHIFT. Change gears, swap perspectives, bend reality, or just press a certain key.
Lee Reilly 
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