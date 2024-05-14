import './Header.css';


interface headerObj {
    title: string,
}

const Header = (obj: headerObj) => {
    return (
        <header className='Header'>
            <h2 className='header_center'>{obj.title}</h2>
        </header>
    )
};
export default Header;