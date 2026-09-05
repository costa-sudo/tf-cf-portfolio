variable "cloudflare_api_token" {
  type        = string
  description = "The API Token for Cloudflare account authentication with Pages Edit permissions"
  sensitive   = true
}

variable "cloudflare_account_id" {
  type        = string
  description = "Your 32-character Cloudflare Account ID"
}

variable "github_username" {
  type        = string
  description = "Your GitHub username"
  default     = "JoaoCosta"
}

variable "github_repo_name" {
  type        = string
  description = "The name of your public portfolio repository"
  default     = "tf-cf-portfolio"
}

variable "custom_domain" {
  type        = string
  description = "The custom domain you want to link to your portfolio (e.g., joaocosta.com)"
  default     = ""
}
