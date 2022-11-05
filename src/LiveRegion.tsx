import React from "react";

export function LiveRegion({ slideIndex, slidesLength }: { slideIndex: number; slidesLength: number; }) {
    return (
        <div aria-live="polite" aria-atomic="true" className="liveregion visuallyhidden">
            {`Item ${slideIndex} of ${slidesLength}`}
        </div>
    );
}
