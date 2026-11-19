Actions steps can now be run in parallel - GitHub Changelog 
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
Improvement 
June 25, 2026 •
1 minute read 
Actions steps can now be run in parallel
GitHub Actions now supports running steps concurrently using background .
Previously, all steps in a workflow ran in sequence, with each step starting only after the previous step completed. Previously, you could run steps in a non-blocking way using shell backgrounding ( & ), but that often interleaved logs from multiple steps. This new capability enables steps to run in parallel while retaining separate logs and execution.
Four new keywords are being introduced:
background: true runs a step asynchronously and immediately continues to the next step.
wait / wait-all pauses execution until one or more named background steps complete. wait can target one or more specific background steps, while wait-all pauses until all prior background steps have completed.
cancel gracefully terminates a background step when you no longer need it, enabling you to start long-running services with a background step.
parallel takes a group of steps and converts them to background steps with a wait after, enabling you to easily run multiple steps in parallel. This is syntactic sugar for the “run these steps concurrently, then continue” pattern.
This update helps you handle common patterns in a single job:
Running independent work in true parallel, such as multiple builds at once
Starting a background service, running dependent work, then stopping that service cleanly
Kicking off non-blocking work that can continue while later steps run, like uploading telemetry while packaging continues
Read the GitHub Actions workflow syntax documentation for current syntax and usage details.
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