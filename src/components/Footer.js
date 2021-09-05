import { useDispatch } from "react-redux";

import '../style/footer.scss';

const Footer = () => {
  
  const dispatch = useDispatch();

  const Contacts = ()=> dispatch({type: 'OPEN_MODAL', payload: 'contacts'});
  
  const Advertisement = ()=> dispatch({type: 'OPEN_MODAL', payload: 'advertisement'});

  return <div className='footer'>
    <ul className='buttons'>
      <li onClick={Contacts}>Contacts</li>
      <hr/>
      <li onClick={Advertisement}>Car dealership advertisement</li>
    </ul>
    <p>RST.ua является социальным украинским интернет сайтом. Администрация сайта не несет ответственности за информацию размещенную пользователями. При использовании материалов, ссылка на RST обязательна.</p>
    <p>©2006-2021 RST™ & RSTcars™</p>
  </div>;
};

export default Footer;