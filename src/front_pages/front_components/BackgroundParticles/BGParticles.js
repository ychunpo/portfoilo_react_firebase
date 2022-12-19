import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const BGParticles = () => {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  // const particlesLoaded = useCallback(async container => {
  //   await console.log(container);
  // }, []);

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        //loaded={particlesLoaded}
        //粒子的配置
        options={{
          background: {
            color: {
              value: "#1D2031",
            },
          },
          detectRetina: true,
          //duration: 40,
          // 幀率限制: 應用於所有粒子動畫的 FPS（每秒幀數）限制,幀數，越低越卡,默認60
          fpsLimit: 80,
          fullScreen: {
            enable: true,
            zIndex: -5,
          },
          //與滑鼠/觸控的互動效果
          interactivity: {
            detect_on: "canvas",
            //事件
            events: {
              //特效，主要有 push（會有生出更多的效果）、remove（點擊的地方會消失）、bubble（泡泡效果，超大泡泡！）、repulse（一樣是躲開）
              //onClick: { enable: true, mode: "repulse", },
              //滑鼠移到上方的特效，主要有 grab(會把他們抓在一起)、bubble（泡泡效果） repulse（會有躲開的效果）
              // onHover: {
              //   enable: true,
              //   mode: "repulse",
              //   // 視差
              //   parallax: { enable: false, force: 2, smooth: 10 }
              // },
              resize: true,
            },
            //配置用于事件处理的动作
            modes: {
              //bubble: { distance: 200, duration: 2, opacity: 0, size: 0, speed: 3 },
              //grab: { distance: 400, line_linked: { opacity: 1 } },
              //點擊是添加1個粒子
              // push: {
              //   quantity: 1,
              // },
              //remove: { particles_nb: 2 },
              //擊退
              repulse: {
                //鼠標移動時排斥粒子的距離
                distance: 10,
                //持續時間
                duration: 0.5,
              },
            },
          },
          //圖形設定
          particles: {
            //bounce:{},
            // 碰撞
            collisions: {
              enable: false,
            },
            color: {
              value: "#ffff99",
            },
            //圖形之間是否有連線，有的話樣式為何
            links: {
              color: "#00e500",
              distance: 150,
              enable: false,
              opacity: 0.5,
              width: 1,
            },
            //圖形移動的特性
            move: {
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 600
              },
              bounce: false,
              directions: "none",
              enable: true,
              //out, bounce
              outModes: {
                default: "out",

              },
              random: false,
              size: false,
              speed: 0.3,
              straight: false,
              // trail:{},
              // vibrate: false,
              // warp: false
            },
            //圖形的數量，越多畫面越滿
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              //limit: 0,
              //開始粒數
              value: 40,
            },
            opacity: {
              animation: {
                //destroy: {min: 0, max: 0},
                enable: false,
                speed: 0.5,
                //startValue: {min:1, max: 2},
                sync: false
              },
              value: { min: 0.2, max: 1 },
            },
            // shadow: {
            //   blur: 1,
            //   color: '#ffffff',
            //   enable: true,
            //   offset: 0
            // },
            shape: {
              // character: {},
              // image: {},
              // polygon: {},
              // stroke: {
              //   color: "#654213",
              //   width: 1,
              // },
              type: "circle",
            },
            size: {
              anim: {
                enable: false, size_min: 0.1,
                speed: 40, sync: false
              },
              random: false,
              value: { min: 1, max: 5 },
            },
          },
        }}
      />
    </>
  )
}

export default BGParticles;