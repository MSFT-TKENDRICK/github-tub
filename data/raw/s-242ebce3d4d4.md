Stacked pull requests are now in public preview - GitHub Changelog 
Skip to content 
Skip to sidebar 
/ 
Blog 
Changelog 
Docs 
Customer stories 
Try GitHub Copilot app 
See what's new 
Search 
Changelog 
Docs 
Customer stories 
See what's new 
Try GitHub Copilot app 
Back to changelog 
Release 
July 30, 2026 •
3 minute read 
Stacked pull requests are now in public preview
Table of Contents
Get started with the CLI extension 
Create stacks from your terminal or github.com 
Review each layer independently 
Merge everything in a single click 
Find out more and share your feedback 
Menu. Currently selected: Get started with the CLI extension 
Get started with the CLI extension 
Create stacks from your terminal or github.com 
Review each layer independently 
Merge everything in a single click 
Find out more and share your feedback 
Stacked pull requests break large changes into small, reviewable pull requests. They’re an ordered series of pull requests that each represent focused layers of your change. With stacks, you can independently review and check each pull request, then merge everything together in one click. No more opening a single large pull request that takes forever to review, or splitting work across multiple branches you have to keep manually rebasing.
“We’ve been using GitHub stacked PRs for Next.js for the past few months. It has helped us introduce smaller individual changes while shipping larger features, making it easier to review PRs. – Tim Neutkens, Next.js lead, Vercel”
With stacked pull requests, teams can:
Keep large changes moving by reviewing short, narrowly scoped pull requests in parallel.
Maintain quality across every layer by using focused pull request reviews alongside existing branch protections to protect main .
Merge one, some, or all by landing an entire stack altogether or individual layers one at a time.
And because stacked pull requests are built into GitHub, your existing reviews, checks, and merge requirements all work out of the box.
“The new Github Stacked PRs preview is incredible. Landing 5 stacked PRs directly to a merge queue all at once! A+++! This removes so much friction (and the gh cli tools + agent skill help a ton)” – John Resig, creator, jQuery
Get started with the CLI extension 
Install the CLI extension and create your first stack in under a minute:
gh extension install github/gh-stack
Create stacks from your terminal or github.com 
Work with stacks on github.com, the GitHub CLI, the GitHub mobile app, or with a coding agent such as GitHub Copilot using the gh-stack skill. Start with a branch and pull request for your first change. Then add branches and pull requests on top of it; each pull request targets the layer below it.
Review each layer independently 
Open any pull request in the stack to review only the diff for that specific layer. Use the stack map at the top of the pull request to see how the change you’re reviewing fits into the larger work. You and your teammates can each review different layers in parallel without blocking further work.
“AI has made TED’s developers dramatically more productive, but that created a new bottleneck: PRs were growing large enough that reviewers were struggling. Stacked PRs help to solve that. By breaking large changes into small, dependency-ordered pieces, review happens in smaller logical chunks – not just faster PR reviews, but more accurate ones. Stacked PRs tighten our feedback loop and help get stable code to ted.com faster.” – Andy Merryman, CTO, TED
Merge everything in a single click 
Merge the latest ready pull request to land it and every unmerged layer below it in one single operation. To land part of a stack, merge one or more lower layers—the pull requests above it stay open and automatically rebase and retarget. Your existing branch protections and required checks still govern what reaches main .
“A big change used to mean one giant PR nobody wanted to review. Now it’s a stack of small ones reviewers can actually follow, and the whole stack merges in one shot. It stopped feeling like a tool on top of GitHub and started feeling like GitHub.” – Mayank Saini, connectivity engineer, WHOOP
Find out more and share your feedback 
Stacked pull requests are rolling out in public preview to all repositories over the coming days. Merge queue support for stacked pull requests is rolling out progressively over the coming weeks.
For more information, check out the stacked pull requests documentation , and share your feedback with us in the stacks discussion .
Table of Contents
Get started with the CLI extension 
Create stacks from your terminal or github.com 
Review each layer independently 
Merge everything in a single click 
Find out more and share your feedback 
Menu. Currently selected: Get started with the CLI extension 
Get started with the CLI extension 
Create stacks from your terminal or github.com 
Review each layer independently 
Merge everything in a single click 
Find out more and share your feedback 
collaboration tools 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Nov.05 Release 
New pull request overview page in public preview 
collaboration tools 
Oct.28 Release 
Introducing Replica, an open-source AI prototyping tool 
collaboration tools 
community engagement 
universe26 
... 
+2 
Oct.28 Release 
Pull request limits: Exempt contributors by age or history 
collaboration tools 
universe26 
... 
+1 
Oct.28 Release 
Moderate role for GitHub Issues generally available 
collaboration tools 
community engagement 
universe26 
... 
+2 
Oct.22 Improvement 
Pull requests: Saved whitespace preferences and improved split view 
collaboration tools 
Oct.15 Improvement 
Multi-repository support and other improvements for GitHub in Slack and Teams 
collaboration tools 
copilot 
... 
+1 
Oct.08 Improvement 
Triage role users or higher can now archive pull requests 
collaboration tools 
Oct.08 Improvement 
Draft pull requests count toward pull request limits 
collaboration tools 
Oct.06 Release 
Stacked pull requests generally available 
collaboration tools 
Subscribe to our developer newsletter
Discover tips, technical guides, and best practices in our biweekly newsletter just for devs. 
Enter your email * 
Subscribe 
By submitting, I agree to let GitHub and its affiliates use my information for personalized communications, targeted advertising, and campaign effectiveness. See the GitHub Privacy Statement for more details. 
Back to top 
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