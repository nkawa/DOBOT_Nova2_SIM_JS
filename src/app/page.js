"use client";

import * as React from 'react';
import { DOBOT_Nova2, Nova2_joints } from './nova2.js';
import Controller from './controller.js'
//import { AFRAME } from 'aframe';
import { setNodeData } from './fabrik.js';

export default function Home() {
  const [rotate, set_rotate] = React.useState({ j1: 0, j2: 0, j3: 0, j4: 0, j5: 0, j6: 0 })
  const [target, set_target] = React.useState({ x: 0, y: 0.9, z: 0 })
  const [wrist_rotate, set_wrist_rotate] = React.useState({ x: 0, y: 0, z: 0 })
  const [fabrik_mode, set_fabrik_mode] = React.useState(false)

  const [c_pos, set_c_pos] = React.useState({ x: 0, y: 0.5, z: 1.2 })
  const [c_deg, set_c_deg] = React.useState({ x: 0, y: 0, z: 0 })


  const [nodes, set_nodes] = React.useState([])
  const [node1, set_node1] = React.useState({ x: 0.5, y: 0.5, z: 0 })
  const [node2, set_node2] = React.useState({ x: 0.5, y: 0, z: 0 })

  const [joint_length, set_joint_length] = React.useState([])

  const [box_scale, set_box_scale] = React.useState("0.03 0.03 0.03")
  const [box_visible, set_box_visible] = React.useState(true)




  const edit_pos = (posxyz) => `${posxyz.x} ${posxyz.y} ${posxyz.z}`

  const joint_pos = Nova2_joints;


  React.useEffect(() => {
    const initAframe = async () => {
      console.log("Loading A-frame");
      await import('aframe');
      if ('model-opacity' in AFRAME.components) { // モデルを透明にするための仕組み
        console.log("Second register");
      } else {
        AFRAME.registerComponent("model-opacity", {
          schema: {
            opacity: { type: "number", default: 0.5 }
          },
          init: function () {
            this.el.addEventListener("model-loaded", this.update.bind(this));
          },
          update: function () {
            var mesh = this.el.getObject3D("mesh");
            var data = this.data;
            if (!mesh) {
              return;
            }
            mesh.traverse(function (node) {
              if (node.isMesh) {
                node.material.opacity = data.opacity;
                node.material.transparent = data.opacity < 1.0;
                node.material.needsUpdate = true;
                //                  node.material.format = THREE.RGBAFormat;
              }
            });
          }
        });
      }
    }
    initAframe();
    const { nod, len } = setNodeData(joint_pos);
    set_nodes(nod);
    set_joint_length(len);
  }, []);

  const robotProps = {
    rotate, joint_pos, edit_pos
  }

  const controllerProps = {
    rotate, set_rotate, target, set_target,
    wrist_rotate, set_wrist_rotate,
    fabrik_mode, set_fabrik_mode
  }

  const aboxprops = {
    nodes, box_scale, box_visible, edit_pos
  }
  console.log("Node:", nodes)

  const Abox = (props) => {
    const { nodes, box_scale, box_visible, edit_pos } = props
    const coltbl = ["red", "green", "blue", "yellow"]
    if (nodes.length > 0) {
      return nodes.map((node, idx) => <a-box key={idx} position={edit_pos(node)} scale={box_scale} color={coltbl[idx]} visible={box_visible}></a-box>)
    } else {
      return null
    }
  }

  return (
    <>
      <p>
        DOBOT Nova2 Control
      </p>
      <a-scene xr-mode-ui="enterAREnabled: true; XRMode: xr">
        <Abox {...aboxprops} />
        <a-cone position={edit_pos(node1)} scale={box_scale} color="red" visible={box_visible} material="opacity:0.5; transparent: true;"></a-cone>
        <a-cone position={edit_pos(node2)} scale={box_scale} color="cyan" visible={box_visible} material="opacity:0.4; transparent: true;"></a-cone>
        <a-sphere position={edit_pos(target)} scale="0.02 0.02 0.02" color="yellow" visible={true}></a-sphere>

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
