---
name: homepod-announce
description: Sends a text-to-speech announcement to an Apple HomePod via AirPlay 2. Use when the user wants to broadcast a message at home.
disable-model-invocation: false
allowed-tools: Bash(atvremote *), Read
---

# HomePod Speaker Skill

This skill uses `pyatv` and `gTTS` to broadcast messages to a HomePod on the local network.

## Commands
- `/homepod-announce <message>`: Broadcasts the message immediately.

## Instructions
1. Use `atvremote scan` to find HomePods if no ID is provided.
2. Generate TTS using the internal logic or `gtts-cli`.
3. Stream the audio file using `atvremote --id <ID> stream_file=<path>`.
