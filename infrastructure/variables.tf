variable "aws_region" {
  default = "us-east-1"
}

variable "project_name" {
  default = "smart-assistant"
}

variable "github_token" {
  description = "GitHub OAuth Token for Amplify and CodePipeline"
  type        = string
  sensitive   = true
}
