provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_pages_project" "portfolio_site" {
  account_id        = var.cloudflare_account_id
  name              = var.project_name
  production_branch = "main"
}

resource "cloudflare_pages_domain" "portfolio_custom_domain" {
  account_id   = var.cloudflare_account_id
  name         = var.custom_domain
  project_name = cloudflare_pages_project.portfolio_site.name
}
