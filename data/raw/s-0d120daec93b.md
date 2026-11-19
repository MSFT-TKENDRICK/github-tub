Visual Studio October Update – Compare Commits to Your Code, Resolve Conflicts in Bulk, Keep Coding - Visual Studio Blog 
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
Visual Studio October Update – Compare Commits to Your Code, Resolve Conflicts in Bulk, Keep Coding 
October 27th, 2026 
3 reactions 
Visual Studio October Update – Compare Commits to Your Code, Resolve Conflicts in Bulk, Keep Coding
Mark Downie 
Principal Product Manager
Show more 
The October Visual Studio update gives you a clearer view of how your code has changed and more control over resolving merge conflicts. Compare an earlier commit directly with your current working tree, including edits still in progress, and apply the same conflict resolution across multiple files at once.
There’s more to try beyond Git: a new Copilot chat experience, Hot Exit for unfinished work, keyboard shortcuts for organizing tabs, and a refreshed Fonts and Colors page. Update to the Visual Studio 2026 Stable Channel to get started.
Compare a Commit to Your Working Tree
Need to see how your current code differs from an earlier commit? You can now compare that commit directly with your working tree across your repository, including committed changes and edits still in progress. Use it to review a refactor across several commits or investigate what’s changed since a known-good version.
From commit history or the branch list in the Git Repository window , right-click a commit and select Compare with Working Tree . The compare view lets you browse changed files and inspect their diffs against the code you have today.
Bulk Resolve Merge Conflicts
When you already know which side to keep across several conflicted files, you shouldn’t have to repeat that choice for every file. You can now resolve conflicts across a group of files at once .
In Git Changes , right-click multiple selected files, a folder, or the repository root under Unmerged Changes and select Keep All Current or Take All Incoming . The selected resolution applies to all selected files, or all conflicted files within the selected folder or repository.
Try the New Copilot Chat Experience
The new GitHub Copilot Chat experience builds on the Copilot SDK foundation introduced with Agent (Preview) . That foundation now extends to Ask mode, Agent mode, and the underlying chat infrastructure, sharing the SDK used by the Copilot CLI and GitHub Copilot app.
It brings more capable end-to-end agent workflows with less back-and-forth, longer-running sessions with more effective prompt caching, and consistent behavior across Copilot experiences. To try it, open Tools > Options > GitHub > Copilot > Copilot Chat , select Use new Copilot chat experience , then restart Visual Studio.
Enable it for your next coding session and let us know how it handles the work. If something is missing or isn’t working, use Help > Send Feedback > Report a Problem to tell us.
Keep Unsaved Work with Hot Exit
Closing Visual Studio doesn’t have to mean deciding where to save every unfinished file. Hot Exit preserves your unsaved work between sessions , including new files you haven’t saved and edits to existing files.
When you reopen Visual Studio, it restores those documents and changes, along with your tab and window layout. It also preserves undo functionality for saved files, including Ctrl+Z . Hot Exit is off by default; to enable it, open Tools > Options , expand All Settings > Projects and Solutions > General , and select Reopen unsaved documents on solution load or empty environment.
https://devblogs.microsoft.com/visualstudio/wp-content/uploads/sites/4/2026/10/vs18.11_HotExit.mp4 
Move Documents with the Keyboard
You can now reorder tabs without reaching for the mouse . Press Ctrl+Shift+PgUp to move the active tab left or Ctrl+Shift+PgDn to move it right. With vertical tabs, the same shortcuts move it up or down. They work for documents and tool windows hosted in the document well.
Pinned and unpinned tabs stay separate. Vertical tabs stay within their project group, and manual reordering isn’t available when alphabetical sorting is enabled. Preview tabs can’t be moved.
You can remap Window.MoveTabLeft and Window.MoveTabRight in Tools > Options > Environment > Keyboard . The defaults replace the previous Text Editor bindings for Edit.ViewTopExtend and Edit.ViewBottomExtend ; those commands remain available if you want to assign them different shortcuts.
Personalize Fonts and Colors
Finding the right editor customization is easier with the refreshed Fonts and Colors experience, now built on Unified Settings. Category-based navigation and integrated search help you find the settings you want , while inline previews let you see colors and font styles alongside each item.
Foreground colors, background colors, font styles, and previews are all displayed in the settings grid, so you can review and update multiple items without repeatedly selecting each one. Changes also stay synchronized with settings.json , giving you a way to inspect, edit, share, or revert your customizations directly in the file.
From our entire team, thank you for choosing Visual Studio! For the latest updates, resources, and news, check out the Visual Studio Hub and stay in touch.
Happy coding!
The Visual Studio team 
3 
0 
0 
Share on Facebook 
Share on X 
Share on Linkedin 
Copy Link 
-->
Category
Visual Studio 
Topics
Git 
GitHub Copilot 
Productivity 
Visual Studio 
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
October 26, 2026
Keep your investigation between sessions 
Jason,
Mads
October 28, 2026
Preparing for Your Next Certification Could Start with Your Visual Studio Subscription  
James Rempt 
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