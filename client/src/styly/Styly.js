import styled from 'styled-components';

//vytvoreni stylu

const Styles = styled.div`
.navbar {
    background-color: black;
}

.navbar-brand, .navbar-nav .nav-link {
  color: gray;
  &:hover {
    color: white;
  }
}

.navbar-brand{
    color:white;
    font-size: 155%;
    font-family: "Comic Sans MS", cursive, sans-serif;
}

.mynav .collapse:not(.show){
    float:left;
}

.navbar-toggler{
    background-color:white;
}

.divApp{
    background-color: gray;
    font-size: 120%;
}

.divContentApp{
    padding: 1%;
    color: white;
}

.tail{
    background-color: black;
}

.content{
    display: block;
    text-align: center;
    padding: 1% 0 0 0;
}

.content img{
   
    width: 30em;
    height: 10em;
}

.registraceLink a{
    text-align: center;
    font-size: 80%;
    color:white;
}

.prihlaseniLink a{
    text-align: center;
    font-size: 80%;
    color:white;
}

.skupiny{
    margin: 1px;
    border-style: solid;
    border-width: 2px;
    border-color: black;
}

.btnSkupiny .btn{
    margin:2px;
    
}

.udalosti{
    margin: 1px;
    border-style: solid;
    border-width: 2px;
    border-color: black;
}

`;

export default Styles;