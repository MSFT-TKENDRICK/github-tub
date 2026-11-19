GitHub Actions now supports uploading and downloading non-zipped artifacts - GitHub Changelog 
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
February 26, 2026 •
1 minute read 
GitHub Actions now supports uploading and downloading non-zipped artifacts
GitHub Actions now supports uploading and downloading non-zipped artifacts within workflows. Previously, when you uploaded an artifact using the actions/upload-artifact action it was automatically zipped. Downloading it using the actions/download-artifact action or directly from the browser would download this file zipped. Many users found this additional compression frustrating and told us it added significant friction to their workflows.
We have added support to these actions so that you can upload unzipped artifacts and also download them unzipped. This solves three major problems that you raised to us:
You no longer have to unzip when downloading a single file via the browser.
If your browser supports viewing the file type natively, you can view files directly in your browser. This is great for simple HTML files (without links to CSS or JS), images, or markdown. This includes mobile browsers as well.
If you upload a compressed file to maintain permissions or reduce size, you no longer have a compressed file within another compressed file (i.e., the double zip problem).
These changes only apply to artifacts uploaded with actions/upload-artifact v7 where you have set the archive parameter to false . This value is currently defaulted to true for backwards compatibility. Previously uploaded artifacts and any artifacts uploaded with older versions of the action will continue to be zipped. You will also need to update to v8 of actions/download-artifact if you use that action.
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