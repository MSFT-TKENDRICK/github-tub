🌿 Agent Terrarium: Bringing AI agents to life - Command Line 
Skip to main content 
Source 
Signal blog 
Official Microsoft Blog 
Command Line 
Microsoft On The Issues 
Asia 
Canada 
Europe, Middle East and Africa 
Latin America 
The Code of Us 
What's new 
AI 
Innovation 
Digital Transformation 
Sustainability 
Security 
Work & Life 
Diversity & Inclusion 
Unlocked 
Microsoft 365 
Azure 
Copilot 
Windows 
Surface 
XBOX 
Deals 
Small Business 
Support 
Windows Apps 
Outlook 
OneDrive 
Microsoft Teams 
OneNote 
Microsoft Edge 
Moving from Skype to Teams 
Computers 
Shop XBOX 
Accessories 
VR & mixed reality 
Certified Refurbished 
Trade-in for cash 
XBOX Game Pass Ultimate 
PC Game Pass 
XBOX games 
PC games 
Microsoft AI 
Microsoft Security 
Dynamics 365 
Microsoft 365 for business 
Microsoft Power Platform 
Windows 365 
Small Business 
Digital Sovereignty 
Azure 
Microsoft Developer 
Microsoft Learn 
Support for AI marketplace apps 
Microsoft Tech Community 
Microsoft Marketplace 
Software companies 
Visual Studio 
Microsoft Rewards 
Free downloads & security 
Education 
Gift cards 
Licensing 
Unlocked stories 
View Sitemap 
By builders, for builders. 
A Microsoft publication 
Search articles 
Experiments 
Share 
in 
r 
x 
f 
🌿 Agent Terrarium: Bringing AI agents to life 
🌿 Agent Terrarium: Bringing AI agents to life
An open-source desktop companion app, this weekend project questions whether working with agents should simply feel transactional.
By Alexander Sklar Principal Software Engineer, Microsoft Website → 
2026.08.07 
Every agent interface I use looks roughly the same: a chat window with a textbox where I wait for a response, or a CLI streaming structured output at me. They’re well-designed, and they get the job done. But after spending all day in them, I started wondering why working with agents had to feel so transactional.
So I built Agent Terrarium , an open-source desktop companion app where AI agents live in a little animated world on your screen—wandering around, chasing a ball, wearing hats, and reacting to things happening around them. Not because it’s the most efficient interface, but because it’s fun and it makes you smile.
Why build this?
I learned a ton from this project—about Rust, about Tauri, about simulation engines, and about what it takes to make a digital character feel present instead of just rendered.
But the bigger reason is that creativity and taste are really the most important skills in this era of AI. The frontier is moving so fast that the bottleneck isn’t what you can build anymore—it’s knowing what’s worth building and having the design instinct to make it feel right. We can all generate code now. The harder question is whether what you generate is something anyone actually wants.
Agent Terrarium was my way of exercising that muscle. Do I use it every day? No. But building it sharpened how I think about the relationship between humans and agents, and it gave me an outlet for the playfully creative side of engineering that doesn’t always get space in day-to-day work.
Architecture: Rust simulation, React view 
The core design decision was to make the frontend a pure view layer . All simulation, physics, AI dispatch, and game logic run in Rust at 20 Hz. The React frontend polls world state via Tauri IPC and renders to Canvas 2D—it doesn’t own any state.
Because the simulation crate ( terrarium-sim ) is renderer-agnostic, the same engine can drive the desktop GUI, a terminal UI, and (in progress) a VS Code extension. Each tick handles agent movement, ball physics with gravity and bounce and friction, agent-to-agent social interactions, and event emission for the awareness system. This separation turned out to be the most important architectural choice in the project.
The awareness system 
This is the part I keep coming back to. Most agent integrations treat the agent as a request-response box where you ask and it answers. Agent Terrarium has a four-level awareness system that lets agents observe and react to world events on their own:
Level What the agent sees 
0 Your direct messages only 
1 World events: balls thrown, agents arriving/leaving, theme changes 
2 Social events: other agents talking, emoting, equipping gear 
3 Full world state: periodic snapshots of everything happening 
At level 3, agents receive structured world-state summaries and can respond with actions: say (speak aloud with Animalese -style voice synthesis), emote (show an emoji), move_to (walk somewhere), or run_away . They’re not just answering questions—they’re reacting to their world.
Throw a ball and a Copilot agent might comment on the trajectory. Two agents pass each other and exchange emoji greetings. A new agent arrives and the others have opinions about it. These are small things individually, but together they make agents feel present in a way that turns a utility into something closer to a companion.
Bring your own model
The AI backend is pluggable, with three options out of the box:
GitHub Copilot via the Copilot SDK , with model selection and tool calling
OpenAI-compatible endpoints: GPT, Claude, local models, anything that speaks the API
Echo/NPC mode: no API needed, agents just exist as ambient characters
Each agent is independently configured with its own backend, model, system prompt, awareness level, and working directory. You can have a Copilot-backed coding agent living next to an NPC cat that just wanders around and occasionally judges you.
Themes, weather, and music 
The built-in themes range from Meadow (green hills, falling leaves, clouds) to Outer Space (nebula, floating agents, no ground) to city skylines like Seattle with Mt. Rainier and orcas jumping in Puget Sound, or Shanghai with the Pudong skyline and lanterns floating overhead. The theme system is fully pluggable—anyone can create their own, with custom backgrounds, animated decorators, and color palettes. My coworker Klorida made one honoring her Albanian roots, complete with its own skyline and decorations.
Themes can include animated SVG decorators that follow waypoint or parabolic paths—a swordfish swimming across the ocean, shooting stars at night—and the dynamic sky system ties into your actual local weather. Real-time day/night cycle, dawn/dusk color transitions, rain, snow, fog, and storms all reflect conditions outside your window. If it’s raining where you are, it’s raining in your terrarium.
Each theme also generates procedural lofi music via Web Audio API—no audio files shipped, the soundtrack is synthesized from parameters defined per theme.
Gear, accessories, and file drop
Agents have five equipment slots (hat, face, neck, body, back), and you can right-click any of them to put on hats, scarves, sunglasses, or capes. Gear persists across sessions, so your agents keep their look.
The terrarium isn’t purely decorative, either. You can drag files onto it, type a prompt, and the files get attached to the agent’s task—spec review, code conversion, document analysis, whatever file-based work you’d normally paste into a chat window.
Extensions: Hack without building 
Everything visual is extensible through declarative JSON packages. Want a new avatar or a custom theme? Drop a .json file into ~/agent-terrarium/packages/ and hot-reload picks it up without restarting.
A minimal avatar definition:
Copy 
{ 
"id": "my-robot", 
"name": "Robot", 
"icon": "🤖", 
"personality": { 
"speedMin": 30, 
"speedMax": 80, 
"movementStyle": "patrol", 
"ballInterest": 0.5 
}, 
"drawSpec": { 
"layers": [ 
{ "type": "body", "color": "#607D8B", "rx": 12, "ry": 14 }, 
{ "type": "head", "color": "#78909C", "rx": 10, "ry": 10 }, 
{ "type": "eyes", "style": "standard", "color": "#00E5FF", "size": 3 } 
] 
} 
} 
Avatars are drawn from their drawSpec , an ordered list of visual layers rendered back-to-front. The format is forward-compatible—unknown layer types are silently skipped, so packages built for newer versions degrade gracefully on older ones.
Coming next: VS Code extension
I’m porting Agent Terrarium to run inside VS Code as a webview panel, so your agents live right inside your editor. Same simulation engine, same awareness system, embedded where you already spend your day. The terrarium-sim crate doesn’t know or care whether it’s driving pixels on a desktop canvas, characters in a terminal, or a webview inside an editor—which is exactly why I invested in the renderer-agnostic architecture early on.
Built with GitHub Copilot
The entire project was built with GitHub Copilot as a coding partner—sustained pair programming where every architecture decision, every sprite animation, every physics constant was iterated on together. If you’re curious what that collaboration looks like across a real project with a Rust backend, a React frontend, and an extension system, the full source is open.
Get started
Prerequisites: Node.js ≥ 18, pnpm ≥ 8, Rust ≥ 1.70, Windows 10/11
Copy 
git clone https://github.com/asklar/agent-terrarium.git 
cd agent-terrarium 
pnpm install 
pnpm tauri dev 
Or build an installer with pnpm tauri build , which produces .msi and .exe installers in src-tauri/target/release/bundle/ .
The repo has architecture docs, an extension authoring guide , and a contributing guide . Issues and PRs are welcome.
We spend a lot of time talking about what agents can do . I think we should spend more time thinking about what they feel like to be around. When your agent is a little character with a personality, wandering around your screen, occasionally chasing a ball or commenting on something that just happened, it changes how you relate to it. It sparks joy—and that shift, from tool to companion, is worth exploring, even if it starts with something as small as a terrarium.
Share 
in 
r 
x 
f 
🌿 Agent Terrarium: Bringing AI agents to life 
Next Stop
A wind farm you can talk to: Building a real-time 3D digital twin on Microsoft Fabric
Experiments 
With geometry, telemetry, and language feeding into a single simulation, it’s the time spent making architectural decisions that matters.
[ read ] 
July 13, 2026 
How my dev machine built 1,111 word-processing features and forgot to add a ruler 
Experiments 
What happens when one of the founders of Writely sets up a complex agentic loop and lets it run largely independently in pursuit of an online, collaborative word processor?
[ read ] 
July 8, 2026 
Follow the systems work as it breaks and gets rebuilt. Subscribe for updates 
© 2026 
A Microsoft publication 
English (United States)
Your Privacy Choices 
Consumer Health Privacy 
Sitemap 
Contact Microsoft 
Privacy 
Terms of use 
Trademarks 
Safety & eco 
Recycling 
About our ads 
Manage cookies 
RSS 
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
English (United States) 
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