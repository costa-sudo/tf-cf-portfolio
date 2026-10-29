# tf-cf-portfolio

A static portfolio site hosted on Cloudflare Pages. OpenTofu manages the Pages project and custom domain; GitHub Actions deploys the site.

## What this repo does

- Serves the portfolio from `src/` without a build step.
- Uses OpenTofu for Cloudflare Pages infrastructure.
- Deploys from GitHub Actions and includes PDF certificate previews.

## Deployment model

- `main` deploys to production and applies infrastructure changes.
- `dev` deploys to a Cloudflare Pages preview.

## Architecture

GitHub Actions initializes OpenTofu, imports existing Pages resources if needed, applies changes on `main`, then deploys `src/` with Wrangler.

## Repository structure

```text
.
├── .github/workflows/opentofu.yml
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

- `src/index.html`: page content
- `src/style.css`: site and modal styling
- `src/main.js`: theme, year, and certificate modal behavior
- `terraform/`: Cloudflare Pages configuration
- `.github/workflows/opentofu.yml`: infrastructure and deployment workflow

## Deployment flow

### Cloudflare infrastructure

The Pages project name and custom domain are required Terraform inputs: `project_name` and `custom_domain`.

### Site deployment

Wrangler deploys the static site from `src/`. The project name is shared with the Terraform configuration.

## Requirements

GitHub Actions needs these repository variables:

- `CLOUDFLARE_PAGES_PROJECT_NAME`
- `CLOUDFLARE_CUSTOM_DOMAIN`

And these repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Local setup

To preview the site, run a local server from `src/`:

```bash
cd src
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Terraform usage

From `terraform/`, provide the required values as environment variables, then initialize and review the plan:

```bash
cd terraform
export TF_VAR_cloudflare_api_token="your-api-token"
export TF_VAR_cloudflare_account_id="your-account-id"
export TF_VAR_project_name="your-pages-project-name"
export TF_VAR_custom_domain="your-domain.example"

tofu init
tofu plan
```

Run `tofu apply` after reviewing the plan.

## License

MIT. See [LICENSE](LICENSE).
