
// DOBOT Nova2 Assets


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
            <a-entity gltf-model="#NOVA2_BASE" position={edit_pos(joint_pos.base)} rotation="0 -90 0">
                <a-entity gltf-model="#NOVA2_J1" position={edit_pos(joint_pos.j1)} rotation={`0 ${rotate.j1} 0`}>
                    <a-entity gltf-model="#NOVA2_J2" position={edit_pos(joint_pos.j2)} rotation={`0 0 ${rotate.j2}`}>
                        <a-entity gltf-model="#NOVA2_J3" position={edit_pos(joint_pos.j3)} rotation={`0 0 ${rotate.j3}`}>
                            <a-entity gltf-model="#NOVA2_J4" position={edit_pos(joint_pos.j4)} rotation={`0 0 ${rotate.j4}`}>
                                <a-entity gltf-model="#NOVA2_J5" position={edit_pos(joint_pos.j5)} rotation={`0 ${rotate.j5} 0`}>
                                    <a-entity gltf-model="#NOVA2_J6" position={edit_pos(joint_pos.j6)} rotation={`0 0 ${rotate.j6}`}>
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