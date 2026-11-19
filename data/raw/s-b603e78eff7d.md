setup-java v5.5.0: signature verification, Kona JDK, and Maven fixes - GitHub Changelog 
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
setup-java v5.5.0: signature verification, Kona JDK, and Maven fixes
The actions/setup-java v5.5.0 release adds cryptographic signature verification for downloaded JDKs, support for a new distribution, and several quality-of-life improvements for Maven users. Here’s what changed since v5.4.0.
Verify JDK download signatures: Set verify-signature: true and the action downloads the detached GPG signature and validates the JDK archive before installing it. Verification is supported today for the Temurin and Microsoft distributions, and enabling it for a distribution that doesn’t support it fails fast rather than silently skipping the check. You can supply your own trusted key with verify-signature-public-key .
New Tencent Kona JDK distribution: The new kona distribution lets you install Tencent Kona JDK directly.
Install a JDK without making it the default. With set-default: false , the action leaves JAVA_HOME and PATH untouched while still exporting JAVA_HOME__ and registering the JDK in Maven toolchains, so a single step can use a specific JDK without disturbing the rest of your workflow.
Auto-detect the distribution from .sdkmanrc : When you drive your Java version from a .sdkmanrc file, the action now infers the distribution from the SDKMAN identifier suffix (e.g., -tem resolves to Temurin), so you no longer have to repeat it in the distribution input.
Cleaner Maven build logs by default: The action now sets --no-transfer-progress in MAVEN_ARGS by default for Maven 3.9+ and the Maven Wrapper, giving you quieter logs out of the box. Any existing MAVEN_ARGS value is preserved, and you can restore the progress output with show-download-progress: true . The generated settings.xml also disables interactive mode so Maven never blocks a CI run waiting on a prompt.
Fixed Maven toolchains no longer grow unexpectedly: Running the action multiple times in a job previously appended duplicate entries to toolchains.xml . The generated file is now deduplicated by toolchain type and id, and your existing root attributes and non-JDK toolchains are preserved.
The v5.4.0 release shipped without a changelog post, so a few notable additions from that version are worth calling out too:
The free GraalVM Community distribution ( graalvm-community )
A javac problem matcher that surfaces compiler errors and warnings as inline annotations on your pull requests
Maven Wrapper caching when you enable cache: maven 
For reproducible, supply-chain-safe builds, pin the action to the exact v5.5.0 release tag or to its full commit SHA ( 0f481fcb613427c0f801b606911222b5b6f3083a ) for the strongest guarantee, rather than the floating v5 major tag.
For the full list of inputs and examples, see the setup-java advanced usage guide and the v5.5.0 release notes . As always, we welcome feedback and issues in the actions/setup-java repository.
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