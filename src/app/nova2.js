
// DOBOT Nova2 Assets

//import { AFRAME } from "aframe"

export const Nova2Assets = () => {
    return (
        <a-assets>
            {/*DOBOT Nova2*/}
            <a-asset-items id="NOVA2_BASE" src="NOVA2_BASE_ASM.gltf" ></a-asset-items>
            <a-asset-items id="NOVA2_J1" src="NOVA2_J1_ASM.gltf" ></a-asset-items>
            <a-asset-items id="NOVA2_J2" src="NOVA2_J2_ASM.gltf" ></a-asset-items>
            <a-asset-items id="NOVA2_J3" src="NOVA2_J3_ASM.gltf" ></a-asset-items>
            <a-asset-items id="NOVA2_J4" src="NOVA2_J4_ASM.gltf" ></a-asset-items>
            <a-asset-items id="NOVA2_J5" src="NOVA2_J5_ASM.gltf" ></a-asset-items>
            <a-asset-items id="NOVA2_J6" src="NOVA2_J6_ASM.gltf" ></a-asset-items>
        </a-assets>
    )
}


export const DOBOT_Nova2 = (props) => {
    const { visible, rotate, joint_pos, edit_pos } = props
    return (
        <>
            <Nova2Assets />
            <a-entity gltf-model="#NOVA2_BASE" position={edit_pos(joint_pos.base)} rotation="0 0 0" model-opacity="opacity:0.6;">
                <a-entity gltf-model="#NOVA2_J1" position={edit_pos(joint_pos.j1)} rotation={`0 ${rotate.j1} 0`} model-opacity="opacity:0.2;">
                    <a-entity id="nj2" gltf-model="#NOVA2_J2" position={edit_pos(joint_pos.j2)} rotation={`0 0 ${rotate.j2}`} >
                        <a-entity id="nj3" gltf-model="#NOVA2_J3" position={edit_pos(joint_pos.j3)} rotation={`0 0 ${rotate.j3}`} model-opacity="opacity:0.2;">
                            <a-entity id="nj4" gltf-model="#NOVA2_J4" position={edit_pos(joint_pos.j4)} rotation={`0 0 ${rotate.j4}`}>
                                <a-entity id="nj5" gltf-model="#NOVA2_J5" position={edit_pos(joint_pos.j5)} rotation={`0 ${rotate.j5} 0`} model-opacity="opacity:0.2;">
                                    <a-entity id="nj6" gltf-model="#NOVA2_J6" position={edit_pos(joint_pos.j6)} rotation={`0 0 ${rotate.j6}`}>
                                    </a-entity>
                                </a-entity>
                            </a-entity>
                        </a-entity>
                    </a-entity>
                </a-entity>
            </a-entity>
        </>
    )
}


export const Nova2_joints = {
    base: { x: 0, y: 0, z: 0 }, j1: { x: 0, y: 0, z: 0 },
    j2: { x: 0, y: 0.218, z: 0 }, j3: { x: 0, y: 0.28, z: 0 }, j4: { x: 0., y: 0.225, z: 0 },
    j5: { x: 0.0, y: 0.064, z: -0.1155 }, j6: { x: 0.0, y: 0.056, z: -0.052 }
}

/*
//j1 -> y軸回転のみ
//j2 -> z軸回転のみ 
// 3次元回転

// XYZ の場所、
export const Nova2_calc_j2 = (joint_pos) => {
    let j2 = new THREE.Matrix4().makeTranslation(Nova2_joints.j2.x, Nova2_joints.j2.y, Nova2_joints.j2.z);
}


*/

export const Nova2_calc_j3 = (rotate) => {
    if (!window.AFRAME) return { pos: null, rot: null };
    if (!window.AFRAME.THREE) return { pos: null, rot: null };

    const THREE = window.AFRAME.THREE;
    const j = Nova2_joints;
    let mat = new THREE.Matrix4()
    mat.compose(new THREE.Vector3(j.j2.x, j.j2.y, j.j2.z), new THREE.Quaternion(), new THREE.Vector3(1, 1, 1))
    let j1rot = new THREE.Matrix4().makeRotationY(Math.PI * rotate.j1 / 180);
    let j2j3 = new THREE.Matrix4().makeTranslation(j.j3.x, j.j3.y, j.j3.z);
    //    let j2rot =new THREE.Matrix4().makeRotationAxis( new THREE.Vector3(0,0,1), joint_pos.j2)
    let j2rot = new THREE.Matrix4().makeRotationZ(Math.PI * rotate.j2 / 180);

    mat.multiply(j1rot);
    mat.multiply(j2rot);
    mat.multiply(j2j3);

    let pos = new THREE.Vector3();
    let quaternion = new THREE.Quaternion();
    let scale = new THREE.Vector3()
    mat.decompose(pos, quaternion, scale)
    let euler = new THREE.Euler().setFromQuaternion(quaternion, "XYZ");
    let rot = { x: euler.x * 180 / Math.PI, y: euler.y * 180 / Math.PI, z: euler.z * 180 / Math.PI }
    return { mat, pos, rot, quaternion };
}


export const Nova2_calc_j4 = (mat, rotate) => {
    const THREE = window.AFRAME.THREE;
    const j = Nova2_joints;
    //    let mat = new THREE.Matrix4();
    //    mat.compose(new THREE.Vector3(j.j2.x, j.j2.y, j.j2.z), new THREE.Quaternion(), new THREE.Vector3(1, 1, 1))
    //    let j1rot = new THREE.Matrix4().makeRotationY(Math.PI * rotate.j1 / 180);
    //    let j2j3 = new THREE.Matrix4().makeTranslation(j.j3.x, j.j3.y, j.j3.z);
    //    let j2rot =new THREE.Matrix4().makeRotationAxis( new THREE.Vector3(0,0,1), joint_pos.j2)
    //    let j2rot = new THREE.Matrix4().makeRotationZ(Math.PI * rotate.j2 / 180);

    let j3rot = new THREE.Matrix4().makeRotationZ(Math.PI * rotate.j3 / 180);
    let j3j4 = new THREE.Matrix4().makeTranslation(j.j4.x, j.j4.y, j.j4.z);
    //    let j2rot =new THREE.Matrix4().makeRotationAxis( new THREE.Vector3(0,0,1), joint_pos.j2)
    //    let j2rot = new THREE.Matrix4().makeRotationZ(Math.PI * rotate.j2 / 180);

    //   mat.multiply(j1rot);
    //   mat.multiply(j2rot);
    //    mat.multiply(j2j3);
    mat.multiply(j3rot);
    mat.multiply(j3j4);

    let pos = new THREE.Vector3();
    let quaternion = new THREE.Quaternion();
    let scale = new THREE.Vector3()
    mat.decompose(pos, quaternion, scale)
    let euler = new THREE.Euler().setFromQuaternion(quaternion, "XYZ");
    let rot = { x: euler.x * 180 / Math.PI, y: euler.y * 180 / Math.PI, z: euler.z * 180 / Math.PI }
    return { mat, pos, rot, quaternion };
}