"use client";

import * as React from 'react';
import { DOBOT_Nova2, Nova2_joints } from './nova2.js';
import Controller from './controller.js'


export default function Home() {
  const [rotate, set_rotate] = React.useState({ j1: 0, j2: 0, j3: 0, j4: 0, j5: 0, j6: 0 })
  const [target, set_target] = React.useState({ x: 0, y: 1.4, z: 0 })
  const [wrist_rotate, set_wrist_rotate] = React.useState({ x: 0, y: 0, z: 0 })
  const [fabrik_mode, set_fabrik_mode] = React.useState(false)

  const [c_pos, set_c_pos] = React.useState({ x: 0, y: 0.5, z: 1.2 })
  const [c_deg, set_c_deg] = React.useState({ x: 0, y: 0, z: 0 })


  const edit_pos = (posxyz) => `${posxyz.x} ${posxyz.y} ${posxyz.z}`

  const joint_pos = Nova2_joints;


  React.useEffect(() => {
    const initAframe = async () => {
      console.log("Loading A-frame");
      await import('aframe');
    }
    initAframe();
  }, []);

  const robotProps = {
    rotate, joint_pos, edit_pos
  }

  const controllerProps = {
    rotate, set_rotate, target, set_target,
    wrist_rotate, set_wrist_rotate,
    fabrik_mode, set_fabrik_mode
  }




  return (
    <>
      <p>
        DOBOT Nova2 Control
      </p>
      <a-scene xr-mode-ui="enterAREnabled: true; XRMode: xr">
        <a-plane position="0 -0.01 0" rotation="-90 0 0" width="1" height="1" color="#7BC8A4" shadow></a-plane>
        <DOBOT_Nova2 visible={true} {...robotProps} />
        <a-entity id="rig" position={edit_pos(c_pos)} rotation={`${c_deg.x} ${c_deg.y} ${c_deg.z}`}>
          <a-camera id="camera" cursor="rayOrigin: mouse;" position="0 0 0"></a-camera>
        </a-entity>
      </a-scene >
      <Controller {...controllerProps} />
    </>
  );
}
