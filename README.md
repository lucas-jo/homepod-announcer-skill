# HomePod Announcer Skill

A Universal Agent Skill and MCP Server for real-time Text-to-Speech (TTS) announcements on Apple HomePods (AirPlay 2 devices).

## 🎯 Why this exists? (The Use Case)
This skill was primarily designed to solve a specific problem: **"How can my remote AI agent notify me in the physical world?"**

By combining this skill with [**openclaw-bridge-remote**](https://github.com/lucas-jo/openclaw-bridge-remote), you can create a seamless notification loop between your remote heavy-lifting servers and your local environment.

**Scenario: The "Job Done" Notification**
1. Your AI agent on a remote GPU server finishes a long training task.
2. It uses `openclaw-bridge-remote` to tunnel a request to your local machine.
3. Your local machine (running this skill) receives the request.
4. **Result:** Your Living Room HomePod announces: *"Sir, the model training is complete."*

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
