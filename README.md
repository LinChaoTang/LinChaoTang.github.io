# LCT Website Automation Guide

This guide outlines the automated deployment workflow for your website.

## How to Deploy Your Website

When you instruct me to "push to website" (or use similar phrasing), I will automatically perform the following steps to update your live site:

1.  **Commit any uncommitted changes** in your local repository.
2.  **Push these changes to your GitHub repository** (`LinChaoTang/LinChaoTang.github.io`). This action will also trigger a GitHub Pages deployment.
3.  **Ensure Vercel deployment is triggered and updated.** Vercel is configured to automatically deploy changes pushed to your GitHub repository.

## Important Notes

*   **Deployment Delays:** Please be aware that it might take a few minutes for changes to be reflected on both GitHub Pages and Vercel after a successful push.
*   **Vercel Configuration:** The `vercel.json` file has been configured to ensure the correct homepage (`index.html`) is served.
*   **For best results:** After a push, it's a good practice to clear your browser's cache if you don't immediately see the latest changes on your live site (`https://linchaotang.com/`).
