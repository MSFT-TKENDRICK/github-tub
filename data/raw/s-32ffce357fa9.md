Upcoming deprecation of GitHub Spark on github.com - GitHub Changelog 
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
August 4, 2026 •
2 minute read 
Upcoming deprecation of GitHub Spark on github.com
Beginning August 4, 2026, GitHub Spark no longer accepts new users or allows the creation of new apps. Existing users can continue to access GitHub Spark until August 31, 2026 to export apps they’ve already created. Apps you’ve already deployed will continue to work after GitHub Spark is retired.
GitHub Spark was created to help people quickly move from an idea to a working application. Since its launch, AI models and agentic development tools have advanced significantly. Builders can now build and refine these experiences through GitHub Copilot in the environments where they already work, including VS Code, Copilot CLI, and the GitHub Copilot app. We’ve seen builders increasingly choose these integrated workflows for application development, and we’re aligning our experiences accordingly. This change applies specifically to the current GitHub Spark experience on github.com.
Separately, GitHub Models, the inference service used by Spark’s llm() function, retired on July 30, 2026 . As of that date, calls to llm() no longer work. Apps that don’t use llm() aren’t affected by the GitHub Models retirement.
What this means for you 
Existing apps you’ve already deployed will continue to work after GitHub Spark shuts down.
Export your app code before August 31, 2026 if you want to keep editing your app in the future. To do this, open the Spark workbench for your app, select … , then select Create repository .
If your app uses llm() , replace it with your own inference provider to keep AI features working.
Not all Spark apps use AI inferencing. To check whether an app is affected by the GitHub Models retirement, open the app in Spark and search the code for llm() . If there are no llm() calls found, no action is needed. If the app does use llm() , replace inferencing with a separate provider to keep the app running with AI capabilities. Users will need to supply their own API key and manage billing going forward in this instance, as GitHub will not provide the underlying model or tokens any longer.
Questions or feedback? Join the discussion within GitHub Community .
copilot 
ecosystem & accessibility 
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
Oct.29 Improvement 
Webhook IP ranges added to the Meta API 
ecosystem & accessibility 
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