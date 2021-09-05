import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Logo from '../images/rst-ua-logo.svg';

import '../style/header_container.scss';

const Header = ()=>{

  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector(store => store.user);
 
  const Exit = ()=>{
    
    dispatch({type: 'REMOVE_USER'});
    if(user.isAdmin) dispatch({type: 'REMOVE_SEARCH_RESULT'});

    sessionStorage.removeItem('token');
    history.replace('/search');
  };
  
  const Modal = val => dispatch({type: "OPEN_MODAL", payload: val});

  return (
    <div className="header_container">
      <img src={Logo} alt="alt" className='logo'/>
      <p>
        Авто базар – Авторынок Украины.
        Автопродажа на RST это более 400000 б.у. авто,
        а также продажа новых автомобилей в Украине.
        Машины продают на сайте RST.
      </p>
      <div>{user ? <button onClick={Exit} className='button'>Exit</button> :
        <div className='header_buttons'>
            <button onClick={()=>Modal("enter")} className='button'>Enter</button>
            <button onClick={()=>Modal("register")} className='button'>Register</button>
          </div>
        }
      </div>
    </div>
  );
};

export default Header;
