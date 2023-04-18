import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faGear} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const Header = () => {


    return(
        <header>
            <Link to="/overview"><FontAwesomeIcon icon={faHouse} /></Link>
            <Link to="/setting"><FontAwesomeIcon icon={faGear} /></Link>
        </header>
    );
}

export default Header;