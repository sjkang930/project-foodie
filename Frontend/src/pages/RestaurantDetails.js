import React from "react";
import Head from "../components/Head";

const RestaurantDetails = ({ business }) => {
    const rating = business.rating
    function showStar() {
        let star = <img alt="star" className="nav-icon" src="/icons/white_star_fill.svg" />
        let half = <img alt="star" className="nav-icon" src="/icons/white_half_star.svg" />
        let empty = <img alt="star" className="nav-icon" src="/icons/white_star_no_fill.svg" />
        if (rating == 0) {
            return <div>empty + empty + empty + empty + empty</div>
        } else if (rating == 1) {
            return <div>{star + empty + empty + empty + empty}</div>
        } else if (rating == 1.5) {
            return <div>{star + half + empty + empty + empty}</div>
        } else if (rating == 2) {
            return <div>{star + star + empty + empty + empty}</div>
        } else if (rating == 2.5) {
            return <div>{star + star + half + empty + empty}</div>
        } else if (rating == 3) {
            return <div>{star + star + star + empty + empty}</div>
        } else if (rating == 3.5) {
            return <div>{star + star + star + half + empty}</div>
        } else if (rating == 4) {
            return <div>`${star} + ${star} + ${star} + ${star} + ${empty}`</div>
        } else if (rating == 4.5) {
            return <div>{star + star + star + star + half}</div>
        } else if (rating == 5) {
            return <div>{star + star + star + star + star}</div>
        }
    }

    console.log(business)
    return (<div className="RestaurantDetails">
        <Head name="Restaurant Details" />
        Categories: {business ? business.categories.map(it => ((it.alias === business.categories[business.categories.length - 1].alias) ? it.alias + "." : it.alias + ", ")) : null}
        <div onLoad={() => { showStar() }} />
    </div>
    )
}

export default RestaurantDetails;