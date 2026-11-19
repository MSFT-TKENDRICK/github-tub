GitHub Actions adds multi-cloud compute to improve reliability - GitHub Changelog 
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
October 28, 2026 •
2 minute read 
GitHub Actions adds multi-cloud compute to improve reliability
We’re expanding the infrastructure behind GitHub-hosted runners so your workflows start faster and run more reliably, even during periods of peak demand. GitHub Actions now schedules eligible jobs across a broader, multi-cloud compute pool. This adds capacity, reduces capacity-related queue times, and improves service resilience. As part of this, eligible Linux jobs may run on Amazon Web Services (AWS) in addition to Microsoft Azure.
Multi-cloud compute will be used for standard 2-core and 4-core Linux runners and compatible 2-core and 4-core larger runners without specialized configurations. This change does not apply to Windows runners or runners with private networking or other specialized configurations.
For customers on GitHub Free, GitHub Pro, and GitHub Team, eligible runners will automatically use multi-cloud compute. Customers on GitHub Enterprise Cloud can opt in by going to Enterprise Settings > Policies > Actions > General > Hosted compute cloud providers and enabling AWS compute.
Editor’s note (November 2, 2026): Corrected the path for opting in. 
GitHub Actions automatically schedules eligible jobs across available cloud providers. Your existing runner labels and workflow syntax remain unchanged.
Recommended action: Keep your network allowlists up to date 
To get the full benefit of expanded capacity, make sure any IP allowlists or network-based access policies your workflows rely on include all published GitHub Actions IP ranges. Runners in the expanded compute pool use additional outbound IP addresses, so policies that allow only Azure or Microsoft-owned ranges, including Microsoft Entra Conditional Access policies, can block connections or authentication from these runners.
This is a rolling change, so we recommend updating your allowlists now, before your workflows begin running in the expanded compute pool.
All GitHub Actions runner IP ranges, including the new ones, are published in the actions array returned by GET https://api.github.com/meta . We recommend keeping your allowlists in sync with this endpoint rather than relying on cloud-provider-specific ranges. See GitHub-hosted runner IP addresses for details.
actions 
universe26 
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
Route and orchestrate models with GitHub Copilot Fusion 
copilot 
enterprise management tools 
universe26 
... 
+2 
Oct.28 Release 
GitHub Copilot app, Universe releases 
copilot 
universe26 
... 
+1 
Oct.28 Release 
GitHub Enterprise now includes access to GitHub Copilot 
copilot 
universe26 
... 
+1 
Oct.28 Release 
Security extension for the GitHub Copilot app 
application security 
copilot 
universe26 
... 
+2 
Oct.28 Release 
GitHub intelligence puts your code, context, and history to work 
copilot 
universe26 
... 
+1 
Oct.28 Improvement 
Build shared workflows for your team with Copilot Automations 
copilot 
universe26 
... 
+1 
Oct.28 Release 
GitHub Copilot in VS Code, Universe releases 
copilot 
universe26 
vs code 
... 
+2 
Oct.28 Improvement 
Repository plugin defaults and enterprise plugin controls generally available 
copilot 
universe26 
... 
+1 
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