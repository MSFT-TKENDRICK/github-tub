Custom skills, agents, and MCP servers in usage metrics API - GitHub Changelog 
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
October 22, 2026 •
2 minute read 
Custom skills, agents, and MCP servers in usage metrics API
Table of Contents
What's new 
Why this matters 
Important notes 
Menu. Currently selected: What's new 
What's new 
Why this matters 
Important notes 
Copilot usage metrics now show the names of the skills, custom agents, Model Context Protocol (MCP) servers, slash commands, and plugins that your organization creates, instead of grouping them under other or custom . This builds on the agentic CLI customization metrics released in September.
What’s new 
Named entries: In enterprise and organization reports, including per-user 1-day and 28-day reports, aggregated 1-day reports, and day_totals in aggregated 28-day reports, the totals_by_skill , totals_by_custom_agent , totals_by_mcp , totals_by_slash_cmd , and totals_by_plugin arrays now show the configured name of a customer-defined item instead of other or custom .
More entries: Each totals_by_* list now includes up to 25 entries per record, up from five, so you can see more of the long tail of customizations your developers use. Any remaining activity is combined into a trailing other entry.
Unchanged counts: interaction_count and the distinct_*_use_count fields are calculated the same way as before.
Why this matters 
The customizations that matter most to an organization are often the ones its own teams build. Administrators can now see which internal skills, custom agents, and MCP servers developers actually use, track adoption after rolling out a new one, and focus enablement where it is needed.
Important notes 
Coverage: Names are reported from Copilot CLI (interactive sessions and prompt mode), the GitHub Copilot app, clients built on the Copilot SDK (e.g., VS Code and JetBrains IDEs), and Agent Client Protocol (ACP) integrations. Prompt mode, the app, and ACP integrations require Copilot CLI 1.0.97 or later. Copilot SDK clients require SDK v1.0.21 or later. IDE integrations that aren’t built on the Copilot SDK don’t report names.
Configured names: Names are reported as they are configured, trimmed and limited to 128 characters. Names that look like file paths stay grouped under other or custom . Review names before sharing reports outside your organization.
Accuracy: These metrics come from client telemetry and can undercount activity, for example when clients are outdated or telemetry is blocked. Use them to understand trends and adoption rather than for exact accounting.
History: Names appear starting with report days processed after this release. Earlier days still show other or custom .
Access: Reports are available to enterprise owners and billing managers, organization owners, and anyone with a custom organization or enterprise role that grants the “View Copilot Metrics” permission. The Copilot usage metrics policy must be enabled.
Visit the Copilot usage metrics API documentation to get started.
Table of Contents
What's new 
Why this matters 
Important notes 
Menu. Currently selected: What's new 
What's new 
Why this matters 
Important notes 
account management 
copilot 
enterprise management tools 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Nov.04 Release 
GitHub Copilot is now available in Xcode’s coding assistant 
copilot 
Nov.03 Improvement 
BYOK and enterprise custom models in the Copilot usage API 
account management 
copilot 
enterprise management tools 
... 
+2 
Nov.03 Release 
Look up a resource’s cost center with the GitHub REST API 
account management 
enterprise management tools 
... 
+1 
Nov.03 Release 
GitHub Copilot is now available in JetBrains Air 
copilot 
Nov.02 Improvement 
GitHub Desktop adds short-lived authentication tokens 
account management 
application security 
client apps 
... 
+2 
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