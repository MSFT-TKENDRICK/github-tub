Issue fields are now in public preview for all organizations - GitHub Changelog 
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
May 21, 2026 •
2 minute read 
Issue fields are now in public preview for all organizations
Issue fields are now available in public preview to all GitHub organizations on github.com and GitHub Enterprise Cloud with data residency. When you define typed metadata like Priority , Effort , or any custom field at the org level, and it automatically shows up on every issue, in every repository.
Fields support four types (i.e., single select, text, number, and date), can be pinned to specific issue types, and work across the platform. You can search and filter issues by field value, add fields as columns in project views, track changes in the timeline, and automate via REST and GraphQL APIs or webhook events.
Since the initial preview in March , over 1,000 organizations have adopted issue fields, including some of the largest enterprises and open source projects on GitHub. Teams are building fields into their creation workflows and using bots, GitHub Actions, and integrations to keep field values consistent without manual effort.
The most common themes from early adopters include:
Replacing sprawling label systems with structured, queryable metadata unifying priority and effort tracking across hundreds of repositories without manual syncing.
Giving automation a consistent schema to build on.
Teams describe it as the missing link between issues and projects.
Based on that usage, we shipped several improvements and will continue iterating based on feedback:
Public repository visibility controls : Orgs can decide which fields are visible to nonmembers.
REST API parity : Set field values when creating issues via the REST API, matching existing GraphQL support.
Migration tool : A Copilot skill that bulk copies values from labels or project fields.
Every organization automatically gets four default fields that work out of the box. Organization admins can customize fields, add new ones, and configure which fields appear on each issue type from Settings > Planning > Issue fields .
To learn more, see the issue fields documentation . Share feedback in the community discussion —it directly shapes what we build next.
projects & issues 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Oct.28 Release 
Issue artifacts are now in public preview 
copilot 
projects & issues 
universe26 
... 
+2 
Oct.08 Improvement 
Screen readers can navigate timelines as lists 
ecosystem & accessibility 
projects & issues 
... 
+1 
Sep.25 Improvement 
Private saved views for repository issues and “Relates to” issue relationship is generally available 
projects & issues 
Aug.27 Improvement 
Better label management on issues is generally available 
projects & issues 
Aug.20 Improvement 
Pinning saved views to the repository issues sidebar is generally available and more 
projects & issues 
Aug.10 Retired 
Custom thread subscriptions are being deprecated 
collaboration tools 
community engagement 
projects & issues 
... 
+2 
Aug.07 Release 
“Relates to” issue relationship in public preview and multi-select fields is generally available 
projects & issues 
Jul.23 Improvement 
Multi-select fields for Projects and Issues in public preview 
projects & issues 
Jul.23 Release 
Agent automation controls in GitHub Issues in public preview 
collaboration tools 
copilot 
projects & issues 
... 
+2 
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