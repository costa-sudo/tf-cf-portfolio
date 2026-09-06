# tf-cf-portfolio

A lightweight personal portfolio site for Joao Costa, hosted on Cloudflare Pages and provisioned with OpenTofu/Terraform. The site is intentionally static and simple: HTML, CSS, and a small JavaScript file for modal handling and dynamic year rendering.

## What this repo does

This repository contains:

- A static portfolio website in `src/`
- Cloudflare Pages infrastructure definition in `terraform/`
- A GitHub Actions workflow that deploys the site and manages the Cloudflare Pages project

The portfolio presents a systems/platform/SRE-focused professional profile, with sections for:

- introduction and background
- current focus areas
- certification badges and links
- PDF certificate previews opened in a modal viewer

## Deployment model

This project keeps two deployment paths clear:

- `main` is the production branch and deploys to the live Cloudflare Pages production environment.
- `dev` is the preview branch and deploys to the Cloudflare Pages preview environment for testing and review.

This keeps the live site separate from experimental changes while still making it easy to preview work in progress.

## Architecture

The deployment pattern is:

1. Push code to GitHub.
2. GitHub Actions runs the OpenTofu workflow.
3. The workflow initializes infrastructure and optionally imports the Cloudflare Pages project and custom domain.
4. The workflow applies the Cloudflare Pages configuration on the `main` branch.
5. The site content from `src/` is deployed with Wrangler to Cloudflare Pages.
6. The `main` branch goes to the production/custom domain while the `dev` branch deploys as a preview branch.

## Repository structure

```text
.
├── .github/
│   └── workflows/
│       └── opentofu.yml
├── src/
│   ├── index.html
│   ├── main.js
│   ├── style.css
│   └── res/
├── terraform/
│   ├── main.tf
│   ├── providers.tf
│   └── variables.tf
├── LICENSE
└── README.md
```

### Key files

- `src/index.html`: the portfolio page content and layout
- `src/style.css`: styling, modal sizing, and terminal-inspired theme
- `src/main.js`: small client-side logic for the year and PDF modal behavior
- `terraform/main.tf`: Cloudflare Pages resource definitions
- `terraform/variables.tf`: configuration inputs for Cloudflare authentication and custom domain
- `.github/workflows/opentofu.yml`: CI/CD pipeline for infrastructure and deploys

## Deployment flow

### Cloudflare infrastructure

The OpenTofu config defines a `cloudflare_pages_project` and `cloudflare_pages_domain`:

- the project name is configured via `var.github_repo_name`; in this repo it is effectively `tf-cf-portfolio`
- production branch is set to `main`
- the current setup binds the Pages project to `costajp.com`

This repo currently hardcodes the project name and custom domain in both the Terraform resource and the GitHub Actions deploy step, while the variables file still provides the reusable defaults for local setup.

The workflow also imports existing Cloudflare resources when they already exist, which helps make first-time deployment safer.

### Site deployment

The workflow installs Wrangler and runs:

```bash
wrangler pages deploy src --project-name=tf-cf-portfolio --branch=${{ github.ref_name }}
```

That means the actual deployed app is the content in `src/`, not the Terraform directory itself.

## Requirements

Before using this repo, you need:

- a GitHub repository for the portfolio
- a Cloudflare account
- a Cloudflare Pages-enabled project
- a custom domain or domain zone managed by Cloudflare
- a Cloudflare API token with permissions to manage Pages and related domain settings
- `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` stored as GitHub repository secrets

## Local setup

This is a static site, so there is no package install or bundler required.

To preview locally:

```bash
cd src
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Terraform usage

The infrastructure lives in the `terraform/` folder. A minimal local setup looks like this:

```bash
cd terraform
export TF_VAR_cloudflare_api_token="your-api-token"
export TF_VAR_cloudflare_account_id="your-account-id"
export TF_VAR_github_repo_name="tf-cf-portfolio"

tofu init
tofu plan
tofu apply
```

The current project binds the Pages domain directly to `costajp.com` in `terraform/main.tf`. If you want to switch to a different domain, update that resource and the corresponding defaults in `terraform/variables.tf`.

The workflow also supports safe first-time imports with the following pattern:

```bash
tofu import cloudflare_pages_project.portfolio_site <account_id>/tf-cf-portfolio

tofu import cloudflare_pages_domain.portfolio_custom_domain <account_id>/tf-cf-portfolio/costajp.com
```

## GitHub Actions workflow

The workflow file is at `.github/workflows/opentofu.yml`.

It performs:

- `tofu init`
- optional resource import for first-time setup
- `tofu apply` only on the `main` branch
- Wrangler-based Cloudflare Pages deployment to either the preview or production branch

## Notes

- The site is intentionally frontend-only and does not use a framework like React or Vue.
- The custom portfolio styling is designed to resemble a terminal / systems engineering aesthetic.
- Certification cards link out to Credly and some certificates are surfaced as embedded PDF previews through the modal logic in `src/main.js`.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
