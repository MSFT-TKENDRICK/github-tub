Bookmark Studio: evolving bookmarks in Visual Studio - Visual Studio Blog 
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
Bookmark Studio: evolving bookmarks in Visual Studio 
April 1st, 2026 
11 reactions 
Bookmark Studio: evolving bookmarks in Visual Studio
Mads Kristensen 
Principal Product Manager
Show more 
Download Bookmark Studio
Download and install Bookmark Studio in Visual Studio 2026
Download now 
Bookmarks in Visual Studio have always been a simple, reliable feature. Many developers use them regularly, and over the years we’ve heard consistent feedback from those users. Bookmarks were useful, but there were a few core gaps that kept them from being as effective and relevant as they could be.
Navigation was one of the biggest pain points. You could move between bookmarks, but there was no easy way to jump directly to a specific bookmark using the keyboard. That made bookmarks harder to rely on once you had more than a few. Another common request was sharing. Bookmarks worked well for personal, local navigation, but there was no good way to share them with teammates or reuse them across repos, branches, or pull requests.
That feedback is what led to Bookmark Studio , a new experimental Visual Studio extension that builds on the existing bookmark experience by filling in those missing pieces, without changing how bookmarks fundamentally work.
Faster, more intentional navigation
One of the core additions in Bookmark Studio is slot‑based navigation .
Bookmarks can be assigned to slots 1 through 9 and jumped to directly using simple keyboard shortcuts like Alt + Shift + 1 through Alt + Shift + 9 . This makes bookmarks feel more deliberate and easier to rely on when you want fast access to a handful of important locations.
New bookmarks are automatically assigned the next available slot when possible, so fast navigation often works without any extra setup. Bookmark Studio also integrates with Visual Studio’s existing bookmark commands, which means your current shortcuts and muscle memory continue to work as expected.
A single place to work with bookmarks
Bookmark Studio also adds a dedicated Bookmark Manager tool window.
The manager shows all bookmarks in one place and makes it easy to browse, search, and navigate between them. You can filter by name, file, location, color, or slot, and jump directly to a bookmark with a double‑click or keyboard navigation. It’s designed to make bookmarks easier to revisit, especially when switching context or coming back to code later.
Optional structure, when you need it
Another piece of feedback we heard was the need for just a bit more organization.
With Bookmark Studio, bookmarks can have labels, colors, and folders. None of this is required, and you can keep using bookmarks exactly as you do today. But when you’re debugging, refactoring, reviewing code, or exploring unfamiliar areas of a codebase, that extra context can make bookmarks more useful and easier to reason about.
All bookmark metadata is stored per solution, so it stays with your work across sessions.
Bookmarks you can share and reuse
Bookmarks are often most valuable when they capture intent, not just location.
Bookmark Studio makes it easy to export bookmarks as plain text, Markdown, or CSV. That means you can include bookmarks in pull requests, share investigation paths with teammates, or move useful bookmark sets between repos. Instead of being a purely personal tool, bookmarks can become a lightweight way to communicate context and decisions.
Bookmarks that stay put as code changes
Bookmark Studio tracks bookmarks as text moves during editing, so they stay attached to the relevant code instead of drifting to the wrong line. This makes bookmarks more dependable during active development, especially when files are changing frequently.
A focused improvement, not a reinvention
Bookmark Studio doesn’t try to replace tasks, TODO comments, or issue tracking. It doesn’t introduce a new workflow you have to learn. Instead, it fills in the gaps that many bookmark users have pointed out over time, making bookmarks easier to navigate, easier to share, and more useful as part of everyday development.
If you already use bookmarks in Visual Studio, Bookmark Studio should feel familiar within minutes. And if you’ve ever wished bookmarks could do just a little more, this extension is worth a look.
You can download Bookmark Studio today from the Visual Studio Marketplace . As always, feedback and pull requests are welcome on the GitHub repo .
11 
8 
3 
Share on Facebook 
Share on X 
Share on Linkedin 
Copy Link 
-->
Category
Extensibility 
Visual Studio 
Topics
Extensions 
Navigate through code 
Share
Author
Mads Kristensen 
Principal Product Manager
Mads Kristensen is a Principal Product Manager at Microsoft, working to enhance productivity and usability in Visual Studio. He’s behind popular extensions like Web Essentials and File Nesting and is active in the open-source community. A frequent speaker, Mads is dedicated to making Visual Studio the most enjoyable IDE for developers.
8 comments 
Discussion is closed. Login to edit/delete existing comments. 
Code of Conduct 
Sort by : 
Newest
Newest 
Popular 
Oldest 
Benjamin Autran -->
Benjamin Autran 
-->
April 15, 2026 
0 
Copy link to comment by Benjamin Autran 
-->
Collapse comment by Benjamin Autran 
-->
Sounds good, and congrats !
I use bookmarks in my development, but one of the major drawbacks is that when you create a new branch of a project, you lose these bookmarks, and there’s no import or export option (which is useful if you want to have them on another machine).
Does this tool handle that?
Frank D -->
Frank D 
-->
April 17, 2026 
0 
Copy link to comment by Frank D 
-->
Collapse comment by Frank D 
-->
“Bookmarks worked well for personal, local navigation, but there was no good way to share them with teammates or reuse them across repos, branches , or pull requests.
That feedback is what led to Bookmark Studio”
Raj Shah -->
Raj Shah 
-->
April 10, 2026 
0 
Copy link to comment by Raj Shah 
-->
Collapse comment by Raj Shah 
-->
This looks awesome – reminds me of vim marks. Any plans to incorporate into mainline VS eventually?
Jacob Stamm -->
Jacob Stamm 
-->
April 7, 2026 
0 
Copy link to comment by Jacob Stamm 
-->
Collapse comment by Jacob Stamm 
-->
In addition to being useful, this looks like a good reference extension to refer to while I’m learning extension development. Mads, do you know if it’s yet possible to have a native search bar control in a VisualStudio.Extensibility tool window, or is VSSDK’s `ToolWindowPane.SearchEnabled` still the only way?
Mads Kristensen -->
Mads Kristensen Author 
-->
April 7, 2026 
· Edited 
1 
Copy link to comment by Mads Kristensen 
-->
Collapse comment by Mads Kristensen 
-->
It is still only possible using ToolWindowPane.SearchEnabled 
Reza Niroomand -->
Reza Niroomand 
-->
April 2, 2026 
1 
Copy link to comment by Reza Niroomand 
-->
Collapse comment by Reza Niroomand 
-->
This is a great example of how UX improvements can make a feature so much better. I haven’t been using Bookmarks that much to be honest, but I think we this improvement it will become one of my favs. 👍
Load more comments 
Read next
April 7, 2026
Take full control of your floating windows in Visual Studio 
Mads Kristensen 
April 15, 2026
Stop Hunting Bugs: Meet the New Visual Studio Debugger Agent Workflow 
Harshada Hole 
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