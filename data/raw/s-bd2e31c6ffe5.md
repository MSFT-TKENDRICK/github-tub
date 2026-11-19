Keep your investigation between sessions - Visual Studio Blog 
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
Keep your investigation between sessions 
October 26th, 2026 
0 reactions 
Keep your investigation between sessions
Jason 
, 
Mads 
Show more 
A bug investigation often starts with a few notes: what you tried, which input reproduced the problem, and what you want to check next. You might not be ready to choose a filename or add those notes to a project. You still want them there when you return.
In Visual Studio 2026 version 18.11, you can create a standalone Markdown file from New File and use the opt-in Hot Exit preview feature to resume that unfinished note after closing and reopening Visual Studio. Start the note while the details are fresh, then return to it next session.
Start the note without adding a project item
Press Ctrl + N to open New File .
Select Markdown File .
Select Open and start writing.
This is separate from Add New Item , which creates a project item. The original feedback specifically asked for a Markdown template in New File , including when working without an open solution.
The Markdown editor itself isn’t new in this release. You can use it to turn your notes into headings, lists, and fenced code blocks, then check the rendered result. The Markdown preview guide explains its editing and preview controls.
Resume the same unfinished note
Hot Exit is off by default. To enable it, go to Tools > Options , expanding All Settings > Projects and Solutions > General , and selecting Reopen unsaved documents on solution load or empty environment . 
With Hot Exit enabled, closing Visual Studio preserves session state. When you reopen Visual Studio, it restores open documents and unsaved edits, including new files you haven’t saved yet. Your note can remain unfinished without forcing you to choose a permanent home for it before you close the IDE.
Hot Exit also preserves changes to previously saved files, your tab and window layout, and undo functionality for saved files. For those saved files, you can continue using Ctrl + Z after restoring the session.
This is session preservation, not the same thing as deliberately saving a document to disk or committing it to source control. Save the note when you want to share it or keep it as part of the repository. The useful choice here is that a temporary note doesn’t have to become a project artifact merely to survive a normal close and reopen.
The Hot Exit request calls out exploratory work and temporary files as reasons to preserve unsaved documents. Keep the preview option off if you prefer your current close-and-save workflow.
Try the combination with a disposable investigation note: write down the next thing to check, close Visual Studio with Hot Exit enabled, and reopen it to continue the note.
0 
0 
0 
Share on Facebook 
Share on X 
Share on Linkedin 
Copy Link 
-->
Category
Visual Studio 
Share
Author
Jason Chlus 
Product Manager
PM working on aspire.dev helping distributed cloud apps become simpler and more consistent.
Mads Kristensen 
Principal Product Manager
Mads Kristensen is a Principal Product Manager at Microsoft, working to enhance productivity and usability in Visual Studio. He’s behind popular extensions like Web Essentials and File Nesting and is active in the open-source community. A frequent speaker, Mads is dedicated to making Visual Studio the most enjoyable IDE for developers.
0 comments
Be the first to start the discussion. 
Leave a comment Cancel reply 
Sign in 
Code of Conduct 
Read next
October 27, 2026
Visual Studio October Update – Compare Commits to Your Code, Resolve Conflicts in Bulk, Keep Coding 
Mark Downie 
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