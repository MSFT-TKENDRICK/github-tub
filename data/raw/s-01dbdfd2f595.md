Unlock language-specific rich symbol context using new find_symbol tool - Visual Studio Blog 
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
Unlock language-specific rich symbol context using new find_symbol tool 
February 11th, 2026 
6 reactions 
Unlock language-specific rich symbol context using new find_symbol tool
Sinem 
, 
Hannah 
Show more 
Refactoring at scale is a time-consuming and error-prone process for developers. In large codebases, developers have relied on manual searches and incremental edits across multiple files to accomplish these tasks.
Modern development workflows depend on fast and accurate code navigation to avoid these pitfalls. When developers refactor existing code, explore unfamiliar areas of a large codebase, or make targeted changes, they naturally rely on IDE language service features such as Find All References, Go to Definition, and Go to Implementation to understand how code is structured and connected.
Agent mode now has access to these same language-aware capabilities through the new find_symbol tool. This goes beyond traditional text or file search traditionally available in agent mode by enabling symbol-level reasoning powered by enterprise-grade language services.
What is find_symbol?
Find_symbol exposes rich, language-specific symbol information to Copilot Agent Mode, allowing the agent to reason about symbols (including functions, classes, interfaces, and variables).
Specifically, this tool allows Copilot agent mode to:
View all references of a given symbol across the entire codebase
Understand symbol metadata such as type, declaration, implementation, and scope
The find_symbol tool is available today in the latest Visual Studio 2026 Insiders version 18.4 . Supported languages include: C++, C#, Razor, TypeScript, and any other language for which you have a supported Language Server Protocol (LSP) extension installed.
For best results, write clear prompts and use AI models that support tool-calling. Learn more at  AI model comparison – GitHub Docs 
Example scenarios
All examples below were showcased using bullet3 , an open-source C++ physics simulation engine.
Adding additional functionality to existing code 
As applications evolve, you often need to enhance existing functions without breaking current behavior. This can include adding logging or performance metrics.
These tools help the agent quickly identify all relevant references, ensuring complete and accurate updates for feature additions.
API Refactoring 
Refactoring an API, such as hardening it, requires deep understanding of how the API is consumed across a codebase. With symbol-level insight, the agent can discover all usages, distinguish between call paths, and propose safe refactors with minimal breakage.
Tell us what you think
We appreciate the time you’ve spent reporting issues/suggestions and hope you continue to give us feedback when using Visual Studio on what you like and what we can improve. You can share feedback with us via Developer Community : report any bugs or issues via report a problem and share your suggestions for new features or improvements to existing ones.
Stay connected with the Visual Studio team by following us on  YouTube , X , LinkedIn ,  Twitch  and on  Microsoft Learn 
6 
7 
4 
Share on Facebook 
Share on X 
Share on Linkedin 
Copy Link 
-->
Category
GitHub Copilot 
Share
Author
Sinem Akinci 
Senior Product Manager
PM on the C++ team
Hannah Hong (SHE/HER) 
7 comments 
Discussion is closed. Login to edit/delete existing comments. 
Code of Conduct 
Sort by : 
Newest
Newest 
Popular 
Oldest 
sathyaraj shettigar -->
sathyaraj shettigar 
-->
February 18, 2026 
0 
Copy link to comment by sathyaraj shettigar 
-->
Collapse comment by sathyaraj shettigar 
-->
What about VSCode?
Spagget -->
Spagget 
-->
February 21, 2026 
0 
Copy link to comment by Spagget 
-->
Collapse comment by Spagget 
-->
Ctrl + F.
Would be good if that was added on the original function instead of copilot but microslop do what microslop do best, produce more slop.
Sinem Akinci -->
Sinem Akinci Author 
-->
February 19, 2026 
0 
Copy link to comment by Sinem Akinci 
-->
Collapse comment by Sinem Akinci 
-->
This support is now available for C++ in VS Code: https://devblogs.microsoft.com/cppblog/c-symbol-context-and-cmake-build-configuration-awareness-for-github-copilot-in-vs-code/ . If you’d like to see anything else, please let us know as we work towards improvements in this space!
sathyaraj shettigar -->
sathyaraj shettigar 
-->
February 22, 2026 
0 
Copy link to comment by sathyaraj shettigar 
-->
Collapse comment by sathyaraj shettigar 
-->
C# Needs this feature.
Nur Mohammad -->
Nur Mohammad 
-->
February 15, 2026 
0 
Copy link to comment by Nur Mohammad 
-->
Collapse comment by Nur Mohammad 
-->
https://devblogs.microsoft.com/visualstudio/unlock-language-specific-rich-symbol-context-using-new-find_symbol-tool/?commentid=30689#comment-30689 
Mike Gine -->
Mike Gine 
-->
February 11, 2026 
· Edited 
2 
Copy link to comment by Mike Gine 
-->
Collapse comment by Mike Gine 
-->
Yes please! finally C++ getting new features in Copilot, its always C#, C#, C#
I hope MSFT doesn’t stop supporting new things related to C++ because of their s***** decision of rewriting things in Rust 🤢
Peter Nimmo -->
Peter Nimmo 
-->
February 19, 2026 
0 
Copy link to comment by Peter Nimmo 
-->
Collapse comment by Peter Nimmo 
-->
I agree Mike. The C++ refactoring features are so far behind the C# ones its laughable.
Would love to have the ‘override’ trigger showing a list of methods that can be overridden from the base class and other such stuff such as generating classes that don’t yet exist in the same way you have access to as a C# Developer
Read next
February 19, 2026
Custom Agents in Visual Studio: Built in and Build-Your-Own agents 
Rhea,
Kelly
February 24, 2026
Visual Studio February Update 
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