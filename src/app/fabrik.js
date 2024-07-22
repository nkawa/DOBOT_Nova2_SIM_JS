




export const distance = (s_pos, t_pos) => {
    return Math.sqrt((t_pos.x - s_pos.x) ** 2 + (t_pos.y - s_pos.y) ** 2 + (t_pos.z - s_pos.z) ** 2);
}

export const distance2Dx = (s_pos, t_pos) => {
    return Math.sqrt((t_pos.y - s_pos.y) ** 2 + (t_pos.z - s_pos.z) ** 2);
}

export const distance2Dz = (s_pos, t_pos) => {
    return Math.sqrt((t_pos.x - s_pos.x) ** 2 + (t_pos.y - s_pos.y) ** 2);
}

export const pos_add = (pos1, pos2) => {
    return { x: (pos1.x + pos2.x), y: (pos1.y + pos2.y), z: (pos1.z + pos2.z) }
}

export const pos_sub = (pos1, pos2) => {
    return { x: (pos1.x - pos2.x), y: (pos1.y - pos2.y), z: (pos1.z - pos2.z) }
}


export const setNodeData = (joint_pos) => {
    const nod = []
    nod.push(pos_add(joint_pos.j1, joint_pos.j2));
    nod.push(pos_add(nod[0], joint_pos.j3));
    nod.push(pos_add(pos_add(nod[1], joint_pos.j4), joint_pos.j5));
    nod.push(pos_add(nod[2], joint_pos.j6));

    const len = [
        distance(nod[0], nod[1]),
        distance(nod[1], nod[2]),
        distance(nod[2], nod[3]),
        0,
    ];
    return { nod, len };

}


export const WRIST_IK = (st, tg, nd2) => {
    const wknd2 = [...nd2]

    let wl_node2pos = wknd2[2]
    let wk_node3pos = wknd2[3]
    const wkdistance2 = joint_length[0] + joint_length[1]
    let wkdistance3 = Math.min(wkdistance2 + joint_length[2], distance(st, tg))
    let wk_0_2_distance_diff = -1
    const { x: degree_x, y: degree_y } = degree(st, tg)

    do {
        const { a: wk_y, b: radius } = calc_side_1(wkdistance3, degree_x)
        const { a: wk_z, b: wk_x } = calc_side_1(radius, degree_y)
        wk_node3pos = pos_add(st, { x: wk_x, y: wk_y, z: wk_z })

        const { a: teihen, b: takasa } = calc_side_1(joint_length[2], wrist_rotate.x)
        wl_node2pos = { ...wk_node3pos }
        const { a: teihen2, b: takasa2 } = calc_side_1(teihen, degree_y)
        wl_node2pos.x = wk_node3pos.x - takasa2
        wl_node2pos.y = wl_node2pos.y + (-takasa)
        wl_node2pos.z = wk_node3pos.z - teihen2

        const side_c = distance({ x: 0, y: wl_node2pos.y, z: 0 }, wl_node2pos) + teihen
        const side_b = teihen
        const { a: wk_teihen, b: wk_takasa } = calc_side_1(side_b, wrist_rotate.y)

        let angle_Ad = Math.acos(wk_takasa / side_c) * 180 / Math.PI
        if (isNaN(angle_Ad)) angle_Ad = 0

        const { b: wk_takasa2 } = calc_side_1(side_c, angle_Ad)
        const side_a = wk_takasa2 - wk_teihen

        let angle_A = Math.acos((side_b ** 2 + side_c ** 2 - side_a ** 2) / (2 * side_b * side_c)) * 180 / Math.PI
        if (isNaN(angle_A)) angle_A = 0
        angle_A = angle_A * (wrist_rotate.y < 0 ? -1 : 1)

        const { a: teihen3, b: takasa3 } = calc_side_1(teihen, (degree_y + angle_A))
        wl_node2pos.x = wk_node3pos.x - takasa3
        wl_node2pos.z = wk_node3pos.z - teihen3

        wk_0_2_distance_diff = wkdistance2 - distance(st, wl_node2pos)
        wkdistance3 = wkdistance3 + wk_0_2_distance_diff
    } while (wk_0_2_distance_diff < 0)

    set_node1(wk_node3pos)
    set_node2(wl_node2pos)

    wknd2[1] = wknd2[0]
    wknd2[2] = wl_node2pos
    wknd2[3] = wk_node3pos

    set_nodes([...wknd2])
}
