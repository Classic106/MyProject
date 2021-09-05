import React from 'react';

import '../style/contacts.scss';

const Contacts = ()=>{
    return(
        <div className='contacts'>
            <section>
                <p><span>RST</span> tech support</p>
                <a href="tel:0501234567">050 123 45 67</a>
                <a href="tel:0961234567">096 123 45 67</a>
                <a href="tel:0631234567">063 123 45 67</a>
            </section>
            <section>
                <p>Working hours: from 7:00 to 23:00 h.</p>
            </section>
            <section>
                <a href="mailto:rst.info@example.com">rst.info@example.com</a>
            </section>
            <section>
                <h4>Руководитель проекта</h4>
                <p><a href="tel:0631234567">063 123 45 67</a> Александр Голубов</p>
                <a href="mailto:rst.info@example.com">rst.info@example.com</a>
            </section>
        </div>
    )
}

export default Contacts;