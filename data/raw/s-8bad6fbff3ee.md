Copilot usage metrics now identify active and passive Copilot code review users - GitHub Changelog 
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
April 6, 2026 •
1 minute read 
Copilot usage metrics now identify active and passive Copilot code review users
Copilot usage metrics now indicate which users have Copilot code review (CCR) activity, and whether that activity was active or passive. Enterprise and organization admins can see how users engage with Copilot code review on daily and 28-day user-level reports, enabling a clearer picture of CCR adoption and engagement.
Within the API response , CCR usage is represented by two fields at the user level:
used_copilot_code_review_active : Set to true when a user intentionally engaged with Copilot code review by:
Assigning Copilot as a reviewer on a pull request.
Requesting Copilot reviews again.
Applying a CCR suggestion.
used_copilot_code_review_passive : Set to true when Copilot code review automatically ran on a user’s pull request (via a repo-level policy), but the user did not interact with the review.
If a user has both active and passive CCR events on the same day, the active signal takes precedence.
You can learn more in our documentation about Copilot usage metrics .
Why this matters 
With this update, you can:
Measure real engagement, not just coverage. Distinguish between users who actively interact with Copilot code review and those whose pull requests are reviewed automatically but without engagement.
Track adoption maturity. An admin can now say “100% of my repositories are covered by CCR, and 60% of my users engage with those reviews actively” instead of a single, undifferentiated active-user count.
Distinguish across Copilot surfaces. used_copilot_code_review_active / used_copilot_code_review_passive sit alongside used_agent (IDE agent mode) and used_copilot_coding_agent (CCA) for a complete view of adoption.
Visit our API documentation to learn more.
Join the discussion within GitHub Community .
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