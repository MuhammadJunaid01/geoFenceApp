# GeoFenceApp User Guide (Android Only)

### Download the Build

Follow these steps to download the latest build of the GeoFenceApp:

1. Visit the [GeoFenceApp GitHub Repository](https://github.com/MuhammadJunaid01/geoFenceApp).
2. Navigate to the **Actions** tab in the repository.
3. Select the latest workflow run with a ✅ green checkmark (indicating a successful build).
4. Scroll to the **Artifacts** section and download the `.apk` file.

## Step 2: Install the App on Your Android Device

Once you have downloaded the `.apk` file, follow these steps to install it on your Android device:

1. **Transfer the APK to your Android device**  
   Use a USB cable, Bluetooth, or any file-sharing method to transfer the `.apk` file.

2. **Locate the File on Your Device**

   - Open the **File Manager** on your Android device.
   - Navigate to the folder where you saved the `.apk` file.

3. **Start the Installation**

   - Tap on the `.apk` file to begin the installation process.

4. **Allow Installation from Unknown Sources** (if prompted):

   - Go to **Settings** > **Security** > **Install Unknown Apps**.
   - Enable installation for the app you're using (e.g., File Manager or Browser).

5. **Complete the Installation**
   - Follow the on-screen instructions to finish the installation.
   - Once installed, open the app and start using GeoFenceApp!

---

## Step 3: Grant Permissions

Follow these steps to grant the necessary permissions for the GeoFenceApp:

1. **Open the GeoFenceApp**  
   Launch the GeoFenceApp on your Android device.

2. **Grant Location Permissions**  
   When prompted, grant **Location Permissions** to enable geofencing functionality.

   - **High Accuracy Mode** is recommended for the best results.

3. **If You Accidentally Deny Permissions**  
   If you mistakenly deny the permissions, you can manually enable them:
   - Go to **Settings** > **Apps** > **GeoFenceApp** > **Permissions**.
   - Enable **Location Permissions**.

---

### Notes

- Make sure **Location Permissions** are always granted for the app to function properly.
- High accuracy mode allows the app to use GPS, Wi-Fi, and mobile networks for precise location tracking.

## Step 4: Using the GeoFenceApp

### View Your Location

- Upon opening the app, the map will center on your **current location** if location permissions are granted.
- If the map does not center, ensure that:
  - **Location Permissions** are enabled.
  - **GPS** is active on your device.

### Create a GeoFence

1. Tap the **"Add New Map"** button to begin creating a new geofence.
2. **Draw the geofence boundary** by selecting points on the map to define the area.
3. **Save the geofence** by providing a name or identifier for the geofence.

### View Saved GeoFences

- Your **saved geofences** will be displayed as highlighted polygons on the map.

---

### Notes

- Ensure that your **device's GPS** is properly configured for accurate location tracking.
- Saved geofences will persist in the app, allowing you to manage them as needed.

## Step 5: Update the App

To get the latest version of the app, follow these steps:

1. **Repeat Step 1** to download the latest `.apk` file from GitHub Actions.
2. **Install the new `.apk` file** over the existing version on your device.

   - When prompted, confirm that you want to **replace the existing app** with the new version.
   - The app data and settings should remain intact after the update.

---

### Notes

- Always ensure you have the **latest version** for bug fixes, new features, and improvements.
- If you encounter any issues with the update, try uninstalling the previous version before installing the new one.

## Run Locally

Clone the project

```bash
  git clone https://github.com/MuhammadJunaid01/geoFenceApp

```

Go to the project directory

```bash
  cd geoFenceApp
```

Install dependencies

```bash
  yarn install

```

Start the server

```bash
  yarn android

```

## For Developers: Running and Building the App

#### If you're a developer and want to modify the app:

Clone the project

```bash
  git clone https://github.com/MuhammadJunaid01/geoFenceApp

```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn install

```

Start the server

```bash
  yarn android

```

## Build a Production APK

##### To generate a signed APK, run the following commands

```bash
 cd android
./gradlew assembleRelease
```

##### Once the build is complete, you'll find the APK in:

#### android/app/build/outputs/apk/release

## Screenshots

1.  ![App Screenshot](https://i.ibb.co.com/7kqMrH9/Screenshot-1736323961.png)
2.  ![App Screenshot](https://i.ibb.co.com/TtjQJws/Screenshot-1736323972.png)
3.  ![App Screenshot](https://i.ibb.co.com/b2XKfCZ/Screenshot-1736323952.png)

4.  ![App Screenshot](https://i.ibb.co.com/qxLrYG0/Screenshot-1736323991.png)

## Tech Stack

React Native , Typescript Redux, TailwindCSS

## Optimizations

### Performance Improvements

GeoFenceApp is an application that allows users to manage geofences on a map. This app offers functionality like creating, viewing, and managing geofences, as well as tracking location.

## Optimizations

The app has undergone several optimizations to enhance performance, user experience, and resource management. Here are the key optimizations made:

### 2. Efficient State Management

Unnecessary state updates and re-renders were minimized by utilizing memoization techniques like `useMemo` and `React.memo`, as well as appropriate use of React hooks. These optimizations ensure that the app remains responsive and minimizes performance bottlenecks, particularly for components that don't need frequent updates. This results in smoother interactions, especially on lower-end devices.

---

These optimizations contribute to a better user experience by reducing load times, improving responsiveness, and making the app more efficient overall.
