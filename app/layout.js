"use client";

import { useEffect, useRef } from "react";
import Head from "next/head";
import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const canvasRef = useRef(null);


  const excludedPaths = ["/login", "/join_membership", "/forgot_password"];
  const isExcluded = excludedPaths.includes(pathname);

  useEffect(() => {
    if (isExcluded) return;

    const COUNT = 15;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const Snowflake = function () {
      this.x = 0;
      this.y = 0;
      this.vy = 0;
      this.vx = 0;
      this.r = 0;
      this.o = 0;
      this.reset();
    };

    Snowflake.prototype.reset = function () {
      this.x = Math.random() * width;
      this.y = Math.random() * -height;
      this.vy = 1.7 + Math.random() * 0.2;
      this.vx = (Math.random() - 0.5) * 0.15;
      this.r = 8 + Math.random() * 10;
      this.o = 0.5 + Math.random() * 0.5;
    };

    canvas.style.position = "absolute";
    canvas.style.left = canvas.style.top = "0";

    let snowflakes = [];
    for (let i = 0; i < COUNT; i++) {
      let snowflake = new Snowflake();
      snowflake.reset();
      snowflakes.push(snowflake);
    }

    function update() {
      if (canvas.width !== width || canvas.height !== height) {
        resizeCanvas();
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < COUNT; i++) {
        const snowflake = snowflakes[i];
        snowflake.y += snowflake.vy;
        snowflake.x += snowflake.vx;

        const gradient = ctx.createRadialGradient(
          snowflake.x, snowflake.y, 0,
          snowflake.x, snowflake.y, snowflake.r
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${snowflake.o})`);
        gradient.addColorStop(0.2, `rgba(255, 255, 255, ${snowflake.o * 0.8})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();

        if (snowflake.y > height) {
          snowflake.reset();
        }

        if (snowflake.x < 0 || snowflake.x > width) {
          snowflake.reset();
        }
      }

      requestAnimationFrame(update);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, false);

    update();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isExcluded]);

  return (
    <html lang="ko" className={isExcluded ? "excluded" : ""}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={isExcluded ? "excluded" : ""}>
        <div className="container">
          {!isExcluded && <canvas ref={canvasRef} />}
          {!isExcluded && (
            <div className={pathname === "/" ? "snowBottomPage" : "snowBottomDefault"}></div>
          )}
          {children}
        </div>
      </body>
    </html>
  );
}
