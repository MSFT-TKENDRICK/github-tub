Copilot CLI: Configure everything from one place with /settings - GitHub Changelog 
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
June 11, 2026 •
2 minute read 
Copilot CLI: Configure everything from one place with /settings
Table of Contents
One command, three ways to use it 
A dialog that fits each setting 
Get the update 
Menu. Currently selected: One command, three ways to use it 
One command, three ways to use it 
A dialog that fits each setting 
Get the update 
GitHub Copilot CLI now has a unified, schema-driven home for configuration. The new /settings slash command combines the scattered commands like /theme , /streamer-mode , and /experimental with options that previously required manually editing your settings file into a single, discoverable surface.
One command, three ways to use it 
/settings works whether you want a guided UI, a quick one-liner, or a scripted change in a copilot -p invocation:
/settings opens a full-screen, sectioned dialog where you can browse and edit every user setting.
/settings sets a value inline (e.g., /settings autoUpdate true , /settings sessionSync.level full ).
/settings reset restores the default for a setting.
Keys are dotted paths into the CLI’s settings schema, and tab completion surfaces every available key — along with the description and the allowed values for booleans, enums, and enum-or-string unions — right next to your prompt. No more guessing key names or types.
A dialog that fits each setting 
Open /settings with no arguments and you get a searchable, alt-screen dialog with editors built for each setting type:
Boolean toggles, enum pickers, and enum-or-string union pickers.
Free-form string and number editors, with a multi-line editor for prose.
Dedicated editors for string and number arrays and generic records.
A $EDITOR fallback for complex JSON containers. Your settings file is only written after the new value parses and passes schema validation, so a typo can’t silently break your next session.
Press / to search, Ctrl + R to reset the focused setting to its default, and Ctrl + E to open the active settings file in your editor. Setting changes that have side effects (like colorMode or streamerMode ) apply live the moment you save, whether you toggled them inline, reset them, or edited the file directly.
Want to jump straight to a specific setting? /settings and /settings reset open the dialog focused on that key.
Get the update 
Update GitHub Copilot CLI by running copilot update in your terminal, then run /settings to take it for a spin. Share feedback with the /feedback command in a CLI session, or open an issue in our public repository .
Table of Contents
One command, three ways to use it 
A dialog that fits each setting 
Get the update 
Menu. Currently selected: One command, three ways to use it 
One command, three ways to use it 
A dialog that fits each setting 
Get the update 
client apps 
copilot 
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
Oct.28 Release 
GitHub intelligence puts your code, context, and history to work 
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