provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_pages_project" "portfolio_site" {
  account_id        = var.cloudflare_account_id
  name              = var.github_repo_name
  production_branch = "main"

  # Direct upload deployment (Wrangler); no Git-connected build,
  # so `source` and `build_config` are intentionally omitted.

  deployment_configs = {
    production = {
      compatibility_flags = ["nodejs_compat"]
    }
    preview = {
      compatibility_flags = ["nodejs_compat"]
    }
  }
}

resource "cloudflare_pages_domain" "portfolio_custom_domain" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.portfolio_site.name
  name         = var.custom_domain
}
