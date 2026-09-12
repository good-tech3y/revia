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
          background: "#c1552e",
          borderRadius: dimension * 0.2,
        }}
      >
        <div
          style={{
            fontSize: dimension * 0.55,
            fontWeight: 700,
            color: "#faf6f1",
            fontFamily: "sans-serif",
          }}
        >
          R
        </div>
      </div>
    ),
    { width: dimension, height: dimension }
  );
}
