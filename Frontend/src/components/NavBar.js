const NavBar = () => {
    return (
        <div className="nav_bar">
            <nav className='bottome-nav'>
                <a class="nav-btn" href={"/"}>

                </a>
                <a class="nav-btn" href={"/Map"}>
                    <img class="nav-icon" src="icons/locationicon.svg" />
                </a>
                <a class="nav-btn" href={"/Create"}>

                </a>
                <a class="nav-btn" href={"/Chat"}>

                </a>
                <a class="nav-btn" href={"/Profile"}>

                </a>
            </nav>
        </div>

    )
}

export default NavBar;