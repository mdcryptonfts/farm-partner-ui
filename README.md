# Farm Partner React App

This UI can be easily customized and deployed so you can launch your own token farm platform.

A [farm partner contract](https://github.com/mdcryptonfts/farm-partner-contract) must be deployed and initialized, and connected to this front end in order for it to work properly.

Once that's done, users will be able to create custom token farms on your platform, earning you fees in the process.

## Configuring The App

Settings are conveniently located in the `/src/data/config.json` file. The section below outlines each of the config options.

### config.json

- `currentNetwork`: Options are `testnet` (WAX Testnet) and `mainnet` (WAX Mainnet). Adjust this based on what network you are deploying on. Alternatively, you could allow users to select a network, and store the `currentNetwork` in a context. This option may be added in a later update.

- `production`: Options are `true`/`false`. If you are testing in a local environment, set this to `false` so your browser properly navigates using the `localhost` domain. For deploying in production, set this to `true` so your browser uses your website URL instead.

- `localUrl`: When `production` is set to `false`, this is the root directory used for navigation. For example, `http://localhost:3000`.

- `appName`: A short name for your app. This will be passed into the Wharfkit session, and shown to users when they sign transactions. For example, if you set this to `Token Farm App`, when users sign transactions in their WAX wallet, they may see a prompt along the lines of `Token Farm App is requesting a token transfer`.

- `projectToken`: This takes in a `symbol` (e.g. WAXDAO) and a `contract` (e.g. token.waxdao). The app is set up to show the current price of your token in the navigation menu. If you don't want this feature, you could simply edit the `Navbar2024` file and remove the instances of token price.

- `txSettings`: When users submit transactions, these are the settings that will be passed to the transaction. By default, the app will give users 5 minutes to sign a transaction, and broadcast the transaction to the blockchain. You can adjust these settings as needed.

- `processingTxMessage`: This is the default message that will be shown in the transaction modal when a transaction is being processed, but has not been completed yet.

- `spinnerDuration`: The amount of milliseconds that the spinner will spin in the transaction modal before telling a user that their transaction is complete. By default, this is `2000` (2 seconds). You can make this longer or shorter if you desire.

- `networks`: A list of network objects for the different networks that your app supports. By default, WAX Mainnet and WAX Testnet are supported.