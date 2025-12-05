# 🚀 How to Add This Project to GitHub

Follow these steps to push your Movie Search App to GitHub:

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `movie-search-app` (or any name you prefer)
   - **Description**: "A beautiful movie search app built with React, Vite, and Tailwind CSS"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 2: Initialize Git in Your Project

Open your terminal in the project directory and run:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create your first commit
git commit -m "Initial commit: Movie Search App with React, Vite, and Tailwind CSS"
```

## Step 3: Connect to GitHub and Push

After creating the repository on GitHub, you'll see instructions. Use these commands:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/movie-search-app.git

# Rename the default branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

## Alternative: Using SSH (Recommended for frequent pushes)

If you have SSH keys set up with GitHub:

```bash
git remote add origin git@github.com:YOUR_USERNAME/movie-search-app.git
git branch -M main
git push -u origin main
```

## Step 4: Verify

1. Go to your GitHub repository page
2. You should see all your project files
3. The README.md should display automatically

## Future Updates

Whenever you make changes and want to push them:

```bash
# Check what files have changed
git status

# Add all changes
git add .

# Commit with a descriptive message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

## Important Notes

- The `.gitignore` file is already configured to exclude:
  - `node_modules/` (dependencies)
  - `dist/` (build files)
  - Environment files
  - Editor configurations

- **Never commit sensitive data** like API keys. The API key in the code is a demo key, but if you use your own, consider using environment variables.

## Troubleshooting

### If you get authentication errors:
- Use a Personal Access Token instead of password
- Or set up SSH keys for easier authentication

### If you need to update the remote URL:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/movie-search-app.git
```

### If you want to see your remote:
```bash
git remote -v
```

## Adding a GitHub Pages Deployment (Optional)

To deploy your app to GitHub Pages:

1. Install `gh-pages` package:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json` scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

3. Deploy:
```bash
npm run deploy
```

4. Enable GitHub Pages in repository settings (Settings > Pages)

---

**That's it!** Your Movie Search App is now on GitHub! 🎉

