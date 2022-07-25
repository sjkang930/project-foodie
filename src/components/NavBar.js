const NavBar = () => {
    return (
        <div className="nav_bar">
            <nav className='bottome-nav'>
                <a class="nav-btn" href={"/"}>
                    <img class="nav-icon" src="/icons/home.svg" />
                </a>
                <a class="nav-btn" href={"/Map"}>
                    <img class="nav-icon" src="icons/locationicon.svg" />
                </a>
                <a class="nav-btn" href={"/Create"}>
                    <img class="nav-icon" src="icons/post-new.svg" />
                </a>
                <a class="nav-btn" href={"/Chat"}>
                    <img class="nav-icon" src="icons/txt.svg" />
                </a>
                <a class="nav-btn" href={"/Profile"}>
                    <img class="nav-icon" src="icons/profile.svg" />
                </a>
            </nav>
        </div>

    )
}

export default NavBar;