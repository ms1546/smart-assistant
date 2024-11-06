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

# IAMロール (Lambda)
resource "aws_iam_role" "lambda_role" {
  name = "${var.project_name}-lambda-role"

  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "lambda.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  })

  # Lambdaのポリシーをアタッチ
  inline_policy {
    name = "${var.project_name}-lambda-policy"

    policy = jsonencode({
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
          ],
          "Resource": "*"
        }
      ]
    })
  }
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

# Amplify アプリケーションの作成
resource "aws_amplify_app" "react_app" {
  name                = "${var.project_name}-amplify-app"
  repository          = "https://github.com/ms1546/smart-assistant"
  oauth_token         = var.github_token
  enable_basic_auth   = false
  build_spec          = file("${path.module}/buildspec.yml")

  environment_variables = {
    "NODE_ENV" = "production"
  }

  custom_rules {
    source    = "/<*>"
    target    = "/index.html"
    status    = "200"
  }
}

# Amplifyのブランチ設定
resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.react_app.id
  branch_name = "main"

  environment_variables = {
    "AMPLIFY_MONOREPO_APP_ROOT" = "client"
  }
}

# CodePipelineの設定
resource "aws_codepipeline" "react_pipeline" {
  name     = "${var.project_name}-pipeline"
  role_arn = aws_iam_role.codepipeline_role.arn

  artifact_store {
    location = aws_s3_bucket.codepipeline_bucket.bucket
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        Owner      = "username"
        Repo       = "my-react-app"
        Branch     = "main"
        OAuthToken = var.github_token
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name             = "Deploy"
      category         = "Deploy"
      owner            = "AWS"
      provider         = "Amplify"
      input_artifacts  = ["source_output"]
      version          = "1"

      configuration = {
        AppId      = aws_amplify_app.react_app.id
        BranchName = aws_amplify_branch.main.branch_name
      }
    }
  }
}
