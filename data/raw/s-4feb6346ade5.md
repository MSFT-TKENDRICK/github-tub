Today I will... manage Git Submodules without leaving the IDE - Visual Studio Blog 
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
Today I will… manage Git Submodules without leaving the IDE 
August 11th, 2026 
12 reactions 
Today I will… manage Git Submodules without leaving the IDE
Harshada Hole 
Product Manager 
Show more 
Dream big. Achieve more. Visual Studio 2026.
Unleash your potential with the world’s most popular IDE for the professional developer.
Download Visual Studio 
If you’ve worked with Git submodules for any length of time, you probably have a love-hate relationship with them. They’re genuinely useful for pulling a shared library, an SDK, or common build scripts into your project. But actually working with them usually means tabbing over to a terminal and trying to remember whether it’s git submodule update --init or --init --recursive this time all while a perfectly good IDE sits right in front of you, shrugging.
That’s the part we wanted to fix. Starting in Visual Studio 18.9 , Git submodules are a first-class part of the IDE no more bouncing out to the command line just to keep your dependencies in order. It’s been one of the most-requested Git features for a long time, and honestly, it’s about time.
They finally feel like part of Git in the IDE
Submodules aren’t a mystery folder anymore. There’s a dedicated Submodules section in the Git Repository window, they show up properly in Git Changes , and the branch and repository pickers actually understand how your parent repo and its submodules relate.
[Image: Submodules section in the Git Repository window)     
[Image: Submodules in the Git changes window)     
Add, update, and delete without leaving your seat
From that Submodules section, you can add, update, or remove a submodule right there no memorized flags, no terminal detour. Open a solution or folder and Visual Studio discovers and activates your submodules automatically, while keeping them out of the main local repositories list so your repo picker doesn’t turn into a cluttered mess.
[Image: Selecting a submodule repository in Visual Studio] 
Read-only by default
Most of the time you’re just *using* a submodule, not editing it, so Visual Studio treats them as read-only by default . That saves you from accidentally committing changes into a dependency you only meant to reference. When you do want to work *inside* one, it’s a single setting: Tools > Options > Source Control > Git , find Automatically activate multiple repositories , and pick Yes, include submodules .
This is just the start
This is the first milestone, not the finish line. It covers the core of what you need day to day, and there’s more coming in future releases depending on what you tell us.
We’d love to hear from you
This feature exists because so many of you kept asking for it, so keep the feedback coming. Drop your thoughts on the Feature Ticket , and if something breaks, please use the  Report a Problem tool in Visual Studio is the fastest way to reach us. You can also find the team on Twitter @VisualStudio , YouTube , and  LinkedIn.   
Thanks, as always, for coding with us.
12 
3 
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
Submodules 
Visual Studio 2026 
Share
Author
Harshada Hole 
Product Manager 
Harshada Hole is a Product Manager on the Visual Studio Debugging, Diagnostics, and Copilot team.
3 comments 
Discussion is closed. Login to edit/delete existing comments. 
Code of Conduct 
Sort by : 
Newest
Newest 
Popular 
Oldest 
Arley dos Santos Gonçalves -->
Arley dos Santos Gonçalves 
-->
August 14, 2026 
0 
Copy link to comment by Arley dos Santos Gonçalves 
-->
Collapse comment by Arley dos Santos Gonçalves 
-->
That strange…
I receive this upgrade, but use visual studio Installer for obtain MVSC – C.
I use Visual Studio Code for coding in language C. You can explain for me one little about this upgrade?
The github is external package very usage in programming, this was one excellent addictional features.
aloneguid -->
aloneguid 
-->
August 12, 2026 
0 
Copy link to comment by aloneguid 
-->
Collapse comment by aloneguid 
-->
I like the direction and really excited about it. Submodule support is why I usually go for CLion rather than VS daily. It’s a bit clunky in VS – you have to activate write mode in options and switch to a submodule in the “Git changes” window. I appreciate this is very new, but you should really check out how submodules are handled in IntelliJ IDEs as most of the users will be coming with that experience.
Zachary Loeber -->
Zachary Loeber 
-->
August 11, 2026 
1 
Copy link to comment by Zachary Loeber 
-->
Collapse comment by Zachary Loeber 
-->
Git submodules….gross
Read next
August 21, 2026
Today I will… Modernize a .NET application 
Matt,
Pablo
August 24, 2026
Unlocking the Power of AI for Every Developer in Visual Studio with Bring your Own Model 
Tanmayee Kamath 
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