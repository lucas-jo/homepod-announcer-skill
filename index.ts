import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { spawn } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

// @ts-ignore
import gTTS from "gtts";

const server = new Server(
  {
    name: "homepod-announcer-skill",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const ANNOUNCE_TOOL = {
  name: "announce",
  description: "집 안의 홈팟으로 음성 안내방송을 내보냅니다.",
  inputSchema: {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "방송할 텍스트 내용",
      },
      identifier: {
        type: "string",
        description: "홈팟의 고유 식별자 (제공되지 않으면 첫 번째 홈팟 시도)",
      },
      language: {
        type: "string",
        description: "언어 코드 (예: 'ko', 'en')",
        default: "ko",
      },
    },
    required: ["message"],
  },
};

const DISCOVER_TOOL = {
  name: "discover_homepods",
  description: "네트워크 내의 사용 가능한 홈팟들을 검색합니다.",
  inputSchema: {
    type: "object",
    properties: {},
  },
};

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [ANNOUNCE_TOOL, DISCOVER_TOOL],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "discover_homepods") {
    return await handleDiscover();
  }

  if (name === "announce") {
    const { message, identifier, language = "ko" } = args as any;
    return await handleAnnounce(message, identifier, language);
  }

  throw new Error(`Unknown tool: ${name}`);
});

async function handleDiscover() {
  return new Promise((resolve) => {
    const process = spawn("atvremote", ["scan"]);
    let output = "";

    process.stdout.on("data", (data) => {
      output += data.toString();
    });

    process.on("close", () => {
      resolve({
        content: [{ type: "text", text: output || "홈팟을 찾지 못했습니다. pyatv가 설치되어 있는지 확인하세요." }],
      });
    });
  });
}

async function handleAnnounce(message: string, identifier?: string, language: string = "ko") {
  const tempFile = join(tmpdir(), `announcement-${Date.now()}.mp3`);

  try {
    await new Promise((resolve, reject) => {
      const gtts = new gTTS(message, language);
      gtts.save(tempFile, (err: any) => {
        if (err) reject(err);
        else resolve(true);
      });
    });

    const atvArgs = identifier ? ["--id", identifier, "stream_file=" + tempFile] : ["stream_file=" + tempFile];
    
    return new Promise((resolve) => {
      const process = spawn("atvremote", atvArgs);
      let stderr = "";

      process.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      process.on("close", (code) => {
        try { unlinkSync(tempFile); } catch (e) {}

        if (code === 0) {
          resolve({
            content: [{ type: "text", text: `성공적으로 안내방송을 보냈습니다: "${message}"` }],
          });
        } else {
          resolve({
            content: [{ type: "text", text: `안내방송 전송 실패: ${stderr}\n\n도움말: 홈팟과 페어링이 필요할 수 있습니다 (atvremote pair).` }],
            isError: true,
          });
        }
      });
    });
  } catch (error: any) {
    return {
      content: [{ type: "text", text: `에러 발생: ${error.message}` }],
      isError: true,
    };
  }
}

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("HomePod Announcer MCP Server running on stdio");
