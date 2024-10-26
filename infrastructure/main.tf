provider "aws" {
  region = var.aws_region
}

# S3バケット (CodePipeline用)
resource "aws_s3_bucket" "codepipeline_bucket" {
  bucket = "${var.project_name}-codepipeline-bucket"
  acl    = "private"
}

# IAMロール (CodePipeline)
resource "aws_iam_role" "codepipeline_role" {
  name = "${var.project_name}-codepipeline-role"

  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "codepipeline.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  })
}

# Lambda関数
resource "aws_lambda_function" "backend_lambda" {
  function_name = "${var.project_name}-backend"
  runtime       = "python3.8"
  role          = aws_iam_role.lambda_role.arn
  handler       = "main.lambda_handler"

  source_code_hash = filebase64sha256("backend/lambda_function.zip")
  filename         = "backend/lambda_function.zip"
}
