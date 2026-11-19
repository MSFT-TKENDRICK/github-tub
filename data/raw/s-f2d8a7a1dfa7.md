Tune GitHub Copilot Inline Suggestions with Configurable Eagerness 
Skip to content 
Features
AI development 
Agents 
Models 
Customizations 
Continuity 
Editor 
Write code 
Enterprise 
Extensibility 
Release notes 
Blog 
Resources
Help 
Documentation 
Learn 
API 
FAQ 
Extensibility 
Extension Marketplace 
(opens in new tab) 
MCP registry 
(opens in new tab) 
Connect 
Events 
(opens in new tab) 
GitHub repository 
(opens in new tab) 
Download 
Search 
⌘ ⇧ P 
Download 
VS Code Insiders 
Other platforms 
Command line interface 
CLI for Apple silicon 
CLI for Intel 
Command line interface 
CLI for x64 
CLI for Arm64 
Command line interface 
CLI for x64 
CLI for Arm64 
CLI for Arm32 
By using VS Code, you agree to its
license 
and
privacy statement .
By using VS Code, you agree to
License 
&
Privacy .
GitHub Universe, on demand. Watch the VS Code session recordings. 
A year of VS Code, wrapped. Explore the highlights. 
Dismiss this update 
All posts 
Tune GitHub Copilot Inline Suggestions with Configurable Eagerness
October 26, 2026 by Ben Steenhoek and Ulugbek Abdullaev 
11 min read 
Tags: 
GitHub Copilot 
Models 
Engineering 
On this page 
Introducing configurable eagerness 
One model, three modes 
Making configurable eagerness portable across models 
Online results 
What we learned 
What's next 
Try it out 
Acknowledgments 
Choose how proactively Copilot offers inline suggestions. 
A helpful suggestion at the wrong moment can still feel like an interruption. When you're completing a familiar pattern, you may want Copilot to anticipate several changes ahead. When working through delicate logic, you may prefer Copilot to scope its changes to the statement at hand and leave the next decision to you.
Community feedback about inline suggestions made both preferences clear: some developers wanted fewer suggestions, while others wanted Copilot to do more. No single default could satisfy everyone. In earlier posts about training the 3-in-1 inline suggestions model covering Completions, NES, and Long-Distance NES ( part one , part two ), we explained how developer feedback helped us improve the default experience. This strong default is a great starting point, but developers differ in how much assistance they prefer. We wanted to let them tailor their experience to their own preferences.
Configurable eagerness gives developers more control over how proactively Copilot offers inline suggestions. We trained the inline suggestions model to support three modes: low, medium, and high eagerness. In this post, we'll explain how we defined and trained those behaviors, what our first approach taught us, and how on-policy distillation (OPD) and reinforcement learning (RL) made the feature easier to carry forward to future models.
Configurable eagerness gives developers more control over how proactively Copilot offers inline suggestions.
Introducing configurable eagerness
We define eagerness along two dimensions: how often the model offers a suggestion and the size of each proposed edit .
Eagerness setting 
Intended behavior 
Low 
Offer fewer suggestions and favor smaller, more conservative edits. 
Medium 
Provide the current 'default' level of assistance. 
High 
Offer suggestions more proactively, including larger edits when appropriate. 
These settings guide how Copilot behaves rather than imposing strict limits on suggestion timing or size. Low eagerness still offers complete, useful suggestions; it's simply more conservative. High eagerness may propose more and larger suggestions, but only when that work is relevant to the user's current task.
This demo shows a simple example: from the same starting point ( class ModelManager: ), each setting produces different behavior. Low eagerness proposes five small, incremental suggestions and leaves it to the developer to decide which methods to add and what validation they need. High eagerness proposes three larger suggestions that anticipate follow-on work, such as raising a KeyError when attempting to remove a model that doesn't exist.
Figure 1. Low, medium, and high eagerness while building a ModelManager class. 
To train these behaviors, we needed a measurable definition of eagerness. Because our model outputs suggestions in a diff-based format, we used edit distance (the number of characters changed by a suggestion) as a proxy for eagerness, capturing both edit size and frequency 1 .
One model, three modes
We considered training a separate model for each eagerness level, but this approach would have multiplied future deployment and upgrade complexity. Instead, we trained one model to produce all three behaviors (low, medium, and high eagerness) , conditioned on a lightweight control tag:
Eagerness setting 
Control tag 
Low 
<|aggression|>low<|/aggression|> 
Medium 
No change 
High 
<|aggression|>high<|/aggression|> 
We trained the model to interpret this tag as an eagerness control: it produced more conservative suggestions for low eagerness and more proactive suggestions for high eagerness, while preserving its default behavior for medium.
We started with supervised fine-tuning (SFT) . For every training prompt, we sampled responses from variants of the model with varying levels of eagerness, filtered to high-quality responses, and ordered the responses by edit distance to produce examples of low, medium, and high eagerness for each prompt in the dataset.
Figure 2. Supervised fine-tuning for configurable eagerness. 
The training dataset is sent to model variants with different eagerness settings, and their responses are filtered by eagerness and quality into low-eagerness responses with prompts, default responses, and high-eagerness responses with prompts. These three groups form the dataset for SFT, followed by RL and evaluation.
This approach fit naturally into our existing reinforcement-learning pipeline. Most of the work happened during supervised fine-tuning, with only minimal changes to the RL setup:
SFT taught the model the new low-, medium-, and high-eagerness behaviors.
RL improved overall suggestion quality while preserving those learned behaviors.
Making configurable eagerness portable across models
The SFT approach worked, but it had two limitations that made it difficult to scale: it depended on pre-existing model variants with different eagerness levels and required retraining on responses from those models. Adding the feature to an improved base model would therefore mean training new models and then retraining from scratch. We needed a way to preserve a new model's default behavior while adding only the low- and high-eagerness modes.
The key insight was that instead of relying on multiple model variants, we could use the production model to generate and compare multiple variants of a suggestion.
To make eagerness portable across future base models, we separated the behavior we wanted to preserve from the behavior we wanted to change. The training objective had two parts:
For medium eagerness, match the behavior of a reference inline suggestions model.
For low and high eagerness, move edit distance below or above the reference model's medium prediction while preserving suggestion quality.
Figure 3. Portable post-training with on-policy distillation for configurable eagerness. 
The training dataset branches into default prompts and low- and high-eagerness prompts. Default prompts and the reference model contribute the distillation objective, while low- and high-eagerness prompts contribute quality and eagerness rewards; the combined objective feeds RL and evaluation.
For medium eagerness, we used on-policy distillation (OPD) to preserve the reference model's default behavior 2 . The model under training generated responses, and the reference model supplied token-level probabilities on those same generated prefixes. Training then minimized the difference between the two models' predicted token distributions, encouraging the model to behave like the reference. This taught the model to match the reference on its own generated responses at medium eagerness, while low- and high-eagerness modes were learned through their rewards.
For low and high eagerness, we reused the quality graders developed for the 3-in-1 model's SFT and RL, then added a relative eagerness reward based on the response's edit distance compared to the reference model's medium response. Low eagerness was rewarded for proposing a smaller edit than the reference. High eagerness was rewarded for proposing a larger one. In both cases, the quality reward prevented the model from optimizing edit distance at the expense of usefulness.
Mitigating reward hacking
Reward hacking occurs when a model finds a way to increase its measured reward without producing the behavior the model developer intended to encourage. During development, we observed such failure modes in both of the new eagerness settings and added mitigations for each.
High eagerness: An early reward design did not apply the quality grader to the low- and high-eagerness modes. In that training run, the model sometimes proposed unrelated functionality or unnecessary formatting changes while increasing edit distance, as seen in the example below.
We addressed this failure mode by balancing eagerness rewards with rewards from the RL quality grader, plus added instructions to allow legitimately broader edits. Our offline Simulation Tests (STests) caught this issue.
class SplashStorageService implements ISplashStorageService { 
_serviceBrand: undefined; 
+ private _windowSplash: IPartsSplash | undefined; 
+ 
readonly saveWindowSplash: (splash: IPartsSplash) => Promise<void>; 
+ readonly getWindowSplash = (): IPartsSplash | undefined => this._windowSplash; 
constructor(@INativeHostService nativeHostService: INativeHostService) { 
- this.saveWindowSplash = nativeHostService.saveWindowSplash.bind(nativeHostService); 
+ this.saveWindowSplash = async (splash: IPartsSplash) => { 
+ this._windowSplash = splash; 
+ return nativeHostService.saveWindowSplash(splash); 
+ }; 
} 
} 
Figure 4. Example of an over-eager suggestion before mitigation. The model unnecessarily added caching and expanded the service's API. 
Figure 5. Benchmark results before and after mitigating excessive suggestions on the STests benchmark. 
The chart plots training steps against the percentage of bad suggestions avoided, on a scale from 60% to 100%. The production baseline stays near 89%; before mitigation, the high-eagerness score falls to about 66% by the final plotted step, while low and medium eagerness remain near the baseline. After mitigation, all three modes stay near the baseline.
Low eagerness: One training run produced smaller measured edits partly by minifying suggestions : removing whitespace and delimiter characters or shortening variable names while maintaining syntactic correctness. This is technically shorter code but is much less desirable! We mitigated this behavior in two ways:
We normalized whitespace and delimiters before calculating edit distance, which removed any possible advantage from deleting whitespace.
We added LLM-based grading for less deterministic cases involving variable names and delimiters.
We baked this into our evaluations by adding a deterministic minification check to the training and evaluation pipeline so this failure mode can be screened in subsequent runs.
Before mitigation 
After mitigation 
class ModelManager : # user typed 
# model suggestion 
def __init__ ( self ): self .models=[] 
def add ( self , m ): self .models.append(m) 
def main (): 
m=ModelManager() 
m.add( "model1" ) 
main() 
class ModelManager : # user typed 
# model suggestion 
def __init__ ( self ): 
self .models = [] 
def add ( self , model ): 
self .models.append(model) 
def main (): 
m = ModelManager() 
m.add( "model1" ) 
main() 
Figure 6. Example of minification before and after mitigation. 
Online results
We evaluated the configurable model in A/B experiments against the production 3-in-1 model . The results below highlight statistically significant changes. No other key metrics changed significantly from the baseline.
Low eagerness 
Medium eagerness 
High eagerness 
29% lower dismissal rate and 28% shorter suggestions than medium eagerness.
No key metrics changed significantly from the baseline.
40% increase in accepted and retained characters , 40% more suggestions shown , and 22% longer suggestions than medium eagerness 3 .
These findings indicate that the configurable model behaved as intended: low eagerness was more conservative, high eagerness was more proactive, and medium preserved the default experience.
What we learned
Pluggable features simplify development and deployment. The key was separating what should change (eagerness) from what should remain stable (base-model quality). Instead of embedding eagerness in the full SFT recipe, the post-training approach starts from the production model, preserves its default behavior through the reference objective, and adds targeted objectives for low and high eagerness. That separation lets us carry the feature forward without rebuilding the entire training recipe.
Reliable offline-to-online alignment accelerates iteration. Our offline benchmarks track online outcomes closely. They revealed that optimizing high eagerness for edit distance alone could reduce quality and helped us quickly develop a reward that balanced eagerness and quality.
Dogfooding findings should become regression tests. As with the Qualitative Must-Haves benchmark , internal use surfaced issues that offline examples alone could miss because timing, cached suggestions, and surrounding tools all affect the experience. For example, several examples of reward hacking were caught during dogfooding. We turned those findings into repeatable checks and used them to monitor the final model's quality.
What's next
Configurable eagerness is a first step toward inline suggestions that adapt to each developer and task. We're exploring two directions:
Automatic eagerness: Adjust how proactively Copilot offers suggestions based on the current context, while keeping developers in control of the experience.
Learning from experience: Use signals from rejected, modified, or corrected suggestions to reduce repeated errors and better align future suggestions with a developer's intent.
The goal isn't simply to suggest more or less code. It's to provide the right level of assistance for the moment, and improve that fit over time.
Try it out
Configurable eagerness is available to paid GitHub Copilot subscribers in VS Code. Update to the latest version of VS Code, confirm that Next Edit Suggestions are enabled (they are on by default), then open the Copilot settings menu and choose an Eagerness setting. Try each mode to find the level of assistance that works best for you, and please share your feedback in the VS Code repository .
Help shape what’s next
We’re constantly working to improve the model, and your feedback can help. Sign up to participate in our user studies and help shape future improvements. 
Join a user study 
Acknowledgments
Thank you to the developer community for your ongoing feedback that shaped configurable eagerness, and to the combined teams of researchers, engineers, PMs, and designers across VS Code, GitHub Copilot, and Microsoft for their contributions, testing, and support throughout development.
Special thanks to Alexandru Dima, Julia Gong, Satarupa Guha, Yu Hu, Ben Liggett, Shengjie Ma, Gaurav Mittal, Elsie Nallipogu, Vedha Ranganathan, and Nick Trogh for their insightful feedback on this blog post.
Happy coding! 💙
[1] A no-edit response has distance zero, while a nonzero distance counts the characters changed in a proposed edit, so the distribution reflects both how often edits are proposed and how much they change.
[2] Here, the reference model and the model under training share the same base architecture; our application of distillation preserves behavior from the reference model rather than compressing a larger model into a smaller one.
[3] Raw dismissals were also higher alongside the increase in shown suggestions, but dismissal rate did not change significantly.
Related posts
VS Code Wrapped: GitHub Universe 2026 
Explore how VS Code evolved between GitHub Universe 2025 and 2026, with new ways to code, collaborate with agents, and manage work across tools and environments.
October 28, 2026 
8 min read 
Building the new GitHub Copilot Inline Suggestions Model: Part Two 
See how GitHub Copilot added completions to its unified inline suggestions model, refined ghost text and editor behavior, and improved user satisfaction.
September 23, 2026 
16 min read 
Building the new GitHub Copilot Inline Suggestions Model: Part One 
Explore how GitHub Copilot unified completion, next edit, and long-distance suggestions into one model for a faster, more cohesive coding experience.
September 16, 2026 
29 min read 
Browse all posts → 
On this page
Introducing configurable eagerness 
One model, three modes 
Making configurable eagerness portable across models 
Online results 
What we learned 
What's next 
Try it out 
Acknowledgments 
Microsoft 
Community
GitHub 
Reddit 
X 
Bluesky 
LinkedIn 
Watch & listen
YouTube 
Podcast 
TikTok 
Instagram 
Legal
Privacy 
Terms of Use 
Help
Support 
License 
Community 
GitHub 
Reddit 
X 
Bluesky 
LinkedIn 
Watch & listen 
YouTube 
Podcast 
TikTok 
Instagram 
Legal 
Privacy 
Terms of Use 
Help 
Support 
License 
Consumer Health Privacy 
Manage Cookies 
By using VS Code, you agree to its license and privacy statement .
Your Privacy Choices