Update your IDE to restore agent activity in Copilot usage metrics - GitHub Changelog 
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
October 6, 2026 •
3 minute read 
Update your IDE to restore agent activity in Copilot usage metrics
Table of Contents
Update your IDE 
What to expect in your reports 
Why client-side metrics can differ from other Copilot data 
Menu. Currently selected: Update your IDE 
Update your IDE 
What to expect in your reports 
Why client-side metrics can differ from other Copilot data 
If your Copilot usage metrics have shown agent activity or agent lines of code falling while Copilot usage kept growing, we’ve found the cause, and a fix is rolling out to each IDE. Several IDEs recently moved Copilot agent sessions to the Copilot SDK. Those sessions didn’t identify which IDE they came from, so usage metrics couldn’t attribute them correctly. Most of that activity was left out of reports, and some was counted as Copilot CLI activity. Only IDE versions that use the Copilot SDK for agent mode are affected. Developers on earlier versions are still counted.
The fix is available now in Visual Studio Code. Other IDEs will receive it in upcoming releases, which we expect to finish rolling out by November 2026. Once developers update, their agent activity is counted again in the Copilot usage metrics dashboard and API.
Update your IDE 
Agent activity is counted again once developers are on these versions. If your developers are on an affected version, update as soon as the fixed version is available, because their activity can’t be recovered later. If you manage IDE versions centrally and rely on agent metrics, you can plan your rollout to move developers directly to these versions.
IDE 
Version 
Availability 
Visual Studio Code 
1.139.0 and later 
Available now 
Visual Studio 
18.12 
Not yet released, expected in October 2026 
JetBrains IDEs 
Next plugin release 
Not yet released, expected by late October 2026 
Eclipse 
Next plugin release 
Not yet released, expected by November 2026 
Xcode 
Next plugin release 
Not yet released, expected by November 2026 
We’ll add each version to the supported IDEs in the docs as it ships.
What to expect in your reports 
Billing isn’t affected. This issue only changed how agent activity was attributed in usage metrics, not what you were charged.
The gap persists for any developer on an affected IDE version until they update. Until then, their agent interactions and agent lines of code (e.g., loc_added_sum and loc_deleted_sum for agent_edit ) stay undercounted. This applies to enterprise, organization, and user reports, for both 1-day and 28-day reports.
We can’t backfill missing data. Activity from affected IDE versions doesn’t identify which IDE it came from, so it can’t be attributed after the fact. Expect a gradual recovery as developers move to these versions rather than a single jump.
Copilot CLI metrics may be inflated, because some activity from other SDK-based clients was counted as Copilot CLI activity. This will clear up as developers update those clients, but earlier Copilot CLI metrics can’t be corrected, because that activity can’t be separated from real Copilot CLI use. Copilot CLI users don’t need to update.
Why client-side metrics can differ from other Copilot data 
Most detailed usage metrics (e.g., feature, language, model, and lines of code breakdowns) come from telemetry that each IDE sends. GitHub also records server-side data when Copilot handles a request. That data reliably shows who was active, but it can’t see what happens in the editor. When your reports and other Copilot data disagree, the gap is usually on the client side:
Telemetry is turned off in the IDE, so no detailed activity is sent.
A network proxy or firewall blocks the Copilot telemetry endpoint.
The IDE or Copilot extension is out of date and doesn’t send the events that metrics rely on.
The client changed how it sends telemetry , as with the Copilot SDK change above.
The client doesn’t send Copilot telemetry , such as an unsupported or third-party editor.
We’re steadily reducing how much your reports depend on client telemetry. Usage metrics now use server-side data to count active users that client telemetry misses and to identify the IDE for those users , and we’re continuing to expand where server-side data can fill in. Some detail, such as lines of code and accepted suggestions, can only come from the editor, so client-side gaps won’t disappear entirely. The most reliable way to keep your metrics complete is to manage your developers’ environments:
Keep IDEs and Copilot extensions current. Use your device management tooling to enforce minimum versions where you can.
Keep IDE telemetry enabled and allow the Copilot telemetry endpoint through proxies and firewalls.
Spot outdated clients in your reports. In per-user reports, totals_by_ide includes last_known_ide_version and last_known_plugin_version for each user.
To learn how usage metrics combine client-side and server-side telemetry, see Which usage is included? in the Copilot usage metrics documentation.
Table of Contents
Update your IDE 
What to expect in your reports 
Why client-side metrics can differ from other Copilot data 
Menu. Currently selected: Update your IDE 
Update your IDE 
What to expect in your reports 
Why client-side metrics can differ from other Copilot data 
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