Improved pull request Files changed – February 5 updates - GitHub Changelog 
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
February 5, 2026 •
2 minute read 
Improved pull request Files changed – February 5 updates
Table of Contents
🗂️ Codeowner validation 
📲 Small screens improvements 
🚀 Performance improvements 
🔧 More fixes and improvements 
❤ Feedback 
Menu. Currently selected: 🗂️ Codeowner validation 
🗂️ Codeowner validation 
📲 Small screens improvements 
🚀 Performance improvements 
🔧 More fixes and improvements 
❤ Feedback 
This release brings CODEOWNERS validation to the new “Files changed” experience and includes broad performance improvements across common review workflows. Navigation between pull request tabs is faster and more reliable, especially when moving between Conversations and Files changed . Review interactions are smoother for the largest pull requests, with better scrolling, reduced memory usage, and overall stability improvements.
🗂️ Codeowner validation 
We added CODEOWNERS validation, filling a gap from the classic “Files changed” experience. Required reviewers are now correctly surfaced based on CODEOWNERS rules, ensuring review requirements are accurately enforced before merge.
📲 Small screens improvements 
We are rolling out improvements to the “Files changed” experience on small screens by fixing multiple layout, spacing, and overflow issues, ensuring diffs, comments, headers, and controls render and behave correctly on mobile and smaller viewports.
🚀 Performance improvements 
Performance is a top priority for us. Based on your feedback, we’ve shipped several improvements in the past week that directly address lag issues, with a focus on larger pull requests:
Pull request diffs have been optimized for greater responsiveness when clicking, typing, and scrolling on the page. Early data shows large pull requests in the new files changed experience respond up to 67% faster to these kinds of interactions.
Only the largest pull requests use virtualization to enhance performance while scrolling and interacting.
It’s now quicker to navigate between the Conversations and Files tabs, with load times from 10+ seconds to a few seconds.
Resizing the file tree is now smoother and more responsive, even for large pull requests with many files.
Improved performance and stability when reviewing pull requests in Safari.
Fixed high memory usage when reviewing large pull requests.
🔧 More fixes and improvements 
Fixed: The issue where opening a notification directly into the Files changed tab did not mark the notification as read. Notifications now correctly update their read state when viewed, matching the behavior of the classic experience.
Fixed: An issue where the file diff header was not consistently sticky when scrolling.
Fixed: An issue where code snippets in thread replies had a background color that was hard to distinguish from the reply background.
Fixed: An error that occurred when commenting across large index differences in diffs.
❤ Feedback 
Your feedback is important. You can report problems, ask questions, and view known issues in the “Files changed” preview feedback discussion .
Table of Contents
🗂️ Codeowner validation 
📲 Small screens improvements 
🚀 Performance improvements 
🔧 More fixes and improvements 
❤ Feedback 
Menu. Currently selected: 🗂️ Codeowner validation 
🗂️ Codeowner validation 
📲 Small screens improvements 
🚀 Performance improvements 
🔧 More fixes and improvements 
❤ Feedback 
collaboration tools 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Nov.05 Release 
New pull request overview page in public preview 
collaboration tools 
Oct.28 Release 
Introducing Replica, an open-source AI prototyping tool 
collaboration tools 
community engagement 
universe26 
... 
+2 
Oct.28 Release 
Pull request limits: Exempt contributors by age or history 
collaboration tools 
universe26 
... 
+1 
Oct.28 Release 
Moderate role for GitHub Issues generally available 
collaboration tools 
community engagement 
universe26 
... 
+2 
Oct.22 Improvement 
Pull requests: Saved whitespace preferences and improved split view 
collaboration tools 
Oct.15 Improvement 
Multi-repository support and other improvements for GitHub in Slack and Teams 
collaboration tools 
copilot 
... 
+1 
Oct.08 Improvement 
Triage role users or higher can now archive pull requests 
collaboration tools 
Oct.08 Improvement 
Draft pull requests count toward pull request limits 
collaboration tools 
Oct.06 Release 
Stacked pull requests generally available 
collaboration tools 
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