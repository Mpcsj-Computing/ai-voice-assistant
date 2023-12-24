import { useEffect, useRef } from "react";

export const CANVAS_ORB_ID = "orb-canvas";

const MAX = 50;
const CANVAS_SIZE = 390;
const SHIFT_VALUE = 195;

var canvas: any, ctx: any;
var points: any[] = [];

interface OrbControls {
  rotationSpeed: number;
  sphereSizeScale: number; // Controls the entire sphere size
  layersCount: number;
  depthOuterLayer: number; // Controls how big is the outer layer
}

const AUDIO_PLAYING_STATE: OrbControls = {
  rotationSpeed: 0.3,
  sphereSizeScale: 155,
  layersCount: 3,
  depthOuterLayer: 2,
};

const AUDIO_WAITING_STATE: OrbControls = {
  rotationSpeed: 0.8,
  sphereSizeScale: 155,
  layersCount: 3,
  depthOuterLayer: 2,
};

export interface UseVoiceAssistantAvatarProps {
  audioFileUrl?: string;
}

const useVoiceAssistantAvatar = ({
  audioFileUrl,
}: UseVoiceAssistantAvatarProps) => {
  const orbControls = useRef<OrbControls>(AUDIO_WAITING_STATE);
  const countRef = useRef(0);

  const animateOrb = () => {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";

    const { rotationSpeed, sphereSizeScale, layersCount, depthOuterLayer } =
      orbControls.current;

    var tim = countRef.current / 5;

    for (var e = 0; e < layersCount; e++) {
      tim *= rotationSpeed;
      var s = 1 - e / layersCount;
      a = tim / 59; // The higher this number is initially, the arches tend to rotate horizontally.
      var yp = Math.cos(a);
      var yp2 = Math.sin(a);
      a = tim / 23; // The higher this number is initially, the arches tend to rotate vertically.
      var xp = Math.cos(a);
      var xp2 = Math.sin(a);
      var p2 = [];

      for (var a = 0; a < points.length; a++) {
        var x = points[a][0];
        var y = points[a][1];
        var z = points[a][2];

        var y1 = y * yp + z * yp2;
        var z1 = y * yp2 - z * yp;
        var x1 = x * xp + z1 * xp2;

        z = x * xp2 - z1 * xp;
        z1 = Math.pow(depthOuterLayer, z * s);
        x = x1 * z1;
        y = y1 * z1;
        p2.push([x, y, z]);
      }
      s *= sphereSizeScale;
      for (var d = 0; d < layersCount; d++) {
        for (var a = 0; a < MAX; a++) {
          const b = p2[d * MAX + a];
          const c = p2[((a + 1) % MAX) + d * MAX];
          const hueColor = (a / MAX) * 360;
          ctx.beginPath();
          ctx.strokeStyle = "hsla(" + (hueColor | 0) + ",70%,60%,0.15)";
          ctx.lineWidth = Math.pow(10, b[2]);
          ctx.lineTo(b[0] * s + SHIFT_VALUE, b[1] * s + SHIFT_VALUE);
          ctx.lineTo(c[0] * s + SHIFT_VALUE, c[1] * s + SHIFT_VALUE);
          ctx.stroke();
        }
      }
    }
    countRef.current++;
    requestAnimationFrame(animateOrb);
  };

  const loadOrb = () => {
    canvas = document.getElementById(CANVAS_ORB_ID);
    ctx = canvas.getContext("2d");
    canvas.width = canvas.height = CANVAS_SIZE;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    var r = 0;
    for (var a = 0; a < MAX; a++) {
      points.push([Math.cos(r), Math.sin(r), 0]);
      r += (Math.PI * 2) / MAX;
    }

    for (var a = 0; a < MAX; a++) {
      points.push([0, points[a][0], points[a][1]]);
    }

    for (var a = 0; a < MAX; a++) {
      points.push([points[a][1], 0, points[a][0]]);
    }

    animateOrb();
  };

  useEffect(() => {
    if (audioFileUrl) {
      orbControls.current = AUDIO_PLAYING_STATE;
    } else {
      orbControls.current = AUDIO_WAITING_STATE;
    }
  }, [audioFileUrl]);

  useEffect(() => {
    loadOrb();
  }, []);
};

export default useVoiceAssistantAvatar;
