Visual Studio June Update - Track Your Usage, Trust Your Tools - Visual Studio Blog 
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
Visual Studio June Update – Track Your Usage, Trust Your Tools 
June 30th, 2026 
3 reactions 
Visual Studio June Update – Track Your Usage, Trust Your Tools
Mark Downie 
Principal Product Manager
Show more 
Visual Studio works best when you can see what’s happening and trust the tools you’ve added to your workflow. The June update is built around both. The Copilot Usage window gets a refresh with proactive alerts as you approach your limits, MCP servers now get a trust check before they run anything new, and the GitHub Copilot modernization agent for C++ graduates to general availability for MSVC upgrades.
We’ve also extended next edit suggestions across the entire active file and brought full-color emojis everywhere the editor renders text. Install the June Stable Channel update when you’re ready, then take a look at what’s new below.
Copilot usage tracking and alerts
GitHub Copilot usage is now calculated based on token consumption rather than by request, as part of its usage-based billing model . The refreshed Copilot Usage window in Visual Studio gives you a clearer view of where you stand against that model, with real-time updates as you work. Open it any time from the Copilot badge menu > Copilot Usage .
You’ll also see proactive alerts as you approach a limit, when you hit it, and when additional usage (overages) activates. The quota warning threshold is configurable, so you can decide how early you want the heads-up.
This is the start of a broader investment in Copilot usage visibility. Expect more in upcoming releases, and let us know on Developer Community what would help most.
Trust validation for MCP servers
MCP servers extend Copilot’s reach, and as more of your day-to-day workflow runs through them, the question of whether they’ve quietly changed underneath you becomes worth asking. Visual Studio now validates MCP server trust in two places during startup. Before the server process starts, the current configuration is compared against a previously trusted baseline. After it starts, the fingerprint of its tools, prompts, resources, and instructions is compared to the last-trusted fingerprint. If anything has diverged, a trust dialog asks you to review the changes before the server is allowed to run.
From the dialog you can accept the changes (which updates the baseline), check Don’t show me this dialog again for this server and pick Trust to always trust the server going forward, or pick Do not trust to reject the changes and abort startup. First-time connections are implicitly trusted and seed the initial baseline. Built-in servers, servers under a RegistryOnly policy, and any server you’ve explicitly set to always-trust skip the prompt entirely.
Trust validation is on by default. You can manage it at Tools > Options > GitHub > Copilot > Copilot Chat > Show trust dialog before running tools from an updated MCP server .
GitHub Copilot modernization agent for C++
The first C++ scenarios for the GitHub Copilot modernization agent are now generally available. These are the flows that upgrade your C++ projects to the latest version of the Microsoft C++ (MSVC) Build Tools , where the new features, performance improvements, and security updates live.
The agent analyzes your project, identifies compatibility issues, and lays out an upgrade plan. Run it in Automated mode to let it carry out the upgrade end to end, or in Guided mode to review and approve the assessment, plan, and execution steps before each one runs. Right-click a solution or project in Solution Explorer and pick Modernize , or open Copilot Chat and type @Modernize followed by your upgrade request.
Thanks to the developers who put the preview through its paces on real C++ projects — your feedback shaped where this landed. Let us know which C++ modernization scenarios you want next on the C++ Developer Community .
Long-distance next edit suggestions
Make a change in one place, and you usually know there are related edits to make further down the same file. GitHub Copilot’s next edit suggestions (NES) have always anticipated the next change, but until now they were limited to the area immediately around your cursor. That’s often not where the related edits actually are.
Long-distance next edit suggestions extends NES across the full active file. Copilot can predict and propose edits anywhere in the current file, helping you keep related code in sync without manually hopping between sections.
The feature is off by default for now. Turn it on under Tools > Options > Text Editor > Inline Suggestions by checking Enable extended range suggestions . The deep dive on the model training and evaluation behind long-distance NES is worth a read if you want the back story. Give it a try and tell us how it lands.
Color emojis
Emojis are now rendered in full color across Visual Studio. The same emoji you use to flag a bug, mark a section header, or highlight a TODO shows up with its real colors in the editor, in markdown previews, in GitHub Copilot Chat , in build output, and in Solution Explorer.
A red ❌ stands out as a warning, and a green ✅ reads as confirmation. The rendering uses modern font technologies, so what you see matches what your teammates see regardless of which Windows version they’re on.
From our entire team, thank you for choosing Visual Studio! For the latest updates, resources, and news, check out the Visual Studio Hub and stay in touch.
Happy coding! 
The Visual Studio team 
3 
0 
1 
Share on Facebook 
Share on X 
Share on Linkedin 
Copy Link 
-->
Category
Visual Studio 
Topics
C++ 
Copilot 
Share
Author
Mark Downie 
Principal Product Manager
Mark Downie is a software engineer and currently serves as a Principal Product Manager at Microsoft, where he focuses on removing friction from developer tools.
With more than 20 years of hands-on experience, Mark has engineered solutions across the financial services, healthcare, and manufacturing sectors.
0 comments
Discussion is closed. 
Code of Conduct 
Read next
July 13, 2026
The Visual Studio Dev/Test Benefit: Freedom to Build, Test, and Experiment in Azure 
James Rempt 
July 14, 2026
Built-in Agent Skills Bring .NET and Azure Expertise into Visual Studio 
Simona,
Wendy,
Yun
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