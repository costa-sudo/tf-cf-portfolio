variable "cloudflare_api_token" {
  type        = string
  description = "The API Token for Cloudflare account authentication with Pages Edit permissions"
  sensitive   = true
}

variable "cloudflare_account_id" {
  type        = string
  description = "Your 32-character Cloudflare Account ID"
}

variable "project_name" {
  type        = string
  description = "The name of your Cloudflare Pages project"
}

variable "custom_domain" {
  type        = string
  description = "The custom domain you want to link to your portfolio"
}
