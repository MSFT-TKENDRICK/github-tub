Performance improvements to MEF-based editor productivity extensions - Visual Studio Blog 
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
Performance improvements to MEF-based editor productivity extensions 
February 3rd, 2026 
4 reactions 
Performance improvements to MEF-based editor productivity extensions
Tina 
, 
Amadeus 
Show more 
If you use editor productivity extensions for Visual Studio 2026, there’s good news—they can now load faster! Extension developers with existing MEF-based editor productivity extensions should read this blog to learn about recent changes and how they might be affected.   
We introduced  VisualStudio.Extensibility  to simplify the creation of Visual Studio extensions for developers. Previously, handling  threads  in VSSDK-based extensions was often difficult, requiring knowledge of thread affinity and even the ins and outs of COM just to avoid freezing Visual Studio. The new extensibility model abstracts these technical details away seamlessly.   
Despite this advancement, we recognize most Visual Studio extensions still use VSSDK, so we’re striving to make targeted improvements there as well – especially regarding performance. For Visual Studio 2026, we’ve added the ability to load MEF-based editor extensions on a background thread, which significantly speeds up startup times for users.  A major highlight of Visual Studio 2026 is its improved performance, and the proposed change we’re making to MEF is just one of many enhancements planned to make it even faster. We  hope you’ll be pleased with the results.   
What changed?   
Visual Studio editor components use the  Managed Extensibility Framework (MEF) , which requires that objects be constructed in a free-threaded manner.  Despite official MEF guidelines, we’ve often loaded components on the UI thread, resulting in many extensions relying on this behavior and limiting our ability to enhance startup performance.   
With Visual Studio 2026, we’re shifting to a free-threaded model, loading MEF components on background threads. This means extensions with UI thread dependencies might fail to load. We’ve been rigorously testing this approach in recent Visual Studio 2022 updates, and we are aware that some extensions that expect to load on the UI thread will fail to load with this optimization. To support extension developers through this transition, we’ve provided a setting and an analyzer that allows you to experiment with background loading and detect if your extension could be impacted by this change before we push it out more broadly. This initiative reflects our commitment to reducing disruptive changes and help extenders adapt when updates are necessary for the overall improvement of the product.   
Does it impact my extension?   
To help extension developers better detect if this change impacts you, we created an analyzer to identify potential issues. We hope that this will give you the opportunity to bring your extension in compliance with MEF rules, so that your extension can also get a startup performance boost like the rest of Visual Studio 2026.   
The example below shows the analyzer running and reporting access to the Microsoft.VisualStudio.Shell.ThreadHelper  and DTE2.StatusBar  require UI thread.   
To use the analyzer, add a reference to the latest version of the  Microsoft.VisualStudio.SDK.Analyzers  package:   
<PackageReference Include="Microsoft.VisualStudio.SDK.Analyzers" Version="17.7.98" PrivateAssets="all" /> 
To validate your extension can adapt to this change, enable the Preview Feature flag “Initialize editor parts asynchronously during solution load”.   
When debugging, you may set a breakpoint in MEF part constructors and evaluate  System.Threading.Thread.CurrentThread.ManagedThreadId . If it’s different than 1 , then your code executes on the background thread.    
Call to action   
Loading MEF parts on a background thread is essential for improving Visual Studio’s performance, and we have  gradually enabled this change in Visual Studio 2026.  We recognize that code changes can be inconvenient, so we’ve made it straightforward to spot and resolve any issues.  To see examples of removing UI thread affinity, please see our  documentation  or a sample  PR  on how we made this change ourselves.    
We want to hear from you!   
Thank you for sharing your issues and suggestions with us, and we hope you’ll keep providing feedback about what you like and what we can improve in Visual Studio. For those new and experienced to extending Visual Studio, we invite you to visit our  documentation  to learn more, or watch the  video series  on Visual Studio Toolbox where Visual Studio engineers take you through how to build extensions using our  samples  on GitHub. Feel free to share feedback with us via   Developer Community : report any bugs or issues via   report a problem   and   share your suggestions   for new features or improvements to existing ones. If you want a closer engagement with other partners in the ecosystem, please visit our GitHub repo to report  issues  as well.   
Stay connected with the Visual Studio team by following us on  YouTube ,  Twitter ,  LinkedIn ,  Twitch  and on  Microsoft Learn .  
4 
7 
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
Performance 
Share
Author
Tina Schrepfer (LI) 
Principal Software Engineer Manager
Tina Schrepfer is the engineering manager for Visual Studio Extensibility team.
Amadeus Wieczorek 
7 comments 
Discussion is closed. Login to edit/delete existing comments. 
Code of Conduct 
Sort by : 
Newest
Newest 
Popular 
Oldest 
Steffen S. Hellestøl -->
Steffen S. Hellestøl 
-->
February 5, 2026 
0 
Copy link to comment by Steffen S. Hellestøl 
-->
Collapse comment by Steffen S. Hellestøl 
-->
Visual Studio 2026 significantly reduced theme customization by removing many color tokens. Please reintroduce these tokens so extension authors can restore the beloved Blue theme, as requested in Bring Blue theme back for Visual Studio 2026 and Once more, we ask for the Blue Theme back in VS 2026 .
Mads Kristensen -->
Mads Kristensen 
-->
February 5, 2026 
1 
Copy link to comment by Mads Kristensen 
-->
Collapse comment by Mads Kristensen 
-->
We’re very aware of the wish to bring back those tokens. If it was easy we would have done so already. We’re looking into options…
Kissaki -->
Kissaki 
-->
February 5, 2026 
0 
Copy link to comment by Kissaki 
-->
Collapse comment by Kissaki 
-->
Which version? These blog posts get more and more confusing with regular feature releases, live-updates outside of feature releases, and blog posts not disclosing when it’s talking about Insider preview versions. They’re all “Visual Studio 2026”. But that’s not helpful. “they can now load faster” doesn’t tell me when “now” is now for me.
Amadeus Wieczorek -->
Amadeus Wieczorek 
-->
February 5, 2026 
1 
Copy link to comment by Amadeus Wieczorek 
-->
Collapse comment by Amadeus Wieczorek 
-->
Preloading extensions on background thread began in version 18.0, and is now enabled for 50% of developers. Starting 18.4 we will bring it to 100%. Also, this experience is limited to reopening a solution, e.g. from the “Get started” window or “File > Recent Projects and Solutions”. Thank you for your feedback on how much details you expect to see in the blog posts!
Lilo Smith -->
Lilo Smith 
-->
February 4, 2026 
0 
Copy link to comment by Lilo Smith 
-->
Collapse comment by Lilo Smith 
-->
Developing extensions for Visual Studio has been a nightmare, I spent whole weekend trying to fix the editor stealing keystrokes sent to my custom window.
I reported it here: https://developercommunity.visualstudio.com/t/Custom-WPF-Window-ignore-specific-keystr/11037258 
And seems this already had been reported in 2024, and I doubt it will get any attention again.
Mads Kristensen -->
Mads Kristensen 
-->
February 5, 2026 
· Edited 
0 
Copy link to comment by Mads Kristensen 
-->
Collapse comment by Mads Kristensen 
-->
Hi Lilo, I ran into the exact same behavior today with an overlay dialog similar to the one in your bug report. It appears to be a WPF behavior and the way I got around it was to open my WPF control using ShowDialog() instead of Show() . Otherwise I had to look at registering both keyboard and input focus etc. which seemed to only work sporadically.
Lilo Smith -->
Lilo Smith 
-->
February 5, 2026 
0 
Copy link to comment by Lilo Smith 
-->
Collapse comment by Lilo Smith 
-->
But ShowDialog() blocks the thread, “Otherwise, I had to look at registering both keyboard and input focus” I also tried this, I even tried hooking the Window inputs but they still get send to the background window, “which seemed to only work sporadically”, so is this a “bug”?
Read next
February 4, 2026
Roadmap for AI in Visual Studio (February) 
Rhea Patel 
February 11, 2026
Unlock language-specific rich symbol context using new find_symbol tool 
Sinem,
Hannah
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