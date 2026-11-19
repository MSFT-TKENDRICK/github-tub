Deploy managed Copilot settings via MDM in VS Code and CLI - GitHub Changelog 
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
July 8, 2026 •
2 minute read 
Deploy managed Copilot settings via MDM in VS Code and CLI
Table of Contents
Delivery channels 
Supported settings 
Getting started 
Menu. Currently selected: Delivery channels 
Delivery channels 
Supported settings 
Getting started 
Enterprise administrators can now deliver managed GitHub Copilot settings directly to devices through native mobile device management (MDM) and file-based configuration, in addition to the existing server-managed channel. This is generally available for GitHub Copilot CLI and VS Code.
Device-level deployment lets you enforce Copilot governance using the same tools you already use to manage endpoints. You can push settings through Microsoft Intune, Jamf, or Group Policy, or deploy a configuration file with Chef, Puppet, or Ansible. Because settings are read from the device, they apply consistently across VS Code and Copilot CLI, regardless of how a developer signs in.
Delivery channels 
You can deliver managed settings through any of three channels, all of which use the same keys and values.
Native MDM reads OS-level managed preferences. On Windows, settings come from the HKEY_LOCAL_MACHINE\SOFTWARE\Policies\GitHubCopilot registry key. On macOS, they come from managed preferences for the com.github.copilot domain.
File-based reads a managed-settings.json file from a well-known path (i.e, /Library/Application Support/GitHubCopilot/managed-settings.json on macOS, %ProgramFiles%\GitHubCopilot\managed-settings.json on Windows, and /etc/github-copilot/managed-settings.json on Linux). File-based settings must be owned by root and cannot be world-writable or symlinked.
Server-managed resolves settings from the developer’s signed-in GitHub account via managed-settings.json in your organization’s .github-private repository.
When more than one channel provides settings, the highest-precedence channel wins outright, in this order:
Native MDM
Server-managed
File-based
Supported settings 
The device-level channels support the same managed setting keys as the server-managed channel, including:
permissions.disableBypassPermissionsMode 
model 
enabledPlugins 
extraKnownMarketplaces 
strictKnownMarketplaces 
telemetry.* for OpenTelemetry export configuration
Scalar settings use their dot-separated key directly, while structured settings such as enabledPlugins are supplied as a JSON string value. Additional keys will be added over time.
Getting started 
To learn how to deploy managed settings to your devices, see Deploy Copilot managed settings . For the full list of keys and the settings they control, see Configure enterprise managed settings .
Join the discussion within GitHub Community .
Table of Contents
Delivery channels 
Supported settings 
Getting started 
Menu. Currently selected: Delivery channels 
Delivery channels 
Supported settings 
Getting started 
client apps 
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