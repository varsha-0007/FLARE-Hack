# 📤 How to Upload Flare Karma to Risein Portal

## Complete Step-by-Step Guide

---

## 🎯 Pre-Upload Checklist

Before uploading, make sure you have:

- [ ] GitHub account (free at github.com)
- [ ] Risein account (create at app.risein.com)
- [ ] Project tested and working locally
- [ ] All code committed and pushed to GitHub
- [ ] `.env` file created (but NOT committed to GitHub)
- [ ] Smart contract deployed on testnet
- [ ] README.md file completed
- [ ] Project documentation ready

---

## 📋 Step 1: Prepare Your Project

### 1.1 Create/Update README.md

Create a `README.md` file in your project root:

````markdown
# Flare Karma - Trust Ledge Manager

## Overview

A blockchain-based trust ledge manager that records and tracks user trust scores on the Flare Network (Coston2 Testnet).

## Features

- ✅ Real-time trust score lookup
- ✅ Event recording and history
- ✅ Beautiful, responsive UI
- ✅ Smart contract integration
- ✅ REST API backend

## Tech Stack

- **Frontend**: React 18, Vite, Axios
- **Backend**: Express.js, Ethers.js v6
- **Blockchain**: Solidity, Hardhat
- **Network**: Flare Testnet Coston2

## Setup Instructions

### Prerequisites

- Node.js v16+
- npm or yarn
- MetaMask wallet

### Installation

```bash
npm install
```
````

### Running Locally

```bash
# Terminal 1: Start Hardhat local network
npm run node

# Terminal 2: Deploy contract
npm run deploy

# Terminal 3: Start backend server
npm run server

# Terminal 4: Start frontend
npm run dev
```

### Environment Variables

Create a `.env` file:

```
RPC_URL=http://127.0.0.1:8545
PRIVATE_KEY=your_private_key_here
CONTRACT_ADDRESS=your_deployed_contract_address
PORT=4000
```

## Smart Contract

The `LedgeManager` contract stores trust scores and transaction events for Ethereum addresses.

### Functions

- `recordEvent(address, txHash, eventType, delta)` - Record a new event
- `getLedge(address)` - Get trust score and event count

## API Endpoints

### GET /health

Check API status

### GET /ledge/:address

Get trust score and event count for an address

```bash
curl http://localhost:4000/ledge/0x...
```

### POST /simulate-event

Record a new transaction event

```bash
curl -X POST http://localhost:4000/simulate-event \
  -H "Content-Type: application/json" \
  -d '{"address":"0x...","txHash":"0x...","eventType":"transaction","delta":5}'
```

## Deployment to Flare Testnet Coston2

