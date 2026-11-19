Agent Skills in Visual Studio: Teach Copilot How Your Team Works - Visual Studio Blog 
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
Agent Skills in Visual Studio: Teach Copilot How Your Team Works 
May 13th, 2026 
11 reactions 
Agent Skills in Visual Studio: Teach Copilot How Your Team Works
Simona Liao 
Show more 
Visual Studio now supports Agent Skills , which are reusable instruction sets that teach Copilot agents how to handle specific tasks like running a build pipeline, generating boilerplate, or following your team’s coding standards. Define a skill once, and the agent applies it automatically whenever it’s relevant.
Creating a skill
You can create a skill directly from within Visual Studio. Click the tools icon in the bottom-right corner of Copilot Chat to open the skills panel, a dedicated view of every discovered skill. Click the + button in the top-right corner of the panel and follow the guided flow: choose a destination (global or solution-level skill), pick a name, and Visual Studio generates a skill template for you to fill in. Copilot Agent mode can then assist you in filling in the template. Currently this flow is only available in the Insiders channel and will be in Release soon.
You can also create a skill manually:
Create a skill directory in your repository ( .github/skills/my-skill/ ) or user profile ( ~/.copilot/skills/my-skill/ ).
Add a SKILL.md file following the agentskills.io/specification format.
Optionally include scripts, templates, or examples alongside it.
For example, you could have two skills, github-issues and code-review like this:
.github/
skills/
github-issues/
SKILL.md
templates/
bug-report.md
code-review/
SKILL.md
checklist.md 
Skills are auto-discovered from these locations:
Solution skills (shared via your solution): .github/skills/ , .claude/skills/ , .agents/skills/ 
Global/Personal skills (shared via your user profile and available across solutions): ~/.copilot/skills/ , ~/.claude/skills/ , ~/.agents/skills/ 
When a skill activates, it appears in the chat window so you always know what’s being applied.
If you are not sure where to start or what skills to create, please check out awesome-copilot for many great community examples, or dotnet/skills for skills written and supported by .NET experts from Microsoft!
Managing skills from the skills panel
In addition to creating new skills, you can also manage your skills easily from the skills panel.
From the panel you can:
Edit — Open any skill’s SKILL.md directly in the editor via the ⋯ menu.
Open file location — Jump to the skill directory on disk.
Search — Filter skills by name or keyword.
The panel also surfaces diagnostics for any skill configuration errors, so you can quickly spot and fix issues.
Skills vs. Custom Instructions: when to use what
You may already be using custom instructions ( .github/copilot-instructions.md ) to guide your Copilot’s behavior. Custom instructions are great for broad, always-on guidance, such as things like “use tabs, not spaces” or “prefer async/await over callbacks.” They are automatically applied to every interaction you have with Copilot.
Agent Skills are different. Skills are task-specific and dynamically loaded . The model decides when a skill is relevant and applies it only in matching contexts.
Custom Instructions 
Agent Skills 
Scope 
Always active 
Activated per-task 
Best for 
Coding style, conventions, general preferences 
Workflows, templates, multi-step procedures 
Structure 
Single markdown file 
Directory with SKILL.md + supporting files 
Examples 
“Use PascalCase for public methods” 
“When creating a GitHub issue, use this template and include severity, repro steps, and environment info” 
Use custom instructions for rules that should always apply. Use skills for specialized workflows that only matter in certain contexts. Another way to extend your agent’s capabilities is through MCP tools , which let the agent interact with external services and APIs. Skills and MCP tools complement each other well — a skill can describe how to handle a task while an MCP tool provides the capability to execute it.
Please give Agent Skills a try and share your feedback in the comments or on Developer Community .
Happy coding!
11 
7 
19 
Share on Facebook 
Share on X 
Share on Linkedin 
Copy Link 
-->
Category
GitHub Copilot 
Visual Studio 
Topics
GitHub Copilot 
Share
Author
Simona Liao 
7 comments 
Discussion is closed. Login to edit/delete existing comments. 
Code of Conduct 
Sort by : 
Newest
Newest 
Popular 
Oldest 
Frank Heimes -->
Frank Heimes 
-->
June 11, 2026 
· Edited 
0 
Copy link to comment by Frank Heimes 
-->
Collapse comment by Frank Heimes 
-->
Nice work!
This promises to become a powerfull feature!
We share our copilot settings in the root of our workspace, e. g. D:\WS\.github\copilot-instructions.md
Since we have multiple solutions in our workspace (D:\WS\A\A.sln, D:\WS\B\B.sln),
it would be great if the parent folders of these solution folders would also be searched for skills.
Consequently, the Create new skill dialog should also offer the destination:
Workspace - Available in all solutions - D:\WS\.github\skills
We really try to avoid using %USERPROFILE% and instead share everything using TFS/Azure workspaces, so all colleagues and project teams benefit from any configuration improvement without the need to duplicate the settings for...
Read more Nice work!
This promises to become a powerfull feature!
We share our copilot settings in the root of our workspace, e. g. D:\WS\.github\copilot-instructions.md
Since we have multiple solutions in our workspace (D:\WS\A\A.sln, D:\WS\B\B.sln),
it would be great if the parent folders of these solution folders would also be searched for skills.
Consequently, the Create new skill dialog should also offer the destination:
Workspace – Available in all solutions – D:\WS\.github\skills
We really try to avoid using %USERPROFILE% and instead share everything using TFS/Azure workspaces, so all colleagues and project teams benefit from any configuration improvement without the need to duplicate the settings for every solution folder.
Read less 
Simona Liao -->
Simona Liao Author 
-->
June 11, 2026 
1 
Copy link to comment by Simona Liao 
-->
Collapse comment by Simona Liao 
-->
Hi Frank, thanks for your feedback! The repo/workspace root location for skills work just finished and is pending release 🙂. It should be available in one of the upcoming releases soon.
Amaury Levé -->
Amaury Levé 
-->
May 19, 2026 
1 
Copy link to comment by Amaury Levé 
-->
Collapse comment by Amaury Levé 
-->
Don’t forget to also check dotnet/skills repo for skills and agents written and supported by .NET experts from Microsoft.
Simona Liao -->
Simona Liao Author 
-->
May 19, 2026 
0 
Copy link to comment by Simona Liao 
-->
Collapse comment by Simona Liao 
-->
Good callout! I will add it to the blog.
Andrew Ursel -->
Andrew Ursel 
-->
May 14, 2026 
1 
Copy link to comment by Andrew Ursel 
-->
Collapse comment by Andrew Ursel 
-->
Hi,
Great article!
Please correct the link to awesome-copilot 
Will there be in the future a possibility to centralize organizational skills in a repo of a github instead of having them in each individual repo or on the developer’s machine?
Best regards…Andrew
Simona Liao -->
Simona Liao Author 
-->
May 18, 2026 
· Edited 
1 
Copy link to comment by Simona Liao 
-->
Collapse comment by Simona Liao 
-->
Hi Andrew!
Thanks for catching the link issue. I just updated it. Regarding the location for storing skills, there are some existing feedback around wanting a configurable location for it: Developer community ticket. Please feel free to upvote this ticket if you want it relevant, or create a separate one regarding organizational skills specfically!
Currently, GitHub has support for organizational custom agents and we are working on supporting it. Once there is support for org-level skills, we will also add it to our backlog based on how many users want it! Thank you for sharing your feedback.
Read more Hi Andrew!
Thanks for catching the link issue. I just updated it. Regarding the location for storing skills, there are some existing feedback around wanting a configurable location for it: Developer community ticket . Please feel free to upvote this ticket if you want it relevant, or create a separate one regarding organizational skills specfically!
Currently, GitHub has support for organizational custom agents and we are working on supporting it. Once there is support for org-level skills, we will also add it to our backlog based on how many users want it! Thank you for sharing your feedback.
Read less 
Pranav Singh -->
Pranav Singh 
-->
June 10, 2026 
0 
Copy link to comment by Pranav Singh 
-->
Collapse comment by Pranav Singh 
-->
Still seems link to awesome-copilot is taking to github.com/anthropics/awesome-copilot instead of https://github.com/github/awesome-copilot 
Read next
May 14, 2026
VSLive! Microsoft AI Hackathon 2026: Send Your Team Home With Working Code 
Jim Harrer 
May 21, 2026
Plan Before You Build: Introducing the Plan agent in Visual Studio 
Rachel Kang (SHE/HER) 
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