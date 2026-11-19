1 vCPU Linux runner now generally available in GitHub Actions - GitHub Changelog 
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
January 22, 2026 •
1 minute read 
1 vCPU Linux runner now generally available in GitHub Actions
Table of Contents
Runner details 
Get started today 
Helpful resources 
Menu. Currently selected: Runner details 
Runner details 
Get started today 
Helpful resources 
GitHub Actions 1 vCPU Linux runners are now generally available. All customers can now take advantage of these lower cost runners. These runners are optimized for automation tasks, issue operations, and short running jobs outside of typical heavyweight CI/CD builds.
Runner details 
These runners have one vCPU and 5 GBs RAM. When using these runners, your actions workflows execute inside of a container rather than a dedicated VM instance, enabling cost-effective, performant execution of automation tasks across GitHub. Each container provides hypervisor level 2 isolation, and the container is automatically decommissioned when a job is completed.
Jobs that use this runner type are limited to 15 minutes of execution time. Jobs exceeding this limit will be terminated and fail.
Good use cases for these runners include jobs like:
Auto-labeling issues
Basic language compilation (e.g., webpack builds)
Linting and formatting
Making API calls to external tools
Running simple python scripts
Get started today 
To get started, simply target the new runner type ubuntu-slim in any new or existing job definitions.
Helpful resources 
To view the full list of installed software or report issues when using 1 vCPU Linux runners, visit the runner-images repository .
For pricing information on these lightweight runners see the billing for GitHub Actions page.
For additional documentation, see the GitHub Docs reference for single-CPU runners .
Table of Contents
Runner details 
Get started today 
Helpful resources 
Menu. Currently selected: Runner details 
Runner details 
Get started today 
Helpful resources 
actions 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Nov.02 Retired 
pull_request_target blocked by default December 2 
actions 
application security 
... 
+1 
Oct.28 Release 
GitHub Agentic Workflows generally available 
actions 
copilot 
universe26 
... 
+2 
Oct.28 Improvement 
GitHub Actions adds multi-cloud compute to improve reliability 
actions 
universe26 
... 
+1 
Oct.28 Release 
GitHub Actions workflow lockfiles are generally available 
actions 
universe26 
... 
+1 
Oct.22 Improvement 
Meta API endpoints updated for Actions blob storage 
actions 
Oct.15 Release 
Xcode 27 runner image generally available 
actions 
Oct.14 Release 
GitHub Actions workflow lockfiles in public preview 
actions 
Oct.02 Improvement 
Stateless GitHub App installation tokens rolled out 
actions 
ecosystem & accessibility 
... 
+1 
Oct.01 Retired 
GitHub Actions: macOS 14 runner image retirement 
actions 
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