1. Get test CFLR tokens from [faucet.flare.network](https://faucet.flare.network/)
2. Update `.env` with Coston2 RPC URL
3. Deploy contract: `npx hardhat run scripts/deploy.js --network coston2`
4. Update contract address in `.env`
5. Restart backend server

## Project Structure

```
flare-app/
├── contracts/       # Solidity smart contracts
├── scripts/         # Hardhat scripts
├── server/          # Express.js backend
├── src/             # React frontend
├── hardhat.config.js
├── package.json
└── .env            # Environment variables (not in Git)
```

## License

MIT

## Author

[Your Name]

## Contact

[Your Email / GitHub Profile]

```

### 1.2 Create .gitignore

Make sure sensitive files aren't committed:

```

# Environment variables

.env
.env.local
.env.\*.local

# Dependencies

node_modules/
package-lock.json
yarn.lock

# Build outputs

dist/
build/
.vite/

# IDE

.vscode/
.idea/
\*.swp

# OS

.DS_Store
Thumbs.db

# Hardhat

artifacts/
cache/

````

### 1.3 Clean Up Code

- Remove console.logs (except important ones)
- Add comments to complex functions
- Check for security issues
- Ensure all dependencies are listed in package.json

---

## 🔗 Step 2: Push Code to GitHub

### 2.1 Create GitHub Repository

1. Go to **github.com**
2. Sign in or create account
3. Click **"New"** button (top left, plus icon)
4. Fill in repository details:
   - **Repository name**: `flare-karma` (or any name)
   - **Description**: "A blockchain-based trust ledge manager on Flare Network"
   - **Visibility**: Public
   - **DO NOT** initialize with README (you already have one)
5. Click **"Create repository"**

### 2.2 Push Your Project to GitHub

Open PowerShell in your project folder and run:

```powershell
# Initialize git (if not already done)
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Flare Karma trust ledge manager"

# Add GitHub as remote (replace USERNAME/REPO with yours)
git remote add origin https://github.com/USERNAME/flare-karma.git

# Rename branch to main (GitHub default)
git branch -M main

# Push to GitHub
git push -u origin main
````

### 2.3 Verify on GitHub

1. Go to your repository URL: `https://github.com/USERNAME/flare-karma`
2. Verify all files are there
3. Check that README.md displays correctly

---

## 🎯 Step 3: Create Risein Account

### 3.1 Sign Up for Risein

1. Visit **https://app.risein.com**
2. Click **"Sign Up"** or **"Get Started"**
3. Fill in your details:
   - Email address
   - Password (strong)
   - Full name
4. Verify email
5. Complete profile

### 3.2 Complete Your Profile

- Add profile picture
- Add bio
- Link your GitHub account
- Add your social media (LinkedIn, Twitter)

---

## 📤 Step 4: Upload Project to Risein

### 4.1 Create New Project

1. Log in to Risein Portal
2. Click **"Create Project"** or **"New Project"** button
3. You'll see option to: **"Connect GitHub"** or **"Manual Upload"**

### 4.2 Connect GitHub (RECOMMENDED)

**Option A: GitHub Integration (Automatic)**

1. Click **"Connect GitHub"**
2. Authorize Risein to access your GitHub account
3. Search for **"flare-karma"** repository
4. Select it
5. Fill in project details:
   - **Project Name**: Flare Karma
   - **Description**: A blockchain-based trust ledge manager on Flare Network
   - **Category**: Blockchain / Web3
   - **Tags**: blockchain, smart-contract, ethereum, flare, react, solidity
   - **Thumbnail**: Upload a screenshot of your UI
6. Click **"Deploy"**

**Option B: Manual Repository Link**

1. Click **"Manual Setup"**
2. Paste your GitHub repository URL:
   ```
   https://github.com/USERNAME/flare-karma
   ```
3. Risein will automatically detect your project structure
4. Fill in project details (as above)
5. Click **"Create Project"**

### 4.3 Add Project Details

Fill in all required fields:

#### Basic Information

- **Project Name**: Flare Karma
- **Short Description** (1 line):
  ```
  A blockchain-based trust ledge manager on Flare Network
  ```
- **Full Description** (detailed):

  ```
  Flare Karma is a decentralized application that records and tracks
  trust scores for Ethereum addresses. It combines a React frontend,
  Express.js backend, and Solidity smart contract to create an
  immutable trust ledger on the Flare Network.

  Features:
  - Real-time trust score lookup
  - Event recording and history
  - Beautiful, responsive UI
  - Smart contract integration
  - REST API backend

  Users can lookup any wallet address to see their trust score
  and complete transaction history.
  ```

#### Technical Details

- **Primary Language**: JavaScript/Solidity
- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Blockchain**: Solidity, Hardhat
- **Network**: Flare Testnet (Coston2)

#### Category & Tags

- **Category**: Blockchain / DeFi / Web3
- **Tags**:
  - blockchain
  - smart-contract
  - solidity
  - react
  - web3
  - flare-network
  - ethereum
  - decentralized

#### Links

- **GitHub**: `https://github.com/USERNAME/flare-karma`
- **Live Demo**: (if deployed)
- **Website**: (your personal website, if any)

#### Media

- **Featured Image**: Screenshot of your UI
- **Additional Screenshots**:
  1. Home page with inputs
  2. Results display
  3. Smart contract code
  4. Architecture diagram

### 4.4 Choose Hosting Option

Risein typically offers:

1. **Free Tier**

   - Limited deployment
   - Risein subdomain
   - Good for testing

2. **Pro Tier**
   - Custom domain
   - Better resources
   - Priority support

For your first upload, choose **Free Tier** and upgrade later if needed.

---

## 🚀 Step 5: Deploy on Risein

### 5.1 Configure Build Settings

Risein will ask:

```
Build Command: npm install && npm run build
Start Command: npm run dev
Environment: Production
```

Update as follows:

```
Build Command: npm install
Start Command: npm run server & npm run dev
Node Version: 18
```

### 5.2 Set Environment Variables

1. In Risein project settings, go to **"Environment Variables"**
2. Add each variable:

```
RPC_URL=https://coston2-api.flare.network/ext/bc/C/rpc
CONTRACT_ADDRESS=your_deployed_contract_address
PRIVATE_KEY=your_private_key_here
PORT=4000
```

**⚠️ IMPORTANT**: Never share private keys publicly. Use a testnet private key or consider:

- Using Risein's secret management
- Creating a separate account just for this deployment
- Only storing read-only endpoints

### 5.3 Deploy

1. Click **"Deploy"** button
2. Watch deployment logs
3. Wait for "Deployment Successful" message
4. Get your live URL (e.g., `flare-karma-1234.risein.app`)

### 5.4 Test Live Version

1. Copy your Risein URL
2. Open in browser
3. Test all features:
   - [ ] UI loads correctly
   - [ ] Input fields work
   - [ ] Lookup button works
   - [ ] Results display properly
   - [ ] No console errors

---

## ✅ Step 6: Post-Upload Checklist

- [ ] Project appears on Risein profile
- [ ] All files visible in Risein explorer
- [ ] Live demo URL works
- [ ] README displays correctly
- [ ] All screenshots uploaded
- [ ] Description is clear and complete
- [ ] Tags are relevant
- [ ] GitHub link is correct
- [ ] No sensitive data exposed
- [ ] Tests pass on live version

---

## 🔍 Step 7: Share & Promote

### 7.1 Share Your Project

1. **Risein Profile Link**:

   ```
   https://app.risein.com/projects/your-username/flare-karma
   ```

2. **GitHub Link**:

   ```
   https://github.com/USERNAME/flare-karma
   ```

3. **Live Demo URL** (from Risein):
   ```
   https://flare-karma-xxx.risein.app
   ```

### 7.2 Share on Social Media

**Twitter Template:**

```
🔗 Just deployed Flare Karma - a blockchain-based trust ledger!

✨ Features:
• Real-time trust score lookup
• Immutable ledger on @FlareNetworks
• Beautiful React UI
• Smart contract integration

Check it out: [Risein Link]
GitHub: [GitHub Link]

#Web3 #Blockchain #Solidity
```

**LinkedIn Post:**

```
Excited to share my latest project: Flare Karma

A decentralized trust ledge manager built with:
- React & Vite frontend
- Express.js backend
- Solidity smart contracts
- Flare Network blockchain

This project showcases full-stack Web3 development skills.

Learn more: [Risein Link]
```

### 7.3 Share with Mentor

Send your mentor:

- Risein project link
- GitHub repository
- Live demo URL
- Brief explanation of features

---

## 🐛 Troubleshooting

### Issue: "Build Failed"

**Solution:**

- Check that `package.json` has all dependencies
- Run `npm install` locally and test
- Check Node.js version (should be 18+)

### Issue: "PORT Already in Use"

**Solution:**

- Change PORT in `.env` to `3000` or `8080`
- Make sure backend starts before frontend

### Issue: "Cannot Connect to Smart Contract"

**Solution:**

- Verify CONTRACT_ADDRESS in `.env`
- Check RPC_URL is correct for Coston2
- Test locally first

### Issue: "GitHub Authorization Failed"

**Solution:**

- Check GitHub token permissions
- Re-authorize Risein on GitHub
- Use manual repository URL instead

### Issue: "Live Demo Shows Blank Page"

**Solution:**

- Check browser console (F12) for errors
- Verify API endpoint is reachable
- Check that backend is running
- Test with different browser

---

## 📝 Important Notes

### Security Best Practices

1. **Never commit `.env` to GitHub**

   - Add to `.gitignore`
   - Use Risein's secret management

2. **Don't expose private keys in code**

   - Use environment variables
   - Consider rotating keys after demo

3. **Validate all user inputs**

   - Check wallet address format
   - Sanitize transaction hashes

4. **Use HTTPS only**
   - Risein provides SSL by default
   - Ensure all API calls use https

### Performance Tips

1. **Optimize images**

   - Compress screenshots before uploading
   - Use WebP format where possible

2. **Lazy load components**

   - Only load what's needed initially
   - Code split with React.lazy()

3. **Cache API responses**
   - Use browser cache for repeated queries
   - Implement request debouncing

### Maintenance

1. **Regular updates**

   - Keep dependencies updated
   - Monitor security advisories

2. **Monitor logs**

   - Check Risein deployment logs
   - Set up error alerts

3. **Test regularly**
   - Test live demo weekly
   - Check for breaking changes

---

## 🎓 After Upload - Next Steps

### Improvements to Consider

1. **Add user authentication**

   - Web3 wallet login (MetaMask)
   - User profiles
   - Saved queries

2. **Enhanced features**

   - Historical graphs
   - Export as CSV
   - Email notifications
   - API documentation

3. **Monetization**

   - Premium features
   - API access tier
   - Sponsored lookups

4. **Mainnet deployment**
   - Deploy to Flare mainnet
   - Increase trust score limits
   - Real use cases

---

## 📞 Support & Resources

- **Risein Documentation**: https://docs.risein.com
- **GitHub Help**: https://docs.github.com
- **Flare Network**: https://flare.network
- **Hardhat Docs**: https://hardhat.org/docs
- **React Docs**: https://react.dev

---

## ✨ Final Checklist Before Sharing with Mentor

- [ ] Project deployed on Risein
- [ ] Live URL working perfectly
- [ ] GitHub repository public and complete
- [ ] README is clear and detailed
- [ ] All screenshots uploaded
- [ ] Description highlights key features
- [ ] Tags are relevant and SEO-friendly
- [ ] No security issues
- [ ] Tested on multiple browsers
- [ ] Mobile responsive (if applicable)
- [ ] Mentor can access both links
- [ ] Video demo recorded (optional but impressive)

---

## 🎉 Congratulations!

Your Flare Karma project is now live on Risein!

**What to tell your mentor:**

> "I've built a full-stack Web3 application that combines a React frontend, Express.js backend, and a Solidity smart contract deployed on Flare Network. The application is live at [Risein URL] and the complete source code is available on GitHub."

**Good luck! 🚀**
