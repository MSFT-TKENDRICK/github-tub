GitHub Code Quality no longer adds Copilot as a reviewer - GitHub Changelog 
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
Retired 
August 7, 2026 •
1 minute read 
GitHub Code Quality no longer adds Copilot as a reviewer
Table of Contents
What we've turned off 
How to keep automatic Copilot code review 
Menu. Currently selected: What we've turned off 
What we've turned off 
How to keep automatic Copilot code review 
Enabling GitHub Code Quality on a repository no longer creates a ruleset that automatically requests a code review from GitHub Copilot on your pull requests. In repositories that already have that ruleset, we’ve turned off the settings we enabled.
When Code Quality became generally available on July 20, 2026, enabling it created a repository ruleset named Code Quality Copilot review for default branch that targeted your default branch. You told us that adding a reviewer should be your choice, so we’ve reversed that.
What we’ve turned off 
We’ve disabled the three settings we enabled in that ruleset:
Automatically request Copilot code review , which requested a Copilot review on every pull request.
Review new pushes , which requested another review each time you pushed to a pull request.
Review draft pull requests , which requested a review before you marked a pull request ready.
We only change the ruleset where it still matches what we created. If you’ve edited it, we leave it as you set it, and we never touch a ruleset you wrote yourself. The ruleset stays in your repository with these settings off, so you can delete it whenever you want.
How to keep automatic Copilot code review 
Copilot code review itself hasn’t changed, and you can turn it back on at any time. Add or edit a ruleset that enables Automatically request Copilot code review for the branches you choose, at either the repository or organization level. For the steps, see configuring automatic code review by Copilot . Copilot code review continues to bill to your Copilot plan.
This change applies to Code Quality on GitHub Enterprise Cloud and GitHub Team.
Table of Contents
What we've turned off 
How to keep automatic Copilot code review 
Menu. Currently selected: What we've turned off 
What we've turned off 
How to keep automatic Copilot code review 
application security 
copilot 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Nov.05 Improvement 
Secret scanning upgrades detectors, adds SpaceX as partner 
application security 
Nov.04 Improvement 
CodeQL 2.27.4 improves accuracy and query metadata 
application security 
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
GitHub Copilot is now available in JetBrains Air 
copilot 
Nov.03 Improvement 
CodeQL 2.27.3 adds Python 3.15 features and JSON data extensions 
application security 
Nov.02 Improvement 
GitHub Desktop adds short-lived authentication tokens 
account management 
application security 
client apps 
... 
+2 
Nov.02 Improvement 
Security risk assessments include repository protection status 
application security 
Nov.02 Retired 
pull_request_target blocked by default December 2 
actions 
application security 
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