Today I will... Modernize a .NET application - Visual Studio Blog 
Skip to main content 
Dev Blogs 
AI 
All .NET posts 
.NET MAUI 
ASP.NET Core 
Blazor 
Entity Framework 
C++ 
C# 
F# 
TypeScript 
NuGet 
Servicing 
.NET Blog in Chinese 
Microsoft for Developers 
Agent Framework 
Develop from the cloud 
Xcode 
ISE Developer 
TypeScript 
PowerShell 
Python 
Java 
Java Blog in Chinese 
Go 
Microsoft Edge Dev 
Microsoft 365 Developer 
Microsoft Entra Identity Developer 
Microsoft Entra PowerShell 
Visual Studio 
Visual Studio Code 
Aspire 
All things Azure 
Azure SDK 
Azure VM Runtime Team 
Microsoft Azure 
Azure Cosmos DB 
Azure DocumentDB 
Azure Data Studio 
Azure SQL 
DevOps 
DirectX 
Microsoft Foundry 
Power Platform 
OData 
Unified Data Model (IDEAs) 
Windows Command Line 
#ifdef Windows 
Inside MSIX 
MIDI and music 
React Native 
The Old New Thing 
Foundry on Windows Windows Developer 
Dev Blogs 
Visual Studio Blog 
Today I will… Modernize a .NET application 
August 21st, 2026 
8 reactions 
Today I will… Modernize a .NET application
Matt 
, 
Pablo 
Show more 
Today I will modernize a .NET Framework application to .NET 10 using the GitHub Copilot modernization tooling built-in to Visual Studio.
The tooling helps us upgrade applications running on legacy versions of .NET and also migrate them to Azure. Today we’re going to focus on the upgrade portion.
And, the tooling will do all the work for us! But it doesn’t do everything at once, and that’s good. It introduces checkpoints into the .NET upgrade process to tell us what it has been up to we can then guide it towards the outcome we want. And at each of those checkpoints it creates a markdown file that we can check in to source control – in other words, a record of both what came out of and what went in to the upgrade process.
The app we’re modernizing
BookCatalog is a simple .NET Framework forms-over-data app. You can list books, add one, edit, delete. 
Step 1: Open the sample
Clone the repo and open BookCatalog.sln from shared-legacy-app/ .
git clone https://github.com/microsoft/dotnet-modernization-for-beginners.git 
Open BookCatalog.sln in Visual Studio 2022+ from the shared-legacy-app in the folder you cloned.
Step 2: Start modernization
In Visual Studio, right-click the project or solution and select Modernize. You can also start from Visual Studio with @Modernize .
That opens the GitHub Copilot chat window with a customized modernization agent / experience loaded up. This agent is specifically tuned to go through the process of modernizing applications.
It provides several sample prompts, but you can also tell it what to do in natural language.
But for today, pick the top suggested prompt Upgrade to a newer version of .NET. 
The agent will then ask you 2 questions. The first is which target framework to upgrade to – pick  .NET 10 .
And then the flow mode. Remember when I said the modernization process would stop at checkpoints along the way – well, it’ll only do that if we pick Guided so pick that.
What Guided is going to do is it will pause and let you check its work.
The agent will first assess our project and create a report. The guided mode allows us to review that report and make any changes to it. And … we can check that report in to source control. (It looks good – show it to your boss you’ll look super productive! 😉)
Then it will create a plan to fix any issues and do the upgrade. Guided mode lets us review and update that plan should we want to. Guided mode shows us a step-by-step execution of the upgrade itself. You get the picture.
Step 3: Review the assessment
The first thing it rolls through is the assessment. The assessment helps separate blockers, warnings, and informational findings before the upgrade itself starts to run.
The assessment helps you understand what must change first. In this sample, the modernization work includes moving from System.Web.Mvc patterns toward ASP.NET Core equivalents and moving the data layer from Entity Framework 6 to EF Core.
Step 4: Review the upgrade plan
Once you approve the assessment, the agent will start to create a plan on how it will do the upgrade and it’ll present you with some options on how it can do it.
We could modify the options of how the agent creates the upgrade plan, but we’ll take the default.
Then it produces the plan. It’s a good idea to read that through. This forms the basis of how the agent will upgrade the app.
Step 5: Upgrade! 
Approve the plan and the agent starts working through the tasks one at a time.
Guided mode will pause between the tasks so you can check on its work.
Five tasks later, it’s done!
Verify it
F5 the application and it should start up. Now, of course AI did the work. And it may not have worked the first time through. You never get the same thing twice with AI. In that case, use Visual Studio’s GitHub Copilot debugging features and you should get it up and running very quickly.
And once the app does start up… it looks exactly the same! The modernization agent doesn’t upgrade the UX for you – that’s for you to vibe on your own.
Wrap-up
The app is upgraded to .NET 10. If you want you can use the GitHub Copilot modernization for .NET tooling to migrate it to Azure too.
We’ve created a course : .NET Modernization for Beginners that goes more in-depth into both the upgrade and migration flows. Check it out. And of course, leave some comments on this post to let us know your experiences.
View the .NET Modernization for Beginners course! 
AI-assisted content. This article was partially created with the help of AI. An author
reviewed
and revised the content as needed. Learn more 
8 
9 
0 
Share on Facebook 
Share on X 
Share on Linkedin 
Copy Link 
-->
Category
Copilot 
Modernization 
Visual Studio 
Topics
GitHub Copilot 
Modernization 
Share
Author
Matt Soucoup 
Principal Cloud Developer Advocate
Matt Soucoup is a Principal DevRel Lead for .NET at Microsoft, where he leads the team that helps .NET developers build with Azure, AI, and GitHub Copilot. He's spent years writing code, giving talks, and building demos that help them make the most of the tooling, lately focused on agentic AI and running Copilot as an agent in production apps.
Pablo Lopes 
Pablo is a member of the Microsoft Advocacy team, specializing in Application Development. Being committed to bridging communities—students, startups, developers, and corporate entities—through the power of .NET, Python, Azure, AI, and the broader Microsoft stack.
9 comments 
Discussion is closed. Login to edit/delete existing comments. 
Code of Conduct 
Sort by : 
Newest
Newest 
Popular 
Oldest 
Jonathan Matthew Beck -->
Jonathan Matthew Beck 
-->
September 9, 2026 
0 
Copy link to comment by Jonathan Matthew Beck 
-->
Collapse comment by Jonathan Matthew Beck 
-->
Today I will modernize a .NET Framework application to .NET 10 using the GitHub Copilot modernization tooling built-in to Visual Studio. 
I very much want to make use of this at my job. Tons of apps to modernize! However there is a bigger issue. My company has Azure DevOps and M365 Copilot. They do not have anything in Github and Github Copilot is not available to us.
Is it possible to make this Modernize… feature work in my environment?
Michael Taylor -->
Michael Taylor 
-->
August 24, 2026 
3 
Copy link to comment by Michael Taylor 
-->
Collapse comment by Michael Taylor 
-->
For simple apps then the tooling works OK but for a realistic app it fails miserably. I have yet to see it successfully migrate an app. At a minimum it gives up on anything that is outside some standard MS dependencies. EF to EF Core, for example, it struggles with and often converts wrong. It also has issues with even basic API projects.l
Another aspect that is incredibly frustrating is that you can give it very specific instructions, even instructions it generated for previous projects of the same type, and it still either doesn't follow them or it changes them. Legacy...
Read more For simple apps then the tooling works OK but for a realistic app it fails miserably. I have yet to see it successfully migrate an app. At a minimum it gives up on anything that is outside some standard MS dependencies. EF to EF Core, for example, it struggles with and often converts wrong. It also has issues with even basic API projects.l
Another aspect that is incredibly frustrating is that you can give it very specific instructions, even instructions it generated for previous projects of the same type, and it still either doesn’t follow them or it changes them. Legacy web adapters is a common problem. The fact that I want to run the migration without getting prompted for everything, aka silent, is also ignored. It may convert 1 file it may convert 20 and then it prompts you if you want to continue. For anything beyond small apps it can easily take over an hour for it to make changes, prompt to continue and then continue again. It is faster to grep and upgrade the easiest stuff yourself.
Yet another problem is that it eats through your tokens really fast, even with great instructions. We have an “unlimited” plan and I still ran out of tokens for the month upgrading one of our larger projects. It took almost 2 hours and was about 2/3 of the way done and then it gave up. So I had to start again and it ran out of tokens within a couple of minutes. Interestingly going to GitHub Copilot and looking at usage it said 0 out of X with the inidicator saying I had unlimited and had used 0 tokens. But below that it said I had run out of tokens for the month.
Modernization is a problem AI should be able to solve as it is mundane and straightforward. But the current tooling and licensing restrictions make this task impossible. I have yet to successfully migrate any real application with Copilot and I’ve been trying since the original Dotnet Migrate tooling.
Read less 
Mika Dumont -->
Mika Dumont 
-->
September 2, 2026 
0 
Copy link to comment by Mika Dumont 
-->
Collapse comment by Mika Dumont 
-->
Hi Michael, thanks for the detailed feedback, this is really useful. We’ve filed it on our repo so it’s tracked: https://github.com/microsoft/upgrade-agent-plugins/issues/39 .
If you don’t mind adding more detail on the issue, especially a project shape we could reproduce like the EF6 to EF Core conversion that came out wrong, that would help us investigate further.
Pablo Lopes -->
Pablo Lopes 
-->
August 24, 2026 
0 
Copy link to comment by Pablo Lopes 
-->
Collapse comment by Pablo Lopes 
-->
Thanks for sharing your feedback, Michael. Yes, modernization is rarely a one-click process, especially for larger applications with custom dependencies and complex architectures, the goal of the modernization tooling isn't to replace engineering judgment, but to accelerate the parts that are repetitive and time-consuming.
Feedback like yours is really appreciated because it helps us understand where the tooling still falls short in real-world projects. If there are specific migration scenarios that consistently fail for you, we'd love to hear more about them. We are in search for the specific feedback for issues like yours and iterating constantly to improve the product....
Read more Thanks for sharing your feedback, Michael. Yes, modernization is rarely a one-click process, especially for larger applications with custom dependencies and complex architectures, the goal of the modernization tooling isn’t to replace engineering judgment, but to accelerate the parts that are repetitive and time-consuming.
Feedback like yours is really appreciated because it helps us understand where the tooling still falls short in real-world projects. If there are specific migration scenarios that consistently fail for you, we’d love to hear more about them. We are in search for the specific feedback for issues like yours and iterating constantly to improve the product. If you would want, we could get in touch to understand your issues in a deeper level.
Read less 
Arp, Matthew -->
Arp, Matthew 
-->
August 24, 2026 
· Edited 
0 
Copy link to comment by Arp, Matthew 
-->
Collapse comment by Arp, Matthew 
-->
Really don’t love that we’ve resigned to relying on AI to update projects. A simple utility to update solution/project files to the new format would have been really nice instead making us “ask” a chatbot to do it for us.
Pablo Lopes -->
Pablo Lopes 
-->
August 24, 2026 
0 
Copy link to comment by Pablo Lopes 
-->
Collapse comment by Pablo Lopes 
-->
That’s a fair point Matthew! The challenge is that many modernization projects go well beyond updating project files and package references. They often involve API changes, framework replacements, configuration differences, dependency analysis, and architectural decisions that aren’t always the same from one application to another.
The AI-assisted approach is designed to help navigate that broader set of changes while still keeping the developer in control through reviews, plans, and checkpoints. If you would have any suggestions of improvement, the team would love to hear your feedback with more details and how we can support you with modernization overall!
Pablo Lopes -->
Pablo Lopes 
-->
August 26, 2026 
· Edited 
0 
Copy link to comment by Pablo Lopes 
-->
Collapse comment by Pablo Lopes 
-->
Hey folks, thanks. Really appreciate the feedback. I’m gathering all of the comments and sharing them with the product team so we can better understand where the experience is working well and where it needs improvement. We truly looks towards continue to evolve the modernization tooling.
Arp, Matthew -->
Arp, Matthew 
-->
August 26, 2026 
0 
Copy link to comment by Arp, Matthew 
-->
Collapse comment by Arp, Matthew 
-->
I think part of the issue is the fact that MS sees updating project structure and transitioning to .NET CORE as one in the same. In theory we should have a discreet process that can convert to new project structure without having to transition to .NET CORE. Then the developers can work on elevating code/dependencies to .NET CORE using whatever method they see fit (AI assisted or not).
WM Z -->
WM Z 
-->
August 26, 2026 
0 
Copy link to comment by WM Z 
-->
Collapse comment by WM Z 
-->
I agree with Matthew.
The new modernization by Copilot is not only slow but also token consuming. I tried it once and it took a lot of time thinking but finally failed. I eventually gave the code to Deepseek and it gave me a almost working version within seconds.
Years ago, there was a "stupid, non-AI" but quick version that we could use it to convert the project files within seconds.
Please bring back that tool as an alternative. So there's a quick start.
We can ask AI for the rest of the conversion task if things really get complicated and we...
Read more I agree with Matthew.
The new modernization by Copilot is not only slow but also token consuming. I tried it once and it took a lot of time thinking but finally failed. I eventually gave the code to Deepseek and it gave me a almost working version within seconds.
Years ago, there was a “stupid, non-AI” but quick version that we could use it to convert the project files within seconds.
Please bring back that tool as an alternative. So there’s a quick start.
We can ask AI for the rest of the conversion task if things really get complicated and we can not cope with it.
Read less 
Read next
August 24, 2026
Unlocking the Power of AI for Every Developer in Visual Studio with Bring your Own Model 
Tanmayee Kamath 
August 25, 2026
Visual Studio August Update – Work Smarter Across Models and Branches 
Mark Downie 
Stay informed
Get notified when new posts are published.
Email * 
Country/Region * 
Select... United States Afghanistan Åland Islands Albania Algeria American Samoa Andorra Angola Anguilla Antarctica Antigua and Barbuda Argentina Armenia Aruba Australia Austria Azerbaijan Bahamas Bahrain Bangladesh Barbados Belarus Belgium Belize Benin Bermuda Bhutan Bolivia Bonaire Bosnia and Herzegovina Botswana Bouvet Island Brazil British Indian Ocean Territory British Virgin Islands Brunei Bulgaria Burkina Faso Burundi Cabo Verde Cambodia Cameroon Canada Cayman Islands Central African Republic Chad Chile China Christmas Island Cocos (Keeling) Islands Colombia Comoros Congo Congo (DRC) Cook Islands Costa Rica Côte dIvoire Croatia Curaçao Cyprus Czechia Denmark Djibouti Dominica Dominican Republic Ecuador Egypt El Salvador Equatorial Guinea Eritrea Estonia Eswatini Ethiopia Falkland Islands Faroe Islands Fiji Finland France French Guiana French Polynesia French Southern Territories Gabon Gambia Georgia Germany Ghana Gibraltar Greece Greenland Grenada Guadeloupe Guam Guatemala Guernsey Guinea Guinea-Bissau Guyana Haiti Heard Island and McDonald Islands Honduras Hong Kong SAR Hungary Iceland India Indonesia Iraq Ireland Isle of Man Israel Italy Jamaica Jan Mayen Japan Jersey Jordan Kazakhstan Kenya Kiribati Korea Kosovo Kuwait Kyrgyzstan Laos Latvia Lebanon Lesotho Liberia Libya Liechtenstein Lithuania Luxembourg Macau SAR Madagascar Malawi Malaysia Maldives Mali Malta Marshall Islands Martinique Mauritania Mauritius Mayotte Mexico Micronesia Moldova Monaco Mongolia Montenegro Montserrat Morocco Mozambique Myanmar Namibia Nauru Nepal Netherlands New Caledonia New Zealand Nicaragua Niger Nigeria Niue Norfolk Island North Macedonia Northern Mariana Islands Norway Oman Pakistan Palau Palestinian Authority Panama Papua New Guinea Paraguay Peru Philippines Pitcairn Islands Poland Portugal Puerto Rico Qatar Réunion Romania Rwanda Saba Saint Barthélemy Saint Kitts and Nevis Saint Lucia Saint Martin Saint Pierre and Miquelon Saint Vincent and the Grenadines Samoa San Marino São Tomé and Príncipe Saudi Arabia Senegal Serbia Seychelles Sierra Leone Singapore Sint Eustatius Sint Maarten Slovakia Slovenia Solomon Islands Somalia South Africa South Georgia and South Sandwich Islands South Sudan Spain Sri Lanka St Helena Ascension Tristan da Cunha Suriname Svalbard Sweden Switzerland Taiwan Tajikistan Tanzania Thailand Timor-Leste Togo Tokelau Tonga Trinidad and Tobago Tunisia Turkey Turkmenistan Turks and Caicos Islands Tuvalu U.S. Outlying Islands U.S. Virgin Islands Uganda Ukraine United Arab Emirates United Kingdom Uruguay Uzbekistan Vanuatu Vatican City Venezuela Vietnam Wallis and Futuna Yemen Zambia Zimbabwe 
I would like to receive the Visual Studio Blog Newsletter. Privacy Statement. 
Subscribe 
Follow this blog
Are you sure you wish to delete this
comment?
× -->
OK 
Cancel 
Sign in 
Theme 
Insert/edit link
Close 
Enter the destination URL
URL 
Link Text 
Open link in a new tab 
Or link to existing content
Search 
No search term specified. Showing recent items. 
Search or use up and down arrow keys to select an item. 
Cancel 
Code Block
× 
Paste your code snippet 
Ok 
Cancel 
Surface Laptop Ultra 
Surface Pro 
Surface Laptop 
Surface RTX Spark Dev Box 
Explore Copilot 
Explore Microsoft products 
Windows 11 apps 
Account profile 
Download Center 
Microsoft Store support 
Returns 
Order tracking 
Certified Refurbished 
Why buy from Microsoft Store 
Flexible Payments 
Microsoft in education 
Devices for education 
Microsoft Teams for Education 
Microsoft 365 Education 
How to buy for your school 
Educator training and development 
Deals for students and parents 
AI for education 
Microsoft AI 
Microsoft Security 
Dynamics 365 
Microsoft 365 
Microsoft Power Platform 
Microsoft Teams 
Microsoft Copilot 
Small Business 
Azure 
Microsoft Developer 
Microsoft Learn 
Support for AI marketplace apps 
Microsoft Tech Community 
Microsoft Marketplace 
Software companies 
Visual Studio 
Careers 
About Microsoft 
Company news 
Privacy at Microsoft 
Investors 
Diversity and inclusion 
Accessibility 
Sustainability 
Your Privacy Choices 
Consumer Health Privacy 
Sitemap 
Contact Microsoft 
Privacy 
Manage cookies 
Terms of use 
Trademarks 
Safety & eco 
Recycling 
About our ads