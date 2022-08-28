import React from "react"
const RestaurantInfo = ({ business }) => {
    const moreInfo = () => {
        console.log(business)
    }
    return (
        <div className="RestaurantInfo">
            <button><img onClick={moreInfo} alt='open_list' src="/icons/arrow.svg" /></button>
        </div>
    )
}
export default RestaurantInfo;