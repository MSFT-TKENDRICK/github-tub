Ubuntu 26 generally available and latest migration - GitHub Changelog 
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
September 17, 2026 •
1 minute read 
Ubuntu 26 generally available and latest migration
Table of Contents
Using Ubuntu 26.04 
ubuntu-latest is migrating to Ubuntu 26.04 
Learn more 
Menu. Currently selected: Using Ubuntu 26.04 
Using Ubuntu 26.04 
ubuntu-latest is migrating to Ubuntu 26.04 
Learn more 
The Ubuntu 26.04 runner image for GitHub Actions is now out of public preview and fully supported for production workflows on both x64 and arm64. As part of this release, the ubuntu-latest label will migrate to Ubuntu 26.04, giving you the latest supported Ubuntu release by default.
Using Ubuntu 26.04 
To run your workflows on the new image, set runs-on: ubuntu-26.04 or runs-on: ubuntu-26.04-arm in your workflow file. Ubuntu 26.04 includes updated, and in some cases removed, tools and tool versions compared to earlier images. These changes can break workflows that depend on specific software versions or preinstalled packages. Review the full list of changes and test your workflows against Ubuntu 26 before the migration begins.
ubuntu-latest is migrating to Ubuntu 26.04 
The ubuntu-latest label will migrate from Ubuntu 24.04 to Ubuntu 26.04. This migration will roll out gradually between October 19 and November 19, 2026. During this window, workflows that use ubuntu-latest will automatically move to Ubuntu 26.04.
Because this moves your workflows to a new operating system version, the migration may break builds that rely on tools, packages, or versions that changed between Ubuntu 24.04 and 26.04. To prepare:
Test your workflows against ubuntu-26.04 before the migration begins.
If you are not ready to move, pin your workflows to ubuntu-24.04 to stay on the current image.
Learn more 
To learn more about available images, see the GitHub-hosted runners documentation . To see the included software list or report issues with the image, head to the runner-images repository .
Table of Contents
Using Ubuntu 26.04 
ubuntu-latest is migrating to Ubuntu 26.04 
Learn more 
Menu. Currently selected: Using Ubuntu 26.04 
Using Ubuntu 26.04 
ubuntu-latest is migrating to Ubuntu 26.04 
Learn more 
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