# HomePod Announcer Skill

A Universal Agent Skill and MCP Server for real-time Text-to-Speech (TTS) announcements on Apple HomePods (AirPlay 2 devices).

## 🛠 Prerequisites

This skill uses the Python library `pyatv` as a bridge to communicate with HomePods.

1.  **Install Python** (3.8+)
2.  **Install pyatv**
    ```bash
    pip install pyatv
    ```
3.  **Pair with your HomePod (Important)**
    You must pair with your HomePod once manually before using the skill.
    ```bash
    atvremote scan          # Find your HomePod's ID
    atvremote --id <ID> pair # Follow the pairing process (enter the PIN shown or configured)
    ```

## 🚀 Installation & Setup

### For OpenClaw / OpenCode Users
You can install this skill directly using the GitHub URL:
```bash
opencode install https://github.com/lucas-jo/homepod-announcer-skill.git
```

### For Claude Code Users
Clone this repository into your personal skills directory:
```bash
git clone https://github.com/lucas-jo/homepod-announcer-skill.git ~/.claude/skills/homepod
```

## 🎙 Available Tools

- `announce(message, identifier?, language?)`: Converts text to speech and plays it on the HomePod.
- `discover_homepods()`: Scans the network for available HomePods and their identifiers.

## 📄 License
MIT
