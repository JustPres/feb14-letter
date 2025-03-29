
# Timelines - Memory Timeline App

A beautiful web and mobile app for capturing and preserving your special moments. Create a digital scrapbook of your life's journey with photos, stories, and tags organized chronologically.

## Features

- **Timeline View**: Memories organized chronologically with a beautiful timeline interface
- **Photo Support**: Add images to your memories to bring them to life
- **Rich Text Stories**: Capture the details of each memory with formatted text
- **Tagging System**: Organize memories by adding custom tags
- **Offline Support**: Access your memories even without an internet connection
- **Mobile-Friendly**: Works great on both desktop and mobile devices
- **Progressive Web App**: Install on your home screen for a native app experience

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/timelines-app.git
cd timelines-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

4. Access the app:
   - On your computer: http://localhost:3000
   - On your mobile device: http://[your-computer-ip]:3000

### Installing as a Mobile App

#### On Android:
1. Open Chrome on your Android device
2. Navigate to http://[your-computer-ip]:3000
3. Tap the menu button (three dots)
4. Select "Add to Home screen"
5. Follow the prompts to install

#### On iOS:
1. Open Safari on your iOS device
2. Navigate to http://[your-computer-ip]:3000
3. Tap the Share button
4. Select "Add to Home Screen"
5. Tap "Add" to confirm

## How to Use

### Creating a Memory
1. Tap the "+ New Memory" button in the top right
2. Fill in the memory details:
   - Title (required)
   - Date (required)
   - Photo (optional)
   - Story (optional)
   - Tags (optional, comma-separated)
3. Click "Save Memory"

### Viewing Memory Details
1. Click on any memory card in the timeline
2. View the full details of that memory
3. Use the "Edit" button to make changes
4. Use the "Delete" button to remove the memory

## Technology Stack

- HTML5, CSS3, JavaScript
- Tailwind CSS for styling
- IndexedDB via localStorage for data storage
- Service Workers for offline functionality

## Privacy

All your memories are stored locally on your device. No data is sent to any server.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 