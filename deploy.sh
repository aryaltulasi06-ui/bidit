#!/bin/bash
# GitHub Pages Deployment Script for aryaltulasi06-ui

# Navigate to project directory
cd /Users/sprite/Downloads/bidit

# Configure git user (if not already done)
git config user.name "Your Name"
git config user.email "your-email@example.com"

# Verify remote is set correctly
echo "Current remotes:"
git remote -v

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your site will be available at:"
echo "https://aryaltulasi06-ui.github.io/bidit/"
echo ""
echo "GitHub will automatically deploy when the Actions workflow finishes (1-2 minutes)"
echo ""
echo "To check deployment status:"
echo "1. Visit: https://github.com/aryaltulasi06-ui/bidit/actions"
echo "2. Look for the latest workflow run"
echo "3. Wait for ✅ next to 'Deploy to GitHub Pages'"
