import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ size: string }> }
) {
  const { size } = await params;
  const dimension = parseInt(size, 10) || 512;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#191512",
          borderRadius: dimension * 0.22,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: dimension * 0.19,
            fontWeight: 800,
            fontFamily: "sans-serif",
            letterSpacing: "-0.02em",
            color: "#faf6f1",
          }}
        >
          revi
          <span style={{ color: "#c1552e" }}>a</span>
        </div>
      </div>
    ),
    { width: dimension, height: dimension }
  );
}
