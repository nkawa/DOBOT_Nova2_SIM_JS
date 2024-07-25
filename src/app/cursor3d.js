


// XYZ Cursor

export const Cursor3d = (props) => {
    const { x, y, z, xd, yd, zd, len } = props;

    const line_x = `start: 0 0 0; end: ${len} 0 0; color: red;`
    const line_y = `start: 0 0 0; end: 0 ${len} 0; color: green;`
    const line_z = `start: 0 0 0; end: 0 0 ${len}; color: blue`

    return <a-entity
        line={line_x}
        line__1={line_y}
        line__2={line_z}
        position={`${x} ${y} ${z}`}
        rotation={`${xd} ${yd} ${zd}`}
    ></a-entity>

}


export const Cursor3dp = (props) => {
    const { pos, rot, len } = props;

    const line_x = `start: 0 0 0; end: ${len} 0 0; color: red;`
    const line_y = `start: 0 0 0; end: 0 ${len} 0; color: green;`
    const line_z = `start: 0 0 0; end: 0 0 ${len}; color: blue`

    return <a-entity
        line={line_x}
        line__1={line_y}
        line__2={line_z}
        position={`${pos.x} ${pos.y} ${pos.z}`}
        rotation={`${rot.x} ${rot.y} ${rot.z}`}
    ></a-entity>

}