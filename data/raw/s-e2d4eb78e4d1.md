Some Git over HTTPS may temporarily require authentication - GitHub Changelog 
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
October 19, 2026 •
1 minute read 
Some Git over HTTPS may temporarily require authentication
During periods of unusual traffic, GitHub may temporarily require authentication for some clones and fetches of public repositories over HTTPS to help protect github.com’s availability. If an operation is affected, it will fail with a message indicating that authentication is required.
To continue, authenticate and retry the operation. You can also wait and retry without authentication after the temporary protection has been lifted.
GitHub applies this protection as narrowly as possible using signals associated with anomalous traffic. Because legitimate and anomalous traffic can sometimes share those signals, legitimate unauthenticated operations may occasionally be affected. This is not a general authentication requirement for public repositories.
The following operations are unaffected: 
Authenticated Git operations over HTTPS
Git operations over SSH
Pushes
Unrelated GitHub web and API traffic
For more reliable automated clones and fetches, configure authentication:
GitHub Actions: Use the built-in GITHUB_TOKEN .
Other CI systems: Prefer a GitHub App installation access token. A personal access token can also be used.
Operations that cannot authenticate: Retry after the temporary protection has been lifted.
This protection applies to repositories on github.com across all plans.
For setup instructions, see about authentication to GitHub and managing remote repositories .
account management 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
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
Nov.02 Improvement 
GitHub Desktop adds short-lived authentication tokens 
account management 
application security 
client apps 
... 
+2 
Oct.23 Improvement 
Usage metrics API adds usage from tools like OpenCode 
account management 
copilot 
enterprise management tools 
... 
+2 
Oct.23 Improvement 
EMU deletions fix 
account management 
Oct.22 Improvement 
Custom skills, agents, and MCP servers in usage metrics API 
account management 
copilot 
enterprise management tools 
... 
+2 
Oct.22 Improvement 
Industry comparisons in the Copilot impact dashboard 
account management 
copilot 
enterprise management tools 
... 
+2 
Oct.15 Improvement 
Download GitHub Code Quality license usage as a CSV 
account management 
application security 
... 
+1 
Oct.13 Improvement 
Search and filter for budgets now available 
account management 
enterprise management tools 
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