GitHub for Beginners: Getting started with GitHub Actions - The GitHub Blog 
Skip to content 
Skip to sidebar 
/ 
Blog 
Changelog 
Docs 
Customer stories 
Try GitHub Copilot app 
See what's new 
AI & ML 
AI & ML Learn about artificial intelligence and machine learning across the GitHub ecosystem and the wider industry.
Generative AI Learn how to build with generative AI.
GitHub Copilot Change how you work with GitHub Copilot.
LLMs Everything developers need to know about LLMs.
Machine learning Machine learning tips, tricks, and best practices.
How AI code generation works Explore the capabilities and benefits of AI code generation and how it can improve your developer experience.
Learn more 
Developer skills 
Developer skills Resources for developers to grow in their skills and careers.
Application development Insights and best practices for building apps.
Career growth Tips & tricks to grow as a professional developer.
GitHub Improve how you use GitHub at work.
GitHub Education Learn how to move into your first professional role.
Programming languages & frameworks Stay current on what’s new (or new again).
Get started with GitHub documentation Learn how to start building, shipping, and maintaining software with GitHub.
Learn more 
Engineering 
Engineering Get an inside look at how we’re building the home for all developers.
Architecture & optimization Discover how we deliver a performant and highly available experience across the GitHub platform.
Engineering principles Explore best practices for building software at scale with a majority remote team.
Infrastructure Get a glimpse at the technology underlying the world’s leading AI-powered developer platform.
Platform security Learn how we build security into everything we do across the developer lifecycle.
User experience Find out what goes into making GitHub the home for all developers.
How we use GitHub to be more productive, collaborative, and secure Our engineering and security teams do some incredible work. Let’s take a look at how we use GitHub to be more productive, build collaboratively, and shift security left.
Learn more 
Enterprise software 
Enterprise software Explore how to write, build, and deploy enterprise software at scale.
Automation Automating your way to faster and more secure ships.
CI/CD Guides on continuous integration and delivery.
Collaboration Tips, tools, and tricks to improve developer collaboration.
DevOps DevOps resources for enterprise engineering teams.
DevSecOps How to integrate security into the SDLC.
Governance & compliance Ensuring your builds stay clean.
GitHub recognized as a Leader in the Gartner® Magic Quadrant™ for AI Code Assistants Learn why Gartner positioned GitHub as a Leader for the second year in a row.
Learn more 
News & insights 
News & insights Keep up with what’s new and notable from inside GitHub.
Company news An inside look at news and product updates from GitHub.
Product The latest on GitHub’s platform, products, and tools.
Octoverse Insights into the state of open source on GitHub.
Policy The latest policy and regulatory changes in software.
Research Data-driven insights around the developer ecosystem.
The library Older news and updates from GitHub.
Unlocking the power of unstructured data with RAG Learn how to use retrieval-augmented generation (RAG) to capture more insights.
Learn more 
Open Source 
Open Source Everything open source on GitHub.
Git The latest Git updates.
Maintainers Spotlighting open source maintainers.
Social impact How open source is driving positive change.
Gaming Explore open source games on GitHub.
An introduction to innersource Organizations worldwide are incorporating open source methodologies into the way they build and ship their own software.
Learn more 
Security 
Security Stay up to date on everything security.
Application security Application security, explained.
Supply chain security Demystifying supply chain security.
Vulnerability research Updates from the GitHub Security Lab.
Web application security Helpful tips on securing web applications.
The enterprise guide to AI-powered DevSecOps Learn about core challenges in DevSecOps, and how you can start addressing them with AI and automation.
Learn more 
Search 
Categories
AI & ML 
Back AI & ML Learn about artificial intelligence and machine learning across the GitHub ecosystem and the wider industry.
Generative AI Learn how to build with generative AI.
GitHub Copilot Change how you work with GitHub Copilot.
LLMs Everything developers need to know about LLMs.
Machine learning Machine learning tips, tricks, and best practices.
How AI code generation works Explore the capabilities and benefits of AI code generation and how it can improve your developer experience.
Learn more 
Developer skills 
Back Developer skills Resources for developers to grow in their skills and careers.
Application development Insights and best practices for building apps.
Career growth Tips & tricks to grow as a professional developer.
GitHub Improve how you use GitHub at work.
GitHub Education Learn how to move into your first professional role.
Programming languages & frameworks Stay current on what’s new (or new again).
Get started with GitHub documentation Learn how to start building, shipping, and maintaining software with GitHub.
Learn more 
Engineering 
Back Engineering Get an inside look at how we’re building the home for all developers.
Architecture & optimization Discover how we deliver a performant and highly available experience across the GitHub platform.
Engineering principles Explore best practices for building software at scale with a majority remote team.
Infrastructure Get a glimpse at the technology underlying the world’s leading AI-powered developer platform.
Platform security Learn how we build security into everything we do across the developer lifecycle.
User experience Find out what goes into making GitHub the home for all developers.
How we use GitHub to be more productive, collaborative, and secure Our engineering and security teams do some incredible work. Let’s take a look at how we use GitHub to be more productive, build collaboratively, and shift security left.
Learn more 
Enterprise software 
Back Enterprise software Explore how to write, build, and deploy enterprise software at scale.
Automation Automating your way to faster and more secure ships.
CI/CD Guides on continuous integration and delivery.
Collaboration Tips, tools, and tricks to improve developer collaboration.
DevOps DevOps resources for enterprise engineering teams.
DevSecOps How to integrate security into the SDLC.
Governance & compliance Ensuring your builds stay clean.
GitHub recognized as a Leader in the Gartner® Magic Quadrant™ for AI Code Assistants Learn why Gartner positioned GitHub as a Leader for the second year in a row.
Learn more 
News & insights 
Back News & insights Keep up with what’s new and notable from inside GitHub.
Company news An inside look at news and product updates from GitHub.
Product The latest on GitHub’s platform, products, and tools.
Octoverse Insights into the state of open source on GitHub.
Policy The latest policy and regulatory changes in software.
Research Data-driven insights around the developer ecosystem.
The library Older news and updates from GitHub.
Unlocking the power of unstructured data with RAG Learn how to use retrieval-augmented generation (RAG) to capture more insights.
Learn more 
Open Source 
Back Open Source Everything open source on GitHub.
Git The latest Git updates.
Maintainers Spotlighting open source maintainers.
Social impact How open source is driving positive change.
Gaming Explore open source games on GitHub.
An introduction to innersource Organizations worldwide are incorporating open source methodologies into the way they build and ship their own software.
Learn more 
Security 
Back Security Stay up to date on everything security.
Application security Application security, explained.
Supply chain security Demystifying supply chain security.
Vulnerability research Updates from the GitHub Security Lab.
Web application security Helpful tips on securing web applications.
The enterprise guide to AI-powered DevSecOps Learn about core challenges in DevSecOps, and how you can start addressing them with AI and automation.
Learn more 
Changelog 
Docs 
Customer stories 
See what's new 
Try GitHub Copilot app 
Home / Developer skills / GitHub 
GitHub for Beginners: Getting started with GitHub Actions
Set up your first GitHub Actions workflow in this how-to guide.
Kedasha Kerr · @ladykerr 
March 16, 2026 
| 
8 minutes 
Share: 
Welcome back to our ongoing GitHub for Beginners series, now in its third season! Our previous episode was the first of the season, and we talked about getting started with GitHub Issues and Projects . This time we’re jumping into another very popular GitHub feature called GitHub Actions. By the end of this post, you’ll know how to use GitHub Actions and will have created your first automated workflow.
As always, if you prefer to watch the video or want to reference it, we have all of our GitHub for Beginners episodes available on YouTube . (And you can watch the full video of this tutorial above!)
What are GitHub Actions?
GitHub Actions is a Continuous Integration/Continuous Delivery (CI/CD) and automation platform built right into GitHub. You’ll often hear people call these “action workflows” or just “workflows.” It allows you to automate repetitive tasks and deployment processes using YAML files stored in your repository. You might use GitHub Actions for tasks like running vulnerability scans, tests, creating releases, or even reminding your team about important updates.
Action workflows are triggered by GitHub events like pushes, pull requests, or schedules, and they run in a virtual environment.
How workflows work
Before jumping right into the details about how workflows do their job, we need to define some essential terms.
Event : A specific activity that triggers a workflow (e.g., pushing code, opening a pull request, creating an issue, etc.)
Hosted runners : A virtual machine that executes jobs in a workflow. GitHub provides hosted runners, or you can set up your own self-hosted runners.
Jobs : A set of steps executed within the same runner. Each step is either a shell command or a prebuilt action from the GitHub Marketplace .
Workflows are triggered by events in a repository. This can be something like a pull request, merging a branch, or even opening an issue. When you create the workflow, you determine what the triggering event is.
When that event fires and triggers the workflow, GitHub spins up one or more jobs that execute on a runner. GitHub then follows the steps you programmed into the workflow until it reaches the end. And it does this all on its own, without any interaction necessary on your behalf. This is essentially how the GitHub Action workflow works.
Want more practice creating your own workflows and getting more familiar with GitHub Actions? Try out the Hello GitHub Actions skill exercise in our skills repository. 
Looking at a repository’s actions
Navigate to our sample repository, fork it, then select the Actions tab at the top. This page lists all of the current workflows for the repository. Select the green New workflow button in the left-hand column. This brings you to a new page, which presents several suggested workflows for this repository.
Select the Configure button for one of the suggested actions. For right now, it doesn’t matter which one you select. This pulls up an editor with a template written in YAML with three main sections you need to know when building an action workflow:
Name : Describes what your workflow does.
On : Defines what triggers the workflow.
Jobs : Where the actual work associated with this workflow happens.
Building a workflow
One of the best ways to learn is by doing, so let’s go ahead and create a simple workflow that will automatically label new issues created in our repository. First, head back to the main page for the sample repository and clone it to your machine. Then, navigate to the action-start branch.
GitHub Actions uses YAML syntax to define workflows. Each workflow is stored in a .yml file in a special .github\workflows directory in your repository. Go ahead and navigate to that directory.
When creating workflow files, you should use descriptive names that tell you what they do at a glance (e.g., build-and-test.yml , security-scanner.yml ). Since we know that we want to have this workflow label new issues, create a new file in this directory and call it label-new-issue.yml . Add the following to the top of the file:
Name: Label New Issues 
Now we need to decide what will trigger this workflow. GitHub has tons of trigger options, all of which are listed in our trigger workflows reference documentation , so you can choose based on what you’re building. In our case, we specifically want to have this workflow trigger whenever someone opens an issue. We do this by adding the following code to the bottom of the YAML file.
on: 
issues: 
types: [opened] 
Now we get to the good stuff: the jobs section, where the actual work happens. The first thing we’ll do is give our job a title and choose what type of machine runs it. GitHub provides hosted runners with different versions of Ubuntu, Windows, and macOS.
Let’s call this job label-issues and run it on ubuntu-latest . This tells GitHub to grab a machine from their pool of Ubuntu runners using the latest version available.
We also need to add permissions so the action can read the content of the repository and add the label. When we use the permissions keyword inside of a job, all actions and run commands within that job gain the access rights specified.
jobs: 
label-issues: 
runs-on: ubuntu-latest 
permissions: 
issues: write 
contents: read 
Okay, now we need to add the actual steps. This is where we define what happens in the job.
steps: 
- name: Checkout repository 
uses: actions/checkout@v6 
- name: Add triage label 
env: 
GH_TOKEN: ${{ secrets.GITHUB_TOKEN }} 
ISSUE_NUMBER: ${{ github.event.issue.number }} 
LABEL: "triage" 
run: gh issue edit "$ISSUE_NUMBER" --add-label "$LABEL" 
You’ll see two main keywords here: uses and run .
When you see uses , that’s pulling in a prebuilt action from the GitHub Marketplace. These are open-source reusable actions that handle common tasks, so you don’t have to write everything from scratch. Some examples of these type of actions include checking out your code or setting up NodeJS.
When you see run , that’s executing a command or script. This same keyword is used if it’s just a single line of code or a script that spans multiple lines.
The env section is where we define our environment variables. Since we are using the GitHub CLI in our run section, we need to provide an access token for the action to be able to access the repository. We do this by setting the GH_TOKEN environment variable. GitHub automatically provides a temporary access token when it creates this job and provides it in the GITHUB_TOKEN variable.
We also need to have variables to indicate which issue we want to update, as well as which label we want to add. In order for this to work, that label needs to already exist in the repository.
Congratulations! You’ve now successfully completed authoring your first workflow!
Testing your workflow
Now that we have the workflow, it’s time to test it. In order to do so, we first need to push these changes up to the repository and merge them into the main branch. So go ahead and do that now. Once it’s in the main branch, we can see it in action. If you have any questions about how to push your code, you can check out our earlier GitHub for Beginners episode about adding code to your repository .
Once your workflow is uploaded, let’s see it work. Navigate to the repository in your browser, and select the Issues tab. In the top-right corner, select the green New issue button. Provide a title and description indicating that you’re testing the workflow, and then click Create at the bottom of the window.
GitHub will create the issue and automatically bring you to the page showing the issue’s history. Assuming everything is working correctly, you’ll see the triage label added within seconds of when you created the issue.
Nice work! You can now see how convenient it can be to have some actions automatically handle tasks based on specific triggers.
Reviewing current workflows
Select the Actions tab at the top of the window. You’ll see all of the actions listed in a column on the left-hand side of the window. Select Label New Issues to filter the view to show just the times this workflow has run.
Select the top workflow, which should be for the test issue you created in the previous step. This brings you to a detail page where you can see more information about this specific instance of the workflow. Select label-issues in the main window.
Now you can see all of the steps taken in order to complete the workflow. This can be very useful for debugging purposes if one of your workflows is not working as expected. If you want to rerun this workflow, you can do so by clicking the Re-run all jobs button in the top-right.
If there’s ever a situation where you need to pause a workflow, you can do that from the Actions tab. Navigate back to that tab, and once again select Label New Issues in the left column. Click the three dots ( … ) in the window on the right, next to the search box. One of the options is Disable workflow . If you select this, it will stop the workflow from running, but it will still exist in the repository, so you can enable it later.
The Actions tab is where you’ll go to see and manage all of your workflows. You can check deployments, runners, metrics, performance, and caches all from this view. You can also view and edit your workflow files directly from this tab.
What’s next?
GitHub Actions can do a lot more than just label your issues. You can create actions to publish packages, greet new contributors, build and test your code, and even run security checks.
Keep learning about GitHub Actions by checking out our GitHub Actions documentations and start experimenting with creating your own workflows.
Happy coding!
Ready to level up? Check out these hands-on GitHub Skills exercises to get you building fast automate workflows with GitHub Actions > 
Tags:
GitHub Actions 
GitHub for beginners 
GitHub Skills 
Written by 
Kedasha Kerr 
@ladykerr 
Kedasha is a Developer Advocate at GitHub where she enjoys sharing the lessons she's learned with the wider developer community. She finds joy in helping others learn about the tech industry and loves sharing her experience as a software developer. Find her online @itsthatladydev.
GitHub Actions 
GitHub for beginners 
GitHub Skills 
Table of Contents
What are GitHub Actions?
How workflows work
Looking at a repository’s actions
Building a workflow
Testing your workflow
Reviewing current workflows
What’s next?
More on GitHub Actions 
Marketing ops as code: Automating events from planning to follow-up on GitHub 
If you can write down how you do your work, you can automate it. Here’s what I did to support GitHub’s APAC marketing team.
Tomoko Tanaka 
Your alt text passes automated checks. That doesn't mean it's any good. 
We built a plugin for the GitHub Accessibility Scanner to make sure your alt text is actually accessible. Here’s how it works.
Taarik Ashenafi & Keenan Zhou 
Related posts 
Career growth 
Hack the World: Why hackathons are still the best place to learn to build 
The barriers to building software have collapsed. Today, anyone can build. Hackathons are a great place to start learning.
Ed Summers 
AI & ML 
AI is changing developer work. Here are three skills to strengthen. 
Learn to direct AI agents, critically review their output, and keep technical judgment at the center of your workflow.
Gwen Davis 
Career growth 
From coder to orchestrator: How agents shift the role of a developer 
Developers are owning more of the delivery system around code, not just code itself. Join us during GitHub Universe to meet other devs, learn something new, and explore what’s next.
Natalie Guevara 
Explore more from GitHub 
Docs 
Everything you need to master GitHub, all in one place.
Go to Docs 
GitHub 
Build what’s next on GitHub, the place for anyone from anywhere to build anything.
Start building 
Customer stories 
Meet the companies and engineering teams that build with GitHub.
Learn more 
GitHub Universe 2026 
Catch up on the key announcements shaping the future of software development.
See what's new 
We do newsletters, too
Discover tips, technical guides, and best practices in our biweekly newsletter just for devs.
Your email address 
* 
Your email address 
Subscribe 
Yes please, I’d like GitHub and affiliates to use my information for personalized communications, targeted advertising and campaign effectiveness. See the GitHub Privacy Statement for more details. 
Subscribe 
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