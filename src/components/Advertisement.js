import React from 'react';

import '../style/advertisement.scss';
const Advertisement = ()=>{
    return(
        <div className='advertisement'>
            <div>
                <section className='left'>
                    <h4>Физ. Лицам</h4>
                    <p><span className='span_bold'>0.1% / месяц</span> - от цены авто</p>
                    <p><span className='span_bold'>Оплата</span> - Visa / MasterCard</p>
                    <p><span>Пример</span>: цена авто 200'000 грн<br/>
                    стоимость рекламы 200 грн/месяц</p>
                    <p><span>Пример</span>: цена авто 300'000 грн<br/>
                    стоимость рекламы 300 грн/месяц</p>
                </section>
                <section className='rigth'>
                    <div><h4>Юр. Лицам</h4><span>2'700 грн</span></div>
                    <p><span className='span_bold'>0.1% / месяц</span> - от цены авто</p>
                    <p><span className='span_bold'>НДС</span>, документооборот</p>
                    <p><span>Пример</span>: цена авто 300'000 грн<br/>
                    стоимость рекламы 300 грн/месяц</p>
                    <p><span>Для оф. дилеров</span>:<br/>
                    1 выезд фотографа <br/>
                    помощь в размещении объявлений<br/>
                    стоимость рекламы 300 грн/месяц</p>
                    <p><span>Базовые тарифы</span>:<br/>
                    1'350 грн - сопровождение аккаунта 30 дней<br/>
                    помощь в размещении объявлений<br/>
                    от 1'350 грн - для оплаты объявлений</p>
                </section>
            </div>
            <div>
                <h4><span>RST</span> Sales Department</h4>
                <a href="tel:0501234567">050 123 45 67</a>
                <a href="tel:0961234567">096 123 45 67</a>
                <a href="tel:0631234567">063 123 45 67</a>
                <a href="mailto:rst.info@example.com">rst.info@example.com</a>
            </div>
        </div>
    )
}

export default Advertisement;