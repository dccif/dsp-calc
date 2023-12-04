import React, { useContext } from 'react';
import { GlobalStateContext } from './contexts';

export function ItemIcon({ item, size, tooltip }) {
    const global_state = useContext(GlobalStateContext);
    size = size || 40;

    let img =
        <img src={`./image/${global_state.game_name}/${item}.png`}
            style={{ width: size, height: size, verticalAlign: 'bottom' }} />;

    tooltip = tooltip === undefined ? true : tooltip;
    if (tooltip) {
        let fontSize = Math.min(size / 2, 16);
        return <span data-tooltip={item} className="fast-tooltip" style={{ fontSize: fontSize }}>{img}</span>;
    } else {
        return img;
    }
}

export function Recipe({ recipe }) {
    function item_to_doms([item, count]) {
        return <React.Fragment key={item}>
            <ItemIcon item={item} size={28} />
            <sub className='me-1'>{count}</sub>
        </React.Fragment>;
    }

    const input_doms = Object.entries(recipe["原料"]).map(item_to_doms);
    const output_doms = Object.entries(recipe["产物"]).map(item_to_doms);

    return <span className="text-nowrap">
        {input_doms.length > 0 && <>
            {input_doms}
            <span className="mx-1" style={{ fontSize: "24px", lineHeight: "24px" }}>→</span>
        </>
        }

        {output_doms}
    </span>;
}

export function HorizontalMultiButtonSelect({ choice, options, onChange, no_gap }) {
    let gap_class = no_gap ? "" : "gap-1";

    let option_doms = options.map(({ value, label, item_icon }) => {
        let selected_class = choice == value ? "bg-selected" : "bg-unselected";
        let gap_class = no_gap ? "border-between border-white" : "";
        return <div key={value}
            className={`py-1 px-2 text-nowrap d-flex align-items-center cursor-pointer ${selected_class} ${gap_class}`}
            style={{ fontSize: "0.8em" }}
            onClick={() => onChange(value)}
        >{item_icon && <ItemIcon item={item_icon} size={32} />}{label}</div>;
    })

    return <div className={`d-flex ${gap_class}`}>{option_doms}</div>;
}