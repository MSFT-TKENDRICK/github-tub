GitHub async merge API generally available - GitHub Changelog 
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
October 1, 2026 •
1 minute read 
GitHub async merge API generally available
You can now use the generally available GitHub async merge API to merge individual or stacked pull requests, add pull requests to a merge queue, or merge pull requests directly. This includes optionally bypassing rules if you have permission.
The API processes merges asynchronously, helping your automations handle busy repositories without waiting for complex merges to finish in a single request. Submit a merge request with PUT , then poll with GET using the returned request ID to check its status.
The async merge API is now the recommended path for programmatically merging pull requests instead of the synchronous REST endpoint or GraphQL mutations. It’s also the only merge API that supports stacked pull requests. Check out the async merge API documentation for request parameters and examples.
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