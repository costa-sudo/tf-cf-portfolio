provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_pages_project" "portfolio_site" {
  account_id        = var.cloudflare_account_id
  name              = var.github_repo_name
  production_branch = "main"
}
