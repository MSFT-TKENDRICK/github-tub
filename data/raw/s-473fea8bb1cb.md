GitHub Actions: Early September 2026 updates - GitHub Changelog 
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
September 3, 2026 •
1 minute read 
GitHub Actions: Early September 2026 updates
Table of Contents
New REST API for runner version deprecations 
New vulnerability-alerts permission for GITHUB_TOKEN 
New job context properties for reusable workflows 
Menu. Currently selected: New REST API for runner version deprecations 
New REST API for runner version deprecations 
New vulnerability-alerts permission for GITHUB_TOKEN 
New job context properties for reusable workflows 
GitHub Actions now includes three updates that give you clearer visibility and finer-grained control over your workflows.
New REST API for runner version deprecations 
A new REST API returns when registration and runtime support end for a given runner version, so you can plan runner upgrades before a version is deprecated. Call GET /actions/runners/deprecations/{version} at the repository, organization, or enterprise level. The response includes runner_version , runtime_deprecates_at , and registration_deprecates_at .
New vulnerability-alerts permission for GITHUB_TOKEN 
You can now grant workflows read-only access to Dependabot alerts with the new vulnerability-alerts permission for GITHUB_TOKEN . This permission supports read and none values, which lets you follow least-privilege practices instead of relying on broader scopes. For more information, check the permissions key in the workflow syntax .
New job context properties for reusable workflows 
Reusable workflows can now determine their own source identity at runtime with four new job context properties:
job.workflow_ref : The full ref of the workflow file that defines the current job.
job.workflow_sha : The commit SHA of the workflow file.
job.workflow_repository : The owner/repo of the workflow file.
job.workflow_file_path : The file path relative to the repository root.
Unlike the existing github.workflow_ref and github.workflow_sha properties, these job context values reflect the workflow that defines the current job. For a job defined directly in a workflow, job.workflow_ref matches github.workflow_ref ; they diverge only for reusable workflows. These properties are not available on GitHub Enterprise Server.
To learn more, check the job context documentation .
Table of Contents
New REST API for runner version deprecations 
New vulnerability-alerts permission for GITHUB_TOKEN 
New job context properties for reusable workflows 
Menu. Currently selected: New REST API for runner version deprecations 
New REST API for runner version deprecations 
New vulnerability-alerts permission for GITHUB_TOKEN 
New job context properties for reusable workflows 
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