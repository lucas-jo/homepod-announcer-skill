# HomePod Announcer MCP Server

Apple HomePod(AirPlay 2 지원 기기)으로 실시간 TTS 안내방송을 내보내는 MCP 서버입니다.

## 🛠 필수 구성 요소
이 서버는 Python 라이브러리인 `pyatv`를 브릿지로 사용합니다.

1.  **Python 설치**
2.  **pyatv 설치**
    ```bash
    pip install pyatv
    ```
3.  **홈팟 페어링 (중요)**
    처음 한 번은 수동으로 홈팟과 페어링해야 합니다.
    ```bash
    atvremote scan          # 홈팟의 ID 확인
    atvremote --id <ID> pair # 페어링 진행 (홈팟에 표시되거나 설정된 PIN 입력)
    ```

## 🚀 설치 및 실행 (OpenClaw)

1.  이 레포지토리를 클론합니다.
2.  의존성을 설치합니다.
    ```bash
    bun install
    ```
3.  MCP 설정을 추가합니다.
    ```json
    {
      "mcpServers": {
        "homepod-announcer": {
          "command": "bun",
          "args": ["run", "/absolute/path/to/index.ts"]
        }
      }
    }
    ```

## 🎙 지원하는 도구 (Tools)

- `announce(message, identifier?, language?)`: 지정한 메시지를 음성으로 변환하여 홈팟에서 재생합니다.
- `discover_homepods()`: 네트워크 내의 홈팟 목록과 ID를 검색합니다.

## 📄 라이선스
MIT
