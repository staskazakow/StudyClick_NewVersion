import React from "react";
import styled from "styled-components";
import logo from "../../image/Mask group (3).png"
import tg from "../../image/tg.png"
import vk from "../../image/vk.png"
import yt from "../../image/youtube.png"
import { NavLink } from "react-router";

const LogoBlock = styled.div`
  display: flex;
  gap: 15vw;
  justify-content: center;
  /* Адаптив для мобильных устройств */
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const Wrapper = styled.footer`
  border-radius: 20px 20px 0 0;
  overflow-x: hidden;
  background-color: #6299D0;
  margin-top: 40px;
  padding: 0 12vw;
  color: white;

  padding-bottom: 70px;

  p {
    margin: 0;
    color: white;
    cursor: pointer;
  }

  /* ---- Медиа-запросы для мобильных и планшетов ---- */
  @media (max-width: 900px) {
    padding: 0 4vw 40px 4vw;

    /* Меняем направление футера-логотипа */
    .logoblock {
      flex-direction: column;
      gap: 28px;
      align-items: center;
    }

    /* Меняем расположение основных блоков */
    .footer-main {
      flex-direction: column;
      gap: 36px;
      align-items: center;
    }
    
    /* Центрирование текста и элементов */
    h4 {
      text-align: center;
    }
    
    /* Уменьшаем шрифты для мобильных */
    h4 {
      font-size: 16px;
    }
    
    p, div, a {
      font-size: 14px;
    }
    
    /* Центрирование соцсетей */
    .social-icons {
      justify-content: center !important; 
      gap:20px; 
      margin-top:20px; 
    }
    
    /* Обеспечить правильное отображение изображений соцсетей */
    .social-icons img {
      width:30px; 
      height:auto; 
    }
    
    /* Обеспечить адаптивность контейнера с логотипом и текстом */
    .logo-container {
      display:flex; 
      flex-direction:center; 
      align-items:center; 
      flex-direction:column; 
      text-align:center; 
      gap:10px; 
    }
    
   }

   @media (max-width:600px) {
     padding:0 2vw 32px 2vw;
     border-radius:18px 18px 0 0;

     h4 {
       font-size:16px;
     }

     p, div, a {
       font-size:14px;
     }

     /* Уменьшаем размеры соцсетей еще больше */
     .social-icons img {
       width:25px; 
     }
   }
`;

const NavBtn = styled(NavLink)`
 color:white; /* исправлено дублирование цвета */
 text-decoration:none;

 &:hover {
   text-decoration:none; /* чтобы убрать подчеркивание при ховере */
   opacity:.8; /* легкое затемнение при наведении */
 }
`;

const BtnWrapper = styled.div`
 display:flex;
 flex-direction:column;
 gap:15px;

 /* Адаптив для мобильных устройств внутри блока поддержки/продуктов/инструкций */
 @media(max-width:900px){
   align-items:center; 
   text-align:center; 
 }
`;

const Footer = () => {
 const LinkTg = () => {
   window.location.href = "https://t.me/mon_tti1";
 };
 const LinkVk = () => {
   window.location.href = "https://vk.com/guidingstarvlog?from=groups";
 };
 return (
   <Wrapper>
     <LogoBlock className="logoblock">
       <div className="logo-container" style={{ display:"flex", alignItems:"center" }}>
         <img src={logo} alt="logo" style={{ width:"60px", height:"auto" }} />
         <div style={{ fontSize:"26px", marginLeft:"10px" }}>Guiding Star</div>
       </div>
       <p style={{ color:"black", fontWeight:"700" }}>ИП Артеев Максим Николаевич</p>
       {/* Можно добавить сюда описание или оставить как есть */}
     </LogoBlock>
     
     {/* Социальные сети */}
     <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginTop:"35px" }}>
       <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
         <p>Давайте дружить!</p>
         <p>Присоединяйтесь к нам в соцсети</p>
       </div>
       <div className="social-icons" style={{ display:'flex', justifyContent:'center', gap:'45px', marginTop:'27px' }}>
         <img src={yt} alt="Youtube" style={{ width:'40px', height:'auto' }} />
         <img src={tg} alt="Telegram" style={{ width:'40px', height:'auto' }} onClick={LinkTg} />
         <img src={vk} alt="Вконтакте" style={{ width:'40px', height:'auto' }} onClick={LinkVk} />
       </div>
     </div>

     {/* Основные разделы */}
     <div style={{ display:"flex", gap:"35px", justifyContent:"space-evenly", flexWrap:"wrap", marginTop:"40px" }} className="footer-main">
       {/* Поддержка */}
       <div style={{ minWidth:'200px' }}>
         <h4>Поддержка</h4>
         <BtnWrapper>
           <div>Почта: putevodnayazwezda@yandex.ru</div>
           <p onClick={() => LinkTg()}>Телеграмм</p>
           <p onClick={() => LinkVk()}>Вконтакте</p>
         </BtnWrapper>
       </div>

       {/* Продукты */}
       <div style={{ minWidth:'200px' }}>
         <h4>Продукты</h4>
         <BtnWrapper>
           <p>Курсы</p>
           <p>Telegram - бот, фин. эксперт</p>
           <p>Купить комикс</p>
         </BtnWrapper>
       </div>

       {/* Инструкции */}
       <div style={{ minWidth:'200px' }}>
         <h4>Инструкции</h4>
         <BtnWrapper>
           <NavBtn to={"/price"}>Цена</NavBtn>
           <NavBtn to={"/about"}>О нас</NavBtn>
           <NavBtn to={"/terms"}>Условия</NavBtn>
         </BtnWrapper>
       </div>
     </div>

   </Wrapper>
 );
};

export default Footer;