Secret scanning updates - June 2026 - GitHub Changelog 
Skip to content 
Skip to sidebar 
/ 
Blog 
Changelog 
Docs 
Customer stories 
Try GitHub Copilot app 
See what's new 
Search 
Changelog 
Docs 
Customer stories 
See what's new 
Try GitHub Copilot app 
Back to changelog 
Improvement 
June 17, 2026 •
2 minute read 
Secret scanning updates – June 2026
Table of Contents
Detectors added 
Push protection defaults expanded 
Validity checks added 
Extended metadata support 
Learn more 
Menu. Currently selected: Detectors added 
Detectors added 
Push protection defaults expanded 
Validity checks added 
Extended metadata support 
Learn more 
Since our last pattern update , we’ve expanded secret scanning’s detection coverage with new partners, more patterns blocked by push protection by default, additional validity checks, and richer metadata for leaked secrets.
Detectors added 
Secret scanning now automatically detects the following new secret types in your repositories. This release adds two new partners (Cloudsmith and Meraki), significantly expands GitLab token coverage, and adds detectors for Elastic, Slack, Supabase, DataDog, and VolcEngine.
Provider 
Secret type 
Cloudsmith 
cloudsmith_api_key 
Datadog 
datadog_pat 
Datadog 
datadog_sat 
Elastic 
elastic_stack_api_key 
GitLab 
gitlab_ci_build_token 
GitLab 
gitlab_deploy_token 
GitLab 
gitlab_feature_flag_client_token 
GitLab 
gitlab_feed_token_v2 
GitLab 
gitlab_incoming_email_token 
GitLab 
gitlab_kubernetes_agent_token 
GitLab 
gitlab_oauth_app_secret 
GitLab 
gitlab_pipeline_trigger_token 
GitLab 
gitlab_runner_auth_token 
GitLab 
gitlab_runner_registration_token 
GitLab 
gitlab_scim_oauth_token 
Meraki 
meraki_api_key 
Slack 
slack_workflow_trigger_url 
Supabase 
supabase_oauth_access_token 
Supabase 
supabase_scoped_personal_access_token 
VolcEngine 
volcengine_ark_api_key 
Partner secrets are automatically reported to the secret issuer when found in public repositories through the secret scanning partnership program .
User secrets generate secret scanning alerts when found in public or private repositories.
Push protection defaults expanded 
The following detectors are now included in push protection by default. Repositories with secret scanning enabled, including free public repositories, will have commits containing these secrets automatically blocked.
Provider 
Secret type 
Cloudflare 
cloudflare_account_api_token 
Cloudflare 
cloudflare_global_user_api_key 
Cloudflare 
cloudflare_user_api_token 
Cockroach Labs 
ccdb_api_key 
Flutterwave 
flutterwave_test_api_secret_key 
Hack Club 
hackclub_ai_api_key 
OpenRouter 
openrouter_api_key 
PostHog 
posthog_oauth_refresh_token 
Supabase 
supabase_personal_access_token 
Patterns that are not yet enabled by default remain configurable in your push protection settings.
Validity checks added 
These patterns now support validity checks, so alerts tell you whether a leaked credential is still active and help you prioritize remediation.
Provider 
Secret type 
Alibaba 
alibaba_cloud_access_key_id 
Alibaba 
alibaba_cloud_access_key_secret 
Azure 
azure_ai_services_key 
Azure 
azure_anomaly_detector_ee_key 
Azure 
azure_anomaly_detector_key 
Azure 
azure_cognitive_services_key 
Azure 
azure_content_moderator_key 
Azure 
azure_cosmosdb_key_identifiable 
Azure 
azure_custom_vision_prediction_key 
Azure 
azure_custom_vision_training_key 
Azure 
azure_event_hub_key_identifiable 
Azure 
azure_function_key 
Azure 
azure_relay_key_identifiable 
Azure 
azure_service_bus_identifiable 
Azure 
azure_storage_account_key 
Azure 
azure_text_translation_key 
Coveo 
coveo_access_token 
Coveo 
coveo_api_key 
Databricks 
databricks_access_token 
Salesforce 
salesforce_access_token 
Shopify 
shopify_access_token 
Shopify 
shopify_custom_app_access_token 
Shopify 
shopify_merchant_token 
Shopify 
shopify_private_app_password 
Extended metadata support 
These patterns now include extended metadata when detected, providing richer context about leaked secrets.
Provider 
Secret type 
Airtable 
airtable_api_key 
Airtable 
airtable_personal_access_token 
Grafana 
grafana_cloud_api_token 
npm 
npm_access_token 
xAI 
xai_api_key 
Learn more 
Learn more about secret scanning and see the full list of supported secrets in our documentation. Let us know what you think in the community discussion .
Table of Contents
Detectors added 
Push protection defaults expanded 
Validity checks added 
Extended metadata support 
Learn more 
Menu. Currently selected: Detectors added 
Detectors added 
Push protection defaults expanded 
Validity checks added 
Extended metadata support 
Learn more 
application security 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Nov.05 Improvement 
Secret scanning upgrades detectors, adds SpaceX as partner 
application security 
Nov.04 Improvement 
CodeQL 2.27.4 improves accuracy and query metadata 
application security 
Nov.03 Improvement 
CodeQL 2.27.3 adds Python 3.15 features and JSON data extensions 
application security 
Nov.02 Improvement 
GitHub Desktop adds short-lived authentication tokens 
account management 
application security 
client apps 
... 
+2 
Nov.02 Improvement 
Security risk assessments include repository protection status 
application security 
Nov.02 Retired 
pull_request_target blocked by default December 2 
actions 
application security 
... 
+1 
Oct.28 Release 
Security extension for the GitHub Copilot app 
application security 
copilot 
universe26 
... 
+2 
Oct.28 Release 
AI Scan for repositories in public preview 
application security 
universe26 
... 
+1 
Oct.28 Release 
Code scanning for AI applications in public preview 
application security 
universe26 
... 
+1 
Subscribe to our developer newsletter
Discover tips, technical guides, and best practices in our biweekly newsletter just for devs. 
Enter your email * 
Subscribe 
By submitting, I agree to let GitHub and its affiliates use my information for personalized communications, targeted advertising, and campaign effectiveness. See the GitHub Privacy Statement for more details. 
Back to top 
Site-wide Links
Product
Features 
Security 
Enterprise 
Customer Stories 
Pricing 
Resources 
Platform
Developer API 
Partners 
Atom 
Electron 
GitHub Desktop 
Support
Docs 
Community Forum 
Training 
Status 
Contact 
Company
About 
Blog 
Careers 
Press 
Shop 
© 2026 GitHub, Inc.
Terms 
Privacy 
Manage Cookies 
Do not share my personal information 
GitHub on LinkedIn 
GitHub on Instagram 
GitHub on YouTube 
GitHub on X 
GitHub on TikTok 
GitHub on Twitch 
GitHub’s organization on GitHub